"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import DeleteItemBtn from "@/components/DeleteItemBtn";
const ItemsList = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [update, setUpdate] = useState(false);

  const getInventoryItems = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/inventory-items`,
        { cache: "no-store" }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch inventory Items");
      }

      const result = await res.json();

      if (!result || !result.inventoryItems) {
        throw new Error("Invalid response formats");
      }

      console.log(result.inventoryItems);

      setInventoryItems(result.inventoryItems);
    } catch (error) {
      console.log("Error loading inventoryItems: ", error);
    }
  };

  const handleRefresh = () => {
    // setUpdate(!update);
    getInventoryItems();
  };

  useEffect(() => {
    getInventoryItems();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {inventoryItems.map((item) => (
        <Card key={item._id}>
          <CardHeader>
            <CardTitle>{item.itemName}</CardTitle>
            <CardDescription className="font-medium">
              Serial Number: {item.itemSerialNumber}
            </CardDescription>
            <CardDescription className="font-medium">
              Note: {item.note}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <div className="flex justify-between gap-4 w-full">
              <Button asChild>
                <Link href={"/updateItem/" + item._id}>Update</Link>
              </Button>

              <div className="flex gap-4 items-center">
                <Link href={`/update-inventory-item/${item._id}`}>
                  <Pencil />
                </Link>

                <DeleteItemBtn id={item._id} onRemove={handleRefresh} />
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ItemsList;

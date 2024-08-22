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

const ItemsList = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const getInventoryItems = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/inventoryItems`,
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

  useEffect(() => {
    getInventoryItems();
  }, []);

  return (
    <div>
      {inventoryItems.map((item) => (
        <Card key={item._id}>
          <CardHeader>
            <CardTitle>{item.itemName}</CardTitle>
            <CardDescription className="font-medium">
              Serial Number: {item.itemSerialNumber}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild>
              <Link href={"/editItem/" + item._id}>Edit</Link>
            </Button>
            <Button asChild>
              <Link href={"/updateItem/" + item._id}>Update</Link>
            </Button>
            <Button asChild>
              <Link href={"/deleteItem/" + item._id}>Delete</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ItemsList;

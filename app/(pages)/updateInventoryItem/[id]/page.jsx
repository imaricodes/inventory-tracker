import React from "react";
import UpdateInventoryForm from "@/app/(pages)/updateInventoryItem/[id]/UpdateInventoryForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


const getInventoryItemById = async (id) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/inventory-items/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("failed to fetch inventory item");
    }

    const inventoryItem = await res.json();
    return inventoryItem;
  } catch (error) {
    console.log(error);
  }
};
export default async function UpdateInventoryItem ({ params }) {
  const { id } = params;

  //look up the single item using id (in handle submit) fetch route

  const {inventoryItem} = await getInventoryItemById(id);

  console.log('inventory item: ', inventoryItem)


  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Item</CardTitle>
      </CardHeader>
      <CardContent>
        <UpdateInventoryForm inventoryItem={inventoryItem} />
      </CardContent>
    </Card>
  );
};



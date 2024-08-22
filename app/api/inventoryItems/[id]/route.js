import connectMongoDB from "@/lib/db";
import InventoryItem from "@/models/inventoryItem";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  console.log("put route hit");

  // get id from url params
  const { id } = params;

  // destructure request body properties
  const { itemName, itemSerialNumber } = await request.json();

  await connectMongoDB();
  await InventoryItem.findByIdAndUpdate(id, { itemName, itemSerialNumber });
  return NextResponse.json(
    { message: "inventory item updated" },
    { status: 200 }
  );
}

import connectMongoDB from "@/lib/db";
import InventoryItem from "@/models/inventoryItem";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  console.log("put route hit");

  // get id from url params
  const { id } = params;

  // destructure request body properties
  const { itemName, itemSerialNumber, note } = await request.json();

  await connectMongoDB();
  await InventoryItem.findByIdAndUpdate(id, { itemName, itemSerialNumber, note });
  return NextResponse.json(
    { message: "inventory item updated" },
    { status: 200 }
  );
}

//This get route finds one employee by id
export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const inventoryItem = await InventoryItem.findOne({ _id: id });
  return NextResponse.json({ inventoryItem }, { status: 200 });
}

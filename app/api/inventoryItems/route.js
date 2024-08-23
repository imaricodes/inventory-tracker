import connectMongoDB from "@/lib/db";
import InventoryItem from "@/models/inventoryItem";
import { NextResponse } from "next/server";

export async function POST(request) {
  console.log("post route hit");
  //destructure request body object
  // field names match property names of req object
  const { itemName, itemSerialNumber } = await request.json();

  // connect to remote mongo db
  await connectMongoDB();

  //create the ite
  // if collection does not exist, one will be created
  await InventoryItem.create({ itemName, itemSerialNumber });

  // return response with 201 status to user
  return NextResponse.json(
    { message: "Inventory item created" },
    { status: 201 }
  );
}

export async function GET() {
  await connectMongoDB();

  //returns an array of all found items
  const inventoryItems = await InventoryItem.find();
  return NextResponse.json({ inventoryItems });
}


// Use search params to delete specific employee
// Search params are passed in the url
// Example: http://localhost:3000/api/employees?id=1
// Delete request is made in the DeleteBtn component
export async function DELETE(request) {
  console.log('delete route hit')
  const id = request.nextUrl.searchParams.get("id");
  console.log('id in delete route: ', id)
  await connectMongoDB();
  await InventoryItem.findByIdAndDelete(id);
  return NextResponse.json({ message: "Inventory Item Deleted" }, {status: 200});
}
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const AddInventoryItem = () => {
  const [itemName, setItemName] = useState("");
  const [itemSerialNumber, setItemSerialNumber] = useState("");
  const [note, setNote] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleRefresh = () => {
    router.refresh();
    // Redirect to home page after x seconds
    // Reason for timeout is that it was running
    // before router.refresh was called
    setTimeout(() => {
      router.push("/");
    }, 500);
  };

  const handleNameChange = (e) => {
    setItemName(e.target.value.replace(/^\s+/, ""));
    const value = e.target.value.trim();

    // Check if the form is valid
    if (value.length < 1) {
      setIsFormValid(true);
      setError("");
      setError("Name of item is required.");
    } else {
      // setItemName(value);
      setError("");
      setIsFormValid(true);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!itemName) {
      alert("Item name is required.");
      return;
    }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/inventory-items`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ itemName, itemSerialNumber, note }),
        }
      );

      if (res.ok) {
        handleRefresh();
      } else {
        throw new Error("Failed to create employee");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <Card>
      <CardHeader>
        <CardTitle>Add Inventory Item</CardTitle>
        <CardDescription>Add a new item to the inventory.</CardDescription>
      </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="form">
            <Input
              onChange={handleNameChange}
              value={itemName}
              // className="form__input"
              type="text"
              placeholder="Name"
              required={true}
            />

            <Input
              onChange={(e) => setItemSerialNumber(e.target.value.trim())}
              value={itemSerialNumber}

              type="text"
              placeholder="Serial Number"
            />

            <Textarea
              onChange={(e) => setNote(e.target.value)}
              value={note}
              className="focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Note"
              maxlength="150"
            />

            <button
              type="submit"
              className={`${
                isFormValid && !error
                  ? "cursor-pointer button button--primary"
                  : "button button--disabled cursor-not-allowed"
              }`}
              disabled={!isFormValid}
            >
              Add Item
            </button>


          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddInventoryItem;

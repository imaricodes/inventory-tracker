"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function UpdateInventoryForm({ inventoryItem }) {
  const router = useRouter();
  const { _id: id, itemName, itemSerialNumber, note } = inventoryItem;
  const maxCharacters = 200;
  const [textArea, setTextArea] = useState('');
  const [remainingChars, setRemainingChars] = useState(maxCharacters);
  const [newItemName, setNewItemName] = useState("");
  const [newItemSerialNumber, setNewItemSerialNumber] = useState("");
  const [newNote, setNewNote] = useState("");

  const [isFormDirty, setIsFormDirty] = useState(false);
  const [error, setError] = useState(null);

  // determine if form is dirty
  useEffect(() => {
    if (
      newItemName.trim() === "" &&
      newItemSerialNumber.trim() === "" &&
      newNote.trim() === "" &&
      newItemName.length === 0 &&
      newItemSerialNumber.length === 0 &&
      newNote.length === 0
    ) {
      setIsFormDirty(false);
    } else {
      setIsFormDirty(true);
    }
  }, [newItemName, newItemSerialNumber, newNote]);

  const handleTextAreaChange = (e) => {
    setNewItemSerialNumber(e.target.value.trimStart())
    const inputText = event.target.value;
    setTextArea(inputText);
    setRemainingChars(maxCharacters - inputText.length);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // assign altered fields to updatedFields object
    const updatedFields = {};
    if (newItemName.trim() !== "") {
      updatedFields.itemName = newItemName;
    }

    if (newItemSerialNumber.trim() !== "") {
      updatedFields.itemSerialNumber = newItemSerialNumber;
    }

    if (newNote.trim() !== "") {
      updatedFields.note = newNote;
    }
    console.log("updated fields: ", updatedFields);

    // send updated fields to server
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/inventory-items/${id}`,
        {
          method: "PUT",
          heaers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(updatedFields),
        }
      );

      if (res.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="max-w-[600px] mx-auto">
      <CardHeader>
        <CardTitle>Edit Inventory Item</CardTitle>
        <CardDescription>Update inventory item</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="form">
          <Input
            type="text"
            placeholder={itemName}
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = itemName)}
            onChange={(e) => setNewItemName(e.target.value.trimStart())}
            defaultValue=""
          />
          <Input
            type="text"
            placeholder={itemSerialNumber}
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = itemSerialNumber)}
            onChange={(e) => setNewItemSerialNumber(e.target.value.trimStart())}
            defaultValue=""
          />
          <Textarea
            type="text"
            placeholder={note}
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = note)}
            onChange={handleTextAreaChange}
            defaultValue=""
            maxlength={maxCharacters}
          />
          <p className="text-slate-400 text-sm">{remainingChars} characters remaining</p>

          <button
            type="submit"
            className={`${
              !error && isFormDirty
                ? "cursor-pointer button button--primary w-full"
                : "button button--disabled w-full cursor-not-allowed"
            }`}
            disabled={isFormDirty === null || isFormDirty === false}
          >
            Update Item
          </button>
        </form>
      </CardContent>
    </Card>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function UpdateInventoryForm({ inventoryItem }) {
  // console.log('inventory item in form: ', inventoryItem)
  const { itemName, itemSerialNumber, note } = inventoryItem;

  const [newItemName, setNewItemName] = useState("");
  const [newItemSerialNumber, setNewItemSerialNumber] = useState("");
  const [newNote, setNewNote] = useState("");

  const [isFormDirty, setIsFormDirty] = useState(false);
  const [error, setError] = useState(null);

  // determine if form is dirty
  useEffect(() => {
    console.log("new item name: ", newItemName);
    console.log("new item serial: ", newItemSerialNumber);
    console.log("new note: ", newNote);
    console.log("new item name length: ", newItemName.length);
    console.log("new item serial length: ", newItemSerialNumber.length);
    console.log("new note length: ", newNote.length);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("handle submit");
    console.log("new item name: ", newItemName);
    console.log("new item serial: ", newItemSerialNumber);
    console.log("new note: ", newNote);

    if (newItemName === itemName) {
      console.log("no change in item name");
    }

    //check which fields have changed
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
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder={"Enter new item name"}
        onFocus={(e) => (e.target.placeholder = "")}
        onBlur={(e) => (e.target.placeholder = "Enter new item name")}
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
        onChange={(e) => setNewNote(e.target.value.trimStart())}
        defaultValue=""
      />

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
  );
}

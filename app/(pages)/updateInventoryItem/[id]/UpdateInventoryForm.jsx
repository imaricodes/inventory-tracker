"use client";

import {useState} from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function UpdateInventoryForm ({inventoryItem}) {

  console.log('inventory item in form: ', inventoryItem)
  const {itemName, itemSerialNumber, note} = inventoryItem;

  const[newItemName, setNewItemName] = useState(itemName);
  const[newItemSerialNumber, setNewItemSerialNumber] = useState(itemSerialNumber);
  const[newNote, setNewNote] = useState(note);

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('handle submit')
  };


  return (
    <form onSubmit={handleSubmit}>
      <Input
      type="text"
      placeholder={itemName}
      onFocus={(e) => e.target.placeholder = ''}
      onBlur={(e) => e.target.placeholder = itemName}
      />
      <Input
      type="text"
      placeholder={itemSerialNumber}
      onFocus={(e) => e.target.placeholder = ''}
      onBlur={(e) => e.target.placeholder = itemSerialNumber}
      />
      <Textarea
      type="text"
      placeholder={note}
      onFocus={(e) => e.target.placeholder = ''}
      onBlur={(e) => e.target.placeholder = note}
      />

      <button>submit</button>

    </form>
  );
};



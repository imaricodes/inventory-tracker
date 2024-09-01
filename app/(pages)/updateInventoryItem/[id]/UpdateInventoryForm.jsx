"use client";

import {useState} from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function UpdateInventoryForm ({inventoryItem}) {

  // console.log('inventory item in form: ', inventoryItem)
  const {itemName, itemSerialNumber, note} = inventoryItem;

  const[newItemName, setNewItemName] = useState(itemName);
  const[newItemSerialNumber, setNewItemSerialNumber] = useState(itemSerialNumber);
  const[newNote, setNewNote] = useState(note);

  console.log('new note real time: ', newNote)

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log('handle submit')
    console.log('new item name: ', newItemName)
    console.log('new item serial: ', newItemSerialNumber)
    console.log('new note: ', newNote)

  };


  return (
    <form onSubmit={handleSubmit}>
      <Input
      type="text"
      placeholder={itemName}
      onFocus={(e) => e.target.placeholder = ''}
      onBlur={(e) => e.target.placeholder = itemName}
      onChange={(e) => setNewItemName(e.target.value.trimStart())}
      />
      <Input
      type="text"
      placeholder={itemSerialNumber}
      onFocus={(e) => e.target.placeholder = ''}
      onBlur={(e) => e.target.placeholder = itemSerialNumber}
      onChange={(e) => setNewItemSerialNumber(e.target.value.trimStart())}
      />
      <Textarea
      type="text"
      placeholder={note}
      onFocus={(e) => e.target.placeholder = ''}
      onBlur={(e) => e.target.placeholder = note}
      onChange={(e) => setNewNote(e.target.value.trimStart())}
      />

      <button>submit</button>

    </form>
  );
};



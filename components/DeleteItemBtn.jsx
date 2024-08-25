"use client";

import { Trash2} from 'lucide-react'

export default function DeleteItemBtn({ id, onRemove }) {

  const removeInventoryItem = async () => {
    const confirmed = confirm("Are you sure you want to delete this employee?");

    if (confirmed) {
      console.log('confirmed')
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/inventory-items?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {

        onRemove();
      }
    }
  };

  return (
    <button onClick={removeInventoryItem} className="text-red-400">
      <Trash2 size={24} />
    </button>
  );
}

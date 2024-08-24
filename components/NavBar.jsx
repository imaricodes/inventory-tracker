import React from "react";
import DarkToggle from "@/components/DarkToggle";
import { CirclePlus } from "lucide-react";
import Link from "next/link";

const NavBar = () => {
  return (
    <div className="w-full flex justify-between h-20 container mb-16">
      <Link href={"/"} className="text-3xl my-auto">Studio Inventory</Link>
      <div className="flex gap-10 items-center">

        <Link href={"add-inventory-item"}>
        <CirclePlus size={40} />
        </Link>

        <DarkToggle />
      </div>
    </div>
  );
};

export default NavBar;

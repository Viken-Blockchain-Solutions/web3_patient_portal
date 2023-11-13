import Link from "next/link";
import React from "react";

const Menu = () => {
  return (
    <div className="flex gap-3 flex-row mb-4">
      <Link href="/" className="text-blue-500">
        Wagmi
      </Link>
      <Link href="/home" className="text-blue-500">
        Home
      </Link>
      <Link href="/admin" className="text-blue-500">
        Admin
      </Link>
      <Link href="/laboratory" className="text-blue-500">
        Laboratory
      </Link>
      <Link href="/patient" className="text-blue-500">
        User
      </Link>
      <Link href="/institute" className="text-blue-500">
        Research Organisation
      </Link>
    </div>
  );
};

export default Menu;

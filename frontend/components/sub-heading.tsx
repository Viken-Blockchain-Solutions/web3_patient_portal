"use client";

import { usePathname } from "next/navigation";

import { Button } from "./ui/button";
import { capitalize } from "lodash";

export const SubHeading = () => {
  const pathname = usePathname();

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">{capitalize(pathname?.split("/")[2]) || "Admin"} Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button>Download</Button>
        </div>
      </div>
    </div>
  );
};
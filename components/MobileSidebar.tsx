"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Sidebar from "./Sidebar";
import { useSheet } from "@/hooks/useSheet";

interface MobileSidebarPropsInterface {
  apiUsedCount: number;
  isPremium: boolean;
}

const MobileSidebar = ({
  apiUsedCount,
  isPremium,
}: MobileSidebarPropsInterface) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-full text-white">
        <Sidebar apiUsedCount={apiUsedCount} isPremium={isPremium} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;

import React from "react";

import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "./MobileSidebar";
import { getApiUsedCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const Navbar = async () => {
  const apiUsedCount = await getApiUsedCount();
  const isPremium = await checkSubscription();

  return (
    <div className="flex items-center p-4">
      <MobileSidebar apiUsedCount={apiUsedCount} isPremium />
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;

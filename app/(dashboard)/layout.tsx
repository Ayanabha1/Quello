import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import WelcomeNote from "@/components/WelcomeNote";
import { getApiUsedCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import React from "react";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const apiUsedCount = await getApiUsedCount();
  const isPremium = await checkSubscription();
  return (
    <>
      <WelcomeNote />
      <div className="h-full relative">
        <div className="hidden h-full md:flex md:flex-col md:w-72 md:fixed z-[8] bg-gray-900">
          <Sidebar apiUsedCount={apiUsedCount} isPremium={isPremium} />
        </div>

        <main className="md:pl-72 pb-10">
          <Navbar />
          {children}
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;

"use client";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const LandingNavbar = () => {
  const router = useRouter();
  return (
    <nav className="bg-white w-full p-5 px-10 flex justify-between items-center shadow-lg ">
      <div className="flex items-center space-x-2">
        <div className="relative h-10 w-10">
          <Image fill alt="logo" src="/logo.png" />
        </div>
        <h1 className="text-3xl mt-2">Quello</h1>
      </div>
      <span
        className="text-md font-normal cursor-pointer"
        onClick={() => router.push("/dashboard")}
      >
        Dashboard
      </span>
    </nav>
  );
};

export default LandingNavbar;

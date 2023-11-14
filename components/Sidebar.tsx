"use client";

import { cn } from "@/lib/utils";
import {
  CodeIcon,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  MusicIcon,
  SettingsIcon,
  StarsIcon,
  VideoIcon,
} from "lucide-react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import ApiCounter from "./ApiCounter";
import { Badge } from "./ui/badge";
import { useSheet } from "@/hooks/useSheet";

const poppins = Poppins({ weight: "600", subsets: ["latin"] });
const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-500",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-pink-700",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "text-orange-700",
  },
  {
    label: "Music Generation",
    icon: MusicIcon,
    href: "/music",
    color: "text-emerald-700",
  },
  {
    label: "Code Generation",
    icon: CodeIcon,
    href: "/code",
    color: "text-green-700",
  },
  {
    label: "Settings",
    icon: SettingsIcon,
    href: "/settings",
  },
];

interface SidebarProps {
  apiUsedCount: number;
  isPremium: boolean;
}

const Sidebar = ({ apiUsedCount = 0, isPremium = false }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        {/* Logo */}
        <Link
          href="/dashboard"
          className="flex items-center space-x-2 pl-3 mb-14 "
        >
          <div className="relative h-10 w-10">
            <Image fill alt="logo" src="/logo.png" />
          </div>
          <h1 className={cn("text-3xl font-bold", poppins.className)}>
            Quello
          </h1>
        </Link>

        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "text-sm group flex p-3 hover:bg-white hover:bg-white/10 rounded-lg transition cursor-pointer",
                pathname === route.href
                  ? "bg-white/10 text-white"
                  : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                <span>{route.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <ApiCounter apiUsedCount={apiUsedCount} isPremium={isPremium} />
    </div>
  );
};

export default Sidebar;

"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { usePremiumModal } from "@/hooks/usePremiumModal";
import { Badge } from "./ui/badge";
import {
  ArrowRight,
  Check,
  CodeIcon,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  MusicIcon,
  SettingsIcon,
  VideoIcon,
  Zap,
} from "lucide-react";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import axios from "axios";

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgcolor: "bg-violet-500/10",
  },
  {
    label: "Music Generation",
    icon: MusicIcon,
    color: "text-emerald-700",
    bgcolor: "bg-emerald-700/10",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    bgcolor: "bg-pink-700/10",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-orange-700",
    bgcolor: "bg-orange-700/10",
  },

  {
    label: "Code Generation",
    icon: CodeIcon,
    color: "text-green-700",
    bgcolor: "bg-green-700/10",
  },
];

const PremiumModal = () => {
  const premiumModal = usePremiumModal();
  const [loading, setLoading] = useState(false);
  const subscribeFunc = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/stripe");
      window.location.href = res.data.url;
    } catch (error) {
      console.log("Stripe client error", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={premiumModal.isOpen} onOpenChange={premiumModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold py-1">
              Become a premium member
              <Badge className="uppercase text-sm py-1" variant="premium">
                Premium
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
            {tools.map((tool) => (
              <Card
                key={tool.label}
                className="p-4  border-b-black/5 flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-x-4">
                  <div className={cn("p-2 w-fit rounded-md", tool.bgcolor)}>
                    <tool.icon className={cn("w-8 h-8", tool.color)} />
                  </div>
                  <div className="font-semibold">{tool.label}</div>
                </div>
                <Check />
              </Card>
            ))}
          </DialogDescription>

          <DialogFooter>
            <Button
              className="mt-2 w-full"
              variant="premium"
              onClick={subscribeFunc}
              disabled={loading}
            >
              Upgrade
              <Zap className="h-4 w-4 ml-2 fill-white" />
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumModal;

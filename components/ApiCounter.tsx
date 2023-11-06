// It is by default a client component as it is a child of another client component (No need of using "use client").
// But it is a good practice to declare it anyway

"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { MAX_FREE_COUNTS } from "@/public/constants";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { StarsIcon, Zap } from "lucide-react";
import Image from "next/image";
import { usePremiumModal } from "@/hooks/usePremiumModal";
import { Badge } from "./ui/badge";

interface ApiCounterProps {
  apiUsedCount: number;
  isPremium: boolean;
}

const ApiCounter = ({ apiUsedCount, isPremium }: ApiCounterProps) => {
  const [mounted, setMounted] = useState(false);
  const premiumModal = usePremiumModal();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (isPremium) {
    return (
      <div className="px-3">
        <Card className="bg-white/10 border-0">
          <CardContent className="py-6 text-white flex flex-col items-center">
            {isPremium && (
              <Badge className="ml-2 text-sm mb-2" variant="premium">
                Premium Member <StarsIcon className="h-4 w-4" />
              </Badge>
            )}
            Unlimited AI Generations
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0">
        <CardContent className="py-6">
          <div className="text-center text-sm text-white mb-4 space-y-2">
            <p className="flex items-center justify-evenly">
              <div className="relative h-4 w-4">
                <Image alt="logo" fill src="/logo.png" />
              </div>
              {apiUsedCount} / {MAX_FREE_COUNTS} Free Generations
            </p>
            <Progress
              className="h-2"
              value={(apiUsedCount / MAX_FREE_COUNTS) * 100}
            />
          </div>
          <Button
            className="w-full flex items-center"
            variant="premium"
            onClick={premiumModal.onOpen}
          >
            Upgrade
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiCounter;

// But how does this counter gets updated everytime a new chat with ai is done?

// At the end of every trycatch block of api requests we have "finally" block in which we are doing router.refresh(). What it does is it rehydrates all the server components with latest data. So we get the newest data from the database everytime an chat is done. This is the beauty of NextJs 13

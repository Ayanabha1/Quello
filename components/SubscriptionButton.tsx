"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";
import axios from "axios";

interface SubscriptionButtonPropInterface {
  isPremium: boolean;
}

const SubscriptionButton = ({ isPremium }: SubscriptionButtonPropInterface) => {
  const [loading, setLoading] = useState(false);
  const buttonClick = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/stripe");
      window.location.href = res.data.url;
    } catch (error) {
      console.log("BILLING ERROR", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      disabled={loading}
      variant={!isPremium ? "premium" : "default"}
      onClick={buttonClick}
    >
      {isPremium ? "Manage Subscription" : "Upgrade"}{" "}
      {!isPremium && <Zap className="h-4 w-4 ml-2 fill-white" />}
    </Button>
  );
};

export default SubscriptionButton;

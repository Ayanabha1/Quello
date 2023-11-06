import Heading from "@/components/Heading";
import SubscriptionButton from "@/components/SubscriptionButton";
import { checkSubscription } from "@/lib/subscription";
import { Settings } from "lucide-react";
import React from "react";

const SettingsPage = async () => {
  const isPremium = await checkSubscription();

  return (
    <div>
      <Heading
        title="Settings"
        description="Manage account settings"
        icon={Settings}
        color="text-gray-700"
        bgcolor="bg-gray-700/10"
      />
      <div className="px-4 lg:px-8 space-y-4">
        <div className="text-muted-foreground text-sm">
          {isPremium
            ? "You are currently a premium member"
            : "You are currently on a free plan"}
        </div>
        <SubscriptionButton isPremium={isPremium} />
      </div>
    </div>
  );
};

export default SettingsPage;

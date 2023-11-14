"use client";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";

const OpenAiInp = () => {
  const [apiKey, setApiKey] = useState<string | null>(
    localStorage.getItem("OPENAI_API_KEY")
  );
  const [keyChanged, setKeyChanged] = useState<Boolean>(false);

  let timeoutId: ReturnType<typeof setTimeout>;

  const changeApiKey = (value: string) => {
    setKeyChanged(true);
    if (timeoutId) {
      clearTimeout(timeoutId);
      toast.remove();
    }

    setApiKey(value);
    localStorage.setItem("OPENAI_API_KEY", value);
  };

  const deleteApiKey = () => {
    toast.remove();
    setApiKey(null);
    localStorage.removeItem("OPENAI_API_KEY");
    toast.error("Removed OpenAI API Key");
  };

  useEffect(() => {
    if (apiKey && apiKey !== "" && keyChanged) {
      timeoutId = setTimeout(() => {
        toast.success("Configured OpenAI API Key successfully");
      }, 1500);
    } else if (apiKey === "" && keyChanged) {
      deleteApiKey();
    }
  }, [apiKey]);

  return (
    <div className="flex flex-col space-y-2">
      <Label htmlFor="api_key">OPENAI API KEY </Label>
      <div className="flex items-center ">
        <Input
          id="api_key"
          className="w-[250px] border-black h-6"
          placeholder={!apiKey ? "Please enter OPENAI API key" : undefined}
          value={apiKey ? apiKey : ""}
          onChange={(e) => changeApiKey(e.target.value)}
        />
        <Button
          variant="ghost"
          className="ml-1 p-1 w-7 h-7"
          onClick={deleteApiKey}
        >
          <Trash2Icon color="black" fill="red" />{" "}
        </Button>
      </div>
    </div>
  );
};

export default OpenAiInp;

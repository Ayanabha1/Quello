"use client";
import { Input } from "@/components/ui/input";
import React, { useEffect, useRef, useState } from "react";
import { Label } from "./ui/label";
import { isOpenAiKeyPresent } from "@/lib/openAiKey";

const OpenAiInp = () => {
  const openAiApiKey = localStorage.getItem("OPENAI_API_KEY");

  return (
    <div className="flex gap-2 items-center">
      <Label htmlFor="api_key">OPENAI API KEY</Label>
      <Input
        id="api_key"
        className="w-[250px] border-black h-6"
        placeholder={
          isOpenAiKeyPresent() ? openAiApiKey! : "Please enter OPENAI API key"
        }
        onChange={(e) => {
          localStorage.setItem("OPENAI_API_KEY", e.target.value);
          if (e.target.value === "") {
            localStorage.removeItem("OPENAI_API_KEY");
          }
        }}
      />
    </div>
  );
};

export default OpenAiInp;

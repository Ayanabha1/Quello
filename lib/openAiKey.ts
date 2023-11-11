"use client";

export const isOpenAiKeyPresent = () => {
  const apiKey = localStorage.getItem("OPENAI_API_KEY");
  if (apiKey && apiKey !== "") {
    return true;
  }
  return false;
};

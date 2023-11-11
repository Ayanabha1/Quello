"use client";
import React, { useEffect, useState } from "react";
import ApiKeyModal from "./ApiKeyModal";

const ApiKeyModalProvider = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <ApiKeyModal />;
};

export default ApiKeyModalProvider;

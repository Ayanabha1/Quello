"use client";

import React, { useEffect, useState } from "react";
import PremiumModal from "./PremiumModal";

const ModalProvider = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <PremiumModal />;
};

export default ModalProvider;

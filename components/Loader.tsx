import Image from "next/image";
import React from "react";

const Loader = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center bg-muted p-8 rounded-lg">
      <div className="w-14 h-14 sm:w-20 sm:h-20 relative animate-pulse">
        <Image alt="logo" fill src="/logo.png" />
      </div>
      <p className="text-sm sm:text-md text-muted-foreground">
        Let me think...
      </p>
    </div>
  );
};

export default Loader;

"use client";
import React from "react";
import { Badge } from "./ui/badge";
import { Typewriter } from "react-simple-typewriter";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Gradients = () => {
  return (
    <>
      <div className="absolute top-[70%] left-[2%] h-[200px] sm:h-[400px] w-[200px] sm:w-[400px] rounded-[50%] blur-[150px] sm:blur-[200px]  bg-[rgb(192,132,252)]"></div>
      <div className="absolute top-[40%] right-[50%] translate-x-[50%] h-[120px] sm:h-[200px] w-[120px] sm:w-[200px] rounded-[50%] blur-[150px] sm:blur-[120px]  bg-[#7965e9]"></div>
    </>
  );
};

const LandingHero = () => {
  const styleObj = {
    background: "url(/background.png)",
  };
  const router = useRouter();

  return (
    <main style={styleObj} className="relative  w-full flex overflow-hidden">
      <Gradients />
      <div className="w-full flex flex-col items-center pt-28 z-[20]">
        <Badge
          variant="white"
          className="h-fit w-fit p-2 px-5 text-sm z-[5] shadow-lg"
        >
          Powered by OpenAI
        </Badge>

        <div className="mt-10 space-y-5">
          <h1 className="text-4xl sm:text-5xl text-center md:text-6xl lg:text-7xl text-bold">
            The Best AI Tool For
          </h1>
          <p className="pb-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            <Typewriter
              words={[
                "Having A Chat",
                "Generating Codes",
                "Generating Images",
                "Generating Videos",
                "Generating Music",
              ]}
              loop={5}
              cursor
              cursorStyle="_"
              typeSpeed={100}
              deleteSpeed={60}
              delaySpeed={1000}
            />
          </p>
        </div>

        <div className="flex flex-col space-y-3 items-center">
          <Button
            className="rounded-3xl text-md"
            variant="premium"
            onClick={() => router.push("/dashboard")}
          >
            Get Started For Free
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
          <span className="text-xs text-muted-foreground">
            No Credit Card Required
          </span>
        </div>

        <div className="w-fit rounded-xl bg-black/5 border border-black/8 mb-5 mt-10 p-2 sm:p-5 shadow-2xl overflow-hidden">
          <div className="relative min-w-[300px] max-w-[85vw] w-[75vw] min-h-[30vh] aspect-video">
            <Image
              fill
              alt="website image"
              src="/quello.png"
              className="rounded-lg aspect-video"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default LandingHero;

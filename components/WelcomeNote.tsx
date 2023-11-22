"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import Image from "next/image";

const TechStack = () => {
  const techs = [
    {
      name: "NextJs",
      src: "/assets/next.png",
    },
    {
      name: "TailwindCSS",
      src: "/assets/tailwind.png",
    },
    {
      name: "Shadcn/ui",
      src: "/assets/shad.png",
    },
    {
      name: "Prisma",
      src: "/assets/prisma.png",
    },
    {
      name: "Stripe Integration",
      src: "/assets/stripe.png",
    },
    {
      name: "OpenAI Integration",
      src: "/assets/openai.png",
    },
  ];
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {techs.map((tech, i) => (
        <div key={i} className="flex items-center">
          <div className="relative h-3 w-3 md:w-5 md:h-5 mr-2">
            {" "}
            <Image fill src={tech.src} alt={tech.name} />{" "}
          </div>
          <span className="font-bold hover:underline hover:underline-offset-4 cursor-pointer">
            {tech.name}
          </span>
        </div>
      ))}
    </div>
  );
};

const WelcomeNote = () => {
  const [noteOpen, setNoteOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  const closeNote = () => {
    setNoteOpen(false);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Dialog open={noteOpen} onOpenChange={closeNote}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col">
            <h1 className="text-md sm:text-lg md:text-xl underline underline-offset-4">
              Welcome Note
            </h1>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-sm md:text-lg overflow-hidden flex flex-col  md:space-y-2 text-center">
          <p className="text-center">Hey there, User! </p>
          <p>
            Welcome to <strong>Quello</strong>, An AI heaven 🌐✨ to meet all
            your needs in one place. This is a project for showcasing my skills
            in the following technologies:
          </p>
          <TechStack />
          <p>
            To unlock the full potential of <strong>Quello</strong>, you will
            need to enter your <strong>OpenAI API key </strong> or use the{" "}
            <strong>Privileged mode</strong> if you possess the golden access.
          </p>
          <p>
            Thank you for your understanding and choosing Quello. Anticipate
            joyous exploration and tech marvels! Thank you for understanding.
            Hope you enjoy using Quello
          </p>
          <p className="flex flex-col">
            Best Regards,
            <span className="font-semibold">Ayanabha Misra</span>
          </p>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeNote;

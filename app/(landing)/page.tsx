import LandingNavbar from "@/components/LandingNavbar";
import LandingHero from "@/components/LandingHero";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const poppins = Poppins({ weight: "600", subsets: ["latin"] });
const LandingPage = () => {
  return (
    <div className={cn("h-full w-full", poppins.className)}>
      <LandingNavbar />
      <LandingHero />
    </div>
  );
};

export default LandingPage;

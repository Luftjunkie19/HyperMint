import FaqSection from "@/components/faq-section/FaqSection";
import MainSection from "@/components/main-section/MainSection";
import MintSection from "@/components/mint-section/MintSection";
import TeamSection from "@/components/team-section/TeamSection";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-full w-full overflow-x-hidden">
      <MainSection />
      <MintSection />
      <TeamSection />
      <FaqSection/>
    </div>
  );
}


import FaqSection from "@/components/faq-section/FaqSection";
import MainSection from "@/components/main-section/MainSection";
import MintSection from "@/components/mint-section/MintSection";
import TeamSection from "@/components/team-section/TeamSection";


export default async function Home() {

  
  
  return (
    <div className="h-full w-full overflow-x-hidden">
      <MainSection />
      <MintSection  />
      <TeamSection />
      <FaqSection/>
    </div>
  );
}

import { AchievementsSection } from "@/components/AchievementsSection";
import { HeroSection } from "@/components/HeroSection";
import { HomeServicesSection } from "@/components/HomeServicesSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HomeServicesSection />
      <AchievementsSection />
    </>
  );
}

export const generateMetadata = () => {
  return {
    title: "iQue - Let's create a better startup Ecosystem",
    description:
      "Join us in building a better and more efficient startup ecosystem! By fostering collaboration, providing mentorship, and offering resources, we're empowering startups to grow and thrive.",
  };
};

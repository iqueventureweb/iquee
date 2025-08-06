import { AchievementsSection } from "@/components/AchievementsSection";
import { CarouselSection } from "@/components/CarouselSection";
import { ContactUsSection } from "@/components/ContactUsSection";
import { HeroSection } from "@/components/HeroSection";
import { HomeServicesSection } from "@/components/HomeServicesSection";
import { LatestNewsSection } from "@/components/LatestNewsSection";
import { NewsletterSection } from "@/components/NewsletterSection";
import { OurStorySection } from "@/components/OurStorySection";
import { StaffSection } from "@/components/StaffSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { TrustSection } from "@/components/TrustSection";
import { getBlogs, getHomePage, getServices } from "@/lib/fetchMethods";

export default async function HomePage() {
  const [homePageData, services, blogs] = await Promise.all([
    getHomePage(),
    getServices(),
    getBlogs(3), // Fetch only 3 latest blogs
  ]);

  return (
    <>
      <HeroSection />
      <HomeServicesSection services={services} />
      <AchievementsSection data={homePageData?.achievement} />
      <TrustSection />
      <OurStorySection data={homePageData?.our_story} />
      <CarouselSection />
      <TestimonialsSection data={homePageData?.testimonials} />
      <StaffSection data={homePageData?.staff} />
      <LatestNewsSection blogs={blogs} />
      <NewsletterSection />
      <ContactUsSection />
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

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
import {
  generateEnhancedMeta,
  generateStructuredData,
} from "@/utilities/seoUtils";
import type { Metadata } from "next";

export default async function HomePage() {
  const [homePageData, services, blogs] = await Promise.all([
    getHomePage(),
    getServices(),
    getBlogs(3), // Fetch only 3 latest blogs
  ]);

  // Generate comprehensive structured data for homepage
  const homepageData = generateStructuredData({
    type: "website",
    data: {
      title: "iQue - Let's create a better startup Ecosystem",
      description:
        "Join us in building a better and more efficient startup ecosystem! By fostering collaboration, providing mentorship, and offering resources, we're empowering startups to grow and thrive.",
      url: "https://ique.com",
      siteName: "iQue Ventures",
      inLanguage: "en-US",
      author: {
        "@type": "Organization",
        name: "iQue Ventures",
        url: "https://ique.com",
        logo: "https://ique.com/ique-logo.svg",
      },
      publisher: {
        "@type": "Organization",
        name: "iQue Ventures",
        url: "https://ique.com",
        logo: "https://ique.com/ique-logo.svg",
      },
      mainEntity: {
        "@type": "Organization",
        name: "iQue Ventures",
        description:
          "Empowering startups through comprehensive support, mentorship, and ecosystem building",
        url: "https://ique.com",
        logo: "https://ique.com/ique-logo.svg",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kerala",
          addressRegion: "Kerala",
          addressCountry: "IN",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+91-9020103335",
          email: "info@ique.com",
          contactType: "customer service",
        },
        sameAs: [
          "https://linkedin.com/company/ique-ventures",
          "https://twitter.com/iqueventures",
          "https://facebook.com/iqueventures",
        ],
      },
    },
  });

  // Generate organization structured data
  const organizationData = generateStructuredData({
    type: "organization",
    data: {
      name: "iQue Ventures",
      url: "https://ique.com",
      logo: "https://ique.com/ique-logo.svg",
      description:
        "Empowering startups through comprehensive support, mentorship, and ecosystem building",
      foundingDate: "2020",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kerala",
        addressRegion: "Kerala",
        addressCountry: "IN",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-9020103335",
        email: "info@ique.com",
        contactType: "customer service",
      },
      sameAs: [
        "https://linkedin.com/company/ique-ventures",
        "https://twitter.com/iqueventures",
        "https://facebook.com/iqueventures",
      ],
    },
  });

  return (
    <>
      {/* Comprehensive Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homepageData),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData),
        }}
      />

      {/* Main Content with Semantic HTML Structure */}
      <main role="main" aria-label="iQue Ventures homepage">
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
      </main>
    </>
  );
}

export const generateMetadata = async (): Promise<Metadata> => {
  return generateEnhancedMeta({
    title: "Let's create a better startup Ecosystem",
    description:
      "Join us in building a better and more efficient startup ecosystem! By fostering collaboration, providing mentorship, and offering resources, we're empowering startups to grow and thrive.",
    url: "/",
    type: "website",
    author: "iQue Ventures",
  });
};

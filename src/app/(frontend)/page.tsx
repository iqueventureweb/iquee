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
import { SEO_CONFIG } from "@/lib/constants";
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
      title: SEO_CONFIG.PAGES.HOME.TITLE,
      description: SEO_CONFIG.PAGES.HOME.DESCRIPTION,
      url: SEO_CONFIG.BASE_URL,
      siteName: SEO_CONFIG.COMPANY_NAME,
      inLanguage: "en-US",
      author: {
        "@type": "Organization",
        name: SEO_CONFIG.COMPANY_NAME,
        url: SEO_CONFIG.BASE_URL,
        logo: `${SEO_CONFIG.BASE_URL}/ique-logo.webp`,
      },
      publisher: {
        "@type": "Organization",
        name: SEO_CONFIG.COMPANY_NAME,
        url: SEO_CONFIG.BASE_URL,
        logo: `${SEO_CONFIG.BASE_URL}/ique-logo.webp`,
      },
      mainEntity: {
        "@type": "Organization",
        name: SEO_CONFIG.COMPANY_NAME,
        description: SEO_CONFIG.DEFAULT_DESCRIPTION,
        url: SEO_CONFIG.BASE_URL,
        logo: `${SEO_CONFIG.BASE_URL}/ique-logo.webp`,
        address: {
          "@type": "PostalAddress",
          addressLocality: SEO_CONFIG.CONTACT.ADDRESS.REGISTERED.CITY,
          addressRegion: SEO_CONFIG.CONTACT.ADDRESS.REGISTERED.STATE,
          addressCountry: SEO_CONFIG.CONTACT.ADDRESS.REGISTERED.COUNTRY,
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: SEO_CONFIG.CONTACT.PHONE,
          email: SEO_CONFIG.CONTACT.EMAIL,
          contactType: "customer service",
        },
        sameAs: [
          SEO_CONFIG.SOCIAL_LINKS.LINKEDIN,
          SEO_CONFIG.SOCIAL_LINKS.TWITTER,
          SEO_CONFIG.SOCIAL_LINKS.FACEBOOK,
        ],
      },
    },
  });

  // Generate organization structured data
  const organizationData = generateStructuredData({
    type: "organization",
    data: {},
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
    title: SEO_CONFIG.PAGES.HOME.TITLE,
    description: SEO_CONFIG.PAGES.HOME.DESCRIPTION,
    url: "/",
    type: "website",
    author: SEO_CONFIG.COMPANY_NAME,
    tags: SEO_CONFIG.KEYWORDS.HOME,
  });
};

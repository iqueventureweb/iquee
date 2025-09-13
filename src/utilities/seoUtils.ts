import { SEO_CONFIG } from "@/lib/constants";
import type { Metadata } from "next";

// Enhanced SEO configuration
export const siteConfig = {
  name: SEO_CONFIG.COMPANY_NAME,
  description: SEO_CONFIG.DEFAULT_DESCRIPTION,
  url: SEO_CONFIG.BASE_URL,
  ogImage: "/ique-logo.webp",
  links: {
    twitter: SEO_CONFIG.SOCIAL_LINKS.TWITTER,
    linkedin: SEO_CONFIG.SOCIAL_LINKS.LINKEDIN,
  },
};

// Generate enhanced metadata
export const generateEnhancedMeta = (args: {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "service";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}): Metadata => {
  const {
    title,
    description,
    image,
    url,
    type = "website",
    publishedTime,
    modifiedTime,
    author,
    section,
    tags,
  } = args;

  const fullTitle = title
    ? `${title} | ${SEO_CONFIG.COMPANY_NAME}`
    : SEO_CONFIG.DEFAULT_TITLE;
  const fullDescription = description || SEO_CONFIG.DEFAULT_DESCRIPTION;
  const fullImage = image
    ? `${SEO_CONFIG.BASE_URL}${image}`
    : `${SEO_CONFIG.BASE_URL}/ique-logo.webp`;
  const fullUrl = url ? `${SEO_CONFIG.BASE_URL}${url}` : SEO_CONFIG.BASE_URL;

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: tags?.join(", ") || SEO_CONFIG.KEYWORDS.HOME.join(", "),
    authors: author ? [{ name: author }] : [{ name: SEO_CONFIG.COMPANY_NAME }],
    creator: SEO_CONFIG.COMPANY_NAME,
    publisher: SEO_CONFIG.COMPANY_NAME,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      siteName: SEO_CONFIG.COMPANY_NAME,
      title: fullTitle,
      description: fullDescription,
      url: fullUrl,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: "en_US",
      publishedTime,
      modifiedTime,
      authors: author ? [author] : [SEO_CONFIG.COMPANY_NAME],
      section,
      tags,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: fullDescription,
      images: [fullImage],
      creator: "@iqueventures",
      site: "@iqueventures",
    },
    alternates: {
      canonical: fullUrl,
    },
    category: section,
  };
};

// Generate structured data for different page types
export const generateStructuredData = (args: {
  type: "organization" | "website" | "article" | "service" | "breadcrumb";
  data: any;
}) => {
  const { type, data } = args;

  const baseData = {
    "@context": "https://schema.org",
    "@graph": [],
  };

  switch (type) {
    case "organization":
      return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SEO_CONFIG.COMPANY_NAME,
        description: SEO_CONFIG.DEFAULT_DESCRIPTION,
        url: SEO_CONFIG.BASE_URL,
        logo: `${SEO_CONFIG.BASE_URL}/ique-logo.webp`,
        sameAs: [
          SEO_CONFIG.SOCIAL_LINKS.TWITTER,
          SEO_CONFIG.SOCIAL_LINKS.LINKEDIN,
          SEO_CONFIG.SOCIAL_LINKS.FACEBOOK,
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          telephone: SEO_CONFIG.CONTACT.PHONE,
          email: SEO_CONFIG.CONTACT.EMAIL,
          areaServed: "IN",
          availableLanguage: "English",
        },
        address: [
          {
            "@type": "PostalAddress",
            addressLocality: SEO_CONFIG.CONTACT.ADDRESS.REGISTERED.CITY,
            addressRegion: SEO_CONFIG.CONTACT.ADDRESS.REGISTERED.STATE,
            addressCountry: SEO_CONFIG.CONTACT.ADDRESS.REGISTERED.COUNTRY,
            streetAddress: SEO_CONFIG.CONTACT.ADDRESS.REGISTERED.OFFICE,
          },
          {
            "@type": "PostalAddress",
            addressLocality: SEO_CONFIG.CONTACT.ADDRESS.CORPORATE.CITY,
            addressRegion: SEO_CONFIG.CONTACT.ADDRESS.CORPORATE.STATE,
            addressCountry: SEO_CONFIG.CONTACT.ADDRESS.CORPORATE.COUNTRY,
            streetAddress: SEO_CONFIG.CONTACT.ADDRESS.CORPORATE.OFFICE,
          },
        ],
        foundingDate: "2020",
        numberOfEmployees: "10-50",
        industry: "Business Services",
        serviceArea: {
          "@type": "Country",
          name: "India",
        },
      };

    case "website":
      return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SEO_CONFIG.COMPANY_NAME,
        description: SEO_CONFIG.DEFAULT_DESCRIPTION,
        url: SEO_CONFIG.BASE_URL,
        potentialAction: {
          "@type": "SearchAction",
          target: `${SEO_CONFIG.BASE_URL}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
        publisher: {
          "@type": "Organization",
          name: SEO_CONFIG.COMPANY_NAME,
          url: SEO_CONFIG.BASE_URL,
          logo: `${SEO_CONFIG.BASE_URL}/ique-logo.webp`,
        },
      };

    case "article":
      return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: data.title,
        description: data.description,
        image: data.image
          ? `${SEO_CONFIG.BASE_URL}${data.image}`
          : `${SEO_CONFIG.BASE_URL}/ique-logo.webp`,
        author: {
          "@type": "Person",
          name: data.author || "iQue Team",
        },
        publisher: {
          "@type": "Organization",
          name: SEO_CONFIG.COMPANY_NAME,
          logo: {
            "@type": "ImageObject",
            url: `${SEO_CONFIG.BASE_URL}/ique-logo.webp`,
          },
        },
        datePublished: data.publishedTime,
        dateModified: data.modifiedTime,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${SEO_CONFIG.BASE_URL}/blogs/${data.slug}`,
        },
        articleSection: "Business",
        keywords: SEO_CONFIG.KEYWORDS.BLOG.join(", "),
      };

    case "service":
      return {
        "@context": "https://schema.org",
        "@type": "Service",
        name: data.title,
        description: data.description,
        provider: {
          "@type": "Organization",
          name: SEO_CONFIG.COMPANY_NAME,
          url: SEO_CONFIG.BASE_URL,
        },
        areaServed: {
          "@type": "Country",
          name: "India",
        },
        serviceType: data.category || "Business Service",
        category: "Business Services",
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          priceCurrency: "INR",
        },
      };

    case "breadcrumb":
      return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: data.items.map((item: any, index: number) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: `${SEO_CONFIG.BASE_URL}${item.url}`,
        })),
      };

    default:
      return baseData;
  }
};

// Generate breadcrumb data
export const generateBreadcrumbs = (
  items: Array<{ name: string; url: string }>
) => {
  return generateStructuredData({
    type: "breadcrumb",
    data: { items },
  });
};

// Generate page-specific metadata
export const generatePageMeta = (pageType: keyof typeof SEO_CONFIG.PAGES) => {
  const pageData = SEO_CONFIG.PAGES[pageType];
  return generateEnhancedMeta({
    title: pageData.TITLE,
    description: pageData.DESCRIPTION,
    url: `/${pageType.toLowerCase()}`,
    type: "website",
    section: pageType,
    tags: pageData.KEYWORDS.split(", "),
  });
};

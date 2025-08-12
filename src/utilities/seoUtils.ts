import type { Metadata } from "next";
import { getServerSideURL } from "./getURL";

// Enhanced SEO configuration
export const siteConfig = {
  name: "iQue",
  description:
    "Let's create a better startup ecosystem through collaboration, mentorship, and resources.",
  url: getServerSideURL(),
  ogImage: "/website-template-OG.webp",
  links: {
    twitter: "https://twitter.com/ique",
    linkedin: "https://linkedin.com/company/ique",
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

  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const fullDescription = description || siteConfig.description;
  const fullImage = image
    ? `${siteConfig.url}${image}`
    : `${siteConfig.url}${siteConfig.ogImage}`;
  const fullUrl = url ? `${siteConfig.url}${url}` : siteConfig.url;

  return {
    title: fullTitle,
    description: fullDescription,
    keywords:
      tags?.join(", ") ||
      "startup ecosystem, entrepreneurship, mentorship, collaboration, innovation",
    authors: author ? [{ name: author }] : undefined,
    creator: siteConfig.name,
    publisher: siteConfig.name,
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
      siteName: siteConfig.name,
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
      authors: author ? [author] : undefined,
      section,
      tags,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: fullDescription,
      images: [fullImage],
      creator: "@ique",
      site: "@ique",
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
        name: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        logo: `${siteConfig.url}/ique-logo.svg`,
        sameAs: [siteConfig.links.twitter, siteConfig.links.linkedin],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          areaServed: "IN",
          availableLanguage: "English",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bangalore",
          addressCountry: "IN",
        },
      };

    case "website":
      return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteConfig.url}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      };

    case "article":
      return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: data.title,
        description: data.description,
        image: data.image
          ? `${siteConfig.url}${data.image}`
          : `${siteConfig.url}${siteConfig.ogImage}`,
        author: {
          "@type": "Person",
          name: data.author || "iQue Team",
        },
        publisher: {
          "@type": "Organization",
          name: siteConfig.name,
          logo: {
            "@type": "ImageObject",
            url: `${siteConfig.url}/ique-logo.svg`,
          },
        },
        datePublished: data.publishedTime,
        dateModified: data.modifiedTime,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${siteConfig.url}/blogs/${data.slug}`,
        },
      };

    case "service":
      return {
        "@context": "https://schema.org",
        "@type": "Service",
        name: data.title,
        description: data.description,
        provider: {
          "@type": "Organization",
          name: siteConfig.name,
        },
        areaServed: {
          "@type": "Country",
          name: "India",
        },
        serviceType: data.category || "Business Service",
      };

    case "breadcrumb":
      return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: data.items.map((item: any, index: number) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
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

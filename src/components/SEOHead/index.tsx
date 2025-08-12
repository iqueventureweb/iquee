"use client";

import { useEffect } from "react";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "service";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

export function SEOHead({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  ogType = "website",
  publishedTime,
  modifiedTime,
  author,
  section,
  tags,
}: SEOHeadProps) {
  useEffect(() => {
    // Update document title if provided
    if (title) {
      document.title = title;
    }

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (description && metaDescription) {
      metaDescription.setAttribute("content", description);
    }

    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (keywords && metaKeywords) {
      metaKeywords.setAttribute("content", keywords);
    }

    // Update canonical link
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonical && canonicalLink) {
      canonicalLink.setAttribute("href", canonical);
    }

    // Update Open Graph tags
    const updateOGTag = (property: string, content: string) => {
      const ogTag = document.querySelector(`meta[property="${property}"]`);
      if (ogTag) {
        ogTag.setAttribute("content", content);
      }
    };

    if (title) updateOGTag("og:title", title);
    if (description) updateOGTag("og:description", description);
    if (ogImage) updateOGTag("og:image", ogImage);
    if (ogType) updateOGTag("og:type", ogType);
    if (publishedTime) updateOGTag("article:published_time", publishedTime);
    if (modifiedTime) updateOGTag("article:modified_time", modifiedTime);
    if (author) updateOGTag("article:author", author);
    if (section) updateOGTag("article:section", section);
    if (tags) updateOGTag("article:tag", tags.join(", "));

    // Update Twitter Card tags
    const updateTwitterTag = (name: string, content: string) => {
      const twitterTag = document.querySelector(`meta[name="${name}"]`);
      if (twitterTag) {
        twitterTag.setAttribute("content", content);
      }
    };

    if (title) updateTwitterTag("twitter:title", title);
    if (description) updateTwitterTag("twitter:description", description);
    if (ogImage) updateTwitterTag("twitter:image", ogImage);
  }, [
    title,
    description,
    keywords,
    canonical,
    ogImage,
    ogType,
    publishedTime,
    modifiedTime,
    author,
    section,
    tags,
  ]);

  return null; // This component doesn't render anything
}

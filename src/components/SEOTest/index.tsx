"use client";

import { useEffect, useState } from "react";

interface SEOTestProps {
  pageUrl: string;
}

export function SEOTest({ pageUrl }: SEOTestProps) {
  const [seoScore, setSeoScore] = useState<number>(0);
  const [issues, setIssues] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const analyzeSEO = async () => {
      try {
        // Basic SEO checks
        const checks = [];

        // Check title
        const title = document.title;
        if (title && title.length > 10 && title.length < 60) {
          checks.push(1);
        } else {
          checks.push(0);
          setIssues((prev) => [
            ...prev,
            "Title should be between 10-60 characters",
          ]);
        }

        // Check meta description
        const metaDesc = document.querySelector('meta[name="description"]');
        if (
          metaDesc &&
          metaDesc.getAttribute("content") &&
          metaDesc.getAttribute("content")!.length > 50 &&
          metaDesc.getAttribute("content")!.length < 160
        ) {
          checks.push(1);
        } else {
          checks.push(0);
          setIssues((prev) => [
            ...prev,
            "Meta description should be between 50-160 characters",
          ]);
        }

        // Check headings
        const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
        if (headings.length > 0) {
          const h1Count = document.querySelectorAll("h1").length;
          if (h1Count === 1) {
            checks.push(1);
          } else {
            checks.push(0);
            setIssues((prev) => [...prev, "Should have exactly one H1 tag"]);
          }
        } else {
          checks.push(0);
          setIssues((prev) => [...prev, "No headings found"]);
        }

        // Check images
        const images = document.querySelectorAll("img");
        let imagesWithAlt = 0;
        images.forEach((img) => {
          if (img.alt && img.alt.trim() !== "") {
            imagesWithAlt++;
          }
        });

        if (images.length === 0 || imagesWithAlt / images.length > 0.8) {
          checks.push(1);
        } else {
          checks.push(0);
          setIssues((prev) => [...prev, "Most images should have alt text"]);
        }

        // Check links
        const links = document.querySelectorAll("a");
        let linksWithText = 0;
        links.forEach((link) => {
          if (link.textContent && link.textContent.trim() !== "") {
            linksWithText++;
          }
        });

        if (links.length === 0 || linksWithText / links.length > 0.9) {
          checks.push(1);
        } else {
          checks.push(0);
          setIssues((prev) => [
            ...prev,
            "Most links should have descriptive text",
          ]);
        }

        // Calculate score
        const score = Math.round(
          (checks.reduce((a, b) => a + b, 0) / checks.length) * 100
        );
        setSeoScore(score);
      } catch (error) {
        console.error("SEO analysis failed:", error);
      } finally {
        setLoading(false);
      }
    };

    analyzeSEO();
  }, [pageUrl]);

  if (loading) {
    return (
      <div className="p-4 bg-blue-50 rounded-lg">
        <div className="text-blue-800">Analyzing SEO...</div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-50 rounded-lg border">
      <h3 className="text-lg font-semibold mb-3">SEO Analysis for {pageUrl}</h3>

      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-medium">SEO Score:</span>
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${
                seoScore >= 80
                  ? "bg-green-500"
                  : seoScore >= 60
                    ? "bg-yellow-500"
                    : "bg-red-500"
              }`}
              style={{ width: `${seoScore}%` }}
            ></div>
          </div>
          <span className="text-sm font-bold">{seoScore}/100</span>
        </div>

        <div className="text-xs text-gray-600">
          {seoScore >= 80
            ? "Excellent SEO!"
            : seoScore >= 60
              ? "Good SEO, room for improvement"
              : "SEO needs attention"}
        </div>
      </div>

      {issues.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2 text-red-700">
            Issues Found:
          </h4>
          <ul className="text-xs text-red-600 space-y-1">
            {issues.map((issue, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                {issue}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="text-xs text-gray-500">
        This is a basic SEO analysis. For comprehensive analysis, use tools like
        Google PageSpeed Insights or Lighthouse.
      </div>
    </div>
  );
}

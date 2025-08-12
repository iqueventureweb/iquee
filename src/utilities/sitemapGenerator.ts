import { getServerSideURL } from "./getURL";

interface SitemapItem {
  loc: string;
  lastmod: string;
  changefreq:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority: number;
}

interface SitemapConfig {
  siteUrl: string;
  pages: SitemapItem[];
  services?: Array<{ slug: string; updatedAt?: string }>;
  blogs?: Array<{ slug: string; updatedAt?: string }>;
}

export class SitemapGenerator {
  private config: SitemapConfig;

  constructor(config: SitemapConfig) {
    this.config = config;
  }

  generateMainSitemap(): string {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${this.config.pages.map((page) => this.generateUrlElement(page)).join("\n")}
</urlset>`;

    return sitemap;
  }

  generateServicesSitemap(): string {
    if (!this.config.services || this.config.services.length === 0) {
      return "";
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${this.config.services
  .map((service) =>
    this.generateUrlElement({
      loc: `/services/${service.slug}`,
      lastmod: service.updatedAt || new Date().toISOString(),
      changefreq: "weekly",
      priority: 0.8,
    })
  )
  .join("\n")}
</urlset>`;

    return sitemap;
  }

  generateBlogsSitemap(): string {
    if (!this.config.blogs || this.config.blogs.length === 0) {
      return "";
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${this.config.blogs
  .map((blog) =>
    this.generateUrlElement({
      loc: `/blogs/${blog.slug}`,
      lastmod: blog.updatedAt || new Date().toISOString(),
      changefreq: "monthly",
      priority: 0.6,
    })
  )
  .join("\n")}
</urlset>`;

    return sitemap;
  }

  private generateUrlElement(item: SitemapItem): string {
    return `  <url>
    <loc>${this.config.siteUrl}${item.loc}</loc>
    <lastmod>${item.lastmod}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`;
  }

  generateSitemapIndex(): string {
    const sitemaps = [
      `${this.config.siteUrl}/sitemap.xml`,
      ...(this.config.services && this.config.services.length > 0
        ? [`${this.config.siteUrl}/services-sitemap.xml`]
        : []),
      ...(this.config.blogs && this.config.blogs.length > 0
        ? [`${this.config.siteUrl}/blogs-sitemap.xml`]
        : []),
    ];

    const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps
  .map(
    (sitemap) => `  <sitemap>
    <loc>${sitemap}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`
  )
  .join("\n")}
</sitemapindex>`;

    return sitemapIndex;
  }
}

// Default sitemap configuration
export const defaultSitemapConfig: SitemapConfig = {
  siteUrl: getServerSideURL(),
  pages: [
    {
      loc: "/",
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: 1.0,
    },
    {
      loc: "/#services",
      lastmod: new Date().toISOString(),
      changefreq: "weekly",
      priority: 0.8,
    },
    {
      loc: "/#about",
      lastmod: new Date().toISOString(),
      changefreq: "weekly",
      priority: 0.8,
    },
    {
      loc: "/#contact",
      lastmod: new Date().toISOString(),
      changefreq: "weekly",
      priority: 0.8,
    },
    {
      loc: "/#blogs",
      lastmod: new Date().toISOString(),
      changefreq: "weekly",
      priority: 0.8,
    },
  ],
};

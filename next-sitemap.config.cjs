const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  'https://ique.com'

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  exclude: [
    '/admin/*',
    '/api/*',
    '/_next/*',
    '/404',
    '/500',
    '/sitemap.xml',
    '/robots.txt',
    '/test/*',
    '/dev/*'
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: [
          '/admin/*',
          '/api/*',
          '/_next/*',
          '/404',
          '/500',
          '/test/*',
          '/dev/*'
        ],
        allow: [
          '/',
          '/services/*',
          '/blogs/*',
          '/#*',
          '/search'
        ]
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/*', '/api/*'],
        crawlDelay: 1
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/admin/*', '/api/*'],
        crawlDelay: 1
      }
    ],
    additionalSitemaps: [
      `${SITE_URL}/sitemap.xml`,
      `${SITE_URL}/services-sitemap.xml`,
      `${SITE_URL}/blogs-sitemap.xml`
    ],
    host: SITE_URL,
  },
  sitemapSize: 5000,
  changefreq: 'weekly',
  priority: 0.7,
  transform: async (config, path) => {
    // Custom priority and changefreq for different page types
    let priority = 0.7;
    let changefreq = 'weekly';
    
    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path.startsWith('/services/')) {
      priority = 0.8;
      changefreq = 'weekly';
    } else if (path.startsWith('/blogs/')) {
      priority = 0.6;
      changefreq = 'monthly';
    } else if (path.includes('#')) {
      priority = 0.5;
      changefreq = 'monthly';
    }
    
    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
      alternateRefs: [
        {
          href: `${SITE_URL}${path}`,
          hreflang: 'en',
        },
      ],
    };
  },
  // Generate additional sitemaps for better organization
  additionalPaths: async (config) => {
    const result = [];
    
    // Add homepage sections
    result.push({
      loc: '/#home',
      changefreq: 'weekly',
      priority: 0.9,
      lastmod: new Date().toISOString(),
    });
    
    result.push({
      loc: '/#services',
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    });
    
    result.push({
      loc: '/#about',
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    });
    
    result.push({
      loc: '/#contact',
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    });
    
    result.push({
      loc: '/#blog',
      changefreq: 'weekly',
      priority: 0.6,
      lastmod: new Date().toISOString(),
    });
    
    return result;
  },
}

# Dynamic Homepage Implementation with Payload CMS

This implementation provides dynamic fetching with on-demand revalidation using Next.js `unstable_cache` for the homepage components.

## Overview

The system now fetches homepage data from Payload CMS and passes it to all relevant components. Each component has fallback data to ensure the site works even if CMS data is unavailable.

## Files Modified/Created

### Core Implementation

1. **`src/lib/fetchMethods.ts`** - Main data fetching logic
   - `getHomePage()` - Cached function to fetch homepage data
   - `getServices()` - Cached function to fetch services data
   - `getBlogs(limit)` - Cached function to fetch blogs data (default limit: 3)
   - `revalidateHomePage()`, `revalidateServices()`, `revalidateBlogs()` - Server actions for cache revalidation
   - Uses `unstable_cache` with 1-hour TTL and respective tags

2. **`src/app/(frontend)/page.tsx`** - Updated to be async and fetch data
   - Now fetches homepage, services, and blogs data using Promise.all for parallel fetching
   - Passes specific data sections to each component
   - Optimized for performance with concurrent data fetching

### Component Updates

All homepage components now accept optional data props and fall back to default data:

3. **`src/components/AchievementsSection/index.tsx`**
   - Accepts `achievement` data from CMS
   - Uses dynamic title, description, and achievement counts

4. **`src/components/HomeServicesSection/index.tsx`**
   - Accepts both `featured_services` data from HomePage CMS and `services` from Services collection
   - Prioritizes Services collection data over HomePage featured_services
   - Maps CMS data to component format with icons, titles, descriptions, and images
   - Falls back to default data if no CMS data is available

5. **`src/components/TrustSection/index.tsx`**
   - Accepts `trusted_companies` data from CMS
   - Uses dynamic company logos with dimensions

6. **`src/components/OurStorySection/index.tsx`**
   - Accepts `our_story` data from CMS
   - Uses dynamic title and description

7. **`src/components/TestimonialsSection/index.tsx`**
   - Accepts `testimonials` data from CMS
   - Uses dynamic testimonial content, authors, roles, and avatars

8. **`src/components/StaffSection/index.tsx`**
   - Accepts `staff` data from CMS
   - Uses dynamic staff information including names, roles, quotes, and images

9. **`src/components/LatestNewsSection/index.tsx`**
   - Accepts `blogs` data from Blogs collection
   - Converts Blog data to NewsArticle format with proper date formatting
   - First blog is automatically featured
   - Falls back to default articles if no blogs available

### API Routes

10. **`src/app/api/revalidate/homepage/route.ts`**
    - POST endpoint to trigger homepage cache revalidation
    - Call: `POST /api/revalidate/homepage?secret=YOUR_SECRET`

11. **`src/app/api/revalidate/services/route.ts`**
    - POST endpoint to trigger services cache revalidation
    - Call: `POST /api/revalidate/services?secret=YOUR_SECRET`

12. **`src/app/api/revalidate/blogs/route.ts`**
    - POST endpoint to trigger blogs cache revalidation
    - Call: `POST /api/revalidate/blogs?secret=YOUR_SECRET`

13. **`src/app/api/seed-homepage/route.ts`**
    - POST endpoint to seed initial homepage CMS data
    - Call: `POST /api/seed-homepage?secret=YOUR_SECRET`

14. **`src/app/api/seed-services-blogs/route.ts`**
    - POST endpoint to seed initial services and blogs data
    - Call: `POST /api/seed-services-blogs?secret=YOUR_SECRET`

### Utilities

15. **`src/lib/seed-homepage.ts`**
    - Function to populate CMS with sample homepage data
    - Creates all sections with realistic content
    - Checks for existing data before creating

16. **`src/lib/seed-services-blogs.ts`**
    - Functions to populate Services and Blogs collections
    - `seedServices()` - Creates sample services with blocks
    - `seedBlogs()` - Creates sample blog posts with content
    - `seedServicesAndBlogs()` - Seeds both collections in parallel

## CMS Data Structure

### Homepage Collection (`home-page`)

- **achievement**: Title, description, and array of achievement counts
- **trusted_companies**: Array of company logos with dimensions
- **our_story**: Title, description, and content array (Mission/Vision)
- **featured_services**: Array of services with icons, titles, descriptions
- **testimonials**: Array of user testimonials with quotes and author info
- **staff**: Array of staff members with names, roles, quotes, images

### Services Collection (`services`)

- **title**: Service name
- **slug**: URL-friendly service identifier
- **blocks**: Array of content blocks with titles and descriptions
- **projects**: Related projects (join relationship)

### Blogs Collection (`blogs`)

- **title**: Blog post title
- **slug**: URL-friendly blog identifier
- **author**: Blog post author
- **content**: Blog post content
- **timestamps**: Created/updated dates

## Key Features

### 1. Caching Strategy

- Uses Next.js `unstable_cache` for efficient data caching
- 1-hour cache TTL with tag-based revalidation
- Automatic cache invalidation on data updates

### 2. Fallback Data

- Every component has default/fallback data
- Site remains functional even if CMS is unavailable
- Graceful degradation for better user experience

### 3. Type Safety

- All components use TypeScript interfaces
- CMS data types imported from `payload-types.ts`
- Ensures type safety throughout the application

### 4. On-Demand Revalidation

- API endpoint for manual cache invalidation
- Can be triggered from CMS webhooks
- Immediate content updates when needed

## Usage

### 1. Seeding Initial Data

```bash
# Call the seeding endpoint (development)
curl -X POST "http://localhost:3000/api/seed-homepage?secret=YOUR_SECRET"
```

### 2. Revalidating Cache

```bash
# Manually revalidate homepage cache
curl -X POST "http://localhost:3000/api/revalidate/homepage?secret=YOUR_SECRET"
```

### 3. CMS Integration

1. Access Payload admin at `/admin`
2. Navigate to collections:
   - "Home Page" - Homepage content sections
   - "Services" - Service offerings and details
   - "Blogs" - Latest news and blog posts
3. Create/edit content in any collection
4. Changes will be reflected after cache expiry or manual revalidation

## Environment Variables

Add these to your `.env.local`:

```env
# Optional: Secret for API security
REVALIDATION_SECRET=your_revalidation_secret_here
SEED_SECRET=your_seed_secret_here
```

## Webhook Integration (Optional)

To automatically revalidate cache when CMS content changes, set up a webhook in Payload CMS:

1. Go to Payload admin settings
2. Add webhook URL: `YOUR_DOMAIN/api/revalidate/homepage?secret=YOUR_SECRET`
3. Configure for "home-page" collection updates

## Benefits

1. **Performance**: Cached data with minimal database queries
2. **Reliability**: Fallback data ensures site availability
3. **Flexibility**: Easy content management through CMS
4. **Scalability**: Efficient caching reduces server load
5. **Developer Experience**: Type-safe implementation with clear interfaces

## Next Steps

1. Set up webhook for automatic revalidation
2. Add more granular caching for individual sections
3. Implement loading states for better UX
4. Add error boundaries for better error handling
5. Consider implementing incremental static regeneration (ISR)

# Services Page Implementation

This document describes the complete implementation of the services page system with individual service pages and project showcases.

## Overview

The services page system provides:

- **Individual Service Pages**: `/services/[slug]` - Detailed service information with hero section, content blocks, and related projects
- **Project Detail Pages**: `/services/[serviceSlug]/project/[projectSlug]` - Individual project showcases with comprehensive details
- **Dynamic Data Fetching**: Using `unstable_cache` with on-demand revalidation
- **Beautiful UI Design**: Following the site's design theme with modern gradients and layouts

## Architecture

### 1. Data Layer (`src/lib/fetchMethods.ts`)

#### New Functions Added:

```typescript
// Get individual service by slug
export const getServiceBySlug = unstable_cache(
  async (slug: string): Promise<Service | null> => {
    /* ... */
  },
  ["service-by-slug"],
  { tags: ["services"], revalidate: 3600 }
);

// Get projects by service ID
export const getProjectsByService = unstable_cache(
  async (serviceId: string): Promise<Project[]> => {
    /* ... */
  },
  ["projects-by-service"],
  { tags: ["projects", "services"], revalidate: 3600 }
);
```

### 2. Collections Structure

#### Services Collection (`src/collections/Services/index.ts`)

- `title` - Service name
- `slug` - URL-friendly identifier
- `blocks` - Array of content blocks with title and HTML content
- `projects` - Relationship to projects collection

#### Projects Collection (`src/collections/Products.ts`)

- Uses existing `products` collection with slug "projects"
- `title` - Project name
- `slug` - URL-friendly identifier
- `description` - Brief project description
- `blocks` - Array of content blocks with HTML content
- `faq` - Frequently asked questions array
- `services` - Relationship to services

## Page Structure

### 1. Service Page (`/services/[slug]`)

**File**: `src/app/(frontend)/services/[slug]/page.tsx`

**Components Used**:

- `ServiceHero` - Full-screen hero with gradient background
- `ServiceContent` - Service details and process information
- `ProjectsGrid` - Grid layout of related projects

**Features**:

- Fetches service data using `getServiceBySlug()`
- Fetches related projects using `getProjectsByService()`
- Handles 404 for non-existent services
- Responsive design with mobile-first approach

### 2. Project Page (`/services/[serviceSlug]/project/[projectSlug]`)

**File**: `src/app/(frontend)/services/[slug]/project/[projectSlug]/page.tsx`

**Components Used**:

- `ProjectHero` - Hero section with project overview
- `ProjectContent` - Detailed project information

**Features**:

- Nested routing structure
- Breadcrumb navigation back to service
- Project-specific content and FAQ section

## Components

### 1. ServiceHero (`src/components/ServiceHero/index.tsx`)

**Design Features**:

- Full-screen gradient background (neutral-900 to black)
- Floating decorative elements with blur effects
- Large typography using Epilogue font
- Back navigation with smooth hover transitions
- CTA buttons with different styles
- Scroll indicator at bottom

**Props**:

- `service: Service` - Service data from CMS

### 2. ServiceContent (`src/components/ServiceContent/index.tsx`)

**Design Features**:

- Clean white background
- Centered content with max-width
- Service blocks rendered as HTML (dangerouslySetInnerHTML)
- Key features and process sections with gradient backgrounds
- Icon-based information cards
- Numbered process steps

**Props**:

- `service: Service` - Service data from CMS

### 3. ProjectsGrid (`src/components/ProjectsGrid/index.tsx`)

**Design Features**:

- Responsive grid layout (1 column mobile, 2 tablet, 3 desktop)
- Card-based design with hover effects
- Gradient placeholder images
- Hover animations (lift effect, icon scaling)
- Empty state handling
- Click navigation to project details

**Props**:

- `projects: Project[]` - Array of projects
- `serviceSlug: string` - Service slug for navigation

**Features**:

- Maps project data to cards
- Handles click navigation to project pages
- Shows project metadata (title, description, date)
- Gradient backgrounds for visual appeal

### 4. ProjectHero (`src/components/ProjectHero/index.tsx`)

**Design Features**:

- Dark gradient background (slate colors)
- Two-column layout with content and visual
- Service tag badge
- Project metadata and action buttons
- Mock project preview with stats
- Floating decorative elements

**Props**:

- `project: Project` - Project data
- `service: Service` - Parent service data

### 5. ProjectContent (`src/components/ProjectContent/index.tsx`)

**Design Features**:

- White background for readability
- Project overview with HTML content rendering
- Key features grid with icons and gradients
- FAQ accordion-style layout
- Call-to-action section with dark gradient
- Responsive typography and spacing

**Props**:

- `project: Project` - Project data

## Styling & Design System

### Color Palette

- **Backgrounds**: White, neutral-50, neutral-900
- **Gradients**: Blue-to-purple, emerald-to-teal, orange-to-red
- **Text**: neutral-900 (headings), neutral-600 (body), white (dark sections)

### Typography

- **Headings**: `font-['Epilogue']` - Bold, modern sans-serif
- **Body Text**: `font-['DM_Sans']` - Clean, readable sans-serif
- **Sizes**: Responsive scaling from mobile to desktop

### Layout Patterns

- **Container**: `container mx-auto px-4 sm:px-6 lg:px-8`
- **Spacing**: Consistent padding/margin using Tailwind scale
- **Rounded Corners**: `rounded-3xl` for cards, `rounded-full` for buttons
- **Shadows**: Subtle shadows with hover states

### Interactive Elements

- **Hover Effects**: Transform, scale, color transitions
- **Buttons**: Rounded-full with distinct primary/secondary styles
- **Cards**: Lift effect on hover with smooth transitions

## Navigation Flow

```
Homepage
├── Services Section (HomeServicesSection)
│   └── Click Service Card
│       └── /services/[slug] (ServicePage)
│           ├── Service Hero
│           ├── Service Content
│           └── Projects Grid
│               └── Click Project Card
│                   └── /services/[slug]/project/[projectSlug] (ProjectPage)
│                       ├── Project Hero
│                       └── Project Content
```

## Data Flow

1. **Service Navigation**: HomeServicesSection → Click → `/services/creating-entrepreneurs`
2. **Data Fetching**: `getServiceBySlug("creating-entrepreneurs")`
3. **Projects Loading**: `getProjectsByService(service.id)`
4. **Project Navigation**: ProjectsGrid → Click → `/services/creating-entrepreneurs/project/startup-accelerator`
5. **Project Data**: Found in fetched projects array by slug

## Performance Optimization

### Caching Strategy

- **Service Data**: Cached for 1 hour with "services" tag
- **Projects Data**: Cached for 1 hour with "projects" and "services" tags
- **Revalidation**: On-demand when collections are updated

### Static Generation

- `generateStaticParams()` functions ready for implementation
- Can pre-generate all service and project pages at build time

## Implementation Notes

### HTML Content Rendering

- Service and project content blocks support full HTML
- Uses `dangerouslySetInnerHTML` for CMS content
- Styled with Tailwind's prose classes for proper typography

### Responsive Design

- Mobile-first approach with progressive enhancement
- Grid layouts that adapt to screen size
- Typography scaling for different breakpoints

### Error Handling

- 404 pages for non-existent services/projects
- Graceful fallbacks for missing data
- Empty states for projects with clear messaging

## Future Enhancements

### Potential Additions:

1. **Image Galleries**: Real project images from CMS
2. **Technology Tags**: Filterable project technologies
3. **Client Testimonials**: Per-project testimonials
4. **Related Projects**: Cross-service project recommendations
5. **Social Sharing**: Share project case studies
6. **SEO Optimization**: Dynamic meta tags and structured data
7. **Search Functionality**: Search across services and projects

### Performance Improvements:

1. **Image Optimization**: Next.js Image component with proper sizing
2. **Lazy Loading**: Progressive loading for project grids
3. **Prefetching**: Link prefetching for better navigation
4. **Bundle Splitting**: Component-level code splitting

## Testing

### Manual Testing Checklist:

- [ ] Service page loads with correct data
- [ ] Projects grid displays related projects
- [ ] Project detail pages accessible via grid clicks
- [ ] Navigation breadcrumbs work correctly
- [ ] Responsive design works across devices
- [ ] HTML content renders properly
- [ ] 404 handling for invalid slugs
- [ ] Loading states and error boundaries

### Automated Testing Opportunities:

- Unit tests for fetch functions
- Component rendering tests
- Navigation flow integration tests
- Performance monitoring and analytics

This implementation provides a complete, scalable foundation for showcasing services and projects with a beautiful, modern design that matches the site's aesthetic.

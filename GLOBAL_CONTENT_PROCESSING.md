# Global Content Processing Implementation

This document describes the global content processing functions added to handle blog editor content throughout the application.

## 🚀 New Global Functions in `globalMethods.ts`

### 1. `processEditorContent(htmlContent: string): string`

**Purpose**: Centralized function to process content from blog editors with security and decoding features.

**Features**:

- ✅ Base64 decoding using existing `decodeArticleContent()`
- ✅ HTML detection using existing `isHTMLString()`
- ✅ Security cleanup (removes script tags)
- ✅ SSR compatibility with fallback
- ✅ Domain replacement support (ready to configure)
- ✅ Error handling with graceful fallbacks

**Usage**:

```typescript
import { processEditorContent } from "@/lib/globalMethods";

const cleanContent = processEditorContent(rawContent);
```

### 2. `processContentBlocks<T>(blocks): Array<{title: string, content: string}>`

**Purpose**: Process arrays of content blocks (used in Services, Projects, etc.)

**Features**:

- ✅ Generic type support for different block structures
- ✅ Handles null/undefined arrays gracefully
- ✅ Processes each block's content with `processEditorContent()`
- ✅ Returns consistent format with title and content

**Usage**:

```typescript
import { processContentBlocks } from "@/lib/globalMethods";

const processedBlocks = processContentBlocks(service?.blocks);
```

## 📁 **Updated Components**

### 1. ServiceContent (`src/components/ServiceContent/index.tsx`)

**Before**:

```typescript
const processedBlocks = useMemo(() => {
  const processContent = (htmlContent: string) => {
    // 40+ lines of processing logic
  };
  // More processing code...
}, [service]);
```

**After**:

```typescript
const processedBlocks = useMemo(() => {
  return processContentBlocks(service?.blocks);
}, [service]);
```

**Reduction**: ~40 lines → 3 lines ✨

### 2. ProjectContent (`src/components/ProjectContent/index.tsx`)

Same simplification as ServiceContent - reduced from complex processing logic to a single function call.

### 3. ContentEditor (`src/collections/Blogs/CustomContentEditor/ContentEditor.tsx`)

Added import for `processEditorContent` for potential future use in editor preview modes.

## 🛠 **New Reusable Component**

### EditorContent (`src/components/EditorContent/index.tsx`)

**Purpose**: Reusable component for rendering processed editor content anywhere in the app.

**Features**:

- ✅ Automatic content processing
- ✅ Customizable CSS classes
- ✅ Built-in null handling
- ✅ Memoized processing for performance
- ✅ TypeScript support

**Usage Examples**:

```typescript
// Basic usage
<EditorContent content={blog.content} />

// With custom styling
<EditorContent
  content={service.blocks[0].content}
  className="prose prose-lg custom-styles"
/>

// In any component
<EditorContent content={project.description} />
```

### useProcessedContent Hook

For cases where you need the processed content as a string:

```typescript
const processedContent = useProcessedContent(blog.content);
```

## 📊 **Benefits of Global Approach**

### ✅ **Consistency**

- All editor content processed the same way
- Same security measures applied everywhere
- Consistent error handling

### ✅ **Maintainability**

- Single place to update processing logic
- Easy to add new domain replacements
- Centralized security updates

### ✅ **Performance**

- Memoized processing in components
- Reusable functions prevent code duplication
- Optimized for both SSR and client-side

### ✅ **Developer Experience**

- Simple API: `processEditorContent(content)`
- Type-safe with TypeScript
- Clear function names and documentation

## 🔄 **Usage Patterns**

### Pattern 1: Single Content Processing

```typescript
// For individual content fields
const content = processEditorContent(blog.content);
```

### Pattern 2: Block Array Processing

```typescript
// For arrays of content blocks
const blocks = processContentBlocks(service?.blocks);
```

### Pattern 3: Component Rendering

```typescript
// For direct rendering in components
<EditorContent content={anyContent} />
```

### Pattern 4: Hook Usage

```typescript
// For accessing processed content in custom logic
const processed = useProcessedContent(content);
```

## 🚀 **Future Enhancements**

The global functions are designed to be extensible:

### Domain Replacements

Uncomment and configure in `processEditorContent()`:

```typescript
modifiedHtml = modifiedHtml.replaceAll("old-domain.com", "new-domain.com");
modifiedHtml = modifiedHtml.replaceAll(
  "https://exams.old-domain.com",
  `${process.env.NEXT_PUBLIC_SITE_URL}/mock-exams`
);
```

### Additional Security

Add more security measures as needed:

```typescript
// Remove iframe tags
const iframes = doc.querySelectorAll("iframe");
iframes.forEach((iframe) => iframe.remove());

// Sanitize attributes
const links = doc.querySelectorAll("a");
links.forEach((link) => {
  if (link.getAttribute("href")?.startsWith("javascript:")) {
    link.removeAttribute("href");
  }
});
```

### Content Analytics

Add tracking for content processing:

```typescript
// Track content types
if (decodedContent.includes("<img")) {
  analytics.track("content_with_images");
}
```

## 📚 **Places to Use**

These functions can be used anywhere editor content appears:

### ✅ **Current Usage**:

- Service pages (`ServiceContent`)
- Project pages (`ProjectContent`)
- Blog editor (`ContentEditor`)

### 🎯 **Potential Future Usage**:

- Blog display pages
- Homepage content blocks
- Newsletter content
- FAQ content
- About page content
- Any CMS-managed content

## 🔧 **Migration Guide**

To migrate existing content processing:

1. **Replace custom processing**:

   ```typescript
   // Before
   const processed = decodeArticleContent(content);

   // After
   const processed = processEditorContent(content);
   ```

2. **Replace block processing**:

   ```typescript
   // Before
   const blocks =
     service?.blocks?.map((block) => ({
       title: block.title || "",
       content: block.content ? customProcess(block.content) : "",
     })) || [];

   // After
   const blocks = processContentBlocks(service?.blocks);
   ```

3. **Use component for rendering**:

   ```typescript
   // Before
   <div dangerouslySetInnerHTML={{ __html: processedContent }} />

   // After
   <EditorContent content={rawContent} />
   ```

This global approach ensures consistent, secure, and maintainable content processing across the entire application! 🎉

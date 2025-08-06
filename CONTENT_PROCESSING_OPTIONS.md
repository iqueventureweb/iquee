# Content Processing Options

## ✅ Current Implementation (useMemo)

**What I just updated:**

- Replaced `useEffect` + `useState` with `useMemo`
- Added SSR safety check (`typeof window !== 'undefined'`)
- Content processing happens during render, not after mount

### Benefits:

- ✅ No extra re-renders from useEffect
- ✅ Automatic memoization when service/project changes
- ✅ SSR compatible with fallback
- ✅ Still handles DOMParser for script removal

### Code:

```typescript
const processedBlocks = useMemo(() => {
  const processContent = (htmlContent: string) => {
    const decodedContent = isHTMLString(htmlContent)
      ? htmlContent
      : decodeArticleContent(htmlContent) || htmlContent;

    if (typeof window !== "undefined") {
      // Client-side DOM processing
      const doc = new DOMParser().parseFromString(decodedContent, "text/html");
      // ... security cleanup
      return doc.body.innerHTML;
    }

    // SSR fallback
    return decodedContent;
  };

  return (
    service?.blocks?.map((block) => ({
      title: block.title || "",
      content: block.content ? processContent(block.content) : undefined,
    })) || []
  );
}, [service]);
```

## 🚀 Alternative: Server-Side Processing

If you want to eliminate client-side processing entirely:

### Option A: Process in fetchMethods.ts

```typescript
// In fetchMethods.ts
export const getServiceBySlug = unstable_cache(
  async (slug: string): Promise<Service | null> => {
    const result = await payload.find({
      collection: "services",
      where: { slug: { equals: slug } },
      limit: 1,
    });

    const service = result.docs[0];
    if (service?.blocks) {
      // Process content server-side
      service.blocks = service.blocks.map((block) => ({
        ...block,
        content: block.content
          ? processContentServerSide(block.content)
          : block.content,
      }));
    }

    return service || null;
  },
  ["service-by-slug"],
  { tags: ["services"], revalidate: 3600 }
);

function processContentServerSide(content: string): string {
  // Decode base64 content server-side
  const decoded = Buffer.from(content, "base64").toString("utf-8");
  // Apply any server-side transformations
  return decoded;
}
```

### Option B: Simple Component (No Processing)

```typescript
// Simplest approach - just decode and render
export function ServiceContent({ service }: ServiceContentProps) {
  return (
    <section className="py-16 lg:py-24 bg-white">
      {service.blocks?.map((block, index) => {
        const content = isHTMLString(block.content)
          ? block.content
          : decodeArticleContent(block.content);

        return (
          <div key={index}>
            {block.title && <h3>{block.title}</h3>}
            {content && (
              <div dangerouslySetInnerHTML={{ __html: content }} />
            )}
          </div>
        );
      })}
    </section>
  );
}
```

## 📊 Comparison

| Approach               | Pros                                                                  | Cons                                                 |
| ---------------------- | --------------------------------------------------------------------- | ---------------------------------------------------- |
| **useMemo (Current)**  | ✅ No extra renders<br/>✅ Security cleanup<br/>✅ SSR safe           | ⚠️ Client-side processing                            |
| **Server-side**        | ✅ No client processing<br/>✅ Better performance<br/>✅ SEO friendly | ⚠️ More server work<br/>⚠️ Cache invalidation needed |
| **Simple decode only** | ✅ Minimal code<br/>✅ Fast rendering                                 | ⚠️ No security cleanup<br/>⚠️ No script removal      |

## 🎯 Recommendation

**Current `useMemo` approach is best because:**

1. **Performance**: No unnecessary re-renders
2. **Security**: Removes script tags client-side
3. **Flexibility**: Can add more processing logic easily
4. **SSR Compatible**: Works on both server and client
5. **Maintainable**: Clear separation of concerns

The `useMemo` implementation gives you all the benefits without the drawbacks of `useEffect`!

# Base64 Content Processing Example

## Example Base64 Content

The example you provided:

```
PHA+RW1wb3dlcmluZyB0aGUgTmV4dCBHZW5lcmF0aW9uIG9mIElubm92YXRvcnMgQXQgaVF1ZSBWZW50dXJlcywgd2UgYmVsaWV2ZSB0aGF0IG51cnR1cmluZyB0aGUgZW50cmVwcmVuZXVyaWFsIHNwaXJpdCBpcyBmdW5kYW1lbnRhbCB0byBidWlsZGluZyBhIHRocml2aW5nIHN0YXJ0dXAgZWNvc3lzdGVtLiBPdXIgbWlzc2lvbiBpcyB0byBlbXBvd2VyIGFzcGlyaW5nIGVudHJlcHJlbmV1cnMgd2l0aCB0aGUgdG9vbHMsIGtub3dsZWRnZSwgYW5kIHN1cHBvcnQgdGhleSBuZWVkIHRvIHRyYW5zZm9ybSB0aGVpciBpbm5vdmF0aXZlIGlkZWFzIGludG8gc3VjY2Vzc2Z1bCBidXNpbmVzc2VzLiBXZSBoYXZlIGRldmVsb3BlZCBzZXZlcmFsIHByb2plY3RzIGFpbWVkIGF0IGZvc3RlcmluZyBhIHZpYnJhbnQgZW50cmVwcmVuZXVyaWFsIGN1bHR1cmUgYW5kIG51cnR1cmluZyBuZXcgZW50cmVwcmVuZXVycy48YnI+PC9wPg==
```

## Decodes to:

```html
<p>
  Empowering the Next Generation of Innovators At iQue Ventures, we believe that
  nurturing the entrepreneurial spirit is fundamental to building a thriving
  startup ecosystem. Our mission is to empower aspiring entrepreneurs with the
  tools, knowledge, and support they need to transform their innovative ideas
  into successful businesses. We have developed several projects aimed at
  fostering a vibrant entrepreneurial culture and nurturing new
  entrepreneurs.<br />
</p>
```

## How It Works in ServiceContent Component

### 1. Content Detection

```typescript
const decodedContent = isHTMLString(htmlContent)
  ? htmlContent
  : decodeArticleContent(htmlContent) || htmlContent;
```

### 2. Processing Flow

1. **Check if content is HTML**: Uses `isHTMLString()` to detect HTML tags
2. **Decode if needed**: If not HTML, uses `decodeArticleContent()` to decode base64
3. **Parse with DOMParser**: Creates a DOM tree from the content
4. **Clean up**: Removes script tags and other potentially harmful content
5. **Return processed HTML**: Safe, clean HTML ready for rendering

### 3. Security Features

- Removes `<script type="application/ld+json">` tags
- Uses DOMParser for safe HTML parsing
- Graceful fallback if decoding fails

### 4. Usage in CMS

When storing content in your CMS:

- **Regular HTML**: Will be displayed as-is
- **Base64 Encoded**: Will be automatically decoded and displayed
- **Plain Text**: Will be wrapped in paragraph tags if needed

## Implementation Benefits

✅ **Backward Compatibility**: Works with both encoded and regular HTML content
✅ **Security**: Removes potentially harmful scripts
✅ **Error Handling**: Graceful fallbacks if decoding fails
✅ **Performance**: Client-side processing only when needed
✅ **Consistency**: Uses existing utility functions from your codebase

## Testing

You can test this by:

1. Adding a service with base64 encoded content in the CMS
2. Visiting the service page
3. The content will be automatically decoded and displayed properly

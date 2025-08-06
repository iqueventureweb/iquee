export const generateImageName = (originalName: string): string => {
  const extension = originalName.split(".").pop();
  const nameWithoutExtension = originalName.replace(/\.[^/.]+$/, "");
  const sanitizedName = nameWithoutExtension
    .replace(/[^a-zA-Z0-9]/g, "-")
    .toLowerCase();
  return `${sanitizedName}.${extension}`;
};

export const generateSlug = (title: string): string => {
  if (!title) return "";
  return title
    .toString()
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[''""\[\]]/g, "")
    .replace(/[!?.,;:]/g, "")
    .replace(/\+/g, "-plus-")
    .replace(/[@#$%^*()=_+[\]{}<>\\|]/g, "")
    .replace(/[–—]/g, "-")
    .replace(/\s+/g, "-")
    .replace(/&/g, "and")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/[^a-z0-9-]/g, "");
};

export function encodeArticleContent(rawHtml: string) {
  const textEncoder = new TextEncoder();
  const textData = textEncoder.encode(rawHtml);
  let batch = "";
  const len = textData.length;
  for (let i = 0; i < len; i++) {
    batch += String.fromCharCode(textData[i] || 0);
  }
  return window.btoa(batch);
}

//Decode article content using text decoder and base64 decoding
export function decodeArticleContent(base64Content: string) {
  if (!base64Content) return;
  const textDecoder = new TextDecoder();
  return textDecoder.decode(
    Uint8Array.from(window.atob(base64Content), (c) => c.charCodeAt(0))
  );
}

// Strip HTML tags from a string
export const stripHtml = (htmlString: string) => {
  if (htmlString) return htmlString.replace(/<[^>]*>/g, "");
};

// Check if a string is a valid HTML string
export const isHTMLString = (str: string): boolean => {
  // Improved regex to detect valid HTML tags with some validation
  const regex = /<\/?[a-z][\s\S]*>/i;
  return regex.test(str);
};

// Process content for blog editor - handles base64 decoding and security cleanup
export const processEditorContent = (htmlContent: string): string => {
  if (!htmlContent) return "";

  // First decode content using the existing utility function
  const decodedContent = isHTMLString(htmlContent)
    ? htmlContent
    : decodeArticleContent(htmlContent) || htmlContent;

  // Check if we're in browser environment for DOM processing
  if (typeof window !== "undefined") {
    try {
      const doc = new DOMParser().parseFromString(decodedContent, "text/html");

      // Remove script tags with application/ld+json type for security
      const ldJsonScripts = doc.querySelectorAll(
        'script[type="application/ld+json"]'
      );
      ldJsonScripts.forEach((script) => {
        script.remove();
      });

      // Remove any other potentially harmful scripts
      const allScripts = doc.querySelectorAll("script");
      allScripts.forEach((script) => {
        script.remove();
      });

      // Get the cleaned HTML content
      const modifiedHtml = doc.body.innerHTML;

      // Apply any domain replacements or content modifications if needed
      // Example replacements (uncomment and modify as needed):
      // modifiedHtml = modifiedHtml.replaceAll('old-domain.com', 'new-domain.com');
      // modifiedHtml = modifiedHtml.replaceAll(
      //   'https://exams.old-domain.com',
      //   `${process.env.NEXT_PUBLIC_SITE_URL}/mock-exams`
      // );

      return modifiedHtml;
    } catch (error) {
      console.warn("Failed to process editor content:", error);
      return decodedContent;
    }
  }

  // Fallback for SSR - return decoded content without DOM processing
  return decodedContent;
};

// Process an array of content blocks (for services, projects, etc.)
export const processContentBlocks = <
  T extends { title?: string | null; content?: string | null },
>(
  blocks: T[] | null | undefined
): Array<{ title: string; content: string }> => {
  if (!blocks || !Array.isArray(blocks)) return [];

  return blocks.map((block) => ({
    title: block.title || "",
    content: block.content ? processEditorContent(block.content) : "",
  }));
};

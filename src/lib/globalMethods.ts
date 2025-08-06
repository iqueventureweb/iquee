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

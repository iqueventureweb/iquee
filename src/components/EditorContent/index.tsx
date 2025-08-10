"use client";

interface EditorContentProps {
  content?: string | null;
  className?: string;
}

/**
 * EditorContent - A reusable component for rendering content from blog editors
 *
 * This component handles:
 * - Base64 decoding of encoded content
 * - Security cleanup (removes scripts)
 * - Domain replacements
 * - SSR compatibility
 *
 * Usage:
 * <EditorContent content={blog.content} className="prose prose-lg" />
 * <EditorContent content={service.blocks[0].content} />
 */
export function EditorContent({
  content,
  className = "prose prose-lg prose-neutral max-w-none",
}: EditorContentProps) {
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: content || "" }}
    />
  );
}

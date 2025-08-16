import { slugField } from "@/fields/slug";
import { revalidateTag } from "next/cache";
import type { CollectionConfig, Field } from "payload";

const articleData = {
  wordsPerMinute: 250,
};

function getWordsCount(content: string): number {
  if (!content) return 0;
  const text = content.replace(/<[^>]+>/g, "");
  const wordCount = text.split(/\s+/).filter((word) => word.length > 0).length;
  return wordCount;
}

function decodeArticleContentServerSide(base64Content: string): string {
  if (!base64Content) return "";
  const buffer = Buffer.from(base64Content, "base64");
  return buffer.toString("utf-8");
}

export const Blog: CollectionConfig = {
  slug: "blogs",
  admin: {
    useAsTitle: "title",
  },
  defaultSort: "-updatedAt",
  hooks: {
    beforeValidate: [
      async () => {
        revalidateTag("blogs");
      },
    ],
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          admin: {
            width: "50%",
          },
        },
        ...(slugField("title") as Field[]),
      ],
    },
    {
      name: "author",
      type: "text",
      required: true,
      admin: {
        width: "50%",
      },
    },
    {
      name: "blog_image",
      type: "text",
    },
    {
      name: "content",
      type: "text",
      label: "Blog Content",
      admin: {
        components: {
          Field: {
            path: "src/collections/Blogs/CustomContentEditor/index",
          },
        },
      },
    },
  ],
  timestamps: true,
};

import globalUpload from "@/components/Globals/GlobalUpload";
import { revalidateTag } from "next/cache";
import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "title",
  },
  hooks: {
    beforeValidate: [
      async () => {
        revalidateTag("projects");
      },
    ],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "text",
    },
    globalUpload({
      field_name: "image_url",
      label: "Image URL",
      description: "Image URL",
    }),
    {
      name: "blocks",
      label: "Blocks",
      type: "array",
      fields: [
        globalUpload({
          field_name: "image_url",
          label: "Image URL",
          description: "Image URL",
        }),
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "content",
          type: "text",
          label: "Product Content",
          admin: {
            components: {
              Field: {
                path: "src/collections/Blogs/CustomContentEditor/index",
                clientProps: {
                  label: "Product Content",
                },
              },
            },
          },
        },
      ],
    },
    {
      name: "testimonials",
      label: "Testimonials",
      type: "array",
      fields: [
        {
          name: "quote",
          type: "textarea",
          required: true,
          label: "Testimonial Quote",
        },
        {
          name: "author",
          type: "text",
          required: true,
          label: "Author Name",
        },
        {
          name: "role",
          type: "text",
          required: true,
          label: "Title/Company",
        },
      ],
    },
    {
      name: "faq",
      label: "Frequently Asked Questions",
      type: "array",
      fields: [
        {
          name: "question",
          type: "text",
          required: true,
        },
        {
          name: "answer",
          type: "text",
        },
      ],
    },
    {
      name: "services",
      type: "relationship",
      relationTo: "services",
      hasMany: true,
      admin: {
        position: "sidebar",
      },
    },
  ],
};

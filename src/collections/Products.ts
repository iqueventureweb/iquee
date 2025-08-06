import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "title",
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
    {
      name: "blocks",
      label: "Blocks",
      type: "array",
      fields: [
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

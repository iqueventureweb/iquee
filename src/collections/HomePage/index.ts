import { CollectionConfig } from "payload";

export const HomePage: CollectionConfig = {
  slug: "home-page",
  fields: [
    {
      name: "achievement",
      label: "Achievements",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
        },
        {
          name: "description",
          type: "text",
        },
        {
          name: "contents",
          type: "array",
          fields: [
            {
              name: "count",
              type: "text",
            },
            {
              name: "description",
              type: "text",
            },
          ],
        },
      ],
    },
    {
      name: "trusted_companies",
      label: "Trusted Companies",
      type: "array",
      fields: [
        {
          name: "src",
          type: "text",
        },
        {
          name: "width",
          type: "number",
        },
        {
          name: "height",
          type: "number",
        },
      ],
    },
    {
      name: "our_story",
      label: "Our Story",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
        },
        {
          name: "description",
          type: "text",
        },
        {
          name: "contents",
          label: "Contents",
          type: "array",
          fields: [
            {
              name: "title",
              type: "text",
            },
            {
              name: "description",
              type: "text",
            },
          ],
        },
      ],
    },
    {
      name: "featured_services",
      label: "Featured Services",
      type: "array",
      fields: [
        {
          name: "icon",
          type: "text",
        },
        {
          name: "title",
          type: "text",
        },
        {
          name: "description",
          type: "text",
        },
      ],
    },
    {
      name: "testimonials",
      label: "Testimonials",
      type: "array",
      fields: [
        {
          name: "author",
          type: "text",
        },
        {
          name: "role",
          type: "text",
        },
        {
          name: "avatar",
          type: "text",
        },
        {
          name: "quote",
          type: "text",
        },
      ],
    },
    {
      name: "staff",
      label: "Staff quotes",
      type: "array",
      fields: [
        {
          name: "name",
          type: "text",
        },
        {
          name: "role",
          type: "text",
        },
        {
          name: "quote",
          type: "text",
        },
        {
          name: "image_url",
          label: "Image URL",
          type: "text",
        },
      ],
    },
  ],
};

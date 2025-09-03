import globalUpload from "@/components/Globals/GlobalUpload";
import { revalidateTag } from "next/cache";
import { CollectionConfig } from "payload";

export const HomePage: CollectionConfig = {
  slug: "home-page",
  hooks: {
    beforeValidate: [
      async () => {
        revalidateTag("homepage");
      },
    ],
  },
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
        globalUpload({
          field_name: "src",
          label: "Image URL",
        }),
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
        globalUpload({
          field_name: "image_url",
          label: "Image URL",
        }),
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
        globalUpload({
          field_name: "image_url",
          label: "Image URL",
        }),
        {
          name: "social_links",
          label: "Social Links",
          type: "group",
          fields: [
            {
              name: "twitter",
              label: "Twitter/X URL",
              type: "text",
            },
            {
              name: "facebook",
              label: "Facebook URL",
              type: "text",
            },
            {
              name: "linkedin",
              label: "LinkedIn URL",
              type: "text",
            },
            {
              name: "instagram",
              label: "Instagram URL",
              type: "text",
            },
          ],
        },
      ],
    },
  ],
};

import globalUpload from "@/components/Globals/GlobalUpload";
import { revalidateTag } from "next/cache";
import type { CollectionConfig } from "payload";

export const Services: CollectionConfig = {
  slug: "services",
  admin: {
    useAsTitle: "title",
  },
  hooks: {
    beforeValidate: [
      async () => {
        revalidateTag("services");
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
    globalUpload({
      field_name: "thumbnail",
      label: "Thumbnail",
      description:
        "Thumbnail will be used for the service section in home page",
    }),
    {
      name: "blocks",
      label: "Blocks",
      type: "array",
      fields: [
        {
          name: "title",
          type: "text",
        },
        globalUpload({
          field_name: "image_url",
          label: "Image URL",
          description: "Image URL",
        }),
        {
          name: "content",
          type: "text",
          label: "Service Content",
          admin: {
            components: {
              Field: {
                path: "src/collections/Blogs/CustomContentEditor/index",
                clientProps: {
                  label: "Service Content",
                },
              },
            },
          },
        },
      ],
    },
    {
      name: "projects",
      type: "join",
      collection: "projects",
      on: "services",
      hasMany: true,
    },
  ],
};

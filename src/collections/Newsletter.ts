import type { CollectionConfig } from "payload";

export const Newsletter: CollectionConfig = {
  slug: "newsletter",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "createdAt", "status"],
  },
  fields: [
    {
      name: "email",
      type: "email",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "status",
      type: "select",
      options: [
        {
          label: "Subscribed",
          value: "subscribed",
        },
        {
          label: "Unsubscribed",
          value: "unsubscribed",
        },
        {
          label: "Pending",
          value: "pending",
        },
      ],
      defaultValue: "subscribed",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "source",
      type: "text",
      admin: {
        position: "sidebar",
        description: "Where the subscription came from",
      },
      defaultValue: "website",
    },
    {
      name: "ipAddress",
      type: "text",
      admin: {
        position: "sidebar",
        readOnly: true,
      },
    },
    {
      name: "userAgent",
      type: "text",
      admin: {
        position: "sidebar",
        readOnly: true,
      },
    },
  ],
  timestamps: true,
};

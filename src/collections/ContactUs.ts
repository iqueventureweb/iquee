import type { CollectionConfig } from "payload";

export const ContactUs: CollectionConfig = {
  slug: "contact-us",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "status", "createdAt"],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "email",
      type: "email",
      required: true,
    },
    {
      name: "message",
      type: "textarea",
      required: true,
    },
    {
      name: "status",
      type: "select",
      options: [
        {
          label: "New",
          value: "new",
        },
        {
          label: "In Progress",
          value: "in_progress",
        },
        {
          label: "Responded",
          value: "responded",
        },
        {
          label: "Closed",
          value: "closed",
        },
      ],
      defaultValue: "new",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "priority",
      type: "select",
      options: [
        {
          label: "Low",
          value: "low",
        },
        {
          label: "Normal",
          value: "normal",
        },
        {
          label: "High",
          value: "high",
        },
        {
          label: "Urgent",
          value: "urgent",
        },
      ],
      defaultValue: "normal",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "subject",
      type: "text",
      admin: {
        description: "Auto-generated or manually added subject",
      },
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
    {
      name: "responded",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "responseNotes",
      type: "textarea",
      admin: {
        description: "Internal notes about the response or follow-up",
      },
    },
  ],
  timestamps: true,
};

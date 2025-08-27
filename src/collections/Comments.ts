import { revalidateTag } from "next/cache";
import type { CollectionConfig } from "payload";

export const Comments: CollectionConfig = {
  slug: "comments",
  admin: {
    useAsTitle: "authorName",
    defaultColumns: ["authorName", "blog", "createdAt"],
  },
  hooks: {
    beforeValidate: [
      async () => {
        revalidateTag("comments");
      },
    ],
  },
  fields: [
    {
      name: "authorName",
      type: "text",
      required: true,
      label: "Author Name",
    },
    {
      name: "authorEmail",
      type: "email",
      required: true,
      label: "Author Email",
    },
    {
      name: "comment",
      type: "textarea",
      required: true,
      label: "Comment",
    },
    {
      name: "blog",
      type: "relationship",
      relationTo: "blogs",
      required: true,
      label: "Blog Post",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "status",
      type: "select",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Approved", value: "approved" },
        { label: "Rejected", value: "rejected" },
      ],
      defaultValue: "pending",
      admin: {
        position: "sidebar",
      },
    },
  ],
  access: {
    read: () => true,
    create: () => true,
    update: () => false,
    delete: () => false,
  },
};

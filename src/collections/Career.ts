import { revalidateTag } from "next/cache";
import type { CollectionConfig } from "payload";

export const Career: CollectionConfig = {
  slug: "careers",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "department", "status", "createdAt"],
  },
  hooks: {
    beforeValidate: [
      async () => {
        revalidateTag("careers");
      },
    ],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Job Title",
    },
    {
      name: "slug",
      type: "text",
      required: true,
      label: "Job Slug",
      admin: {
        description: "URL-friendly version of the job title",
      },
    },
    {
      name: "department",
      type: "select",
      required: true,
      options: [
        { label: "Engineering", value: "engineering" },
        { label: "Design", value: "design" },
        { label: "Marketing", value: "marketing" },
        { label: "Sales", value: "sales" },
        { label: "Operations", value: "operations" },
        { label: "Finance", value: "finance" },
        { label: "Human Resources", value: "hr" },
        { label: "Other", value: "other" },
      ],
    },
    {
      name: "location",
      type: "text",
      required: true,
      label: "Job Location",
    },
    {
      name: "type",
      type: "select",
      required: true,
      options: [
        { label: "Full-time", value: "full-time" },
        { label: "Part-time", value: "part-time" },
        { label: "Contract", value: "contract" },
        { label: "Internship", value: "internship" },
      ],
    },
    {
      name: "experience",
      type: "text",
      required: true,
      label: "Experience Required",
      admin: {
        description: "e.g., '2-5 years', 'Entry level', 'Senior level'",
      },
    },
    {
      name: "description",
      type: "richText",
      required: true,
      label: "Job Description",
    },
    {
      name: "requirements",
      type: "array",
      label: "Key Requirements",
      fields: [
        {
          name: "requirement",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "benefits",
      type: "array",
      label: "Benefits & Perks",
      fields: [
        {
          name: "benefit",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "active",
      options: [
        { label: "Active", value: "active" },
        { label: "Closed", value: "closed" },
        { label: "Draft", value: "draft" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "applicationDeadline",
      type: "date",
      label: "Application Deadline",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "positions",
      type: "number",
      required: true,
      defaultValue: 1,
      label: "Number of Positions",
      admin: {
        position: "sidebar",
        description: "How many people are you hiring for this role?",
      },
    },
  ],
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
};

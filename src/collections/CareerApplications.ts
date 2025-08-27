import { revalidateTag } from "next/cache";
import type { CollectionConfig } from "payload";

export const CareerApplications: CollectionConfig = {
  slug: "career-applications",
  admin: {
    useAsTitle: "applicantName",
    defaultColumns: ["applicantName", "position", "status", "createdAt"],
  },
  hooks: {
    beforeValidate: [
      async () => {
        revalidateTag("career-applications");
      },
    ],
  },
  fields: [
    {
      name: "applicantName",
      type: "text",
      required: true,
      label: "Applicant Name",
    },
    {
      name: "applicantEmail",
      type: "email",
      required: true,
      label: "Applicant Email",
    },
    {
      name: "applicantPhone",
      type: "text",
      required: true,
      label: "Applicant Phone",
    },
    {
      name: "position",
      type: "relationship",
      relationTo: "careers",
      required: true,
      label: "Applied Position",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "resume",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Resume/CV",
      admin: {
        description: "Upload PDF, DOC, or image files",
      },
    },
    {
      name: "coverLetter",
      type: "textarea",
      label: "Cover Letter (Optional)",
      admin: {
        description: "Any additional information the applicant wants to share",
      },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "pending",
      options: [
        { label: "Pending Review", value: "pending" },
        { label: "Under Review", value: "reviewing" },
        { label: "Shortlisted", value: "shortlisted" },
        { label: "Interview Scheduled", value: "interview" },
        { label: "Rejected", value: "rejected" },
        { label: "Hired", value: "hired" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "notes",
      type: "textarea",
      label: "Admin Notes",
      admin: {
        description: "Internal notes about the application",
        position: "sidebar",
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

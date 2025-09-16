import { getPayloadClient } from "@/lib/payload";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const applicantName = formData.get("applicantName") as string;
    const applicantEmail = formData.get("applicantEmail") as string;
    const applicantPhone = formData.get("applicantPhone") as string;
    const coverLetter = formData.get("coverLetter") as string;
    const position = formData.get("position") as string;
    const resume = formData.get("resume") as File;

    // Basic validation
    if (
      !applicantName ||
      !applicantEmail ||
      !applicantPhone ||
      !position ||
      !resume
    ) {
      return NextResponse.json(
        { error: "All required fields must be provided" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(applicantEmail)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // File size validation (5MB limit)
    if (resume.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Resume file size must be less than 5MB" },
        { status: 400 }
      );
    }

    // File type validation
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/png",
    ];

    if (!allowedTypes.includes(resume.type)) {
      return NextResponse.json(
        {
          error:
            "Invalid file type. Please upload PDF, DOC, DOCX, or image files.",
        },
        { status: 400 }
      );
    }

    const payload = await getPayloadClient();

    // Convert File to Buffer for Payload
    const arrayBuffer = await resume.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload the resume file first
    const uploadedResume = await payload.create({
      collection: "media",
      data: {
        filename: resume.name,
        alt_text: `Resume for ${applicantName}`,
        title: resume.name,
        url: resume.name,
        mimeType: resume.type,
        filesize: resume.size,
        width: resume.size,
        height: resume.size,
      },
      file: {
        data: buffer,
        mimetype: resume.type,
        name: resume.name,
        size: resume.size,
      },
    });

    // Create the career application
    const newApplication = await payload.create({
      collection: "career-applications",
      data: {
        applicantName,
        applicantEmail,
        applicantPhone,
        coverLetter: coverLetter || "",
        position,
        resume: uploadedResume.id,
        status: "pending",
      },
    });

    // Revalidate the career-applications tag
    revalidateTag("career-applications");

    return NextResponse.json(
      {
        message: "Application submitted successfully",
        application: newApplication,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating career application:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

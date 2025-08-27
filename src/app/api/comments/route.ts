import { getPayloadClient } from "@/lib/payload";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { authorName, authorEmail, comment, blog } = await request.json();

    // Basic validation
    if (!authorName || !authorEmail || !comment || !blog) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(authorEmail)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const payload = await getPayloadClient();

    // Create the comment
    const newComment = await payload.create({
      collection: "comments",
      data: {
        authorName,
        authorEmail,
        comment,
        blog,
        status: "pending", // Default status
      },
    });

    // Revalidate the comments tag
    revalidateTag("comments");

    return NextResponse.json(
      { message: "Comment created successfully", comment: newComment },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

import { getPayloadClient } from "@/lib/payload";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields (name, email, message) are required",
        },
        { status: 400 }
      );
    }

    if (!email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "Valid email address is required" },
        { status: 400 }
      );
    }

    if (message.length < 10) {
      return NextResponse.json(
        {
          success: false,
          message: "Message must be at least 10 characters long",
        },
        { status: 400 }
      );
    }

    const payload = await getPayloadClient();

    // Get client IP and user agent for tracking
    const clientIP =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    // Generate subject based on message content or use default
    const subject = `Contact Form: Message from ${name}`;

    // Create contact form submission
    const contact = await payload.create({
      collection: "contact-us",
      data: {
        name,
        email,
        message,
        subject,
        status: "new",
        priority: "normal",
        responded: false,
        ipAddress: clientIP,
        userAgent,
      },
    });

    // TODO: Send notification email to admin
    // TODO: Send confirmation email to user

    return NextResponse.json({
      success: true,
      message: "Thank you for your message! We will get back to you soon.",
      id: contact.id,
    });
  } catch (error) {
    console.error("Contact form submission error:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          "An error occurred while sending your message. Please try again.",
      },
      { status: 500 }
    );
  }
}

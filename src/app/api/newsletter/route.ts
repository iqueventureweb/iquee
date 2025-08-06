import { getPayloadClient } from "@/lib/payload";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "Valid email address is required" },
        { status: 400 }
      );
    }

    const payload = await getPayloadClient();

    // Check if email already exists
    const existingSubscription = await payload.find({
      collection: "newsletter",
      where: {
        email: {
          equals: email,
        },
      },
      limit: 1,
    });

    if (existingSubscription.docs.length > 0) {
      const existing = existingSubscription.docs[0];

      // If already subscribed, return success
      if (existing.status === "subscribed") {
        return NextResponse.json({
          success: true,
          message: "You are already subscribed to our newsletter",
          alreadySubscribed: true,
        });
      }

      // If unsubscribed, resubscribe
      if (existing.status === "unsubscribed") {
        await payload.update({
          collection: "newsletter",
          id: existing.id,
          data: {
            status: "subscribed",
          },
        });

        return NextResponse.json({
          success: true,
          message: "Welcome back! You have been resubscribed to our newsletter",
          resubscribed: true,
        });
      }
    }

    // Get client IP and user agent for tracking
    const clientIP =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    // Create new newsletter subscription
    const subscription = await payload.create({
      collection: "newsletter",
      data: {
        email,
        status: "subscribed",
        source: "website",
        ipAddress: clientIP,
        userAgent,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Thank you for subscribing to our newsletter!",
      id: subscription.id,
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while processing your subscription",
      },
      { status: 500 }
    );
  }
}

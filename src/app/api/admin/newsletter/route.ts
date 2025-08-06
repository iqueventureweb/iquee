import { getPayloadClient } from "@/lib/payload";
import { NextRequest, NextResponse } from "next/server";

// Get newsletter statistics
export async function GET(request: NextRequest) {
  try {
    const payload = await getPayloadClient();

    // Get total count
    const total = await payload.count({
      collection: "newsletter",
    });

    // Get count by status
    const subscribed = await payload.count({
      collection: "newsletter",
      where: {
        status: {
          equals: "subscribed",
        },
      },
    });

    const unsubscribed = await payload.count({
      collection: "newsletter",
      where: {
        status: {
          equals: "unsubscribed",
        },
      },
    });

    const pending = await payload.count({
      collection: "newsletter",
      where: {
        status: {
          equals: "pending",
        },
      },
    });

    // Get recent subscriptions
    const recent = await payload.find({
      collection: "newsletter",
      limit: 10,
      sort: "-createdAt",
    });

    return NextResponse.json({
      success: true,
      stats: {
        total: total.totalDocs,
        subscribed: subscribed.totalDocs,
        unsubscribed: unsubscribed.totalDocs,
        pending: pending.totalDocs,
      },
      recent: recent.docs.map((doc) => ({
        id: doc.id,
        email: doc.email,
        status: doc.status,
        createdAt: doc.createdAt,
        source: doc.source,
      })),
    });
  } catch (error) {
    console.error("Newsletter stats error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// Bulk operations on newsletter subscribers
export async function POST(request: NextRequest) {
  try {
    const { action, emails } = await request.json();

    if (!action || !Array.isArray(emails)) {
      return NextResponse.json(
        { success: false, message: "Action and emails array are required" },
        { status: 400 }
      );
    }

    const payload = await getPayloadClient();
    let results = [];

    switch (action) {
      case "unsubscribe":
        for (const email of emails) {
          try {
            const result = await payload.update({
              collection: "newsletter",
              where: {
                email: { equals: email },
              },
              data: {
                status: "unsubscribed",
              },
            });
            results.push({ email, success: true, updated: result.docs.length });
          } catch (error) {
            results.push({ email, success: false, error: error.message });
          }
        }
        break;

      case "resubscribe":
        for (const email of emails) {
          try {
            const result = await payload.update({
              collection: "newsletter",
              where: {
                email: { equals: email },
              },
              data: {
                status: "subscribed",
              },
            });
            results.push({ email, success: true, updated: result.docs.length });
          } catch (error) {
            results.push({ email, success: false, error: error.message });
          }
        }
        break;

      case "delete":
        for (const email of emails) {
          try {
            const result = await payload.delete({
              collection: "newsletter",
              where: {
                email: { equals: email },
              },
            });
            results.push({ email, success: true, deleted: result.docs.length });
          } catch (error) {
            results.push({ email, success: false, error: error.message });
          }
        }
        break;

      default:
        return NextResponse.json(
          { success: false, message: "Invalid action" },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      action,
      results,
      summary: {
        total: emails.length,
        successful: results.filter((r) => r.success).length,
        failed: results.filter((r) => !r.success).length,
      },
    });
  } catch (error) {
    console.error("Newsletter bulk operation error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

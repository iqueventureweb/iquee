import { getPayloadClient } from "@/lib/payload";
import { NextRequest, NextResponse } from "next/server";

// Get contact form statistics
export async function GET(request: NextRequest) {
  try {
    const payload = await getPayloadClient();

    // Get total count
    const total = await payload.count({
      collection: "contact-us",
    });

    // Get count by status
    const newMessages = await payload.count({
      collection: "contact-us",
      where: {
        status: {
          equals: "new",
        },
      },
    });

    const inProgress = await payload.count({
      collection: "contact-us",
      where: {
        status: {
          equals: "in_progress",
        },
      },
    });

    const responded = await payload.count({
      collection: "contact-us",
      where: {
        status: {
          equals: "responded",
        },
      },
    });

    const closed = await payload.count({
      collection: "contact-us",
      where: {
        status: {
          equals: "closed",
        },
      },
    });

    // Get recent contacts
    const recent = await payload.find({
      collection: "contact-us",
      limit: 10,
      sort: "-createdAt",
    });

    // Get priority distribution
    const priorities = await Promise.all([
      payload.count({
        collection: "contact-us",
        where: { priority: { equals: "urgent" } },
      }),
      payload.count({
        collection: "contact-us",
        where: { priority: { equals: "high" } },
      }),
      payload.count({
        collection: "contact-us",
        where: { priority: { equals: "normal" } },
      }),
      payload.count({
        collection: "contact-us",
        where: { priority: { equals: "low" } },
      }),
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        total: total.totalDocs,
        new: newMessages.totalDocs,
        inProgress: inProgress.totalDocs,
        responded: responded.totalDocs,
        closed: closed.totalDocs,
        priorities: {
          urgent: priorities[0].totalDocs,
          high: priorities[1].totalDocs,
          normal: priorities[2].totalDocs,
          low: priorities[3].totalDocs,
        },
      },
      recent: recent.docs.map((doc) => ({
        id: doc.id,
        name: doc.name,
        email: doc.email,
        subject: doc.subject,
        status: doc.status,
        priority: doc.priority,
        createdAt: doc.createdAt,
        responded: doc.responded,
        message: doc.message.substring(0, 100) + "...",
      })),
    });
  } catch (error) {
    console.error("Contact stats error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Update contact status
export async function PATCH(request: NextRequest) {
  try {
    const { id, status, priority, responded, responseNotes } =
      await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Contact ID is required" },
        { status: 400 }
      );
    }

    const payload = await getPayloadClient();

    const updateData: any = {};
    if (status) updateData.status = status;
    if (priority) updateData.priority = priority;
    if (typeof responded === "boolean") updateData.responded = responded;
    if (responseNotes) updateData.responseNotes = responseNotes;

    const contact = await payload.update({
      collection: "contact-us",
      id,
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: "Contact updated successfully",
      contact: {
        id: contact.id,
        name: contact.name,
        email: contact.email,
        status: contact.status,
        priority: contact.priority,
        responded: contact.responded,
        updatedAt: contact.updatedAt,
      },
    });
  } catch (error) {
    console.error("Contact update error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

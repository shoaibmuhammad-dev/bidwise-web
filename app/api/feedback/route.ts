import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getDb } from "@/lib/mongodb";
import { FeedbackFormData } from "@/types/feedback";
import { FeedbackDocument } from "@/models/feedback";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const body: FeedbackFormData = await request.json();
    const { name, email, feedback } = body;

    // Validate required fields
    if (!name || !email || !feedback) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email and feedback are required.",
        },
        { status: 400 },
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid email address.",
        },
        { status: 400 },
      );
    }

    // Save to MongoDB
    const db = await getDb();
    const doc: FeedbackDocument = {
      name,
      email,
      feedback,
      createdAt: new Date(),
    };
    const result = await db
      .collection<FeedbackDocument>("feedback")
      .insertOne(doc);

    // Send notification email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_RECEIVER_EMAIL,
      replyTo: email,
      subject: `New Feedback from ${name}`,
      text: `
Name: ${name}
Email: ${email}

Feedback:
${feedback}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <h3>Feedback</h3>
          <p>${feedback}</p>
        </div>
      `,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Feedback submitted successfully.",
        data: { id: result.insertedId },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("feedback form error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit feedback.",
      },
      { status: 500 },
    );
  }
}

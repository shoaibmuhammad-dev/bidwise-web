import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email and message are required.",
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

    await transporter.sendMail({
      from: email,
      to: process.env.CONTACT_RECEIVER_EMAIL,
      replyTo: email,
      subject: `New Contact Form Message from ${name}`,

      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,

      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>New Contact Form Submission</h2>

          <p>
            <strong>Name:</strong> ${name}
          </p>

          <p>
            <strong>Email:</strong> ${email}
          </p>

          <h3>Message</h3>
          <p>
            ${message}
          </p>
        </div>
      `,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send message.",
      },
      { status: 500 },
    );
  }
}

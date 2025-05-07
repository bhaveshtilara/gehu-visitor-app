import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { to, visitor } = await request.json();

    if (!to || !visitor) {
      return NextResponse.json(
        { message: 'Recipient email and visitor details are required' },
        { status: 400 }
      );
    }

    // Create a transporter using environment variables for email credentials
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: false, // Use TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const confirmationUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/confirmation/${visitor.visitorId}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: 'Visitor Pass Details - GEHU Visitor Management',
      html: `
        <h2>Visitor Pass Details</h2>
        <p>Dear Visitor,</p>
        <p>Your registration at GEHU has been successfully completed. Below are your visitor pass details:</p>
        <ul>
          <li><strong>Visitor ID:</strong> ${visitor.visitorId}</li>
          <li><strong>Name:</strong> ${visitor.name}</li>
          <li><strong>Phone:</strong> ${visitor.phone}</li>
          <li><strong>Category:</strong> ${visitor.category}</li>
          <li><strong>Purpose of Visit:</strong> ${visitor.purpose}</li>
          <li><strong>Status:</strong> ${visitor.isBlocked ? 'Blocked' : 'Active'}</li>
          <li><strong>Registered At:</strong> ${visitor.registeredAt}</li>
        </ul>
        <p>You can view your visitor pass here: <a href="${confirmationUrl}">${confirmationUrl}</a></p>
        <p>Thank you for visiting GEHU!</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('Email Sending Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { message: 'Failed to send email', error: errorMessage },
      { status: 500 }
    );
  }
}
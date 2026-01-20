import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import nodemailer, { TransportOptions } from "nodemailer";
import type Mail from "nodemailer/lib/mailer";

// You may want to move these to a separate config file or use a type-safe env loader
const GMAIL_CLIENT_ID = process.env.GMAIL_CLIENT_ID!;
const GMAIL_CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET!;
const GMAIL_REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN!;
const GMAIL_SENDER = process.env.GMAIL_SENDER!; // your Gmail address
const GMAIL_RECEIVER = process.env.GMAIL_RECEIVER!; // where to send the form submissions

export async function POST(req: NextRequest) {
  try {
    const { userType, name, email, subject, message } = await req.json();

    // Set up OAuth2 client
    const { OAuth2 } = google.auth;
    const oauth2Client = new OAuth2(
      GMAIL_CLIENT_ID,
      GMAIL_CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({ refresh_token: GMAIL_REFRESH_TOKEN });

    const accessToken = await new Promise<string>((resolve, reject) => {
      oauth2Client.getAccessToken(
        (
          err: Error | null,
          token: string | { token: string } | null | undefined
        ) => {
          if (err || !token) reject(err);
          else resolve(typeof token === "string" ? token : token.token!);
        }
      );
    });

    // Modern, clean HTML email body
    const messageBody = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; background: #f4f6fb; padding: 32px;">
        <div style="max-width: 520px; margin: 0 auto; background: #fff; border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,0.07); padding: 32px;">
          <h2 style="color: #22223b; font-size: 2rem; margin-bottom: 16px; letter-spacing: 1px;">New Empyrean Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr><td style="padding: 8px 0; color: #4a4e69; font-weight: 600;">User Type:</td><td style="padding: 8px 0; color: #22223b;">${userType}</td></tr>
            <tr><td style="padding: 8px 0; color: #4a4e69; font-weight: 600;">Name:</td><td style="padding: 8px 0; color: #22223b;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #4a4e69; font-weight: 600;">Email:</td><td style="padding: 8px 0; color: #22223b;"><a href="mailto:${email}" style="color: #3a86ff; text-decoration: none;">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #4a4e69; font-weight: 600;">Subject:</td><td style="padding: 8px 0; color: #22223b;">${subject}</td></tr>
            <tr><td style="padding: 8px 0; color: #4a4e69; font-weight: 600;">Message:</td><td style="padding: 8px 0; color: #22223b;">${message}</td></tr>
          </table>
          <div style="margin-top: 32px; text-align: center; color: #9a8c98; font-size: 0.95em;">This message was sent from the Empyrean website contact form.</div>
        </div>
      </div>
    `;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: GMAIL_SENDER,
        accessToken,
        clientId: GMAIL_CLIENT_ID,
        clientSecret: GMAIL_CLIENT_SECRET,
        refreshToken: GMAIL_REFRESH_TOKEN,
      },
    } as TransportOptions);

    const mailOptions: Mail.Options = {
      from: GMAIL_SENDER,
      to: GMAIL_RECEIVER,
      subject: `New Empyrean Contact Form Submission from ${name}`,
      html: messageBody,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}

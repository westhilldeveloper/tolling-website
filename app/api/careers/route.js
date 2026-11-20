// app/api/careers/route.js
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const formData = await req.formData();
    
    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const position = formData.get("position");
    const experience = formData.get("experience");
    const location = formData.get("location");
    const message = formData.get("message");
    const resume = formData.get("resume"); // File object
    
    // Validation
    if (!fullName || !email || !phone || !position) {
      return NextResponse.json({ error: "Please fill all required fields" }, { status: 400 });
    }
    
    // Prepare attachments
    const attachments = [];
    if (resume && resume.size > 0) {
      // Check file size (5MB limit)
      if (resume.size > 5 * 1024 * 1024) {
        return NextResponse.json({ error: "Resume file too large (max 5MB)" }, { status: 400 });
      }
      
      const bytes = await resume.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      attachments.push({
        filename: resume.name,
        content: buffer,
      });
    }
    
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
    
    const htmlBody = `
      <h2>New Job Application</h2>
      <table style="border-collapse: collapse; width: 100%;">
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><b>Full Name</b></td><td style="padding: 8px; border: 1px solid #ddd;">${fullName}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><b>Email</b></td><td style="padding: 8px; border: 1px solid #ddd;">${email}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><b>Phone</b></td><td style="padding: 8px; border: 1px solid #ddd;">${phone}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><b>Position</b></td><td style="padding: 8px; border: 1px solid #ddd;">${position}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><b>Experience</b></td><td style="padding: 8px; border: 1px solid #ddd;">${experience || "N/A"}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><b>Location</b></td><td style="padding: 8px; border: 1px solid #ddd;">${location || "N/A"}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><b>Message</b></td><td style="padding: 8px; border: 1px solid #ddd;">${message || "N/A"}</td></tr>
      </table>
    `;
    
    await transporter.sendMail({
      from: `"BTTS Careers" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_RECEIVER || process.env.GMAIL_USER,
      replyTo: email,
      subject: `New Job Application: ${position} - ${fullName}`,
      html: htmlBody,
      attachments,
    });
    
    return NextResponse.json({ success: true, message: "Application submitted successfully" });
  } catch (error) {
    console.error("Career form error:", error);
    return NextResponse.json({ error: "Failed to submit application. Please try again." }, { status: 500 });
  }
}
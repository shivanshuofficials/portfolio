import { NextResponse } from "next/server";
import nodemailer from "nodemailer";


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, service, budget, message } = body;

    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    const recipientEmail = "shivanshuchauhanofficials@gmail.com";

    // SMTP Credentials from environment variables
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = Number(process.env.SMTP_PORT) || 465;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpUser || !smtpPass) {
      console.warn(
        "Nodemailer warning: SMTP_USER and/or SMTP_PASS are not defined in environment variables. Logging form submission to console:"
      );
      console.log({
        from: `${name} <${email}>`,
        to: recipientEmail,
        service,
        budget,
        message,
        timestamp: new Date().toISOString(),
      });

      // Still return success so user experience is smooth while SMTP credentials are added to .env.local
      return NextResponse.json(
        {
          success: true,
          notice: "Form received in dev mode (Configure SMTP_USER & SMTP_PASS in .env.local to send live emails).",
        },
        { status: 200 }
      );
    }

    // Configure Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true for port 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const emailSubject = `🚀 New Portfolio Inquiry: ${name} — ${service}`;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0507; color: #ede0d4; padding: 24px; margin: 0; }
            .card { background-color: #14080c; border: 1px solid #33151c; border-radius: 8px; max-width: 600px; margin: 0 auto; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
            .header { background: linear-gradient(135deg, #7c1626 0%, #4a0d17 100%); padding: 24px 28px; border-bottom: 1px solid #d8838e40; }
            .header h1 { margin: 0; font-size: 20px; letter-spacing: 0.1em; color: #ffffff; text-transform: uppercase; }
            .header p { margin: 6px 0 0; font-size: 13px; color: #f4c2c8; }
            .content { padding: 28px; }
            .field { margin-bottom: 20px; }
            .label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; color: #d8838e; margin-bottom: 6px; }
            .value { font-size: 15px; color: #ffffff; line-height: 1.5; }
            .box { background-color: #090406; border: 1px solid #230d13; border-radius: 6px; padding: 14px 16px; margin-top: 4px; }
            .footer { padding: 16px 28px; background-color: #0d0608; border-top: 1px solid #230d13; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #8e7a82; text-align: center; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <h1>New Message From Portfolio</h1>
              <p>Submitted via shivanshuchauhan.com contact modal</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Sender Name</div>
                <div class="value"><strong>${name}</strong></div>
              </div>
              <div class="field">
                <div class="label">Reply-To Email</div>
                <div class="value"><a href="mailto:${email}" style="color: #d8838e; text-decoration: none;">${email}</a></div>
              </div>
              <div class="field">
                <div class="label">Project Interest / Domain</div>
                <div class="value">${service || "Not specified"}</div>
              </div>
              <div class="field">
                <div class="label">Estimated Scope / Budget</div>
                <div class="value">${budget || "Not specified"}</div>
              </div>
              <div class="field">
                <div class="label">Project Details / Message</div>
                <div class="value box">${message.replace(/\n/g, "<br/>")}</div>
              </div>
            </div>
            <div class="footer">
              Direct Contact &bull; Target: shivanshuchauhanofficials@gmail.com
            </div>
          </div>
        </body>
      </html>
    `;

    await transporter.sendMail({
      from: `"${name} (via Portfolio)" <${smtpUser}>`,
      to: recipientEmail,
      replyTo: email,
      subject: emailSubject,
      text: `New Portfolio Inquiry\n\nName: ${name}\nEmail: ${email}\nService: ${service}\nBudget: ${budget}\n\nMessage:\n${message}`,
      html: htmlContent,
    });

    return NextResponse.json({ success: true, message: "Email dispatched successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Nodemailer API Error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error occurred while sending email." },
      { status: 500 }
    );
  }
}

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// ─── RFP Form Endpoint ─────────────────────────────────────────────
app.post("/api/rfp", async (req, res) => {
  const { fullName, email, phone, serviceRequest, message, attachment } = req.body;

  // Basic validation
  if (!fullName || !email || !phone || !serviceRequest || !message) {
    return res.status(400).json({ success: false, error: "All fields are required." });
  }

  const POSTMARK_API_TOKEN = process.env.POSTMARK_API_TOKEN;
  const FROM_EMAIL = process.env.FROM_EMAIL || "noreply@congenie.com";
  const TO_EMAIL = process.env.TO_EMAIL || "arif@letuscode.com";

  if (!POSTMARK_API_TOKEN) {
    console.error("POSTMARK_API_TOKEN is not set in environment variables.");
    return res.status(500).json({ success: false, error: "Server configuration error." });
  }

  try {
    const response = await fetch("https://api.postmarkapp.com/email", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Postmark-Server-Token": POSTMARK_API_TOKEN,
      },
      body: JSON.stringify({
        From: FROM_EMAIL,
        To: TO_EMAIL,
        Subject: `New RFP: ${serviceRequest} — from ${fullName}`,
        HtmlBody: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New RFP Submission</title>
</head>
<body style="margin:0;padding:0;background-color:#f0f4ff;font-family:'Segoe UI',Arial,Helvetica,sans-serif;color:#253858;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f4ff;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(13,41,114,0.08);">

          <!-- HEADER -->
          <tr>
            <td style="background:#0d2972;padding:36px 40px;text-align:center;">
              <h1 style="margin:0;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:0.5px;"><img src="https://bngglobal.net/assets/images/logo-light.svg" alt="Logo" className="h-12 lg:h-17.5" /></h1>
              <p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,0.7);letter-spacing:0.3px;">Business & Growth Consulting</p>
            </td>
          </tr>

          <!-- GOLD ACCENT BAR -->
          <tr>
            <td style="background:#FFD500;height:4px;font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- TITLE SECTION -->
          <tr>
            <td style="padding:32px 40px 8px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="display:inline-block;background:#FFD500;color:#0d2972;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;padding:6px 14px;border-radius:20px;">New Proposal Request</span>
                  </td>
                  <td align="right" style="font-size:13px;color:#8993a4;">
                    ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  </td>
                </tr>
              </table>
              <h2 style="margin:20px 0 6px;font-size:24px;font-weight:700;color:#0d2972;">
                ${serviceRequest}
              </h2>
              <p style="margin:0 0 24px;font-size:14px;color:#505F79;">
                A new request for proposal has been submitted through the website.
              </p>
              <hr style="border:none;border-top:1px solid #e8ecf4;margin:0;" />
            </td>
          </tr>

          <!-- CONTACT DETAILS -->
          <tr>
            <td style="padding:24px 40px 0;">
              <p style="margin:0 0 16px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#8993a4;">Contact Information</p>

              <!-- Name -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
                <tr>
                  <td>
                    <p style="margin:0;font-size:12px;color:#8993a4;text-transform:uppercase;letter-spacing:0.5px;">Full Name</p>
                    <p style="margin:2px 0 0;font-size:16px;font-weight:600;color:#0d2972;">${fullName}</p>
                  </td>
                </tr>
              </table>

              <!-- Email -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
                <tr>
                  <td>
                    <p style="margin:0;font-size:12px;color:#8993a4;text-transform:uppercase;letter-spacing:0.5px;">Email Address</p>
                    <p style="margin:2px 0 0;font-size:16px;font-weight:600;color:#0d2972;">
                      <a href="mailto:${email}" style="color:#0d2972;text-decoration:none;">${email}</a>
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Phone -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:4px;">
                <tr>
                  <td>
                    <p style="margin:0;font-size:12px;color:#8993a4;text-transform:uppercase;letter-spacing:0.5px;">Phone Number</p>
                    <p style="margin:2px 0 0;font-size:16px;font-weight:600;color:#0d2972;">
                      <a href="tel:${phone}" style="color:#0d2972;text-decoration:none;">${phone}</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- PROJECT REQUIREMENT -->
          <tr>
            <td style="padding:24px 40px 0;">
              <p style="margin:0 0 12px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#8993a4;">Project Requirement</p>
              <div style="background:#f8faff;border-left:4px solid #FFD500;border-radius:0 12px 12px 0;padding:20px 24px;">
                <p style="margin:0;font-size:15px;line-height:1.7;color:#253858;white-space:pre-wrap;">${message}</p>
              </div>
            </td>
          </tr>

          <!-- ATTACHMENT (Optional) -->
          ${attachment ? `
          <tr>
            <td style="padding:24px 40px 0;">
              <p style="margin:0 0 12px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#8993a4;">Attachment</p>
              <div style="background:#f8faff;border: 1px dashed #b0b8c9;border-radius:12px;padding:12px 24px;">
                <p style="margin:0;font-size:14px;color:#253858;font-weight:600;">📎 ${attachment.name}</p>
              </div>
            </td>
          </tr>
          ` : ''}

          <!-- CTA -->
          <tr>
            <td style="padding:28px 40px 0;" align="center">
              <a href="mailto:${email}?subject=Re: ${encodeURIComponent(serviceRequest)}" style="display:inline-block;background:#0d2972;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;padding:12px 32px;border-radius:8px;">
                Reply to ${fullName}
              </a>
            </td>
          </tr>

          <!-- DIVIDER -->
          <tr>
            <td style="padding:28px 40px 0;">
              <hr style="border:none;border-top:1px solid #e8ecf4;margin:0;" />
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:20px 40px 32px;text-align:center;">
              <p style="margin:0 0 4px;font-size:13px;font-weight:600;color:#0d2972;">BnG Global</p>
              <p style="margin:0 0 12px;font-size:12px;color:#8993a4;">Business & Growth Consulting</p>
              <p style="margin:0;font-size:11px;color:#b0b8c9;">
                <a href="https://bngglobal.net" style="color:#8993a4;text-decoration:none;">bngglobal.net</a>
                &nbsp;&middot;&nbsp;
                <a href="mailto:info@bngglobal.net" style="color:#8993a4;text-decoration:none;">info@bngglobal.net</a>
              </p>
              <p style="margin:12px 0 0;font-size:10px;color:#c8cdd8;">
                This is an automated notification from your website's RFP form.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
        `,
        TextBody: `NEW REQUEST FOR PROPOSAL\n${"=".repeat(40)}\n\nService: ${serviceRequest}\nDate: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}\n\nCONTACT INFORMATION\n${"-".repeat(30)}\nFull Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\n\nPROJECT REQUIREMENT\n${"-".repeat(30)}\n${message}${attachment ? `\n\nATTACHMENT\n${"-".repeat(30)}\nFile Name: ${attachment.name}` : ''}\n\n${"=".repeat(40)}\nBnG Global | bngglobal.net | info@bngglobal.net\nThis is an automated notification from your website's RFP form.`,
        MessageStream: "outbound",
        ...(attachment ? {
          Attachments: [
            {
              Name: attachment.name,
              Content: attachment.data,
              ContentType: attachment.type
            }
          ]
        } : {})
      }),
    });

    const result = await response.json();

    if (response.ok) {
      return res.status(200).json({ success: true, message: "Message sent successfully." });
    } else {
      console.error("Postmark error:", result);
      return res.status(500).json({ success: false, error: result.Message || "Failed to send email." });
    }
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ success: false, error: "An error occurred. Please try again later." });
  }
});

// ─── Contact Form Endpoint ──────────────────────────────────────────
app.post("/api/contact", async (req, res) => {
  const { name, email, company, message } = req.body;

  // Basic validation
  if (!name || !email || !company || !message) {
    return res.status(400).json({ success: false, error: "All fields are required." });
  }

  const POSTMARK_API_TOKEN = process.env.POSTMARK_API_TOKEN;
  const FROM_EMAIL = process.env.FROM_EMAIL || "noreply@congenie.com";
  const TO_EMAIL = process.env.TO_EMAIL || "arif@letuscode.com";

  if (!POSTMARK_API_TOKEN) {
    console.error("POSTMARK_API_TOKEN is not set in environment variables.");
    return res.status(500).json({ success: false, error: "Server configuration error." });
  }

  try {
    const response = await fetch("https://api.postmarkapp.com/email", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Postmark-Server-Token": POSTMARK_API_TOKEN,
      },
      body: JSON.stringify({
        From: FROM_EMAIL,
        To: TO_EMAIL,
        Subject: `New Contact Inquiry from ${name}`,
        HtmlBody: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Contact Message</title>
</head>
<body style="margin:0;padding:0;background-color:#f0f4ff;font-family:'Segoe UI',Arial,Helvetica,sans-serif;color:#253858;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f4ff;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(13,41,114,0.08);">

          <!-- HEADER -->
          <tr>
            <td style="background:#0d2972;padding:36px 40px;text-align:center;">
              <h1 style="margin:0;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:0.5px;"><img src="https://bngglobal.net/assets/images/logo-light.svg" alt="Logo" className="h-12 lg:h-17.5" /></h1>
              <p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,0.7);letter-spacing:0.3px;">Business & Growth Consulting</p>
            </td>
          </tr>

          <!-- GOLD ACCENT BAR -->
          <tr>
            <td style="background:#FFD500;height:4px;font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- TITLE SECTION -->
          <tr>
            <td style="padding:32px 40px 8px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="display:inline-block;background:#FFD500;color:#0d2972;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;padding:6px 14px;border-radius:20px;">New Contact Message</span>
                  </td>
                  <td align="right" style="font-size:13px;color:#8993a4;">
                    ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  </td>
                </tr>
              </table>
              <h2 style="margin:20px 0 6px;font-size:24px;font-weight:700;color:#0d2972;">
                Website Inquiry
              </h2>
              <p style="margin:0 0 24px;font-size:14px;color:#505F79;">
                A new contact request has been submitted through the website contact form.
              </p>
              <hr style="border:none;border-top:1px solid #e8ecf4;margin:0;" />
            </td>
          </tr>

          <!-- CONTACT DETAILS -->
          <tr>
            <td style="padding:24px 40px 0;">
              <p style="margin:0 0 16px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#8993a4;">Sender Details</p>

              <!-- Name -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
                <tr>
                  <td>
                    <p style="margin:0;font-size:12px;color:#8993a4;text-transform:uppercase;letter-spacing:0.5px;">Full Name</p>
                    <p style="margin:2px 0 0;font-size:16px;font-weight:600;color:#0d2972;">${name}</p>
                  </td>
                </tr>
              </table>

              <!-- Email -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
                <tr>
                  <td>
                    <p style="margin:0;font-size:12px;color:#8993a4;text-transform:uppercase;letter-spacing:0.5px;">Email Address</p>
                    <p style="margin:2px 0 0;font-size:16px;font-weight:600;color:#0d2972;">
                      <a href="mailto:${email}" style="color:#0d2972;text-decoration:none;">${email}</a>
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Company -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:4px;">
                <tr>
                  <td>
                    <p style="margin:0;font-size:12px;color:#8993a4;text-transform:uppercase;letter-spacing:0.5px;">Company Name</p>
                    <p style="margin:2px 0 0;font-size:16px;font-weight:600;color:#0d2972;">${company}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- MESSAGE -->
          <tr>
            <td style="padding:24px 40px 0;">
              <p style="margin:0 0 12px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#8993a4;">Message</p>
              <div style="background:#f8faff;border-left:4px solid #FFD500;border-radius:0 12px 12px 0;padding:20px 24px;">
                <p style="margin:0;font-size:15px;line-height:1.7;color:#253858;white-space:pre-wrap;">${message}</p>
              </div>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:28px 40px 0;" align="center">
              <a href="mailto:${email}?subject=Re: Website Inquiry" style="display:inline-block;background:#0d2972;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;padding:12px 32px;border-radius:8px;">
                Reply to ${name}
              </a>
            </td>
          </tr>

          <!-- DIVIDER -->
          <tr>
            <td style="padding:28px 40px 0;">
              <hr style="border:none;border-top:1px solid #e8ecf4;margin:0;" />
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:20px 40px 32px;text-align:center;">
              <p style="margin:0 0 4px;font-size:13px;font-weight:600;color:#0d2972;">BnG Global</p>
              <p style="margin:0 0 12px;font-size:12px;color:#8993a4;">Business & Growth Consulting</p>
              <p style="margin:0;font-size:11px;color:#8993a4;">
                <a href="https://bngglobal.net" style="color:#8993a4;text-decoration:none;">bngglobal.net</a>
                &nbsp;&middot;&nbsp;
                <a href="mailto:info@bngglobal.net" style="color:#8993a4;text-decoration:none;">info@bngglobal.net</a>
              </p>
              <p style="margin:12px 0 0;font-size:10px;color:#c8cdd8;">
                This is an automated notification from your website's contact form.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
        `,
        TextBody: `NEW CONTACT INQUIRY\n${"=".repeat(40)}\n\nSender: ${name}\nCompany: ${company}\nEmail: ${email}\nDate: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}\n\nMESSAGE\n${"-".repeat(30)}\n${message}\n\n${"=".repeat(40)}\nBnG Global | bngglobal.net | info@bngglobal.net\nThis is an automated notification from your website's contact form.`,
        MessageStream: "outbound",
      }),
    });

    const result = await response.json();

    if (response.ok) {
      return res.status(200).json({ success: true, message: "Message sent successfully." });
    } else {
      console.error("Postmark error:", result);
      return res.status(500).json({ success: false, error: result.Message || "Failed to send email." });
    }
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ success: false, error: "An error occurred. Please try again later." });
  }
});

// ─── Production: Serve static frontend ─────────────────────────────
if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "..", "dist");
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

// ─── Start Server ──────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

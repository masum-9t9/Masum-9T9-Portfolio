import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Helper to escape HTML characters
function escapeHtml(str: string): string {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Brevo REST API Email Sender
async function sendBrevoEmail(params: {
  to: { email: string; name?: string }[];
  subject: string;
  htmlContent: string;
  sender?: { name: string; email: string };
  replyTo?: { email: string; name?: string };
}) {
  const apiKey = (process.env.BREVO_API_KEY || '').trim();
  const fromName = process.env.FROM_NAME || "Masum 9T9";
  const fromEmail = process.env.FROM_EMAIL || "hello@9t9.pro.bd";

  if (!apiKey) {
    console.warn("⚠️ BREVO_API_KEY is not configured in environment variables. Email sending skipped.");
    return null;
  }

  const payload = {
    sender: params.sender || { name: fromName, email: fromEmail },
    to: params.to,
    replyTo: params.replyTo,
    subject: params.subject,
    htmlContent: params.htmlContent,
  };

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "accept": "application/json",
      "api-key": apiKey.trim(),
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Brevo API status ${res.status}: ${errorText}`);
  }

  return await res.json();
}

// Telegram Bot Notifier
async function sendTelegramMessage(params: {
  botToken: string;
  chatId: string;
  htmlText: string;
  rawText: string;
}) {
  if (!params.botToken || !params.chatId) {
    console.warn("⚠️ TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID missing in environment. Skipping Telegram notification.");
    return false;
  }
  try {
    const res = await fetch(`https://api.telegram.org/bot${params.botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: params.chatId,
        text: params.htmlText,
        parse_mode: 'HTML',
      }),
    });
    const resData = await res.json();
    if (!resData.ok) {
      // Fallback to plain text
      await fetch(`https://api.telegram.org/bot${params.botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: params.chatId,
          text: params.rawText,
        }),
      });
    }
    return true;
  } catch (err) {
    console.error('Telegram notification error:', err);
    return false;
  }
}

// Google Sheets Webhook Backup
async function sendGoogleSheetsBackup(sheetUrl: string, data: Record<string, string>) {
  if (!sheetUrl) {
    console.warn("⚠️ GOOGLE_SHEETS_CONFIG missing in environment. Skipping Google Sheets backup.");
    return false;
  }
  let attempts = 0;
  const maxAttempts = 3;
  while (attempts < maxAttempts) {
    try {
      attempts++;
      const params = new URLSearchParams(data);
      await fetch(sheetUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params,
      });
      return true;
    } catch (err) {
      console.error(`Google Sheets backup attempt ${attempts} failed:`, err);
      if (attempts >= maxAttempts) return false;
      await new Promise(r => setTimeout(r, 1000));
    }
  }
  return false;
}

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    system: 'Masum 9T9 Contact & Email Engine',
    timestamp: new Date().toISOString(),
  });
});

// Primary Contact API Endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      category,
      projectType,
      message,
      subject: customSubject,
    } = req.body;

    // Validation
    const trimmedName = String(name || '').trim();
    const trimmedPhone = String(phone || '').trim();
    const trimmedEmail = String(email || '').trim();
    const trimmedCategory = String(category || 'General Inquiry').trim();
    const trimmedProjectType = String(projectType || 'Custom Project').trim();
    const trimmedMessage = String(message || '').trim();

    if (!trimmedName || !trimmedPhone || !trimmedMessage) {
      return res.status(400).json({
        success: false,
        error: 'Name, phone number, and message are required fields.',
      });
    }

    if (trimmedName.length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid full name.',
      });
    }

    if (trimmedMessage.length < 5) {
      return res.status(400).json({
        success: false,
        error: 'Please provide more details in your message (at least 5 characters).',
      });
    }

    // Client metadata
    const rawIp = req.headers['x-forwarded-for'];
    const clientIp = (Array.isArray(rawIp) ? rawIp[0] : (rawIp || req.socket.remoteAddress || '127.0.0.1')).split(',')[0].trim();
    const userAgent = String(req.headers['user-agent'] || 'Unknown Browser');
    const rawReferrer = req.headers['referer'] || req.headers['referrer'] || 'Direct';
    const referrer = String(Array.isArray(rawReferrer) ? rawReferrer[0] : rawReferrer);
    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }) + ' (BST)';

    const telegramBotToken = (process.env.TELEGRAM_BOT_TOKEN || '').trim();
    const telegramChatId = (process.env.TELEGRAM_CHAT_ID || '').trim();
    const googleSheetsUrl = (process.env.GOOGLE_SHEETS_CONFIG || '').trim();
    const adminEmail = process.env.FROM_EMAIL || "hello@9t9.pro.bd";
    const brandName = process.env.FROM_NAME || "Masum 9T9";

    const appUrl = process.env.APP_URL || 'https://9t9.pro.bd';

    // 1. Prepare Telegram
    const telegramHtml = `<b>📬 New Website Inquiry (Masum 9T9)</b>\n\n` +
      `<b>👤 Name:</b> ${escapeHtml(trimmedName)}\n` +
      `<b>📞 Phone:</b> ${escapeHtml(trimmedPhone)}\n` +
      `<b>✉️ Email:</b> ${escapeHtml(trimmedEmail || 'N/A')}\n` +
      `<b>📁 Category:</b> ${escapeHtml(trimmedCategory)}\n` +
      `<b>🎯 Project Type:</b> ${escapeHtml(trimmedProjectType)}\n` +
      `<b>💬 Message:</b> "${escapeHtml(trimmedMessage)}"\n\n` +
      `<b>🕒 Date:</b> ${escapeHtml(timestamp)}\n` +
      `<b>🌐 IP:</b> ${escapeHtml(clientIp)}`;

    const telegramRaw = `New Website Inquiry (Masum 9T9)\n\nName: ${trimmedName}\nPhone: ${trimmedPhone}\nEmail: ${trimmedEmail || 'N/A'}\nCategory: ${trimmedCategory}\nProject: ${trimmedProjectType}\nMessage: ${trimmedMessage}\nDate: ${timestamp}`;

    // 2. Prepare Google Sheets Data
    const fullServiceText = `${trimmedCategory} ➔ ${trimmedProjectType}`;
    const sheetData = {
      name: trimmedName,
      Name: trimmedName,
      phone: trimmedPhone,
      Phone: trimmedPhone,
      email: trimmedEmail,
      Email: trimmedEmail,
      category: trimmedCategory,
      Category: trimmedCategory,
      projectType: trimmedProjectType,
      ProjectType: trimmedProjectType,
      service: fullServiceText,
      Service: fullServiceText,
      message: trimmedMessage,
      Message: trimmedMessage,
      date: timestamp,
      Date: timestamp,
      ip: clientIp,
      IP: clientIp,
    };

    // 3. Prepare Brevo Admin Notification Email
    const adminSubject = customSubject || `New Website Inquiry: ${trimmedCategory} - ${trimmedProjectType} (${trimmedName})`;
    const adminHtmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Website Inquiry</title>
      <style>
        body { margin: 0; padding: 0; background-color: #0B1220; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #E2E8F0; -webkit-font-smoothing: antialiased; }
        table { border-collapse: collapse; }
        .container { max-width: 600px; margin: 0 auto; background-color: #131C2E; border: 1px solid rgba(56, 189, 248, 0.2); border-radius: 16px; overflow: hidden; }
        .header { background: #18243B; padding: 24px 32px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); }
        .brand-title { font-size: 22px; font-weight: 900; color: #FFFFFF; letter-spacing: -0.5px; margin: 0; }
        .badge { display: inline-block; background-color: rgba(56, 189, 248, 0.15); color: #38BDF8; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; border: 1px solid rgba(56, 189, 248, 0.3); text-transform: uppercase; }
        .content-body { padding: 32px; }
        .field-card { background-color: #18243B; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 14px 18px; margin-bottom: 12px; }
        .field-label { font-size: 11px; text-transform: uppercase; color: #38BDF8; font-weight: 800; letter-spacing: 0.8px; margin-bottom: 4px; }
        .field-value { font-size: 14px; font-weight: 600; color: #F8FAFC; word-break: break-word; }
        .message-card { background-color: #0F172A; border-left: 4px solid #38BDF8; border-radius: 8px; padding: 16px; margin-top: 6px; font-size: 14px; line-height: 1.6; color: #F1F5F9; white-space: pre-wrap; }
        .meta-card { background-color: #0B1220; border-top: 1px solid rgba(255, 255, 255, 0.08); padding: 20px 32px; font-size: 11px; color: #64748B; line-height: 1.6; }
      </style>
    </head>
    <body>
      <div style="padding: 24px 12px; background-color: #0B1220;">
        <table role="presentation" width="100%" cellPadding="0" cellSpacing="0" align="center">
          <tr>
            <td align="center">
              <div class="container">
                <div class="header">
                  <table role="presentation" width="100%">
                    <tr>
                      <td align="left">
                        <h1 class="brand-title">Masum 9T9</h1>
                        <span style="font-size: 12px; color: #94A3B8; font-weight: 600;">Portfolio Communication Engine</span>
                      </td>
                      <td align="right" valign="top">
                        <span class="badge">New Inquiry</span>
                      </td>
                    </tr>
                  </table>
                </div>

                <div class="content-body">
                  <h2 style="margin: 0 0 20px 0; font-size: 18px; font-weight: 800; color: #FFFFFF;">📬 New Inquiry Details</h2>

                  <div class="field-card">
                    <div class="field-label">Client Name</div>
                    <div class="field-value">${escapeHtml(trimmedName)}</div>
                  </div>

                  <div class="field-card">
                    <div class="field-label">Phone / WhatsApp</div>
                    <div class="field-value"><a href="tel:${escapeHtml(trimmedPhone)}" style="color: #38BDF8; text-decoration: none;">${escapeHtml(trimmedPhone)}</a></div>
                  </div>

                  <div class="field-card">
                    <div class="field-label">Email Address</div>
                    <div class="field-value">${trimmedEmail ? `<a href="mailto:${escapeHtml(trimmedEmail)}" style="color: #38BDF8; text-decoration: none;">${escapeHtml(trimmedEmail)}</a>` : '<span style="color: #64748B; font-style: italic;">Not provided</span>'}</div>
                  </div>

                  <div class="field-card">
                    <div class="field-label">Service Category & Project</div>
                    <div class="field-value">${escapeHtml(trimmedCategory)} &rarr; ${escapeHtml(trimmedProjectType)}</div>
                  </div>

                  <div class="field-card">
                    <div class="field-label">Client Message</div>
                    <div class="message-card">${escapeHtml(trimmedMessage)}</div>
                  </div>
                </div>

                <div class="meta-card">
                  <strong>Metadata:</strong><br>
                  &bull; <strong>Timestamp:</strong> ${escapeHtml(timestamp)}<br>
                  &bull; <strong>IP Address:</strong> ${escapeHtml(clientIp)}<br>
                  &bull; <strong>Browser:</strong> ${escapeHtml(userAgent)}<br>
                  &bull; <strong>Referrer:</strong> ${escapeHtml(referrer)}<br>
                  &bull; <strong>Source Domain:</strong> <a href="${appUrl}" style="color: #38BDF8; text-decoration: none;">${appUrl}</a>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </body>
    </html>
    `;

    // 4. Prepare Brevo Visitor Thank-You Email (if email provided)
    let autoReplyPromise: Promise<unknown> = Promise.resolve(null);
    if (trimmedEmail && trimmedEmail.includes('@')) {
      const visitorHtmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank you for contacting Masum 9T9</title>
        <style>
          body { margin: 0; padding: 0; background-color: #0B1220; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #E2E8F0; -webkit-font-smoothing: antialiased; }
          table { border-collapse: collapse; }
          .container { max-width: 580px; margin: 0 auto; background-color: #131C2E; border: 1px solid rgba(56, 189, 248, 0.25); border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.6); }
          .header-bar { background-color: #18243B; padding: 24px 32px; border-bottom: 1px solid rgba(255,255,255,0.08); }
          .brand-name { font-size: 22px; font-weight: 900; color: #FFFFFF; letter-spacing: -0.5px; margin: 0; }
          .brand-sub { font-size: 11px; color: #38BDF8; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-top: 2px; }
          .body-content { padding: 32px; }
          .headline { font-size: 20px; font-weight: 800; color: #FFFFFF; margin-top: 0; margin-bottom: 16px; }
          .paragraph { font-size: 14px; line-height: 1.7; color: #CBD5E1; margin-bottom: 20px; }
          .summary-box { background-color: #18243B; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 20px; margin: 24px 0; }
          .summary-header { font-size: 11px; text-transform: uppercase; color: #38BDF8; font-weight: 800; letter-spacing: 1px; margin-bottom: 12px; }
          .summary-line { font-size: 13px; color: #F1F5F9; margin-bottom: 8px; line-height: 1.5; }
          .cta-btn { display: inline-block; background: linear-gradient(135deg, #0284C7 0%, #2563EB 100%); color: #FFFFFF !important; text-decoration: none; font-weight: 800; font-size: 14px; padding: 14px 28px; border-radius: 12px; box-shadow: 0 4px 15px rgba(2, 132, 199, 0.35); text-align: center; }
          .footer-section { background-color: #0B1220; padding: 24px 32px; border-top: 1px solid rgba(255, 255, 255, 0.08); font-size: 13px; color: #94A3B8; line-height: 1.6; }
          .sign-off { color: #FFFFFF; font-weight: 800; font-size: 15px; margin-top: 10px; }
          .sign-role { font-size: 12px; color: #38BDF8; font-weight: 600; display: block; margin-top: 2px; }
        </style>
      </head>
      <body>
        <div style="padding: 24px 12px; background-color: #0B1220;">
          <table role="presentation" width="100%" cellPadding="0" cellSpacing="0" align="center">
            <tr>
              <td align="center">
                <div class="container">
                  
                  <div class="header-bar">
                    <table role="presentation" width="100%">
                      <tr>
                        <td align="left">
                          <h1 class="brand-name">Masum 9T9</h1>
                          <div class="brand-sub">Official Communication</div>
                        </td>
                        <td align="right" valign="middle">
                          <div style="width: 10px; height: 10px; background-color: #10B981; border-radius: 50%; box-shadow: 0 0 10px #10B981;"></div>
                        </td>
                      </tr>
                    </table>
                  </div>

                  <div class="body-content">
                    <h2 class="headline">Thank you for contacting Masum 9T9</h2>

                    <p class="paragraph">
                      Hello <strong>${escapeHtml(trimmedName)}</strong>,<br><br>
                      Thank you for contacting Masum 9T9.<br>
                      I have successfully received your message and project details. I review every message carefully and usually respond within <strong>24 hours</strong>.
                    </p>

                    <div class="summary-box">
                      <div class="summary-header">Inquiry Summary</div>
                      <div class="summary-line"><strong>Requested Service:</strong> ${escapeHtml(trimmedCategory)} &rarr; ${escapeHtml(trimmedProjectType)}</div>
                      <div class="summary-line"><strong>Contact Phone:</strong> ${escapeHtml(trimmedPhone)}</div>
                      <div class="summary-line"><strong>Submitted On:</strong> ${escapeHtml(timestamp)}</div>
                    </div>

                    <p class="paragraph">
                      If your project requires immediate discussion, you can also reach me directly via Telegram or WhatsApp.
                    </p>

                    <div style="text-align: center; margin: 32px 0 16px 0;">
                      <a href="${appUrl}" target="_blank" class="cta-btn">Visit 9t9.pro.bd Portfolio</a>
                    </div>
                  </div>

                  <div class="footer-section">
                    Thank you.<br><br>
                    Regards,<br>
                    <div class="sign-off">Masum 9T9</div>
                    <span class="sign-role">Founder | Senior Graphic Designer | Frontend Web Developer</span>
                    <a href="${appUrl}" style="color: #38BDF8; text-decoration: none; font-weight: 700; display: inline-block; margin-top: 6px;">9t9.pro.bd</a>
                  </div>

                </div>
              </td>
            </tr>
          </table>
        </div>
      </body>
      </html>
      `;

      autoReplyPromise = sendBrevoEmail({
        to: [{ email: trimmedEmail, name: trimmedName }],
        subject: 'Thank you for contacting Masum 9T9',
        htmlContent: visitorHtmlContent,
        sender: { name: brandName, email: adminEmail },
        replyTo: { name: brandName, email: adminEmail },
      });
    }

    // Execute actions in parallel
    const [telegramRes, sheetsRes, brevoAdminRes, brevoAutoReplyRes] = await Promise.allSettled([
      sendTelegramMessage({
        botToken: telegramBotToken,
        chatId: telegramChatId,
        htmlText: telegramHtml,
        rawText: telegramRaw,
      }),
      sendGoogleSheetsBackup(googleSheetsUrl, sheetData),
      sendBrevoEmail({
        to: [{ email: adminEmail, name: 'Masum 9T9 Admin' }],
        subject: adminSubject,
        htmlContent: adminHtmlContent,
        sender: { name: `${trimmedName} (via 9t9.pro.bd)`, email: adminEmail },
        replyTo: trimmedEmail ? { name: trimmedName, email: trimmedEmail } : undefined,
      }),
      autoReplyPromise,
    ]);

    console.log('Contact Execution Results:', {
      telegram: telegramRes.status === 'fulfilled' ? telegramRes.value : telegramRes.reason,
      sheets: sheetsRes.status === 'fulfilled' ? sheetsRes.value : sheetsRes.reason,
      brevoAdmin: brevoAdminRes.status === 'fulfilled' ? brevoAdminRes.value : brevoAdminRes.reason,
      brevoAutoReply: brevoAutoReplyRes.status === 'fulfilled' ? brevoAutoReplyRes.value : brevoAutoReplyRes.reason,
    });

    return res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully across all channels!',
      details: {
        telegram: telegramRes.status === 'fulfilled',
        googleSheets: sheetsRes.status === 'fulfilled',
        brevoAdmin: brevoAdminRes.status === 'fulfilled',
        brevoAutoReply: brevoAutoReplyRes.status === 'fulfilled',
      },
    });
  } catch (err: unknown) {
    console.error('API /api/contact handler error:', err);
    return res.status(500).json({
      success: false,
      error: 'An internal error occurred while processing your message. Please try again.',
    });
  }
});

// Start Server with Vite Middleware in Dev, Static serving in Prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Masum 9T9 Full-Stack Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

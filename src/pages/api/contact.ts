
export const prerender = false;

import type { APIRoute } from "astro";
import nodemailer from "nodemailer";

export const POST: APIRoute = async ({ request }) => {
    try {
        const data = await request.json();

        // 1. Spam Check (Honeypot) - 'first' field should be empty
        if (data.first) {
            return new Response(JSON.stringify({ message: "Spam detected" }), {
                status: 400,
            });
        }

        const { name, email, message, token } = data;

        if (!name || !email || !message || !token) {
            return new Response(
                JSON.stringify({ message: "Missing required fields" }),
                { status: 400 }
            );
        }

        // 2. Verify reCAPTCHA Token
        const recaptchaSecret = import.meta.env.RECAPTCHA_SECRET_KEY;
        const recaptchaVerifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${token}`;

        const recaptchaResponse = await fetch(recaptchaVerifyUrl, {
            method: "POST",
        });
        const recaptchaData = await recaptchaResponse.json();

        if (!recaptchaData.success || recaptchaData.score < 0.5) {
            console.error("ReCAPTCHA failed:", recaptchaData);
            return new Response(
                JSON.stringify({ message: "ReCAPTCHA verification failed. You might be a bot." }),
                { status: 400 }
            );
        }

        // 3. Send Email via Nodemailer
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: import.meta.env.APP_GMAIL_EMAIL,
                pass: import.meta.env.APP_GMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: "info@michaelduren.com",
            to: "michaeld@michaelduren.com",
            subject: `WEBSITE: MESSAGE FROM ${name}`,
            html: `
        <h1>New Contact from Portfolio</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
          <h3>Message:</h3>
          <p>${message.replace(/\n/g, "<br>")}</p>
        </div>
      `,
        };

        const responseSent = await transporter.sendMail(mailOptions);

        if (responseSent.accepted.length > 0) {
            return new Response(
                JSON.stringify({ message: "Message sent successfully" }),
                { status: 200 }
            );
        } else {
            throw new Error("Email provider rejected message");
        }

    } catch (error) {
        console.error("Contact API Error:", error);
        return new Response(
            JSON.stringify({ message: "Internal Server Error" }),
            { status: 500 }
        );
    }
};

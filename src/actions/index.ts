import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import { Resend } from "resend";

const turnstileIsValid = async (request: Request) => {
  const body = await request.formData();
  const token = body.get("cf-turnstile-response");
  const ip = import.meta.env.DEV ? "127.0.0.1" : request.headers.get("cf-connecting-ip");

  if (!token || !ip) return false;

  let formData = new FormData();

  formData.append("secret", import.meta.env.TURNSTILE_SECRET_KEY);
  formData.append("response", token);
  formData.append("remoteip", ip);

  const result = await fetch(import.meta.env.TURNSTILE_SITE_VERIFY_ENDPOINT, {
    body: formData,
    method: "POST",
  });

  const outcome = await result.json();

  return outcome.success;
};

export const server = {
  sendContactForm: defineAction({
    accept: "form",
    input: z.object({
      firstName: z.string(),
      lastName: z.string(),
      sender: z.string().email(),
      subject: z.string(),
      message: z.string(),
    }),
    handler: async (input, context) => {
      const requestedByHuman = await turnstileIsValid(context.request);
      if (!requestedByHuman) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "You must be human to send this form.",
        });
      };

      const resend = new Resend(import.meta.env.RESEND_API_KEY);

      const data = await resend.emails.send({
        from: `${input.firstName} ${input.lastName} <${import.meta.env.EMAIL_FROM}>`,
        to: [import.meta.env.DEV ? "delivered@resend.dev" : import.meta.env.EMAIL_TO],
        subject: input.subject,
        text: `${input.message}\n\n\nContact email: ${input.sender}\n\nSent via portfolio contact form`,
      });

      if (data.error) {
        console.log("Error sending email: ", data.error);
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while sending the email.",
        });
      }

      return {
        success: true,
        message: "Email sent successfully.",
      };
    },
  })
};
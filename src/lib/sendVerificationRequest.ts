import nodemailer from "nodemailer";
import { render } from "mjml-react";
import { createIntl, createIntlCache } from "react-intl";
import { generate } from "./emailVerification";
import { getMessages } from "../translations/messages";
import * as Sentry from "@sentry/node";

// This is optional but highly recommended
// since it prevents memory leak
const cache = createIntlCache();

export const sendVerificationRequest = ({
  identifier: email,
  url,
  baseUrl,
  provider,
  locale = "sv",
  uniqueMessage,
}) => {
  return new Promise((resolve, reject) => {
    const { server, from } = provider;
    const intl = createIntl(
      {
        locale,
        messages: getMessages(locale),
      },
      cache
    );
    // Strip protocol from URL and use domain as site name
    const site = baseUrl.replace(/^https?:\/\//, "");

    nodemailer.createTransport(server).sendMail(
      {
        to: email,
        from,
        subject: intl.formatMessage(
          { defaultMessage: "Logga in på {site}" },
          { site }
        ),
        text: text({ url, site, uniqueMessage, intl }),
        html: html({ url, site, email, uniqueMessage, intl }),
      },
      async (error) => {
        if (error) {
          Sentry.captureException(error);
          await Sentry.flush(2000);
          return reject(new Error("SEND_VERIFICATION_EMAIL_ERROR"));
        }
        return resolve();
      }
    );
  });
};

// Email HTML body
const html = ({ url, site, email, uniqueMessage, intl }) => {
  // Insert invisible space into domains and email address to prevent both the
  // email address and the domain from being turned into a hyperlink by email
  // clients like Outlook and Apple mail, as this is confusing because it seems
  // like they are supposed to click on their email address to sign in.
  const escapedEmail = `${email.replace(/\./g, "&#8203;.")}`;
  const escapedSite = `${site.replace(/\./g, "&#8203;.")}`;

  const { html } = render(
    generate({
      url,
      site,
      escapedSite,
      email,
      escapedEmail,
      intl,
      uniqueMessage,
    })
  );
  return html;
};

// Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
const text = ({ url, site, uniqueMessage, intl }) =>
  intl.formatMessage(
    {
      defaultMessage:
        "Logga in på {site} med denna länk\n{url}\nFöljande meddelande visades vid inloggningen:\n{uniqueMessage}\n\n",
    },
    { url, site, uniqueMessage }
  );

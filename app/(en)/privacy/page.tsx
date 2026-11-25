import type { Metadata } from "next";

/* Written to satisfy Google's OAuth review as much as to inform galleries: it
 * names exactly what the Gmail connection reads, and carries the Limited Use
 * statement Google requires word for word. Keep it in step with
 * gallery-OS/docs/gmail-capture.md whenever the Gmail scopes change. */

const CONTACT_EMAIL = "contact@goodart.works";
const UPDATED = "25 November 2026";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Good Artworks collects, uses and protects data, including data from Google accounts.",
  alternates: { canonical: "/privacy" },
};

const sections: { title: string; body: React.ReactNode }[] = [
  {
    title: "Who we are",
    body: (
      <p>
        Good Artworks is a workspace for art galleries and dealers. It keeps their artwork records
        and their exchanges with collectors in one place, inside the tools they already use: Gmail
        and WhatsApp. For any question about this policy, write to{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    ),
  },
  {
    title: "What we collect",
    body: (
      <ul>
        <li>Account details: the name and email address of the people who sign in.</li>
        <li>What a gallery adds: artworks, artists, documents, contacts and notes.</li>
        <li>
          Conversation records: who a gallery is talking with, on which channel, when the exchange
          last moved and its subject line.
        </li>
        <li>Messages sent to the Good Artworks assistant on WhatsApp, to answer them.</li>
      </ul>
    ),
  },
  {
    title: "Google user data",
    body: (
      <>
        <p>
          When a gallery connects Gmail, Good Artworks asks Google for read-only access to the
          mailbox and permission to manage labels. With it, Good Artworks:
        </p>
        <ul>
          <li>reads the email address of the connected account;</li>
          <li>creates a label named “Vitreen”, if it does not exist yet;</li>
          <li>
            reads, for threads the gallery files under that label only: the sender and recipient
            names and addresses, the subject, the date and the thread identifier.
          </li>
        </ul>
        <p>
          Good Artworks does not store the body or attachments of emails, and never sends, edits or
          deletes an email. This data is used only to show the gallery its own conversations with
          collectors. It is not sold, not used for advertising, and not used to train artificial
          intelligence models.
        </p>
        <p>
          Good Artworks’ use and transfer of information received from Google APIs to any other app
          will adhere to the{" "}
          <a href="https://developers.google.com/terms/api-services-user-data-policy">
            Google API Services User Data Policy
          </a>
          , including the Limited Use requirements.
        </p>
      </>
    ),
  },
  {
    title: "How data is protected",
    body: (
      <p>
        Data is stored with our hosting providers (Vercel and Sanity) and travels over encrypted
        connections. The key that lets Good Artworks reach a Gmail account is encrypted before it is
        stored. Only the gallery’s own team, and Good Artworks staff when the gallery asks for
        support, can access a gallery’s data.
      </p>
    ),
  },
  {
    title: "Sharing",
    body: (
      <p>
        We do not sell or rent personal data. We share it only with the service providers that run
        Good Artworks (hosting, email delivery, messaging), under contracts that limit them to that
        purpose, or when the law requires it.
      </p>
    ),
  },
  {
    title: "Keeping and deleting data",
    body: (
      <p>
        A gallery can disconnect Gmail at any time from its settings, or from its Google account’s
        security page. Good Artworks then deletes its access key at once. A gallery can ask us at{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> to delete all its data; we do so
        within 30 days. Under the GDPR, anyone can ask to see, correct or delete the personal data
        we hold about them.
      </p>
    ),
  },
  {
    title: "Changes",
    body: (
      <p>
        If this policy changes, we update this page and the date below, and tell galleries by email
        when the change matters.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <main className="bg-white px-4 py-24 md:px-6 md:py-32">
      <article className="mx-auto max-w-2xl text-[15px] leading-[1.7] text-[#3F3E3B] [&_a]:underline [&_a]:underline-offset-2 [&_li]:mt-2 [&_p+p]:mt-4 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5">
        <h1 className="font-display text-[36px] leading-[1.1] tracking-[-0.03em] text-[#111110] md:text-[44px]">
          Privacy Policy
        </h1>
        <p className="mt-4 text-[13px] text-[#8A8985]">Last updated {UPDATED}</p>
        {sections.map((section) => (
          <section key={section.title} className="mt-12">
            <h2 className="text-[18px] font-medium tracking-[-0.01em] text-[#111110]">
              {section.title}
            </h2>
            <div className="mt-3">{section.body}</div>
          </section>
        ))}
      </article>
    </main>
  );
}

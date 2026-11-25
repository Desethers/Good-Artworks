import type { Metadata } from "next";

/* Required for the Google Workspace Marketplace listing of the Gmail add-on,
 * alongside /privacy. Plain and short on purpose: what the service is, who
 * owns what, and how to stop. */

const CONTACT_EMAIL = "contact@goodart.works";
const UPDATED = "25 November 2026";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that apply when a gallery uses Good Artworks.",
  alternates: { canonical: "/terms" },
};

const sections: { title: string; body: React.ReactNode }[] = [
  {
    title: "The service",
    body: (
      <p>
        Good Artworks is a workspace for art galleries and dealers: an artwork inventory, a record
        of exchanges with collectors, and tools inside Gmail and WhatsApp that use them. These terms
        apply to anyone who uses it, including through the Good Artworks add-on for Gmail.
      </p>
    ),
  },
  {
    title: "Your account and your data",
    body: (
      <p>
        You are responsible for the people you give access to and for what they do with it.
        Everything a gallery adds — artworks, images, contacts, notes — remains the gallery’s. We
        use it only to run the service for you, as described in our{" "}
        <a href="/privacy">Privacy Policy</a>.
      </p>
    ),
  },
  {
    title: "Acceptable use",
    body: (
      <p>
        Do not use Good Artworks to send unsolicited messages, to break the law, or to access data
        that is not yours. Do not try to disrupt the service or get around its security.
      </p>
    ),
  },
  {
    title: "Availability",
    body: (
      <p>
        We work to keep Good Artworks available and your data safe, but the service is provided “as
        is”. To the extent the law allows, we are not liable for indirect losses or for losses
        caused by services we do not control, such as Gmail or WhatsApp.
      </p>
    ),
  },
  {
    title: "Stopping",
    body: (
      <p>
        You can stop using Good Artworks at any time: remove the add-on from Gmail, disconnect Gmail
        from your settings, and ask us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> to
        delete your data. We may suspend an account that breaks these terms.
      </p>
    ),
  },
  {
    title: "Changes and contact",
    body: (
      <p>
        If these terms change, we update this page and the date below. They are governed by French
        law. Questions: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <main className="bg-white px-4 py-24 md:px-6 md:py-32">
      <article className="mx-auto max-w-2xl text-[15px] leading-[1.7] text-[#3F3E3B] [&_a]:underline [&_a]:underline-offset-2 [&_p+p]:mt-4">
        <h1 className="font-display text-[36px] leading-[1.1] tracking-[-0.03em] text-[#111110] md:text-[44px]">
          Terms of Service
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

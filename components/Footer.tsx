"use client";

import { usePathname } from "next/navigation";
import { localeHref, stripLocale, translations, useLang, type Lang } from "@/lib/lang";

/* `translations` is `as const`, so index by Lang to accept either language
 * rather than pinning the literal English strings. */
type FooterCopy = (typeof translations)[Lang]["footer"];

/* Structure is shared; only the labels come from the active language. */
function buildColumns(footer: FooterCopy) {
  const { columns, links } = footer;
  return [
    {
      title: columns.platform,
      links: [
        { label: links.artworkManagement, href: "/product/artwork-inventory" },
        { label: links.salesAssistant, href: "/product/sales-conversations" },
      ],
    },
    {
      title: columns.solutions,
      links: [
        { label: links.forGalleries, href: "/solutions/art-galleries" },
        { label: links.forAdvisors, href: "/solutions/art-advisors-dealers" },
      ],
    },
    {
      title: columns.company,
      links: [
        { label: links.about, href: "/about" },
        { label: links.pricing, href: "/pricing" },
        { label: links.contact, href: "#contact", opensContact: true },
      ],
    },
  ];
}

function openContact() {
  window.dispatchEvent(new CustomEvent("open-contact-modal"));
}

/* The two language versions are separate URLs, so this is a plain link to the
 * counterpart page rather than a client-side toggle. Picking one writes the
 * same cookie the geo-redirect middleware reads, so a manual choice sticks
 * instead of being overridden by geo on the next visit. */
function LanguageSwitch() {
  const { lang } = useLang();
  const pathname = usePathname();
  const bare = stripLocale(pathname);

  const options = [
    { code: "en" as const, label: "EN", url: bare, hrefLang: "en-GB" },
    { code: "fr" as const, label: "FR", url: localeHref("fr", bare), hrefLang: "fr-FR" },
  ];

  return (
    <p className="flex items-center gap-1.5">
      {options.map((option, index) => (
        <span key={option.code} className="flex items-center gap-1.5">
          {index > 0 ? <span aria-hidden="true">·</span> : null}
          {option.code === lang ? (
            <span aria-current="true" className="text-[#D5D5D2]">
              {option.label}
            </span>
          ) : (
            <a
              href={option.url}
              hrefLang={option.hrefLang}
              onClick={() => {
                document.cookie = `vitreen-lang=${option.code}; path=/; max-age=31536000`;
              }}
              className="transition-colors duration-200 hover:text-white"
            >
              {option.label}
            </a>
          )}
        </span>
      ))}
    </p>
  );
}

export default function Footer() {
  const { lang, t, href } = useLang();
  const footerColumns = buildColumns(t.footer);

  return (
    <footer id="contact" className="bg-[#111110] text-white">
      <div className="px-4 md:px-6">
        <div className="mx-auto max-w-7xl py-14 md:py-20">
          <div className="grid gap-14 md:grid-cols-[minmax(240px,1fr)_minmax(0,1.5fr)] md:gap-20 lg:gap-28">
            <div>
              <a
                href={href("/")}
                className="font-display text-[18px] tracking-[-0.025em] text-white"
              >
                Good Artworks
              </a>
              <p className="mt-5 max-w-[23rem] text-[14px] leading-[1.65] text-[#ADADAA]">
                {t.footer.tagline}
              </p>
            </div>

            <nav aria-label="Footer" className="grid gap-10 sm:grid-cols-3 lg:gap-8">
              {footerColumns.map((column) => (
                <div key={column.title}>
                  <h3 className="text-[12px] font-medium text-[#6B6A67]">{column.title}</h3>
                  <ul className="mt-5 space-y-3">
                    {column.links.map((link) => {
                      const isExternal = "external" in link && link.external;
                      return (
                        <li key={link.label}>
                          <a
                            href={isExternal ? link.href : href(link.href)}
                            onClick={
                              "opensContact" in link && link.opensContact ? openContact : undefined
                            }
                            className="text-[14px] leading-snug text-[#D5D5D2] transition-colors duration-200 hover:text-white"
                          >
                            {link.label}
                            {isExternal ? (
                              <span aria-hidden="true" className="ml-1">
                                ↗
                              </span>
                            ) : null}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          <div className="mt-16 grid gap-3 pt-6 text-[12px] text-[#6B6A67] sm:grid-cols-[1fr_auto_1fr] sm:items-center md:mt-20">
            <p>© 2026 Good Artworks</p>
            <div className="flex items-center gap-4">
              <LanguageSwitch />
              <p>{t.footer.location}</p>
            </div>
            <p className="sm:justify-self-end">
              {lang === "fr" ? "Site web réalisé par" : "Website by"}{" "}
              <a
                href="https://www.rrstudio.online/"
                className="underline underline-offset-4 transition-colors duration-200 hover:text-white"
              >
                R.R Studio
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

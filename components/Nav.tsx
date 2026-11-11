"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/lib/lang";
import { Button } from "@/components/ui/Button";
import ContactModal from "@/components/ContactModal";

const ease = [0.16, 1, 0.3, 1] as const;

const openContactModal = () => window.dispatchEvent(new Event("open-contact-modal"));

export default function Nav() {
  const { t, href } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<"product" | "solutions" | null>(null);
  const [productOpen, setProductOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [activeProductIndex, setActiveProductIndex] = useState(0);

  const closeMobileMenu = useCallback(() => {
    setMenuOpen(false);
    setMobileSection(null);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobileMenu();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [menuOpen, closeMobileMenu]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 2);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = t.nav.links;
  const productMenu = t.nav.productMenu;
  const solutionsMenu = t.nav.solutionsMenu;

  const megaMenuOpen = productOpen || solutionsOpen;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b-[0.5px] bg-white py-2 px-4 transition-[border-color] duration-200 md:px-6 ${
          scrolled || megaMenuOpen ? "border-[#E8E8E6]" : "border-transparent"
        }`}
      >
        <div className="relative mx-auto flex h-9 w-full max-w-7xl items-center justify-between">
          {/* Gauche : burger (mobile) + logo */}
          <div className="relative z-10 flex shrink-0 items-center">
            <button
              type="button"
              className="-ml-2 mr-1 flex shrink-0 flex-col justify-center gap-[5px] p-2 md:hidden"
              onClick={() => (menuOpen ? closeMobileMenu() : setMenuOpen(true))}
              aria-label={menuOpen ? "Fermer le menu" : "Menu"}
              aria-expanded={menuOpen}
            >
              <span
                className={`block h-px w-5 origin-center bg-[#111110] transition-all duration-300 ${
                  menuOpen ? "translate-y-[3px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px w-5 origin-center bg-[#111110] transition-all duration-300 ${
                  menuOpen ? "-translate-y-[3px] -rotate-45" : ""
                }`}
              />
            </button>
            <a
              href={href("/")}
              className="w-32 shrink-0 font-display text-[15px] tracking-tight text-[#111110] md:text-base"
            >
              Good Artworks
            </a>
          </div>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 md:flex">
            {navLinks.map((link) => {
              const badge = "badge" in link && (link as { badge: string }).badge;
              const linkMenu = "menu" in link ? (link as { menu?: string }).menu : undefined;
              const hasMenu = linkMenu === "product" || linkMenu === "solutions";
              const inner = (
                <>
                  {link.label}
                  {badge && (
                    <span className="rounded-full bg-[#111110] px-1.5 py-0.5 text-[10px] font-medium leading-none text-white">
                      {badge}
                    </span>
                  )}
                </>
              );
              if (hasMenu) {
                const isProduct = linkMenu === "product";
                const open = isProduct ? productOpen : solutionsOpen;
                const setOpen = isProduct ? setProductOpen : setSolutionsOpen;
                const closeOther = isProduct
                  ? () => setSolutionsOpen(false)
                  : () => setProductOpen(false);
                return (
                  <div
                    key={link.label}
                    onMouseEnter={() => {
                      setOpen(true);
                      closeOther();
                    }}
                    onMouseLeave={() => setOpen(false)}
                    className="flex items-center"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setOpen(!open);
                        closeOther();
                      }}
                      aria-expanded={open}
                      className="flex items-center gap-1.5 text-sm text-[#6B6A67] transition-colors duration-200 hover:text-[#111110]"
                    >
                      {inner}
                    </button>
                  </div>
                );
              }
              return (
                <a
                  key={link.label}
                  href={href(link.href)}
                  className="flex items-center gap-1.5 text-sm text-[#6B6A67] transition-colors duration-200 hover:text-[#111110]"
                >
                  {inner}
                </a>
              );
            })}
          </nav>

          <AnimatePresence>
            {productOpen && (
              <motion.div
                key="product-menu"
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                transition={{ duration: 0.32, ease }}
                onMouseEnter={() => setProductOpen(true)}
                onMouseLeave={() => setProductOpen(false)}
                className="fixed left-0 right-0 top-[52px] z-40 hidden overflow-hidden md:block"
              >
                <div className="w-full border-b border-[#E8E8E6] bg-white px-8 py-8">
                  <div className="mx-auto grid max-w-7xl grid-cols-[1fr_minmax(0,32rem)] gap-x-12">
                    <div>
                      <p className="text-[12px] text-[#ADADAA]">{productMenu.sectionLabel}</p>
                      <div className="mt-4 grid grid-cols-1 gap-y-1">
                        {productMenu.items.map((item, index) => (
                          <a
                            key={item.title}
                            href={href(item.href)}
                            onClick={() => setProductOpen(false)}
                            onMouseEnter={() => setActiveProductIndex(index)}
                            onFocus={() => setActiveProductIndex(index)}
                            className={`group -mx-[42px] block w-[calc(100%-150px)] rounded px-[42px] py-2 transition-colors duration-200 ${
                              activeProductIndex === index ? "bg-[#F5F5F3]" : "hover:bg-[#F8F8F6]"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1.5">
                                <span className="font-display text-[15px] text-[#111110] transition-colors group-hover:text-[#6B6A67]">
                                  {item.title}
                                </span>
                                {(() => {
                                  const b = "badge" in item && (item as { badge?: string }).badge;
                                  return b ? (
                                    <span className="rounded-full bg-[#111110] px-1.5 py-0.5 text-[9px] font-medium leading-none text-white">
                                      {b}
                                    </span>
                                  ) : null;
                                })()}
                              </div>
                            </div>
                            <p className="mt-0.5 max-w-xl text-[12px] leading-snug text-[#6B6A67]">
                              {item.desc}
                            </p>
                          </a>
                        ))}
                      </div>
                    </div>
                    <a
                      href={href(productMenu.featured.href)}
                      onClick={() => setProductOpen(false)}
                      className="group block"
                    >
                      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md bg-[#111110]">
                        <div
                          className="absolute inset-0 bg-cover bg-[center_42%]"
                          style={{ backgroundImage: `url(${productMenu.featured.image})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                          <h4 className="font-display text-[17px]">{productMenu.featured.title}</h4>
                          <p className="mt-1 max-w-sm text-[12px] leading-snug text-white/75">
                            {productMenu.featured.desc}
                          </p>
                          <p className="mt-3 flex items-center gap-1 text-[12px] font-medium text-white">
                            {productMenu.featured.cta}
                            <span
                              aria-hidden="true"
                              className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1"
                            >
                              →
                            </span>
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {solutionsOpen && (
              <motion.div
                key="solutions-menu"
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                transition={{ duration: 0.32, ease }}
                onMouseEnter={() => setSolutionsOpen(true)}
                onMouseLeave={() => setSolutionsOpen(false)}
                className="fixed left-0 right-0 top-[52px] z-40 hidden overflow-hidden md:block"
              >
                <div className="w-full overflow-hidden border-b border-[#E8E8E6] bg-white px-8 py-8">
                  <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,24rem)_minmax(0,32rem)] justify-between gap-x-12">
                    {(() => {
                      const column = solutionsMenu.columns[0];
                      return (
                        <div>
                          <p className="text-[12px] text-[#ADADAA]">{column.label}</p>
                          <ul className="mt-4 grid gap-y-1">
                            {column.items.map((item) => (
                              <li key={item.title}>
                                <a
                                  href={href(item.href)}
                                  onClick={() => setSolutionsOpen(false)}
                                  className="group -mx-4 block w-[calc(100%+32px)] rounded px-4 py-2 transition-colors duration-200 hover:bg-[#F8F8F6]"
                                >
                                  <span className="flex items-center gap-3">
                                    <span className="font-display text-[15px] text-[#111110] transition-colors group-hover:text-[#6B6A67]">
                                      {item.title}
                                    </span>
                                  </span>
                                  {"desc" in item && item.desc && (
                                    <span className="mt-0.5 block text-[12px] leading-snug text-[#6B6A67]">
                                      {item.desc}
                                    </span>
                                  )}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })()}
                    <a
                      href={href(solutionsMenu.featured.href)}
                      onClick={() => setSolutionsOpen(false)}
                      className="group block"
                    >
                      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md bg-[#111110]">
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: `url(${solutionsMenu.featured.image})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                          <h4 className="font-display text-[17px]">
                            {solutionsMenu.featured.title}
                          </h4>
                          <p className="mt-1 max-w-sm text-[12px] leading-snug text-white/75">
                            {solutionsMenu.featured.desc}
                          </p>
                          <p className="mt-3 flex items-center gap-1 text-[12px] font-medium text-white">
                            {solutionsMenu.featured.cta}
                            <span
                              aria-hidden="true"
                              className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1"
                            >
                              →
                            </span>
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <Button
            size="sm"
            onClick={openContactModal}
            className="z-20 shrink-0 !py-[7px] !px-3 !text-[12px]"
          >
            {t.nav.cta}
          </Button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="mobile-menu-panel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease }}
              className="fixed inset-0 z-[60] flex flex-col bg-white md:hidden"
            >
              <div className="flex shrink-0 items-center justify-end px-4 pt-4">
                <button
                  type="button"
                  onClick={closeMobileMenu}
                  aria-label={t.nav.modal.close}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E8E8E6] text-[#111110]"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M3 3l10 10M13 3L3 13"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              <nav className="mt-2 flex flex-1 flex-col overflow-y-auto px-6">
                {navLinks.map((link) => {
                  const linkMenu = "menu" in link ? (link as { menu?: string }).menu : undefined;

                  if (linkMenu === "product" || linkMenu === "solutions") {
                    const isProduct = linkMenu === "product";
                    const items = isProduct ? productMenu.items : solutionsMenu.columns[0].items;
                    const expanded = mobileSection === linkMenu;
                    return (
                      <div key={link.label} className="border-b border-[#E8E8E6] py-4">
                        <button
                          type="button"
                          onClick={() => setMobileSection(expanded ? null : linkMenu)}
                          aria-expanded={expanded}
                          className="flex w-full items-center justify-between gap-2 font-display text-[22px] text-[#111110]"
                        >
                          {link.label}
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            className={`shrink-0 text-[#ADADAA] transition-transform duration-200 ${
                              expanded ? "rotate-180" : ""
                            }`}
                            aria-hidden="true"
                          >
                            <path
                              d="M4 6l4 4 4-4"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                        <AnimatePresence initial={false}>
                          {expanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2, ease }}
                              className="overflow-hidden"
                            >
                              <div className="flex flex-col gap-3 pb-1 pt-4">
                                {items.map((item) => (
                                  <a
                                    key={item.title}
                                    href={href(item.href)}
                                    onClick={closeMobileMenu}
                                    className="text-[15px] text-[#6B6A67]"
                                  >
                                    {item.title}
                                  </a>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <a
                      key={link.label}
                      href={href(link.href)}
                      onClick={closeMobileMenu}
                      className="border-b border-[#E8E8E6] py-4 font-display text-[22px] text-[#6B6A67] last:border-b-0"
                    >
                      {link.label}
                    </a>
                  );
                })}
              </nav>

              <div className="shrink-0 px-6 pb-8 pt-6">
                <button
                  type="button"
                  onClick={() => {
                    closeMobileMenu();
                    openContactModal();
                  }}
                  className="w-full rounded-full bg-[#111110] px-4 py-3.5 text-center text-[15px] text-white"
                >
                  {t.nav.cta}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <ContactModal />
    </>
  );
}

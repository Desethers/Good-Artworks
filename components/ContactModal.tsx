"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "@/lib/lang";
import Cal, { getCalApi } from "@calcom/embed-react";
import { Button } from "@/components/ui/Button";

const CAL_LINK = "raphael-wexe5e/30min";
const CAL_NAMESPACE = "demo";

const ease = [0.16, 1, 0.3, 1] as const;

const inputClass =
  "w-full bg-transparent border-b border-[#E8E8E6] py-3 text-[#111110] text-sm placeholder-[#ADADAA] focus:outline-none focus:border-[#111110] transition-colors duration-200";

/**
 * Demo booking modal (Cal.com calendar, email prefilled when known) with a
 * fallback contact form, opened from anywhere by dispatching the
 * `open-contact-modal` window event. Extracted from Nav so headers that are
 * not the main navigation (the landing's minimal header) can offer the same
 * CTA without duplicating the form.
 */
export default function ContactModal() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ nom: "", galerie: "", email: "", projet: "" });
  const [view, setView] = useState<"book" | "write">("book");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    setSubmitted(false);
    setSending(false);
    setSendError(null);
    setView("book");
    setForm({ nom: "", galerie: "", email: "", projet: "" });
  }, []);

  useEffect(() => {
    // An email field CTA passes the address along: it is prefilled, and the
    // visitor carries on from their name.
    const onOpen = (e: Event) => {
      const email = (e as CustomEvent<{ email?: string }>).detail?.email;
      if (email) setForm((f) => ({ ...f, email }));
      setOpen(true);
    };
    window.addEventListener("open-contact-modal", onOpen);
    return () => window.removeEventListener("open-contact-modal", onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  // The event details (title, duration, video) are told by the left column,
  // so the embed only shows the calendar and the slots.
  useEffect(() => {
    if (!open || view !== "book") return;
    getCalApi({ namespace: CAL_NAMESPACE }).then((cal) => {
      cal("ui", { hideEventTypeDetails: true, layout: "month_view", theme: "light" });
    });
  }, [open, view]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSendError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Erreur lors de l'envoi");
      }
      setSubmitted(true);
    } catch (err) {
      setSendError(err instanceof Error ? err.message : "Erreur lors de l'envoi");
    } finally {
      setSending(false);
    }
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#111110]/40 p-4 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.35, ease }}
            className={`relative max-h-[92vh] w-full overflow-y-auto rounded-[12px] border border-[#E8E8E6] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.12)] ${
              view === "book" ? "max-w-[1180px]" : "max-w-md p-6 md:p-8"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full text-[#6B6A67] transition-colors hover:bg-[#F5F5F3] hover:text-[#111110]"
              aria-label={t.nav.modal.close}
            >
              <span className="text-lg leading-none">×</span>
            </button>

            {view === "book" ? (
              <div className="grid md:grid-cols-[300px_1fr]">
                <div className="relative flex flex-col overflow-hidden bg-[#111110] bg-[url(/book-demo-bg.jpg)] bg-cover bg-center p-6 md:p-8">
                  <div aria-hidden className="pointer-events-none absolute inset-0 bg-black/40" />
                  <div className="relative flex flex-1 flex-col">
                    <h2
                      id="contact-modal-title"
                      className="pr-10 font-display text-[22px] leading-tight tracking-[-0.02em] text-white"
                    >
                      {t.nav.modal.bookTitle}
                    </h2>
                    <p className="mt-2 text-sm text-white/80">{t.nav.modal.bookFor}</p>
                    <p className="mt-1 text-[13px] text-white/60">{t.nav.modal.bookMeta}</p>

                    <p className="mt-6 text-[12px] font-medium uppercase tracking-[0.08em] text-white/60 md:mt-8">
                      {t.nav.modal.bookIntro}
                    </p>
                    <ol className="mt-4 flex flex-col gap-3">
                      {t.nav.modal.bookSteps.map((step, i) => (
                        <li key={step} className="flex items-center gap-3">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/40 text-[12px] text-white">
                            {i + 1}
                          </span>
                          <p className="text-sm leading-snug text-white">{step}</p>
                        </li>
                      ))}
                    </ol>

                    <p className="mt-6 text-sm text-white md:mt-8">{t.nav.modal.bookReassure}</p>

                    <button
                      type="button"
                      onClick={() => setView("write")}
                      className="mt-4 w-fit cursor-pointer text-sm text-white/80 underline underline-offset-2 hover:text-white md:mt-auto md:pt-8"
                    >
                      {t.nav.modal.bookAlt}
                    </button>
                  </div>
                </div>

                <div className="p-4 md:p-6 md:pt-12">
                  <div className="relative">
                    <p className="absolute inset-x-0 top-24 text-center text-sm text-[#ADADAA]">
                      {t.nav.modal.bookLoading}
                    </p>
                    <Cal
                      namespace={CAL_NAMESPACE}
                      calLink={CAL_LINK}
                      config={{
                        layout: "month_view",
                        theme: "light",
                        ...(form.email ? { email: form.email } : {}),
                      }}
                      className="relative min-h-[420px] w-full"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <>
                <h2
                  id="contact-modal-title"
                  className="mb-2 pr-10 font-display text-xl text-[#111110]"
                >
                  {t.nav.modal.title}
                </h2>
                <p className="mb-6 text-sm text-[#6B6A67]">{t.nav.modal.subtitle}</p>
              </>
            )}

            {view === "book" ? null : submitted ? (
              <p className="py-4 font-display text-lg leading-relaxed text-[#111110]">
                {t.nav.modal.success}
              </p>
            ) : (
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
                <input
                  type="text"
                  name="nom"
                  placeholder={t.nav.modal.fields.nom}
                  value={form.nom}
                  onChange={handleFormChange}
                  required
                  className={inputClass}
                />
                <input
                  type="text"
                  name="galerie"
                  placeholder={t.nav.modal.fields.galerie}
                  value={form.galerie}
                  onChange={handleFormChange}
                  required
                  className={inputClass}
                />
                <input
                  type="email"
                  name="email"
                  placeholder={t.nav.modal.fields.email}
                  value={form.email}
                  onChange={handleFormChange}
                  required
                  className={inputClass}
                />
                <textarea
                  name="projet"
                  placeholder={t.nav.modal.fields.projet}
                  value={form.projet}
                  onChange={handleFormChange}
                  required
                  rows={4}
                  className={`${inputClass} resize-none`}
                />
                {sendError && <p className="-mt-2 text-sm text-red-500">{sendError}</p>}
                <Button type="submit" size="md" disabled={sending} className="mt-1 w-fit">
                  {sending ? t.nav.modal.sending : t.nav.modal.submit}
                </Button>
              </form>
            )}
            {view === "write" && !submitted && (
              <button
                type="button"
                onClick={() => setView("book")}
                className="mt-4 cursor-pointer text-sm text-[#6B6A67] underline underline-offset-2 hover:text-[#111110]"
              >
                {t.nav.modal.bookBack}
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

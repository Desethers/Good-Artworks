import { Resend } from "resend";
import { NextResponse } from "next/server";

/*
 * Sending. Until goodart.works is verified at resend.com/domains, Resend only
 * delivers from onboarding@resend.dev, and only to the e-mail of the Resend
 * account itself (goodartvvorks@gmail.com).
 * Once the domain is verified, set CONTACT_FROM_EMAIL (in Vercel too), e.g.
 * "Good Artworks <contact@goodart.works>": messages are then sent from that address to
 * contact@goodart.works, which ImprovMX forwards to the inbox. CONTACT_TO_EMAIL overrides it.
 */
const CONTACT_FROM =
  process.env.CONTACT_FROM_EMAIL || "Good Artworks Contact <onboarding@resend.dev>";
const CONTACT_TO =
  process.env.CONTACT_TO_EMAIL ||
  (process.env.CONTACT_FROM_EMAIL ? "contact@goodart.works" : "goodartvvorks@gmail.com");

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await request.json();
    const { nom, galerie, email, projet } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    // Demande de démo depuis le champ e-mail seul : nom, galerie et projet sont optionnels.
    const demoOnly = !nom && !galerie && !projet;
    const esc = (v: unknown) =>
      String(v ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    const { error } = await resend.emails.send({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      replyTo: email,
      subject: demoOnly ? `Demande de démo — ${email}` : `Nouveau message de ${nom} — ${galerie}`,
      html: demoOnly
        ? `<p><strong>Demande de démo</strong> (e-mail seul) : ${esc(email)}</p>
        <p>À recontacter pour proposer un créneau.</p>`
        : `
        <p><strong>Nom :</strong> ${esc(nom)}</p>
        <p><strong>Galerie :</strong> ${esc(galerie)}</p>
        <p><strong>Email :</strong> ${esc(email)}</p>
        <p><strong>Projet :</strong></p>
        <p>${esc(projet).replace(/\n/g, "<br>")}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

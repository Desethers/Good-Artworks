"use client";

import { Button } from "@/components/ui/Button";
import TryWhatsAppButton from "@/components/landing/TryWhatsAppButton";
import { openContact } from "@/components/landing/LandingNav";
import HeroObjects from "@/components/landing/HeroObjects";

export default function LandingHeroFr() {
  return (
    <section className="relative flex flex-col overflow-hidden bg-white px-4 pb-14 pt-32 md:px-6 md:pb-20 md:pt-40">
      <div className="relative mx-auto w-full max-w-7xl">
        <div className="text-center">
          <h1
            className="m-0 mx-auto max-w-7xl text-balance text-[clamp(30px,9vw,44px)] font-medium leading-[1.2] tracking-[-0.04em] font-display md:text-[68px]"
            style={{ color: "#111110" }}
          >
            <span className="hero-reveal hero-d-1 md:block">
              Vendez
              <HeroObjects object="poster" order={1} />
              <br className="md:hidden" /> ce qui ne se vend pas
              <br className="md:hidden" />
            </span>{" "}
            <span className="hero-reveal hero-d-2 md:block">
              {/* Phones: the chair opens the last line, just before "comme". */}
              <span className="md:hidden">
                <HeroObjects object="chair" order={2} spaceBefore={false} />
              </span>{" "}
              comme
              <span className="hidden md:contents">
                <HeroObjects object="chair" order={2} />
              </span>{" "}
              le reste
              <HeroObjects object="dog" order={3} spaceAfter={false} />.
            </span>
          </h1>

          <p className="hero-soft hero-d-3 mx-auto mt-[16px] max-w-4xl text-balance text-[22px] leading-[1.35] tracking-[0em] text-[#6B6A67]">
            Good Artworks connecte votre inventaire à vos conversations : e-mail et WhatsApp.
          </p>

          <div className="hero-soft hero-d-4 mx-auto mt-[18px] flex max-w-[300px] flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center md:mt-[22px]">
            <TryWhatsAppButton
              lang="fr"
              label="Essayer sur WhatsApp"
              className="w-full sm:w-auto"
            />
            <Button
              size="lg"
              variant="inverse"
              onClick={openContact}
              className="w-full border border-[#E8E8E6] sm:w-auto"
            >
              Réserver une démo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

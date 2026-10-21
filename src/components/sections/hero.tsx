"use client";

import dynamic from "next/dynamic";
import { useReducedMotion, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/button";

const VolumetricStudio = dynamic(
  () =>
    import("@/components/ui/volumetric-studio").then(
      (module) => module.VolumetricStudio,
    ),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,var(--color-glow-emerald),transparent_64%)]"
      />
    ),
  },
);

export function Hero() {
  const locale = useLocale();
  const t = useTranslations("hero");
  const shouldReduceMotion = useReducedMotion();
  const revealTransition =
    shouldReduceMotion !== false
      ? { duration: 0 }
      : { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[calc(100svh-var(--navbar-height))] overflow-hidden border-b border-border-hairline bg-carbon-base"
    >
      <VolumetricStudio
        className="z-[-1]"
        reducedMotion={shouldReduceMotion !== false}
      />

      {/* Top padding clears the ceiling track and the three fixtures. */}
      <div className="container-shell relative z-10 grid min-h-[calc(100svh-var(--navbar-height))] w-full content-center pb-3xl pt-[clamp(9rem,26svh,17rem)] sm:pb-4xl lg:pb-5xl">
        <motion.div
          initial={shouldReduceMotion === false ? { opacity: 0, y: 18 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={revealTransition}
          className="mx-auto flex max-w-5xl flex-col items-center text-center"
        >
          {/* Light-to-muted vertical gradient, like the headline catching the
              beams. The bottom padding keeps descenders inside the clip box. */}
          <h1
            id="hero-title"
            className={`max-w-5xl bg-gradient-to-b mt-lg from-text-pure from-35% to-text-muted bg-clip-text pb-[0.12em] text-display-xl-mobile font-semibold ${locale === "ar" ? "!leading-[1.5]" : "!leading-[1]"} tracking-tight text-transparent sm:text-headline-lg lg:text-display-xl ${
              locale === "ar" ? "font-arabic" : "font-display"
            }`}
          >
            {t.rich("title", {
              accent: (chunks) => (
                <span className="text-primary">{chunks}</span>
              ),
            })}
          </h1>

          <p className="mt-lg max-w-2xl text-body-md text-text-muted sm:text-body-lg">
            {t("description")}
          </p>

          <div className="mt-xl flex w-full flex-col items-stretch justify-center gap-sm sm:w-auto sm:flex-row sm:items-center">
            <ButtonLink
              href="/#contact"
              variant="primary"
              className="w-full sm:w-auto"
            >
              <span>{t("primaryCta")}</span>
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 rtl:-scale-x-100"
              />
            </ButtonLink>
            <ButtonLink
              href="/#services"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              <span>{t("secondaryCta")}</span>
            </ButtonLink>
          </div>

          <div
            className={`mt-4xl flex items-center gap-md text-text-dim ${
              locale === "ar"
                ? "font-arabic text-body-sm"
                : "font-mono text-label-mono-sm"
            }`}
          >
            <span className="h-px w-8 bg-outline-variant" aria-hidden="true" />
            <span>{t("caption")}</span>
            <span className="h-px w-8 bg-outline-variant" aria-hidden="true" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import type { PointerEvent } from "react";
import { useRef, useState } from "react";
import {
  ServiceVisual,
  type ServiceVisualLabels,
} from "@/components/sections/services/service-visual";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { services } from "@/content/services";
import { cn } from "@/lib/cn";

type ServiceId = (typeof services)[number]["id"];

const notificationKeys = ["first", "second", "third"] as const;
const ease = [0.16, 1, 0.3, 1] as const;

type ServiceCardProps = Readonly<{
  id: ServiceId;
  gridClass: string;
  title: string;
  description: string;
  labels: ServiceVisualLabels;
  isRtl: boolean;
  reduceMotion: boolean;
}>;

function ServiceCard({
  id,
  gridClass,
  title,
  description,
  labels,
  isRtl,
  reduceMotion,
}: ServiceCardProps) {
  const ref = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState(false);

  // Feeds the spotlight and the rim glow in services-effects.css. Writes CSS
  // variables directly so pointer movement never re-renders the card.
  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    element.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    element.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <motion.article
      ref={ref}
      data-service-card
      variants={{
        hidden: reduceMotion
          ? { opacity: 1 }
          : { opacity: 0, y: 32, scale: 0.97 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: reduceMotion ? { duration: 0 } : { duration: 0.8, ease },
        },
      }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -6,
              transition: { type: "spring", stiffness: 300, damping: 22 },
            }
      }
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onPointerMove={handlePointerMove}
      className={cn(
        "service-card group relative flex min-h-[26rem] flex-col overflow-hidden rounded-[2.4rem] bg-[linear-gradient(145deg,color-mix(in_srgb,var(--color-surface-container)_72%,transparent),color-mix(in_srgb,var(--color-carbon-surface)_92%,transparent))] shadow-xl lg:h-[22.6rem] lg:min-h-0",
        gridClass,
        id === "platforms" && "md:col-span-2",
      )}
    >
      <span className="service-card-dots" aria-hidden="true" />

      <ServiceVisual type={id} labels={labels} hovered={hovered} />

      <div className="relative z-10 mt-auto px-[1.75rem] pb-[1.75rem] text-start">
        <h3
          className={cn(
            "text-[1.375rem] font-medium leading-tight text-text-pure",
            isRtl ? "font-arabic" : "font-display",
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "mt-[0.6rem] text-[1.0625rem] leading-snug text-text-muted",
            id === "platforms" ? "max-w-[17rem]" : "max-w-[16rem]",
            isRtl ? "font-arabic" : "font-body",
          )}
        >
          {description}
        </p>
      </div>
    </motion.article>
  );
}

export function Services() {
  const locale = useLocale();
  const t = useTranslations("services");
  const reduceMotion = Boolean(useReducedMotion());
  const isRtl = locale === "ar";

  const labels: ServiceVisualLabels = {
    tagNew: t("visual.tagNew"),
    tagReviewed: t("visual.tagReviewed"),
    notifications: notificationKeys.map((key) => ({
      title: t(`visual.notifications.${key}.title`),
      time: t(`visual.notifications.${key}.time`),
    })),
    ai: t("visual.ai"),
    design: {
      title: t("visual.design.title"),
      description: t("visual.design.description"),
      note: t("visual.design.note"),
      defaultAction: t("visual.design.defaultAction"),
      boldAction: t("visual.design.boldAction"),
    },
  };

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      dir={isRtl ? "rtl" : "ltr"}
      className="relative max-w-7xl mx-auto isolate scroll-mt-navbar overflow-hidden border-b border-border-hairline py-4xl sm:py-5xl"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_22%,var(--color-glow-emerald),transparent_58%)]" />

      <div className="container-shell">
        {/* Alignment is logical (start), so it flips by itself in Arabic.
            The old `items-end text-end` for "ar" pushed it to the LEFT in RTL. */}
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.65, ease }}
          className="mb-2xl flex flex-col items-start gap-md text-start sm:mb-3xl"
        >
          <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
          <h2
            id="services-title"
            className={cn(
              "max-w-3xl text-headline-lg-mobile font-medium leading-tight text-text-pure sm:text-headline-lg",
              isRtl ? "font-arabic" : "font-display",
            )}
          >
            {t("title")}
          </h2>
          <p
            className={cn(
              "max-w-2xl text-text-muted",
              isRtl
                ? "font-arabic text-body-md"
                : "font-body text-body-md sm:text-body-lg",
            )}
          >
            {t("description")}
          </p>
        </motion.header>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          variants={{
            hidden: {},
            visible: {
              transition: reduceMotion
                ? { staggerChildren: 0 }
                : { staggerChildren: 0.1, delayChildren: 0.08 },
            },
          }}
          className="grid grid-cols-1 gap-md md:grid-cols-2 lg:grid-cols-12 lg:gap-[2.1rem]"
        >
          {services.map(({ id, gridClass }) => (
            <ServiceCard
              key={id}
              id={id}
              gridClass={gridClass}
              title={t(`cards.${id}.title`)}
              description={t(`cards.${id}.description`)}
              labels={labels}
              isRtl={isRtl}
              reduceMotion={reduceMotion}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Link and preview image for each project shown in <ExperienceProjects />.
 * Save as `src/content/experience-projects.ts`.
 *
 * TODO: replace every `href` with the real project URL, and swap the
 * placeholder SVGs in `public/images/experience-projects/` for real
 * screenshots (png / webp / jpg all work: just change the extension below).
 * A 4:3 screenshot, ~1200px wide, taken from the top of the page works best,
 * because the card slowly pans the image from top to bottom on hover.
 */
export const experienceProjects = {
  cardsEcommerce: {
    href: "https://example.com/cards-ecommerce",
    image: "/images/experience-projects/cards-ecommerce.svg",
  },
  trackingCamel: {
    href: "https://example.com/tracking-camel",
    image: "/images/experience-projects/tracking-camel.svg",
  },
  gymTech: {
    href: "https://example.com/gym-tech",
    image: "/images/experience-projects/gym-tech.svg",
  },
  handmade: {
    href: "https://example.com/handmade",
    image: "/images/experience-projects/handmade.svg",
  },
  ananServices: {
    href: "https://example.com/anan-services",
    image: "/images/experience-projects/anan-services.svg",
  },
  bibanTracking: {
    href: "https://example.com/biban-tracking",
    image: "/images/experience-projects/biban-tracking.svg",
  },
  whatsappAiAgent: {
    href: "https://example.com/whatsapp-ai-agent",
    image: "/images/experience-projects/whatsapp-ai-agent.svg",
  },
} as const satisfies Record<string, { href: string; image: string }>;

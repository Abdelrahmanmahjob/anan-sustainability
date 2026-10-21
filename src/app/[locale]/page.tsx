import { Hero } from "@/components/sections/hero/hero";
import { Contact } from "@/components/sections/contact/contact";
import { Features } from "@/components/sections/features/features";
import { HowWeWork } from "@/components/sections/how-we-work/how-we-work";
import { Services } from "@/components/sections/services/services";

export default function HomePage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-dvh bg-transparent">
      <Hero />
      <Services />
      <Features />
      <HowWeWork />
      <Contact />
    </main>
  );
}

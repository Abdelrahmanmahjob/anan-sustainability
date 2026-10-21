import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services/services";

export default function HomePage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-dvh bg-transparent">
      <Hero />
      <Services />
    </main>
  );
}

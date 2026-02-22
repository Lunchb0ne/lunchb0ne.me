import { createFileRoute } from "@tanstack/react-router";
import { Navigation } from "@/components/layout/Navigation";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Section } from "@/components/ui/Section";
import { Spotlight } from "@/components/ui/Spotlight";
import { buildPageMeta } from "@/content/seo";
import { useCursorType } from "@/hooks/useCursor";
import { cn } from "@/utils/cn";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: buildPageMeta(),
  }),
});

function Home() {
  const cursorType = useCursorType();

  return (
    <main
      className={cn(
        "relative min-h-screen w-full bg-surface text-white transition-colors duration-500 selection:bg-cyan-500/30 selection:text-cyan-200",
        cursorType === "hover" && "cursor-none",
      )}
    >
      <Spotlight />
      <Navigation />

      <Hero />

      <Section id="about">
        <About />
      </Section>

      <Section id="experience" maxWidth="4xl" className="border-white/5 border-t">
        <Experience />
      </Section>

      <Section id="projects" className="border-white/5 border-t">
        <Projects />
      </Section>

      <Section id="skills" className="border-white/5 border-t">
        <Skills />
      </Section>

      <Section id="contact" maxWidth="4xl" className="border-white/5 border-t">
        <Contact />
      </Section>
    </main>
  );
}

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
import { useCursor } from "@/hooks/useCursor";
import { cn } from "@/utils/cn";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      {
        title: "Abhishek Aryan | SDE II at AWS",
      },
      {
        name: "description",
        content:
          "Software Development Engineer specialized in building resilient distributed systems and cloud-native infrastructure.",
      },
    ],
  }),
});

function Home() {
  const { cursorType } = useCursor();

  return (
    <main
      className={cn(
        "relative w-full min-h-screen bg-[#050505] text-white transition-colors duration-500 selection:bg-cyan-500/30 selection:text-cyan-200",
        cursorType === "hover" && "cursor-none",
      )}
    >
      <Spotlight />
      <Navigation />

      <Hero />

      <Section id="about">
        <About />
      </Section>

      <Section id="experience" maxWidth="4xl" className="border-t border-white/5">
        <Experience />
      </Section>

      <Section id="projects" className="border-t border-white/5">
        <Projects />
      </Section>

      <Section id="skills" className="border-t border-white/5">
        <Skills />
      </Section>

      <Section id="contact" maxWidth="4xl" className="border-t border-white/5">
        <Contact />
      </Section>
    </main>
  );
}

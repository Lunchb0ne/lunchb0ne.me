import { createFileRoute } from "@tanstack/react-router";
import { Navigation } from "@/components/layout/Navigation";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { OpenSource } from "@/components/sections/OpenSource";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Section } from "@/components/ui/Section";
import { Spotlight } from "@/components/ui/Spotlight";
import { useCursor } from "@/hooks/useCursor";

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
      className={`relative w-full min-h-screen bg-[#050505] text-white overflow-x-hidden transition-colors duration-500 selection:bg-cyan-500/30 selection:text-cyan-200 ${
        cursorType === "hover" ? "cursor-none" : ""
      }`}
    >
      <Spotlight />
      <Navigation />

      <Hero />

      <Section id="about">
        <About />
      </Section>

      <Section id="experience">
        <Experience />
      </Section>

      <Section id="projects">
        <Projects />
      </Section>

      <Section id="skills">
        <Skills />
      </Section>

      <Section id="opensource">
        <OpenSource />
      </Section>

      <Section id="contact">
        <Contact />
      </Section>
    </main>
  );
}

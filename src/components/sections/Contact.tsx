import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";
import Github from "lucide-react/dist/esm/icons/github";
import Linkedin from "lucide-react/dist/esm/icons/linkedin";
import Mail from "lucide-react/dist/esm/icons/mail";
import Twitter from "lucide-react/dist/esm/icons/twitter";
import { MorphingWord } from "@/components/visuals/MorphingWord";
import { CONTACT_CONTENT } from "@/content";
import { cn } from "@/utils/cn";

const SOCIAL_ICONS = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
} as const;

export const Contact = () => (
  <div className="relative z-10 text-center">
    <h2 className="mb-6 font-bold text-4xl text-white tracking-tight md:text-5xl">
      Ready to build the <MorphingWord className="text-cyan-400" />?
    </h2>
    <p className="mx-auto mb-12 max-w-2xl text-lg text-white/50 leading-relaxed">{CONTACT_CONTENT.intro}</p>

    <div className="mb-20 flex flex-col items-center justify-center gap-6 sm:flex-row">
      <a
        href={`mailto:${CONTACT_CONTENT.email}`}
        className="group flex items-center gap-3 rounded-full bg-white px-8 py-4 font-bold text-black transition-colors duration-300 hover:bg-cyan-400"
      >
        <Mail className="h-5 w-5" />
        <span>{CONTACT_CONTENT.ctaLabel}</span>
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </a>
    </div>

    <div className="flex justify-center gap-8">
      {CONTACT_CONTENT.socials.map((social) => {
        const Icon = SOCIAL_ICONS[social.icon];
        return (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn("text-white/40 transition-all duration-300 hover:scale-110", social.hoverClassName)}
          >
            <Icon className="h-6 w-6" />
            <span className="sr-only">{social.label}</span>
          </a>
        );
      })}
    </div>

    <div className="mt-20 text-center font-mono text-sm text-white/20">
      &copy; 2026 Abhishek Aryan. All rights reserved.
    </div>
  </div>
);

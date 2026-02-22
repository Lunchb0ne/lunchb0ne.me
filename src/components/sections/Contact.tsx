import { ArrowRightIcon, EnvelopeIcon, GithubLogoIcon, LinkedinLogoIcon, XLogoIcon } from "@phosphor-icons/react";
import { MorphingWord } from "@/components/visuals/MorphingWord";
import { CONTACT_CONTENT } from "@/content";
import { cn } from "@/utils/cn";

const SOCIAL_ICONS = {
  github: GithubLogoIcon,
  linkedin: LinkedinLogoIcon,
  twitter: XLogoIcon,
} as const;

export const Contact = () => (
  <div className="relative z-10">
    <div className="grid grid-cols-1 items-start gap-16 md:grid-cols-[1fr_auto]">
      {/* Left column */}
      <div>
        <h2 className="mb-6 font-bold text-4xl text-white tracking-tight md:text-5xl">
          Ready to build the <MorphingWord className="text-cyan-400" />?
        </h2>
        <p className="mb-12 max-w-xl text-lg text-white/50 leading-relaxed">{CONTACT_CONTENT.intro}</p>

        <a
          href={`mailto:${CONTACT_CONTENT.email}`}
          className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-bold text-black transition-colors duration-300 hover:bg-cyan-400 active:scale-[0.98]"
        >
          <EnvelopeIcon className="h-5 w-5" />
          <span>{CONTACT_CONTENT.ctaLabel}</span>
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>

      {/* Right column — social links */}
      <div className="flex flex-row gap-6 md:flex-col md:gap-4 md:pt-2">
        {CONTACT_CONTENT.socials.map((social) => {
          const Icon = SOCIAL_ICONS[social.icon];
          return (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex items-center gap-3 text-white/40 transition-all duration-300 hover:scale-105",
                social.hoverClassName,
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="hidden font-mono text-xs md:inline">{social.label}</span>
            </a>
          );
        })}
      </div>
    </div>

    <div className="mt-20 font-mono text-sm text-white/20">&copy; 2026 Abhishek Aryan. All rights reserved.</div>
  </div>
);

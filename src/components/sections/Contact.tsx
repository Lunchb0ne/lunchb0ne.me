import { ArrowRightIcon, EnvelopeIcon, GithubLogoIcon, LinkedinLogoIcon, XLogoIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { TextMorph } from "torph/react";
import { MorphingWord } from "@/components/visuals/MorphingWord";
import { CONTACT_CONTENT } from "@/content";
import { cn } from "@/utils/cn";

const SOCIAL_ICONS = {
  github: GithubLogoIcon,
  linkedin: LinkedinLogoIcon,
  twitter: XLogoIcon,
} as const;

const CopyEmail = () => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(id);
  }, [copied]);

  return (
    <button
      type="button"
      onClick={() => navigator.clipboard?.writeText(CONTACT_CONTENT.email).then(() => setCopied(true))}
      className="text-white/60 transition-colors hover:text-cyan-400"
    >
      <TextMorph duration={300}>{copied ? "copied" : CONTACT_CONTENT.email}</TextMorph>
      <span className="sr-only" aria-live="polite">
        {copied ? "Email address copied" : ""}
      </span>
    </button>
  );
};

export const Contact = () => (
  <div className="relative z-10">
    <div className="grid grid-cols-1 items-start gap-16 md:grid-cols-[1fr_auto]">
      {/* Left column */}
      <div>
        <h2
          aria-label="Ready to build something?"
          className="mb-6 font-bold text-4xl text-white tracking-tight md:text-5xl"
        >
          Ready to build something
          {/* Own line, so the rotating word never reflows the heading */}
          <span className="block whitespace-nowrap">
            <MorphingWord className="text-cyan-400" />?
          </span>
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
        <p className="mt-4 font-mono text-sm text-white/40">
          or copy <CopyEmail />
        </p>
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
              aria-label={social.label}
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

    <div className="mt-20 font-mono text-sm text-white/20">
      &copy; {new Date().getFullYear()} Abhishek Aryan · Built with TanStack Start on Cloudflare
    </div>
  </div>
);

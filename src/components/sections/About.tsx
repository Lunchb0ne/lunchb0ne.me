import { Section } from "@/components/ui/Section";
import { ABOUT_CONTENT, SECTION_TITLES } from "@/content";
import { cn } from "@/utils/cn";

export const About = () => (
  <>
    <Section.Header>{SECTION_TITLES.about}</Section.Header>

    <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:items-stretch">
      <div className="space-y-6 text-lg text-white/70 leading-relaxed">
        {ABOUT_CONTENT.paragraphs.map((paragraph) => (
          <p key={paragraph.id}>{paragraph.content}</p>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:h-full md:grid-rows-2 md:items-stretch">
        {ABOUT_CONTENT.cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className={cn(
                "group flex h-full flex-col justify-center rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors",
                card.hoverBorderClassName,
                card.className,
              )}
            >
              <Icon className={cn("mb-4 h-8 w-8 transition-transform group-hover:scale-110", card.iconClassName)} />
              <h3 className="mb-2 font-bold text-white text-xl">{card.title}</h3>
              <p className="text-sm text-white/50">{card.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  </>
);

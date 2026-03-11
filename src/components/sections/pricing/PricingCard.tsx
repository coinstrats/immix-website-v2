import type { ElementType } from 'react';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { tierColors } from './pricingData';
import type { TierColor } from './pricingData';

interface PricingCardProps {
  variant: 'primary' | 'workload';
  icon?: ElementType;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  pricingLabel?: string;
  pricingNote?: string;
  description: string;
  bullets: string[];
  tags?: { icon: ElementType; label: string }[];
  badge?: string;
  cta?: string;
  ctaHref?: string;
  tierColor: TierColor;
  highlighted?: boolean;
}

export function PricingCard({
  variant,
  icon: Icon,
  eyebrow,
  title,
  subtitle,
  pricingLabel,
  pricingNote,
  description,
  bullets,
  tags,
  badge,
  cta,
  ctaHref,
  tierColor,
  highlighted = false,
}: PricingCardProps) {
  const colors = tierColors[tierColor];
  const isPrimary = variant === 'primary';

  return (
    <div
      className={`relative flex flex-col h-full group transition-all duration-300 hover:-translate-y-1 ${colors.hoverShadow} ${
        isPrimary
          ? highlighted
            ? 'p-6 bg-immix-blue/[0.08] border-2 border-immix-blue/60 shadow-[0_0_40px_rgba(0,115,255,0.15)]'
            : 'p-6 bg-immix-dark/60 border border-white/10 hover:border-white/20'
          : 'p-5 bg-white/[0.02] border border-white/[0.07] hover:border-white/15'
      }`}
    >
      <div
        className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${colors.accent}`}
      />

      {isPrimary && (
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] ${colors.glow} pointer-events-none`}
        />
      )}

      {highlighted && isPrimary && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
          <span className="relative inline-flex items-center gap-1.5 px-4 py-1.5 bg-immix-blue text-white text-xs font-bold overflow-hidden">
            <span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer"
              style={{ backgroundSize: '200% 100%' }}
            />
            <Sparkles size={12} className="relative z-10" />
            <span className="relative z-10">RECOMMENDED</span>
          </span>
        </div>
      )}

      <div className="relative space-y-4 flex-grow flex flex-col">
        {eyebrow && (
          <p className="text-[10px] font-mono text-white/35 tracking-[0.15em] uppercase">
            {eyebrow}
          </p>
        )}

        <div className="flex items-center gap-3">
          {Icon && (
            <div className={`p-2.5 ${colors.icon}`}>
              <Icon size={isPrimary ? 22 : 18} />
            </div>
          )}
          <div>
            <div className="flex items-center gap-2.5">
              <h3 className={`font-bold ${isPrimary ? 'text-xl' : 'text-lg'}`}>
                {title}
              </h3>
              {badge && (
                <span
                  className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium border ${colors.badge}`}
                >
                  {badge}
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-sm text-white/50 mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>

        <div
          className={`border-b border-white/[0.07] ${isPrimary ? 'py-3' : 'py-2'}`}
        >
          {pricingLabel && (
            <span
              className={`font-bold ${isPrimary ? 'text-2xl' : 'text-base text-white/70'}`}
            >
              {pricingLabel}
            </span>
          )}
          {pricingNote && (
            <p
              className={`mt-1 ${isPrimary ? 'text-xs text-white/45' : 'text-[11px] text-white/40'}`}
            >
              {pricingNote}
            </p>
          )}
          <p
            className={`mt-2 text-white/60 leading-relaxed ${isPrimary ? 'text-sm' : 'text-[13px]'}`}
          >
            {description}
          </p>
        </div>

        <ul className={`flex-grow ${isPrimary ? 'space-y-2.5' : 'space-y-2'}`}>
          {bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2.5">
              <Check
                className={`flex-shrink-0 mt-0.5 ${colors.check}`}
                size={isPrimary ? 14 : 12}
              />
              <span
                className={`text-white/70 ${isPrimary ? 'text-[13px]' : 'text-xs'}`}
              >
                {bullet}
              </span>
            </li>
          ))}
        </ul>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {tags.map((tag) => (
              <div
                key={tag.label}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 border text-xs text-white/60 ${colors.tag}`}
              >
                <tag.icon size={11} className={colors.tagIcon} />
                <span>{tag.label}</span>
              </div>
            ))}
          </div>
        )}

        {cta && ctaHref && isPrimary && (
          <div className="mt-auto pt-5">
            <a
              href={ctaHref}
              target={ctaHref.startsWith('mailto:') ? undefined : '_blank'}
              rel={
                ctaHref.startsWith('mailto:')
                  ? undefined
                  : 'noopener noreferrer'
              }
              className={`w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium transition-all duration-200 group/btn ${
                highlighted ? colors.ctaHighlighted : colors.ctaDefault
              }`}
            >
              <span>{cta}</span>
              <ArrowRight
                size={14}
                className="transition-transform group-hover/btn:translate-x-0.5"
              />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

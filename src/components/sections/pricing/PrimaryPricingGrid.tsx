import { Tag } from 'lucide-react';
import { AnimatedElement } from '../../ui';
import { PricingCard } from './PricingCard';
import { pricingHero, foundingBanner, primaryCards } from './pricingData';

export function PrimaryPricingGrid() {
  return (
    <div className="space-y-10">
      <div className="text-center space-y-4">
        <AnimatedElement type="fadeInUp">
          <p className="text-xs font-mono text-[#0073FF]/50 tracking-[0.2em] uppercase mb-4">
            {pricingHero.eyebrow}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold">
            {pricingHero.headline}
          </h2>
          <div className="mt-4 mx-auto w-16 h-[2px] bg-gradient-to-r from-transparent via-immix-blue to-transparent" />
        </AnimatedElement>

        <AnimatedElement type="fadeInUp" delay={0.1}>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            {pricingHero.subhead}
          </p>
        </AnimatedElement>

        <AnimatedElement type="fadeInUp" delay={0.15}>
          <div className="flex justify-center mt-2">
            <div className="inline-flex items-center gap-2.5 px-5 py-2 bg-amber-500/[0.06] border border-amber-500/20 rounded-full">
              <Tag size={14} className="text-amber-400 flex-shrink-0" />
              <span className="text-sm text-amber-200/90">
                {foundingBanner.prefix}{' '}
                <span className="font-semibold text-amber-300">
                  {foundingBanner.highlightDate}
                </span>{' '}
                {foundingBanner.suffix}
              </span>
            </div>
          </div>
        </AnimatedElement>
      </div>

      <AnimatedElement type="fadeInUp" delay={0.2}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {primaryCards.map((card) => (
            <div
              key={card.title}
              className={card.highlighted ? 'pt-4' : 'pt-4'}
            >
              <PricingCard
                variant="primary"
                icon={card.icon}
                title={card.title}
                subtitle={card.subtitle}
                pricingLabel={card.pricingLabel}
                pricingNote={card.pricingNote}
                description={card.description}
                bullets={card.bullets}
                tags={card.tags}
                cta={card.cta}
                ctaHref={card.ctaHref}
                tierColor={card.tierColor}
                highlighted={card.highlighted}
              />
            </div>
          ))}
        </div>
      </AnimatedElement>
    </div>
  );
}

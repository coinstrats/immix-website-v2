import { ArrowRight } from 'lucide-react';
import { AnimatedElement, Button } from '../../ui';
import { useCasesHero } from './useCasesData';

export const UseCasesHero = () => {
  const handleChipClick = (anchor: string) => {
    const el = document.querySelector(anchor);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-32 pb-16 lg:pb-20 px-5 md:px-12">
      <div className="max-w-5xl mx-auto relative z-10">
        <AnimatedElement type="fadeInUp" delay={0.1}>
          <p className="text-immix-blue font-mono text-sm uppercase tracking-widest mb-6">
            {useCasesHero.eyebrow}
          </p>
        </AnimatedElement>

        <AnimatedElement type="fadeInUp" delay={0.2}>
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
            {useCasesHero.headline}
          </h1>
        </AnimatedElement>

        <AnimatedElement type="fadeInUp" delay={0.3}>
          <p className="text-lg lg:text-xl text-white/60 leading-relaxed max-w-3xl mb-4">
            {useCasesHero.subheadline}
          </p>
        </AnimatedElement>

        <AnimatedElement type="fadeInUp" delay={0.4}>
          <p className="text-base text-white/40 leading-relaxed max-w-2xl mb-10">
            {useCasesHero.supportLine}
          </p>
        </AnimatedElement>

        <AnimatedElement type="fadeInUp" delay={0.5}>
          <div className="flex flex-col sm:flex-row items-start gap-4 mb-10">
            <Button
              variant="primary"
              href={useCasesHero.primaryCta.href}
              icon={<ArrowRight size={18} />}
            >
              {useCasesHero.primaryCta.label}
            </Button>
            <a
              href={useCasesHero.secondaryCta.href}
              className="button-secondary px-6 py-3 inline-flex items-center gap-2 font-semibold whitespace-nowrap text-sm"
            >
              {useCasesHero.secondaryCta.label}
            </a>
          </div>
        </AnimatedElement>

        <AnimatedElement type="fadeInUp" delay={0.6}>
          <div className="flex flex-wrap gap-2">
            {useCasesHero.anchorChips.map((chip) => (
              <button
                key={chip.label}
                onClick={() => handleChipClick(chip.anchor)}
                className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-mono border border-white/15 bg-white/5 text-white/60 hover:text-immix-blue hover:border-immix-blue/30 hover:bg-immix-blue/5 transition-all duration-300 cursor-pointer"
              >
                {chip.label}
              </button>
            ))}
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
};

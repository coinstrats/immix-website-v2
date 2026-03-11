import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatedElement, Card } from '../ui';
import {
  homepagePreviewHeader,
  homepagePreviewCards,
  audienceChips,
} from './useCases/useCasesData';

export const UseCasesPreview = () => {
  return (
    <section className="section-wrapper">
      <div className="container-max">
        <div className="text-center space-y-4 mb-16 lg:mb-20">
          <AnimatedElement type="fadeInUp">
            <p className="text-xs font-mono text-[#0073FF]/50 tracking-[0.2em] uppercase mb-4">
              {homepagePreviewHeader.eyebrow}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold">
              {homepagePreviewHeader.headline}
            </h2>
            <div className="mt-4 mx-auto w-16 h-[2px] bg-gradient-to-r from-transparent via-immix-blue to-transparent" />
          </AnimatedElement>

          <AnimatedElement type="fadeInUp" delay={0.1}>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              {homepagePreviewHeader.subcopy}
            </p>
          </AnimatedElement>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {homepagePreviewCards.map((card, idx) => (
            <AnimatedElement
              key={card.title}
              type="fadeInUp"
              delay={0.1 + idx * 0.1}
            >
              <Card className="h-full flex flex-col">
                <h3 className="text-lg font-bold mb-2">{card.title}</h3>
                <p className="text-xs font-mono text-white/40 uppercase tracking-wider mb-4">
                  {card.audienceLine}
                </p>
                <p className="text-sm text-white/55 leading-relaxed mb-6 flex-1">
                  {card.shortCopy}
                </p>
                <Link
                  to={card.cta.href}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-immix-blue hover:text-immix-blue-light transition-colors"
                >
                  {card.cta.label}
                  <ArrowRight size={14} />
                </Link>
              </Card>
            </AnimatedElement>
          ))}
        </div>

        <AnimatedElement type="fadeInUp" delay={0.4}>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {audienceChips.map((chip) => (
              <span
                key={chip}
                className="text-xs font-mono text-white/30 tracking-wide"
              >
                {chip}
                {chip !== audienceChips[audienceChips.length - 1] && (
                  <span className="ml-2 text-white/15">|</span>
                )}
              </span>
            ))}
          </div>
        </AnimatedElement>

        <AnimatedElement type="fadeInUp" delay={0.5}>
          <div className="text-center">
            <Link
              to={homepagePreviewHeader.bottomCta.href}
              className="inline-flex items-center gap-2 text-sm font-semibold text-immix-blue hover:text-immix-blue-light transition-colors"
            >
              {homepagePreviewHeader.bottomCta.label}
              <ArrowRight size={16} />
            </Link>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
};

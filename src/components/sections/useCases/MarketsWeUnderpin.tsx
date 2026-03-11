import { AnimatedElement } from '../../ui';
import {
  marketOpportunityHeader,
  marketOpportunityStats,
  secondaryMarketStats,
} from './useCasesData';

export const MarketsWeUnderpin = () => {
  return (
    <section className="section-wrapper">
      <div className="container-max">
        <AnimatedElement type="fadeInUp">
          <p className="text-immix-blue font-mono text-sm uppercase tracking-widest mb-4">
            {marketOpportunityHeader.eyebrow}
          </p>
        </AnimatedElement>

        <AnimatedElement type="fadeInUp" delay={0.1}>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 max-w-3xl">
            {marketOpportunityHeader.headline}
          </h2>
        </AnimatedElement>

        <AnimatedElement type="fadeInUp" delay={0.15}>
          <p className="text-base text-white/50 max-w-2xl mb-14">
            {marketOpportunityHeader.subcopy}
          </p>
        </AnimatedElement>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {marketOpportunityStats.map((stat, idx) => (
            <AnimatedElement
              key={stat.title}
              type="fadeInUp"
              delay={0.1 + idx * 0.1}
            >
              <div className="rounded-lg border border-white/10 bg-immix-dark/40 p-8 text-center h-full">
                <p className="text-4xl lg:text-5xl font-bold font-mono text-immix-blue mb-2 drop-shadow-lg">
                  {stat.statValue}
                </p>
                <p className="text-xs font-mono text-white/40 uppercase tracking-wider mb-5">
                  {stat.statLabel}
                </p>
                <h3 className="text-base font-semibold mb-2">{stat.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </AnimatedElement>
          ))}
        </div>

        <AnimatedElement type="fadeInUp" delay={0.4}>
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10 py-4 border-t border-white/5">
            {secondaryMarketStats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-lg font-mono font-bold text-white/70">
                  {s.value}
                </p>
                <p className="text-[11px] font-mono text-white/30 uppercase tracking-wider">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
};

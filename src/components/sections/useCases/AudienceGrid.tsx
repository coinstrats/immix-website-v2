import { AnimatedElement } from '../../ui';
import { audienceHeader, audienceUseCases } from './useCasesData';

export const AudienceGrid = () => {
  return (
    <section id="who-builds" className="section-wrapper scroll-mt-28">
      <div className="container-max">
        <AnimatedElement type="fadeInUp">
          <p className="text-xs font-mono text-[#0073FF]/50 tracking-[0.2em] uppercase mb-4">
            {audienceHeader.eyebrow}
          </p>
        </AnimatedElement>

        <AnimatedElement type="fadeInUp" delay={0.1}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {audienceHeader.headline}
          </h2>
        </AnimatedElement>

        <AnimatedElement type="fadeInUp" delay={0.15}>
          <p className="text-lg text-white/60 max-w-2xl mb-14">
            {audienceHeader.subcopy}
          </p>
        </AnimatedElement>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {audienceUseCases.map((card, idx) => {
            const Icon = card.icon;
            return (
              <AnimatedElement
                key={card.title}
                type="fadeInUp"
                delay={0.05 + idx * 0.05}
              >
                <div className="rounded-lg border border-white/8 bg-immix-dark/30 p-5 h-full hover:border-white/15 hover:bg-immix-dark/50 transition-all duration-300 flex flex-col">
                  <div className="flex items-center gap-2.5 mb-3">
                    <Icon size={16} className="text-immix-blue shrink-0" />
                    <h3 className="text-sm font-bold">{card.title}</h3>
                  </div>

                  <p className="text-[11px] font-mono text-white/35 uppercase tracking-wider mb-4">
                    {card.bestFor}
                  </p>

                  <div className="mb-3">
                    <p className="text-[11px] font-mono text-white/25 uppercase tracking-wider mb-1">
                      Broken today
                    </p>
                    <p className="text-xs text-white/45 leading-relaxed">
                      {card.brokenToday}
                    </p>
                  </div>

                  <div className="mb-3">
                    <p className="text-[11px] font-mono text-white/25 uppercase tracking-wider mb-1">
                      With IMMIX
                    </p>
                    <p className="text-xs text-white/55 leading-relaxed">
                      {card.withImmix}
                    </p>
                  </div>

                  <div className="mt-auto pt-3 border-t border-white/5">
                    <p className="text-xs text-immix-blue/70">
                      {card.value}
                    </p>
                  </div>
                </div>
              </AnimatedElement>
            );
          })}
        </div>
      </div>
    </section>
  );
};

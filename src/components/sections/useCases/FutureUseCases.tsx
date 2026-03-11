import { AnimatedElement, Card } from '../../ui';
import { futureHeader, futureUseCases } from './useCasesData';

export const FutureUseCases = () => {
  return (
    <section id="ai-era" className="section-wrapper scroll-mt-28">
      <div className="container-max">
        <AnimatedElement type="fadeInUp">
          <p className="text-immix-blue font-mono text-sm uppercase tracking-widest mb-4">
            {futureHeader.eyebrow}
          </p>
        </AnimatedElement>

        <AnimatedElement type="fadeInUp" delay={0.1}>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            {futureHeader.headline}
          </h2>
        </AnimatedElement>

        <AnimatedElement type="fadeInUp" delay={0.15}>
          <p className="text-base text-white/50 max-w-2xl mb-14">
            {futureHeader.subcopy}
          </p>
        </AnimatedElement>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {futureUseCases.map((tile, idx) => {
            const Icon = tile.icon;
            return (
              <AnimatedElement
                key={tile.title}
                type="fadeInUp"
                delay={0.1 + idx * 0.1}
              >
                <Card glowing={false} className="h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-lg bg-immix-blue/8 border border-immix-blue/15 flex items-center justify-center">
                      <Icon size={18} className="text-immix-blue/70" />
                    </div>
                    <h3 className="text-base font-bold">{tile.title}</h3>
                  </div>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {tile.description}
                  </p>
                </Card>
              </AnimatedElement>
            );
          })}
        </div>
      </div>
    </section>
  );
};

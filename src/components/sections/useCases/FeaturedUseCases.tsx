import { AnimatedElement, Badge, Card } from '../../ui';
import { featuredUseCases } from './useCasesData';

export const FeaturedUseCases = () => {
  return (
    <section className="section-wrapper">
      <div className="container-max">
        <AnimatedElement type="fadeInUp">
          <p className="text-immix-blue font-mono text-sm uppercase tracking-widest mb-4">
            START HERE
          </p>
        </AnimatedElement>

        <AnimatedElement type="fadeInUp" delay={0.1}>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Three ways teams build on IMMIX.
          </h2>
        </AnimatedElement>

        <AnimatedElement type="fadeInUp" delay={0.15}>
          <p className="text-base text-white/50 max-w-2xl mb-14">
            One infrastructure layer for market intelligence, execution, and
            programmable capital operations.
          </p>
        </AnimatedElement>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {featuredUseCases.map((uc, idx) => {
            const Icon = uc.icon;
            return (
              <AnimatedElement
                key={uc.anchorId}
                type="fadeInUp"
                delay={0.1 + idx * 0.1}
              >
                <div id={uc.anchorId} className="scroll-mt-28">
                  <Card className="h-full flex flex-col p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-immix-blue/10 border border-immix-blue/20 flex items-center justify-center">
                        <Icon size={20} className="text-immix-blue" />
                      </div>
                      <h3 className="text-xl font-bold">{uc.title}</h3>
                    </div>

                    <p className="text-xs font-mono text-white/40 uppercase tracking-wider mb-5">
                      {uc.audience}
                    </p>

                    <div className="mb-5">
                      <p className="text-xs font-mono text-white/30 uppercase tracking-wider mb-2">
                        The problem
                      </p>
                      <p className="text-sm text-white/60 leading-relaxed">
                        {uc.problem}
                      </p>
                    </div>

                    <div className="mb-5">
                      <p className="text-xs font-mono text-white/30 uppercase tracking-wider mb-2">
                        How IMMIX helps
                      </p>
                      <p className="text-sm text-white/60 leading-relaxed">
                        {uc.solution}
                      </p>
                    </div>

                    <div className="mb-6">
                      <p className="text-xs font-mono text-white/30 uppercase tracking-wider mb-2">
                        Value unlocked
                      </p>
                      <ul className="space-y-1.5">
                        {uc.value.map((v) => (
                          <li
                            key={v}
                            className="text-sm text-white/50 flex items-start gap-2"
                          >
                            <span className="text-immix-blue mt-1 text-xs">
                              +
                            </span>
                            {v}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {uc.tags.map((tag) => (
                          <Badge key={tag} variant="neutral" className="text-[10px]">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>
              </AnimatedElement>
            );
          })}
        </div>
      </div>
    </section>
  );
};

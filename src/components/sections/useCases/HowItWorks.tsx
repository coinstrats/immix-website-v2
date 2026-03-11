import { AnimatedElement, Badge } from '../../ui';
import { buildBlocksHeader, buildBlocks, interfaceModes } from './useCasesData';

export const HowItWorks = () => {
  return (
    <section className="section-wrapper">
      <div className="container-max">
        <AnimatedElement type="fadeInUp">
          <p className="text-immix-blue font-mono text-sm uppercase tracking-widest mb-4">
            {buildBlocksHeader.eyebrow}
          </p>
        </AnimatedElement>

        <AnimatedElement type="fadeInUp" delay={0.1}>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            {buildBlocksHeader.headline}
          </h2>
        </AnimatedElement>

        <AnimatedElement type="fadeInUp" delay={0.15}>
          <p className="text-base text-white/50 max-w-2xl mb-14">
            {buildBlocksHeader.subcopy}
          </p>
        </AnimatedElement>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {buildBlocks.map((block, idx) => (
            <AnimatedElement
              key={block.title}
              type="fadeInUp"
              delay={0.1 + idx * 0.1}
            >
              <div className="rounded-lg border border-white/10 bg-immix-dark/40 p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-immix-blue font-mono text-sm font-semibold">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-lg font-bold">{block.title}</h3>
                </div>
                <p className="text-sm text-white/50 leading-relaxed">
                  {block.description}
                </p>
              </div>
            </AnimatedElement>
          ))}
        </div>

        <AnimatedElement type="fadeInUp" delay={0.4}>
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-3 mb-4">
              {interfaceModes.map((mode) => (
                <Badge key={mode} variant="blue">
                  {mode}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-white/40 max-w-lg">
              {buildBlocksHeader.supportLine}
            </p>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
};

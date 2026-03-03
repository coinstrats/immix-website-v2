import { AnimatedElement } from '../../ui';
import type { JourneyStage, IntegrationLevel } from './productData';
import { ProductRow } from './ProductRow';

interface JourneyStageSectionProps {
  stage: JourneyStage;
  stageIndex: number;
  activeFilter: IntegrationLevel | null;
}

export function JourneyStageSection({ stage, stageIndex, activeFilter }: JourneyStageSectionProps) {
  return (
    <div className="relative">
      {stageIndex > 0 && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent via-white/[0.06] to-transparent -mt-8 hidden lg:block" />
      )}

      <AnimatedElement type="fadeInUp" delay={0}>
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs font-mono text-white/20 tracking-widest uppercase">
            {stage.number}
          </span>
          <span className="text-xs font-semibold text-[#0073FF]/60 tracking-wider uppercase">
            {stage.label}
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-white/[0.06] to-transparent" />
        </div>

        <div className="mb-10 lg:mb-14">
          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
            {stage.headline}
          </h3>
          <p className="text-sm text-white/40 max-w-xl">
            {stage.description}
          </p>
        </div>
      </AnimatedElement>

      <div className="space-y-16 lg:space-y-20">
        {stage.products.map((product, productIndex) => {
          const globalProductIndex = stageIndex * 2 + productIndex;
          const reversed = globalProductIndex % 2 === 1;
          const dimmed = activeFilter !== null && !product.integrations.includes(activeFilter);

          return (
            <AnimatedElement
              key={product.id}
              type="fadeInUp"
              delay={0.1 + productIndex * 0.1}
            >
              <ProductRow
                product={product}
                reversed={reversed}
                dimmed={dimmed}
              />
            </AnimatedElement>
          );
        })}
      </div>
    </div>
  );
}

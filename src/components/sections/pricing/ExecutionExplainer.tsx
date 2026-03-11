import { Workflow, Network } from 'lucide-react';
import { AnimatedElement } from '../../ui';
import { executionPricing, connectivityPricing } from './pricingData';
import type { ExplainerItem } from './pricingData';

function ExplainerColumn({
  icon: Icon,
  title,
  items,
}: {
  icon: typeof Workflow;
  title: string;
  items: ExplainerItem[];
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2.5">
        <div className="p-2 bg-immix-blue/10 text-immix-blue/70">
          <Icon size={16} />
        </div>
        <h4 className="text-base font-semibold text-white/90">{title}</h4>
      </div>
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div
            key={item.title}
            className="relative pl-4 py-3 border-l border-white/[0.07]"
          >
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[2.5px] w-[5px] h-[5px] rounded-full bg-white/20" />
            <p className="text-sm font-medium text-white/80 mb-1">
              <span className="text-white/30 font-mono text-xs mr-2">
                {String(idx + 1).padStart(2, '0')}
              </span>
              {item.title}
            </p>
            <p className="text-xs text-white/45 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ExecutionExplainer() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <AnimatedElement type="fadeInUp">
          <p className="text-xs font-mono text-white/30 tracking-[0.15em] uppercase">
            Execution and performance
          </p>
          <h3 className="text-2xl md:text-3xl font-bold mt-2">
            Charge for platform work, not customer alpha.
          </h3>
        </AnimatedElement>
      </div>

      <AnimatedElement type="fadeInUp" delay={0.1}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <ExplainerColumn
            icon={Workflow}
            title="How execution pricing works"
            items={executionPricing}
          />
          <ExplainerColumn
            icon={Network}
            title="How low-latency connectivity works"
            items={connectivityPricing}
          />
        </div>
      </AnimatedElement>

      <AnimatedElement type="fadeInUp" delay={0.15}>
        <div className="flex items-center gap-4 pt-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/[0.06]" />
          <p className="text-sm text-white/40 text-center px-4 max-w-lg">
            <span className="text-immix-blue/70 font-medium">
              No basis point tax on flow.
            </span>{' '}
            Pricing is tied to runtime, operations, throughput, and compute.
          </p>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/[0.06]" />
        </div>
      </AnimatedElement>
    </div>
  );
}

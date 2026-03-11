import { AnimatedElement } from '../../ui';
import { billingMeters } from './pricingData';

export function BillingMeters() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <AnimatedElement type="fadeInUp">
          <p className="text-xs font-mono text-white/30 tracking-[0.15em] uppercase">
            How billing works
          </p>
          <h3 className="text-2xl md:text-3xl font-bold mt-2">
            Four meters. One platform.
          </h3>
        </AnimatedElement>
        <AnimatedElement type="fadeInUp" delay={0.05}>
          <p className="text-base text-white/50 max-w-2xl mx-auto">
            IMMIX pricing scales with the infrastructure you run, not the
            notional you trade.
          </p>
        </AnimatedElement>
      </div>

      <AnimatedElement type="fadeInUp" delay={0.1}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {billingMeters.map((meter) => {
            const Icon = meter.icon;
            return (
              <div
                key={meter.title}
                className="relative p-5 bg-white/[0.02] border border-white/[0.07] hover:border-white/15 transition-all duration-300 group"
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-immix-blue/30 to-transparent" />
                <div className="space-y-3">
                  <div className="p-2 bg-immix-blue/10 text-immix-blue/80 w-fit">
                    <Icon size={18} />
                  </div>
                  <h4 className="text-sm font-semibold text-white/90">
                    {meter.title}
                  </h4>
                  <p className="text-xs text-white/50 leading-relaxed">
                    {meter.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </AnimatedElement>
    </div>
  );
}

import { PrimaryPricingGrid } from './pricing/PrimaryPricingGrid';
import { BillingMeters } from './pricing/BillingMeters';
import { TypicalWorkloads } from './pricing/TypicalWorkloads';
import { ExecutionExplainer } from './pricing/ExecutionExplainer';
import { PricingFAQ } from './pricing/PricingFAQ';

export const Pricing = () => {
  return (
    <section id="pricing" className="section-wrapper">
      <div className="container-max space-y-20 lg:space-y-28">
        <PrimaryPricingGrid />
        <BillingMeters />
        <TypicalWorkloads />
        <ExecutionExplainer />
        <PricingFAQ />

        <div className="text-center space-y-3">
          <p className="text-white/35 text-sm">
            All deployments include 24/7 infrastructure monitoring, automatic
            failover, and regular security audits.
          </p>
          <p className="text-white/35 text-sm">
            Founding terms available through June 30, 2026. Startup Program
            sponsored usage subject to approval and valid for 6 months from
            activation.
          </p>
          <p className="text-white/35 text-sm">
            Committed-spend discounts available for high-throughput
            institutions.{' '}
            <a
              href="mailto:sales@immix.xyz"
              className="text-immix-blue/70 font-medium hover:underline"
            >
              Contact us
            </a>{' '}
            for custom requirements.
          </p>
        </div>
      </div>
    </section>
  );
};

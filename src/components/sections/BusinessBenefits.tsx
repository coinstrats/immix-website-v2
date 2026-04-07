import { Clock, Shield, Network, Sliders } from 'lucide-react';
import { AnimatedElement } from '../ui';

const benefits = [
  {
    icon: Clock,
    headline: 'Never miss a market opportunity',
    description:
      'Sub-millisecond pricing updates and smart order routing ensure you capture every basis point, across every venue, around the clock.',
    stat: '5µs',
    statLabel: 'round-trip latency',
  },
  {
    icon: Shield,
    headline: 'Always on, always reliable',
    description:
      'Fault-tolerant RAFT consensus with automatic failover means zero-downtime upgrades and continuous operations, 365 days a year.',
    stat: '~10ms',
    statLabel: 'failover recovery',
  },
  {
    icon: Network,
    headline: 'Connect everything, once',
    description:
      'A single integration replaces dozens of vendor contracts. Every exchange, custodian, and protocol — one normalized API.',
    stat: '50+',
    statLabel: 'integrations',
  },
  {
    icon: Sliders,
    headline: 'From dashboards to full automation',
    description:
      'Start with the UI for day-one visibility. Add SDK workflows as you grow. Graduate to full API control when you need it.',
    stat: '3',
    statLabel: 'integration modes',
  },
];

export const BusinessBenefits = () => {
  return (
    <section className="py-16 px-5 md:px-12 lg:px-16 lg:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <AnimatedElement type="fadeInUp">
            <p className="text-xs font-mono text-[#0073FF]/50 tracking-[0.2em] uppercase mb-4">
              Why IMMIX
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Built for institutions that can't afford downtime.
            </h2>
          </AnimatedElement>
          <AnimatedElement type="fadeInUp" delay={0.1}>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              Enterprise-grade infrastructure with the flexibility of a modern API platform.
            </p>
          </AnimatedElement>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <AnimatedElement key={benefit.headline} type="fadeInUp" delay={0.1 + index * 0.08}>
                <div className="group p-8 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.03] transition-all duration-300 h-full">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-[#0073FF]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0073FF]/15 transition-colors">
                      <Icon size={22} className="text-[#0073FF]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold mb-2">{benefit.headline}</h3>
                      <p className="text-sm text-white/45 leading-relaxed mb-4">
                        {benefit.description}
                      </p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-mono font-bold text-[#0073FF]">
                          {benefit.stat}
                        </span>
                        <span className="text-xs font-mono text-white/30 uppercase tracking-wider">
                          {benefit.statLabel}
                        </span>
                      </div>
                    </div>
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

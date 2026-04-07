import { Link } from 'react-router-dom';
import { DollarSign, Workflow, Zap, ArrowRight } from 'lucide-react';
import { AnimatedElement } from '../ui';

const engines = [
  {
    name: 'Pricing Engine',
    icon: DollarSign,
    color: 'emerald',
    description:
      'Aggregate, normalize, and distribute real-time pricing across every venue and asset class. Power internal valuations, client-facing quotes, and mark-to-market with a single source of truth.',
    capabilities: ['Multi-venue aggregation', 'VWAP / TWAP / custom models', 'Sub-millisecond updates', 'Historical replay'],
    audience: 'OTC desks, market makers, fund admins',
    borderClass: 'border-emerald-500/20 hover:border-emerald-500/40',
    bgClass: 'bg-emerald-500/[0.03]',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
    tagBg: 'bg-emerald-500/10 text-emerald-400/80',
  },
  {
    name: 'Automation Engine',
    icon: Workflow,
    color: 'blue',
    description:
      'Define operational rules, triggers, and workflows that execute deterministically across your entire digital asset stack. From simple alerts to complex multi-step strategies.',
    capabilities: ['Rule-based triggers', 'Multi-step workflows', 'Cross-system orchestration', 'Audit trail'],
    audience: 'Treasury teams, compliance, ops managers',
    borderClass: 'border-[#0073FF]/20 hover:border-[#0073FF]/40',
    bgClass: 'bg-[#0073FF]/[0.03]',
    iconBg: 'bg-[#0073FF]/10',
    iconColor: 'text-[#0073FF]',
    tagBg: 'bg-[#0073FF]/10 text-[#0073FF]/80',
  },
  {
    name: 'Execution Engine',
    icon: Zap,
    color: 'amber',
    description:
      'Route, execute, and manage orders across every connected venue with smart order routing, algorithmic strategies, and real-time position management.',
    capabilities: ['Smart order routing', 'Algorithmic execution', 'Position management', 'Fill analytics'],
    audience: 'Traders, prop desks, hedge funds',
    borderClass: 'border-amber-500/20 hover:border-amber-500/40',
    bgClass: 'bg-amber-500/[0.03]',
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-400',
    tagBg: 'bg-amber-500/10 text-amber-400/80',
  },
];

export const EnginesOverview = () => {
  return (
    <section id="platform" className="py-16 px-5 md:px-12 lg:px-16 lg:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <AnimatedElement type="fadeInUp">
            <p className="text-xs font-mono text-[#0073FF]/50 tracking-[0.2em] uppercase mb-4">
              Platform
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Three engines. One unified core.
            </h2>
            <div className="mt-4 mx-auto w-16 h-[2px] bg-gradient-to-r from-transparent via-[#0073FF] to-transparent" />
          </AnimatedElement>
          <AnimatedElement type="fadeInUp" delay={0.1}>
            <p className="text-lg text-white/50 max-w-3xl mx-auto">
              Every engine runs on the same fault-tolerant sequencer.
              Compose them together or deploy individually — your architecture, your rules.
            </p>
          </AnimatedElement>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {engines.map((engine, index) => {
            const Icon = engine.icon;
            return (
              <AnimatedElement key={engine.name} type="fadeInUp" delay={0.1 + index * 0.1}>
                <div
                  className={`relative p-8 rounded-xl border ${engine.borderClass} ${engine.bgClass} transition-all duration-300 h-full flex flex-col`}
                >
                  <div className="flex items-center gap-4 mb-5">
                    <div className={`w-12 h-12 rounded-xl ${engine.iconBg} flex items-center justify-center`}>
                      <Icon size={22} className={engine.iconColor} />
                    </div>
                    <h3 className="text-xl font-bold">{engine.name}</h3>
                  </div>

                  <p className="text-sm text-white/50 leading-relaxed mb-6 flex-1">
                    {engine.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {engine.capabilities.map((cap) => (
                      <span
                        key={cap}
                        className={`text-[10px] font-mono px-2.5 py-1 rounded-full ${engine.tagBg}`}
                      >
                        {cap}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs font-mono text-white/30 uppercase tracking-wider">
                    {engine.audience}
                  </p>
                </div>
              </AnimatedElement>
            );
          })}
        </div>

        <AnimatedElement type="fadeInUp" delay={0.4}>
          <div className="text-center">
            <Link
              to="/infrastructure"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0073FF] hover:text-[#3D8FFF] transition-colors"
            >
              Explore the infrastructure
              <ArrowRight size={16} />
            </Link>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
};

import { Link } from 'react-router-dom';
import { CreditCard, TrendingUp, Landmark, ArrowRight } from 'lucide-react';
import { AnimatedElement } from '../ui';

const verticals = [
  {
    name: 'Payment Ops',
    href: '/solutions/payment-ops',
    icon: CreditCard,
    audience: 'PSPs, remittance providers, on/off ramp platforms',
    challenge: 'Connecting to multiple liquidity venues, managing settlement across corridors, and maintaining real-time FX pricing.',
    outcome: 'Unified payment routing with automated settlement, real-time pricing, and full audit trails across every corridor.',
    useCases: ['Cross-border settlement', 'Fiat on/off ramp orchestration', 'Multi-venue liquidity sourcing'],
    engines: ['Pricing Engine', 'Execution Engine'],
    borderClass: 'border-emerald-500/15 hover:border-emerald-500/30',
    bgClass: 'bg-emerald-500/[0.02] hover:bg-emerald-500/[0.04]',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
    tagColor: 'text-emerald-400/70',
  },
  {
    name: 'Trading Ops',
    href: '/solutions/trading-ops',
    icon: TrendingUp,
    audience: 'Hedge funds, prop trading desks, market makers',
    challenge: 'Managing execution across fragmented venues, building in-house OMS/EMS, and maintaining low-latency market data.',
    outcome: 'Institutional-grade execution with smart order routing, algorithmic strategies, and consolidated position management.',
    useCases: ['Multi-venue execution', 'Algorithmic trading strategies', 'Real-time risk monitoring'],
    engines: ['Execution Engine', 'Automation Engine'],
    borderClass: 'border-[#0073FF]/15 hover:border-[#0073FF]/30',
    bgClass: 'bg-[#0073FF]/[0.02] hover:bg-[#0073FF]/[0.04]',
    iconBg: 'bg-[#0073FF]/10',
    iconColor: 'text-[#0073FF]',
    tagColor: 'text-[#0073FF]/70',
  },
  {
    name: 'Treasury Ops',
    href: '/solutions/treasury-ops',
    icon: Landmark,
    audience: 'Asset managers, neo-banks, fintechs',
    challenge: 'Tracking balances across custodians and venues, automating rebalancing, and maintaining compliance reporting.',
    outcome: 'Consolidated treasury view with automated rebalancing, compliance-ready reporting, and cross-custodian orchestration.',
    useCases: ['Automated rebalancing', 'Cross-custodian visibility', 'Compliance reporting automation'],
    engines: ['Automation Engine', 'Pricing Engine'],
    borderClass: 'border-amber-500/15 hover:border-amber-500/30',
    bgClass: 'bg-amber-500/[0.02] hover:bg-amber-500/[0.04]',
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-400',
    tagColor: 'text-amber-400/70',
  },
];

const audienceChips = [
  'Hedge Funds',
  'Market Makers',
  'PSPs',
  'Neo-banks',
  'Fintechs',
  'Asset Managers',
  'OTC Desks',
  'Prop Traders',
  'Remittance Providers',
];

export const SolutionVerticals = () => {
  return (
    <section className="py-16 px-5 md:px-12 lg:px-16 lg:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <AnimatedElement type="fadeInUp">
            <p className="text-xs font-mono text-[#0073FF]/50 tracking-[0.2em] uppercase mb-4">
              Solutions
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Built for how you operate.
            </h2>
            <div className="mt-4 mx-auto w-16 h-[2px] bg-gradient-to-r from-transparent via-[#0073FF] to-transparent" />
          </AnimatedElement>
          <AnimatedElement type="fadeInUp" delay={0.1}>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              Purpose-built configurations for the most demanding
              digital asset workflows.
            </p>
          </AnimatedElement>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-14">
          {verticals.map((vertical, index) => {
            const Icon = vertical.icon;
            return (
              <AnimatedElement key={vertical.name} type="fadeInUp" delay={0.1 + index * 0.1}>
                <Link
                  to={vertical.href}
                  className={`group block p-8 rounded-xl border ${vertical.borderClass} ${vertical.bgClass} transition-all duration-300 h-full`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-11 h-11 rounded-lg ${vertical.iconBg} flex items-center justify-center`}>
                      <Icon size={20} className={vertical.iconColor} />
                    </div>
                    <h3 className="text-xl font-bold group-hover:text-white transition-colors">{vertical.name}</h3>
                  </div>

                  <p className="text-xs font-mono text-white/30 uppercase tracking-wider mb-4">
                    {vertical.audience}
                  </p>

                  <p className="text-sm text-white/45 leading-relaxed mb-6">
                    {vertical.outcome}
                  </p>

                  <div className="space-y-2 mb-6">
                    {vertical.useCases.map((uc) => (
                      <div key={uc} className="flex items-center gap-2">
                        <div className={`w-1 h-1 rounded-full ${vertical.iconColor}`} />
                        <span className="text-xs text-white/50">{uc}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                    <div className="flex gap-2">
                      {vertical.engines.map((eng) => (
                        <span key={eng} className={`text-[10px] font-mono ${vertical.tagColor}`}>
                          {eng}
                        </span>
                      ))}
                    </div>
                    <ArrowRight size={14} className="text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </Link>
              </AnimatedElement>
            );
          })}
        </div>

        <AnimatedElement type="fadeIn" delay={0.4}>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {audienceChips.map((chip, i) => (
              <span key={chip} className="text-xs font-mono text-white/25 tracking-wide">
                {chip}
                {i < audienceChips.length - 1 && (
                  <span className="ml-2 text-white/10">|</span>
                )}
              </span>
            ))}
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
};

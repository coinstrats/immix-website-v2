import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Check,
  Eye,
  TrendingUp,
  ArrowLeftRight,
  Shield,
  ArrowRight,
  Sparkles,
  Monitor,
  Database,
  Wifi,
  Palette,
} from 'lucide-react';
import { AnimatedElement, Button } from '../ui';
import { FeatureComparisonGrid } from './FeatureComparisonGrid';
import { StartupCreditsBanner } from './StartupCreditsBanner';

const pricingTiers = [
  {
    name: 'Lite',
    icon: Eye,
    price: 'From $500',
    period: 'avg/month',
    description: 'For analysts and teams needing view-only access to markets and data',
    highlights: [
      'View-only Markets',
      'Read-only API',
      'Python SDK',
      'Pay per message',
    ],
    features: [
      'Markets analytics dashboard',
      'View-only trade workspaces',
      'Read-only market data API',
      'Real-time data streaming',
      '7-day historical data',
      '99.9% uptime SLA',
      'Email support',
    ],
    cta: 'Get Started',
    ctaLink: '#',
    highlighted: false,
    tierColor: 'slate' as const,
  },
  {
    name: 'Pro',
    icon: TrendingUp,
    price: 'From $2,500',
    period: 'avg/month',
    description: 'For traders and funds ready to execute with algorithmic strategies',
    highlights: [
      'Full trading access',
      '1 Strategy',
      'Earn ($10K limit)',
      'Pay per usage',
    ],
    features: [
      'Everything in Lite, plus:',
      'Full trading capabilities',
      'Order execution & management',
      '1 configurable strategy',
      'Earn product ($10K allocation)',
      'Post-trade analytics',
      'Priority support (8h SLA)',
    ],
    cta: 'Start Trading',
    ctaLink: '#',
    highlighted: false,
    tierColor: 'emerald' as const,
  },
  {
    name: 'Ultra',
    icon: ArrowLeftRight,
    price: 'From $5,000',
    period: 'avg/month',
    description: 'For institutions needing transfers, yield, and advanced automation',
    highlights: [
      'Transfers access',
      '2 Strategies',
      'Earn ($100K limit)',
      'Volume discounts',
    ],
    features: [
      'Everything in Pro, plus:',
      'Transfers product access',
      'Cross-chain movements',
      '2 configurable strategies',
      'Earn product ($100K allocation)',
      '1-year historical data',
      'Priority support (4h SLA)',
    ],
    cta: 'Upgrade to Ultra',
    ctaLink: '#',
    highlighted: true,
    tierColor: 'blue' as const,
  },
];

const enterprise = {
  name: 'Enterprise',
  icon: Shield,
  price: 'From $25,000',
  period: 'avg/month',
  description: 'For institutions requiring unlimited scale and white-glove service',
  highlights: [
    'Unlimited strategies',
    'Earn ($10M limit)',
    'All SDKs',
    'Custom pricing',
  ],
  features: [
    'Everything in Ultra, plus:',
    'Unlimited strategies',
    'Earn product ($10M allocation)',
    'Java, Rust, C++ SDKs',
    'Full historical archive',
    'Dedicated success manager',
    '1h SLA response time',
  ],
  cta: 'Contact Sales',
  ctaLink: '#',
  tierColor: 'amber' as const,
};

const addOns = [
  {
    name: 'IMMIX Visualize',
    icon: Monitor,
    price: '$250',
    unit: '/seat/month',
    desc: 'Premium dashboard for operations teams with real-time monitoring',
  },
  {
    name: 'Data Lab',
    icon: Database,
    price: '$1,500',
    unit: '/month',
    desc: 'ClickHouse cluster with full historical data and custom queries',
  },
  {
    name: 'Private Connectivity',
    icon: Wifi,
    price: '$2,000',
    unit: '/month',
    desc: 'AWS Direct Connect to major venues for lowest latency',
  },
  {
    name: 'White Label',
    icon: Palette,
    price: 'Custom',
    unit: '',
    desc: 'Offer IMMIX infrastructure under your own brand',
  },
];

type TabId = 'tiers' | 'compare';

const tabs: { id: TabId; label: string }[] = [
  { id: 'tiers', label: 'Pricing Tiers' },
  { id: 'compare', label: 'Compare Features' },
];

const tierColorMap = {
  slate: {
    badge: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
    icon: 'bg-slate-500/20 text-slate-300',
    highlight: 'text-slate-300',
    accent: 'from-slate-500 to-slate-400',
    hoverShadow: 'hover:shadow-[0_0_30px_rgba(148,163,184,0.12)]',
    glow: 'from-slate-400/10 via-transparent to-transparent',
  },
  emerald: {
    badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    icon: 'bg-emerald-500/20 text-emerald-400',
    highlight: 'text-emerald-400',
    accent: 'from-emerald-500 to-emerald-400',
    hoverShadow: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]',
    glow: 'from-emerald-400/10 via-transparent to-transparent',
  },
  blue: {
    badge: 'bg-immix-blue/20 text-immix-blue border-immix-blue/30',
    icon: 'bg-immix-blue/20 text-immix-blue',
    highlight: 'text-immix-blue',
    accent: 'from-blue-500 to-blue-400',
    hoverShadow: 'hover:shadow-[0_0_30px_rgba(0,115,255,0.15)]',
    glow: 'from-immix-blue/10 via-transparent to-transparent',
  },
  amber: {
    badge: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    icon: 'bg-amber-500/20 text-amber-400',
    highlight: 'text-amber-400',
    accent: 'from-amber-500 to-amber-400',
    hoverShadow: 'hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]',
    glow: 'from-amber-400/10 via-transparent to-transparent',
  },
};

export const Pricing = () => {
  const [activeTab, setActiveTab] = useState<TabId>('tiers');

  return (
    <section id="pricing" className="section-wrapper">
      <div className="container-max space-y-12">
        <div className="text-center space-y-4">
          <AnimatedElement type="fadeInUp">
            <h2 className="text-4xl md:text-5xl font-bold">Infrastructure pricing.</h2>
            <div className="mt-4 mx-auto w-16 h-[2px] bg-gradient-to-r from-transparent via-immix-blue to-transparent" />
          </AnimatedElement>
          <AnimatedElement type="fadeInUp" delay={0.1}>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Predictable pricing that scales with your business. Pay for capacity, throughput, and
              volume — not market luck.
            </p>
          </AnimatedElement>
        </div>

        <AnimatedElement type="fadeInUp" delay={0.2}>
          <div className="flex justify-center">
            <div className="relative inline-flex bg-immix-dark/60 border border-white/10 rounded-full p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative z-10 px-6 py-2.5 text-sm font-medium rounded-full transition-colors duration-300 ${
                    activeTab === tab.id
                      ? 'text-white'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="pricing-tab-indicator"
                      className="absolute inset-0 bg-immix-blue rounded-full"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </AnimatedElement>

        <div className="min-h-[600px]">
          {activeTab === 'tiers' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-10"
            >
              <StartupCreditsBanner />

              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/10" />
                <p className="text-white/35 text-sm text-center px-2 max-w-md">
                  When your credits are used or you're ready to scale, transition seamlessly to a paid plan
                </p>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/10" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                {pricingTiers.map((tier, index) => {
                  const Icon = tier.icon;
                  const colors = tierColorMap[tier.tierColor];

                  return (
                    <motion.div
                      key={tier.name}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className={`relative p-6 flex flex-col h-full group transition-all duration-300 hover:-translate-y-1 ${colors.hoverShadow} ${
                        tier.highlighted
                          ? 'bg-immix-blue/10 border-2 border-immix-blue shadow-glow-lg'
                          : 'bg-immix-dark/60 border border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${colors.accent}`} />

                      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] ${colors.glow} pointer-events-none`} />

                      {tier.highlighted && (
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                          <span className="relative inline-flex items-center gap-1.5 px-4 py-1.5 bg-immix-blue text-white text-xs font-bold overflow-hidden">
                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                            <Sparkles size={12} className="relative z-10" />
                            <span className="relative z-10">MOST POPULAR</span>
                          </span>
                        </div>
                      )}

                      <div className="relative space-y-6 flex-grow flex flex-col">
                        <div className="flex items-center gap-3">
                          <div className={`p-2.5 ${colors.icon}`}>
                            <Icon size={24} />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold">{tier.name}</h3>
                          </div>
                        </div>

                        <div className="py-4 border-b border-white/10">
                          <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-bold">{tier.price}</span>
                            <span className="text-white/60 text-sm">{tier.period}</span>
                          </div>
                          <p className="mt-3 text-sm text-white/60">{tier.description}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          {tier.highlights.map((highlight) => (
                            <div
                              key={highlight}
                              className={`px-3 py-2.5 text-xs font-medium border text-center ${colors.badge}`}
                            >
                              {highlight}
                            </div>
                          ))}
                        </div>

                        <ul className="space-y-3 flex-grow">
                          {tier.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-3">
                              <Check
                                className={`flex-shrink-0 mt-0.5 ${colors.highlight}`}
                                size={16}
                              />
                              <span className="text-sm text-white/70">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-auto pt-6">
                          <Button
                            variant={tier.highlighted ? 'primary' : 'secondary'}
                            size="lg"
                            className="w-full justify-center group/btn"
                          >
                            {tier.cta}
                            <ArrowRight
                              size={16}
                              className="ml-2 transition-transform group-hover/btn:translate-x-1"
                            />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {(() => {
                const Icon = enterprise.icon;
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="mt-8 p-8 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-amber-500/10 border border-amber-500/30 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent opacity-50" />

                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/[0.06] to-transparent animate-shimmer-slow" style={{ backgroundSize: '200% 100%' }} />

                    <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      <div className="lg:col-span-4 space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="p-3 bg-amber-500/20 text-amber-400">
                            <Icon size={28} />
                          </div>
                          <div>
                            <h3 className="text-3xl font-bold">{enterprise.name}</h3>
                            <p className="text-amber-400/80 text-sm">White-glove service</p>
                          </div>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-bold">{enterprise.price}</span>
                          <span className="text-white/60 text-sm">{enterprise.period}</span>
                        </div>
                        <p className="text-white/60">{enterprise.description}</p>
                      </div>

                      <div className="lg:col-span-5">
                        <div className="grid grid-cols-2 gap-3">
                          {enterprise.highlights.map((highlight) => (
                            <div
                              key={highlight}
                              className="px-4 py-3 text-sm font-medium border border-amber-500/30 bg-amber-500/10 text-amber-300"
                            >
                              {highlight}
                            </div>
                          ))}
                        </div>
                        <ul className="mt-4 grid grid-cols-2 gap-2">
                          {enterprise.features.slice(1).map((feature) => (
                            <li key={feature} className="flex items-center gap-2">
                              <Check className="flex-shrink-0 text-amber-400" size={14} />
                              <span className="text-sm text-white/70">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <p className="mt-3 text-xs text-amber-400/60">
                          Dedicated onboarding + white-glove setup included
                        </p>
                      </div>

                      <div className="lg:col-span-3 flex flex-col items-center lg:items-end gap-4">
                        <Button
                          variant="secondary"
                          size="lg"
                          className="w-full lg:w-auto justify-center border-amber-500/50 hover:border-amber-500 hover:bg-amber-500/10 group/btn"
                        >
                          {enterprise.cta}
                          <ArrowRight
                            size={16}
                            className="ml-2 transition-transform group-hover/btn:translate-x-1"
                          />
                        </Button>
                        <p className="text-xs text-white/40 text-center lg:text-right">
                          Dedicated onboarding included
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })()}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="pt-12 border-t border-white/10"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">Expand with modules</h3>
                  <p className="text-white/60">Add capabilities as your needs grow</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {addOns.map((addon, i) => {
                    const AddonIcon = addon.icon;
                    return (
                      <motion.div
                        key={addon.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                        viewport={{ once: true }}
                        className="relative p-6 bg-immix-dark border border-white/10 hover:border-immix-blue/30 transition-all duration-300 hover:-translate-y-1 group overflow-hidden"
                      >
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-immix-blue/60 to-immix-blue-light/60" />
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-immix-blue/10 text-immix-blue">
                            <AddonIcon size={18} />
                          </div>
                          <h4 className="font-bold group-hover:text-immix-blue transition-colors">
                            {addon.name}
                          </h4>
                        </div>
                        <p className="font-mono mb-2">
                          <span className="text-immix-blue text-lg">{addon.price}</span>
                          <span className="text-white/40 text-sm">{addon.unit}</span>
                        </p>
                        <p className="text-sm text-white/50">{addon.desc}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'compare' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-immix-dark/60 border border-white/10"
            >
              <FeatureComparisonGrid />
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center pt-8"
        >
          <p className="text-white/40 text-sm">
            All plans include 24/7 infrastructure monitoring, automatic failover, and regular
            security audits.
            <br />
            Startup credits subject to approval and valid for 6 months from activation.
            <br />
            Volume discounts available for high-frequency traders.{' '}
            <a href="#" className="text-immix-blue font-medium hover:underline">
              Contact us
            </a>{' '}
            for custom requirements.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

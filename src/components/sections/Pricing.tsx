import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Eye, TrendingUp, ArrowLeftRight, Shield, ArrowRight, Sparkles } from 'lucide-react';
import { AnimatedElement, Button } from '../ui';
import { FeatureComparisonGrid } from './FeatureComparisonGrid';

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
    tierColor: 'slate',
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
    tierColor: 'emerald',
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
    tierColor: 'blue',
  },
  {
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
    highlighted: false,
    tierColor: 'amber',
  },
];

const addOns = [
  {
    name: 'IMMIX Visualize',
    price: '$250',
    unit: '/seat/month',
    desc: 'Premium dashboard for operations teams with real-time monitoring',
  },
  {
    name: 'Data Lab',
    price: '$1,500',
    unit: '/month',
    desc: 'ClickHouse cluster with full historical data and custom queries',
  },
  {
    name: 'Private Connectivity',
    price: '$2,000',
    unit: '/month',
    desc: 'AWS Direct Connect to major venues for lowest latency',
  },
  {
    name: 'White Label',
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

export const Pricing = () => {
  const [activeTab, setActiveTab] = useState<TabId>('tiers');

  return (
    <section id="pricing" className="section-wrapper">
      <div className="container-max space-y-12">
        <div className="text-center space-y-4">
          <AnimatedElement type="fadeInUp">
            <h2 className="text-4xl md:text-5xl font-bold">Infrastructure pricing.</h2>
          </AnimatedElement>
          <AnimatedElement type="fadeInUp" delay={0.1}>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Predictable pricing that scales with your business. Pay for capacity, throughput, and
              volume - not market luck.
            </p>
          </AnimatedElement>
        </div>

        <AnimatedElement type="fadeInUp" delay={0.2}>
          <div className="flex justify-center">
            <div className="inline-flex bg-immix-dark/60 border border-white/10 p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-immix-blue text-white'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {tab.label}
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
              className="space-y-16"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                {pricingTiers.slice(0, 3).map((tier, index) => {
                  const Icon = tier.icon;
                  const colorClasses = {
                    slate: {
                      badge: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
                      icon: 'bg-slate-500/20 text-slate-300',
                      highlight: 'text-slate-300',
                    },
                    emerald: {
                      badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
                      icon: 'bg-emerald-500/20 text-emerald-400',
                      highlight: 'text-emerald-400',
                    },
                    blue: {
                      badge: 'bg-immix-blue/20 text-immix-blue border-immix-blue/30',
                      icon: 'bg-immix-blue/20 text-immix-blue',
                      highlight: 'text-immix-blue',
                    },
                    amber: {
                      badge: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
                      icon: 'bg-amber-500/20 text-amber-400',
                      highlight: 'text-amber-400',
                    },
                  }[tier.tierColor];

                  return (
                    <motion.div
                      key={tier.name}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className={`relative p-6 flex flex-col h-full group ${
                        tier.highlighted
                          ? 'bg-immix-blue/10 border-2 border-immix-blue shadow-glow-lg'
                          : 'bg-immix-dark/60 border border-white/10 hover:border-white/20 transition-colors'
                      }`}
                    >
                      {tier.highlighted && (
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-immix-blue text-white text-xs font-bold">
                            <Sparkles size={12} />
                            MOST POPULAR
                          </span>
                        </div>
                      )}

                      <div className="space-y-6 flex-grow flex flex-col">
                        <div className="flex items-center gap-3">
                          <div className={`p-2.5 ${colorClasses.icon}`}>
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
                              className={`px-3 py-2 text-xs font-medium border ${colorClasses.badge}`}
                            >
                              {highlight}
                            </div>
                          ))}
                        </div>

                        <ul className="space-y-3 flex-grow">
                          {tier.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-3">
                              <Check
                                className={`flex-shrink-0 mt-0.5 ${colorClasses.highlight}`}
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
                const enterprise = pricingTiers[3];
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
                  {addOns.map((addon, i) => (
                    <motion.div
                      key={addon.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                      viewport={{ once: true }}
                      className="p-6 bg-immix-dark border border-white/10 hover:border-immix-blue/30 transition-colors group"
                    >
                      <h4 className="font-bold mb-2 group-hover:text-immix-blue transition-colors">
                        {addon.name}
                      </h4>
                      <p className="font-mono mb-2">
                        <span className="text-immix-blue text-lg">{addon.price}</span>
                        <span className="text-white/40 text-sm">{addon.unit}</span>
                      </p>
                      <p className="text-sm text-white/50">{addon.desc}</p>
                    </motion.div>
                  ))}
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
            Volume discounts available for high-frequency traders.{' '}
            <a href="#" className="text-immix-blue hover:underline">
              Contact us
            </a>{' '}
            for custom requirements.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

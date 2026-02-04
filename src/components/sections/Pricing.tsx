import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, TrendingUp, Shield, ArrowRight, Sparkles } from 'lucide-react';
import { AnimatedElement, Button } from '../ui';
import { UsageCalculator } from './UsageCalculator';
import { FeatureComparisonGrid } from './FeatureComparisonGrid';

const pricingTiers = [
  {
    name: 'Developer',
    icon: Zap,
    price: '$2,500',
    period: 'per month',
    description: 'For quant funds, startups, and algo developers building their first strategies',
    highlights: [
      '10M messages/day',
      'Shared infrastructure',
      '2.0 bps on volume',
      'All core SDKs included',
    ],
    features: [
      'REST & WebSocket APIs',
      'Python, Java, C++, Node.js SDKs',
      'Real-time market data',
      'Basic pre-trade risk checks',
      '7-day historical data',
      '99.9% uptime SLA',
      'Community & email support',
    ],
    cta: 'Start Building',
    ctaLink: '#',
    highlighted: false,
    tierColor: 'emerald',
  },
  {
    name: 'Growth',
    icon: TrendingUp,
    price: '$8,500',
    period: 'per month',
    description: 'For prop shops, neobanks, and treasury operations scaling their trading',
    highlights: [
      '100M messages/day',
      'Dedicated sequencer',
      '1.0 bps on volume',
      '5 UI seats included',
    ],
    features: [
      'Everything in Developer, plus:',
      'FIX protocol support',
      'IMMIX Guard risk engine',
      '1-year historical data',
      'Post-trade analytics',
      'Custom dashboards',
      'Priority support (4h SLA)',
    ],
    cta: 'Upgrade to Growth',
    ctaLink: '#',
    highlighted: true,
    tierColor: 'blue',
  },
  {
    name: 'Enterprise',
    icon: Shield,
    price: 'Custom',
    period: 'tailored pricing',
    description: 'For tier-1 banks, market makers, and exchanges requiring maximum performance',
    highlights: [
      'Unlimited throughput',
      'Isolated cluster',
      '0.5 bps volume (negotiable)',
      'White-glove support',
    ],
    features: [
      'Everything in Growth, plus:',
      'Physical isolation',
      'Co-location options',
      'Rust SDK access',
      'Full historical archive',
      'Compliance consulting',
      'Dedicated success manager',
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

type TabId = 'tiers' | 'compare' | 'calculator';

const tabs: { id: TabId; label: string }[] = [
  { id: 'tiers', label: 'Pricing Tiers' },
  { id: 'compare', label: 'Compare Features' },
  { id: 'calculator', label: 'Cost Calculator' },
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
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                {pricingTiers.map((tier, index) => {
                  const Icon = tier.icon;
                  const colorClasses = {
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
                      className={`relative p-8 flex flex-col h-full group ${
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

          {activeTab === 'calculator' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <UsageCalculator />
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

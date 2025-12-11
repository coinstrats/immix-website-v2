import { motion } from 'framer-motion';
import { Check, Zap, TrendingUp, Shield } from 'lucide-react';
import { AnimatedElement, Button } from '../ui';

const pricingTiers = [
  {
    name: 'BUILDER',
    icon: Zap,
    price: '$2,500',
    period: 'per month',
    description: 'Perfect for quant funds, startups, and algo developers getting started',
    features: [
      'Shared Infrastructure',
      'Standard Support',
      '10M messages/day limit',
      'API Access',
      '2.0 bps on volume',
      'Python, Java, C++, Node.js SDKs',
      'Real-time market data',
      'Basic order types',
    ],
    cta: 'Start Building',
    highlighted: false,
  },
  {
    name: 'PRO',
    icon: TrendingUp,
    price: '$8,500',
    period: 'per month',
    description: 'For mid-market prop shops, neobanks, and treasury operations',
    features: [
      'Higher Rate Limits',
      'IMMIX Guard (Risk Engine)',
      '5 UI Seats included',
      'Premium Support',
      '1.0 bps on volume',
      'All SDKs + FIX API',
      'Historical data access',
      'Advanced order types',
      'Pre-trade compliance',
      'Post-trade analytics',
    ],
    cta: 'Go Pro',
    highlighted: true,
  },
  {
    name: 'ENTERPRISE',
    icon: Shield,
    price: 'Custom',
    period: 'tailored pricing',
    description: 'Complete infrastructure for tier-1 banks, market makers, and exchanges',
    features: [
      'Dedicated Sequencer Cluster',
      'Physical isolation',
      'Zero-downtime upgrades',
      'Unlimited UI Seats',
      'White-glove Support',
      'Volume discounts (0.6 - 0.2 bps)',
      'Custom SLA (99.999%)',
      'Private connectivity',
      'White-label options',
      'Compliance consulting',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

const addOns = [
  { name: 'IMMIX Visualize', price: '$250/seat/month', desc: 'Premium dashboard for ops teams' },
  { name: 'Data Lab', price: '$1,500/month', desc: 'ClickHouse cluster with historical data' },
  { name: 'Private Connectivity', price: '$2,000/month', desc: 'AWS Direct Connect to venues' },
  { name: 'White Label', price: 'Custom', desc: 'Offer IMMIX under your brand' },
];

export const Pricing = () => {
  return (
    <section id="pricing" className="section-wrapper">
      <div className="container-max space-y-16">
        <div className="text-center space-y-4">
          <AnimatedElement type="fadeInUp">
            <h2 className="text-4xl md:text-5xl font-bold">Infrastructure pricing.</h2>
          </AnimatedElement>
          <AnimatedElement type="fadeInUp" delay={0.1}>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Predictable pricing that scales with your business. Pay for capacity, throughput, and volume—not market luck.
            </p>
          </AnimatedElement>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => {
            const Icon = tier.icon;
            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative p-8 flex flex-col h-full ${
                  tier.highlighted
                    ? 'bg-immix-blue/10 border-2 border-immix-blue shadow-glow-lg'
                    : 'bg-immix-dark/60 border border-white/10'
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="inline-block px-4 py-1 rounded-full bg-immix-blue text-white text-xs font-bold">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="space-y-6 flex-grow flex flex-col">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 ${tier.highlighted ? 'bg-immix-blue/20' : 'bg-white/5'}`}>
                      <Icon className={tier.highlighted ? 'text-immix-blue' : 'text-white/70'} size={24} />
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

                  <ul className="space-y-3 flex-grow">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className={`flex-shrink-0 mt-0.5 ${tier.highlighted ? 'text-immix-blue' : 'text-white/70'}`} size={18} />
                        <span className="text-sm text-white/80">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-6">
                    <Button
                      variant={tier.highlighted ? 'primary' : 'secondary'}
                      size="lg"
                      className="w-full justify-center"
                    >
                      {tier.cta}
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
          className="mt-20 pt-12 border-t border-white/10"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Expand with modules</h3>
            <p className="text-white/60">Add capabilities as your needs grow</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, i) => (
              <motion.div
                key={addon.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-immix-dark border border-immix-blue/20 hover:border-immix-blue/50 transition-colors"
              >
                <h4 className="font-bold mb-2">{addon.name}</h4>
                <p className="text-immix-blue font-mono text-lg mb-2">{addon.price}</p>
                <p className="text-sm text-white/60">{addon.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

import { motion } from 'framer-motion';
import { Check, Minus, Info } from 'lucide-react';
import { useState } from 'react';

type FeatureValue = boolean | string;

interface Feature {
  name: string;
  tooltip?: string;
  developer: FeatureValue;
  growth: FeatureValue;
  enterprise: FeatureValue;
}

interface FeatureCategory {
  category: string;
  features: Feature[];
}

const featureData: FeatureCategory[] = [
  {
    category: 'Infrastructure',
    features: [
      { name: 'Message throughput', developer: '10M/day', growth: '100M/day', enterprise: 'Unlimited' },
      { name: 'Sequencer cluster', developer: 'Shared', growth: 'Dedicated', enterprise: 'Isolated' },
      { name: 'Latency SLA', developer: '<10ms p99', growth: '<5ms p99', enterprise: '<1ms p99' },
      { name: 'Uptime guarantee', developer: '99.9%', growth: '99.95%', enterprise: '99.999%' },
      { name: 'Zero-downtime upgrades', developer: false, growth: true, enterprise: true },
    ],
  },
  {
    category: 'Connectivity',
    features: [
      { name: 'REST API', developer: true, growth: true, enterprise: true },
      { name: 'WebSocket streams', developer: true, growth: true, enterprise: true },
      { name: 'FIX protocol', developer: false, growth: true, enterprise: true },
      { name: 'Private connectivity', tooltip: 'AWS Direct Connect to venues', developer: false, growth: 'Add-on', enterprise: true },
      { name: 'Co-location options', developer: false, growth: false, enterprise: true },
    ],
  },
  {
    category: 'SDKs & Tools',
    features: [
      { name: 'Python SDK', developer: true, growth: true, enterprise: true },
      { name: 'Java SDK', developer: true, growth: true, enterprise: true },
      { name: 'C++ SDK', developer: true, growth: true, enterprise: true },
      { name: 'Node.js SDK', developer: true, growth: true, enterprise: true },
      { name: 'Rust SDK', developer: false, growth: true, enterprise: true },
    ],
  },
  {
    category: 'Risk & Compliance',
    features: [
      { name: 'Pre-trade risk checks', developer: 'Basic', growth: 'Advanced', enterprise: 'Custom' },
      { name: 'IMMIX Guard engine', developer: false, growth: true, enterprise: true },
      { name: 'Position limits', developer: true, growth: true, enterprise: true },
      { name: 'Compliance reporting', developer: false, growth: true, enterprise: true },
      { name: 'Audit logs', developer: '30 days', growth: '1 year', enterprise: 'Unlimited' },
    ],
  },
  {
    category: 'Data & Analytics',
    features: [
      { name: 'Real-time market data', developer: true, growth: true, enterprise: true },
      { name: 'Historical data access', developer: '7 days', growth: '1 year', enterprise: 'Full history' },
      { name: 'Post-trade analytics', developer: false, growth: true, enterprise: true },
      { name: 'Data Lab (ClickHouse)', developer: false, growth: 'Add-on', enterprise: true },
      { name: 'Custom dashboards', developer: false, growth: true, enterprise: true },
    ],
  },
  {
    category: 'Support',
    features: [
      { name: 'Documentation access', developer: true, growth: true, enterprise: true },
      { name: 'Community support', developer: true, growth: true, enterprise: true },
      { name: 'Email support', developer: true, growth: true, enterprise: true },
      { name: 'Priority support', developer: false, growth: true, enterprise: true },
      { name: 'Dedicated success manager', developer: false, growth: false, enterprise: true },
      { name: 'SLA response time', developer: '48h', growth: '4h', enterprise: '1h' },
    ],
  },
];

const FeatureCell = ({ value }: { value: FeatureValue }) => {
  if (typeof value === 'boolean') {
    return value ? (
      <Check className="text-emerald-400 mx-auto" size={18} />
    ) : (
      <Minus className="text-white/20 mx-auto" size={18} />
    );
  }
  return <span className="text-sm text-white/80">{value}</span>;
};

export const FeatureComparisonGrid = () => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(featureData.map((c) => c.category))
  );

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="overflow-x-auto"
    >
      <table className="w-full min-w-[700px]">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-4 px-4 text-white/60 font-medium text-sm w-[40%]">
              Feature
            </th>
            <th className="py-4 px-4 text-center w-[20%]">
              <div className="space-y-1">
                <div className="text-emerald-400 font-bold">Developer</div>
                <div className="text-white/40 text-xs font-normal">$2,500/mo</div>
              </div>
            </th>
            <th className="py-4 px-4 text-center w-[20%] bg-immix-blue/5 border-x border-immix-blue/20">
              <div className="space-y-1">
                <div className="text-immix-blue font-bold">Growth</div>
                <div className="text-white/40 text-xs font-normal">$8,500/mo</div>
              </div>
            </th>
            <th className="py-4 px-4 text-center w-[20%]">
              <div className="space-y-1">
                <div className="text-amber-400 font-bold">Enterprise</div>
                <div className="text-white/40 text-xs font-normal">Custom</div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {featureData.map((category) => (
            <>
              <tr
                key={category.category}
                className="border-b border-white/5 bg-white/[0.02] cursor-pointer hover:bg-white/[0.04] transition-colors"
                onClick={() => toggleCategory(category.category)}
              >
                <td colSpan={4} className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <motion.span
                      initial={false}
                      animate={{ rotate: expandedCategories.has(category.category) ? 90 : 0 }}
                      className="text-white/40"
                    >
                      ›
                    </motion.span>
                    <span className="font-semibold text-white/90">{category.category}</span>
                  </div>
                </td>
              </tr>
              {expandedCategories.has(category.category) &&
                category.features.map((feature, idx) => (
                  <motion.tr
                    key={`${category.category}-${feature.name}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`border-b border-white/5 ${idx % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.01]'}`}
                  >
                    <td className="py-3 px-4 pl-8">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-white/70">{feature.name}</span>
                        {feature.tooltip && (
                          <div className="group relative">
                            <Info size={14} className="text-white/30 cursor-help" />
                            <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-immix-dark border border-white/20 px-3 py-2 text-xs text-white/70 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                              {feature.tooltip}
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <FeatureCell value={feature.developer} />
                    </td>
                    <td className="py-3 px-4 text-center bg-immix-blue/5 border-x border-immix-blue/10">
                      <FeatureCell value={feature.growth} />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <FeatureCell value={feature.enterprise} />
                    </td>
                  </motion.tr>
                ))}
            </>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

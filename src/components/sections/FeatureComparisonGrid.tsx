import { motion } from 'framer-motion';
import { Check, Minus, Info } from 'lucide-react';
import { useState } from 'react';

type FeatureValue = boolean | string;

interface Feature {
  name: string;
  tooltip?: string;
  startup: FeatureValue;
  lite: FeatureValue;
  pro: FeatureValue;
  ultra: FeatureValue;
  enterprise: FeatureValue;
  comingSoon?: boolean;
}

interface FeatureCategory {
  category: string;
  features: Feature[];
}

const featureData: FeatureCategory[] = [
  {
    category: 'Products',
    features: [
      { name: 'Markets (Analytics)', startup: 'Full access', lite: 'View-only', pro: 'View-only', ultra: 'Full access', enterprise: 'Full access' },
      { name: 'Trade Workspaces', startup: 'Full access', lite: 'View-only', pro: 'Full access', ultra: 'Full access', enterprise: 'Full access' },
      { name: 'Trading Execution', tooltip: 'Limit, Market, Peg, Ice, SOR, AutoSpreader', startup: true, lite: false, pro: true, ultra: true, enterprise: true },
      { name: 'Transfers', tooltip: 'Cross-chain and fiat movements', startup: true, lite: false, pro: false, ultra: true, enterprise: true },
      { name: 'Earn', tooltip: 'Yield generation product', startup: '$100K limit', lite: false, pro: '$10K limit', ultra: '$100K limit', enterprise: '$10M limit' },
      { name: 'White Label', tooltip: 'Offer IMMIX infrastructure under your own brand', startup: false, lite: false, pro: false, ultra: false, enterprise: true },
    ],
  },
  {
    category: 'Strategies',
    features: [
      { name: 'Pre-built workflows', startup: true, lite: false, pro: true, ultra: true, enterprise: true },
      { name: 'Configurable strategies', startup: '2 strategies', lite: false, pro: '1 strategy', ultra: '2 strategies', enterprise: 'Unlimited' },
      { name: 'Custom strategy development', startup: false, lite: false, pro: false, ultra: false, enterprise: true },
    ],
  },
  {
    category: 'SDKs & APIs',
    features: [
      { name: 'REST API', startup: true, lite: 'Read-only', pro: true, ultra: true, enterprise: true },
      { name: 'WebSocket streams', startup: true, lite: true, pro: true, ultra: true, enterprise: true },
      { name: 'Python SDK', startup: true, lite: true, pro: true, ultra: true, enterprise: true },
      { name: 'Java SDK', startup: false, lite: false, pro: false, ultra: false, enterprise: true },
      { name: 'FIX protocol', startup: true, lite: false, pro: false, ultra: true, enterprise: true },
      { name: 'Rust SDK', startup: false, lite: false, pro: false, ultra: false, enterprise: true, comingSoon: true },
      { name: 'C++ SDK', startup: false, lite: false, pro: false, ultra: false, enterprise: true, comingSoon: true },
    ],
  },
  {
    category: 'Infrastructure',
    features: [
      { name: 'Message pricing', startup: 'Credits', lite: '$0.00002/msg', pro: '$0.000015/msg', ultra: '$0.00001/msg', enterprise: 'Volume discount' },
      { name: 'Bandwidth pricing', startup: 'Credits', lite: '$0.10/GB', pro: '$0.08/GB', ultra: '$0.05/GB', enterprise: 'Volume discount' },
      { name: 'Sequencer cluster', startup: 'Dedicated', lite: 'Shared', pro: 'Shared', ultra: 'Dedicated', enterprise: 'Isolated' },
      { name: 'Private Connectivity', tooltip: 'AWS Direct Connect to major venues', startup: false, lite: false, pro: false, ultra: 'Add-on', enterprise: true },
      { name: 'Latency SLA', startup: '<5ms p99', lite: '<15ms p99', pro: '<10ms p99', ultra: '<5ms p99', enterprise: '<1ms p99' },
      { name: 'Uptime guarantee', startup: '99.95%', lite: '99.9%', pro: '99.9%', ultra: '99.95%', enterprise: '99.999%' },
    ],
  },
  {
    category: 'Data & Analytics',
    features: [
      { name: 'Real-time market data', startup: true, lite: true, pro: true, ultra: true, enterprise: true },
      { name: 'Historical data access', startup: '6 months', lite: '7 days', pro: '30 days', ultra: '1 year', enterprise: 'Full history' },
      { name: 'Post-trade analytics', startup: true, lite: false, pro: true, ultra: true, enterprise: true },
      { name: 'Custom dashboards', startup: true, lite: false, pro: false, ultra: true, enterprise: true },
      { name: 'Data Lab (ClickHouse)', startup: false, lite: false, pro: false, ultra: 'Add-on', enterprise: true },
    ],
  },
  {
    category: 'Support',
    features: [
      { name: 'Documentation access', startup: true, lite: true, pro: true, ultra: true, enterprise: true },
      { name: 'Community support', startup: true, lite: true, pro: true, ultra: true, enterprise: true },
      { name: 'Email support', startup: true, lite: true, pro: true, ultra: true, enterprise: true },
      { name: 'Priority support', startup: true, lite: false, pro: true, ultra: true, enterprise: true },
      { name: 'SLA response time', startup: '4h', lite: '48h', pro: '8h', ultra: '4h', enterprise: '1h' },
      { name: 'Dedicated success manager', startup: false, lite: false, pro: false, ultra: false, enterprise: true },
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
  return <span className="text-xs text-white/80">{value}</span>;
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
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}

      className="overflow-x-auto"
    >
      <table className="w-full min-w-[900px]">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-4 px-4 text-white/60 font-medium text-sm w-[22%]">
              Feature
            </th>
            <th className="py-4 px-3 text-center w-[15%] bg-teal-500/5 border-x border-teal-500/20">
              <div className="space-y-1">
                <div className="text-teal-400 font-bold">Startup</div>
                <div className="text-teal-300/40 text-[10px] font-normal">$15K credits / 6mo</div>
              </div>
            </th>
            <th className="py-4 px-3 text-center w-[15%]">
              <div className="space-y-1">
                <div className="text-slate-300 font-bold">Lite</div>
                <div className="text-white/40 text-xs font-normal">~$500/mo</div>
              </div>
            </th>
            <th className="py-4 px-3 text-center w-[15%]">
              <div className="space-y-1">
                <div className="text-emerald-400 font-bold">Pro</div>
                <div className="text-white/40 text-xs font-normal">~$2,500/mo</div>
              </div>
            </th>
            <th className="py-4 px-3 text-center w-[15%] bg-immix-blue/5 border-x border-immix-blue/20">
              <div className="space-y-1">
                <div className="text-immix-blue font-bold">Ultra</div>
                <div className="text-white/40 text-xs font-normal">~$5,000/mo</div>
              </div>
            </th>
            <th className="py-4 px-3 text-center w-[15%]">
              <div className="space-y-1">
                <div className="text-amber-400 font-bold">Enterprise</div>
                <div className="text-white/40 text-xs font-normal">~$25,000/mo</div>
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
                <td colSpan={6} className="py-3 px-4">
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
                        <span className={`text-sm ${feature.comingSoon ? 'text-white/40' : 'text-white/70'}`}>{feature.name}</span>
                        {feature.comingSoon && (
                          <span className="px-1.5 py-0.5 text-[10px] font-medium bg-amber-500/20 text-amber-400 border border-amber-500/30">
                            Coming soon
                          </span>
                        )}
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
                    <td className="py-3 px-3 text-center bg-teal-500/5 border-x border-teal-500/10">
                      <FeatureCell value={feature.startup} />
                    </td>
                    <td className="py-3 px-3 text-center">
                      <FeatureCell value={feature.lite} />
                    </td>
                    <td className="py-3 px-3 text-center">
                      <FeatureCell value={feature.pro} />
                    </td>
                    <td className="py-3 px-3 text-center bg-immix-blue/5 border-x border-immix-blue/10">
                      <FeatureCell value={feature.ultra} />
                    </td>
                    <td className="py-3 px-3 text-center">
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

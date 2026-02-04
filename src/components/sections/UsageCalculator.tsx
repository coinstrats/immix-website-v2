import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Activity, HardDrive, TrendingUp, Wallet, Cpu, DollarSign, Info } from 'lucide-react';

type TierName = 'Lite' | 'Pro' | 'Ultra' | 'Enterprise';

interface UsageMetrics {
  messagesPerMonth: number;
  bandwidthGB: number;
  tradingVolume: number;
  earnAllocation: number;
  strategies: number;
  needsTransfers: boolean;
}

interface TierPricing {
  platformFee: number;
  messageRate: number;
  bandwidthRate: number;
  tradingBps: number;
}

const tierPricing: Record<TierName, TierPricing> = {
  Lite: { platformFee: 99, messageRate: 0.00002, bandwidthRate: 0.10, tradingBps: 0 },
  Pro: { platformFee: 499, messageRate: 0.000015, bandwidthRate: 0.08, tradingBps: 1.0 },
  Ultra: { platformFee: 999, messageRate: 0.00001, bandwidthRate: 0.05, tradingBps: 0.8 },
  Enterprise: { platformFee: 4999, messageRate: 0.000005, bandwidthRate: 0.03, tradingBps: 0.5 },
};

const earnLimits: Record<TierName, number> = {
  Lite: 0,
  Pro: 10_000,
  Ultra: 100_000,
  Enterprise: 10_000_000,
};

const strategyLimits: Record<TierName, number> = {
  Lite: 0,
  Pro: 1,
  Ultra: 2,
  Enterprise: 999,
};

const formatNumber = (num: number): string => {
  if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1)}B`;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toString();
};

const formatCurrency = (num: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
};

const presets: { name: string; tier: TierName; metrics: UsageMetrics }[] = [
  {
    name: 'Analyst',
    tier: 'Lite',
    metrics: {
      messagesPerMonth: 20_000_000,
      bandwidthGB: 10,
      tradingVolume: 0,
      earnAllocation: 0,
      strategies: 0,
      needsTransfers: false,
    },
  },
  {
    name: 'Active Trader',
    tier: 'Pro',
    metrics: {
      messagesPerMonth: 100_000_000,
      bandwidthGB: 50,
      tradingVolume: 50_000_000,
      earnAllocation: 10_000,
      strategies: 1,
      needsTransfers: false,
    },
  },
  {
    name: 'Institution',
    tier: 'Ultra',
    metrics: {
      messagesPerMonth: 300_000_000,
      bandwidthGB: 200,
      tradingVolume: 100_000_000,
      earnAllocation: 100_000,
      strategies: 2,
      needsTransfers: true,
    },
  },
  {
    name: 'Market Maker',
    tier: 'Enterprise',
    metrics: {
      messagesPerMonth: 2_000_000_000,
      bandwidthGB: 1000,
      tradingVolume: 1_000_000_000,
      earnAllocation: 5_000_000,
      strategies: 10,
      needsTransfers: true,
    },
  },
];

export const UsageCalculator = () => {
  const [metrics, setMetrics] = useState<UsageMetrics>(presets[1].metrics);

  const estimation = useMemo(() => {
    const { messagesPerMonth, bandwidthGB, tradingVolume, earnAllocation, strategies, needsTransfers } = metrics;

    let minimumTier: TierName = 'Lite';
    if (tradingVolume > 0 || earnAllocation > 0 || strategies > 0) {
      minimumTier = 'Pro';
    }
    if (needsTransfers || earnAllocation > earnLimits.Pro || strategies > strategyLimits.Pro) {
      minimumTier = 'Ultra';
    }
    if (earnAllocation > earnLimits.Ultra || strategies > strategyLimits.Ultra) {
      minimumTier = 'Enterprise';
    }

    const pricing = tierPricing[minimumTier];

    const messageCost = messagesPerMonth * pricing.messageRate;
    const bandwidthCost = bandwidthGB * pricing.bandwidthRate;
    const tradingCost = (tradingVolume * pricing.tradingBps) / 10000;

    const totalEstimate = pricing.platformFee + messageCost + bandwidthCost + tradingCost;

    return {
      recommendedTier: minimumTier,
      platformFee: pricing.platformFee,
      messageCost,
      bandwidthCost,
      tradingCost,
      tradingBps: pricing.tradingBps,
      totalEstimate,
    };
  }, [metrics]);

  const sliderConfig = {
    messagesPerMonth: {
      min: 1_000_000,
      max: 5_000_000_000,
      step: 1_000_000,
      label: 'API messages per month',
      icon: Activity,
      format: (v: number) => formatNumber(v),
    },
    bandwidthGB: {
      min: 1,
      max: 2000,
      step: 1,
      label: 'Data bandwidth (GB)',
      icon: HardDrive,
      format: (v: number) => `${formatNumber(v)} GB`,
    },
    tradingVolume: {
      min: 0,
      max: 5_000_000_000,
      step: 1_000_000,
      label: 'Monthly trading volume ($)',
      icon: TrendingUp,
      format: (v: number) => `$${formatNumber(v)}`,
      requiresTier: 'Pro' as TierName,
    },
    earnAllocation: {
      min: 0,
      max: 10_000_000,
      step: 1000,
      label: 'Earn allocation ($)',
      icon: Wallet,
      format: (v: number) => `$${formatNumber(v)}`,
      requiresTier: 'Pro' as TierName,
    },
    strategies: {
      min: 0,
      max: 20,
      step: 1,
      label: 'Configurable strategies',
      icon: Cpu,
      format: (v: number) => v.toString(),
      requiresTier: 'Pro' as TierName,
    },
  };

  const handlePresetSelect = (preset: typeof presets[0]) => {
    setMetrics(preset.metrics);
  };

  const tierColors: Record<TierName, string> = {
    Lite: 'text-slate-300',
    Pro: 'text-emerald-400',
    Ultra: 'text-immix-blue',
    Enterprise: 'text-amber-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-immix-dark/80 border border-white/10 p-6 lg:p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-immix-blue/20">
            <Calculator className="text-immix-blue" size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-bold">Usage Calculator</h3>
            <p className="text-white/60 text-sm">Estimate your monthly pay-as-you-go costs</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {presets.map((preset) => (
          <button
            key={preset.name}
            onClick={() => handlePresetSelect(preset)}
            className={`px-4 py-2 text-sm border transition-all ${
              JSON.stringify(metrics) === JSON.stringify(preset.metrics)
                ? 'bg-immix-blue/20 border-immix-blue text-white'
                : 'bg-white/5 border-white/10 text-white/60 hover:border-white/30 hover:text-white'
            }`}
          >
            {preset.name}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          {(Object.keys(sliderConfig) as Array<keyof typeof sliderConfig>).map((key) => {
            const config = sliderConfig[key];
            const Icon = config.icon;
            const value = metrics[key as keyof UsageMetrics] as number;
            const percentage = Math.min(100, ((value - config.min) / (config.max - config.min)) * 100);
            const requiresTier = 'requiresTier' in config ? config.requiresTier : null;

            return (
              <div key={key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon size={16} className="text-white/50" />
                    <span className="text-sm text-white/70">{config.label}</span>
                    {requiresTier && (
                      <span className={`text-xs px-1.5 py-0.5 border ${
                        requiresTier === 'Pro' ? 'border-emerald-500/30 text-emerald-400' : 'border-immix-blue/30 text-immix-blue'
                      }`}>
                        {requiresTier}+
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-immix-blue font-semibold text-sm">
                    {config.format(value)}
                  </span>
                </div>
                <div className="relative">
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-immix-blue to-immix-blue-light"
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <input
                    type="range"
                    min={config.min}
                    max={config.max}
                    step={config.step}
                    value={value}
                    onChange={(e) =>
                      setMetrics((prev) => ({ ...prev, [key]: Number(e.target.value) }))
                    }
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            );
          })}

          <div className="pt-4 border-t border-white/10">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={metrics.needsTransfers}
                onChange={(e) => setMetrics((prev) => ({ ...prev, needsTransfers: e.target.checked }))}
                className="w-4 h-4 accent-immix-blue"
              />
              <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                Transfers product access
              </span>
              <span className="text-xs px-1.5 py-0.5 border border-immix-blue/30 text-immix-blue">
                Ultra+
              </span>
            </label>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-immix-darker/60 border border-immix-blue/20 p-6 space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-white/60">Recommended tier</span>
              <span className={`font-bold text-lg ${tierColors[estimation.recommendedTier]}`}>
                {estimation.recommendedTier}
              </span>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-white/50">Platform fee</span>
                <span className="font-mono">{formatCurrency(estimation.platformFee)}</span>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-1">
                  <span className="text-white/50">Message costs</span>
                  <div className="group relative">
                    <Info size={12} className="text-white/30 cursor-help" />
                    <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-immix-dark border border-white/20 px-3 py-2 text-xs text-white/70 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      ${tierPricing[estimation.recommendedTier].messageRate}/message
                    </div>
                  </div>
                </div>
                <span className="font-mono">{formatCurrency(estimation.messageCost)}</span>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-1">
                  <span className="text-white/50">Bandwidth costs</span>
                  <div className="group relative">
                    <Info size={12} className="text-white/30 cursor-help" />
                    <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-immix-dark border border-white/20 px-3 py-2 text-xs text-white/70 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      ${tierPricing[estimation.recommendedTier].bandwidthRate}/GB
                    </div>
                  </div>
                </div>
                <span className="font-mono">{formatCurrency(estimation.bandwidthCost)}</span>
              </div>
              {estimation.tradingCost > 0 && (
                <div className="flex justify-between">
                  <span className="text-white/50">Trading fees ({estimation.tradingBps} bps)</span>
                  <span className="font-mono">{formatCurrency(estimation.tradingCost)}</span>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <DollarSign size={18} className="text-immix-blue" />
                <span className="font-semibold">Estimated monthly</span>
              </div>
              <span className="text-2xl font-bold font-mono text-immix-blue">
                {formatCurrency(estimation.totalEstimate)}
              </span>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-4 space-y-2">
            <h4 className="text-sm font-semibold text-white/80">Tier includes:</h4>
            <ul className="text-xs text-white/50 space-y-1">
              {estimation.recommendedTier === 'Lite' && (
                <>
                  <li>View-only Markets and Trade Workspaces</li>
                  <li>Read-only market data API</li>
                  <li>Python SDK access</li>
                </>
              )}
              {estimation.recommendedTier === 'Pro' && (
                <>
                  <li>Full trading capabilities</li>
                  <li>1 configurable strategy</li>
                  <li>Earn product (up to $10K allocation)</li>
                </>
              )}
              {estimation.recommendedTier === 'Ultra' && (
                <>
                  <li>Transfers product access</li>
                  <li>2 configurable strategies</li>
                  <li>Earn product (up to $100K allocation)</li>
                </>
              )}
              {estimation.recommendedTier === 'Enterprise' && (
                <>
                  <li>Unlimited strategies</li>
                  <li>Earn product (up to $10M allocation)</li>
                  <li>All SDKs (Java, Rust, Go, C++)</li>
                </>
              )}
            </ul>
          </div>

          <p className="text-xs text-white/40 text-center">
            Pay-as-you-go pricing with minimum platform commitment.
            <br />
            Enterprise customers receive volume discounts. Contact sales for custom quotes.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

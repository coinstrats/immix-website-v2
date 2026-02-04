import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, Zap, DollarSign } from 'lucide-react';

interface UsageMetrics {
  messagesPerDay: number;
  monthlyVolume: number;
  uiSeats: number;
}

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

export const UsageCalculator = () => {
  const [metrics, setMetrics] = useState<UsageMetrics>({
    messagesPerDay: 5_000_000,
    monthlyVolume: 100_000_000,
    uiSeats: 5,
  });

  const estimation = useMemo(() => {
    const { messagesPerDay, monthlyVolume, uiSeats } = metrics;

    let recommendedTier: 'Developer' | 'Growth' | 'Enterprise' = 'Developer';
    let baseCost = 2500;
    let bps = 2.0;

    if (messagesPerDay > 50_000_000 || monthlyVolume > 500_000_000 || uiSeats > 20) {
      recommendedTier = 'Enterprise';
      baseCost = 25000;
      bps = 0.5;
    } else if (messagesPerDay > 10_000_000 || monthlyVolume > 100_000_000 || uiSeats > 5) {
      recommendedTier = 'Growth';
      baseCost = 8500;
      bps = 1.0;
    }

    const volumeCost = (monthlyVolume * bps) / 10000;
    const seatCost = recommendedTier === 'Developer' ? uiSeats * 250 :
                     recommendedTier === 'Growth' ? Math.max(0, uiSeats - 5) * 250 : 0;

    const totalEstimate = baseCost + volumeCost + seatCost;

    return {
      recommendedTier,
      baseCost,
      volumeCost,
      seatCost,
      bps,
      totalEstimate,
    };
  }, [metrics]);

  const sliderConfig = {
    messagesPerDay: {
      min: 1_000_000,
      max: 100_000_000,
      step: 1_000_000,
      label: 'Messages per day',
      icon: Zap,
    },
    monthlyVolume: {
      min: 10_000_000,
      max: 1_000_000_000,
      step: 10_000_000,
      label: 'Monthly trading volume ($)',
      icon: TrendingUp,
    },
    uiSeats: {
      min: 1,
      max: 50,
      step: 1,
      label: 'UI seats',
      icon: Calculator,
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-immix-dark/80 border border-white/10 p-8 lg:p-10"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 bg-immix-blue/20">
          <Calculator className="text-immix-blue" size={24} />
        </div>
        <div>
          <h3 className="text-2xl font-bold">Usage Calculator</h3>
          <p className="text-white/60 text-sm">Estimate your monthly infrastructure costs</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        <div className="space-y-8">
          {(Object.keys(sliderConfig) as Array<keyof UsageMetrics>).map((key) => {
            const config = sliderConfig[key];
            const Icon = config.icon;
            const value = metrics[key];
            const percentage = ((value - config.min) / (config.max - config.min)) * 100;

            return (
              <div key={key} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon size={16} className="text-white/50" />
                    <span className="text-sm text-white/70">{config.label}</span>
                  </div>
                  <span className="font-mono text-immix-blue font-semibold">
                    {key === 'monthlyVolume' ? `$${formatNumber(value)}` : formatNumber(value)}
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
        </div>

        <div className="space-y-6">
          <div className="bg-immix-darker/60 border border-immix-blue/20 p-6 space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-white/60">Recommended tier</span>
              <span className={`font-bold text-lg ${
                estimation.recommendedTier === 'Enterprise' ? 'text-amber-400' :
                estimation.recommendedTier === 'Growth' ? 'text-immix-blue' : 'text-emerald-400'
              }`}>
                {estimation.recommendedTier}
              </span>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-white/50">Base platform fee</span>
                <span className="font-mono">{formatCurrency(estimation.baseCost)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Volume fees ({estimation.bps} bps)</span>
                <span className="font-mono">{formatCurrency(estimation.volumeCost)}</span>
              </div>
              {estimation.seatCost > 0 && (
                <div className="flex justify-between">
                  <span className="text-white/50">Additional UI seats</span>
                  <span className="font-mono">{formatCurrency(estimation.seatCost)}</span>
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

          <p className="text-xs text-white/40 text-center">
            Estimates are approximate. Enterprise pricing includes volume discounts.
            Contact sales for a custom quote.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

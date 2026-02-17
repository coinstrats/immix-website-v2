import { Rocket, ArrowRight, Zap, Clock, Users, DollarSign } from 'lucide-react';
import { Button } from '../ui';

const benefits = [
  { icon: Zap, label: 'Ultra-tier access' },
  { icon: Clock, label: '6-month runway' },
  { icon: Users, label: 'Dedicated onboarding' },
  { icon: DollarSign, label: 'Zero upfront cost' },
];

export const StartupCreditsBanner = () => {
  return (
    <div
      className="relative overflow-hidden border border-teal-500/30 bg-gradient-to-r from-teal-500/[0.08] via-transparent to-teal-500/[0.08]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,_var(--tw-gradient-stops))] from-teal-500/[0.12] via-transparent to-transparent" />

      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-teal-400 to-transparent" />

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-8 lg:p-10 items-center">
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-semibold tracking-wide uppercase">
            <Rocket size={14} />
            IMMIX Startup Program
          </div>

          <h3 className="text-2xl lg:text-3xl font-bold leading-tight">
            Build on institutional-grade infrastructure
            <span className="text-teal-400"> — on us.</span>
          </h3>

          <p className="text-white/55 text-sm lg:text-base leading-relaxed max-w-xl">
            Qualified startups receive $15,000 in IMMIX credits with full Ultra-tier access
            for 6 months. No commitment. No risk.
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <span
                  key={b.label}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-500/10 border border-teal-500/20 text-teal-200/80 text-xs font-medium"
                >
                  <Icon size={12} className="text-teal-400" />
                  {b.label}
                </span>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col items-center lg:items-end text-center lg:text-right space-y-5">
          <div className="space-y-1">
            <div className="text-5xl lg:text-6xl font-bold text-teal-400 animate-glow-teal tracking-tight">
              $15,000
            </div>
            <div className="text-white/40 text-sm font-medium">in platform credits</div>
          </div>

          <Button
            variant="primary"
            size="lg"
            className="w-full sm:w-auto justify-center !bg-teal-500 hover:!bg-teal-400 !shadow-none hover:!shadow-[0_0_30px_rgba(20,184,166,0.3)] group/btn"
          >
            Apply Now
            <ArrowRight
              size={16}
              className="ml-1 transition-transform group-hover/btn:translate-x-1"
            />
          </Button>

          <p className="text-xs text-white/35">
            For qualified startups — reviewed within 48 hours
          </p>
        </div>
      </div>
    </div>
  );
};

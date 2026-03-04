import { Rocket, ArrowRight, Clock, Zap, ShieldCheck } from 'lucide-react';

const perks = [
  { icon: Zap, label: '$30,000 in credits' },
  { icon: Clock, label: '6 months of Ultra' },
  { icon: ShieldCheck, label: 'Full platform access' },
];

export const StartupCreditsBanner = () => {
  return (
    <div className="relative overflow-hidden border border-white/10 bg-white/[0.02] h-full flex flex-col">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-teal-500/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-400/8 via-transparent to-transparent pointer-events-none" />

      <div className="relative flex-grow flex flex-col p-6 lg:p-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-teal-500/20 text-teal-400 border border-teal-500/20">
              <Rocket size={20} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Startup Program</h3>
              <p className="text-sm text-white/50">For early-stage companies</p>
            </div>
          </div>
          <p className="text-sm text-white/60 leading-relaxed">
            Build on institutional-grade infrastructure risk-free. Qualified startups receive full platform access to prove product-market fit.
          </p>
        </div>

        <div className="mt-6 pt-5 border-t border-white/[0.06]">
          <div className="flex flex-wrap gap-3">
            {perks.map((perk) => (
              <div
                key={perk.label}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-teal-500/[0.06] border border-teal-500/15 text-xs text-white/60"
              >
                <perk.icon size={12} className="text-teal-400/70" />
                <span>{perk.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-5">
          <a
            href="https://app.immix.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium border border-teal-500/40 text-teal-400 hover:border-teal-400 hover:bg-teal-500/10 transition-all duration-200 group/btn"
          >
            <span>Apply Now</span>
            <ArrowRight
              size={14}
              className="transition-transform group-hover/btn:translate-x-0.5"
            />
          </a>
          <p className="text-[11px] text-white/30 mt-3">
            Subject to approval. Credits valid for 6 months from activation.
          </p>
        </div>
      </div>
    </div>
  );
};

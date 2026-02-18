import { Rocket, ArrowRight } from 'lucide-react';

export const StartupCreditsBanner = () => {
  return (
    <div className="relative overflow-hidden border border-white/10 bg-white/[0.02]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/40 to-transparent" />

      <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-6">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-teal-500/10 border border-teal-500/20">
            <Rocket size={16} className="text-teal-400" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-base font-semibold text-white/90">IMMIX Startup Program</h3>
              <span className="text-teal-400 font-bold text-lg font-mono">$30,000*</span>
            </div>
            <p className="text-xs text-white/40 mt-0.5">
              in platform credits for qualified startups
            </p>
          </div>
        </div>

        <a
          href="#"
          className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium border border-teal-500/30 text-teal-400 hover:border-teal-400 hover:bg-teal-500/10 transition-all duration-200 group/btn flex-shrink-0"
        >
          <span>Apply Now</span>
          <ArrowRight
            size={14}
            className="transition-transform group-hover/btn:translate-x-0.5"
          />
        </a>
      </div>

      <div className="px-8 pb-4 -mt-1">
        <p className="text-[11px] text-white/30">
          *Equivalent to 6 months of Ultra. Subject to approval.
        </p>
      </div>
    </div>
  );
};

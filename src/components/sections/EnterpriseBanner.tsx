import { Shield, ArrowRight, Server, Code2, Database, Headphones, Lock, Gauge, TrendingUp } from 'lucide-react';

const highlights = [
  { icon: Code2, label: 'Unlimited continuous workflows' },
  { icon: TrendingUp, label: 'Earn access ($10M limit)' },
  { icon: Database, label: 'Data Lab (ClickHouse)' },
  { icon: Lock, label: 'Dedicated connectivity' },
  { icon: Gauge, label: 'Low Latency SDKs' },
  { icon: Server, label: 'White Label' },
  { icon: Headphones, label: 'Dedicated Success Manager' },
];

export const EnterpriseBanner = () => {
  return (
    <div className="relative overflow-hidden border border-white/10 bg-white/[0.02] h-full flex flex-col">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-400/8 via-transparent to-transparent pointer-events-none" />

      <div className="relative flex-grow flex flex-col p-6 lg:p-8">
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-500/20 text-amber-400">
                <Shield size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Enterprise</h3>
                <p className="text-sm text-white/50">Custom pricing for institutions</p>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-md">
              Unlimited scale, white-glove service, and full infrastructure control for institutions requiring the highest tier of performance and support.
            </p>
          </div>

          <a
            href="mailto:sales@immix.xyz"
            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium border border-amber-500/40 text-amber-400 hover:border-amber-400 hover:bg-amber-500/10 transition-all duration-200 group/btn flex-shrink-0 self-start"
          >
            <span>Talk to Sales</span>
            <ArrowRight
              size={14}
              className="transition-transform group-hover/btn:translate-x-0.5"
            />
          </a>
        </div>

        <div className="mt-6 pt-5 border-t border-white/[0.06]">
          <div className="flex flex-wrap gap-3">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/[0.06] border border-amber-500/15 text-xs text-white/60"
              >
                <item.icon size={12} className="text-amber-400/70" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-4">
          <p className="text-[11px] text-white/30">
            Includes everything in Ultra plus $10M+ Earn allocation, Java/Rust/C++ SDKs, full historical archive.
          </p>
        </div>
      </div>
    </div>
  );
};

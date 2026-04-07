import { Monitor, Code2, Terminal, ArrowUpRight } from 'lucide-react';
import { AnimatedElement } from '../ui';
import { HeroCodeCard } from '../ui/HeroCodeCard';

const modes = [
  {
    tier: 'No Code',
    label: 'Dashboard UI',
    icon: Monitor,
    description: 'Full operational visibility and control from day one. Configure strategies, monitor positions, and manage risk through an intuitive interface.',
  },
  {
    tier: 'Low Code',
    label: 'SDK & Webhooks',
    icon: Code2,
    description: 'Python and TypeScript SDKs with event-driven webhooks. Build custom workflows with minimal code and maximum leverage.',
  },
  {
    tier: 'Full Code',
    label: 'REST & WebSocket API',
    icon: Terminal,
    description: 'Complete programmatic control over every engine. Sub-millisecond WebSocket streams, idempotent REST endpoints, and FIX protocol support.',
  },
];

export const DeveloperSection = () => {
  return (
    <section className="py-16 px-5 md:px-12 lg:px-16 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <AnimatedElement type="fadeInUp">
            <p className="text-xs font-mono text-[#0073FF]/50 tracking-[0.2em] uppercase mb-4">
              Developer Experience
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Choose how you build.
            </h2>
          </AnimatedElement>
          <AnimatedElement type="fadeInUp" delay={0.1}>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              Start with clicks, graduate to code. Every layer of the platform is
              accessible through the interface that fits your team.
            </p>
          </AnimatedElement>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-5">
            {modes.map((mode, index) => {
              const Icon = mode.icon;
              return (
                <AnimatedElement key={mode.tier} type="fadeInUp" delay={0.1 + index * 0.1}>
                  <div className="group p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.03] transition-all duration-300">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-white/[0.05] flex items-center justify-center group-hover:bg-white/[0.08] transition-colors">
                        <Icon size={18} className="text-white/40 group-hover:text-white/60 transition-colors" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-white/25 uppercase tracking-[0.2em] block">
                          {mode.tier}
                        </span>
                        <h3 className="text-base font-semibold">{mode.label}</h3>
                      </div>
                    </div>
                    <p className="text-sm text-white/40 leading-relaxed pl-14">
                      {mode.description}
                    </p>
                  </div>
                </AnimatedElement>
              );
            })}

            <AnimatedElement type="fadeInUp" delay={0.4}>
              <div className="pl-14 pt-2">
                <a
                  href="https://docs.immix.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#0073FF] hover:text-[#3D8FFF] transition-colors"
                >
                  Read the documentation
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </AnimatedElement>
          </div>

          <AnimatedElement type="fadeInUp" delay={0.2}>
            <div className="flex justify-center lg:justify-end">
              <div className="transform scale-[1.15] origin-center">
                <HeroCodeCard />
              </div>
            </div>
          </AnimatedElement>
        </div>
      </div>
    </section>
  );
};

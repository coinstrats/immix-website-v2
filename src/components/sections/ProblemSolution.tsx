import { X, Check, ArrowRight } from 'lucide-react';
import { AnimatedElement } from '../ui';

const problems = [
  'Fragmented vendors for every exchange, custodian, and chain',
  'Manual reconciliation across disconnected systems',
  'Weeks of engineering per new integration',
  'Single points of failure with no automated recovery',
  'Compliance gaps from siloed data and audit trails',
];

const solutions = [
  'One normalized API for every venue, custodian, and protocol',
  'Automated reconciliation in a single sequenced stream',
  'New integrations live in days, not quarters',
  'Fault-tolerant cluster with ~10ms automatic failover',
  'Unified audit log with real-time compliance hooks',
];

const metrics = [
  { label: 'Connections', old: '10+ vendors', immix: '1 platform' },
  { label: 'Operations', old: 'Manual / fragile', immix: 'Automated 24/7' },
  { label: 'Availability', old: 'Best-effort', immix: '365/24/7' },
  { label: 'Time to Launch', old: 'Months', immix: 'Days' },
];

export const ProblemSolution = () => {
  return (
    <section className="py-16 px-5 md:px-12 lg:px-16 lg:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <AnimatedElement type="fadeInUp">
            <p className="text-xs font-mono text-[#0073FF]/50 tracking-[0.2em] uppercase mb-4">
              The Problem
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Digital asset operations are broken.
            </h2>
          </AnimatedElement>
          <AnimatedElement type="fadeInUp" delay={0.1}>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              Most teams cobble together dozens of point solutions.
              IMMIX replaces the patchwork with one unified platform.
            </p>
          </AnimatedElement>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          <AnimatedElement type="fadeInUp" delay={0.1}>
            <div className="p-8 rounded-xl border border-red-500/15 bg-red-500/[0.03]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <X size={16} className="text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-red-400/80">The Old Way</h3>
              </div>
              <ul className="space-y-4">
                {problems.map((problem) => (
                  <li key={problem} className="flex items-start gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400/40 flex-shrink-0" />
                    <span className="text-sm text-white/50 leading-relaxed">{problem}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedElement>

          <AnimatedElement type="fadeInUp" delay={0.2}>
            <div className="p-8 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.03]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <Check size={16} className="text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-emerald-400/80">The IMMIX Way</h3>
              </div>
              <ul className="space-y-4">
                {solutions.map((solution) => (
                  <li key={solution} className="flex items-start gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400/60 flex-shrink-0" />
                    <span className="text-sm text-white/60 leading-relaxed">{solution}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedElement>
        </div>

        <AnimatedElement type="fadeInUp" delay={0.3}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] text-center"
              >
                <p className="text-[10px] font-mono text-white/30 uppercase tracking-wider mb-3">
                  {metric.label}
                </p>
                <p className="text-xs text-red-400/60 line-through mb-2">{metric.old}</p>
                <div className="flex items-center justify-center gap-1.5">
                  <ArrowRight size={10} className="text-emerald-400/60" />
                  <p className="text-sm font-semibold text-emerald-400/80">{metric.immix}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
};

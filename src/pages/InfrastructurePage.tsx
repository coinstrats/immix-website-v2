import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { AnimatedElement } from '../components/ui';

const EcosystemMap = lazy(() =>
  import('../components/sections/EcosystemMap').then((m) => ({ default: m.EcosystemMap }))
);

export const InfrastructurePage = () => {
  return (
    <div className="min-h-screen">
      <section className="pt-32 pb-8 px-5 md:px-12 lg:px-16 lg:pt-40">
        <div className="max-w-7xl mx-auto">
          <AnimatedElement type="fadeInUp">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/60 transition-colors mb-8"
            >
              <ArrowLeft size={14} />
              Back to home
            </Link>
          </AnimatedElement>

          <AnimatedElement type="fadeInUp" delay={0.05}>
            <p className="text-xs font-mono text-[#0073FF]/50 tracking-[0.2em] uppercase mb-4">
              Infrastructure
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              The sequencer at the core.
            </h1>
          </AnimatedElement>

          <AnimatedElement type="fadeInUp" delay={0.1}>
            <p className="text-xl text-white/50 max-w-3xl leading-relaxed mb-6">
              A fault-tolerant, deterministic sequencer built for continuous
              digital asset operations. Every custodian, every venue, every
              rule — unified into one stream at microsecond latency.
            </p>
          </AnimatedElement>

          <AnimatedElement type="fadeInUp" delay={0.15}>
            <div className="flex flex-wrap gap-4">
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
      </section>

      <Suspense
        fallback={
          <div className="py-32 text-center">
            <div className="w-6 h-6 border-2 border-[#0073FF]/30 border-t-[#0073FF] rounded-full animate-spin mx-auto" />
          </div>
        }
      >
        <EcosystemMap />
      </Suspense>
    </div>
  );
};

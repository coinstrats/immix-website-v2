import { Link } from 'react-router-dom';
import { ArrowRight, Mail, Check, X, type LucideIcon } from 'lucide-react';
import { AnimatedElement, Button } from '../../components/ui';

interface Engine {
  name: string;
  description: string;
  capabilities: string[];
}

interface UseCase {
  title: string;
  description: string;
}

interface OtherSolution {
  name: string;
  href: string;
  description: string;
}

interface SolutionPageLayoutProps {
  eyebrow: string;
  headline: string;
  subheadline: string;
  icon: LucideIcon;
  audiences: string[];
  problemTitle: string;
  problems: string[];
  solutionTitle: string;
  solutions: string[];
  engines: Engine[];
  useCases: UseCase[];
  otherSolutions: OtherSolution[];
  accentColor: string;
  accentBorder: string;
  accentBg: string;
  accentText: string;
}

export const SolutionPageLayout = ({
  eyebrow,
  headline,
  subheadline,
  icon: Icon,
  audiences,
  problemTitle,
  problems,
  solutionTitle,
  solutions,
  engines,
  useCases,
  otherSolutions,
  accentColor,
  accentBorder,
  accentBg,
  accentText,
}: SolutionPageLayoutProps) => {
  return (
    <div className="min-h-screen">
      <section className="pt-32 pb-16 px-5 md:px-12 lg:px-16 lg:pt-40 lg:pb-24">
        <div className="max-w-5xl mx-auto">
          <AnimatedElement type="fadeInUp">
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-10 h-10 rounded-lg ${accentBg} flex items-center justify-center`}>
                <Icon size={20} className={accentText} />
              </div>
              <span className={`text-xs font-mono ${accentText} tracking-[0.2em] uppercase`}>
                {eyebrow}
              </span>
            </div>
          </AnimatedElement>

          <AnimatedElement type="fadeInUp" delay={0.05}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {headline}
            </h1>
          </AnimatedElement>

          <AnimatedElement type="fadeInUp" delay={0.1}>
            <p className="text-xl text-white/50 max-w-3xl leading-relaxed mb-8">
              {subheadline}
            </p>
          </AnimatedElement>

          <AnimatedElement type="fadeInUp" delay={0.15}>
            <div className="flex flex-wrap gap-2">
              {audiences.map((audience) => (
                <span
                  key={audience}
                  className="text-xs font-mono text-white/30 px-3 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02]"
                >
                  {audience}
                </span>
              ))}
            </div>
          </AnimatedElement>
        </div>
      </section>

      <section className="py-16 px-5 md:px-12 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AnimatedElement type="fadeInUp" delay={0.1}>
              <div className="p-8 rounded-xl border border-red-500/15 bg-red-500/[0.03] h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                    <X size={16} className="text-red-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-red-400/80">{problemTitle}</h3>
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
              <div className={`p-8 rounded-xl border ${accentBorder} ${accentBg} h-full`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-8 h-8 rounded-lg ${accentBg} flex items-center justify-center`}>
                    <Check size={16} className={accentText} />
                  </div>
                  <h3 className={`text-lg font-semibold ${accentText}`}>{solutionTitle}</h3>
                </div>
                <ul className="space-y-4">
                  {solutions.map((solution) => (
                    <li key={solution} className="flex items-start gap-3">
                      <div className={`mt-1.5 w-1.5 h-1.5 rounded-full ${accentText} flex-shrink-0`} />
                      <span className="text-sm text-white/60 leading-relaxed">{solution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      <section className="py-16 px-5 md:px-12 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <AnimatedElement type="fadeInUp">
            <h2 className="text-2xl md:text-3xl font-bold mb-10">Powered by</h2>
          </AnimatedElement>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {engines.map((engine, index) => (
              <AnimatedElement key={engine.name} type="fadeInUp" delay={0.1 + index * 0.1}>
                <div className="p-6 rounded-xl border border-white/[0.08] bg-white/[0.02] h-full">
                  <h3 className="text-base font-bold mb-2">{engine.name}</h3>
                  <p className="text-sm text-white/45 leading-relaxed mb-4">
                    {engine.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {engine.capabilities.map((cap) => (
                      <span
                        key={cap}
                        className="text-[10px] font-mono text-white/35 px-2 py-1 rounded-full border border-white/[0.06]"
                      >
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-5 md:px-12 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <AnimatedElement type="fadeInUp">
            <h2 className="text-2xl md:text-3xl font-bold mb-10">Use cases</h2>
          </AnimatedElement>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {useCases.map((uc, index) => (
              <AnimatedElement key={uc.title} type="fadeInUp" delay={0.1 + index * 0.08}>
                <div className={`p-6 rounded-xl border ${accentBorder} ${accentBg}`}>
                  <h3 className="text-base font-bold mb-2">{uc.title}</h3>
                  <p className="text-sm text-white/45 leading-relaxed">{uc.description}</p>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-5 md:px-12 lg:px-16">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedElement type="fadeInUp">
            <div className="p-12 rounded-2xl border border-[#0073FF]/20 bg-gradient-to-b from-[#0073FF]/[0.06] to-transparent">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to get started?
              </h2>
              <p className="text-lg text-white/50 mb-8 max-w-lg mx-auto">
                See how IMMIX can transform your operations. Start with the Startup
                Program or schedule a custom demo.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  variant="primary"
                  icon={<ArrowRight size={16} />}
                  href="https://edge.immix.xyz"
                >
                  Get Started
                </Button>
                <Button
                  variant="secondary"
                  icon={<Mail size={16} />}
                  href="mailto:sales@immix.xyz"
                >
                  Talk to Sales
                </Button>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </section>

      <section className="py-12 px-5 md:px-12 lg:px-16 pb-20">
        <div className="max-w-5xl mx-auto">
          <AnimatedElement type="fadeInUp">
            <p className="text-xs font-mono text-white/25 uppercase tracking-[0.2em] mb-6">
              Other solutions
            </p>
          </AnimatedElement>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {otherSolutions.map((sol, index) => (
              <AnimatedElement key={sol.name} type="fadeInUp" delay={0.1 + index * 0.1}>
                <Link
                  to={sol.href}
                  className="group flex items-center justify-between p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] transition-all duration-300"
                >
                  <div>
                    <h3 className="text-base font-bold mb-1 group-hover:text-white transition-colors">
                      {sol.name}
                    </h3>
                    <p className="text-sm text-white/40">{sol.description}</p>
                  </div>
                  <ArrowRight size={16} className="text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 ml-4" />
                </Link>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

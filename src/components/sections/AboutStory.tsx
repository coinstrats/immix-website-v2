import { Workflow, Brain, Zap } from 'lucide-react';
import { AnimatedElement } from '../ui';

const capabilities = [
  {
    icon: Workflow,
    title: 'Unified Workflows',
    description:
      'A single API layer that orchestrates across custodians, exchanges, and OTC desks — eliminating fragmented integrations and operational risk.',
  },
  {
    icon: Brain,
    title: 'Quantitative Foundations',
    description:
      'Built by quant traders and systems engineers who understand the precision, latency, and reliability requirements of institutional-grade finance.',
  },
  {
    icon: Zap,
    title: 'Ultra-Low Latency',
    description:
      'Event-driven architecture with sub-millisecond internal processing, co-located infrastructure, and persistent WebSocket connections for real-time data.',
  },
];

export const AboutStory = () => {
  return (
    <section className="section-wrapper">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            <AnimatedElement type="fadeInUp">
              <h2 className="text-3xl lg:text-4xl font-bold">
                Why we built IMMIX
              </h2>
              <div className="mt-4 w-16 h-[2px] bg-gradient-to-r from-immix-blue to-transparent" />
            </AnimatedElement>

            <AnimatedElement type="fadeInUp" delay={0.1}>
              <p className="text-lg text-white/60 leading-relaxed">
                Digital asset markets are fragmented. Institutions juggle dozens of custodians,
                venues, and service providers — each with different APIs, settlement processes,
                and risk profiles.
              </p>
            </AnimatedElement>

            <AnimatedElement type="fadeInUp" delay={0.2}>
              <p className="text-lg text-white/60 leading-relaxed">
                IMMIX was founded to solve this. Our co-founders spent years on institutional
                trading desks and in systems engineering, witnessing firsthand how operational
                complexity throttles performance and creates risk.
              </p>
            </AnimatedElement>

            <AnimatedElement type="fadeInUp" delay={0.3}>
              <p className="text-lg text-white/60 leading-relaxed">
                We built a programmable infrastructure layer that abstracts away this complexity,
                giving institutions a single, reliable surface to trade, transfer, and manage
                digital assets at scale.
              </p>
            </AnimatedElement>
          </div>

          <div className="space-y-6">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <AnimatedElement key={cap.title} type="fadeInUp" delay={0.1 + i * 0.1}>
                  <div className="group p-6 bg-immix-dark/50 border border-white/10 rounded-lg transition-all duration-300 hover:border-immix-blue/30 hover:bg-immix-dark/70">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-immix-blue/10 text-immix-blue rounded-lg shrink-0">
                        <Icon size={22} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-2">{cap.title}</h3>
                        <p className="text-sm text-white/50 leading-relaxed">
                          {cap.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </AnimatedElement>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

import { motion } from 'framer-motion';
import { Building2, TrendingUp, Shield, ArrowRight } from 'lucide-react';
import { AnimatedElement, Button } from '../ui';

const caseStudies = [
  {
    company: 'Global Crypto Exchange',
    industry: 'Trading Infrastructure',
    icon: TrendingUp,
    challenge: 'Managing liquidity across 15 trading pairs on 8 exchanges with sub-second execution requirements',
    solution: 'IMMIX Connect + Business Logic for real-time smart order routing and arbitrage execution',
    results: [
      '87% reduction in infrastructure costs',
      '5μs average latency across all venues',
      '$2B+ daily volume processed',
    ],
    color: 'blue' as const,
  },
  {
    company: 'Institutional Asset Manager',
    industry: 'Treasury Management',
    icon: Building2,
    challenge: 'Consolidating risk across 50+ accounts and multiple custodians while maintaining regulatory compliance',
    solution: 'IMMIX Risk Books for unified portfolio management with real-time P&L and exposure monitoring',
    results: [
      'Single view across $5B+ AUM',
      'Real-time risk consolidation',
      '99.9% reduction in reconciliation time',
    ],
    color: 'purple' as const,
  },
  {
    company: 'Digital Asset Hedge Fund',
    industry: 'Quantitative Trading',
    icon: Shield,
    challenge: 'Running multiple independent strategies with different risk profiles across the same liquidity pools',
    solution: 'IMMIX Risk Books + Sequencer for pod-shop architecture with isolated strategy execution',
    results: [
      '12 independent strategies running',
      'Zero cross-contamination between books',
      '3x increase in capital efficiency',
    ],
    color: 'blue' as const,
  },
];

export const CaseStudies = () => {
  return (
    <section className="section-wrapper">
      <div className="container-max space-y-16">
        <div className="text-center space-y-4">
          <AnimatedElement type="fadeInUp">
            <h2 className="text-4xl md:text-5xl font-bold">Trusted by institutions</h2>
          </AnimatedElement>
          <AnimatedElement type="fadeInUp" delay={0.1}>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              See how organizations use IMMIX to power their digital asset infrastructure
            </p>
          </AnimatedElement>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, i) => {
            const Icon = study.icon;
            const borderColor = study.color === 'blue' ? 'border-immix-blue/30' : 'border-immix-purple/30';
            const iconColor = study.color === 'blue' ? 'text-immix-blue' : 'text-immix-purple';
            const bgColor = study.color === 'blue' ? 'bg-immix-blue/5' : 'bg-immix-purple/5';

            return (
              <div
                key={study.company}
                className={`relative p-6 rounded-lg border ${borderColor} bg-immix-dark/40 backdrop-blur hover:bg-immix-dark/60 transition-colors group`}
              >
                <div className={`inline-flex p-3 rounded-lg ${bgColor} border ${borderColor} mb-4`}>
                  <Icon className={iconColor} size={24} />
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{study.company}</h3>
                    <p className="text-xs text-white/50 font-mono uppercase tracking-wider">{study.industry}</p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-1">Challenge</p>
                      <p className="text-sm text-white/60 leading-relaxed">{study.challenge}</p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-1">Solution</p>
                      <p className="text-sm text-white/60 leading-relaxed">{study.solution}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <p className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-3">Key Results</p>
                    <div className="space-y-2">
                      {study.results.map((result, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${study.color === 'blue' ? 'bg-immix-blue' : 'bg-immix-purple'} mt-1.5`} />
                          <p className="text-sm text-white/80">{result}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    className={`inline-flex items-center gap-2 ${iconColor} text-sm font-mono hover:gap-3 transition-all mt-4`}
                    whileHover={{ x: 4 }}
                  >
                    Read case study <ArrowRight size={14} />
                  </motion.button>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="text-center pt-8"
        >
          <p className="text-white/60 mb-6">Ready to build your own success story?</p>
          <Button variant="primary" size="lg">
            Schedule a Demo
          </Button>
        </div>
      </div>
    </section>
  );
};

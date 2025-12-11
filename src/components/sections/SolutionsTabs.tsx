import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Briefcase,
  Zap,
  TrendingUp,
  Network,
  Building2,
  Landmark,
  Vault,
  Database,
  Brain,
  Globe2,
  Check,
  ExternalLink
} from 'lucide-react';
import { AnimatedElement, Card, Modal } from '../ui';
import { ModuleCatalogue } from './ModuleCatalogue';

const useCases = [
  {
    id: 'trading',
    title: 'Trading',
    icon: BarChart3,
    description: 'Algorithmic execution closer to the metal. Smart order routing without the overhead.',
    featured: true,
    modules: ['IMMIX Connect', 'IMMIX Business Logic', 'IMMIX Execution', 'IMMIX Optimiser', 'IMMIX Pricing Engine'],
    features: [
      'Sub-millisecond execution across 70+ venues',
      'Smart order routing with customizable logic',
      'Advanced order types: TWAP, VWAP, iceberg, spreaders',
      'Real-time portfolio optimization',
      'Consolidated risk management across accounts'
    ],
    preview: 'Trading execution dashboard with real-time order flow and venue analytics'
  },
  {
    id: 'treasury',
    title: 'Treasury',
    icon: Briefcase,
    description: 'Automate rebalancing between cold storage and exchanges 24/7.',
    featured: true,
    modules: ['IMMIX Connect', 'IMMIX Business Logic', 'IMMIX Risk Books', 'IMMIX Optimiser', 'IMMIX Visualize'],
    features: [
      'Automated rebalancing across custody solutions',
      '24/7 liquidity management and monitoring',
      'Multi-signature workflow integration',
      'Real-time risk analytics and reporting',
      'Custom dashboards for treasury operations'
    ],
    preview: 'Treasury management interface with asset allocation and rebalancing workflows'
  },
  {
    id: 'payments',
    title: 'Payments',
    icon: Zap,
    description: 'Instant fiat-to-crypto orchestration for high-volume payment rails.',
    featured: true,
    modules: ['IMMIX Connect', 'IMMIX Gateway', 'IMMIX Business Logic', 'IMMIX Pricing Engine', 'IMMIX Execution'],
    features: [
      'Instant fiat-to-crypto conversion at scale',
      'Multi-venue liquidity aggregation',
      'Automated settlement workflows',
      'Real-time FX pricing and execution',
      'High-throughput message processing'
    ],
    preview: 'Payment orchestration dashboard with transaction flow and conversion analytics'
  },
  {
    id: 'prop-trading',
    title: 'Prop Trading',
    icon: TrendingUp,
    description: 'Deploy strategies with institutional-grade infrastructure and real-time risk controls.',
    featured: false,
    modules: ['IMMIX Connect', 'IMMIX Business Logic', 'IMMIX Execution', 'IMMIX Risk Books', 'IMMIX Inference Engine', 'IMMIX Data Lab'],
    features: [
      'Deploy multiple strategies with isolated risk books',
      'AI-powered signal generation and backtesting',
      'Real-time P&L and exposure monitoring',
      'Historical data analytics at petabyte scale',
      'Custom business logic injection'
    ],
    preview: 'Prop trading interface with strategy performance metrics and risk analytics'
  },
  {
    id: 'market-making',
    title: 'Market Making',
    icon: Network,
    description: 'Provide liquidity across venues with intelligent pricing and hedging.',
    featured: false,
    modules: ['IMMIX Connect', 'IMMIX Pricing Engine', 'IMMIX Execution', 'IMMIX Optimiser', 'IMMIX Business Logic'],
    features: [
      'Real-time pricing across multiple venues',
      'Automated hedging and inventory management',
      'Sub-millisecond quote updates',
      'Cross-venue arbitrage detection',
      'Dynamic spread optimization'
    ],
    preview: 'Market making dashboard with spread analytics and inventory positions'
  },
  {
    id: 'hedge-funds',
    title: 'Hedge Funds',
    icon: Building2,
    description: 'Run multiple strategies like a pod shop with consolidated risk and reporting.',
    featured: false,
    modules: ['IMMIX Risk Books', 'IMMIX Connect', 'IMMIX Business Logic', 'IMMIX Visualize', 'IMMIX Data Lab', 'IMMIX Inference Engine'],
    features: [
      'Multi-strategy portfolio management',
      'Consolidated risk across strategies and venues',
      'Custom reporting and compliance dashboards',
      'AI-powered analytics and insights',
      'Historical performance analysis'
    ],
    preview: 'Hedge fund operations center with multi-strategy performance tracking'
  },
  {
    id: 'neobanks',
    title: 'Neobanks',
    icon: Landmark,
    description: 'Embed crypto trading and treasury services into digital banking platforms.',
    featured: false,
    modules: ['IMMIX Connect', 'IMMIX Gateway', 'IMMIX Business Logic', 'IMMIX Visualize', 'IMMIX Pricing Engine'],
    features: [
      'White-label crypto trading infrastructure',
      'Embedded treasury management',
      'Real-time pricing and execution',
      'Customizable user interfaces',
      'Seamless API integration'
    ],
    preview: 'Neobank crypto services with embedded trading and wallet management'
  },
  {
    id: 'primes',
    title: 'Prime Brokers',
    icon: Vault,
    description: 'Offer prime brokerage services with multi-venue access and consolidated reporting.',
    featured: false,
    modules: ['IMMIX Connect', 'IMMIX Risk Books', 'IMMIX Business Logic', 'IMMIX Visualize', 'IMMIX Data Lab'],
    features: [
      'Multi-client account management',
      'Cross-venue margin optimization',
      'Consolidated reporting and analytics',
      'Risk monitoring and compliance',
      'Client portal with custom dashboards'
    ],
    preview: 'Prime brokerage platform with client accounts and margin analytics'
  },
  {
    id: 'data-providers',
    title: 'Data Providers',
    icon: Database,
    description: 'Ingest, normalize, and distribute market data from 70+ venues at scale.',
    featured: false,
    modules: ['IMMIX Connect', 'IMMIX Data Lab', 'IMMIX Gateway', 'IMMIX Pricing Engine'],
    features: [
      'Normalized data from 70+ crypto venues',
      'Petabyte-scale historical analytics',
      'Real-time data distribution',
      'Custom data products and APIs',
      'High-performance message routing'
    ],
    preview: 'Data analytics platform with market data feeds and distribution'
  },
  {
    id: 'model-providers',
    title: 'Model Providers',
    icon: Brain,
    description: 'Deploy and monetize AI models for trading signals and predictive analytics.',
    featured: false,
    modules: ['IMMIX Inference Engine', 'IMMIX Data Lab', 'IMMIX Business Logic', 'IMMIX Connect', 'IMMIX Visualize'],
    features: [
      'Deploy ML models for real-time inference',
      'Access to comprehensive training data',
      'Model performance monitoring',
      'Signal distribution to clients',
      'Custom analytics and reporting'
    ],
    preview: 'AI model deployment platform with performance metrics and signal analytics'
  },
  {
    id: 'cross-border',
    title: 'Cross-Border Payments',
    icon: Globe2,
    description: 'Route international payments through crypto rails for instant settlement.',
    featured: false,
    modules: ['IMMIX Connect', 'IMMIX Gateway', 'IMMIX Business Logic', 'IMMIX Execution', 'IMMIX Pricing Engine'],
    features: [
      'Multi-corridor payment routing',
      'Instant crypto settlement',
      'FX optimization across routes',
      'Compliance and AML integration',
      'Real-time transaction tracking'
    ],
    preview: 'Cross-border payment platform with corridor analytics and settlement tracking'
  },
];

export const SolutionsTabs = () => {
  const [activeTab, setActiveTab] = useState(useCases[0].id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeUseCase = useCases.find(uc => uc.id === activeTab) || useCases[0];
  const featuredUseCases = useCases.filter(uc => uc.featured);

  return (
    <>
      <section id="solutions" className="section-wrapper">
        <div className="container-max space-y-16">
          <div className="text-center space-y-4">
            <AnimatedElement type="fadeInUp">
              <h2 className="text-4xl md:text-5xl font-bold">Solutions for every use case</h2>
            </AnimatedElement>
            <AnimatedElement type="fadeInUp" delay={0.1}>
              <p className="text-xl text-white/60 max-w-3xl mx-auto">
                Institutional-grade infrastructure for digital asset liquidity with composable modules.
                Build your edge with modular primitives.
              </p>
            </AnimatedElement>
          </div>

          <div className="space-y-8">
            <AnimatedElement type="fadeInUp" delay={0.2}>
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {useCases.map((useCase) => {
                  const Icon = useCase.icon;
                  return (
                    <motion.button
                      key={useCase.id}
                      onClick={() => setActiveTab(useCase.id)}
                      className={`
                        px-4 py-2.5 font-medium transition-all flex items-center gap-2
                        ${activeTab === useCase.id
                          ? 'bg-immix-blue text-white shadow-lg shadow-immix-blue/25'
                          : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                        }
                      `}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon size={16} />
                      {useCase.title}
                    </motion.button>
                  );
                })}
              </div>
            </AnimatedElement>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-4 bg-immix-blue/10 border border-immix-blue/30">
                      {(() => {
                        const Icon = activeUseCase.icon;
                        return <Icon className="text-immix-blue" size={32} />;
                      })()}
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold mb-2">{activeUseCase.title}</h3>
                      <p className="text-white/60 text-lg">{activeUseCase.description}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-white/50 uppercase tracking-wider">Key Features</h4>
                  {activeUseCase.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-start gap-3 p-3 bg-white/5"
                    >
                      <Check className="text-immix-blue flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-white/80">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-white/50 uppercase tracking-wider">Powered By</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeUseCase.modules.map((module) => (
                      <span
                        key={module}
                        className="px-3 py-1.5 bg-immix-blue/10 border border-immix-blue/30 text-sm font-mono text-immix-blue"
                      >
                        {module}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                key={`${activeTab}-preview`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="relative"
              >
                <Card delay={0}>
                  <div className="aspect-video bg-gradient-to-br from-immix-blue/20 to-immix-blue/5 border border-immix-blue/30 flex items-center justify-center p-8">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 mx-auto bg-immix-blue/20 flex items-center justify-center">
                        {(() => {
                          const Icon = activeUseCase.icon;
                          return <Icon className="text-immix-blue" size={32} />;
                        })()}
                      </div>
                      <p className="text-white/60 text-sm leading-relaxed max-w-md">
                        {activeUseCase.preview}
                      </p>
                      <p className="text-white/40 text-xs font-mono">
                        Preview Coming Soon
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-4"
          >
            <p className="text-white/50">
              Want to see all available modules?
            </p>
            <motion.button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-immix-blue/10 border border-immix-blue/30 text-immix-blue font-medium hover:bg-immix-blue/20 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Full Module Catalogue
              <ExternalLink size={16} />
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center pt-8 border-t border-white/10"
          >
            <p className="text-white/40 text-sm font-mono">
              Pay as you grow. Platform fee + usage-based pricing on executed volume.
            </p>
          </motion.div>
        </div>
      </section>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Full Module Catalogue"
      >
        <ModuleCatalogue />
      </Modal>
    </>
  );
};

import { motion } from 'framer-motion';
import { Globe, Terminal, Shield, LayoutDashboard, Database, Workflow, TrendingUp, Cpu, Activity, Gauge } from 'lucide-react';
import { Card, AnimatedElement } from '../ui';

const products = [
  {
    title: 'IMMIX Connect',
    description: 'Universal Gateway. One API for 70+ venues.',
    icon: Globe,
    delay: 0,
  },
  {
    title: 'IMMIX Business Logic',
    description: 'The Sequencer. Inject custom business logic into the execution layer.',
    icon: Terminal,
    delay: 0.1,
  },
  {
    title: 'IMMIX Execution',
    description: 'Seamlessly access multi-venue order types including spreader, TWAP, VWAP, iceberg and conditionals.',
    icon: Activity,
    delay: 0.2,
  },
  {
    title: 'IMMIX Optimiser',
    description: 'Run complex portfolio, placement, routing and margin optimisations in real time.',
    icon: Gauge,
    delay: 0.3,
  },
  {
    title: 'IMMIX Risk Books',
    description: 'Consolidate assets across accounts. Run multiple strategies like a hedge fund pod shop.',
    icon: Shield,
    delay: 0.4,
  },
  {
    title: 'IMMIX Pricing Engine',
    description: 'Real-time pricing and valuation across all assets and venues.',
    icon: TrendingUp,
    delay: 0.5,
  },
  {
    title: 'IMMIX Inference Engine',
    description: 'Deploy AI models for intelligent decision-making and predictive analytics.',
    icon: Cpu,
    delay: 0.6,
  },
  {
    title: 'IMMIX Visualize',
    description: 'Composable UI. Build custom dashboards.',
    icon: LayoutDashboard,
    delay: 0.7,
  },
  {
    title: 'IMMIX Data Lab',
    description: 'Petabyte-scale historical analytics.',
    icon: Database,
    delay: 0.8,
  },
  {
    title: 'IMMIX Gateway',
    description: 'High-performance message bus. Consolidate internal services into the sequencer.',
    icon: Workflow,
    delay: 0.9,
  },
];

export const ProductGrid = () => {
  return (
    <section id="products" className="section-wrapper">
      <div className="container-max space-y-16">
        <div className="text-center space-y-4">
          <AnimatedElement type="fadeInUp">
            <h2 className="text-4xl md:text-5xl font-bold">Build your edge with modular primitives.</h2>
          </AnimatedElement>
          <AnimatedElement type="fadeInUp" delay={0.1}>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Institutional-grade infrastructure for digital asset liquidity. Low code and no code modules to get started quickly, with full SDK access for custom execution logic.
            </p>
          </AnimatedElement>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            const Icon = product.icon;
            return (
              <Card key={product.title} delay={product.delay}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="h-full space-y-4"
                >
                  <motion.div
                    className="inline-flex p-3 rounded-lg bg-immix-blue/10 border border-immix-blue/30"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon className="text-immix-blue" size={24} />
                  </motion.div>

                  <div>
                    <h3 className="text-lg font-bold mb-2">{product.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{product.description}</p>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <motion.a
                      href="#"
                      className="inline-flex items-center gap-2 text-immix-blue text-sm font-mono hover:gap-3 transition-all"
                      whileHover={{ x: 4 }}
                    >
                      Learn more →
                    </motion.a>
                  </div>
                </motion.div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

import { motion } from 'framer-motion';
import {
  Globe,
  Terminal,
  Shield,
  LayoutDashboard,
  Database,
  Workflow,
  TrendingUp,
  Cpu,
  Activity,
  Gauge,
  ExternalLink
} from 'lucide-react';
import { Card } from '../ui';

const modules = [
  {
    title: 'IMMIX Connect',
    description: 'Universal Gateway. One API for 70+ venues.',
    icon: Globe,
    docs: '#connect-docs',
  },
  {
    title: 'IMMIX Business Logic',
    description: 'The Sequencer. Inject custom business logic into the execution layer.',
    icon: Terminal,
    docs: '#business-logic-docs',
  },
  {
    title: 'IMMIX Execution',
    description: 'Access multi-venue order types including spreader, TWAP, VWAP, iceberg and conditionals.',
    icon: Activity,
    docs: '#execution-docs',
  },
  {
    title: 'IMMIX Optimiser',
    description: 'Run complex portfolio, placement, routing and margin optimisations in real time.',
    icon: Gauge,
    docs: '#optimiser-docs',
  },
  {
    title: 'IMMIX Risk Books',
    description: 'Consolidate assets across accounts. Run multiple strategies like a hedge fund pod shop.',
    icon: Shield,
    docs: '#risk-books-docs',
  },
  {
    title: 'IMMIX Pricing Engine',
    description: 'Real-time pricing and valuation across all assets and venues.',
    icon: TrendingUp,
    docs: '#pricing-engine-docs',
  },
  {
    title: 'IMMIX Inference Engine',
    description: 'Deploy AI models for intelligent decision-making and predictive analytics.',
    icon: Cpu,
    docs: '#inference-engine-docs',
  },
  {
    title: 'IMMIX Visualize',
    description: 'Composable UI. Build custom dashboards.',
    icon: LayoutDashboard,
    docs: '#visualize-docs',
  },
  {
    title: 'IMMIX Data Lab',
    description: 'Petabyte-scale historical analytics.',
    icon: Database,
    docs: '#data-lab-docs',
  },
  {
    title: 'IMMIX Gateway',
    description: 'High-performance message bus. Consolidate internal services into the sequencer.',
    icon: Workflow,
    docs: '#gateway-docs',
  },
];

export const ModuleCatalogue = () => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <p className="text-white/60 max-w-3xl mx-auto">
          All modules are designed to work together seamlessly. Mix and match to build your perfect infrastructure.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module, index) => {
          const Icon = module.icon;
          return (
            <Card key={module.title} delay={index * 0.05}>
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
                  <h4 className="text-lg font-bold mb-2">{module.title}</h4>
                  <p className="text-white/60 text-sm leading-relaxed">{module.description}</p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <motion.a
                    href={module.docs}
                    className="inline-flex items-center gap-2 text-immix-blue text-sm font-mono hover:gap-3 transition-all"
                    whileHover={{ x: 4 }}
                  >
                    Documentation <ExternalLink size={14} />
                  </motion.a>
                </div>
              </motion.div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

import { motion } from 'framer-motion';
import { AnimatedElement } from '../ui';

const stats = [
  {
    number: '5μs',
    label: 'Latency',
    description: 'Door-to-door execution',
  },
  {
    number: '1M+',
    label: 'Messages/Sec',
    description: 'Peak throughput',
  },
  {
    number: '99.999%',
    label: 'Uptime',
    description: 'Enterprise reliability',
  },
];

export const EngineeringStats = () => {
  return (
    <section className="section-wrapper">
      <div className="container-max">
        <div className="text-center mb-20">
          <AnimatedElement type="fadeInUp">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Infrastructure that scales</h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              Institutional-grade performance and reliability
            </p>
          </AnimatedElement>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-5xl mx-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}

              className="text-center space-y-3"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.15 + 0.2 }}
  
                className="text-6xl md:text-7xl font-bold bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent"
              >
                {stat.number}
              </motion.div>

              <div>
                <h3 className="text-lg font-semibold text-white/90 mb-1">{stat.label}</h3>
                <p className="text-white/40 text-sm">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-24 pt-16 border-t border-white/5"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-4xl mx-auto">
            {[
              { value: '70+', label: 'Venue Integrations' },
              { value: '24/7', label: 'Global Operations' },
              { value: '< 100ms', label: 'Order Execution' },
              { value: 'SOC2', label: 'Certified' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
  
                className="text-center space-y-2"
              >
                <p className="text-3xl font-bold text-immix-blue/80">{stat.value}</p>
                <p className="text-xs text-white/40 uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

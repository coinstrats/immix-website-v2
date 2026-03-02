import { motion } from 'framer-motion';
import { AnimatedElement } from '../ui';

const stats = [
  { value: 'Est. 2023', label: 'Founded' },
  { value: 'London', label: 'Headquarters' },
  { value: '$20B+', label: 'Volume Processed' },
];

export const AboutHero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pb-28 px-5 md:px-12 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ top: ['5%', '15%', '5%'], right: ['15%', '8%', '15%'] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute w-80 h-80 bg-immix-blue/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ bottom: ['5%', '15%', '5%'], left: ['10%', '5%', '10%'] }}
          transition={{ duration: 12, repeat: Infinity, delay: 2 }}
          className="absolute w-96 h-96 bg-immix-blue/3 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        <AnimatedElement type="fadeInUp" delay={0.1}>
          <p className="text-immix-blue font-mono text-sm uppercase tracking-widest mb-6">
            About IMMIX
          </p>
        </AnimatedElement>

        <AnimatedElement type="fadeInUp" delay={0.2}>
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-8">
            Building the backbone of{' '}
            <span className="gradient-text">institutional digital finance</span>
          </h1>
        </AnimatedElement>

        <AnimatedElement type="fadeInUp" delay={0.3}>
          <p className="text-xl lg:text-2xl text-white/60 leading-relaxed max-w-3xl mx-auto mb-16">
            IMMIX is the programmable infrastructure layer that unifies custodians, exchanges,
            and business logic into fault-tolerant workflows for the world's most demanding
            financial institutions.
          </p>
        </AnimatedElement>

        <AnimatedElement type="fadeInUp" delay={0.4}>
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl lg:text-3xl font-bold text-immix-blue mb-2">
                  {stat.value}
                </div>
                <p className="text-xs lg:text-sm text-white/50 font-mono uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
};

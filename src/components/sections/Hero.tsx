import { motion } from 'framer-motion';
import { TrendingUp, BookOpen } from 'lucide-react';
import { Button, AnimatedElement } from '../ui';
import { HeroCodeCard } from '../ui/HeroCodeCard';

export const Hero = () => {
  return (
    <section className="pt-32 pb-16 px-6 md:px-12 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            top: ['0%', '10%', '0%'],
            right: ['10%', '5%', '10%'],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute w-72 h-72 bg-immix-blue/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            bottom: ['0%', '10%', '0%'],
            left: ['10%', '5%', '10%'],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute w-96 h-96 bg-immix-blue/5 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-8">
          <AnimatedElement type="fadeInUp" delay={0.1}>
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              Programmable
              <br />
              <span className="gradient-text">Digital Asset Infrastructure</span>
            </h1>
          </AnimatedElement>

          <AnimatedElement type="fadeInUp" delay={0.3}>
            <p className="text-xl text-white/70 leading-relaxed max-w-lg">
              Connect custodians, venues, private data and custom logic into a single, fault-tolerant workflow for trading, treasury, and payments.
            </p>
          </AnimatedElement>

          <AnimatedElement type="fadeInUp" delay={0.4}>
            <div className="flex flex-col md:flex-row gap-3">
              <Button variant="primary" size="md" icon={<TrendingUp size={18} />} href="https://app.immix.xyz">
                Get Started
              </Button>
              <Button variant="secondary" size="md" icon={<BookOpen size={18} />} href="https://docs.immix.xyz/core/introduction">
                Read the Docs
              </Button>
            </div>
          </AnimatedElement>

          <AnimatedElement type="fadeInUp" delay={0.5}>
            <div className="pt-12 space-y-4">
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <div className="text-3xl lg:text-4xl font-bold text-immix-blue mb-2">$20B+</div>
                  <p className="text-sm text-white/60 font-mono uppercase tracking-wider">Processed</p>
                </div>
                <div>
                  <div className="text-3xl lg:text-4xl font-bold text-immix-blue mb-2">10K+</div>
                  <p className="text-sm text-white/60 font-mono uppercase tracking-wider">Instruments</p>
                </div>
                <div>
                  <div className="text-3xl lg:text-4xl font-bold text-immix-blue mb-2">365/24/7</div>
                  <p className="text-sm text-white/60 font-mono uppercase tracking-wider">Uptime</p>
                </div>
              </div>
            </div>
          </AnimatedElement>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative hidden lg:block h-[560px] overflow-visible"
        >
          <div className="relative h-full w-[200%] -mr-[100%]">
            <img
              src="/screenshot-3.webp"
              alt="IMMIX Analytics Dashboard"
              className="absolute -top-4 left-20 h-[520px] w-auto max-w-none object-cover rounded-lg z-[1] opacity-90"
              style={{ objectPosition: 'left top' }}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              viewport={{ once: true }}
              className="absolute top-10 left-0 z-[2]"
            >
              <img
                src="/screenshot-4.webp"
                alt="IMMIX Multi-Asset Trading Workspace"
                className="h-[440px] w-auto max-w-none object-cover rounded-lg shadow-2xl"
                style={{ objectPosition: 'left top', boxShadow: '0 0 60px 15px rgba(0, 115, 255, 0.12), 0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
              />
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/60 via-10% to-transparent pointer-events-none z-[3]" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent from-60% to-[#050505] pointer-events-none z-[3]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 via-20% to-transparent pointer-events-none z-[3]" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/30 via-transparent to-transparent pointer-events-none z-[3]" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="absolute -bottom-8 -left-8 z-[5]"
            >
              <HeroCodeCard />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

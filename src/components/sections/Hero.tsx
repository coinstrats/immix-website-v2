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

      <div className="absolute inset-0 lg:hidden pointer-events-none overflow-hidden">
        <img
          src="/hero-platform-showcase.png"
          alt=""
          className="w-[140%] max-w-none h-auto opacity-[0.12] -translate-x-[10%] translate-y-[15%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/30 via-[#050505]/50 to-[#050505]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
          <div className="space-y-8 relative z-10">
            <AnimatedElement type="fadeInUp" delay={0.1}>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Programmable
                <br />
                <span className="gradient-text">Digital Asset Infrastructure</span>
              </h1>
            </AnimatedElement>

            <AnimatedElement type="fadeInUp" delay={0.3}>
              <p className="text-xl text-white/70 leading-relaxed max-w-lg">
                The programmable operating system for institutional digital assets. Unify custodians, venues, and custom logic into fault-tolerant trading, treasury, and payment workflows—accessible via high-performance APIs and SDKs ready for your AI agents.
              </p>
            </AnimatedElement>

            <AnimatedElement type="fadeInUp" delay={0.4}>
              <div className="flex flex-row gap-3">
                <Button variant="primary" size="sm" icon={<TrendingUp size={16} />} href="https://app.immix.xyz" className="lg:!px-6 lg:!py-3 lg:!text-base">
                  Get Started
                </Button>
                <Button variant="secondary" size="sm" icon={<BookOpen size={16} />} href="https://docs.immix.xyz/core/introduction" className="lg:!px-6 lg:!py-3 lg:!text-base">
                  Read the Docs
                </Button>
              </div>
            </AnimatedElement>

            <AnimatedElement type="fadeInUp" delay={0.5}>
              <div className="pt-4 lg:pt-12 space-y-4">
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
                    <div className="text-3xl lg:text-4xl font-bold text-immix-blue mb-2">99.99%</div>
                    <p className="text-sm text-white/60 font-mono uppercase tracking-wider">Uptime</p>
                  </div>
                </div>
              </div>
            </AnimatedElement>
          </div>

          <div className="relative hidden lg:block overflow-visible">
            <div className="relative w-[160%]">
              <img
                src="/hero-platform-showcase.png"
                alt="IMMIX Multi-Asset Trading Workspace"
                className="w-full h-auto block rounded-lg"
                style={{ boxShadow: '0 0 80px 20px rgba(0, 115, 255, 0.08), 0 25px 50px -12px rgba(0, 0, 0, 0.6)' }}
              />

              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent pointer-events-none z-[1]" />
              <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#050505] to-transparent pointer-events-none z-[1]" />

              <div className="absolute -bottom-8 -left-8 z-[5]">
                <HeroCodeCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

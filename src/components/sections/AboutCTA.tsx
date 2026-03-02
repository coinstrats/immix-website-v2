import { TrendingUp, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedElement, Button } from '../ui';

export const AboutCTA = () => {
  return (
    <section className="section-wrapper">
      <div className="container-max">
        <AnimatedElement type="fadeInUp">
          <div className="relative overflow-hidden rounded-lg border border-immix-blue/20 bg-gradient-to-br from-immix-dark via-immix-dark/80 to-immix-blue/5 p-12 lg:p-16 text-center">
            <motion.div
              animate={{ x: ['0%', '100%'] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="absolute top-0 left-0 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-immix-blue/40 to-transparent"
            />
            <motion.div
              animate={{ x: ['100%', '0%'] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              className="absolute bottom-0 right-0 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-immix-blue/40 to-transparent"
            />

            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to build on IMMIX?
            </h2>
            <p className="text-lg text-white/50 max-w-xl mx-auto mb-10">
              Whether you're a fund, a fintech, or an institution exploring digital assets
              — we'd like to hear from you.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="primary"
                icon={<TrendingUp size={18} />}
                href="https://app.immix.xyz"
              >
                Get Started
              </Button>
              <Button
                variant="secondary"
                icon={<Users size={18} />}
                href="https://immix.notion.site/Careers-8a8e66223c1c4c8cbae9495f99d66840"
              >
                View Open Roles
              </Button>
            </div>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
};

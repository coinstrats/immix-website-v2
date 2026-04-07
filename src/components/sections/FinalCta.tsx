import { ArrowRight, Mail } from 'lucide-react';
import { AnimatedElement, Button } from '../ui';

export const FinalCta = () => {
  return (
    <section className="py-20 px-5 md:px-12 lg:px-16 lg:py-32">
      <div className="max-w-4xl mx-auto text-center">
        <AnimatedElement type="fadeInUp">
          <div className="relative p-12 md:p-16 rounded-2xl border border-[#0073FF]/20 bg-gradient-to-b from-[#0073FF]/[0.06] to-transparent overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0073FF]/[0.04] via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                Ready to unify your digital asset operations?
              </h2>

              <p className="text-lg text-white/50 max-w-xl mx-auto">
                Join the institutions building on IMMIX. Get started with our
                Startup Program or talk to our team about enterprise deployment.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight size={16} />}
                  href="https://edge.immix.xyz"
                >
                  Get Started
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  icon={<Mail size={16} />}
                  href="mailto:sales@immix.xyz"
                >
                  Talk to Sales
                </Button>
              </div>

              <p className="text-xs font-mono text-white/25 pt-4">
                Founding terms available through June 30, 2026
              </p>
            </div>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
};

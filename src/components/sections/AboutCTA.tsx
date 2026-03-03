import { TrendingUp, Users } from 'lucide-react';
import { AnimatedElement, Button } from '../ui';

export const AboutCTA = () => {
  return (
    <section className="section-wrapper">
      <div className="container-max">
        <AnimatedElement type="fadeInUp">
          <div className="rounded-lg border border-white/10 bg-immix-dark/50 p-10 lg:p-14 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold mb-3">
              Interested in joining us?
            </h2>
            <p className="text-base text-white/50 max-w-lg mx-auto mb-8">
              We're always looking for talented engineers and researchers
              who want to build the future of tokenized finance.
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

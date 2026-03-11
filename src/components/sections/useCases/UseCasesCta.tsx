import { ArrowRight } from 'lucide-react';
import { AnimatedElement, Button } from '../../ui';
import { finalCta } from './useCasesData';

export const UseCasesCta = () => {
  return (
    <section className="section-wrapper">
      <div className="container-max">
        <AnimatedElement type="fadeInUp">
          <div className="rounded-lg border border-white/10 bg-immix-dark/50 p-10 lg:p-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {finalCta.headline}
            </h2>
            <p className="text-lg text-white/60 max-w-lg mx-auto mb-10">
              {finalCta.subcopy}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="primary"
                href={finalCta.primaryCta.href}
                icon={<ArrowRight size={18} />}
              >
                {finalCta.primaryCta.label}
              </Button>
              <Button
                variant="secondary"
                href={finalCta.secondaryCta.href}
              >
                {finalCta.secondaryCta.label}
              </Button>
            </div>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
};

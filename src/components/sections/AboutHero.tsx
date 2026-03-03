import { AnimatedElement } from '../ui';

export const AboutHero = () => {
  return (
    <section className="relative pt-32 pb-12 lg:pb-16 px-5 md:px-12">
      <div className="max-w-4xl mx-auto relative z-10">
        <AnimatedElement type="fadeInUp" delay={0.1}>
          <p className="text-immix-blue font-mono text-sm uppercase tracking-widest mb-6">
            Our Team
          </p>
        </AnimatedElement>

        <AnimatedElement type="fadeInUp" delay={0.2}>
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-8">
            The API for{' '}
            <span className="gradient-text">tokenized markets</span>
          </h1>
        </AnimatedElement>

        <AnimatedElement type="fadeInUp" delay={0.3}>
          <p className="text-lg text-white/60 leading-relaxed max-w-3xl">
            IMMIX is building the programmable infrastructure layer for tokenized
            finance. Our team brings deep expertise in quantitative research,
            low-latency systems engineering, and institutional trading
            — from front-office quant desks to PhD research labs.
          </p>
        </AnimatedElement>
      </div>
    </section>
  );
};

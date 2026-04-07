import { AnimatedElement } from '../ui';

const partners = [
  { name: 'Ripple', width: 'w-20' },
  { name: 'MassMutual Ventures', width: 'w-36' },
  { name: 'Portfolio Ventures', width: 'w-32' },
  { name: 'MEXC', width: 'w-16' },
  { name: 'KuCoin', width: 'w-20' },
  { name: 'Gate.io', width: 'w-16' },
];

export const TrustBar = () => {
  return (
    <section className="py-12 px-5 md:px-12 lg:px-16">
      <div className="max-w-5xl mx-auto">
        <AnimatedElement type="fadeIn" delay={0.2}>
          <p className="text-[10px] font-mono text-white/25 tracking-[0.3em] uppercase text-center mb-8">
            Backed by & integrated with
          </p>
        </AnimatedElement>
        <AnimatedElement type="fadeIn" delay={0.3}>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-14 lg:gap-x-16">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className={`${partner.width} flex items-center justify-center grayscale opacity-30 hover:opacity-50 transition-opacity duration-300`}
              >
                <span className="text-sm font-semibold tracking-wide text-white whitespace-nowrap">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
};

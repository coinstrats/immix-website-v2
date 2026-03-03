import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { AnimatedElement } from '../ui';
import {
  featuredProducts,
  secondaryProducts,
  type IntegrationLevel,
} from './products/productData';
import { IntegrationFilter } from './products/IntegrationFilter';
import { ProductShowcase } from './products/ProductShowcase';
import { SecondaryProductCard } from './products/SecondaryProductCard';

export const ProductSolutions = () => {
  const [activeFilter, setActiveFilter] = useState<IntegrationLevel | null>(null);

  return (
    <section id="solutions" className="py-16 px-5 md:px-12 lg:px-16 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-5 mb-16 lg:mb-20">
          <AnimatedElement type="fadeInUp">
            <p className="text-xs font-mono text-[#0073FF]/50 tracking-[0.2em] uppercase mb-4">
              Land &middot; Expand &middot; Embed
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-tight">
              From data to execution
              <br className="hidden sm:block" />
              <span className="text-white/40"> to settlement.</span>
            </h2>
          </AnimatedElement>
          <AnimatedElement type="fadeInUp" delay={0.1}>
            <p className="text-base lg:text-lg text-white/45 max-w-2xl mx-auto leading-relaxed">
              Six products spanning the full digital asset lifecycle — accessible
              via dashboard, SDK, or API.
            </p>
          </AnimatedElement>
        </div>

        <AnimatedElement type="fadeInUp" delay={0.15}>
          <div className="mb-20 lg:mb-24 max-w-4xl mx-auto">
            <p className="text-xs font-mono text-white/25 tracking-wider uppercase mb-4 text-center">
              Choose how you build
            </p>
            <IntegrationFilter
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
          </div>
        </AnimatedElement>

        <div className="mb-20 lg:mb-28">
          <AnimatedElement type="fadeInUp" delay={0.05}>
            <div className="flex items-center gap-4 mb-8 lg:mb-10">
              <span className="text-xs font-mono text-white/20 tracking-widest uppercase">01</span>
              <span className="text-xs font-semibold text-[#0073FF]/60 tracking-wider uppercase">
                Available Now
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-white/[0.06] to-transparent" />
            </div>
          </AnimatedElement>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
            {featuredProducts.map((product, index) => {
              const dimmed = activeFilter !== null && !product.integrations.includes(activeFilter);
              return (
                <AnimatedElement key={product.id} type="fadeInUp" delay={0.1 + index * 0.1}>
                  <ProductShowcase product={product} dimmed={dimmed} />
                </AnimatedElement>
              );
            })}
          </div>
        </div>

        <div className="mb-20 lg:mb-28">
          <AnimatedElement type="fadeInUp" delay={0.05}>
            <div className="flex items-center gap-4 mb-8 lg:mb-10">
              <span className="text-xs font-mono text-white/20 tracking-widest uppercase">02</span>
              <span className="text-xs font-semibold text-[#0073FF]/60 tracking-wider uppercase">
                On the Roadmap
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-white/[0.06] to-transparent" />
            </div>
          </AnimatedElement>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {secondaryProducts.map((product, index) => {
              const dimmed = activeFilter !== null && !product.integrations.includes(activeFilter);
              return (
                <AnimatedElement key={product.id} type="fadeInUp" delay={0.05 + index * 0.07}>
                  <SecondaryProductCard product={product} dimmed={dimmed} />
                </AnimatedElement>
              );
            })}
          </div>
        </div>

        <AnimatedElement type="fadeInUp" delay={0.1}>
          <div className="pt-16 border-t border-white/[0.06]">
            <div className="text-center space-y-6 max-w-xl mx-auto">
              <h3 className="text-2xl lg:text-3xl font-bold text-white">
                Ready to build?
              </h3>
              <p className="text-sm text-white/40 leading-relaxed">
                Get API keys in minutes, or talk to our team about enterprise integration.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <a
                  href="#contact"
                  className="
                    inline-flex items-center gap-2 px-7 py-3.5
                    bg-[#0073FF] text-white text-sm font-semibold rounded-lg
                    hover:shadow-[0_0_30px_rgba(0,115,255,0.4)]
                    transition-all duration-300 hover:scale-[1.02]
                  "
                >
                  Get Started
                  <ArrowRight size={16} />
                </a>
                <a
                  href="#contact"
                  className="
                    inline-flex items-center gap-2 px-7 py-3.5
                    border border-white/[0.12] text-white/70 text-sm font-semibold rounded-lg
                    hover:border-white/[0.25] hover:text-white
                    transition-all duration-300
                  "
                >
                  Talk to Sales
                </a>
              </div>
            </div>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
};

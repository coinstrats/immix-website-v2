import { ArrowRight, ChevronRight } from 'lucide-react';
import { AnimatedElement } from '../ui';
import { featuredProducts, secondaryProducts, integrationModes } from './products/productData';
import { ProductShowcase } from './products/ProductShowcase';
import { SecondaryProductCard } from './products/SecondaryProductCard';

export const ProductSolutions = () => {
  return (
    <section id="solutions" className="py-16 px-5 md:px-12 lg:px-16 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-5 mb-16 lg:mb-20">
          <AnimatedElement type="fadeInUp">
            <p className="text-xs font-mono text-[#0073FF]/50 tracking-[0.2em] uppercase mb-4">
              Infrastructure
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-tight">
              Modular by design.
              <br className="hidden sm:block" />
              <span className="text-white/40"> Built for speed.</span>
            </h2>
          </AnimatedElement>
          <AnimatedElement type="fadeInUp" delay={0.1}>
            <p className="text-base lg:text-lg text-white/45 max-w-2xl mx-auto leading-relaxed">
              High-performance infrastructure for digital asset markets — connect, trade,
              earn, and settle through independent modules that work together.
            </p>
          </AnimatedElement>

          <AnimatedElement type="fadeInUp" delay={0.15}>
            <p className="text-[10px] font-mono text-white/25 tracking-[0.25em] uppercase pt-6 mb-4">
              Choose How You Build
            </p>
            <div className="relative max-w-3xl mx-auto">
              <div className="hidden sm:block absolute top-1/2 left-0 right-0 -translate-y-1/2 z-0 pointer-events-none">
                <div className="mx-auto max-w-[75%] flex items-center">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-white/[0.08]" />
                  <ChevronRight size={10} className="text-white/10 mx-0.5" />
                  <div className="flex-1 h-px bg-white/[0.08]" />
                  <ChevronRight size={10} className="text-white/10 mx-0.5" />
                  <div className="flex-1 h-px bg-gradient-to-r from-white/[0.08] via-white/[0.06] to-transparent" />
                </div>
              </div>

              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                {integrationModes.map((mode) => {
                  const ModeIcon = mode.icon;
                  return (
                    <div
                      key={mode.key}
                      className="relative text-left rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6 group hover:border-white/[0.15] hover:bg-white/[0.03] transition-all duration-300"
                    >
                      <div className="absolute top-0 left-0 right-0 h-px bg-white/[0.06]" />
                      <div className="relative">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-white/[0.05] group-hover:bg-white/[0.08] transition-colors duration-300">
                            <ModeIcon size={18} className="text-white/40 group-hover:text-white/60 transition-colors duration-300" />
                          </div>
                          <span className="text-[10px] font-mono uppercase tracking-widest text-white/20">
                            {mode.tier}
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-white/70 group-hover:text-white/90 transition-colors duration-300 block mb-1.5">
                          {mode.label}
                        </span>
                        <p className="text-xs text-white/35 leading-relaxed">
                          {mode.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </AnimatedElement>
        </div>

        <div className="mb-20 lg:mb-28">
          <AnimatedElement type="fadeInUp" delay={0.05}>
            <div className="flex items-center gap-4 mb-8 lg:mb-10">
              <span className="text-xs font-semibold text-[#0073FF]/60 tracking-wider uppercase">
                Core Products
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-white/[0.06] to-transparent" />
            </div>
          </AnimatedElement>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
            {featuredProducts.map((product, index) => (
              <AnimatedElement key={product.id} type="fadeInUp" delay={0.1 + index * 0.1}>
                <ProductShowcase product={product} />
              </AnimatedElement>
            ))}
          </div>
        </div>

        <div className="mb-20 lg:mb-28">
          <AnimatedElement type="fadeInUp" delay={0.05}>
            <div className="flex items-center gap-4 mb-8 lg:mb-10">
              <span className="text-xs font-semibold text-[#0073FF]/60 tracking-wider uppercase">
                Specialized Products
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-white/[0.06] to-transparent" />
            </div>
          </AnimatedElement>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {secondaryProducts.map((product, index) => (
              <AnimatedElement key={product.id} type="fadeInUp" delay={0.05 + index * 0.07}>
                <SecondaryProductCard product={product} />
              </AnimatedElement>
            ))}
          </div>
        </div>

        <AnimatedElement type="fadeInUp" delay={0.1}>
          <div className="pt-10 border-t border-white/[0.06]">
            <div className="flex flex-col items-center gap-4 text-center">
              <p className="text-lg font-semibold text-white/80">
                Ready to build?
              </p>
              <p className="text-sm text-white/40 max-w-md">
                Generate your API keys in minutes and start integrating.
              </p>
              <a
                href="#pricing"
                className="button-primary inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all duration-300 hover:scale-[1.02]"
              >
                View Pricing
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
};

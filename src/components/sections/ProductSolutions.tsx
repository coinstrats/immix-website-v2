import { LayoutDashboard, Code, Terminal, ArrowRight } from 'lucide-react';
import { AnimatedElement } from '../ui';
import { featuredProducts, secondaryProducts } from './products/productData';
import { ProductShowcase } from './products/ProductShowcase';
import { SecondaryProductCard } from './products/SecondaryProductCard';

const accessModes = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'SDK', icon: Code },
  { label: 'API', icon: Terminal },
];

export const ProductSolutions = () => {
  return (
    <section id="solutions" className="py-16 px-5 md:px-12 lg:px-16 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-5 mb-16 lg:mb-20">
          <AnimatedElement type="fadeInUp">
            <p className="text-xs font-mono text-[#0073FF]/50 tracking-[0.2em] uppercase mb-4">
              The Platform
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

          <AnimatedElement type="fadeInUp" delay={0.15}>
            <div className="flex items-center justify-center gap-3 pt-4">
              {accessModes.map((mode) => {
                const ModeIcon = mode.icon;
                return (
                  <span
                    key={mode.label}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-white/[0.08] bg-white/[0.03] text-[11px] font-semibold uppercase tracking-wider text-white/50"
                  >
                    <ModeIcon size={12} className="text-[#0073FF]/60" />
                    {mode.label}
                  </span>
                );
              })}
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

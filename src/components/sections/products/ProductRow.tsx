import { Check, ArrowRight } from 'lucide-react';
import type { Product, IntegrationLevel } from './productData';

interface ProductRowProps {
  product: Product;
  reversed?: boolean;
  dimmed?: boolean;
}

export function ProductRow({ product, reversed = false, dimmed = false }: ProductRowProps) {
  const Icon = product.icon;
  const Visual = product.visual;

  return (
    <div
      className={`
        transition-all duration-500
        ${dimmed ? 'opacity-25 scale-[0.99]' : 'opacity-100 scale-100'}
      `}
    >
      <div
        className={`
          grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center
        `}
      >
        <div className={`lg:col-span-5 space-y-6 ${reversed ? 'lg:order-2' : 'lg:order-1'}`}>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl ${product.accentBg} flex items-center justify-center`}>
                <Icon size={22} className={product.accentColor} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{product.name}</h3>
                <span className={`text-xs font-medium ${product.accentColor} opacity-60`}>
                  {product.clientType}
                </span>
              </div>
            </div>

            <p className="text-sm text-white/50 leading-relaxed max-w-md">
              {product.tagline}
            </p>
          </div>

          <div className="space-y-3">
            {product.capabilities.map((cap) => (
              <div key={cap} className="flex items-start gap-3">
                <Check size={14} className={`${product.accentColor} mt-0.5 flex-shrink-0 opacity-60`} />
                <span className="text-sm text-white/60 leading-snug">{cap}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-5 pt-2">
            <div className="flex items-center gap-2">
              {(['ui', 'sdk', 'api'] as IntegrationLevel[]).map((level) => {
                const supported = product.integrations.includes(level);
                return (
                  <span
                    key={level}
                    className={`
                      px-3 py-1 rounded text-[10px] font-semibold uppercase tracking-wider
                      transition-colors duration-200
                      ${supported
                        ? `${product.accentBg} ${product.accentColor}`
                        : 'bg-white/[0.03] text-white/15'
                      }
                    `}
                  >
                    {level}
                  </span>
                );
              })}
            </div>

            <a
              href="#contact"
              className={`
                inline-flex items-center gap-1.5 text-sm font-medium
                transition-all duration-200 group/link
                ${product.accentColor} opacity-70 hover:opacity-100
              `}
            >
              Learn more
              <ArrowRight
                size={14}
                className="transition-transform duration-200 group-hover/link:translate-x-0.5"
              />
            </a>
          </div>
        </div>

        <div className={`lg:col-span-7 ${reversed ? 'lg:order-1' : 'lg:order-2'}`}>
          <div className="group/visual relative">
            <div
              className={`
                relative h-[220px] sm:h-[260px] lg:h-[300px] rounded-xl
                bg-white/[0.02] border border-white/[0.06]
                overflow-hidden
                transition-all duration-500
                group-hover/visual:border-white/[0.12]
                group-hover/visual:shadow-[0_0_40px_rgba(0,115,255,0.06)]
              `}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${product.accentBg} opacity-20`} />

              <div
                className={`
                  absolute top-0 left-0 right-0 h-px
                  ${product.accentBorder.replace('border-', 'bg-').replace('/30', '/40')}
                `}
              />

              <div className="relative z-10 w-full h-full">
                <Visual />
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0a0a0a]/70 to-transparent z-20 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

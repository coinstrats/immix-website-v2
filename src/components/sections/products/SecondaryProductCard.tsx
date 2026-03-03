import { Check, ArrowRight } from 'lucide-react';
import type { Product, IntegrationLevel } from './productData';

interface SecondaryProductCardProps {
  product: Product;
}

export function SecondaryProductCard({ product }: SecondaryProductCardProps) {
  const Icon = product.icon;
  const Visual = product.visual;

  return (
    <div
      className="relative group border overflow-hidden h-full flex flex-col transition-all duration-500 border-white/[0.08] bg-white/[0.02] hover:border-white/[0.14] hover:bg-white/[0.03]"
    >
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${product.accentHex}40, transparent)` }}
      />

      <div
        className="relative h-[160px] sm:h-[180px] overflow-hidden flex-shrink-0"
        style={{ background: `${product.accentHex}04` }}
      >
        <div className="relative z-10 w-full h-full">
          <Visual />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#0a0a0a] to-transparent z-20 pointer-events-none" />
      </div>

      <div className="p-5 sm:p-6 space-y-4 flex flex-col flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 flex items-center justify-center"
              style={{ background: `${product.accentHex}12` }}
            >
              <Icon size={20} style={{ color: product.accentHex }} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{product.name}</h3>
              <span className="text-[11px] font-medium opacity-50" style={{ color: product.accentHex }}>
                {product.clientType}
              </span>
            </div>
          </div>

        </div>

        <p className="text-sm text-white/45 leading-relaxed line-clamp-2">
          {product.tagline}
        </p>

        <div className="space-y-2 flex-1">
          {product.capabilities.slice(0, 3).map((cap) => (
            <div key={cap} className="flex items-start gap-2">
              <Check
                size={12}
                className="mt-0.5 flex-shrink-0 opacity-60"
                style={{ color: product.accentHex }}
              />
              <span className="text-xs text-white/55 leading-snug">{cap}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] mt-auto">
          <div className="flex items-center gap-1.5">
            {(['ui', 'sdk', 'api'] as IntegrationLevel[]).map((level) => {
              const supported = product.integrations.includes(level);
              return (
                <span
                  key={level}
                  className={`
                    px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider
                    ${supported ? '' : 'bg-white/[0.03] text-white/15'}
                  `}
                  style={supported ? {
                    background: `${product.accentHex}12`,
                    color: product.accentHex,
                  } : undefined}
                >
                  {level}
                </span>
              );
            })}
          </div>

          <a
            href="https://app.immix.xyz"
            className="inline-flex items-center gap-1 text-xs font-medium transition-all duration-200 group/link opacity-60 hover:opacity-100"
            style={{ color: product.accentHex }}
          >
            Learn more
            <ArrowRight
              size={12}
              className="transition-transform duration-200 group-hover/link:translate-x-0.5"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

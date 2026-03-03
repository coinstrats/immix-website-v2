import { useRef, useState, useCallback } from 'react';
import { Check, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { journeyStages, allProducts, type IntegrationLevel } from './productData';
import type { Product } from './productData';

const CARD_WIDTH = 300;
const SWIPE_THRESHOLD = 50;

function getCardStyle(offset: number) {
  const absOffset = Math.abs(offset);
  if (absOffset === 0) return { scale: 1, opacity: 1, zIndex: 30, blur: 0, translateX: 0 };
  if (absOffset === 1) return { scale: 0.88, opacity: 0.55, zIndex: 20, blur: 0, translateX: offset * 340 };
  if (absOffset === 2) return { scale: 0.78, opacity: 0.35, zIndex: 10, blur: 1, translateX: offset * 340 };
  return { scale: 0.7, opacity: 0.15, zIndex: 5, blur: 2, translateX: offset * 340 };
}

function getStageForIndex(index: number) {
  if (index < 2) return journeyStages[0];
  if (index < 4) return journeyStages[1];
  return journeyStages[2];
}

function MobileCard({
  product,
  isActive,
  dimmed,
  onClick,
}: {
  product: Product;
  isActive: boolean;
  dimmed: boolean;
  onClick: () => void;
}) {
  const Icon = product.icon;
  const Visual = product.visual;

  return (
    <div
      className={`transition-opacity duration-300 ${dimmed ? 'opacity-25' : ''}`}
      onClick={onClick}
      style={{ width: CARD_WIDTH }}
    >
      <div
        className={`
          relative h-full rounded-xl border backdrop-blur-sm
          transition-all duration-500 overflow-hidden
          ${isActive
            ? 'border-[#0073FF]/40 bg-white/[0.04] shadow-[0_0_30px_rgba(0,115,255,0.25)]'
            : 'border-white/[0.08] bg-white/[0.02] cursor-pointer'
          }
        `}
      >
        {isActive && (
          <div
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 50% 0%, rgba(0,115,255,0.08) 0%, transparent 60%)',
            }}
          />
        )}

        <div
          className={`absolute top-0 left-0 right-0 h-px transition-colors duration-500 ${
            isActive
              ? 'bg-[#0073FF]/60'
              : product.accentBorder.replace('border-', 'bg-').replace('/30', '/50')
          }`}
        />

        <div className="p-5 flex flex-col gap-4">
          <div className="flex items-center gap-3.5">
            <div className={`w-10 h-10 rounded-lg ${product.accentBg} flex items-center justify-center`}>
              <Icon size={20} className={product.accentColor} />
            </div>
            <div className="flex flex-col">
              <h3 className="text-xl font-bold text-white">{product.name}</h3>
              <span className={`text-[11px] font-medium ${product.accentColor} opacity-60`}>
                {product.clientType}
              </span>
            </div>
          </div>

          <p className="text-sm text-white/50 leading-relaxed min-h-[3rem]">
            {product.tagline}
          </p>

          <div className="space-y-2.5">
            {product.capabilities.map((cap) => (
              <div key={cap} className="flex items-start gap-2.5">
                <Check size={14} className={`${product.accentColor} mt-0.5 flex-shrink-0 opacity-60`} />
                <span className="text-sm text-white/65 leading-snug">{cap}</span>
              </div>
            ))}
          </div>

          <div
            className={`
              relative h-[140px] rounded-lg bg-white/[0.02] border border-white/[0.06]
              overflow-hidden
            `}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${product.accentBg} opacity-20`} />
            <div className="relative z-10 w-full h-full">
              <Visual />
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent z-20 pointer-events-none" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {(['ui', 'sdk', 'api'] as IntegrationLevel[]).map((level) => {
                const supported = product.integrations.includes(level);
                return (
                  <span
                    key={level}
                    className={`
                      px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider
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
              className={`inline-flex items-center gap-1 text-xs font-medium ${product.accentColor} opacity-60`}
            >
              Learn more
              <ArrowRight size={12} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

interface MobileProductStagesProps {
  activeFilter: IntegrationLevel | null;
}

export function MobileProductStages({ activeFilter }: MobileProductStagesProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const [dragOffset, setDragOffset] = useState(0);
  const isDragging = useRef(false);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    isDragging.current = true;
    setDragOffset(0);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const delta = e.touches[0].clientX - touchStartX.current;
    touchDeltaX.current = delta;
    setDragOffset(delta * 0.4);
  }, []);

  const handleTouchEnd = useCallback(() => {
    isDragging.current = false;
    const delta = touchDeltaX.current;
    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      if (delta < 0 && activeIndex < allProducts.length - 1) {
        setActiveIndex(activeIndex + 1);
      } else if (delta > 0 && activeIndex > 0) {
        setActiveIndex(activeIndex - 1);
      }
    }
    touchDeltaX.current = 0;
    setDragOffset(0);
  }, [activeIndex]);

  const currentStage = getStageForIndex(activeIndex);

  return (
    <div className="lg:hidden">
      <div className="flex items-center justify-center gap-3 mb-6">
        <span className="text-xs font-mono text-white/20 tracking-widest">
          {currentStage.number}
        </span>
        <span className="text-xs font-semibold text-[#0073FF]/60 tracking-wider uppercase">
          {currentStage.label}
        </span>
        <span className="text-xs text-white/25">--</span>
        <span className="text-xs text-white/40">{currentStage.headline}</span>
      </div>

      <div
        className="relative overflow-hidden"
        style={{ height: 580 }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute inset-0 flex items-start justify-center">
          {allProducts.map((product, i) => {
            const offset = i - activeIndex;
            const style = getCardStyle(offset);
            const translateX = style.translateX + dragOffset;
            const dimmed = activeFilter !== null && !product.integrations.includes(activeFilter);

            return (
              <div
                key={product.id}
                className="absolute"
                style={{
                  transform: `translateX(${translateX}px) scale(${style.scale})`,
                  opacity: style.opacity,
                  zIndex: style.zIndex,
                  filter: style.blur > 0 ? `blur(${style.blur}px)` : 'none',
                  transition: isDragging.current ? 'none' : 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)',
                  pointerEvents: Math.abs(offset) > 2 ? 'none' : 'auto',
                }}
              >
                <MobileCard
                  product={product}
                  isActive={i === activeIndex}
                  dimmed={dimmed}
                  onClick={() => setActiveIndex(i)}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between items-center px-4 mt-4">
        <button
          onClick={() => activeIndex > 0 && setActiveIndex(activeIndex - 1)}
          className={`flex items-center gap-1.5 transition-all duration-200 min-w-[80px] ${
            activeIndex > 0 ? 'opacity-50 hover:opacity-80' : 'opacity-0 pointer-events-none'
          }`}
        >
          <ChevronLeft size={14} className="text-white/50" />
          <span className="text-xs font-mono text-white/50 uppercase tracking-wider">
            {activeIndex > 0 ? allProducts[activeIndex - 1].name : ''}
          </span>
        </button>

        <div className="flex items-center gap-1.5">
          {allProducts.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? 'w-6 h-1.5 bg-[#0073FF]/80'
                  : 'w-1.5 h-1.5 bg-white/15 hover:bg-white/30'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => activeIndex < allProducts.length - 1 && setActiveIndex(activeIndex + 1)}
          className={`flex items-center gap-1.5 transition-all duration-200 min-w-[80px] justify-end ${
            activeIndex < allProducts.length - 1 ? 'opacity-50 hover:opacity-80' : 'opacity-0 pointer-events-none'
          }`}
        >
          <span className="text-xs font-mono text-white/50 uppercase tracking-wider">
            {activeIndex < allProducts.length - 1 ? allProducts[activeIndex + 1].name : ''}
          </span>
          <ChevronRight size={14} className="text-white/50" />
        </button>
      </div>
    </div>
  );
}

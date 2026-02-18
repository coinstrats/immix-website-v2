import { useRef, useState, useCallback } from 'react';
import {
  BarChart3,
  Link,
  ArrowRightLeft,
  CreditCard,
  TrendingUp,
  FlaskConical,
  ChevronLeft,
  ChevronRight,
  Check,
  LayoutDashboard,
  Code,
  Terminal,
} from 'lucide-react';
import { AnimatedElement } from '../ui';
import { MarketsVisual } from '../ui/MarketsVisual';
import { ConnectVisual } from '../ui/ConnectVisual';
import { TradeVisual } from '../ui/TradeVisual';
import { PayVisual } from '../ui/PayVisual';
import { EarnVisual } from '../ui/EarnVisual';
import { LabVisual } from '../ui/LabVisual';

type IntegrationLevel = 'ui' | 'sdk' | 'api';

interface Product {
  id: string;
  name: string;
  icon: React.ElementType;
  tagline: string;
  capabilities: string[];
  integrations: IntegrationLevel[];
  accentColor: string;
  accentBg: string;
  accentBorder: string;
  visual: React.ComponentType;
}

const products: Product[] = [
  {
    id: 'connect',
    name: 'Connect',
    icon: Link,
    tagline: 'One API to the full digital asset ecosystem \u2014 crypto, tokenized commodities, stocks, ETFs, and money market funds.',
    capabilities: [
      'REST, WebSocket & FIX protocols',
      'Crypto & tokenized RWAs',
      'Tokenized ETFs & money markets',
      'Unified streaming & trading',
    ],
    integrations: ['sdk', 'api'],
    accentColor: 'text-cyan-400',
    accentBg: 'bg-cyan-500/10',
    accentBorder: 'border-cyan-500/30',
    visual: ConnectVisual,
  },
  {
    id: 'trade',
    name: 'Trade',
    icon: ArrowRightLeft,
    tagline: 'Advanced order types and algos across CeFi, DeFi and RWAs \u2014 from multi-leg spreads to continuous hedging.',
    capabilities: [
      'Multi-leg spreads & portfolio rebalancing',
      'Market making & smart order routing',
      'Continuous hedging of staking rewards',
      'CeFi, DeFi & RWA execution',
    ],
    integrations: ['ui', 'sdk', 'api'],
    accentColor: 'text-emerald-400',
    accentBg: 'bg-emerald-500/10',
    accentBorder: 'border-emerald-500/30',
    visual: TradeVisual,
  },
  {
    id: 'earn',
    name: 'Earn',
    icon: TrendingUp,
    tagline: 'Yield-bearing strategies exploiting secondary market dislocations for USD stablecoins.',
    capabilities: [
      'Continuous yield strategies',
      'Stablecoin dislocation capture',
      'BTC, ETH & XRP yield coming soon',
      'Automated position management',
    ],
    integrations: ['ui', 'api'],
    accentColor: 'text-sky-400',
    accentBg: 'bg-sky-500/10',
    accentBorder: 'border-sky-500/30',
    visual: EarnVisual,
  },
  {
    id: 'lab',
    name: 'Lab',
    icon: FlaskConical,
    tagline: '360-degree insight to all messages in a deterministic, real-time, fault-tolerant ordered stream.',
    capabilities: [
      'Market data, risk & trading feeds',
      'Internal analytics streams',
      'Deterministic message ordering',
      'Real-time fault-tolerant replay',
    ],
    integrations: ['ui', 'api'],
    accentColor: 'text-blue-300',
    accentBg: 'bg-blue-400/10',
    accentBorder: 'border-blue-400/30',
    visual: LabVisual,
  },
  {
    id: 'markets',
    name: 'Markets',
    icon: BarChart3,
    tagline: 'Analytics across the derivative term structure, funding rates, and arbitrage opportunities.',
    capabilities: [
      'Term structure analytics',
      'Funding rate monitoring',
      'Arbitrage opportunity detection',
      'Market-wide insights dashboard',
    ],
    integrations: ['ui', 'api'],
    accentColor: 'text-blue-400',
    accentBg: 'bg-blue-500/10',
    accentBorder: 'border-blue-500/30',
    visual: MarketsVisual,
  },
  {
    id: 'pay',
    name: 'Pay',
    icon: CreditCard,
    tagline: 'Configurable payment corridors for cross-border settlement via stablecoin transport with minimal slippage.',
    capabilities: [
      'Any source-to-target fiat corridor',
      'Stablecoin cross-border transport',
      'Smart order router for speed',
      'Configurable payment workflows',
    ],
    integrations: ['ui', 'sdk', 'api'],
    accentColor: 'text-teal-400',
    accentBg: 'bg-teal-500/10',
    accentBorder: 'border-teal-500/30',
    visual: PayVisual,
  },
];

const integrationModes = [
  {
    key: 'ui' as IntegrationLevel,
    label: 'No-Code',
    icon: LayoutDashboard,
    description: 'Point and click. Configure in the UI.',
  },
  {
    key: 'sdk' as IntegrationLevel,
    label: 'SDK',
    icon: Code,
    description: 'Python, Java, Rust & C++ libraries.',
  },
  {
    key: 'api' as IntegrationLevel,
    label: 'API',
    icon: Terminal,
    description: 'REST, WebSocket & FIX protocols.',
  },
];

const DEFAULT_CENTER = 1;
const CARD_WIDTH_DESKTOP = 340;
const CARD_WIDTH_MOBILE = 300;
const CARD_SPACING = 360;
const SWIPE_THRESHOLD = 50;

function getCardStyle(offset: number) {
  const absOffset = Math.abs(offset);

  if (absOffset === 0) {
    return {
      scale: 1,
      opacity: 1,
      zIndex: 30,
      blur: 0,
      translateX: 0,
    };
  }
  if (absOffset === 1) {
    return {
      scale: 0.88,
      opacity: 0.55,
      zIndex: 20,
      blur: 0,
      translateX: offset * CARD_SPACING,
    };
  }
  if (absOffset === 2) {
    return {
      scale: 0.78,
      opacity: 0.35,
      zIndex: 10,
      blur: 1,
      translateX: offset * CARD_SPACING,
    };
  }
  return {
    scale: 0.7,
    opacity: 0.15,
    zIndex: 5,
    blur: 2,
    translateX: offset * CARD_SPACING,
  };
}

function ProductCard({
  product,
  isActive,
  onClick,
  cardWidth,
}: {
  product: Product;
  isActive: boolean;
  onClick: () => void;
  cardWidth: number;
}) {
  const Icon = product.icon;
  const Visual = product.visual;

  return (
    <div
      className="group"
      onClick={onClick}
      style={{ width: cardWidth }}
    >
      <div
        className={`
          relative h-full rounded-xl border backdrop-blur-sm
          transition-all duration-500
          overflow-hidden
          ${isActive
            ? 'border-[#0073FF]/40 bg-white/[0.04] shadow-[0_0_30px_rgba(0,115,255,0.25),0_0_60px_rgba(0,115,255,0.1)]'
            : 'border-white/[0.08] bg-white/[0.02] cursor-pointer hover:border-white/[0.15] hover:bg-white/[0.04]'
          }
        `}
      >
        {isActive && (
          <div className="absolute inset-0 rounded-xl pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 50% 0%, rgba(0,115,255,0.08) 0%, transparent 60%)',
            }}
          />
        )}

        <div className={`absolute top-0 left-0 right-0 h-px transition-colors duration-500 ${
          isActive
            ? 'bg-[#0073FF]/60'
            : product.accentBorder.replace('border-', 'bg-').replace('/30', '/50')
        }`} />

        <div className="p-5 lg:p-6 flex flex-col gap-4 lg:gap-5">
          <div className="flex items-center gap-3.5">
            <div className={`w-10 h-10 rounded-lg ${product.accentBg} flex items-center justify-center`}>
              <Icon size={20} className={product.accentColor} />
            </div>
            <h3 className="text-xl font-bold text-white">{product.name}</h3>
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

          <div className={`
            relative h-[140px] lg:h-[160px] rounded-lg bg-white/[0.02] border border-white/[0.06]
            overflow-hidden
            transition-all duration-300 group-hover:border-white/[0.1]
          `}>
            <div className={`absolute inset-0 bg-gradient-to-br ${product.accentBg} opacity-20`} />
            <div className="relative z-10 w-full h-full">
              <Visual />
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent z-20 pointer-events-none" />
          </div>

          <div className="flex items-center gap-2 pt-1">
            {(['ui', 'sdk', 'api'] as IntegrationLevel[]).map((level) => {
              const supported = product.integrations.includes(level);
              return (
                <span
                  key={level}
                  className={`
                    px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider
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
        </div>
      </div>
    </div>
  );
}

function CarouselNavLabels<T extends { name?: string; label?: string }>({
  items,
  activeIndex,
  setActiveIndex,
}: {
  items: T[];
  activeIndex: number;
  setActiveIndex: (i: number) => void;
}) {
  const prevName = activeIndex > 0 ? (items[activeIndex - 1].name || items[activeIndex - 1].label) : null;
  const nextName = activeIndex < items.length - 1 ? (items[activeIndex + 1].name || items[activeIndex + 1].label) : null;

  return (
    <div className="flex justify-between items-center px-4 mt-4">
      <button
        onClick={() => activeIndex > 0 && setActiveIndex(activeIndex - 1)}
        className={`flex items-center gap-1.5 transition-all duration-200 min-w-[80px] ${
          prevName ? 'opacity-50 hover:opacity-80' : 'opacity-0 pointer-events-none'
        }`}
        aria-label="Previous"
      >
        <ChevronLeft size={14} className="text-white/50" />
        <span className="text-xs font-mono text-white/50 uppercase tracking-wider">{prevName}</span>
      </button>

      <div className="flex items-center gap-1.5">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`rounded-full transition-all duration-300 ${
              i === activeIndex
                ? 'w-6 h-1.5 bg-[#0073FF]/80'
                : 'w-1.5 h-1.5 bg-white/15 hover:bg-white/30'
            }`}
            aria-label={`Go to item ${i + 1}`}
          />
        ))}
      </div>

      <button
        onClick={() => activeIndex < items.length - 1 && setActiveIndex(activeIndex + 1)}
        className={`flex items-center gap-1.5 transition-all duration-200 min-w-[80px] justify-end ${
          nextName ? 'opacity-50 hover:opacity-80' : 'opacity-0 pointer-events-none'
        }`}
        aria-label="Next"
      >
        <span className="text-xs font-mono text-white/50 uppercase tracking-wider">{nextName}</span>
        <ChevronRight size={14} className="text-white/50" />
      </button>
    </div>
  );
}

function DesktopCarousel({
  activeIndex,
  setActiveIndex,
}: {
  activeIndex: number;
  setActiveIndex: (i: number) => void;
}) {
  return (
    <div className="hidden lg:block relative" style={{ height: 620 }}>
      <div className="absolute inset-0 flex items-start justify-center">
        {products.map((product, i) => {
          const offset = i - activeIndex;
          const style = getCardStyle(offset);

          return (
            <div
              key={product.id}
              className="absolute"
              style={{
                transform: `translateX(${style.translateX}px) scale(${style.scale})`,
                opacity: style.opacity,
                zIndex: style.zIndex,
                filter: style.blur > 0 ? `blur(${style.blur}px)` : 'none',
                transition: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)',
                pointerEvents: Math.abs(offset) > 2 ? 'none' : 'auto',
              }}
            >
              <ProductCard
                product={product}
                isActive={i === activeIndex}
                onClick={() => setActiveIndex(i)}
                cardWidth={CARD_WIDTH_DESKTOP}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MobileCarousel({
  activeIndex,
  setActiveIndex,
}: {
  activeIndex: number;
  setActiveIndex: (i: number) => void;
}) {
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
      if (delta < 0 && activeIndex < products.length - 1) {
        setActiveIndex(activeIndex + 1);
      } else if (delta > 0 && activeIndex > 0) {
        setActiveIndex(activeIndex - 1);
      }
    }

    touchDeltaX.current = 0;
    setDragOffset(0);
  }, [activeIndex, setActiveIndex]);

  const mobileSpacing = CARD_WIDTH_MOBILE + 20;

  return (
    <div className="lg:hidden">
      <div
        className="relative overflow-hidden"
        style={{ height: 580 }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute inset-0 flex items-start justify-center">
          {products.map((product, i) => {
            const offset = i - activeIndex;
            const absOffset = Math.abs(offset);
            const baseTranslateX = offset * mobileSpacing + dragOffset;

            let scale = 1;
            let opacity = 1;
            let zIndex = 30;

            if (absOffset === 1) {
              scale = 0.85;
              opacity = 0.4;
              zIndex = 20;
            } else if (absOffset >= 2) {
              scale = 0.75;
              opacity = 0;
              zIndex = 10;
            }

            return (
              <div
                key={product.id}
                className="absolute"
                style={{
                  transform: `translateX(${baseTranslateX}px) scale(${scale})`,
                  opacity,
                  zIndex,
                  transition: isDragging.current ? 'none' : 'all 400ms cubic-bezier(0.4, 0, 0.2, 1)',
                  pointerEvents: absOffset === 0 ? 'auto' : 'none',
                }}
              >
                <ProductCard
                  product={product}
                  isActive={i === activeIndex}
                  onClick={() => setActiveIndex(i)}
                  cardWidth={CARD_WIDTH_MOBILE}
                />
              </div>
            );
          })}
        </div>
      </div>

      <CarouselNavLabels items={products} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
    </div>
  );
}

export const ProductSolutions = () => {
  const [activeIndex, setActiveIndex] = useState(DEFAULT_CENTER);

  return (
    <section id="solutions" className="section-wrapper lg:pt-[4.5rem] overflow-hidden">
      <div className="container-max space-y-8">
        <div className="text-center space-y-4">
          <AnimatedElement type="fadeInUp">
            <h2 className="text-4xl md:text-5xl font-bold">
              The full stack for digital assets.
            </h2>
            <div className="mt-4 mx-auto w-16 h-[2px] bg-gradient-to-r from-transparent via-immix-blue to-transparent" />
          </AnimatedElement>
          <AnimatedElement type="fadeInUp" delay={0.1}>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              From no-code configuration to full programmatic control — every product meets you where you are.
            </p>
          </AnimatedElement>
        </div>

        <AnimatedElement type="fadeInUp" delay={0.15}>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8">
            {integrationModes.map((mode) => {
              const ModeIcon = mode.icon;
              return (
                <div key={mode.key} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center">
                    <ModeIcon size={16} className="text-white/40" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-white/80">{mode.label}</span>
                    <p className="text-xs text-white/35">{mode.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </AnimatedElement>

        <AnimatedElement type="fadeInUp" delay={0.2} className="lg:-mx-8 lg:mt-10">
          <DesktopCarousel activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
          <MobileCarousel activeIndex={activeIndex} setActiveIndex={setActiveIndex} />

          <div className="hidden lg:flex justify-center items-center gap-3 mt-8">
            <button
              onClick={() => activeIndex > 0 && setActiveIndex(activeIndex - 1)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                activeIndex > 0 ? 'opacity-50 hover:opacity-80' : 'opacity-10 pointer-events-none'
              }`}
              aria-label="Previous card"
            >
              <ChevronLeft size={16} className="text-white/60" />
            </button>

            <div className="flex items-center gap-1.5">
              {products.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? 'w-6 h-1.5 bg-[#0073FF]/80'
                      : 'w-1.5 h-1.5 bg-white/15 hover:bg-white/30'
                  }`}
                  aria-label={`Go to ${products[i].name}`}
                />
              ))}
            </div>

            <button
              onClick={() => activeIndex < products.length - 1 && setActiveIndex(activeIndex + 1)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                activeIndex < products.length - 1 ? 'opacity-50 hover:opacity-80' : 'opacity-10 pointer-events-none'
              }`}
              aria-label="Next card"
            >
              <ChevronRight size={16} className="text-white/60" />
            </button>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
};

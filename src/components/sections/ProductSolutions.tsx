import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
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
}

const products: Product[] = [
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
  },
  {
    id: 'connect',
    name: 'Connect',
    icon: Link,
    tagline: 'One API to the full digital asset ecosystem — crypto, tokenized commodities, stocks, ETFs, and money market funds.',
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
  },
  {
    id: 'trade',
    name: 'Trade',
    icon: ArrowRightLeft,
    tagline: 'Advanced order types and algos across CeFi, DeFi and RWAs — from multi-leg spreads to continuous hedging.',
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

const CARD_WIDTH = 380;
const CARD_GAP = 20;

function ProductCard({ product, index }: { product: Product; index: number }) {
  const Icon = product.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group flex-shrink-0 snap-start"
      style={{ width: CARD_WIDTH }}
    >
      <div
        className={`
          relative h-full rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm
          transition-all duration-300
          hover:border-white/[0.15] hover:-translate-y-1
          overflow-hidden
        `}
      >
        <div className={`absolute top-0 left-0 right-0 h-px ${product.accentBorder.replace('border-', 'bg-').replace('/30', '/50')}`} />

        <div className="p-6 flex flex-col gap-5">
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
            relative h-[100px] rounded-lg bg-white/[0.03] border border-white/[0.06]
            flex items-center justify-center overflow-hidden
            transition-all duration-300 group-hover:border-white/[0.1]
          `}>
            <div className={`absolute inset-0 bg-gradient-to-br ${product.accentBg} opacity-30`} />
            <span className="text-xs text-white/20 font-mono tracking-wider uppercase relative z-10">
              Screenshot
            </span>
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
    </motion.div>
  );
}

export const ProductSolutions = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = direction === 'left' ? -(CARD_WIDTH + CARD_GAP) : CARD_WIDTH + CARD_GAP;
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <section id="solutions" className="section-wrapper overflow-hidden">
      <div className="container-max space-y-14">
        <div className="text-center space-y-4">
          <AnimatedElement type="fadeInUp">
            <h2 className="text-4xl md:text-5xl font-bold">
              The full stack for digital assets.
            </h2>
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

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto no-scrollbar pb-4"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <div className="hidden lg:flex justify-center gap-3 mt-6">
            <button
              onClick={() => scroll('left')}
              className={`
                w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.1]
                flex items-center justify-center
                hover:bg-white/[0.12] hover:border-white/[0.2]
                transition-all duration-200
                ${canScrollLeft ? 'opacity-100' : 'opacity-30 pointer-events-none'}
              `}
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} className="text-white/70" />
            </button>
            <button
              onClick={() => scroll('right')}
              className={`
                w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.1]
                flex items-center justify-center
                hover:bg-white/[0.12] hover:border-white/[0.2]
                transition-all duration-200
                ${canScrollRight ? 'opacity-100' : 'opacity-30 pointer-events-none'}
              `}
              aria-label="Scroll right"
            >
              <ChevronRight size={18} className="text-white/70" />
            </button>
          </div>
        </div>

        <AnimatedElement type="fadeInUp" delay={0.2}>
          <div className="text-center space-y-5">
            <p className="text-base text-white/40">
              Combine products to match your workflow. Pricing scales with what you use.
            </p>
            <motion.button
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="button-secondary px-6 py-3 inline-flex items-center gap-2 font-semibold"
            >
              See Pricing
            </motion.button>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
};

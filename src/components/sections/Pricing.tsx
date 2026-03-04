import { useState, useRef, useCallback, useEffect } from 'react';
import {
  Check,
  Eye,
  TrendingUp,
  ArrowLeftRight,
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Tag,
} from 'lucide-react';
import { AnimatedElement } from '../ui';
import { StartupCreditsBanner } from './StartupCreditsBanner';
import { EnterpriseBanner } from './EnterpriseBanner';

const coreTiers = [
  {
    name: 'Lite',
    icon: Eye,
    price: 'From $500',
    period: '/month',
    description: 'For analysts and teams needing view-only access to markets and data',
    features: [
      'Markets analytics dashboard',
      'View-only trade workspaces',
      'Read-only market data API',
      'Real-time data streaming',
      '7-day historical data',
      '99.9% uptime SLA',
      'Email support',
    ],
    cta: 'Get Started',
    highlighted: false,
    tierColor: 'slate' as const,
  },
  {
    name: 'Pro',
    icon: TrendingUp,
    price: 'From $2,500',
    period: '/month',
    description: 'For traders and funds ready to execute with algorithmic strategies',
    features: [
      'Everything in Lite, plus:',
      'Full trading capabilities',
      'Order execution & management',
      '1 configurable strategy',
      'Earn product ($10K allocation)',
      'Post-trade analytics',
      'Priority support (8h SLA)',
    ],
    cta: 'Get Started',
    highlighted: false,
    tierColor: 'emerald' as const,
  },
  {
    name: 'Ultra',
    icon: ArrowLeftRight,
    price: 'From $5,000',
    period: '/month',
    description: 'For institutions needing transfers, yield, and advanced automation',
    features: [
      'Everything in Pro, plus:',
      'Transfers product access',
      'Cross-chain movements',
      '2 configurable strategies',
      'Earn product ($100K allocation)',
      '1-year historical data',
      'Priority support (4h SLA)',
    ],
    cta: 'Get Started',
    highlighted: true,
    tierColor: 'blue' as const,
  },
];

const tierColorMap = {
  slate: {
    icon: 'bg-slate-500/20 text-slate-300',
    highlight: 'text-slate-300',
    accent: 'from-slate-500 to-slate-400',
    hoverShadow: 'hover:shadow-[0_0_30px_rgba(148,163,184,0.12)]',
    glow: 'from-slate-400/10 via-transparent to-transparent',
  },
  emerald: {
    icon: 'bg-emerald-500/20 text-emerald-400',
    highlight: 'text-emerald-400',
    accent: 'from-emerald-500 to-emerald-400',
    hoverShadow: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]',
    glow: 'from-emerald-400/10 via-transparent to-transparent',
  },
  blue: {
    icon: 'bg-immix-blue/20 text-immix-blue',
    highlight: 'text-immix-blue',
    accent: 'from-blue-500 to-blue-400',
    hoverShadow: 'hover:shadow-[0_0_30px_rgba(0,115,255,0.15)]',
    glow: 'from-immix-blue/10 via-transparent to-transparent',
  },
};

function PricingCard({ tier }: { tier: (typeof coreTiers)[number] }) {
  const Icon = tier.icon;
  const colors = tierColorMap[tier.tierColor];

  return (
    <div
      className={`relative p-6 flex flex-col h-full group transition-all duration-300 hover:-translate-y-1 ${colors.hoverShadow} ${
        tier.highlighted
          ? 'bg-immix-blue/10 border-2 border-immix-blue shadow-glow-lg'
          : 'bg-immix-dark/60 border border-white/10 hover:border-white/20'
      }`}
    >
      <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${colors.accent}`} />
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] ${colors.glow} pointer-events-none`} />

      {tier.highlighted && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="relative inline-flex items-center gap-1.5 px-4 py-1.5 bg-immix-blue text-white text-xs font-bold overflow-hidden">
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
            <Sparkles size={12} className="relative z-10" />
            <span className="relative z-10">MOST POPULAR</span>
          </span>
        </div>
      )}

      <div className="relative space-y-5 flex-grow flex flex-col">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 ${colors.icon}`}>
            <Icon size={22} />
          </div>
          <h3 className="text-xl font-bold">{tier.name}</h3>
        </div>

        <div className="py-4 border-b border-white/10">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">{tier.price}</span>
            <span className="text-white/60 text-sm">{tier.period}</span>
          </div>
          <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 rounded-sm">
            <Tag size={10} className="text-amber-400" />
            <span className="text-[11px] font-medium text-amber-300/90">Promo rate</span>
          </div>
          <p className="mt-3 text-sm text-white/60 leading-relaxed">{tier.description}</p>
        </div>

        <ul className="space-y-2.5 flex-grow">
          {tier.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5">
              <Check className={`flex-shrink-0 mt-0.5 ${colors.highlight}`} size={14} />
              <span className="text-[13px] text-white/70">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-5">
          <a
            href="https://app.immix.xyz"
            className={`w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium transition-all duration-200 group/btn ${
              tier.highlighted
                ? 'bg-immix-blue/15 border border-immix-blue/40 text-immix-blue hover:bg-immix-blue/25 hover:border-immix-blue/60'
                : 'border border-white/15 text-white/70 hover:border-white/30 hover:text-white/90'
            }`}
          >
            <span>{tier.cta}</span>
            <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-0.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

const CAROUSEL_CARD_WIDTH_MOBILE = 260;
const CAROUSEL_CARD_WIDTH_TABLET = 315;
const CAROUSEL_SWIPE_THRESHOLD = 50;
const CAROUSEL_DEFAULT_INDEX = 1;

function useCardWidth() {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' && window.innerWidth >= 768
      ? CAROUSEL_CARD_WIDTH_TABLET
      : CAROUSEL_CARD_WIDTH_MOBILE
  );

  const handleResize = useCallback(() => {
    setWidth(window.innerWidth >= 768 ? CAROUSEL_CARD_WIDTH_TABLET : CAROUSEL_CARD_WIDTH_MOBILE);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return width;
}

function PricingCarousel() {
  const [activeIndex, setActiveIndex] = useState(CAROUSEL_DEFAULT_INDEX);
  const startX = useRef(0);
  const deltaX = useRef(0);
  const [dragOffset, setDragOffset] = useState(0);
  const isDragging = useRef(false);
  const cardWidth = useCardWidth();
  const spacing = cardWidth + 24;

  const beginDrag = useCallback((x: number) => {
    startX.current = x;
    isDragging.current = true;
    setDragOffset(0);
  }, []);

  const moveDrag = useCallback((x: number) => {
    if (!isDragging.current) return;
    const delta = x - startX.current;
    deltaX.current = delta;
    setDragOffset(delta * 0.4);
  }, []);

  const endDrag = useCallback(() => {
    isDragging.current = false;
    const delta = deltaX.current;

    if (Math.abs(delta) > CAROUSEL_SWIPE_THRESHOLD) {
      if (delta < 0 && activeIndex < coreTiers.length - 1) {
        setActiveIndex(activeIndex + 1);
      } else if (delta > 0 && activeIndex > 0) {
        setActiveIndex(activeIndex - 1);
      }
    }

    deltaX.current = 0;
    setDragOffset(0);
  }, [activeIndex]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    beginDrag(e.touches[0].clientX);
  }, [beginDrag]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    moveDrag(e.touches[0].clientX);
  }, [moveDrag]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    beginDrag(e.clientX);
  }, [beginDrag]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    moveDrag(e.clientX);
  }, [moveDrag]);

  const handleMouseUp = useCallback(() => {
    endDrag();
  }, [endDrag]);

  const handleMouseLeave = useCallback(() => {
    if (isDragging.current) endDrag();
  }, [endDrag]);

  const containerHeight = cardWidth === CAROUSEL_CARD_WIDTH_TABLET ? 620 : 720;

  return (
    <div>
      <div
        className="relative overflow-hidden select-none"
        style={{ height: containerHeight }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={endDrag}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <div className="absolute inset-0 flex items-start justify-center pt-4">
          {coreTiers.map((tier, i) => {
            const offset = i - activeIndex;
            const absOffset = Math.abs(offset);
            const baseTranslateX = offset * spacing + dragOffset;

            let scale = 1;
            let opacity = 1;
            let zIndex = 30;

            if (absOffset === 1) {
              scale = 0.88;
              opacity = 0.45;
              zIndex = 20;
            } else if (absOffset >= 2) {
              scale = 0.78;
              opacity = 0;
              zIndex = 10;
            }

            return (
              <div
                key={tier.name}
                className="absolute"
                style={{
                  width: cardWidth,
                  transform: `translateX(${baseTranslateX}px) scale(${scale})`,
                  opacity,
                  zIndex,
                  transition: isDragging.current ? 'none' : 'all 400ms cubic-bezier(0.4, 0, 0.2, 1)',
                  pointerEvents: absOffset === 0 ? 'auto' : absOffset === 1 ? 'auto' : 'none',
                  cursor: absOffset === 1 ? 'pointer' : 'default',
                }}
                onClick={absOffset === 1 ? () => setActiveIndex(i) : undefined}
              >
                <PricingCard tier={tier} />
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between items-center px-4 mt-4 max-w-md mx-auto">
        <button
          onClick={() => activeIndex > 0 && setActiveIndex(activeIndex - 1)}
          className={`flex items-center gap-1.5 transition-all duration-200 min-w-[80px] ${
            activeIndex > 0 ? 'opacity-50 hover:opacity-80' : 'opacity-0 pointer-events-none'
          }`}
          aria-label="Previous tier"
        >
          <ChevronLeft size={14} className="text-white/50" />
          <span className="text-xs font-mono text-white/50 uppercase tracking-wider">
            {activeIndex > 0 ? coreTiers[activeIndex - 1].name : ''}
          </span>
        </button>

        <div className="flex items-center gap-1.5">
          {coreTiers.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? 'w-6 h-1.5 bg-[#0073FF]/80'
                  : 'w-1.5 h-1.5 bg-white/15 hover:bg-white/30'
              }`}
              aria-label={`Go to ${coreTiers[i].name}`}
            />
          ))}
        </div>

        <button
          onClick={() => activeIndex < coreTiers.length - 1 && setActiveIndex(activeIndex + 1)}
          className={`flex items-center gap-1.5 transition-all duration-200 min-w-[80px] justify-end ${
            activeIndex < coreTiers.length - 1 ? 'opacity-50 hover:opacity-80' : 'opacity-0 pointer-events-none'
          }`}
          aria-label="Next tier"
        >
          <span className="text-xs font-mono text-white/50 uppercase tracking-wider">
            {activeIndex < coreTiers.length - 1 ? coreTiers[activeIndex + 1].name : ''}
          </span>
          <ChevronRight size={14} className="text-white/50" />
        </button>
      </div>
    </div>
  );
}

function PricingDesktopGrid() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {coreTiers.map((tier) => (
        <div key={tier.name} className={tier.highlighted ? 'pt-4' : 'pt-4'}>
          <PricingCard tier={tier} />
        </div>
      ))}
    </div>
  );
}

export const Pricing = () => {
  return (
    <section id="pricing" className="section-wrapper">
      <div className="container-max space-y-12">
        <div className="text-center space-y-4">
          <AnimatedElement type="fadeInUp">
            <h2 className="text-4xl md:text-5xl font-bold">Infrastructure pricing.</h2>
            <div className="mt-4 mx-auto w-16 h-[2px] bg-gradient-to-r from-transparent via-immix-blue to-transparent" />
          </AnimatedElement>
          <AnimatedElement type="fadeInUp" delay={0.1}>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Predictable pricing that scales with your business. Pay for capacity, throughput, and
              volume — not market luck.
            </p>
          </AnimatedElement>
          <AnimatedElement type="fadeInUp" delay={0.15}>
            <div className="flex justify-center mt-2">
              <div className="inline-flex items-center gap-2.5 px-5 py-2 bg-amber-500/8 border border-amber-500/20 rounded-full">
                <Tag size={14} className="text-amber-400 flex-shrink-0" />
                <span className="text-sm text-amber-200/90">
                  Flat promotional pricing on all tiers through <span className="font-semibold text-amber-300">June 30, 2026</span>
                </span>
              </div>
            </div>
          </AnimatedElement>
        </div>

        <div>
          <div className="space-y-10">
            <div className="hidden lg:block">
              <PricingDesktopGrid />
            </div>

            <div className="lg:hidden">
              <PricingCarousel />
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/10" />
              <p className="text-white/35 text-sm text-center px-2 max-w-md">
                Need custom scale or early-stage support?
              </p>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/10" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-3">
                <EnterpriseBanner />
              </div>
              <div className="lg:col-span-2">
                <StartupCreditsBanner />
              </div>
            </div>
          </div>
        </div>

        <div className="text-center pt-4 lg:pt-8">
          <p className="text-white/40 text-sm">
            All plans include 24/7 infrastructure monitoring, automatic failover, and regular
            security audits.
            <br />
            Promotional flat pricing available through June 30, 2026. Standard usage-based pricing applies thereafter.
            <br />
            Startup credits subject to approval and valid for 6 months from activation.
            <br />
            Volume discounts available for high-frequency traders.{' '}
            <a href="https://app.immix.xyz" className="text-immix-blue font-medium hover:underline">
              Contact us
            </a>{' '}
            for custom requirements.
          </p>
        </div>
      </div>
    </section>
  );
};

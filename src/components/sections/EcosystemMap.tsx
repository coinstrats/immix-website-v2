import { useInView, motion } from 'framer-motion';
import { useRef, useState, useCallback } from 'react';
import { Lock, Zap, TrendingUp, Shield, Terminal, Network, Database, Server, Building2, Crown, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatedElement } from '../ui';
import {
  LeftHorizontalConnector,
  RightHorizontalConnector,
  VerticalConnector,
  SequencerInternalAnimation,
} from './EcosystemConnectors';

const CUSTODY_PROVIDERS = ['Fireblocks', 'Copper', 'Ripple Custody', 'Anchorage', 'BitGo'];
const VENUES = ['Binance', 'Coinbase', 'Jane Street', 'CME', 'Hyperliquid', 'Polymarket', 'Deribit'];
const VENUE_CATEGORIES = 'CEX \u2022 DEX \u2022 OTC \u2022 DMA \u2022 PRIME';

const STATS = [
  { value: '1M+', label: 'Messages / Second' },
  { value: '0', label: 'Downtime Upgrades' },
  { value: '5\u00B5s', label: 'Round-Trip Latency' },
  { value: '~10ms', label: 'Failover Recovery' },
  { value: '365/24/7', label: 'Operations' },
];

const CONFERENCES = [
  { name: 'AIIB Beijing', short: 'AIIB', url: 'https://www.aiib.org/en/index.html' },
  { name: 'QuantMinds International', short: 'QuantMinds', url: 'https://informaconnect.com/quantminds-international/' },
  { name: 'Aeron', short: 'Aeron', url: 'https://aeron.io/' },
];

const GATEWAY_TEXT = 'Bridge your internal systems directly into the core sequencer. Models, treasury operations, and proprietary data streams are consolidated into a unified, fault-tolerant sequenced stream for maximum operational efficiency.';

const StatCards = () => (
  <AnimatedElement type="fadeInUp" delay={0.2}>
    <div className="hidden lg:grid lg:grid-cols-5 gap-4 max-w-5xl mx-auto items-stretch">
      {STATS.map((stat, i) => (
        <AnimatedElement key={stat.label} type="fadeInUp" delay={0.25 + i * 0.08} className="h-full">
          <div className="relative p-5 border border-white/10 bg-immix-dark/40 backdrop-blur text-center group hover:border-immix-blue/30 transition-colors h-full flex flex-col items-center justify-center">
            <p className="text-3xl font-mono font-bold text-immix-blue mb-1 tabular-nums">
              {stat.value}
            </p>
            <p className="text-xs font-mono text-white/50 uppercase tracking-wider leading-tight">
              {stat.label}
            </p>
          </div>
        </AnimatedElement>
      ))}
    </div>
  </AnimatedElement>
);

const CustodyPanel = () => (
  <div className="col-span-3 space-y-4">
    <div className="relative p-6 border border-immix-purple/30 bg-immix-dark/40 backdrop-blur">
      <div className="absolute -top-3 left-4 px-2 bg-immix-darker">
        <div className="flex items-center gap-2 text-xs text-immix-purple font-mono">
          <Lock size={14} />
          <span>CUSTODY</span>
        </div>
      </div>

      <div className="space-y-2 mt-2">
        {CUSTODY_PROVIDERS.map((item) => (
          <div
            key={item}
            className="flex items-center gap-2 px-3 py-2 bg-immix-purple/5 border border-immix-purple/20 text-xs font-mono text-white/70 hover:bg-immix-purple/10 hover:border-immix-purple/30 transition-colors"
          >
            <Building2 size={14} className="text-white/40" />
            {item}
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-white/10">
        <p className="text-xs text-white/40 font-mono">
          MPC &bull; Cold Storage &bull; Compliance
        </p>
      </div>
    </div>
  </div>
);

const VenuesPanel = () => (
  <div className="col-span-3 space-y-4">
    <div className="relative p-6 border border-immix-blue/30 bg-immix-dark/40 backdrop-blur">
      <div className="absolute -top-3 right-4 px-2 bg-immix-darker">
        <div className="flex items-center gap-2 text-xs text-immix-blue font-mono">
          <span>VENUES</span>
          <TrendingUp size={14} />
        </div>
      </div>

      <div className="space-y-2 mt-2">
        {VENUES.map((item) => (
          <div
            key={item}
            className="flex items-center gap-2 px-3 py-2 bg-immix-blue/5 border border-immix-blue/20 text-xs font-mono text-white/70 hover:bg-immix-blue/10 hover:border-immix-blue/30 transition-colors"
          >
            <Building2 size={14} className="text-white/40" />
            {item}
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-white/10">
        <p className="text-xs text-white/40 font-mono">{VENUE_CATEGORIES}</p>
      </div>
    </div>
  </div>
);

const SequencerCore = ({ inView }: { inView: boolean }) => (
  <div className="col-span-4 relative">
    <div className="relative p-8 border-2 border-immix-blue/50 bg-immix-dark/60 backdrop-blur">
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 bg-immix-darker">
        <div className="text-xs font-mono text-immix-blue flex items-center gap-2">
          <span className="w-2 h-2 bg-immix-blue animate-pulse"></span>
          <span>CORE CLUSTER</span>
          <span className="w-2 h-2 bg-immix-blue animate-pulse"></span>
        </div>
      </div>

      <div className="text-center mb-8 mt-2">
        <h3 className="font-bold text-2xl mb-1 text-white">Sequencer</h3>
        <p className="text-xs text-white/60 font-mono">RAFT Consensus &bull; 1M+ msg/s &bull; 5&mu;s latency</p>
      </div>

      <div className="flex flex-col items-center relative h-64 mb-6">
        <SequencerInternalAnimation inView={inView} />

        <div className="absolute top-2 left-0 right-0 flex justify-center" style={{ zIndex: 20 }}>
          <div className="w-24 h-24 bg-white border-2 border-white/60 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.3)]">
            <div className="text-center">
              <Zap className="text-immix-dark mx-auto" size={24} />
              <div className="text-xs font-mono text-immix-dark/90 mt-1 font-bold">S1</div>
              <div className="text-[10px] font-mono text-immix-dark/60 font-semibold">Leader</div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-16" style={{ zIndex: 10 }}>
          <div className="w-20 h-20 bg-slate-900 border-2 border-slate-700 flex items-center justify-center">
            <div className="text-center">
              <Zap className="text-slate-400 mx-auto" size={20} />
              <div className="text-xs font-mono text-slate-400 mt-1 font-bold">S2</div>
              <div className="text-[10px] font-mono text-slate-500 font-semibold">Follower</div>
            </div>
          </div>

          <div className="w-20 h-20 bg-slate-900 border-2 border-slate-700 flex items-center justify-center">
            <div className="text-center">
              <Zap className="text-slate-400 mx-auto" size={20} />
              <div className="text-xs font-mono text-slate-400 mt-1 font-bold">S3</div>
              <div className="text-[10px] font-mono text-slate-500 font-semibold">Follower</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
        {[
          { label: 'Risk Books', icon: Network, metric: 'Strategy Pods' },
          { label: 'Business Logic', icon: Terminal, metric: 'SDK' },
          { label: 'Data Lab', icon: Database, metric: '360 Insights' },
        ].map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.label}
              className="p-3 bg-immix-blue/5 border border-immix-blue/30 hover:bg-immix-blue/10 transition-colors"
            >
              <Icon className="text-immix-blue mb-2" size={16} />
              <p className="text-xs font-semibold text-white/80 leading-tight mb-1">{feature.label}</p>
              <p className="text-xs text-immix-blue/60 font-mono">{feature.metric}</p>
            </div>
          );
        })}
      </div>
    </div>

    <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-6 h-6 border-2 border-immix-blue/30 bg-immix-darker flex items-center justify-center">
      <div className="w-2 h-2 bg-immix-blue" />
    </div>
    <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-6 h-6 border-2 border-immix-blue/30 bg-immix-darker flex items-center justify-center">
      <div className="w-2 h-2 bg-immix-blue" />
    </div>
    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-6 h-6 border-2 border-immix-blue/30 bg-immix-darker flex items-center justify-center">
      <div className="w-2 h-2 bg-immix-blue" />
    </div>
  </div>
);

const GatewaySection = ({ inView }: { inView: boolean }) => (
  <div className="hidden lg:grid grid-cols-12 gap-6 -mt-4">
    <div className="col-start-3 col-span-8 flex flex-col items-center">
      <VerticalConnector inView={inView} />

      <div className="w-full">
        <div className="relative p-6 border border-emerald-600/30 bg-immix-dark/40 backdrop-blur">
          <div className="absolute -top-3 left-8 px-2 bg-immix-darker">
            <div className="flex items-center gap-2 text-xs text-emerald-600 font-mono">
              <Server size={14} />
              <span>GATEWAY</span>
            </div>
          </div>

          <div className="flex items-center gap-6 mt-2">
            <div className="w-16 h-16 bg-emerald-600/10 border-2 border-emerald-600/40 flex items-center justify-center flex-shrink-0">
              <Shield className="text-emerald-600" size={32} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <p className="text-base text-white/90 font-mono font-semibold">Private Connection Bridge</p>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-amber-500/10 border border-amber-500/40 text-amber-400 text-[10px] font-mono font-semibold uppercase tracking-wider">
                  <Crown size={10} />
                  Enterprise
                </span>
              </div>
              <p className="text-xs text-white/60 font-mono leading-relaxed">
                {GATEWAY_TEXT}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const MOBILE_ECOSYSTEM_CARDS = [
  { id: 'custody', label: 'Custody' },
  { id: 'sequencer', label: 'Sequencer' },
  { id: 'venues', label: 'Venues' },
] as const;

const MOBILE_CARD_WIDTH = 300;
const MOBILE_SWIPE_THRESHOLD = 50;

function MobileCustodyCard() {
  return (
    <div className="relative p-5 border border-immix-purple/30 bg-immix-dark/40 backdrop-blur" style={{ width: MOBILE_CARD_WIDTH }}>
      <div className="absolute -top-3 left-4 px-2 bg-immix-darker">
        <div className="flex items-center gap-2 text-xs text-immix-purple font-mono">
          <Lock size={14} />
          <span>CUSTODY LAYER</span>
        </div>
      </div>
      <div className="space-y-2 mt-2">
        {CUSTODY_PROVIDERS.map((item) => (
          <div key={item} className="flex items-center gap-2 px-3 py-2 bg-immix-purple/5 border border-immix-purple/20 text-xs font-mono text-white/70">
            <Building2 size={14} className="text-white/40" />
            {item}
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-white/10">
        <p className="text-xs text-white/40 font-mono">MPC &bull; Cold Storage &bull; Compliance</p>
      </div>
    </div>
  );
}

function MobileSequencerCard({ inView }: { inView: boolean }) {
  return (
    <div className="relative p-5 border-2 border-immix-blue/50 bg-immix-dark/60 backdrop-blur" style={{ width: MOBILE_CARD_WIDTH }}>
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 bg-immix-darker">
        <div className="text-xs font-mono text-immix-blue flex items-center gap-2">
          <span className="w-2 h-2 bg-immix-blue animate-pulse" />
          <span>CORE CLUSTER</span>
          <span className="w-2 h-2 bg-immix-blue animate-pulse" />
        </div>
      </div>

      <div className="text-center mb-4 mt-2">
        <h3 className="font-bold text-xl mb-1 text-white">Sequencer</h3>
        <p className="text-[10px] text-white/60 font-mono">RAFT Consensus &bull; 1M+ msg/s &bull; 5&mu;s latency</p>
      </div>

      <div className="flex flex-col items-center relative h-44 mb-4">
        <SequencerInternalAnimation inView={inView} />
        <div className="absolute top-1 left-0 right-0 flex justify-center" style={{ zIndex: 20 }}>
          <div className="w-20 h-20 bg-white border-2 border-white/60 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            <div className="text-center">
              <Zap className="text-immix-dark mx-auto" size={20} />
              <div className="text-xs font-mono text-immix-dark/90 mt-1 font-bold">S1</div>
              <div className="text-[9px] font-mono text-immix-dark/60 font-semibold">Leader</div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-1 left-0 right-0 flex justify-center gap-12" style={{ zIndex: 10 }}>
          {['S2', 'S3'].map((label) => (
            <div key={label} className="w-16 h-16 bg-slate-900 border-2 border-slate-700 flex items-center justify-center">
              <div className="text-center">
                <Zap className="text-slate-400 mx-auto" size={16} />
                <div className="text-[10px] font-mono text-slate-400 mt-0.5 font-bold">{label}</div>
                <div className="text-[8px] font-mono text-slate-500 font-semibold">Follower</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10">
        {[
          { label: 'Risk Books', icon: Network, metric: 'Strategy Pods' },
          { label: 'Business Logic', icon: Terminal, metric: 'SDK' },
          { label: 'Data Lab', icon: Database, metric: '360 Insights' },
        ].map((feature) => {
          const FIcon = feature.icon;
          return (
            <div key={feature.label} className="p-2 bg-immix-blue/5 border border-immix-blue/30">
              <FIcon className="text-immix-blue mb-1" size={14} />
              <p className="text-[10px] font-semibold text-white/80 leading-tight mb-0.5">{feature.label}</p>
              <p className="text-[9px] text-immix-blue/60 font-mono">{feature.metric}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MobileVenuesCard() {
  return (
    <div className="relative p-5 border border-immix-blue/30 bg-immix-dark/40 backdrop-blur" style={{ width: MOBILE_CARD_WIDTH }}>
      <div className="absolute -top-3 right-4 px-2 bg-immix-darker">
        <div className="flex items-center gap-2 text-xs text-immix-blue font-mono">
          <span>LIQUIDITY VENUES</span>
          <TrendingUp size={14} />
        </div>
      </div>
      <div className="space-y-2 mt-2">
        {VENUES.map((item) => (
          <div key={item} className="flex items-center gap-2 px-3 py-2 bg-immix-blue/5 border border-immix-blue/20 text-xs font-mono text-white/70">
            <Building2 size={14} className="text-white/40" />
            {item}
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-white/10">
        <p className="text-xs text-white/40 font-mono">{VENUE_CATEGORIES}</p>
      </div>
    </div>
  );
}

function MobileGatewayCard() {
  return (
    <div className="relative p-5 border border-emerald-600/30 bg-immix-dark/40 backdrop-blur">
      <div className="absolute -top-3 left-4 px-2 bg-immix-darker">
        <div className="flex items-center gap-2 text-xs text-emerald-600 font-mono">
          <Server size={14} />
          <span>GATEWAY</span>
        </div>
      </div>
      <div className="flex items-start gap-4 mt-2">
        <div className="w-12 h-12 bg-emerald-600/10 border-2 border-emerald-600/40 flex items-center justify-center flex-shrink-0">
          <Shield className="text-emerald-600" size={24} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <p className="text-sm text-white/90 font-mono font-semibold">Private Connection Bridge</p>
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-amber-500/10 border border-amber-500/40 text-amber-400 text-[9px] font-mono font-semibold uppercase">
              <Crown size={8} />
              Enterprise
            </span>
          </div>
          <p className="text-[11px] text-white/50 font-mono leading-relaxed">{GATEWAY_TEXT}</p>
        </div>
      </div>
    </div>
  );
}

const MobileLayout = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const [dragOffset, setDragOffset] = useState(0);
  const isDragging = useRef(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselInView = useInView(carouselRef, { once: true, amount: 0.3 });

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
    if (Math.abs(delta) > MOBILE_SWIPE_THRESHOLD) {
      if (delta < 0 && activeIndex < 2) setActiveIndex(activeIndex + 1);
      else if (delta > 0 && activeIndex > 0) setActiveIndex(activeIndex - 1);
    }
    touchDeltaX.current = 0;
    setDragOffset(0);
  }, [activeIndex]);

  const spacing = MOBILE_CARD_WIDTH + 20;

  const cards = [
    <MobileCustodyCard key="custody" />,
    <MobileSequencerCard key="sequencer" inView={carouselInView} />,
    <MobileVenuesCard key="venues" />,
  ];

  return (
    <div className="lg:hidden space-y-4">
      <div className="flex flex-wrap justify-center gap-3">
        {STATS.slice(0, 3).map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
            className="p-3 border border-white/10 bg-immix-dark/40 text-center flex-1 min-w-[100px]"
          >
            <p className="text-xl font-mono font-bold text-immix-blue tabular-nums">{stat.value}</p>
            <p className="text-[9px] font-mono text-white/50 uppercase tracking-wider mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center gap-3">
        {STATS.slice(3).map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 + i * 0.08, duration: 0.5 }}
            className="p-3 border border-white/10 bg-immix-dark/40 text-center flex-1 max-w-[180px]"
          >
            <p className="text-xl font-mono font-bold text-immix-blue tabular-nums">{stat.value}</p>
            <p className="text-[9px] font-mono text-white/50 uppercase tracking-wider mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div
        ref={carouselRef}
        className="relative overflow-hidden"
        style={{ height: 440 }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute inset-0 flex items-start justify-center pt-4">
          {cards.map((card, i) => {
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
                key={MOBILE_ECOSYSTEM_CARDS[i].id}
                className="absolute"
                style={{
                  transform: `translateX(${baseTranslateX}px) scale(${scale})`,
                  opacity,
                  zIndex,
                  transition: isDragging.current ? 'none' : 'all 400ms cubic-bezier(0.4, 0, 0.2, 1)',
                  pointerEvents: absOffset === 0 ? 'auto' : 'none',
                }}
              >
                {card}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between items-center px-4">
        <button
          onClick={() => activeIndex > 0 && setActiveIndex(activeIndex - 1)}
          className={`flex items-center gap-1.5 transition-all duration-200 min-w-[80px] ${
            activeIndex > 0 ? 'opacity-50 hover:opacity-80' : 'opacity-0 pointer-events-none'
          }`}
          aria-label="Previous"
        >
          <ChevronLeft size={14} className="text-white/50" />
          <span className="text-xs font-mono text-white/50 uppercase tracking-wider">
            {activeIndex > 0 ? MOBILE_ECOSYSTEM_CARDS[activeIndex - 1].label : ''}
          </span>
        </button>

        <div className="flex items-center gap-1.5">
          {MOBILE_ECOSYSTEM_CARDS.map((card, i) => (
            <button
              key={card.id}
              onClick={() => setActiveIndex(i)}
              className={`rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? 'w-6 h-1.5 bg-[#0073FF]/80'
                  : 'w-1.5 h-1.5 bg-white/15 hover:bg-white/30'
              }`}
              aria-label={`Go to ${card.label}`}
            />
          ))}
        </div>

        <button
          onClick={() => activeIndex < 2 && setActiveIndex(activeIndex + 1)}
          className={`flex items-center gap-1.5 transition-all duration-200 min-w-[80px] justify-end ${
            activeIndex < 2 ? 'opacity-50 hover:opacity-80' : 'opacity-0 pointer-events-none'
          }`}
          aria-label="Next"
        >
          <span className="text-xs font-mono text-white/50 uppercase tracking-wider">
            {activeIndex < 2 ? MOBILE_ECOSYSTEM_CARDS[activeIndex + 1].label : ''}
          </span>
          <ChevronRight size={14} className="text-white/50" />
        </button>
      </div>

      <div className="mt-12">
        <MobileGatewayCard />
      </div>
    </div>
  );
};

const VideoAndConferences = () => (
  <AnimatedElement type="fadeInUp" delay={0.15}>
    <div className="pt-20 lg:pt-24 pb-16 lg:pb-12 space-y-14 lg:space-y-16">
      <div className="flex justify-center">
        <a
          href="https://www.youtube.com/watch?v=dqQvHgqOuc4"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 px-5 py-3 border border-white/10 bg-immix-dark/40 hover:border-immix-blue/40 hover:bg-immix-blue/5 transition-all duration-300"
        >
          <span className="flex items-center justify-center w-8 h-8 bg-immix-blue/10 border border-immix-blue/30 group-hover:bg-immix-blue/20 transition-colors">
            <Play size={14} className="text-immix-blue" />
          </span>
          <span className="text-sm font-mono text-white/70 group-hover:text-white/90 transition-colors">
            Watch: Fault-Tolerant Sequencer Architecture
          </span>
        </a>
      </div>

      <div className="text-center space-y-8 lg:space-y-6">
        <p className="text-xs font-mono text-white/50 uppercase tracking-[0.25em]">Presented At</p>
        <div className="flex flex-col items-center gap-5 lg:gap-4">
          <a
            href={CONFERENCES[1].url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 px-6 py-4 border border-white/10 bg-immix-dark/40 backdrop-blur hover:border-immix-blue/30 hover:bg-immix-blue/5 transition-all duration-300 w-full sm:w-auto"
          >
            <div className="px-3 py-2 border border-white/20 bg-white/5 flex items-center justify-center text-xs font-mono font-bold text-white/60 group-hover:text-immix-blue group-hover:border-immix-blue/40 group-hover:bg-immix-blue/10 transition-all duration-300 whitespace-nowrap">
              {CONFERENCES[1].short}
            </div>
            <span className="text-sm font-mono text-white/60 group-hover:text-white/90 transition-colors whitespace-nowrap">
              {CONFERENCES[1].name}
            </span>
          </a>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {[CONFERENCES[0], CONFERENCES[2]].map((conf) => (
              <a
                key={conf.name}
                href={conf.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 px-6 py-4 border border-white/10 bg-immix-dark/40 backdrop-blur hover:border-immix-blue/30 hover:bg-immix-blue/5 transition-all duration-300 w-full sm:w-auto"
              >
                <div className="w-12 h-12 border border-white/20 bg-white/5 flex items-center justify-center text-sm font-mono font-bold text-white/60 group-hover:text-immix-blue group-hover:border-immix-blue/40 group-hover:bg-immix-blue/10 transition-all duration-300">
                  {conf.short}
                </div>
                <span className="text-sm font-mono text-white/60 group-hover:text-white/90 transition-colors whitespace-nowrap">
                  {conf.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  </AnimatedElement>
);

export const EcosystemMap = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "200px 0px 0px 0px" });

  return (
    <section id="architecture" className="section-wrapper relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="schematic-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#schematic-grid)" />
        </svg>
      </div>

      <div className="container-max space-y-16 lg:space-y-12 relative z-10">
        <div className="text-center space-y-4">
          <AnimatedElement type="fadeInUp">
            <p className="text-xs font-mono text-[#0073FF]/50 tracking-[0.2em] uppercase mb-4">
              Infrastructure
            </p>
            <h2 className="text-4xl md:text-5xl font-bold">Your operational edge, unified.</h2>
            <div className="mt-4 mx-auto w-16 h-[2px] bg-gradient-to-r from-transparent via-immix-blue to-transparent" />
          </AnimatedElement>
          <AnimatedElement type="fadeInUp" delay={0.1}>
            <p className="text-lg text-white/60 max-w-3xl mx-auto leading-relaxed">
              One sequenced stream designed for continuous operations and native AI agent integration. Every custodian, every venue, every rule &mdash; unified into deterministic, fault-tolerant execution at microsecond latency, running 365/24/7.
            </p>
          </AnimatedElement>
        </div>

        <StatCards />

        <div ref={sectionRef} className="relative">
          <div className="hidden lg:grid grid-cols-12 gap-6 items-center pt-16 pb-8">
            <CustodyPanel />
            <LeftHorizontalConnector inView={inView} />
            <SequencerCore inView={inView} />
            <RightHorizontalConnector inView={inView} />
            <VenuesPanel />
          </div>

          <GatewaySection inView={inView} />
          <MobileLayout />
        </div>

        <VideoAndConferences />
      </div>
    </section>
  );
};

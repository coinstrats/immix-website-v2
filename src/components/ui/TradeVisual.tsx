import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Instrument {
  pair: string;
  bids: number[];
  asks: number[];
  basePrice: number;
  step: number;
  venues: string[];
}

const instruments: Instrument[] = [
  {
    pair: 'BTC / USD',
    bids: [85, 100, 72, 58, 90, 78, 52, 65],
    asks: [65, 78, 58, 90, 72, 52, 85, 62],
    basePrice: 67150,
    step: 25,
    venues: ['Binance', 'OKX', 'Coinbase'],
  },
  {
    pair: 'GOLD / USD',
    bids: [95, 65, 88, 55, 75, 45, 80, 57],
    asks: [72, 92, 52, 85, 62, 78, 50, 68],
    basePrice: 2418,
    step: 2,
    venues: ['CME', 'Coinbase', 'OKX'],
  },
  {
    pair: 'ETH / USD',
    bids: [75, 92, 52, 85, 62, 72, 90, 50],
    asks: [80, 58, 95, 65, 88, 55, 72, 78],
    basePrice: 3285,
    step: 5,
    venues: ['Hyperliquid', 'Binance', 'Polymarket'],
  },
];

const BAR_HEIGHT = 14;
const GAP = 4;
const CENTER_X = 200;
const VB_WIDTH = 400;
const VB_HEIGHT = 180;
const TOP_OFFSET = 30;
const ROTATION_INTERVAL = 4500;

const OrderBookContent = ({ instrument, cycle }: { instrument: Instrument; cycle: number }) => {
  const { bids, asks, basePrice, step } = instrument;
  const maxBars = 8;
  const visibleBids = bids.slice(0, maxBars);
  const visibleAsks = asks.slice(0, maxBars);
  const barScale = 1.3;

  return (
    <g>
      <line
        x1={CENTER_X}
        y1={TOP_OFFSET - 2}
        x2={CENTER_X}
        y2={TOP_OFFSET + maxBars * (BAR_HEIGHT + GAP)}
        stroke="white"
        strokeOpacity="0.12"
        strokeWidth="0.5"
      />

      {visibleBids.map((w, i) => {
        const y = TOP_OFFSET + i * (BAR_HEIGHT + GAP);
        const bidOffset = 3;
        const sw = w * barScale;
        return (
          <g key={`bid-${cycle}-${i}`}>
            <motion.rect
              y={y}
              height={BAR_HEIGHT}
              fill="url(#bid-grad)"
              rx="2"
              initial={{ width: 0, x: CENTER_X - bidOffset }}
              animate={{ width: sw, x: CENTER_X - bidOffset - sw }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: 'easeOut' }}
            />
            <motion.rect
              x={CENTER_X - bidOffset - sw}
              y={y}
              width={sw}
              height={BAR_HEIGHT}
              fill="rgb(52,211,153)"
              fillOpacity="0"
              rx="2"
              animate={{
                fillOpacity: i < 3 ? [0, 0.15, 0] : [0, 0, 0],
                width: [sw, sw * 0.92, sw * 1.08, sw],
                x: [CENTER_X - bidOffset - sw, CENTER_X - bidOffset - sw * 0.92, CENTER_X - bidOffset - sw * 1.08, CENTER_X - bidOffset - sw],
              }}
              transition={{
                duration: 2.8 + i * 0.25,
                delay: 0.8 + i * 0.1,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.text
              x={CENTER_X - 6}
              y={y + BAR_HEIGHT * 0.72}
              textAnchor="end"
              fill="white"
              fillOpacity="0"
              fontSize="7.5"
              fontFamily="monospace"
              animate={{ fillOpacity: 0.4 }}
              transition={{ duration: 0.3, delay: 0.2 + i * 0.04 }}
            >
              {(basePrice - i * step).toLocaleString()}
            </motion.text>
          </g>
        );
      })}

      {visibleAsks.map((w, i) => {
        const y = TOP_OFFSET + i * (BAR_HEIGHT + GAP);
        const askOffset = 3;
        const sw = w * barScale;
        return (
          <g key={`ask-${cycle}-${i}`}>
            <motion.rect
              x={CENTER_X + askOffset}
              y={y}
              height={BAR_HEIGHT}
              fill="url(#ask-grad)"
              rx="2"
              initial={{ width: 0 }}
              animate={{ width: sw }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: 'easeOut' }}
            />
            <motion.rect
              x={CENTER_X + askOffset}
              y={y}
              width={sw}
              height={BAR_HEIGHT}
              fill="rgb(248,113,113)"
              fillOpacity="0"
              rx="2"
              animate={{
                fillOpacity: i < 3 ? [0, 0.12, 0] : [0, 0, 0],
                width: [sw, sw * 1.1, sw * 0.88, sw],
              }}
              transition={{
                duration: 3 + i * 0.2,
                delay: 1 + i * 0.08,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.text
              x={CENTER_X + 6}
              y={y + BAR_HEIGHT * 0.72}
              textAnchor="start"
              fill="white"
              fillOpacity="0"
              fontSize="7.5"
              fontFamily="monospace"
              animate={{ fillOpacity: 0.4 }}
              transition={{ duration: 0.3, delay: 0.2 + i * 0.04 }}
            >
              {(basePrice + step + i * step).toLocaleString()}
            </motion.text>
          </g>
        );
      })}

      <motion.rect
        x={CENTER_X - 3 - visibleBids[0] * barScale}
        y={TOP_OFFSET}
        width={visibleBids[0] * barScale}
        height={BAR_HEIGHT * 3 + GAP * 2}
        fill="rgb(52,211,153)"
        fillOpacity="0"
        rx="2"
        animate={{ fillOpacity: [0, 0.18, 0] }}
        transition={{
          duration: 1.2,
          delay: 1.5,
          repeat: Infinity,
          repeatDelay: 3.5,
          ease: 'easeInOut',
        }}
      />
    </g>
  );
};

const BidFlowDot = ({ startX, delay }: { startX: number; delay: number }) => (
  <motion.circle
    cx={startX}
    cy={18}
    r={2}
    fill="rgb(52,211,153)"
    initial={{ opacity: 0, cx: startX }}
    animate={{
      opacity: [0, 0.6, 0.6, 0],
      cx: [startX, CENTER_X - 25],
    }}
    transition={{
      duration: 1.6,
      delay,
      repeat: Infinity,
      repeatDelay: 2.8,
      ease: 'easeInOut',
    }}
  />
);

const AskFlowDot = ({ startX, delay }: { startX: number; delay: number }) => (
  <motion.circle
    cx={startX}
    cy={18}
    r={2}
    fill="rgb(248,113,113)"
    initial={{ opacity: 0, cx: startX }}
    animate={{
      opacity: [0, 0.6, 0.6, 0],
      cx: [startX, CENTER_X + 25],
    }}
    transition={{
      duration: 1.6,
      delay,
      repeat: Infinity,
      repeatDelay: 2.8,
      ease: 'easeInOut',
    }}
  />
);

export const TradeVisual = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleInView = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      setIsInView(entry.isIntersecting);
    });
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(handleInView, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [handleInView]);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % instruments.length);
      setCycle((prev) => prev + 1);
    }, ROTATION_INTERVAL);
    return () => clearInterval(interval);
  }, [isInView]);

  const current = instruments[activeIndex];
  const bidVenuePositions = [40, 100, 155];
  const askVenuePositions = [250, 310, 365];

  return (
    <div className="w-full h-full relative" ref={containerRef}>
      <svg
        viewBox={`0 0 ${VB_WIDTH} ${VB_HEIGHT}`}
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="trade-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="0.5" fill="white" opacity="0.1" />
          </pattern>
          <linearGradient id="bid-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(52,211,153)" stopOpacity="0.05" />
            <stop offset="50%" stopColor="rgb(52,211,153)" stopOpacity="0.45" />
            <stop offset="85%" stopColor="rgb(52,211,153)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="rgb(52,211,153)" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="ask-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(248,113,113)" stopOpacity="0.3" />
            <stop offset="15%" stopColor="rgb(248,113,113)" stopOpacity="0.5" />
            <stop offset="50%" stopColor="rgb(248,113,113)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="rgb(248,113,113)" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        <rect width={VB_WIDTH} height={VB_HEIGHT} fill="url(#trade-grid)" />

        {current.venues.map((_, vi) => (
          <BidFlowDot
            key={`bid-dot-${cycle}-${vi}`}
            startX={bidVenuePositions[vi]}
            delay={0.3 + vi * 0.35}
          />
        ))}
        {current.venues.map((_, vi) => (
          <AskFlowDot
            key={`ask-dot-${cycle}-${vi}`}
            startX={askVenuePositions[vi]}
            delay={0.5 + vi * 0.35}
          />
        ))}

        <AnimatePresence mode="wait">
          <motion.g
            key={`book-${cycle}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <OrderBookContent instrument={current} cycle={cycle} />
          </motion.g>
        </AnimatePresence>
      </svg>

      <div className="absolute top-1.5 left-2.5 flex items-center gap-2">
        <AnimatePresence mode="wait">
          <motion.span
            key={current.pair}
            className="text-[9px] lg:text-[10px] font-mono text-emerald-400/60 tracking-wider font-semibold"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
          >
            {current.pair}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="absolute top-1.5 left-[80px] lg:left-[90px] flex items-center gap-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={`venues-${cycle}`}
            className="flex items-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {current.venues.map((venue) => (
              <span
                key={venue}
                className="text-[6px] lg:text-[7px] font-mono text-white/25 bg-white/[0.04] px-1.5 py-[1px] rounded-sm"
              >
                {venue}
              </span>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute top-1.5 right-2.5 flex gap-3">
        <span className="text-[7px] lg:text-[8px] font-mono text-emerald-400/40 font-semibold">BID</span>
        <span className="text-[7px] lg:text-[8px] font-mono text-red-400/40 font-semibold">ASK</span>
      </div>

      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex gap-1.5">
        {instruments.map((_, i) => (
          <motion.div
            key={i}
            className="rounded-full"
            animate={{
              width: i === activeIndex ? 6 : 3,
              height: 3,
              backgroundColor: i === activeIndex ? 'rgb(52,211,153)' : 'rgb(255,255,255)',
              opacity: i === activeIndex ? 0.5 : 0.15,
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
};

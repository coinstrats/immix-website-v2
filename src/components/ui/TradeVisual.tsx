import { motion } from 'framer-motion';

const bidWidths = [65, 80, 55, 45, 70, 60, 40, 50];
const askWidths = [50, 60, 45, 70, 55, 40, 65, 48];
const barHeight = 8;
const gap = 2.5;
const centerX = 180;

export const TradeVisual = () => {
  return (
    <div className="w-full h-full relative">
      <svg
        viewBox="0 0 360 110"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <pattern id="trade-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="0.5" fill="white" opacity="0.1" />
          </pattern>
          <linearGradient id="bid-grad" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="rgb(52,211,153)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="rgb(52,211,153)" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="ask-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(248,113,113)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="rgb(248,113,113)" stopOpacity="0.08" />
          </linearGradient>
        </defs>

        <rect width="360" height="110" fill="url(#trade-grid)" />

        <line
          x1={centerX}
          y1="12"
          x2={centerX}
          y2="105"
          stroke="white"
          strokeOpacity="0.15"
          strokeWidth="0.5"
        />

        {bidWidths.map((w, i) => {
          const y = 15 + i * (barHeight + gap);
          return (
            <g key={`bid-${i}`}>
              <motion.rect
                x={centerX - w}
                y={y}
                width={w}
                height={barHeight}
                fill="url(#bid-grad)"
                rx="1"
                initial={{ width: 0, x: centerX }}
                animate={{ width: w, x: centerX - w }}
                transition={{ duration: 0.8, delay: i * 0.06 }}
              />
              <motion.rect
                x={centerX - w}
                y={y}
                width={w}
                height={barHeight}
                fill="rgb(52,211,153)"
                fillOpacity="0"
                rx="1"
                animate={{
                  fillOpacity: i < 3 ? [0, 0.15, 0] : [0, 0, 0],
                  width: [w, w * (0.9 + Math.random() * 0.2), w],
                  x: [centerX - w, centerX - w * (0.9 + Math.random() * 0.2), centerX - w],
                }}
                transition={{
                  duration: 3 + i * 0.3,
                  delay: 2 + i * 0.15,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <text
                x={centerX - 4}
                y={y + 6.5}
                textAnchor="end"
                fill="white"
                fillOpacity="0.3"
                fontSize="4"
                fontFamily="monospace"
              >
                {(42150 - i * 25).toLocaleString()}
              </text>
            </g>
          );
        })}

        {askWidths.map((w, i) => {
          const y = 15 + i * (barHeight + gap);
          return (
            <g key={`ask-${i}`}>
              <motion.rect
                x={centerX}
                y={y}
                width={w}
                height={barHeight}
                fill="url(#ask-grad)"
                rx="1"
                initial={{ width: 0 }}
                animate={{ width: w }}
                transition={{ duration: 0.8, delay: i * 0.06 }}
              />
              <motion.rect
                x={centerX}
                y={y}
                width={w}
                height={barHeight}
                fill="rgb(248,113,113)"
                fillOpacity="0"
                rx="1"
                animate={{
                  fillOpacity: [0, 0, 0],
                  width: [w, w * (0.85 + Math.random() * 0.3), w],
                }}
                transition={{
                  duration: 3.5 + i * 0.2,
                  delay: 2.2 + i * 0.1,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <text
                x={centerX + 4}
                y={y + 6.5}
                textAnchor="start"
                fill="white"
                fillOpacity="0.3"
                fontSize="4"
                fontFamily="monospace"
              >
                {(42175 + i * 25).toLocaleString()}
              </text>
            </g>
          );
        })}

        <motion.rect
          x={centerX - bidWidths[0]}
          y={15}
          width={bidWidths[0]}
          height={barHeight * 3 + gap * 2}
          fill="rgb(52,211,153)"
          fillOpacity="0"
          rx="1"
          animate={{ fillOpacity: [0, 0.2, 0] }}
          transition={{
            duration: 1.2,
            delay: 3,
            repeat: Infinity,
            repeatDelay: 4,
            ease: 'easeInOut',
          }}
        />
      </svg>

      <div className="absolute top-1.5 left-2">
        <span className="text-[6px] font-mono text-emerald-400/40 tracking-widest uppercase">
          VWAP
        </span>
      </div>

      <div className="absolute top-1.5 right-2 flex gap-3">
        <span className="text-[5px] font-mono text-emerald-400/40">BID</span>
        <span className="text-[5px] font-mono text-red-400/40">ASK</span>
      </div>
    </div>
  );
};

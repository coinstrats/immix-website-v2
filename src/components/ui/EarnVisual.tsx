import { motion } from 'framer-motion';

const curvePath = 'M 30 90 C 60 88 90 82 120 72 C 150 62 180 48 210 38 C 240 28 270 20 300 14 C 320 10 335 8 345 6';
const fillPath = `${curvePath} L 345 95 L 30 95 Z`;

const yieldPoints = [
  { x: 90, y: 82 },
  { x: 150, y: 62 },
  { x: 210, y: 38 },
  { x: 270, y: 20 },
  { x: 330, y: 9 },
];

export const EarnVisual = () => {
  return (
    <div className="w-full h-full relative">
      <svg
        viewBox="0 0 360 100"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <pattern id="earn-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="0.5" fill="white" opacity="0.06" />
          </pattern>
          <linearGradient id="yield-fill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgb(56,189,248)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="rgb(56,189,248)" stopOpacity="0.01" />
          </linearGradient>
          <linearGradient id="yield-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(56,189,248)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="rgb(56,189,248)" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        <rect width="360" height="100" fill="url(#earn-grid)" />

        <line
          x1="30"
          y1="95"
          x2="350"
          y2="95"
          stroke="white"
          strokeOpacity="0.06"
          strokeWidth="0.5"
        />
        <line
          x1="30"
          y1="5"
          x2="30"
          y2="95"
          stroke="white"
          strokeOpacity="0.06"
          strokeWidth="0.5"
        />

        {[25, 50, 75].map((pct) => (
          <line
            key={pct}
            x1="30"
            y1={95 - pct * 0.9}
            x2="350"
            y2={95 - pct * 0.9}
            stroke="white"
            strokeOpacity="0.04"
            strokeDasharray="2 4"
          />
        ))}

        <motion.path
          d={fillPath}
          fill="url(#yield-fill)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 1.2 }}
        />

        <motion.path
          d={curvePath}
          fill="none"
          stroke="url(#yield-stroke)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />

        {yieldPoints.map((pt, i) => (
          <g key={`yield-${i}`}>
            <motion.circle
              cx={pt.x}
              cy={pt.y}
              r="3"
              fill="rgb(56,189,248)"
              fillOpacity="0.2"
              stroke="rgb(56,189,248)"
              strokeOpacity="0.4"
              strokeWidth="0.5"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 + i * 0.25 }}
            />
            <motion.text
              x={pt.x}
              y={pt.y - 7}
              textAnchor="middle"
              fill="rgb(56,189,248)"
              fillOpacity="0.5"
              fontSize="6"
              fontFamily="monospace"
              fontWeight="bold"
              initial={{ opacity: 0, y: pt.y - 3 }}
              whileInView={{ opacity: 1, y: pt.y - 7 }}
              viewport={{ once: true }}
              transition={{ delay: 1 + i * 0.25 }}
            >
              +
            </motion.text>
          </g>
        ))}

        <motion.polygon
          points="345,2 349,6 345,10 341,6"
          fill="rgb(56,189,248)"
          fillOpacity="0.5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 2.2 }}
        />
        <motion.polygon
          points="345,2 349,6 345,10 341,6"
          fill="rgb(56,189,248)"
          fillOpacity="0"
          animate={{ fillOpacity: [0, 0.4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />

        <text
          x="15"
          y="52"
          fill="white"
          fillOpacity="0.15"
          fontSize="5"
          fontFamily="monospace"
          transform="rotate(-90, 15, 52)"
        >
          %
        </text>
        <text
          x="190"
          y="103"
          textAnchor="middle"
          fill="white"
          fillOpacity="0.12"
          fontSize="5"
          fontFamily="monospace"
        >
          t
        </text>
      </svg>

      <div className="absolute top-1.5 left-2">
        <span className="text-[6px] font-mono text-sky-400/25 tracking-widest uppercase">
          Yield
        </span>
      </div>
    </div>
  );
};

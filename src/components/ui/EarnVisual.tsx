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
            <circle cx="10" cy="10" r="0.5" fill="white" opacity="0.1" />
          </pattern>
          <linearGradient id="yield-fill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgb(56,189,248)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="rgb(56,189,248)" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="yield-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(56,189,248)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="rgb(56,189,248)" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        <rect width="360" height="100" fill="url(#earn-grid)" />

        <line
          x1="30"
          y1="95"
          x2="350"
          y2="95"
          stroke="white"
          strokeOpacity="0.12"
          strokeWidth="0.5"
        />
        <line
          x1="30"
          y1="5"
          x2="30"
          y2="95"
          stroke="white"
          strokeOpacity="0.12"
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
            strokeOpacity="0.08"
            strokeDasharray="2 4"
          />
        ))}

        <path
          d={fillPath}
          fill="url(#yield-fill)"
        />

        <path
          d={curvePath}
          fill="none"
          stroke="url(#yield-stroke)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {yieldPoints.map((pt, i) => (
          <g key={`yield-${i}`}>
            <circle
              cx={pt.x}
              cy={pt.y}
              r="3"
              fill="rgb(56,189,248)"
              fillOpacity="0.25"
              stroke="rgb(56,189,248)"
              strokeOpacity="0.5"
              strokeWidth="0.5"
            />
            <text
              x={pt.x}
              y={pt.y - 7}
              textAnchor="middle"
              fill="rgb(56,189,248)"
              fillOpacity="0.6"
              fontSize="6"
              fontFamily="monospace"
              fontWeight="bold"
            >
              +
            </text>
          </g>
        ))}

        <polygon
          points="345,2 349,6 345,10 341,6"
          fill="rgb(56,189,248)"
          fillOpacity="0.6"
        />
        <motion.polygon
          points="345,2 349,6 345,10 341,6"
          fill="rgb(56,189,248)"
          fillOpacity="0"
          whileInView={{ fillOpacity: [0, 0.4, 0] }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />

        <text
          x="15"
          y="52"
          fill="white"
          fillOpacity="0.3"
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
          fillOpacity="0.25"
          fontSize="5"
          fontFamily="monospace"
        >
          t
        </text>
      </svg>

      <div className="absolute top-1.5 left-2">
        <span className="text-[6px] font-mono text-sky-400/40 tracking-widest uppercase">
          Yield
        </span>
      </div>
    </div>
  );
};

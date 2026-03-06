import { motion } from 'framer-motion';
import { monoFontFamily } from './fontFamily';

const stages = [
  { x: 45, label: 'BUY' },
  { x: 180, label: 'TRANSFER' },
  { x: 315, label: 'SELL' },
];

const sorBranches = [
  { cp1x: 180, cp1y: 75, cp2x: 220, cp2y: 85, endX: 260, endY: 50 },
  { cp1x: 180, cp1y: 55, cp2x: 220, cp2y: 40, endX: 260, endY: 50 },
  { cp1x: 180, cp1y: 65, cp2x: 230, cp2y: 65, endX: 260, endY: 50 },
];

export const PayVisual = () => {
  return (
    <div className="w-full h-full relative">
      <svg
        viewBox="0 0 360 110"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <pattern id="pay-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="0.5" fill="white" opacity="0.1" />
          </pattern>
        </defs>

        <rect width="360" height="110" fill="url(#pay-grid)" />

        <line
          x1="75"
          y1="38"
          x2="150"
          y2="38"
          stroke="rgb(45,212,191)"
          strokeOpacity="0.35"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        <polygon
          points="148,34 155,38 148,42"
          fill="rgb(45,212,191)"
          fillOpacity="0.35"
        />

        <line
          x1="210"
          y1="38"
          x2="285"
          y2="38"
          stroke="rgb(45,212,191)"
          strokeOpacity="0.35"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        <polygon
          points="283,34 290,38 283,42"
          fill="rgb(45,212,191)"
          fillOpacity="0.35"
        />

        {stages.map((stage) => (
          <g
            key={stage.label}
          >
            <rect
              x={stage.x - 30}
              y="25"
              width="60"
              height="26"
              rx="3"
              fill="rgb(45,212,191)"
              fillOpacity="0.08"
              stroke="rgb(45,212,191)"
              strokeOpacity="0.35"
              strokeWidth="0.8"
            />
            <text
              x={stage.x}
              y="41"
              textAnchor="middle"
              fill="rgb(45,212,191)"
              fillOpacity="0.8"
              fontSize="7"
              fontFamily={monoFontFamily}
              fontWeight="bold"
            >
              {stage.label}
            </text>
          </g>
        ))}

        <circle
          cx="180"
          cy="17"
          r="8"
          fill="rgb(45,212,191)"
          fillOpacity="0.1"
          stroke="rgb(45,212,191)"
          strokeOpacity="0.4"
          strokeWidth="0.6"
        />
        <text
          x="180"
          y="20"
          textAnchor="middle"
          fill="rgb(45,212,191)"
          fillOpacity="0.6"
          fontSize="8"
          fontFamily={monoFontFamily}
          fontWeight="bold"
        >
          $
        </text>

        {[0, 1.8, 3.6].map((delay) => (
          <motion.circle
            key={`dot-fwd-${delay}`}
            r="2"
            fill="rgb(45,212,191)"
            initial={{ opacity: 0 }}
            whileInView={{
              opacity: [0, 0.8, 0.8, 0],
              cx: [80, 150],
              cy: [38, 38],
            }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 1,
              delay: 1.5 + delay,
              repeat: Infinity,
              repeatDelay: 3,
              ease: 'linear',
            }}
          />
        ))}

        {[0.3, 2.1, 3.9].map((delay) => (
          <motion.circle
            key={`dot-fwd2-${delay}`}
            r="2"
            fill="rgb(45,212,191)"
            initial={{ opacity: 0 }}
            whileInView={{
              opacity: [0, 0.8, 0.8, 0],
              cx: [215, 285],
              cy: [38, 38],
            }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 1,
              delay: 1.8 + delay,
              repeat: Infinity,
              repeatDelay: 3,
              ease: 'linear',
            }}
          />
        ))}

        <line
          x1="135"
          y1="60"
          x2="135"
          y2="80"
          stroke="rgb(45,212,191)"
          strokeOpacity="0.2"
          strokeWidth="0.5"
          strokeDasharray="2 2"
        />

        {sorBranches.map((branch, i) => (
          <path
            key={`sor-${i}`}
            d={`M 135 80 C ${branch.cp1x} ${branch.cp1y} ${branch.cp2x} ${branch.cp2y} ${branch.endX} ${branch.endY}`}
            fill="none"
            stroke="rgb(45,212,191)"
            strokeOpacity="0.2"
            strokeWidth="0.6"
            strokeDasharray="2 3"
          />
        ))}

        {sorBranches.map((branch, i) => (
          <motion.circle
            key={`sor-dot-${i}`}
            r="1.2"
            fill="rgb(45,212,191)"
            initial={{ opacity: 0 }}
            whileInView={{
              opacity: [0, 0.6, 0.6, 0],
              cx: [135, branch.endX],
              cy: [80, branch.endY],
            }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 1.2 + i * 0.2,
              delay: 2 + i * 0.4,
              repeat: Infinity,
              repeatDelay: 3,
              ease: 'linear',
            }}
          />
        ))}

        <text
          x="120"
          y="77"
          fill="rgb(45,212,191)"
          fillOpacity="0.35"
          fontSize="5"
          fontFamily={monoFontFamily}
        >
          SOR
        </text>

        <line
          x1="260"
          y1="50"
          x2="290"
          y2="38"
          stroke="rgb(45,212,191)"
          strokeOpacity="0.15"
          strokeWidth="0.5"
          strokeDasharray="2 2"
        />
      </svg>
    </div>
  );
};

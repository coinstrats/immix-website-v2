import { motion } from 'framer-motion';
import { monoFontFamily } from './fontFamily';

const nodes = [
  { x: 60, y: 55, label: 'CME' },
  { x: 115, y: 110, label: 'Coinbase' },
  { x: 195, y: 35, label: 'Cboe' },
  { x: 250, y: 80, label: '' },
  { x: 310, y: 45, label: 'Kraken' },
  { x: 370, y: 115, label: 'Bitstamp' },
  { x: 430, y: 40, label: 'Binance' },
  { x: 455, y: 90, label: 'OKX' },
];

const hub = { x: 250, y: 80 };

const connections = nodes
  .filter((n) => n.x !== hub.x || n.y !== hub.y)
  .map((n) => ({ from: hub, to: n }));

export const ConnectVisual = () => {
  return (
    <div className="w-full h-full relative">
      <svg
        viewBox="0 0 500 155"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <pattern id="connect-grid" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="14" cy="14" r="0.7" fill="white" opacity="0.1" />
          </pattern>
          <radialGradient id="globe-glow" cx="50%" cy="50%">
            <stop offset="0%" stopColor="rgb(34,211,238)" stopOpacity="0.12" />
            <stop offset="100%" stopColor="rgb(34,211,238)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="500" height="155" fill="url(#connect-grid)" />

        <ellipse
          cx="250"
          cy="78"
          rx="220"
          ry="65"
          fill="none"
          stroke="white"
          strokeOpacity="0.1"
          strokeDasharray="4 8"
        />
        <ellipse
          cx="250"
          cy="78"
          rx="140"
          ry="45"
          fill="url(#globe-glow)"
          stroke="white"
          strokeOpacity="0.08"
          strokeDasharray="3 6"
        />

        {connections.map((conn, i) => (
          <line
            key={`conn-${i}`}
            x1={conn.from.x}
            y1={conn.from.y}
            x2={conn.to.x}
            y2={conn.to.y}
            stroke="rgb(34,211,238)"
            strokeOpacity="0.3"
            strokeWidth="1"
          />
        ))}

        {connections.map((conn, i) => {
          const dx = conn.to.x - conn.from.x;
          const dy = conn.to.y - conn.from.y;
          return (
            <motion.circle
              key={`flow-${i}`}
              r="2.5"
              fill="rgb(34,211,238)"
              initial={{ opacity: 0 }}
              whileInView={{
                opacity: [0, 0.9, 0.9, 0],
                cx: [conn.from.x, conn.from.x + dx],
                cy: [conn.from.y, conn.from.y + dy],
              }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 1.5 + (i % 3) * 0.3,
                delay: i * 0.25,
                repeat: Infinity,
                repeatDelay: 1.5,
                ease: 'linear',
              }}
            />
          );
        })}

        {connections.map((conn, i) => {
          const dx = conn.to.x - conn.from.x;
          const dy = conn.to.y - conn.from.y;
          return (
            <motion.circle
              key={`flow-rev-${i}`}
              r="1.5"
              fill="white"
              initial={{ opacity: 0 }}
              whileInView={{
                opacity: [0, 0.5, 0.5, 0],
                cx: [conn.from.x + dx, conn.from.x],
                cy: [conn.from.y + dy, conn.from.y],
              }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 1.8 + (i % 2) * 0.4,
                delay: i * 0.3 + 0.8,
                repeat: Infinity,
                repeatDelay: 2,
                ease: 'linear',
              }}
            />
          );
        })}

        {nodes.map((node, i) => (
          <g key={`node-${i}`}>
            <rect
              x={node.x - 5}
              y={node.y - 5}
              width="10"
              height="10"
              rx="2"
              fill="rgb(34,211,238)"
              fillOpacity="0.3"
              stroke="rgb(34,211,238)"
              strokeOpacity="0.5"
              strokeWidth="0.8"
            />
            <motion.rect
              x={node.x - 5}
              y={node.y - 5}
              width="10"
              height="10"
              rx="2"
              fill="none"
              stroke="rgb(34,211,238)"
              strokeOpacity="0.3"
              strokeWidth="0.8"
              whileInView={{ strokeOpacity: [0.3, 0.7, 0.3] }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            {node.label && (
              <text
                x={node.x}
                y={node.y + 17}
                textAnchor="middle"
                fill="white"
                fillOpacity="0.5"
                fontSize="9"
                fontFamily={monoFontFamily}
              >
                {node.label}
              </text>
            )}
          </g>
        ))}

        <motion.rect
          x={hub.x - 8}
          y={hub.y - 8}
          width="16"
          height="16"
          rx="3"
          fill="rgb(34,211,238)"
          fillOpacity="0.15"
          stroke="rgb(34,211,238)"
          strokeOpacity="0.6"
          strokeWidth="1.2"
          whileInView={{
            strokeOpacity: [0.6, 1, 0.6],
            fillOpacity: [0.15, 0.3, 0.15],
          }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>

      <div className="absolute bottom-1.5 right-2 flex gap-2">
        {['REST', 'WS', 'FIX'].map((proto) => (
          <span
            key={proto}
            className="text-[6px] font-mono text-cyan-400/40 tracking-wider"
          >
            {proto}
          </span>
        ))}
      </div>
    </div>
  );
};

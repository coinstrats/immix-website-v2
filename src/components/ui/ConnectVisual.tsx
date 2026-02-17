import { motion } from 'framer-motion';

const nodes = [
  { x: 45, y: 35, label: 'CME' },
  { x: 80, y: 65, label: 'Coinbase' },
  { x: 140, y: 25, label: 'Cboe' },
  { x: 180, y: 50, label: '' },
  { x: 220, y: 30, label: 'Kraken' },
  { x: 260, y: 70, label: 'Bitstamp' },
  { x: 310, y: 25, label: 'Binance' },
  { x: 330, y: 55, label: 'OKX' },
];

const hub = { x: 180, y: 50 };

const connections = nodes
  .filter((n) => n.x !== hub.x || n.y !== hub.y)
  .map((n) => ({ from: hub, to: n }));

export const ConnectVisual = () => {
  return (
    <div className="w-full h-full relative">
      <svg
        viewBox="0 0 360 100"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <pattern id="connect-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="0.5" fill="white" opacity="0.1" />
          </pattern>
          <radialGradient id="globe-glow" cx="50%" cy="50%">
            <stop offset="0%" stopColor="rgb(34,211,238)" stopOpacity="0.12" />
            <stop offset="100%" stopColor="rgb(34,211,238)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="360" height="100" fill="url(#connect-grid)" />

        <ellipse
          cx="180"
          cy="50"
          rx="160"
          ry="42"
          fill="none"
          stroke="white"
          strokeOpacity="0.1"
          strokeDasharray="3 6"
        />
        <ellipse
          cx="180"
          cy="50"
          rx="100"
          ry="30"
          fill="url(#globe-glow)"
          stroke="white"
          strokeOpacity="0.08"
          strokeDasharray="2 4"
        />

        {connections.map((conn, i) => (
          <motion.line
            key={`conn-${i}`}
            x1={conn.from.x}
            y1={conn.from.y}
            x2={conn.to.x}
            y2={conn.to.y}
            stroke="rgb(34,211,238)"
            strokeOpacity="0.3"
            strokeWidth="0.8"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: i * 0.1 }}
          />
        ))}

        {connections.map((conn, i) => {
          const dx = conn.to.x - conn.from.x;
          const dy = conn.to.y - conn.from.y;
          return (
            <motion.circle
              key={`flow-${i}`}
              r="1.5"
              fill="rgb(34,211,238)"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.9, 0.9, 0],
                cx: [conn.from.x, conn.from.x + dx],
                cy: [conn.from.y, conn.from.y + dy],
              }}
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
              r="1"
              fill="white"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.5, 0.5, 0],
                cx: [conn.from.x + dx, conn.from.x],
                cy: [conn.from.y + dy, conn.from.y],
              }}
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
            <motion.rect
              x={node.x - 3}
              y={node.y - 3}
              width="6"
              height="6"
              fill="rgb(34,211,238)"
              fillOpacity="0.3"
              stroke="rgb(34,211,238)"
              strokeOpacity="0.5"
              strokeWidth="0.5"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.08 }}
            />
            <motion.rect
              x={node.x - 3}
              y={node.y - 3}
              width="6"
              height="6"
              fill="none"
              stroke="rgb(34,211,238)"
              strokeOpacity="0.3"
              strokeWidth="0.5"
              animate={{ strokeOpacity: [0.3, 0.7, 0.3] }}
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
                y={node.y + 12}
                textAnchor="middle"
                fill="white"
                fillOpacity="0.35"
                fontSize="5"
                fontFamily="monospace"
              >
                {node.label}
              </text>
            )}
          </g>
        ))}

        <motion.rect
          x={hub.x - 5}
          y={hub.y - 5}
          width="10"
          height="10"
          fill="rgb(34,211,238)"
          fillOpacity="0.15"
          stroke="rgb(34,211,238)"
          strokeOpacity="0.6"
          strokeWidth="1"
          animate={{
            strokeOpacity: [0.6, 1, 0.6],
            fillOpacity: [0.15, 0.3, 0.15],
          }}
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

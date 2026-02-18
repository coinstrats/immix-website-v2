import { motion } from 'framer-motion';

const cols = 12;
const rows = 6;
const cellW = 24;
const cellH = 12;
const gapX = 2;
const gapY = 2;
const offsetX = 18;
const offsetY = 16;

const hotCells = [
  { r: 1, c: 3 },
  { r: 2, c: 7 },
  { r: 4, c: 5 },
  { r: 0, c: 9 },
  { r: 3, c: 1 },
  { r: 5, c: 10 },
];

const hotSet = new Set(hotCells.map((h) => `${h.r}-${h.c}`));

export const LabVisual = () => {
  return (
    <div className="w-full h-full relative">
      <svg
        viewBox="0 0 360 110"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <pattern id="lab-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="0.5" fill="white" opacity="0.1" />
          </pattern>
        </defs>

        <rect width="360" height="110" fill="url(#lab-grid)" />

        {Array.from({ length: rows }).map((_, r) =>
          Array.from({ length: cols }).map((_, c) => {
            const x = offsetX + c * (cellW + gapX);
            const y = offsetY + r * (cellH + gapY);
            const isHot = hotSet.has(`${r}-${c}`);
            const waveDelay = (c * 0.08) + (r * 0.04);

            return (
              <g key={`${r}-${c}`}>
                <rect
                  x={x}
                  y={y}
                  width={cellW}
                  height={cellH}
                  rx="1"
                  fill="rgb(147,197,253)"
                  fillOpacity="0.08"
                  stroke="rgb(147,197,253)"
                  strokeOpacity="0.12"
                  strokeWidth="0.3"
                />

                <motion.rect
                  x={x}
                  y={y}
                  width={cellW}
                  height={cellH}
                  rx="1"
                  fill="rgb(147,197,253)"
                  fillOpacity="0"
                  whileInView={{
                    fillOpacity: isHot
                      ? [0.06, 0.3, 0.06]
                      : [0.06, 0.14, 0.06],
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: isHot ? 1.5 : 3,
                    delay: waveDelay,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                {isHot && (
                  <motion.rect
                    x={x}
                    y={y}
                    width={cellW}
                    height={cellH}
                    rx="1"
                    fill="rgb(147,197,253)"
                    fillOpacity="0"
                    whileInView={{ fillOpacity: [0, 0.4, 0] }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.8,
                      delay: 2 + waveDelay * 2,
                      repeat: Infinity,
                      repeatDelay: 4 + Math.random() * 2,
                      ease: 'easeOut',
                    }}
                  />
                )}
              </g>
            );
          })
        )}

        <motion.rect
          x={offsetX}
          y={offsetY + rows * (cellH + gapY) + 4}
          width="6"
          height={cellH - 4}
          rx="1"
          fill="rgb(147,197,253)"
          fillOpacity="0.5"
          whileInView={{ fillOpacity: [0.5, 0, 0.5] }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'steps(2)' }}
        />

        {Array.from({ length: cols }).map((_, c) => (
          <motion.rect
            key={`scan-${c}`}
            x={offsetX + c * (cellW + gapX)}
            y={offsetY}
            width={cellW}
            height={rows * (cellH + gapY) - gapY}
            rx="1"
            fill="rgb(147,197,253)"
            fillOpacity="0"
            whileInView={{ fillOpacity: [0, 0.08, 0] }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.4,
              delay: c * 0.15,
              repeat: Infinity,
              repeatDelay: cols * 0.15 + 1.5,
              ease: 'linear',
            }}
          />
        ))}
      </svg>

      <div className="absolute top-1.5 left-2">
        <span className="text-[6px] font-mono text-blue-300/40 tracking-widest uppercase">
          Stream
        </span>
      </div>

      <div className="absolute top-1.5 right-2">
        <span className="text-[6px] font-mono text-blue-300/35 tracking-widest uppercase">
          Analysis
        </span>
      </div>
    </div>
  );
};

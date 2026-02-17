import { motion } from 'framer-motion';

const gridLines = [0.2, 0.4, 0.6, 0.8];

const traces = [
  {
    points: '10,85 30,80 50,78 70,60 90,65 110,45 130,50 150,30 170,35 190,25 210,40 230,20 250,28 270,15 290,22 310,10 330,18 350,12',
    opacity: 0.9,
    width: 1.5,
    color: 'rgba(96,165,250,1)',
    dashDelay: 0,
  },
  {
    points: '10,90 30,88 50,85 70,82 90,78 110,80 130,75 150,70 170,68 190,72 210,65 230,60 250,58 270,55 290,50 310,48 330,45 350,42',
    opacity: 0.5,
    width: 1,
    color: 'rgba(255,255,255,0.6)',
    dashDelay: 0.3,
  },
  {
    points: '10,70 30,75 50,72 70,80 90,70 110,68 130,72 150,65 170,60 190,58 210,62 230,55 250,50 270,52 290,48 310,42 330,40 350,38',
    opacity: 0.45,
    width: 1,
    color: 'rgba(250,204,21,0.7)',
    dashDelay: 0.6,
  },
  {
    points: '10,95 30,92 50,90 70,88 90,85 110,82 130,80 150,78 170,75 190,73 210,70 230,68 250,72 270,65 290,60 310,58 330,55 350,52',
    opacity: 0.35,
    width: 1,
    color: 'rgba(52,211,153,0.6)',
    dashDelay: 0.9,
  },
];

const legends = [
  { label: 'Venue A', color: 'rgba(96,165,250,1)' },
  { label: 'Venue B', color: 'rgba(255,255,255,0.6)' },
  { label: 'Venue C', color: 'rgba(250,204,21,0.7)' },
  { label: 'Venue D', color: 'rgba(52,211,153,0.6)' },
];

const yLabels = [
  { y: 20, label: '0.04%' },
  { y: 50, label: '0.02%' },
  { y: 80, label: '0.00%' },
];

export const MarketsVisual = () => {
  return (
    <div className="w-full h-full relative">
      <svg
        viewBox="0 0 360 110"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <pattern id="markets-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="0.5" fill="white" opacity="0.12" />
          </pattern>
        </defs>

        <rect width="360" height="110" fill="url(#markets-grid)" />

        {gridLines.map((ratio) => (
          <line
            key={ratio}
            x1="35"
            y1={ratio * 100 + 5}
            x2="355"
            y2={ratio * 100 + 5}
            stroke="white"
            strokeOpacity="0.12"
            strokeDasharray="2 4"
          />
        ))}

        {yLabels.map((item) => (
          <text
            key={item.label}
            x="2"
            y={item.y + 3}
            fill="white"
            fillOpacity="0.35"
            fontSize="5"
            fontFamily="monospace"
          >
            {item.label}
          </text>
        ))}

        {traces.map((trace, i) => (
          <motion.polyline
            key={i}
            points={trace.points}
            fill="none"
            stroke={trace.color}
            strokeWidth={trace.width}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={trace.opacity}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: trace.opacity }}
            transition={{
              pathLength: { duration: 1.8, delay: trace.dashDelay, ease: 'easeOut' },
              opacity: { duration: 0.4, delay: trace.dashDelay },
            }}
          />
        ))}

        {traces.map((trace, i) => {
          const lastPoint = trace.points.split(' ').pop()!;
          const [cx, cy] = lastPoint.split(',').map(Number);
          return (
            <motion.circle
              key={`dot-${i}`}
              cx={cx}
              cy={cy}
              r="2.5"
              fill={trace.color}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0.5, 1], scale: [0, 1.3, 1, 1] }}
              transition={{
                delay: 1.8 + trace.dashDelay,
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />
          );
        })}
      </svg>

      <div className="absolute top-2 right-2 flex flex-col gap-1">
        {legends.map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-[7px] font-mono text-white/40">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="absolute top-1.5 left-2">
        <span className="text-[6px] font-mono text-white/30 tracking-widest uppercase">
          Overlay
        </span>
      </div>
    </div>
  );
};

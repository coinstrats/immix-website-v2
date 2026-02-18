import { motion } from 'framer-motion';

interface ConnectorProps {
  inView: boolean;
}

const SQUARE_SIZE = 6;
const HALF = SQUARE_SIZE / 2;

export const LeftHorizontalConnector = ({ inView }: ConnectorProps) => (
  <div className="col-span-1 flex items-center justify-center relative h-80">
    <div className="absolute inset-0 flex items-center">
      <div className="w-full h-px bg-gradient-to-r from-immix-purple/30 via-immix-blue/50 to-immix-blue/30" />
    </div>

    <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ zIndex: 5 }}>
      <defs>
        <filter id="dot-glow-h">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {[0, 0.8, 1.6].map((delay, i) => (
        <motion.rect
          key={`l-fwd-${i}`}
          width={SQUARE_SIZE}
          height={SQUARE_SIZE}
          y={50 - HALF}
          fill="rgb(107, 70, 255)"
          filter="url(#dot-glow-h)"
          initial={{ opacity: 0, x: -HALF }}
          animate={inView ? {
            opacity: [0, 1, 1, 0],
            x: [-HALF, 100 - HALF],
          } : undefined}
          transition={{
            duration: 2,
            delay,
            repeat: Infinity,
            repeatDelay: 0.5,
            ease: 'linear',
          }}
        />
      ))}
      {[0.4, 1.2].map((delay, i) => (
        <motion.rect
          key={`l-rev-${i}`}
          width={SQUARE_SIZE}
          height={SQUARE_SIZE}
          y={50 - HALF}
          fill="rgb(0, 115, 255)"
          filter="url(#dot-glow-h)"
          initial={{ opacity: 0, x: 100 - HALF }}
          animate={inView ? {
            opacity: [0, 1, 1, 0],
            x: [100 - HALF, -HALF],
          } : undefined}
          transition={{
            duration: 2,
            delay,
            repeat: Infinity,
            repeatDelay: 0.5,
            ease: 'linear',
          }}
        />
      ))}
    </svg>

    <div className="absolute left-1/2 top-1/4 -translate-x-1/2 z-10">
      <div className="px-2 py-1 bg-immix-darker border border-immix-blue/30 text-xs font-mono text-immix-blue">
        5&mu;s
      </div>
    </div>
  </div>
);

export const RightHorizontalConnector = ({ inView }: ConnectorProps) => (
  <div className="col-span-1 flex items-center justify-center relative h-80">
    <div className="absolute inset-0 flex items-center">
      <div className="w-full h-px bg-gradient-to-r from-immix-blue/30 via-immix-blue/50 to-immix-blue/30" />
    </div>

    <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ zIndex: 5 }}>
      {[0, 0.5, 1.0, 1.5].map((delay, i) => (
        <motion.rect
          key={`r-fwd-${i}`}
          width={SQUARE_SIZE}
          height={SQUARE_SIZE}
          y={50 - HALF}
          fill="rgb(0, 115, 255)"
          filter="url(#dot-glow-h)"
          initial={{ opacity: 0, x: -HALF }}
          animate={inView ? {
            opacity: [0, 1, 1, 0],
            x: [-HALF, 100 - HALF],
          } : undefined}
          transition={{
            duration: 1.4,
            delay,
            repeat: Infinity,
            repeatDelay: 0.3,
            ease: 'linear',
          }}
        />
      ))}
      {[0.25, 0.75, 1.25].map((delay, i) => (
        <motion.rect
          key={`r-rev-${i}`}
          width={SQUARE_SIZE}
          height={SQUARE_SIZE}
          y={50 - HALF}
          fill="rgb(0, 115, 255)"
          filter="url(#dot-glow-h)"
          initial={{ opacity: 0, x: 100 - HALF }}
          animate={inView ? {
            opacity: [0, 1, 1, 0],
            x: [100 - HALF, -HALF],
          } : undefined}
          transition={{
            duration: 1.4,
            delay,
            repeat: Infinity,
            repeatDelay: 0.3,
            ease: 'linear',
          }}
        />
      ))}
    </svg>

    <div className="absolute left-1/2 bottom-1/4 -translate-x-1/2 z-10">
      <div className="px-2 py-1 bg-immix-darker border border-immix-blue/30 text-xs font-mono text-immix-blue">
        70+ venues
      </div>
    </div>
  </div>
);

export const VerticalConnector = ({ inView }: ConnectorProps) => (
  <div className="w-full flex items-center justify-center relative h-20 mb-2">
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="h-full w-px bg-gradient-to-b from-immix-blue/30 via-emerald-600/50 to-emerald-600/30" />
      </div>

      <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ zIndex: 5 }}>
        <defs>
          <filter id="dot-glow-v">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {[0, 0.5, 1.0].map((delay, i) => (
          <motion.rect
            key={`down-${i}`}
            width={SQUARE_SIZE}
            height={SQUARE_SIZE}
            x={50 - HALF}
            fill="rgb(0, 115, 255)"
            filter="url(#dot-glow-v)"
            initial={{ opacity: 0, y: -HALF }}
            animate={inView ? {
              opacity: [0, 1, 1, 0],
              y: [-HALF, 100 - HALF],
            } : undefined}
            transition={{
              duration: 1.2,
              delay,
              repeat: Infinity,
              repeatDelay: 1.0,
              ease: 'linear',
            }}
          />
        ))}
        {[0.25, 0.75].map((delay, i) => (
          <motion.rect
            key={`up-${i}`}
            width={SQUARE_SIZE}
            height={SQUARE_SIZE}
            x={50 - HALF}
            fill="rgb(5, 150, 105)"
            filter="url(#dot-glow-v)"
            initial={{ opacity: 0, y: 100 - HALF }}
            animate={inView ? {
              opacity: [0, 1, 1, 0],
              y: [100 - HALF, -HALF],
            } : undefined}
            transition={{
              duration: 1.2,
              delay,
              repeat: Infinity,
              repeatDelay: 1.0,
              ease: 'linear',
            }}
          />
        ))}
      </svg>
    </div>
  </div>
);

export const SequencerInternalAnimation = ({ inView }: ConnectorProps) => {
  const SQ = 5;
  const SQ_HALF = SQ / 2;

  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ zIndex: 1 }}>
      <defs>
        <filter id="sequencer-glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <line x1="50" y1="15" x2="30" y2="80" stroke="rgb(148, 163, 184)" strokeOpacity="0.2" strokeWidth="0.5" strokeDasharray="4,4" />
      <line x1="50" y1="15" x2="70" y2="80" stroke="rgb(148, 163, 184)" strokeOpacity="0.2" strokeWidth="0.5" strokeDasharray="4,4" />

      <motion.rect
        width={SQ}
        height={SQ}
        fill="rgb(59, 130, 246)"
        filter="url(#sequencer-glow)"
        initial={{ opacity: 0, x: 50 - SQ_HALF, y: 15 - SQ_HALF }}
        animate={inView ? {
          opacity: [0, 1, 1, 0],
          x: [50 - SQ_HALF, 30 - SQ_HALF],
          y: [15 - SQ_HALF, 80 - SQ_HALF],
        } : undefined}
        transition={{ duration: 0.7, delay: 0, repeat: Infinity, repeatDelay: 1.3, ease: 'linear' }}
      />

      <motion.rect
        width={SQ}
        height={SQ}
        fill="rgb(59, 130, 246)"
        filter="url(#sequencer-glow)"
        initial={{ opacity: 0, x: 50 - SQ_HALF, y: 15 - SQ_HALF }}
        animate={inView ? {
          opacity: [0, 1, 1, 0],
          x: [50 - SQ_HALF, 70 - SQ_HALF],
          y: [15 - SQ_HALF, 80 - SQ_HALF],
        } : undefined}
        transition={{ duration: 0.7, delay: 0, repeat: Infinity, repeatDelay: 1.3, ease: 'linear' }}
      />

      <motion.rect
        width={SQ}
        height={SQ}
        fill="rgb(59, 130, 246)"
        filter="url(#sequencer-glow)"
        initial={{ opacity: 0, x: 30 - SQ_HALF, y: 80 - SQ_HALF }}
        animate={inView ? {
          opacity: [0, 1, 1, 0],
          x: [30 - SQ_HALF, 50 - SQ_HALF],
          y: [80 - SQ_HALF, 15 - SQ_HALF],
        } : undefined}
        transition={{ duration: 0.7, delay: 0.7, repeat: Infinity, repeatDelay: 1.3, ease: 'linear' }}
      />

      <motion.rect
        width={SQ}
        height={SQ}
        fill="rgb(59, 130, 246)"
        filter="url(#sequencer-glow)"
        initial={{ opacity: 0, x: 70 - SQ_HALF, y: 80 - SQ_HALF }}
        animate={inView ? {
          opacity: [0, 1, 1, 0],
          x: [70 - SQ_HALF, 50 - SQ_HALF],
          y: [80 - SQ_HALF, 15 - SQ_HALF],
        } : undefined}
        transition={{ duration: 0.7, delay: 0.7, repeat: Infinity, repeatDelay: 1.3, ease: 'linear' }}
      />
    </svg>
  );
};

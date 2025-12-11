import { motion } from 'framer-motion';

export const DataFlowLines = () => {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
          <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </linearGradient>
      </defs>

      <path
        d="M 50% 50% L 75% 20%"
        stroke="url(#lineGradient)"
        strokeWidth="1"
        strokeDasharray="4 4"
        fill="none"
        opacity="0.3"
      />

      <motion.circle
        cx="50%"
        cy="50%"
        r="3"
        fill="#3b82f6"
        initial={{ offsetDistance: '0%' }}
        animate={{ offsetDistance: '100%' }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 1
        }}
        style={{ offsetPath: 'path("M 50% 50% L 75% 20%")' }}
      >
        <animateMotion
          dur="3s"
          repeatCount="indefinite"
          path="M 0 0 L 300 -180"
        />
      </motion.circle>

      <path
        d="M 50% 50% L 20% 85%"
        stroke="url(#lineGradient)"
        strokeWidth="1"
        strokeDasharray="4 4"
        fill="none"
        opacity="0.3"
      />

      <motion.circle
        cx="50%"
        cy="50%"
        r="3"
        fill="#3b82f6"
      >
        <animateMotion
          dur="3.5s"
          repeatCount="indefinite"
          path="M 0 0 L -180 210"
          begin="0.5s"
        />
      </motion.circle>

      <path
        d="M 50% 50% L 15% 25%"
        stroke="url(#lineGradient)"
        strokeWidth="1"
        strokeDasharray="4 4"
        fill="none"
        opacity="0.3"
      />

      <motion.circle
        cx="50%"
        cy="50%"
        r="3"
        fill="#3b82f6"
      >
        <animateMotion
          dur="2.8s"
          repeatCount="indefinite"
          path="M 0 0 L -210 -150"
          begin="1s"
        />
      </motion.circle>
    </svg>
  );
};

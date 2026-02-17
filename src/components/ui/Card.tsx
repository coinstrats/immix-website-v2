import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  glowing?: boolean;
  delay?: number;
}

export const Card = ({ children, className = '', glowing = true, delay = 0 }: CardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}

      className={`${glowing ? 'glow-border' : 'border border-white/10'} rounded-lg bg-immix-dark/50 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-immix-dark/70 hover:glow-border-lg ${className}`}
    >
      {children}
    </motion.div>
  );
};

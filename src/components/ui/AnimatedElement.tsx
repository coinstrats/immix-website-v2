import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AnimatedElementProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  type?: 'fadeInUp' | 'fadeIn' | 'slideInLeft' | 'slideInRight';
  className?: string;
}

const variants = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  slideInLeft: {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0 },
  },
  slideInRight: {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
  },
};

export const AnimatedElement = ({
  children,
  delay = 0,
  duration = 0.6,
  type = 'fadeInUp',
  className = '',
}: AnimatedElementProps) => {
  return (
    <motion.div
      initial={variants[type].initial}
      whileInView={variants[type].animate}
      transition={{ duration, delay }}
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

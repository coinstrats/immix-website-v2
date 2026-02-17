import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  glowing?: boolean;
  delay?: number;
}

export const Card = ({ children, className = '', glowing = true }: CardProps) => {
  return (
    <div
      className={`${glowing ? 'glow-border' : 'border border-white/10'} rounded-lg bg-immix-dark/50 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-immix-dark/70 hover:glow-border-lg ${className}`}
    >
      {children}
    </div>
  );
};

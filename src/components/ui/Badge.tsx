import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'blue' | 'purple' | 'neutral';
  className?: string;
}

export const Badge = ({ children, variant = 'blue', className = '' }: BadgeProps) => {
  const variantClasses = {
    blue: 'bg-immix-blue/10 text-immix-blue border-immix-blue/30',
    purple: 'bg-immix-purple/10 text-immix-purple border-immix-purple/30',
    neutral: 'bg-white/10 text-white/70 border-white/20',
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-mono border ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

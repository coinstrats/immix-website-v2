import { ReactNode } from 'react';

interface AnimatedElementProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  type?: 'fadeInUp' | 'fadeIn' | 'slideInLeft' | 'slideInRight';
  className?: string;
}

export const AnimatedElement = ({
  children,
  className = '',
}: AnimatedElementProps) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

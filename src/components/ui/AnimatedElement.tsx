import { ReactNode, useEffect, useRef, useState } from 'react';

interface AnimatedElementProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  type?: 'fadeInUp' | 'fadeIn' | 'slideInLeft' | 'slideInRight';
  className?: string;
}

const animationMap: Record<string, string> = {
  fadeInUp: 'animate-fade-in-up',
  fadeIn: 'animate-fade-in',
  slideInLeft: 'animate-slide-in-left',
  slideInRight: 'animate-slide-in-right',
};

export const AnimatedElement = ({
  children,
  delay = 0,
  type = 'fadeInUp',
  className = '',
}: AnimatedElementProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${isVisible ? animationMap[type] : ''} ${className}`}
      style={{
        opacity: isVisible ? undefined : 0,
        animationDelay: delay ? `${delay}s` : undefined,
      }}
    >
      {children}
    </div>
  );
};

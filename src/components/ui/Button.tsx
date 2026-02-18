import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  href?: string;
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  onClick,
  disabled = false,
  href,
}: ButtonProps) => {
  const variantClasses = {
    primary: 'button-primary',
    secondary: 'button-secondary',
    ghost: 'button-ghost',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg',
  };

  const Component = href ? motion.a : motion.button;
  const componentProps = href
    ? { href, target: '_blank', rel: 'noopener noreferrer' }
    : { onClick, disabled };

  return (
    <Component
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      {...componentProps}
      className={`${variantClasses[variant]} ${sizeClasses[size]} ${className} inline-flex items-center gap-2 font-semibold whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      <span>{children}</span>
    </Component>
  );
};

// src/components/ui/Button.tsx
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}, ref) => {
  const baseStyles = 'font-semibold rounded-md transition-colors duration-200';

  const variantStyles = {
    primary: 'bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-75',
  };

  const sizeStyles = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-3 text-lg',
  };

  const allStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className || ''}`;

  return (
    <button ref={ref} className={allStyles} {...props}>
      {children}
    </button>
  );
});

export default Button;

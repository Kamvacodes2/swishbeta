// src/components/ui/Spinner.tsx
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string; // Tailwind class like 'text-green-500'
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'md', color = 'text-green-500', className }) => {
  const sizeStyles = {
    sm: 'h-4 w-4 border-2',
    md: 'h-6 w-6 border-3',
    lg: 'h-8 w-8 border-4',
  };

  return (
    <div
      className={twMerge(
        'inline-block animate-spin rounded-full border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]',
        sizeStyles[size],
        color,
        className
      )}
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
};

export default Spinner;

// src/components/ui/Card.tsx
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
  const baseStyles = 'bg-white rounded-lg shadow-md p-6';

  return (
    <div className={twMerge(baseStyles, className)} {...props}>
      {children}
    </div>
  );
};

export default Card;

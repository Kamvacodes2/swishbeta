// src/components/ui/Input.tsx
import React from 'react';
import { twMerge } from 'tailwind-merge'; // Consider adding tailwind-merge

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, className, id, ...props }) => {
  const inputId = id || props.name || `input-${Math.random().toString(36).substr(2, 9)}`;

  const baseStyles = 'block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm';
  const errorStyles = 'border-red-500 focus:border-red-500 focus:ring-red-500';
  const defaultStyles = 'border-gray-300';

  const allStyles = twMerge(
    baseStyles,
    error ? errorStyles : defaultStyles,
    className
  );

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input id={inputId} className={allStyles} {...props} />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;

// Button.tsx

import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'ghost' | 'solid';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, variant = 'solid', className = '' }) => {
  const baseStyles = 'w-full flex items-center space-x-2 py-2 px-4 rounded-md transition-all duration-200';
  const variantStyles =
    variant === 'ghost'
      ? 'text-gray-800 hover:bg-gray-200'
      : 'bg-blue-600 text-white hover:bg-blue-700';

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles} ${className}`}
    >
      {children}
    </button>
  );
};

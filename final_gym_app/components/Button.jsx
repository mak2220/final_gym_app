"use client"

import React from 'react';

const Button = ({ text, onClick, type = 'button', className = '' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;


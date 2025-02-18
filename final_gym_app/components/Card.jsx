"use client"

import React from 'react';

const Card = ({ title, content, className = '' }) => {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-lg ${className}`}>
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <p className="mt-2 text-gray-600">{content}</p>
    </div>
  );
};

export default Card;


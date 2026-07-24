import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: number;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className = '', size = 42 }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* Stylized Intertwined Butterfly / Vine Knot Icon */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-neutral-900 mb-2"
      >
        {/* Outer subtle loops */}
        <path
          d="M32 8 C 22 8, 14 18, 14 28 C 14 36, 22 42, 32 56 C 42 42, 50 36, 50 28 C 50 18, 42 8, 32 8 Z"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Left inner loop */}
        <path
          d="M32 20 C 24 20, 18 26, 18 32 C 18 38, 24 42, 32 48"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        {/* Right inner loop */}
        <path
          d="M32 20 C 40 20, 46 26, 46 32 C 46 38, 40 42, 32 48"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        {/* Center vertical accent line */}
        <path
          d="M32 14 V 50"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        {/* Center cross balance knot */}
        <circle cx="32" cy="32" r="3.5" fill="currentColor" />
      </svg>

      {/* Tracked English text */}
      <div className="text-[10px] tracking-[0.38em] font-medium text-neutral-800 uppercase font-sans mb-1 pl-[0.38em]">
        QIANTENGYIHAO
      </div>

      {/* Bold Chinese title */}
      <div className="text-base font-bold tracking-[0.3em] text-neutral-900 font-serif pl-[0.3em]">
        黔 藤 壹 号
      </div>
    </div>
  );
};

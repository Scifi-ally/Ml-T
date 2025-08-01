import React from "react";

interface MLTIconProps {
  className?: string;
}

export const MLTIcon: React.FC<MLTIconProps> = ({ className = "" }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ML-T icon design */}
      <g>
        {/* M */}
        <path d="M2 5 L2 19 L4 19 L4 8 L6.5 13 L7.5 13 L10 8 L10 19 L12 19 L12 5 L9.5 5 L7 11 L4.5 5 Z" />
        {/* L */}
        <path d="M14 5 L14 17 L20 17 L20 19 L12 19 L12 5 Z" />
        {/* Dash */}
        <rect x="10.5" y="11" width="2" height="1.5" />
        {/* T */}
        <path d="M16 3 L24 3 L24 5 L21 5 L21 15 L19 15 L19 5 L16 5 Z" />
      </g>
    </svg>
  );
};

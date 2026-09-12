import React from 'react';

interface SectionDividerProps {
  /** Optional custom styling classes */
  className?: string;
  /** Whether to render the soft horizontal amber ambient glow */
  glow?: boolean;
}

/**
 * SectionDivider component featuring a subtle, horizontal glowing amber line
 * with a 1px opacity gradient to visually separate major sections with refined hierarchy.
 */
export const SectionDivider: React.FC<SectionDividerProps> = ({
  className = '',
  glow = true,
}) => {
  return (
    <div
      className={`relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-none select-none my-2 sm:my-4 ${className}`}
      aria-hidden="true"
    >
      <div className="relative flex items-center justify-center w-full">
        {/* Soft diffused ambient glow behind the amber line */}
        {glow && (
          <div className="absolute h-3.5 w-3/4 max-w-2xl bg-gradient-to-r from-transparent via-[#FF7A18]/25 to-transparent blur-md transform -translate-y-1/2 pointer-events-none" />
        )}

        {/* 1px horizontal line with smooth horizontal opacity gradient (transparent -> glowing amber -> transparent) */}
        <div className="relative w-full h-[1px] bg-gradient-to-r from-transparent via-[#FF7A18]/50 to-transparent" />

        {/* Subtle center highlight for refined glowing visual accent */}
        <div className="absolute w-28 sm:w-56 h-[1px] bg-gradient-to-r from-transparent via-[#FFA053]/85 to-transparent blur-[0.5px]" />
      </div>
    </div>
  );
};
export default SectionDivider;

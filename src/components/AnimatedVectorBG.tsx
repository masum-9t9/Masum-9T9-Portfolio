import React from 'react';

export const AnimatedVectorBG: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none select-none overflow-hidden bg-[#0E0A07]">
      {/* Primary Top Fiery Amber Spotlight */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% -10%, rgba(235, 94, 40, 0.15) 0%, rgba(14, 10, 7, 0) 70%)`
        }}
      />
      
      {/* GPU-Accelerated Floating Fiery Light Orb 1 */}
      <div 
        className="absolute top-1/4 left-1/5 w-80 sm:w-96 h-80 sm:h-96 rounded-full blur-3xl pointer-events-none animate-float-gentle will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(255, 122, 24, 0.16) 0%, transparent 70%)',
          opacity: 0.25,
          animationDuration: '14s',
        }}
      />

      {/* GPU-Accelerated Floating Fiery Light Orb 2 */}
      <div 
        className="absolute top-2/3 right-1/4 w-80 sm:w-[28rem] h-80 sm:h-[28rem] rounded-full blur-3xl pointer-events-none animate-float-gentle will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(232, 89, 12, 0.14) 0%, transparent 70%)',
          opacity: 0.2,
          animationDuration: '18s',
          animationDelay: '-5s',
        }}
      />

      {/* Subtle Fine Stardust / Mesh Overlay */}
      <div className="absolute inset-0 fiery-stardust pointer-events-none opacity-40" />

      {/* Subtle Depth Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, transparent 40%, rgba(14, 10, 7, 0.75) 100%)`
        }}
      />
    </div>
  );
};


import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
  return (
    <div
      className={`animate-pulse bg-white/5 border border-white/10 rounded-2xl relative overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </div>
  );
};

export const ProjectCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-3xl bg-[#0e172a] border border-white/10 p-5 sm:p-6 flex flex-col justify-between h-full shadow-xl relative overflow-hidden">
      <div className="flex flex-col flex-grow">
        {/* 16:9 Thumbnail Image Placeholder */}
        <Skeleton className="dynamic-aspect-ratio rounded-2xl mb-4 w-full" />
        
        {/* Title placeholder */}
        <Skeleton className="h-6 w-4/5 rounded-lg mb-2" />
        
        {/* Views & author placeholder */}
        <Skeleton className="h-3.5 w-1/2 rounded-md mb-3" />
        
        {/* Description placeholder */}
        <Skeleton className="h-3.5 w-full rounded-md mb-2" />
        <Skeleton className="h-3.5 w-4/5 rounded-md mb-4" />
        
        {/* Compact Metadata Box */}
        <div className="mb-4 p-3 rounded-xl bg-[#060c1a] border border-white/5 space-y-2">
          <div className="flex justify-between items-center">
            <Skeleton className="h-3 w-16 rounded" />
            <div className="flex gap-1">
              <Skeleton className="h-4 w-12 rounded" />
              <Skeleton className="h-4 w-14 rounded" />
            </div>
          </div>
          <div className="flex justify-between items-center pt-1 border-t border-white/5">
            <Skeleton className="h-3 w-20 rounded" />
            <Skeleton className="h-3 w-20 rounded" />
          </div>
        </div>

        {/* 2-Column features grid placeholder */}
        <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-[#090f1d] border border-white/5 mb-4 mt-auto">
          <Skeleton className="h-3.5 w-full rounded" />
          <Skeleton className="h-3.5 w-full rounded" />
          <Skeleton className="h-3.5 w-full rounded" />
          <Skeleton className="h-3.5 w-full rounded" />
        </div>
      </div>

      {/* Footer placeholder */}
      <div className="pt-3.5 border-t border-white/10 flex items-center justify-between gap-3 mt-auto">
        <div className="space-y-1">
          <Skeleton className="h-2.5 w-16 rounded" />
          <Skeleton className="h-4 w-24 rounded" />
        </div>
        <Skeleton className="h-9 w-28 rounded-xl" />
      </div>
    </div>
  );
};

export const ServiceCardSkeleton: React.FC = () => {
  return (
    <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col justify-between shadow-xl relative overflow-hidden">
      <div>
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-5 w-5 rounded-full" />
        </div>

        <Skeleton className="h-7 w-2/3 rounded-lg mb-3" />
        <Skeleton className="h-4 w-full rounded-md mb-2" />
        <Skeleton className="h-4 w-5/6 rounded-md mb-6" />

        <div className="space-y-2.5 mb-6">
          <Skeleton className="h-3 w-28 rounded-md mb-3" />
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-11/12 rounded-md" />
          <Skeleton className="h-4 w-4/5 rounded-md" />
        </div>
      </div>

      <div className="pt-4 border-t border-white/10 flex items-center justify-between">
        <Skeleton className="h-4 w-32 rounded-md" />
        <Skeleton className="h-8 w-28 rounded-xl" />
      </div>
    </div>
  );
};

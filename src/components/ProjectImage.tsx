import React, { useState, useEffect } from 'react';

interface ProjectImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  aspectRatioClass?: string;
  showAmbientBlur?: boolean;
  fallbackSrc?: string;
}

export const ProjectImage: React.FC<ProjectImageProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
  containerClassName = '',
  aspectRatioClass = 'dynamic-aspect-ratio',
  showAmbientBlur = true,
  fallbackSrc = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
    setIsLoaded(false);
  }, [src]);

  return (
    <div className={`relative overflow-hidden bg-[#060b17] ${aspectRatioClass} ${containerClassName}`}>
      {/* Animated Shimmer Skeleton placeholder while image is loading */}
      {!isLoaded && (
        <div className="absolute inset-0 z-10 bg-neutral-900/90 overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      )}

      {/* Ambient Blurred Backdrop */}
      {showAmbientBlur && (
        <img
          src={imgSrc}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 w-full h-full object-cover blur-xl opacity-30 scale-125 pointer-events-none transition-opacity duration-500 ${
            isLoaded ? 'opacity-30' : 'opacity-0'
          }`}
        />
      )}

      {/* Main Foreground Image */}
      <img
        src={imgSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          if (imgSrc !== fallbackSrc) {
            setImgSrc(fallbackSrc);
          }
          setIsLoaded(true);
        }}
        className={`${className} transition-opacity duration-500 ease-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};

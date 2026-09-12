import React, { useEffect, useRef } from 'react';

interface LiquidEmberMotionBackgroundProps {
  /** Optional URL to a video loop */
  videoSrc?: string;
  /** Opacity of the background layer (0 to 1). Defaults to 0.42 */
  opacity?: number;
  /** Optional extra Tailwind or custom classes */
  className?: string;
}

interface EmberParticle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  swaySpeed: number;
  swayOffset: number;
  opacity: number;
  baseOpacity: number;
  hue: number; // 24-46 for deep orange, amber, and gold
}

export const LiquidEmberMotionBackground: React.FC<LiquidEmberMotionBackgroundProps> = ({
  videoSrc,
  opacity = 0.42,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Initialize warm glowing embers
    const emberCount = Math.min(Math.floor(width / 32), 46);
    const embers: EmberParticle[] = Array.from({ length: emberCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      speedY: Math.random() * 0.75 + 0.35,
      swaySpeed: Math.random() * 0.02 + 0.008,
      swayOffset: Math.random() * Math.PI * 2,
      opacity: Math.random() * 0.7 + 0.3,
      baseOpacity: Math.random() * 0.7 + 0.3,
      hue: 24 + Math.random() * 22, // Rich amber/fire range
    }));

    let step = 0;

    const render = () => {
      step += 0.016;
      ctx.clearRect(0, 0, width, height);

      // 1. Procedural liquid fluid currents
      const gradient = ctx.createLinearGradient(0, height * 0.25, 0, height);
      gradient.addColorStop(0, 'rgba(255, 122, 24, 0)');
      gradient.addColorStop(0.55, 'rgba(255, 102, 0, 0.08)');
      gradient.addColorStop(1, 'rgba(217, 72, 0, 0.2)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(0, height);

      // Wave harmonic 1
      for (let x = 0; x <= width; x += 15) {
        const wave1 = Math.sin(x * 0.004 + step) * 26;
        const wave2 = Math.cos(x * 0.007 - step * 0.85) * 16;
        const wave3 = Math.sin(x * 0.012 + step * 1.2) * 10;
        const y = height * 0.74 + wave1 + wave2 + wave3;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();

      // Wave harmonic 2: Deeper molten current
      const gradient2 = ctx.createLinearGradient(0, height * 0.55, width, height);
      gradient2.addColorStop(0, 'rgba(255, 146, 56, 0.05)');
      gradient2.addColorStop(1, 'rgba(255, 80, 0, 0.14)');

      ctx.fillStyle = gradient2;
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 20) {
        const waveA = Math.cos(x * 0.005 - step * 1.1) * 30;
        const waveB = Math.sin(x * 0.009 + step * 0.75) * 14;
        const y = height * 0.84 + waveA + waveB;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();

      // 2. Rising glowing embers
      for (let i = 0; i < embers.length; i++) {
        const p = embers[i];
        p.y -= p.speedY;
        p.swayOffset += p.swaySpeed;
        p.x += Math.sin(p.swayOffset) * 0.7;

        // Subtle flicker
        const flicker = Math.sin(p.swayOffset * 3) * 0.2;
        p.opacity = Math.max(0.1, Math.min(1, p.baseOpacity + flicker));

        // Respawn off bounds
        if (p.y < -12) {
          p.y = height + 12;
          p.x = Math.random() * width;
        }
        if (p.x < -12) p.x = width + 12;
        if (p.x > width + 12) p.x = -12;

        // Draw ember particle
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 65%, ${p.opacity})`;
        ctx.shadowColor = `hsla(${p.hue}, 100%, 50%, 0.85)`;
        ctx.shadowBlur = p.size * 5;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden z-0 select-none ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Optional video loop if provided */}
      {videoSrc && (
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover mix-blend-screen filter saturate-150 contrast-125"
        />
      )}

      {/* Fluid wave dynamics & rising embers canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full mix-blend-screen"
      />

      {/* Atmospheric depth vignettes for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0E0A07] via-transparent to-[#0E0A07]/70" />
      <div className="absolute inset-0 bg-radial-vignette opacity-50" />
    </div>
  );
};

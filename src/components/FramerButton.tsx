import React, { useState, useRef } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

export type ButtonVariant = 'primary' | 'secondary' | 'glass' | 'pill' | 'icon' | 'outline' | 'gold';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export interface FramerButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  enableMagnetic?: boolean;
  enableShine?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  href?: string;
  target?: string;
  rel?: string;
  as?: 'button' | 'a';
}

export const FramerButton: React.FC<FramerButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  enableMagnetic = true,
  enableShine = true,
  icon,
  iconPosition = 'right',
  href,
  target,
  rel,
  as = href ? 'a' : 'button',
  onClick,
  disabled,
  ...rest
}) => {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Magnetic Micro-Interaction
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!enableMagnetic || disabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // Calculate distance from center (damped)
    const distanceX = (e.clientX - centerX) * 0.18;
    const distanceY = (e.clientY - centerY) * 0.18;
    setMousePos({ x: distanceX, y: distanceY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  // Base sizing classes
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs font-semibold rounded-xl gap-1.5',
    md: 'px-6 py-3 text-xs sm:text-sm font-bold rounded-full gap-2',
    lg: 'px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-bold tracking-wider uppercase rounded-full gap-2.5',
    icon: 'p-2.5 sm:p-3 rounded-2xl aspect-square flex items-center justify-center',
  }[size];

  // Variant design styling
  const variantClasses = {
    primary:
      'bg-gradient-to-r from-[#FFA053] via-[#FF852E] to-[#F76707] text-white border border-white/40 shadow-[0_4px_18px_rgba(255,122,24,0.35),inset_0_1px_1px_rgba(255,255,255,0.65)] hover:brightness-110 hover:shadow-[0_6px_24px_rgba(255,122,24,0.5),inset_0_1px_2px_rgba(255,255,255,0.85)] hover:-translate-y-0.5 transition-all duration-200',
    secondary:
      'bg-[#18120C]/90 text-[#FAF6F0] border border-[#FF852E]/30 backdrop-blur-xl shadow-[0_4px_16px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.12)] hover:border-[#FFA053]/60 hover:text-white',
    glass:
      'bg-[#16100B]/80 text-[#FAF6F0] border border-[#FF852E]/20 backdrop-blur-2xl shadow-lg hover:border-[#FFA053]/50 hover:bg-[#20150E]/90',
    pill:
      'bg-[#18120C]/90 text-[#FAF6F0] border border-[#FF852E]/25 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide backdrop-blur-lg hover:border-[#FFA053]/50',
    icon:
      'bg-[#18120C]/85 text-[#A9A39A] border border-[#FF852E]/20 rounded-2xl backdrop-blur-xl shadow-md hover:text-[#FAF6F0] hover:border-[#FFA053]/50',
    outline:
      'bg-transparent text-[#FAF6F0] border border-[#FF852E]/35 hover:bg-[#FF852E]/10 hover:border-[#FFA053]/70',
    gold:
      'bg-gradient-to-r from-[#FFB06E] via-[#FFA053] to-[#FF852E] text-white border border-[#FFA053]/50 shadow-[0_0_20px_rgba(255,140,50,0.3)]',
  }[variant];

  // Motion physics configuration
  const motionProps = {
    animate: {
      x: mousePos.x,
      y: mousePos.y,
    },
    whileHover: {
      scale: variant === 'icon' ? 1.08 : 1.025,
      y: mousePos.y - 1.5,
      transition: { type: 'spring', stiffness: 450, damping: 15 },
    },
    whileTap: {
      scale: 0.94,
      y: mousePos.y + 1,
      transition: { type: 'spring', stiffness: 500, damping: 20 },
    },
    transition: {
      type: 'spring',
      stiffness: 350,
      damping: 20,
    },
  };

  const sharedClassName = `relative inline-flex items-center justify-center overflow-hidden cursor-pointer select-none transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#C7B79A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0C0A] disabled:opacity-40 disabled:pointer-events-none ${sizeClasses} ${variantClasses} ${className}`;

  const content = (
    <>
      {/* Specular Liquid Shine Light Sweep (Framer Motion) */}
      {enableShine && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-10"
          initial={{ x: '-120%', opacity: 0 }}
          animate={
            isHovered
              ? {
                  x: '150%',
                  opacity: [0, 0.75, 0],
                  transition: {
                    duration: 0.75,
                    ease: [0.16, 1, 0.3, 1],
                  },
                }
              : { x: '-120%', opacity: 0 }
          }
          style={{
            background:
              variant === 'primary' || variant === 'gold'
                ? 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.65) 50%, transparent 100%)'
                : 'linear-gradient(90deg, transparent 0%, rgba(199, 183, 154, 0.35) 50%, transparent 100%)',
            transform: 'skewX(-20deg)',
          }}
        />
      )}

      {/* Top Hairline Specular Edge Reflection */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

      {/* Icon (Left) */}
      {icon && iconPosition === 'left' && (
        <span className="shrink-0 transition-transform group-hover:scale-110 flex items-center">
          {icon}
        </span>
      )}

      {/* Button Text / Content */}
      {children && <span className="relative z-0 truncate">{children}</span>}

      {/* Icon (Right) */}
      {icon && iconPosition === 'right' && (
        <span className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex items-center">
          {icon}
        </span>
      )}
    </>
  );

  if (as === 'a' && href) {
    return (
      <motion.a
        ref={buttonRef as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
        className={`group ${sharedClassName}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick as any}
        {...(motionProps as any)}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={buttonRef as React.Ref<HTMLButtonElement>}
      type={rest.type || 'button'}
      disabled={disabled}
      className={`group ${sharedClassName}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      {...motionProps}
      {...rest}
    >
      {content}
    </motion.button>
  );
};

import React from 'react';
import { motion, HTMLMotionProps, Variants } from 'motion/react';

interface ScrollRevealProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'zoom-in' | 'none';
  distance?: number;
  duration?: number;
  className?: string;
  viewportOnce?: boolean;
  blur?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  direction = 'up',
  distance = 32,
  duration = 0.65,
  className = '',
  viewportOnce = true,
  blur = true,
  ...props
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: distance, x: 0, scale: 1 };
      case 'down':
        return { y: -distance, x: 0, scale: 1 };
      case 'left':
        return { x: distance, y: 0, scale: 1 };
      case 'right':
        return { x: -distance, y: 0, scale: 1 };
      case 'scale':
      case 'zoom-in':
        return { x: 0, y: distance * 0.5, scale: 0.94 };
      case 'none':
      default:
        return { x: 0, y: 0, scale: 1 };
    }
  };

  const initial = {
    opacity: 0,
    filter: blur ? 'blur(6px)' : 'none',
    ...getInitialPosition(),
  };

  const animate = {
    opacity: 1,
    filter: 'blur(0px)',
    x: 0,
    y: 0,
    scale: 1,
  };

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: viewportOnce, margin: '-50px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Smooth Apple spring cubic bezier
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const StaggerContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  viewportOnce?: boolean;
}> = ({ children, className = '', staggerDelay = 0.1, viewportOnce = true }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.05,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: viewportOnce, margin: '-40px' }}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'scale';
}> = ({ children, className = '', direction = 'up' }) => {
  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 24 : 0,
      scale: direction === 'scale' ? 0.94 : 1,
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
};

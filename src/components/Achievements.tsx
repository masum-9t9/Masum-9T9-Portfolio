import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Award, CheckCircle2, Smile, Layers, Coffee } from 'lucide-react';
import { AchievementItem } from '../types';

interface AchievementsProps {
  achievements: AchievementItem[];
}

const ICON_MAP: Record<string, React.ElementType> = {
  CheckCircle2,
  Smile,
  Award,
  Layers,
  Coffee
};

const AnimatedNumber: React.FC<{ value: number; suffix: string }> = ({ value, suffix }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let animId: number;
    let startTime: number | null = null;
    const duration = 1500;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Easing: easeOutCubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easedProgress * value));

      if (progress < 1) {
        animId = requestAnimationFrame(step);
      } else {
        setCount(value);
      }
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

export const Achievements: React.FC<AchievementsProps> = ({ achievements }) => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative border-t border-b border-[#FF7A18]/20 bg-[#0E0A07]">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 text-center">
          {achievements.map((item, index) => {
            const IconComponent = ICON_MAP[item.iconName] || Award;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-6 rounded-2xl border border-[#FF7A18]/25 bg-[#16100B] flex flex-col items-center justify-center group hover:border-[#FF7A18]/50 transition-colors shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl bg-[#1D140D] border border-[#FF7A18]/30 flex items-center justify-center text-[#FF7A18] mb-3 group-hover:scale-110 transition-transform">
                  <IconComponent className="w-6 h-6 text-[#FF7A18]" />
                </div>

                <p className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#FAF6F0] mb-1">
                  <AnimatedNumber value={item.number} suffix={item.suffix} />
                </p>

                <p className="text-xs sm:text-sm font-semibold text-[#A9A39A] uppercase tracking-wider">
                  {item.label}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { usePortfolio } from '../../context/PortfolioContext';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const { cursorText, cursorVariant } = usePortfolio();

  useEffect(() => {
    // Disable on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  const isExpanded = cursorVariant === 'project' || cursorVariant === 'pointer';

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {/* Outer halo / ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-[var(--accent-color)] flex items-center justify-center pointer-events-none shadow-[0_0_15px_var(--accent-glow)]"
        animate={{
          x: pos.x - (isExpanded ? 36 : 14),
          y: pos.y - (isExpanded ? 36 : 14),
          width: isExpanded ? 72 : 28,
          height: isExpanded ? 72 : 28,
          backgroundColor: cursorVariant === 'project' ? 'rgba(var(--accent-rgb), 0.15)' : 'transparent',
          borderColor: isExpanded ? 'var(--accent-color)' : 'rgba(255, 255, 255, 0.4)',
        }}
        transition={{
          type: 'spring',
          damping: 28,
          stiffness: 350,
          mass: 0.5,
        }}
      >
        {cursorText && (
          <span className="font-mono-tech text-[9px] font-bold tracking-wider text-[var(--accent-color)] uppercase px-1 text-center select-none">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Center dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[var(--accent-color)] pointer-events-none"
        animate={{
          x: pos.x - 3,
          y: pos.y - 3,
          scale: isExpanded ? 0 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 35,
          stiffness: 600,
          mass: 0.1,
        }}
      />
    </div>
  );
};

import { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const [isVisible, setIsVisible] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    return !isTouchDevice;
  });

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);



  useEffect(() => {
    // Only enable custom cursor on non-touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    // Add class to body to hide default cursor
    document.body.classList.add('custom-cursor-active');

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check if target or parent is interactive
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('hover-magnetic');

      setIsHovered(!!isInteractive);
    };


    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);

      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-2 h-2 bg-accent-indigo rounded-full pointer-events-none z-[9999]"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        scale: isHovered ? 0.5 : 1,
      }}
    />
  );
}

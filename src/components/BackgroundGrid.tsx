import { useEffect, useRef } from 'react';

export default function BackgroundGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      containerRef.current.style.setProperty('--mouse-x', `${x}px`);
      containerRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-transparent"
      style={{
        // Set fallback/initial values
        ['--mouse-x' as string]: '50%',
        ['--mouse-y' as string]: '30%',
      } as React.CSSProperties}
    >
      {/* Interactive Radial Spotlight Glow */}
      <div 
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: 'var(--glow-opacity)',
          background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color-1), var(--spotlight-color-2) 40%, transparent 80%)`
        }}
      />

      {/* Grid Lines Pattern using SVG */}
      <div className="absolute inset-0">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--grid-line-color)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Large Soft Glow spots */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-accent-purple/3 dark:bg-accent-purple/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-accent-indigo/3 dark:bg-accent-indigo/5 blur-[120px] pointer-events-none" />
    </div>
  );
}

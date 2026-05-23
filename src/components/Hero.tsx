import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ArrowDown, Terminal, Sparkles } from 'lucide-react';

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.8, 
        // cast as const for Framer Motion's cubic-bezier type signature
        ease: [0.16, 1, 0.3, 1] as const, 
      },
    },
  };


  return (
    <section 
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center px-4 pt-24 md:pt-32 overflow-hidden"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-5xl flex flex-col md:flex-row items-center gap-12 z-10"
      >
        {/* Text Column */}
        <div className="flex-1 flex flex-col items-start text-left">
          {/* Status Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 mb-6 text-xs text-text-muted"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Available for new opportunities
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1] mb-6 text-black dark:text-white"
          >
            Engineering{' '}
            <span className="bg-gradient-to-r from-accent-purple via-pink-500 to-accent-indigo bg-clip-text text-transparent">
              High-Fidelity
            </span>{' '}
            Web Experiences
          </motion.h1>

          {/* Paragraph */}
          <motion.p
            variants={itemVariants}
            className="text-text-muted text-lg sm:text-xl max-w-lg mb-8 leading-relaxed font-light"
          >
            I am a senior frontend engineer dedicated to creating interfaces that are pixel-perfect, highly responsive, and brought to life through smooth motion design.
          </motion.p>

          {/* Call to Actions */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex justify-center items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-accent-purple to-accent-indigo text-white font-medium hover:opacity-95 shadow-lg shadow-accent-purple/20 transition-all duration-300 hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4" />
              View My Work
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex justify-center items-center px-6 py-3.5 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-black dark:text-white font-medium border border-black/10 dark:border-white/10 transition-all duration-300 hover:scale-[1.02]"
            >
              Let's Talk
            </a>
          </motion.div>
        </div>

        {/* Code Mockup Column */}
        <motion.div
          variants={itemVariants}
          className="flex-1 w-full max-w-md md:max-w-none"
        >
          <div className="relative group rounded-2xl border border-black/10 dark:border-white/10 bg-[#0d0d11]/90 shadow-2xl overflow-hidden glass">
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            
            {/* Window controls */}
            <div className="flex justify-between items-center px-5 py-3.5 border-b border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <div className="flex items-center gap-1.5 text-xs text-text-muted">
                <Terminal className="w-3.5 h-3.5" />
                <span>developer.ts</span>
              </div>
              <div className="w-12" />
            </div>

            {/* Code editor body */}
            <div className="p-6 font-mono text-sm leading-relaxed text-left overflow-x-auto select-none">
              <span className="text-pink-400">const</span>{' '}
              <span className="text-blue-300">developer</span>{' '}
              <span className="text-pink-400">=</span>{' '}
              <span className="text-yellow-200">&#123;</span>
              <div className="pl-4">
                <span className="text-text-muted">name:</span>{' '}
                <span className="text-emerald-300">'Bhargava Teja'</span>,
              </div>
              <div className="pl-4">
                <span className="text-text-muted">role:</span>{' '}
                <span className="text-emerald-300">'Senior Fullstack Developer'</span>,
              </div>
              <div className="pl-4">
                <span className="text-text-muted">skills:</span>{' '}
                <span className="text-yellow-200">[</span>
                <span className="text-emerald-300">'TypeScript'</span>,{' '}
                <span className="text-emerald-300">'React'</span>,{' '}
                <span className="text-emerald-300">'Node.js'</span>
                <span className="text-yellow-200">]</span>,
              </div>
              <div className="pl-4">
                <span className="text-text-muted">passion:</span>{' '}
                <span className="text-emerald-300">'Crafting premium, high-fidelity UI & UX'</span>,
              </div>
              <div className="pl-4">
                <span className="text-text-muted">status:</span>{' '}
                <span className="text-emerald-300">'Ready to build amazing things'</span>
              </div>
              <span className="text-yellow-200">&#125;</span>;
            </div>

            {/* Glowing reflection */}
            <div className="absolute -inset-px rounded-2xl border border-accent-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-10"
        onClick={() => {
          document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="text-xs tracking-widest text-text-muted uppercase font-light">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4 text-text-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}

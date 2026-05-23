import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

interface INavItem {
  name: string;
  href: string;
}

const navItems: INavItem[] = [
  { name: 'Home', href: '#home' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>('#home');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      // Scroll state for background opacity
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Intersection observer-like behaviour for active section detection
      const sections = ['home', 'projects', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(`#${section}`);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl rounded-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'glass shadow-lg py-3 px-6' 
            : 'border-transparent py-5 px-8 bg-transparent border-b border-transparent'
        }`}
      >
        <nav className="flex justify-between items-center w-full">
          {/* Logo */}
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, '#home')}
            className="font-display font-bold text-xl tracking-tight bg-gradient-to-r from-accent-purple to-accent-indigo bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            &lt;DEV.TEJA/&gt;
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative px-4 py-2 text-sm transition-colors rounded-full ${
                  activeSection === item.href 
                    ? 'text-black dark:text-white font-medium' 
                    : 'text-text-muted hover:text-black dark:hover:text-white'
                }`}
              >
                {activeSection === item.href && (
                  <motion.span
                    layoutId="active-nav-indicator"
                    className="absolute inset-0 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {item.name}
              </a>
            ))}
          </div>

          {/* CTA & Theme Toggle container */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 border border-transparent hover:border-black/5 dark:hover:border-white/5 text-text-muted hover:text-black dark:hover:text-white transition-all cursor-pointer relative overflow-hidden flex items-center justify-center w-9 h-9"
              aria-label="Toggle Theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ y: -15, rotate: 45, opacity: 0 }}
                  animate={{ y: 0, rotate: 0, opacity: 1 }}
                  exit={{ y: 15, rotate: -45, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center justify-center"
                >
                  {theme === 'dark' ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
                </motion.div>
              </AnimatePresence>
            </button>

            {/* Call To Action button */}
            <div className="hidden md:block">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#111111] dark:bg-white text-white dark:text-[#030303] font-medium text-sm hover:opacity-90 hover-magnetic transition-all duration-300"
              >
                Hire Me
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1.5 text-text-muted hover:text-black dark:hover:text-white rounded-full hover:bg-black/5 dark:hover:bg-white/5 border border-black/5 dark:border-white/5"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-24 rounded-3xl glass border-white/10 p-6 z-40 md:hidden flex flex-col gap-4 shadow-2xl"
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`px-4 py-3 rounded-2xl text-lg font-medium border transition-colors ${
                  activeSection === item.href
                    ? 'bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/10 text-black dark:text-white'
                    : 'border-transparent text-text-muted hover:text-black dark:hover:text-white'
                }`}
              >
                {item.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="w-full text-center py-4 rounded-2xl bg-gradient-to-r from-accent-purple to-accent-indigo text-white font-medium hover:opacity-90 transition-opacity"
            >
              Hire Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

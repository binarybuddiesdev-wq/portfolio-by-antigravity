import CustomCursor from './components/CustomCursor';
import BackgroundGrid from './components/BackgroundGrid';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';

function App() {
  return (
    <>
      {/* Premium custom mouse follower */}
      <CustomCursor />

      {/* Interactive grid background */}
      <BackgroundGrid />

      {/* Floating navigation header */}
      <Navbar />

      {/* Main content flow */}
      <main className="relative z-10 w-full flex flex-col items-center">
        {/* Hero Landing */}
        <Hero />

        {/* Separator lines or glows */}
        <div className="w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-black/5 dark:via-white/5 to-transparent my-4" />

        {/* Curated Projects */}
        <Projects />

        <div className="w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-black/5 dark:via-white/5 to-transparent my-4" />

        {/* Skills Tech Stack */}
        <Skills />

        <div className="w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-black/5 dark:via-white/5 to-transparent my-4" />

        {/* Contact Form */}
        <Contact />
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full py-12 px-4 border-t mt-24 glass">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-display font-semibold text-black dark:text-white tracking-tight">
              &lt;DEV.TEJA/&gt;
            </span>
            <p className="text-xs text-text-muted">
              © {new Date().getFullYear()} Bhargava Teja. All rights reserved.
            </p>
          </div>
          <div className="flex gap-6 text-sm text-text-muted">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              Twitter
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;

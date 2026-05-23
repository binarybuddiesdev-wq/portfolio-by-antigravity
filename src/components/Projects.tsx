import { useState, useRef } from 'react';
import type { MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Layers } from 'lucide-react';
import type { IProject } from '../types/portfolio.types';

const projectsData: IProject[] = [
  {
    id: '1',
    title: 'Linear-style Task Manager',
    description: 'A high-performance task organizer inspired by Linear\'s sleek keyboard-first UI.',
    longDescription: 'Features nested task hierarchies, command palette menu, fast optimistic UI updates, and responsive dashboard view.',
    tags: ['React', 'TypeScript', 'TailwindCSS'],
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: true,
  },
  {
    id: '2',
    title: 'Immersive WebGL Portfolio',
    description: 'An interactive portfolio featuring high-end canvas animations and custom shaders.',
    longDescription: 'Features three-dimensional scene navigation, physics-based grid alignment, custom scroll controllers, and shaders.',
    tags: ['Three.js', 'Framer Motion', 'React'],
    imageUrl: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=800&auto=format&fit=crop',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: true,
  },
  {
    id: '3',
    title: 'Realtime Analytics Dashboard',
    description: 'Complex data engine visualizing live telemetry logs with ultra-low latency.',
    longDescription: 'Features web sockets connection, interactive chart tools, data CSV exports, customized dark/light grid palettes.',
    tags: ['Next.js', 'Node.js', 'Recharts'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: false,
  },
  {
    id: '4',
    title: 'Type-Safe API Gateway',
    description: 'High-throughput microservices proxy enforcing robust validation.',
    longDescription: 'Features automated OpenAPI spec documentation, request validation with Zod, JWT tokens auth, rate limiting cache.',
    tags: ['TypeScript', 'Zod', 'Fastify'],
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: false,
  },
];

type CategoryFilter = 'All' | 'React' | 'TypeScript' | 'Three.js';

export default function Projects() {
  const [filter, setFilter] = useState<CategoryFilter>('All');

  const filteredProjects = projectsData.filter((project) => {
    if (filter === 'All') return true;
    return project.tags.includes(filter);
  });

  return (
    <section id="projects" className="py-24 md:py-32 px-4 max-w-5xl mx-auto z-10 relative">
      {/* Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-xs text-accent-purple font-medium mb-4"
        >
          <Layers className="w-3.5 h-3.5" />
          Featured Work
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-bold text-3xl md:text-4xl tracking-tight text-black dark:text-white mb-4"
        >
          Curated Projects
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-text-muted max-w-lg mx-auto font-light"
        >
          A selection of projects that showcase clean structure, premium interfaces, and detailed micro-animations.
        </motion.p>
      </div>

      {/* Categories Filter Tabs */}
      <div className="flex justify-center gap-2 mb-12 flex-wrap">
        {(['All', 'React', 'TypeScript', 'Three.js'] as CategoryFilter[]).map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
              filter === category
                ? 'text-black dark:text-white border-black/10 dark:border-white/10'
                : 'text-text-muted border-transparent hover:text-black dark:hover:text-white'
            }`}
          >
            {filter === category && (
              <motion.span
                layoutId="active-category-indicator"
                className="absolute inset-0 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-full -z-10"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            {category}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

// Separate component for Card to enable mouse spotlight glow hooks
function ProjectCard({ project }: { project: IProject }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      style={{
        ['--mouse-x' as string]: '0px',
        ['--mouse-y' as string]: '0px',
      } as React.CSSProperties}
      className="group relative rounded-3xl p-6 flex flex-col justify-between glass hover:border-black/15 dark:hover:border-white/15 overflow-hidden transition-all duration-300"
    >
      {/* Glare spotlight overlay */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), var(--card-glare), transparent 80%)`
        }}
      />
      
      <div>
        {/* Project Thumbnail */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-6 bg-black/5 dark:bg-white/5">
          <img 
            src={project.imageUrl} 
            alt={project.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.map((tag) => (
            <span 
              key={tag} 
              className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-text-muted font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Project Title */}
        <h3 className="font-display font-semibold text-xl text-black dark:text-white mb-2 group-hover:text-accent-purple transition-colors">
          {project.title}
        </h3>

        {/* Project Description */}
        <p className="text-text-muted text-sm font-light leading-relaxed mb-4">
          {project.description}
        </p>
      </div>

      {/* Footer Links */}
      <div className="flex gap-4 items-center mt-6 pt-4 border-t border-black/5 dark:border-white/5">
        {project.githubUrl && (
          <a 
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-black dark:hover:text-white transition-colors"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            Source Code
          </a>
        )}
        {project.liveUrl && (
          <a 
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-black dark:hover:text-white transition-colors ml-auto"
          >
            Live Preview
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </motion.div>
  );
}

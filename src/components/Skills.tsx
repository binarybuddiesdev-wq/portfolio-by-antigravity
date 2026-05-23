import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { 
  Code2, 
  Cpu, 
  Database, 
  Layers, 
  GitBranch, 
  Server, 
  Cloud, 
  Terminal, 
  Sparkles, 
  Zap, 
  Globe, 
  ArrowUpRight 
} from 'lucide-react';
import type { ISkill } from '../types/portfolio.types';

const skillsData: ISkill[] = [
  // Frontend
  { name: 'React', category: 'Frontend', iconName: 'Cpu' },
  { name: 'Next.js', category: 'Frontend', iconName: 'Globe' },
  { name: 'TailwindCSS', category: 'Frontend', iconName: 'Layers' },
  { name: 'Framer Motion', category: 'Frontend', iconName: 'Sparkles' },
  
  // Backend
  { name: 'Node.js', category: 'Backend', iconName: 'Server' },
  { name: 'Fastify', category: 'Backend', iconName: 'Zap' },
  { name: 'PostgreSQL', category: 'Backend', iconName: 'Database' },
  { name: 'GraphQL', category: 'Backend', iconName: 'Layers' },
  
  // Languages
  { name: 'TypeScript', category: 'Language', iconName: 'Code2' },
  { name: 'JavaScript', category: 'Language', iconName: 'Code2' },
  { name: 'Python', category: 'Language', iconName: 'Terminal' },
  { name: 'SQL', category: 'Language', iconName: 'Database' },

  // Tools & Infrastructure
  { name: 'Git', category: 'Tools', iconName: 'GitBranch' },
  { name: 'Docker', category: 'Tools', iconName: 'Terminal' },
  { name: 'AWS', category: 'Tools', iconName: 'Cloud' },
  { name: 'Vercel', category: 'Tools', iconName: 'Cloud' },
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code2,
  Cpu,
  Database,
  Layers,
  GitBranch,
  Server,
  Cloud,
  Terminal,
  Sparkles,
  Zap,
  Globe,
};

export default function Skills() {
  const categories = ['Frontend', 'Backend', 'Language', 'Tools'] as const;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.5, 
        // Cast as const to resolve literal type compatibility check
        ease: 'easeOut' as const, 
      },
    },
  };

  return (
    <section id="skills" className="py-24 md:py-32 px-4 max-w-5xl mx-auto z-10 relative">
      {/* Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent-indigo/10 border border-accent-indigo/20 text-xs text-accent-indigo font-medium mb-4"
        >
          <Cpu className="w-3.5 h-3.5" />
          Core Capabilities
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-bold text-3xl md:text-4xl tracking-tight text-black dark:text-white mb-4"
        >
          My Tech Stack
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-text-muted max-w-lg mx-auto font-light"
        >
          Modern languages, libraries, framework stacks, and tools that I utilize to build performant and maintainable products.
        </motion.p>
      </div>

      {/* Grid containing categories */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {categories.map((category) => {
          const categorySkills = skillsData.filter(s => s.category === category);
          
          return (
            <motion.div 
              key={category}
              variants={itemVariants}
              className="rounded-3xl p-6 glass hover:border-black/10 dark:hover:border-white/10 transition-all duration-300"
            >
              <h3 className="text-black dark:text-white font-medium text-lg mb-6 text-left flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-indigo" />
                {category}
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                {categorySkills.map((skill) => {
                  const IconComponent = iconMap[skill.iconName] || Code2;
                  
                  return (
                    <motion.div
                      key={skill.name}
                      whileHover={{ scale: 1.03, y: -2 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                      className="group flex items-center gap-3 p-3.5 rounded-2xl border border-black/5 dark:border-white/5 bg-black/5 dark:bg-[#0d0d11]/80 hover:bg-black/10 dark:hover:bg-[#121218] hover:border-black/10 dark:hover:border-white/10 transition-all duration-300 cursor-default"
                    >
                      <div className="p-2 rounded-xl bg-black/5 dark:bg-white/5 text-text-muted group-hover:text-accent-purple group-hover:bg-accent-purple/10 transition-all duration-300">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-medium text-black dark:text-white transition-colors">
                          {skill.name}
                        </span>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-text-muted ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

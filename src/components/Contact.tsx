import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { contactFormSchema } from '../types/portfolio.types';
import type { IContactFormInput } from '../types/portfolio.types';
import { logger } from '../utils/logger';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'IDLE' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IContactFormInput>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: IContactFormInput) => {
    setIsSubmitting(true);
    setSubmitStatus('IDLE');
    setErrorMessage('');

    try {
      const accessKey = import.meta.env.VITE_WEB3FORMS_KEY || import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'YOUR_ACCESS_KEY_HERE';
      
      const payload = {
        access_key: accessKey,
        ...data,
      };

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Web3Forms submit failed with status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        setSubmitStatus('SUCCESS');
        reset();
      } else {
        throw new Error(result.message || 'Unknown Web3Forms submission error.');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Network error occurred.';
      logger.error({ err, message }, 'Contact form submission failed');
      setSubmitStatus('ERROR');
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-4 max-w-5xl mx-auto z-10 relative">
      {/* Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-xs text-accent-purple font-medium mb-4"
        >
          <Mail className="w-3.5 h-3.5" />
          Get In Touch
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-bold text-3xl md:text-4xl tracking-tight text-black dark:text-white mb-4"
        >
          Let's Create Together
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-text-muted max-w-lg mx-auto font-light"
        >
          Have a project in mind or looking to hire? Drop me a message, and let's build something exceptional.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-start">
        {/* Info Column */}
        <div className="md:col-span-2 space-y-8 text-left">
          <div>
            <h3 className="text-xl font-semibold text-black dark:text-white mb-4">Contact Details</h3>
            <p className="text-text-muted text-sm font-light leading-relaxed mb-6">
              Feel free to reach out via email or connect with me on social platforms. I'm always open to discussing new projects and designs.
            </p>
          </div>

          <div className="space-y-4">
            <a 
              href="mailto:hello@devteja.com" 
              className="flex items-center gap-4 p-4 rounded-2xl glass hover:border-black/10 dark:hover:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300"
            >
              <div className="p-3 rounded-xl bg-accent-purple/10 text-accent-purple">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs text-text-muted">Email Me</span>
                <span className="text-sm font-medium text-black dark:text-white">hello@devteja.com</span>
              </div>
            </a>
          </div>
        </div>

        {/* Form Column */}
        <div className="md:col-span-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl p-8 glass shadow-lg"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-left">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-3.5 rounded-xl border border-black/10 dark:border-white/5 bg-black/5 dark:bg-black/45 text-black dark:text-white placeholder-text-muted focus:outline-none focus:border-accent-purple/40 focus:ring-1 focus:ring-accent-purple/40 transition-all text-sm"
                  {...register('name')}
                />
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  className="w-full px-4 py-3.5 rounded-xl border border-black/10 dark:border-white/5 bg-black/5 dark:bg-black/45 text-black dark:text-white placeholder-text-muted focus:outline-none focus:border-accent-purple/40 focus:ring-1 focus:ring-accent-purple/40 transition-all text-sm"
                  {...register('email')}
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3.5 rounded-xl border border-black/10 dark:border-white/5 bg-black/5 dark:bg-black/45 text-black dark:text-white placeholder-text-muted focus:outline-none focus:border-accent-purple/40 focus:ring-1 focus:ring-accent-purple/40 transition-all text-sm resize-none"
                  {...register('message')}
                />
                {errors.message && (
                  <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Status Banner */}
              {submitStatus === 'SUCCESS' && (
                <div className="p-4 rounded-xl border border-emerald-500/10 bg-emerald-500/5 text-emerald-400 text-sm flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span>Your message was sent successfully! I will get back to you soon.</span>
                </div>
              )}

              {submitStatus === 'ERROR' && (
                <div className="p-4 rounded-xl border border-red-500/10 bg-red-500/5 text-red-400 text-sm flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{errorMessage || 'Failed to send message. Please try again.'}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex justify-center items-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-accent-purple to-accent-indigo text-white font-medium hover:opacity-95 shadow-lg shadow-accent-purple/20 transition-all duration-300 disabled:opacity-50 hover-magnetic cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { BookOpen } from 'lucide-react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Awards from './components/Awards';
import Contact from './components/Contact';
import Footer from './components/Footer';

// --- SHARED ANIMATION VARIANTS ---
export const blurReveal: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(12px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export const zoomIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -80 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } }
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 80 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } }
};

export const flipIn: Variants = {
  hidden: { opacity: 0, rotateX: -90, y: 40 },
  visible: { opacity: 1, rotateX: 0, y: 0, transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } }
};

// --- SHARED HELPER COMPONENTS ---
export const SectionHeader: React.FC<{ title: string; subtitle?: string; centered?: boolean }> = ({ title, subtitle, centered = true }) => (
  <motion.div variants={blurReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} style={{ marginBottom: 'clamp(2.5rem, 8vw, 5.5rem)', textAlign: centered ? 'center' : 'left' }}>
    <h2 className="text-headline">{title}</h2>
    {subtitle && <p className="text-subhead" style={{ marginTop: '0.5rem', maxWidth: '600px', margin: centered ? '0.5rem auto 0 auto' : '0.5rem 0 0 0' }}>{subtitle}</p>}
  </motion.div>
);

const App: React.FC = () => {
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Floating object animation variables (scroll-driven)
  const floatingY = useTransform(scrollY, [0, 900], [0, 500]);
  const floatingRotate = useTransform(scrollY, [0, 900], [0, 15]);
  const floatingScale = useTransform(scrollY, [0, 900], [1, 0.8]);
  const floatingOpacity = useTransform(scrollY, [0, 900], [1, 0.2]);

  return (
    <div style={{ position: 'relative', background: 'var(--bg-light)', overflow: 'hidden' }}>
      {/* Progress Bar */}
      <motion.div style={{ scaleX, position: 'fixed', top: 0, left: 0, right: 0, height: '3px', background: 'var(--text-main)', zIndex: 100, transformOrigin: '0%' }} />

      <Navbar />

      <main style={{ position: 'relative' }}>
        {/* --- SCROLLING OBJECT --- */}
        <motion.div
          className="hide-on-mobile"
          style={{
            position: 'absolute',
            top: '25%',
            right: '5%',
            y: floatingY,
            rotate: floatingRotate,
            scale: floatingScale,
            opacity: floatingOpacity,
            zIndex: 5,
            pointerEvents: 'none',
          }}
        >
          <div className="apple-card-elevated" style={{ 
            padding: '1.2rem', 
            background: 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.3))', 
            backdropFilter: 'blur(30px) saturate(150%)', 
            borderRadius: '24px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            boxShadow: '0 30px 60px -12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.5)',
            transformStyle: 'preserve-3d'
          }}>
            <motion.div 
              animate={{ rotateY: 360 }} 
              transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
              style={{ display: 'flex' }}
            >
              <BookOpen size={36} style={{ color: 'var(--primary)', filter: 'drop-shadow(0px 10px 10px rgba(0,102,204,0.4))' }} strokeWidth={2} />
            </motion.div>
          </div>
        </motion.div>

        <Hero />
        <Projects />
        <Skills />
        <Experience />
        <Awards />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default App;

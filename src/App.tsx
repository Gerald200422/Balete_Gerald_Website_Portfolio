import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { motion, useScroll, useSpring, useTransform, AnimatePresence, useAnimationFrame, useMotionValue } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  ArrowRight, Code, Github, Linkedin, Mail, Briefcase, Award, BookOpen,
  CheckCircle, Users, Zap, Clock, Target, Trophy, Star, Video, Settings, Globe,
  ShieldCheck, FileCode, Presentation, X
} from 'lucide-react';
import Navbar from './components/Navbar';

// --- ANIMATION VARIANTS ---
// Collaboration: Gerald & Chalisterrald working on mobile responsiveness

const blurReveal: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(12px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const zoomIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -80 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } }
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 80 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } }
};

const flipIn: Variants = {
  hidden: { opacity: 0, rotateX: -90, y: 40 },
  visible: { opacity: 1, rotateX: 0, y: 0, transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } }
};

// --- HELPER COMPONENTS ---
const SectionHeader: React.FC<{ title: string; subtitle?: string; centered?: boolean }> = ({ title, subtitle, centered = true }) => (
  <motion.div variants={blurReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} style={{ marginBottom: 'clamp(2.5rem, 8vw, 5.5rem)', textAlign: centered ? 'center' : 'left' }}>
    <h2 className="text-headline">{title}</h2>
    {subtitle && <p className="text-subhead" style={{ marginTop: '0.5rem', maxWidth: '600px', margin: centered ? '0.5rem auto 0 auto' : '0.5rem 0 0 0' }}>{subtitle}</p>}
  </motion.div>
);

// --- STATIC DATA ---
const ROLES = [
  "Passionate Software Developer", 
  "Crafting clean, scalable applications", 
  "Turning complex problems into elegant solutions",
  "Continuous learner & tech enthusiast"
];

const PROJECTS = [
  {
    id: 1,
    title: "Inventory & Sales Management",
    subtitle: "Efficient stock & transaction tracking",
    fullDesc: "A high-performance system designed for real-time inventory monitoring and seamless sales processing. Features include automated stock alerts, detailed financial reporting, and multi-user access control for enterprise scalability.",
    image: "/inventory_management_preview_1773189975213.png"
  },
  {
    id: 2,
    title: "Optical Clinic Tracking",
    subtitle: "Patient records & prescription management",
    fullDesc: "A complete digitized solution for optometrists. Manage patient medical histories, track complex eye prescriptions over time, and handle appointment scheduling with an intuitive, medical-grade interface.",
    image: "/optical_clinic_preview_1773190001297.png"
  },
  {
    id: 3,
    title: "Eli IT Solutions",
    subtitle: "Comprehensive management suite",
    fullDesc: "An all-in-one ecosystem for IT service providers. It combines system status monitoring, client support ticketing, and network infrastructure management into a single, unified professional dashboard.",
    image: "/eli_it_solutions_preview_1773190023826.png"
  },
  {
    id: 4,
    title: "Email Sender Automation",
    subtitle: "Streamlined bulk email workflows",
    fullDesc: "Powering business communication through intelligent automation. Build complex email sequences, manage massive subscriber lists, and gain deep insights through real-time conversion and engagement analytics.",
    image: "/email_automation_preview_1773190044706.png"
  },
  {
    id: 5,
    title: "Educational Platform",
    subtitle: "Interactive learning environment",
    fullDesc: "Bridging the gap between educators and students with a collaborative LMS. Supports high-fidelity video content, interactive quizzes, and personalized learning paths to enhance the academic digital journey.",
    image: "/educational_platform_preview_1773190065146.png"
  },
  {
    id: 6,
    title: "Online Loopwork Website",
    subtitle: "Unified Multitasking & Productivity Suite",
    fullDesc: "Architected & Contributed to the Version 2.0 interface for Loopwork, a powerful productivity platform for the company that integrates 16 essential multitasking tools into a single, cohesive experience. Focused on creating a high-performance landing page and intuitive user dashboard that streamlines complex workflows and enhances digital efficiency.",
    image: "/loopwork_website_v2_mockup.png"
  }
];

const App: React.FC = () => {
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Floating object animation variables (scroll-driven)
  const floatingY = useTransform(scrollY, [0, 900], [0, 500]);
  const floatingRotate = useTransform(scrollY, [0, 900], [0, 15]);
  const floatingScale = useTransform(scrollY, [0, 900], [1, 0.8]);
  const floatingOpacity = useTransform(scrollY, [0, 900], [1, 0.2]);

  // Contact Form State
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const formRef = useRef<HTMLFormElement>(null);

  const handleContactSubmit = React.useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setFormStatus('sending');
    
    // NOTE: You must replace these strings with your actual EmailJS credentials!
    emailjs.sendForm(
      'service_i0dyd64', 
      'template_5rclruy', 
      formRef.current,
      'bp1bhN7kxo_nJi-zh'
    )
    .then(() => {
      setFormStatus('sent');
      formRef.current?.reset();
    }, (error) => {
      console.log('FAILED...', error.text);
      setFormStatus('idle');
      alert('Failed to send the message. Please try again.');
    });
  }, []);

  // Projects Data

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const cardWidth = isMobile ? 280 : 350;
  const gap = 30;
  const loopWidth = (cardWidth + gap) * PROJECTS.length;

  const [hoveredCarouselId, setHoveredCarouselId] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const xOffset = useMotionValue(-loopWidth); // Start offset by 1 full set to allow instantaneous looping
  const hoverTimeout = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnterCard = React.useCallback((id: string) => {
    // If a modal is already open, or currently transitioning (closing), ignore hover
    if (isTransitioning || hoveredCarouselId !== null) return;

    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => {
      setHoveredCarouselId(id);
    }, 200); // 200ms intentional delay avoids accidental swipe-opens
  }, [isTransitioning, hoveredCarouselId]);

  const handleMouseLeaveCard = React.useCallback(() => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
  }, []);

  const handleCloseModal = React.useCallback(() => {
    if (hoveredCarouselId === null) return;
    setIsTransitioning(true);
    setHoveredCarouselId(null);
    // Lock hover interactions briefly
    setTimeout(() => {
      setIsTransitioning(false);
    }, 50); 
  }, [hoveredCarouselId]);

  useAnimationFrame((_time, delta) => {
    if (hoveredCarouselId === null) {
      let current = xOffset.get();
      // Move continuously from left to right (+x direction)
      current += delta * 0.04; // Smooth, slow speed
      // When we have shifted exactly 1 full track array, snap back instantly
      if (current >= 0) {
        current -= loopWidth;
      }
      xOffset.set(current);
    }
  });

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const currentRole = ROLES[roleIndex];

    if (isDeleting) {
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(currentRole.substring(0, displayedText.length - 1));
        }, 50); // fast backspacing
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      }
    } else {
      if (displayedText.length < currentRole.length) {
        timer = setTimeout(() => {
          setDisplayedText(currentRole.substring(0, displayedText.length + 1));
        }, 100); // normal typing speed
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2000); // pause comfortably before deleting
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex]);

  // Dismiss modal if user scrolls
  useEffect(() => {
    if (hoveredCarouselId === null) return;

    window.addEventListener('scroll', handleCloseModal, { passive: true });
    return () => window.removeEventListener('scroll', handleCloseModal);
  }, [hoveredCarouselId, handleCloseModal]);

  // Generate 4 copies (20 items total) to fill the width of modern screens 
  // and completely cover the snapping boundaries invisibly.
  const carouselProjects = React.useMemo(() => {
    return Array.from({ length: 4 }).flatMap((_, setIndex) => 
      PROJECTS.map(p => ({ ...p, carouselId: `${setIndex}-${p.id}` }))
    );
  }, []);

  return (
    <div style={{ position: 'relative', background: 'var(--bg-light)', overflow: 'hidden' }}>
      {/* Progress Bar */}
      <motion.div style={{ scaleX, position: 'fixed', top: 0, left: 0, right: 0, height: '3px', background: 'var(--text-main)', zIndex: 100, transformOrigin: '0%' }} />

      <Navbar />

      <main style={{ position: 'relative' }}>
        {/* --- SCROLLING OBJECT (Floats down to the second section) --- */}
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

        {/* --- HERO SECTION --- (Full Screen Video Background) */}
        <section id="hero" style={{ height: '100vh', width: '100%', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover', 
              zIndex: 0 
            }}
          >
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
          </video>
          
          {/* Dark & Blurred Overlay */}
          <div 
            style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%', 
              background: 'rgba(0, 0, 0, 0.6)', // darkens the video
              backdropFilter: 'blur(8px)',     // blurs the video softly
              zIndex: 1 
            }} 
          />

          {/* Centered Content */}
          <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 2, width: '100%', padding: '0 2rem' }}>
            <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
              
              <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '140px' }}>
                <h1
                  className="text-hero"
                  style={{ 
                    fontWeight: 900, 
                    color: 'white', // Switched to white for dark video background
                    letterSpacing: '-0.02em',
                    textShadow: '0 4px 20px rgba(0,0,0,0.5)',
                    margin: 0,
                    lineHeight: 1.2
                  }}
                >
                  {displayedText}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                    style={{ 
                      display: 'inline-block',
                      width: '0.12em',
                      height: '0.9em',
                      background: 'var(--primary)',
                      marginLeft: '0.1em',
                      verticalAlign: 'middle',
                      borderRadius: '4px',
                      boxShadow: '0 0 10px var(--primary)'
                    }}
                  />
                </h1>
              </div>

            </motion.div>
          </div>
        </section>

        {/* --- DYNAMIC PROJECTS CAROUSEL --- (Light Gray) */}
        <section id="projects" style={{ background: 'var(--bg-card)', padding: '8rem 0', position: 'relative', zIndex: hoveredCarouselId ? 40 : 10, overflow: hoveredCarouselId ? 'visible' : 'hidden' }}>
          
          {/* Modal Blur Backdrop (Confined to Section Stacking Context to sit behind track) */}
          <AnimatePresence>
            {hoveredCarouselId && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                style={{ 
                  position: 'fixed', 
                  top: 0, 
                  left: 0, 
                  right: 0, 
                  bottom: 0, 
                  background: 'rgba(0,0,0,0.5)', 
                  backdropFilter: 'blur(10px)', 
                  zIndex: 0, // Behind the container and track, but covers screen visually
                  pointerEvents: 'none' 
                }}
              />
            )}
          </AnimatePresence>

          <div className="container" style={{ position: 'relative', zIndex: 5 }}>
            <SectionHeader title="Featured Projects" subtitle="A showcase of enterprise-grade solutions and academic innovation." />
          </div>

          <div style={{ position: 'relative', height: '650px', display: 'flex', alignItems: 'center', width: '100%', zIndex: 10, overflow: hoveredCarouselId ? 'visible' : 'hidden', perspective: '1000px' }}>
            
            <motion.div
              style={{ 
                x: xOffset,
                display: 'flex', 
                gap: '30px', 
                width: 'max-content',
                willChange: 'transform' // Hardware acceleration
              }}
            >
              {carouselProjects.map((project) => {
                const isHovered = hoveredCarouselId === project.carouselId;
                const isOtherHovered = hoveredCarouselId !== null && !isHovered;
                
                return (
                  <motion.div
                    key={project.carouselId}
                    initial={false}
                    animate={{ 
                      scale: isOtherHovered ? 0.95 : 1, 
                      opacity: isHovered ? 0 : (isOtherHovered ? 0.3 : 1), // Hide original slot exactly when animating to center
                      filter: isOtherHovered ? 'blur(6px)' : 'blur(0px)'
                    }}
                    transition={{ duration: 1.0, ease: [0.25, 1, 0.3, 1] }} 
                    onMouseEnter={() => handleMouseEnterCard(project.carouselId)}
                    onMouseLeave={handleMouseLeaveCard}
                    className="apple-card-elevated project-card"
                    style={{ 
                      display: 'flex', 
                      flexDirection: 'column',
                      background: 'var(--bg-light)', 
                      overflow: 'hidden',
                      border: '1px solid var(--border-soft)',
                      borderRadius: '28px',
                      boxShadow: 'var(--shadow-soft)',
                      cursor: 'pointer',
                      pointerEvents: isOtherHovered ? 'none' : 'auto',
                      flexShrink: 0
                    }}
                  >
                    {/* Image Region */}
                    <motion.div 
                      style={{ 
                        width: '100%',
                        height: '240px',
                        position: 'relative', 
                        background: '#000',
                        overflow: 'hidden'
                      }}
                    >
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.1)' }} />
                    </motion.div>

                    {/* Content Region */}
                    <motion.div 
                      style={{ 
                        width: '100%',
                        padding: '2rem',
                        display: 'flex', 
                        flexDirection: 'column', 
                        background: 'var(--bg-light)',
                        justifyContent: 'flex-start'
                      }}
                    >
                      <motion.h3 
                        style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.4rem', color: 'var(--text-main)', letterSpacing: '-0.02em' }}
                      >
                        {project.title}
                      </motion.h3>
                      <motion.p style={{ fontSize: '0.95rem', color: 'var(--primary)', fontWeight: 700, marginBottom: '1rem' }}>
                        {project.subtitle}
                      </motion.p>
                      
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 'auto', fontWeight: 500 }}>Pointer to expand view ↑</p>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* ACTIVE PORTAL MODAL */}
          <AnimatePresence>
            {hoveredCarouselId && (() => {
              const activeProject = carouselProjects.find(p => p.carouselId === hoveredCarouselId);
              if (!activeProject) return null;

              return (
                <div 
                  style={{ 
                    position: 'fixed', 
                    top: 0, left: 0, right: 0, bottom: 0, 
                    zIndex: 2000, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    pointerEvents: 'none' 
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
                    transition={{ duration: 0.4, ease: [0.25, 1, 0.3, 1] }} 
                    onMouseLeave={handleCloseModal}
                    className="apple-card-elevated project-modal"
                    style={{ 
                      background: 'white', 
                      overflow: 'hidden',
                      border: '1px solid var(--border-soft)',
                      borderRadius: '28px',
                      boxShadow: '0 50px 100px rgba(0,0,0,0.5)',
                      pointerEvents: 'auto',
                      position: 'relative',
                      maxHeight: 'min(90vh, 800px)',
                      display: 'flex',
                      flexDirection: isMobile ? 'column' : 'row'
                    }}
                  >
                    {/* Close Button */}
                    <button 
                      onClick={handleCloseModal}
                      style={{ 
                        position: 'absolute',
                        top: '1.2rem',
                        right: '1.2rem',
                        zIndex: 2010,
                        background: 'rgba(255,255,255,0.9)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(0,0,0,0.1)',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        color: 'var(--text-main)',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1)';
                        e.currentTarget.style.background = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.9)';
                      }}
                    >
                      <X size={20} />
                    </button>
                    {/* Image Region Expanded */}
                    <motion.div 
                      className="project-modal-child"
                      style={{ 
                        position: 'relative', 
                        background: '#000',
                        overflow: 'hidden',
                        flex: isMobile ? '0 0 250px' : '1'
                      }}
                    >
                      <img 
                        src={activeProject.image} 
                        alt={activeProject.title} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, transparent 20%, rgba(0,0,0,0.4))' }} />
                    </motion.div>

                    {/* Content Region Expanded */}
                    <motion.div 
                      className="project-modal-child"
                      style={{ 
                        padding: isMobile ? '2rem' : '3rem',
                        display: 'flex', 
                        flexDirection: 'column', 
                        background: 'white',
                        justifyContent: 'center',
                        overflowY: 'auto',
                        flex: '1'
                      }}
                    >
                      <motion.h3 
                        style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.4rem', color: 'var(--text-main)', letterSpacing: '-0.02em' }}
                      >
                        {activeProject.title}
                      </motion.h3>
                      <motion.p style={{ fontSize: '1.1rem', color: 'var(--primary)', fontWeight: 700, marginBottom: '1rem' }}>
                        {activeProject.subtitle}
                      </motion.p>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ delay: 0.15 }}
                      >
                        <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.6, fontWeight: 500 }}>{activeProject.fullDesc}</p>
                        
                        <div style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--primary)', fontWeight: 700, fontSize: '1rem' }}>
                          EXPLORE CASE STUDY <ArrowRight size={20} />
                        </div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </div>
              );
            })()}
          </AnimatePresence>
        </section>



        {/* --- TECHNICAL SKILLS --- (White) */}
        <section id="skills" style={{ background: 'var(--bg-light)', padding: '8rem 0' }}>
          <div className="container">
            <SectionHeader title="Technical Arsenal." subtitle="A diverse toolkit for the modern digital landscape." centered={false} />
            <div className="bento-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>

              {[
                { 
                  title: "Web Development", 
                  icon: <FileCode size={32} />, 
                  skills: ["HTML5 / CSS3 / JavaScript", "React Frontend", "PHP Backend", "Responsive Design"] 
                },
                { 
                  title: "Design & Prototyping", 
                  icon: <Presentation size={32} />, 
                  skills: ["Figma & Canva", "UI/UX Principles", "Graphic Design", "Video Editing"] 
                },
                { 
                  title: "Mobile & Systems", 
                  icon: <Settings size={32} />, 
                  skills: ["Flutter Prototyping", "SQL Databases", "Networking", "Computer Troubleshooting"] 
                },
                { 
                  title: "Professional Tools", 
                  icon: <ShieldCheck size={32} />, 
                  skills: ["Git & GitHub", "Visual Studio Code", "Microsoft Office Suite", "Data Entry"] 
                }
              ].map((domain) => (
                <motion.div
                  key={domain.title}
                  variants={zoomIn}
                  initial="hidden"
                  whileInView="visible"
                  whileHover={{ 
                    y: -10, 
                    scale: 1.02, 
                    boxShadow: '0 35px 60px -15px rgba(0,0,150,0.05), inset 0 1px 0 rgba(255,255,255,0.8)' 
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="apple-card"
                  style={{ padding: '2.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-soft)' }}
                >
                  <motion.div 
                    whileHover={{ rotateY: 180, scale: 1.2 }}
                    transition={{ duration: 0.6, type: "spring" }}
                    style={{ color: 'var(--primary)', marginBottom: '1.5rem', display: 'inline-block' }}
                  >
                    {domain.icon}
                  </motion.div>
                  <h4 style={{ fontSize: '1.4rem', fontWeight: 600, letterSpacing: '-0.01em', marginBottom: '1.2rem' }}>{domain.title}</h4>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {domain.skills.map(s => (
                      <li key={s} style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '0.6rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <CheckCircle size={14} style={{ color: 'var(--primary)' }} /> {s}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- SOFT SKILLS & PHILOSOPHY --- (Light Gray) */}
        <section id="soft-skills" style={{ background: 'var(--bg-card)', padding: '8rem 0' }}>
          <div className="container">
            <SectionHeader title="Soft Skills." subtitle="The human side of engineering." />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
              {[
                { title: "Adaptability", icon: <Zap size={24} />, desc: "Willingness to learn new tech" },
                { title: "Precision", icon: <Target size={24} />, desc: "Strong attention to detail" },
                { title: "Synergy", icon: <Users size={24} />, desc: "Communication & teamwork" },
                { title: "Reliability", icon: <Clock size={24} />, desc: "Management & prioritization" },
                { title: "Dedication", icon: <Target size={24} />, desc: "Responsible & goal-oriented" }
              ].map((skill, i) => (
                <motion.div
                  key={i}
                  variants={slideInLeft}
                  initial="hidden"
                  whileInView="visible"
                  whileHover={{ 
                    y: -10, 
                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,1)' 
                  }}
                  transition={{ duration: 0.3 }}
                  viewport={{ once: true }}
                  className="apple-card-elevated"
                  style={{ padding: '2rem', textAlign: 'center', background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(20px)' }}
                >
                  <motion.div 
                    whileHover={{ scale: 1.2, rotate: 10 }} 
                    transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                    style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}
                  >
                    {skill.icon}
                  </motion.div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.3rem' }}>{skill.title}</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{skill.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- EXPERIENCE & CERTIFICATIONS --- (White) */}
        <section id="experience" style={{ background: 'var(--bg-light)', padding: '8rem 0' }}>
          <div className="container">
            <div className="two-col-grid">

              {/* Experience List */}
              <div>
                <SectionHeader title="Experience" centered={false} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                  <motion.div 
                    variants={slideInLeft} 
                    initial="hidden" 
                    whileInView="visible" 
                    viewport={{ once: true }} 
                    whileHover={{ x: 10, scale: 1.01 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    style={{ 
                      display: 'flex', 
                      gap: '1.5rem', 
                      background: 'white', 
                      padding: '2rem', 
                      borderRadius: '24px', 
                      boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                      border: '1px solid var(--border-soft)'
                    }}
                  >
                    <motion.div whileHover={{ rotate: 15 }} style={{ color: 'var(--primary)', display: 'flex', alignItems: 'flex-start' }}>
                      <Briefcase size={32} />
                    </motion.div>
                    <div>
                      <h4 style={{ fontSize: '1.4rem', fontWeight: 600 }}>Software Developer (Intern)</h4>
                      <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', margin: '0.2rem 0 1rem 0' }}>Inspire Next Global Inc. Jan 26 to Present</p>
                      <p style={{ color: 'var(--text-main)', fontSize: '1.05rem', lineHeight: 1.5 }}>
                        Contributed to the UI/UX enhancement of the Loopwork platform, specifically architecting the transition to Version 2.0. Focused on refining the landing page and core dashboard to deliver a more engaging, intuitive, and visually polished experience for users leveraging its 16 integrated multitasking tools.
                      </p>
                    </div>
                  </motion.div>
                  <motion.div 
                    variants={slideInRight} 
                    initial="hidden" 
                    whileInView="visible" 
                    viewport={{ once: true }} 
                    whileHover={{ x: 10, scale: 1.01 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    style={{ 
                      display: 'flex', 
                      gap: '1.5rem', 
                      background: 'white', 
                      padding: '2rem', 
                      borderRadius: '24px', 
                      boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                      border: '1px solid var(--border-soft)'
                    }}
                  >
                    <motion.div whileHover={{ rotate: 15 }} style={{ color: 'var(--primary)', display: 'flex', alignItems: 'flex-start' }}>
                      <Briefcase size={32} />
                    </motion.div>
                    <div>
                      <h4 style={{ fontSize: '1.4rem', fontWeight: 600 }}>Junior Sales Associate (Part-time)</h4>
                      <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', margin: '0.2rem 0 1rem 0' }}>Inspire Next Global Inc.</p>
                      <p style={{ color: 'var(--text-main)', fontSize: '1.05rem', lineHeight: 1.5 }}>
                        [Pending Input...] and generated sales leads by sending targeted email campaigns. Effectively communicated product value to encourage adoption and support overall sales growth.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Certifications List */}
              <div>
                <SectionHeader title="Certifications" centered={false} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  {[
                    { title: "Python Essential 1 & 2", issuer: "Cisco Networking Academy", icon: <Globe size={24} /> },
                    { title: "Excel Pro Certification", issuer: "Microsoft", icon: <Award size={24} /> },
                    { title: "C# (Intro to Intermediate)", issuer: "Sololearn", icon: <Code size={24} /> },
                    { title: "Understanding WEB 3.0", issuer: "DICT Caraga", icon: <ShieldCheck size={24} /> }
                  ].map((cert, i) => (
                    <motion.div 
                      key={i} 
                      variants={slideInRight} 
                      initial="hidden" 
                      whileInView="visible" 
                      viewport={{ once: true }} 
                      whileHover={{ 
                        x: 15, 
                        background: 'rgba(255,255,255,0.8)', 
                        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                        borderColor: 'transparent'
                      }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      style={{ 
                        display: 'flex', 
                        gap: '1.5rem', 
                        alignItems: 'center', 
                        padding: '1.2rem', 
                        borderRadius: '20px', 
                        border: '1px solid transparent',
                        transition: 'border-color 0.3s',
                        cursor: 'pointer'
                      }}
                    >
                      <motion.div 
                        whileHover={{ rotateY: 180 }}
                        transition={{ duration: 0.5 }}
                        style={{ color: 'var(--primary)', background: 'var(--bg-card)', padding: '1rem', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        {cert.icon}
                      </motion.div>
                      <div>
                        <h4 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-main)' }}>{cert.title}</h4>
                        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginTop: '0.2rem', fontWeight: 500 }}>{cert.issuer}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* --- AWARDS & RECOGNITION --- (Light Gray) */}
        <section id="awards" style={{ background: 'var(--bg-card)', padding: '8rem 0' }}>
          <div className="container">
            <SectionHeader title="Accolades." subtitle="Milestones of excellence." />
            <div className="bento-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
              {[
                { title: "Dean’s List Awardee", category: "Academic Excellence", icon: <Star size={32} /> },
                { title: "1st Place – Best Video Résumé", category: "Creative Media", icon: <Video size={32} /> },
                { title: "Top Performer – Business Analytics", category: "Data Science", icon: <Trophy size={32} /> },
                { title: "Champion – Promotional Video", category: "Group Award", icon: <Users size={32} /> }
              ].map((award, i) => (
                <motion.div
                  key={i}
                  variants={flipIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ 
                    y: -15, 
                    scale: 1.03,
                    boxShadow: '0 40px 80px -20px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,1)' 
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="apple-card-elevated"
                  style={{ 
                    padding: '2.5rem', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '1rem', 
                    alignItems: 'center', 
                    textAlign: 'center',
                    background: 'var(--bg-light)',
                    border: '1px solid var(--border-soft)'
                  }}
                >
                  <motion.div 
                    whileHover={{ scale: 1.3, rotateZ: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                    style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}
                  >
                    {award.icon}
                  </motion.div>
                  <div>
                    <h4 style={{ fontSize: '1.3rem', fontWeight: 700, letterSpacing: '-0.02em' }}>{award.title}</h4>
                    <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>{award.category}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- CONTACT HERO --- (White) */}
        <section id="contact" style={{ background: 'var(--bg-light)', padding: '4rem 0 12rem 0' }}>
          <div className="container">
            <motion.div
              variants={zoomIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{
                maxWidth: '1000px',
                margin: '0 auto',
                position: 'relative',
                borderRadius: '34px',
                padding: '3px', // Width of the rotating stroke
                overflow: 'hidden',
                transform: 'perspective(1000px) rotateX(2deg)',
                transformStyle: 'preserve-3d',
                boxShadow: '0 40px 80px -20px rgba(0,0,0,0.15)',
              }}
            >
              {/* Spinning Black Light / Stroke Animation */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                style={{
                  position: 'absolute',
                  top: '-50%',
                  left: '-50%',
                  width: '200%',
                  height: '200%',
                  background: 'conic-gradient(from 0deg, transparent 0%, transparent 70%, rgba(0,0,0, 0.2) 80%, rgba(0,0,0, 1) 100%)',
                  zIndex: 0,
                }}
              />

              {/* Inner Card Card Content */}
              <div
                className="apple-card-elevated contact-layout"
                style={{ 
                  position: 'relative',
                  zIndex: 1,
                  textAlign: 'left', 
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.8))', 
                  borderRadius: '32px',
                  backdropFilter: 'blur(30px) saturate(150%)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9)',
                }}
              >
                {/* Left Side: Copy & Socials */}
                <div>
                  <h2 className="text-headline" style={{ letterSpacing: '-0.03em', lineHeight: 1.1 }}>Start a dialogue.</h2>
                  <p className="text-subhead" style={{ marginTop: '1.5rem', marginBottom: '3rem', maxWidth: '400px', fontSize: '1.1rem' }}>
                    Have a project in mind, or an opportunity to explore? I'm ready to ship big ideas and build something extraordinary.
                  </p>
                  
                  <div style={{ display: 'flex', gap: '1.5rem', marginTop: '3rem' }}>
                    <motion.a 
                      href="mailto:geraldbalete123@gmail.com" 
                      whileHover={{ y: -8, scale: 1.2, color: 'var(--primary)', filter: 'drop-shadow(0px 10px 10px rgba(0, 102, 204, 0.4))' }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      style={{ color: 'var(--text-main)', display: 'inline-block' }}
                    >
                      <Mail size={32} />
                    </motion.a>
                    <motion.a 
                      href="https://github.com/Gerald200422" 
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -8, scale: 1.2, color: 'var(--primary)', filter: 'drop-shadow(0px 10px 10px rgba(0, 102, 204, 0.4))' }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      style={{ color: 'var(--text-main)', display: 'inline-block' }}
                    >
                      <Github size={32} />
                    </motion.a>
                    <motion.a 
                      href="#" 
                      whileHover={{ y: -8, scale: 1.2, color: 'var(--primary)', filter: 'drop-shadow(0px 10px 10px rgba(0, 102, 204, 0.4))' }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      style={{ color: 'var(--text-main)', display: 'inline-block' }}
                    >
                      <Linkedin size={32} />
                    </motion.a>
                  </div>
                </div>

                {/* Right Side: Form */}
                <div style={{ width: '100%' }}>
                  {formStatus === 'sent' ? (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ padding: '3rem 0', color: 'var(--text-main)', textAlign: 'center' }}>
                      <div style={{ width: '64px', height: '64px', background: 'var(--primary)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ width: '32px', height: '32px' }}><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                      <h3 style={{ fontSize: '1.8rem', fontWeight: 600 }}>Message Sent</h3>
                      <p style={{ marginTop: '0.5rem', color: 'var(--text-muted)' }}>Thanks for reaching out. I'll get back to you shortly.</p>
                    </motion.div>
                  ) : (
                    <form ref={formRef} onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div className="contact-form-grid">
                        <input type="text" name="user_name" placeholder="Name" required className="apple-input" />
                        <input type="email" name="user_email" placeholder="Email" required className="apple-input" />
                      </div>
                      <textarea placeholder="Message" name="message" required rows={5} className="apple-input" style={{ resize: 'none' }}></textarea>
                      <button
                        type="submit"
                        className="btn-primary"
                        disabled={formStatus === 'sending'}
                        style={{
                          marginTop: '1rem',
                          width: '100%',
                          opacity: formStatus === 'sending' ? 0.7 : 1,
                          cursor: formStatus === 'sending' ? 'not-allowed' : 'pointer',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}
                      >
                        {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
                        {formStatus !== 'sending' && <ArrowRight size={18} />}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

        {/* --- FOOTER --- (Black with Animated Wave) */}
        <footer style={{ position: 'relative', background: '#0a0a0a', borderTop: 'none', color: 'rgba(255, 255, 255, 0.6)' }}>
          {/* Animated Wave Divider */}
          <div style={{ position: 'absolute', top: '-100px', left: 0, width: '100%', overflow: 'hidden', lineHeight: 0, zIndex: 10 }}>
            <motion.svg
              animate={{ x: ['0%', '-50%'] }}
              transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
              viewBox="0 0 2000 100"
              preserveAspectRatio="none"
              style={{ display: 'block', width: '200%', height: '101px' }}
            >
              <path d="M 0 50 Q 250 0, 500 50 T 1000 50 T 1500 50 T 2000 50 L 2000 100 L 0 100 Z" fill="#0a0a0a" />
              <path d="M 0 50 Q 250 100, 500 50 T 1000 50 T 1500 50 T 2000 50 L 2000 100 L 0 100 Z" fill="#0a0a0a" opacity="0.4" />
            </motion.svg>
          </div>
          
          <div className="container" style={{ position: 'relative', zIndex: 2, padding: '4rem 0', textAlign: 'center' }}>
            <p style={{ fontWeight: 500, color: 'rgba(255, 255, 255, 0.8)' }}>Copyright &copy; {new Date().getFullYear()} Gerald Balete. All rights reserved.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1.5rem' }}>
              <a href="#" style={{ color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'}>Privacy Policy</a>
              <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>|</span>
              <a href="#" style={{ color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'}>Terms of Use</a>
            </div>
          </div>
        </footer>
    </div>
  );
};

export default App;

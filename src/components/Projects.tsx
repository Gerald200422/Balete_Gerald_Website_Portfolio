import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useAnimationFrame } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { SectionHeader } from '../App';

export const PROJECTS = [
  {
    id: 2,
    title: "Optical Clinic Online System",
    subtitle: "Complete Multi-Branch Clinic Management",
    fullDesc: "A comprehensive multi-branch management system for North Vision Optical Clinic (Manila, Cebu, Davao). Streamlining operations beyond manual inputs with a dynamic dashboard, branch-specific tracking, sales and inventory management, customer records, role-based access, audit trails, and repair tracking.",
    image: "/project_nvoc_system.png"
  },
  {
    id: 4,
    title: "Email Sender Automation System",
    subtitle: "High-Volume Outreach & Analytics",
    fullDesc: "A custom-built automated email system designed to eliminate time-consuming manual outreach for sales teams. This solution enables faster, more precise communication with company customers through intelligent automation workflows and real-time engagement analytics.",
    image: "/project_email_sender_autonomation.png"
  },
  {
    id: 5,
    title: "EduQualitech System",
    subtitle: "Collaborative Academic Ecosystem",
    fullDesc: "A Hackathon-winning comprehensive learning platform designed to bridge educational gaps. Features include book donation modules, direct professor outreach, and event coordination for free tutoring, specifically aimed at supporting children with limited access to formal schooling.",
    image: "/project_eduqualitech_system.png"
  },
  {
    id: 6,
    title: "Online Loopwork Website",
    subtitle: "Unified Multitasking & Productivity Suite",
    fullDesc: "Architected & Contributed to the Version 2.0 interface for Loopwork, a powerful productivity platform for the company that integrates 16 essential multitasking tools into a single, cohesive experience. Focused on creating a high-performance landing page and intuitive user dashboard that streamlines complex workflows and enhances digital efficiency.",
    image: "/project_loopwork_v2.png",
    projectLink: "https://www.inspire-loopwork.com/landingpage"
  }
];

const Projects: React.FC = () => {
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
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const xOffset = useMotionValue(-loopWidth); 
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnterCard = useCallback((id: string) => {
    if (isTransitioning || hoveredCarouselId !== null) return;
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => {
      setHoveredCarouselId(id);
    }, 200); 
  }, [isTransitioning, hoveredCarouselId]);

  const handleMouseLeaveCard = useCallback(() => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    if (hoveredCarouselId === null) return;
    setIsTransitioning(true);
    setHoveredCarouselId(null);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 50); 
  }, [hoveredCarouselId]);

  useAnimationFrame((_time, delta) => {
    if (hoveredCarouselId === null && !isUserInteracting) {
      let current = xOffset.get();
      current += delta * 0.04; 
      if (current >= 0) {
        current -= loopWidth;
      }
      xOffset.set(current);
    }
  });

  useEffect(() => {
    if (hoveredCarouselId === null) return;
    window.addEventListener('scroll', handleCloseModal, { passive: true });
    return () => window.removeEventListener('scroll', handleCloseModal);
  }, [hoveredCarouselId, handleCloseModal]);

  const carouselProjects = useMemo(() => {
    return Array.from({ length: 4 }).flatMap((_, setIndex) => 
      PROJECTS.map(p => ({ ...p, carouselId: `${setIndex}-${p.id}` }))
    );
  }, []);

  return (
    <section id="projects" style={{ padding: '8rem 0', position: 'relative', zIndex: hoveredCarouselId ? 40 : 10, overflow: hoveredCarouselId ? 'visible' : 'hidden' }}>
      
      <AnimatePresence>
        {hoveredCarouselId && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleCloseModal} 
            onMouseEnter={handleCloseModal}
            style={{ 
              position: 'fixed', 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0, 
              background: 'rgba(0,0,0,0.4)', 
              backdropFilter: 'blur(8px)', 
              zIndex: -1, 
              pointerEvents: 'auto',
              cursor: 'default'
            }}
          />
        )}
      </AnimatePresence>

      <div className="container" style={{ position: 'relative', zIndex: 5 }}>
        <SectionHeader title="Featured Projects" subtitle="A showcase of enterprise-grade solutions and academic innovation." />
      </div>

      <div className="project-carousel-container" style={{ overflow: hoveredCarouselId ? 'visible' : 'hidden' }}>
        
        <motion.div
          drag="x"
          dragConstraints={{ left: -loopWidth * 3, right: 0 }}
          onDragStart={() => setIsUserInteracting(true)}
          onDragEnd={() => {
            setIsUserInteracting(false);
            let current = xOffset.get();
            while (current > 0) current -= loopWidth;
            while (current < -loopWidth) current += loopWidth;
            xOffset.set(current);
          }}
          style={{ 
            x: xOffset,
            display: 'flex', 
            gap: '30px', 
            width: 'max-content',
            willChange: 'transform',
            cursor: isUserInteracting ? 'grabbing' : 'grab'
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
                  opacity: isHovered ? 0 : (isOtherHovered ? 0.4 : 1), 
                  filter: isOtherHovered ? 'blur(5px)' : 'blur(0px)'
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} 
                onClick={() => !isTransitioning && setHoveredCarouselId(project.carouselId)}
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

      <AnimatePresence>
        {hoveredCarouselId ? (
          <div 
            key="modal-portal"
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
            {(() => {
              const activeProject = carouselProjects.find(p => p.carouselId === hoveredCarouselId);
              if (!activeProject) return null;
              return (
                <motion.div
                  key={activeProject.carouselId}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} 
                  onMouseLeave={handleCloseModal}
                  className="project-modal"
                >
                  <button 
                    onClick={handleCloseModal}
                    aria-label="Close Project Modal"
                    style={{ 
                      position: 'absolute',
                      top: '1.2rem',
                      right: '1.2rem',
                      zIndex: 2010,
                      background: 'rgba(255,255,255,0.85)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(0,0,0,0.05)',
                      borderRadius: '50%',
                      width: '44px',
                      height: '44px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      color: 'var(--text-main)',
                      transition: 'var(--transition-smooth)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <X size={24} />
                  </button>
                  <div className="project-modal-image-container">
                    <img 
                      src={activeProject.image} 
                      alt={activeProject.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, transparent 20%, rgba(0,0,0,0.45))' }} />
                  </div>

                  <div className="project-modal-content-container">
                    <motion.h3 
                      style={{ fontSize: 'clamp(1.5rem, 5vw, 2.2rem)', fontWeight: 800, marginBottom: '0.4rem', color: 'var(--text-main)', letterSpacing: '-0.02em', lineHeight: 1.15 }}
                    >
                      {activeProject.title}
                    </motion.h3>
                    <motion.p style={{ fontSize: '1.1rem', color: 'var(--primary)', fontWeight: 700, marginBottom: '1.5rem' }}>
                      {activeProject.subtitle}
                    </motion.p>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ delay: 0.1, duration: 0.5 }}
                    >
                      <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.7, fontWeight: 500 }}>{activeProject.fullDesc}</p>
                      
                      <div 
                        onClick={() => activeProject.projectLink && window.open(activeProject.projectLink, '_blank')}
                        style={{ 
                          marginTop: '2.5rem', 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '0.75rem', 
                          color: 'var(--primary)', 
                          fontWeight: 700, 
                          fontSize: '1rem', 
                          cursor: activeProject.projectLink ? 'pointer' : 'default' 
                        }}
                      >
                        {activeProject.projectLink ? 'VISIT WEBSITE' : 'EXPLORE CASE STUDY'} <ArrowRight size={20} />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })()}
          </div>
        ) : null}
      </AnimatePresence>
    </section>
  );
};

export default Projects;

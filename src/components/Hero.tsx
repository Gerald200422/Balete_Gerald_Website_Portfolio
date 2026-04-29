import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer } from '../App';

const ROLES = [
  "Passionate Software Developer", 
  "Crafting clean, scalable applications", 
  "Turning complex problems into elegant solutions",
  "Continuous learner & tech enthusiast"
];

const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

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

  return (
    <section 
      id="hero" 
      style={{ 
        height: '100vh', 
        width: '100%', 
        position: 'relative', 
        overflow: 'hidden', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}
    >
      {/* Background Image */}
      <motion.img
        src="/1000020201.jpg"
        alt="Hero Background"
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover', 
          zIndex: 0 
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20, // Slow, smooth zoom
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Dark & Blurred Overlay */}
      <div 
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          background: 'rgba(0, 0, 0, 0.6)', // darkens the image
          backdropFilter: 'blur(2px)',       // blurs the image softly
          zIndex: 1 
        }} 
      />

      {/* Centered Content */}
      <div 
        className="container" 
        style={{ 
          textAlign: 'center', 
          position: 'relative', 
          zIndex: 2, 
          width: '100%', 
          padding: '0 2rem' 
        }}
      >
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '120px' }}>
            <h1
              className="text-hero"
              style={{ 
                fontWeight: 900, 
                color: 'white', 
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

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            style={{ marginTop: '2.5rem' }}
          >
            <a 
              href="/Balete_Resumé.pdf" 
              download
              className="btn-primary"
              style={{ 
                background: 'var(--primary)', 
                color: 'white', 
                border: 'none',
                boxShadow: '0 10px 30px rgba(0, 102, 204, 0.3)'
              }}
            >
              Download Resume
            </a>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

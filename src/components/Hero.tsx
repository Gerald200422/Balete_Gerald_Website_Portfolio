import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer } from '../App';

const ROLES = [
  "Full Stack Software Developer | Building scalable solutions",
  "UI/UX Designer | Crafting intuitive user experiences",
  "QA Tester | Ensuring quality and reliability",
  "Outbound Sales Support | Driving customer success"
];

const BG_IMAGES = [
  { src: "/1000020201.jpg", type: "zoom" },
  { src: "/bg1.jpg", type: "pan-up" },
  { src: "/bg2.jpg", type: "pan-up" },
  { src: "/bg3.jpg", type: "zoom" },
  { src: "/bg4.jpg", type: "pan-up" },
  { src: "/bg5.jpg", type: "pan-up" },
  { src: "/bg6.jpg", type: "pan-up" }
];

const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < window.innerHeight);
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getTransitionType = (bg: { src: string, type: string }) => {
    if (isMobile) {
      return (bg.src === "/1000020201.jpg" || bg.src === "/bg3.jpg") ? "pan-right" : "zoom";
    }
    return bg.type;
  };

  // Text typing effect
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

  // Background image transition
  useEffect(() => {
    const bgTimer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % BG_IMAGES.length);
    }, 5000); // Change image every 7 seconds

    return () => clearInterval(bgTimer);
  }, []);

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
      {/* Background Image Slider */}
      <AnimatePresence>
        <motion.img
          key={bgIndex}
          src={BG_IMAGES[bgIndex].src}
          alt={`Hero Background ${bgIndex + 1}`}
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', 
            zIndex: 0 
          }}
          initial={
            getTransitionType(BG_IMAGES[bgIndex]) === "pan-up" 
              ? { opacity: 0, objectPosition: '50% 100%', scale: 1.05, zIndex: 1 }
              : getTransitionType(BG_IMAGES[bgIndex]) === "pan-right"
              ? { opacity: 0, objectPosition: '0% 50%', scale: 1, zIndex: 1 }
              : { opacity: 0, scale: 1, zIndex: 1 }
          }
          animate={
            getTransitionType(BG_IMAGES[bgIndex]) === "pan-up" 
              ? { opacity: 1, objectPosition: '50% 0%', scale: 1, zIndex: 1 }
              : getTransitionType(BG_IMAGES[bgIndex]) === "pan-right"
              ? { opacity: 1, objectPosition: '100% 50%', scale: 1, zIndex: 1 }
              : { opacity: 1, scale: [1, 1.1, 1], zIndex: 1 }
          }
          exit={{ opacity: 0.99, zIndex: 0 }} // Prevents dark background from showing through during crossfade
          transition={{
            opacity: { duration: 1.5, ease: 'easeInOut' },
            ...(getTransitionType(BG_IMAGES[bgIndex]) === "pan-up" 
              ? {
                  objectPosition: { duration: 10, ease: 'linear' },
                  scale: { duration: 10, ease: 'linear' }
                }
              : getTransitionType(BG_IMAGES[bgIndex]) === "pan-right"
              ? {
                  objectPosition: { duration: 15, ease: 'linear' }
                }
              : {
                  scale: { duration: 20, ease: "easeInOut", repeat: Infinity }
                })
          }}
        />
      </AnimatePresence>

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
              href="/Balete_Gerald_Resume.pdf" 
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

      {/* Smooth Transition Divider to Projects section */}
      <div 
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '30px',
          background: 'linear-gradient(to bottom, transparent 0%, var(--bg-card) 100%)',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          boxShadow: '0 -4px 30px rgba(0, 0, 0, 0.05)',
          zIndex: 3,
          pointerEvents: 'none'
        }}
      />
    </section>
  );
};

export default Hero;

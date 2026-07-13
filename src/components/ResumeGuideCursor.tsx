import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useAnimationFrame, AnimatePresence } from 'framer-motion';

const ResumeGuideCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [reachedTarget, setReachedTarget] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const startX = window.innerWidth - 80;
  const startY = window.innerHeight - 80;

  // Use motion values to drive position and rotation
  const x = useMotionValue(startX);
  const y = useMotionValue(startY);
  const rotation = useMotionValue(0);

  // Dismiss guide handler
  const dismissGuide = () => {
    setIsDismissed(true);
  };

  // Set up animation timing & standard event listeners
  useEffect(() => {
    const handleInteraction = () => {
      dismissGuide();
    };

    window.addEventListener('scroll', handleInteraction, { passive: true });
    window.addEventListener('mousedown', handleInteraction, { passive: true });
    window.addEventListener('touchstart', handleInteraction, { passive: true });

    // Hover on the button itself also dismisses
    const button = document.getElementById('download-resume-btn');
    button?.addEventListener('mouseenter', handleInteraction);

    // Initial delay before showing the guide (allows Hero text & button to load first)
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    const startTimer = setTimeout(() => {
      setIsAnimating(true);
    }, 1800);

    // Auto-dismiss after 12 seconds total to not clutter the UI
    const dismissTimer = setTimeout(() => {
      setIsDismissed(true);
    }, 12000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(startTimer);
      clearTimeout(dismissTimer);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('mousedown', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      button?.removeEventListener('mouseenter', handleInteraction);
    };
  }, []);

  // Frame loop tracking the button location in real-time
  useAnimationFrame((_time, delta) => {
    if (isDismissed) return;

    const button = document.getElementById('download-resume-btn');
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const targetX = rect.left + rect.width / 2;
    const targetY = rect.top + rect.height / 2;

    if (!isAnimating) {
      // Keep at start position before starting glide
      x.set(window.innerWidth - 80);
      y.set(window.innerHeight - 80);
      return;
    }

    if (reachedTarget) {
      // Actively track/snap to the button as it moves from typing layout changes
      x.set(targetX);
      y.set(targetY);
      rotation.set(-25); // resting pointing angle
      return;
    }

    // Dynamic framerate-independent LERP toward the button
    const currentX = x.get();
    const currentY = y.get();

    const speed = 0.055 * (delta / 16.6); // normalized to 60fps
    const clampedSpeed = Math.min(speed, 0.25); // cap speed to prevent overshoot

    const nextX = currentX + (targetX - currentX) * clampedSpeed;
    const nextY = currentY + (targetY - currentY) * clampedSpeed;

    x.set(nextX);
    y.set(nextY);

    // Calculate heading angle
    const dx = targetX - nextX;
    const dy = targetY - nextY;
    const distance = Math.hypot(dx, dy);

    if (distance < 8) {
      setReachedTarget(true);
    } else {
      const angleRad = Math.atan2(dy, dx);
      const angleDeg = (angleRad * 180) / Math.PI + 90; // Offset SVG orientation
      
      const currentRot = rotation.get();
      rotation.set(currentRot + (angleDeg - currentRot) * 0.1);
    }
  });

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }}>
          
          {/* Cursor and Ripples Container */}
          <motion.div
            style={{
              position: 'fixed',
              left: 0,
              top: 0,
              x: x,
              y: y,
              translateX: '-12px',
              translateY: '-14px',
              pointerEvents: 'none',
              zIndex: 9998,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* Click Ripple Effect centered at the cursor tip */}
            {reachedTarget && (
              <div style={{ position: 'absolute', width: 0, height: 0, zIndex: -1 }}>
                <motion.div
                  initial={{ scale: 0.3, opacity: 1 }}
                  animate={{ scale: 2.2, opacity: 0 }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
                  style={{
                    position: 'absolute',
                    left: -30,
                    top: -30,
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    border: '2px solid #ffffff',
                    boxShadow: '0 0 15px rgba(255, 255, 255, 0.6)',
                  }}
                />
                <motion.div
                  initial={{ scale: 0.3, opacity: 0.7 }}
                  animate={{ scale: 1.8, opacity: 0 }}
                  transition={{ duration: 1.4, delay: 0.4, repeat: Infinity, ease: 'easeOut' }}
                  style={{
                    position: 'absolute',
                    left: -30,
                    top: -30,
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    border: '2px solid #ffffff',
                    boxShadow: '0 0 15px rgba(255, 255, 255, 0.4)',
                  }}
                />
              </div>
            )}

            {/* Glowing 3D Triangle Pointer SVG */}
            <motion.div
              style={{
                rotate: rotation,
                originX: '7px',
                originY: '5px',
              }}
              animate={reachedTarget ? {
                scale: [1, 0.82, 1.05, 1],
              } : {}}
              transition={reachedTarget ? {
                repeat: Infinity,
                duration: 1.4,
                repeatDelay: 0.6,
                ease: 'easeInOut',
              } : {}}
            >
              <svg
                width="38"
                height="38"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  filter: 'drop-shadow(1px 1px 0px rgba(0, 0, 0, 0.45)) drop-shadow(2px 3px 5px rgba(0, 0, 0, 0.25))',
                }}
              >
                {/* 3D Extrusion Shadow (black offset) */}
                <path
                  d="M4.5 3V19.5L9.2 14.8L12.5 21.5L15 20.3L11.7 13.6L17.5 13.6L4.5 3Z"
                  fill="#7b7b7bff"
                  stroke="#7b7b7bff"
                  strokeWidth="1.5"
                  strokeLinejoin="miter"
                  transform="translate(1, 1)"
                />
                {/* Main Cursor body */}
                <path
                  d="M4.5 3V19.5L9.2 14.8L12.5 21.5L15 20.3L11.7 13.6L17.5 13.6L4.5 3Z"
                  fill="#ffffff"
                  stroke="#d0d0d0ff"
                  strokeWidth="1.8"
                  strokeLinejoin="miter"
                />
              </svg>
            </motion.div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ResumeGuideCursor;

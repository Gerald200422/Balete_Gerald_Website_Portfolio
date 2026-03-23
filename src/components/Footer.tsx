import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
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
  );
};

export default Footer;

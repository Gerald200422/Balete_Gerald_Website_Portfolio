import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, title, children }) => {
  // Prevent scrolling when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={onClose}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(8px)' }} 
          />
          
          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{ 
              position: 'relative', 
              background: 'var(--bg-light)', 
              width: '100%', 
              maxWidth: '800px', 
              maxHeight: '85vh', 
              borderRadius: '24px', 
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            {/* Header */}
            <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-alt)' }}>
              <h2 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--text-main)', fontWeight: 600 }}>{title}</h2>
              <button 
                onClick={onClose}
                aria-label="Close modal"
                style={{ background: 'var(--bg-light)', border: '1px solid var(--border-color)', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem', borderRadius: '50%', transition: 'all 0.2s ease' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-main)'; e.currentTarget.style.borderColor = 'var(--text-main)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border-color)'; }}
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Body */}
            <div style={{ padding: '2rem', overflowY: 'auto', color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '1rem' }} className="custom-scrollbar">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LegalModal;

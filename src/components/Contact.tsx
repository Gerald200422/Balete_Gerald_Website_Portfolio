import React, { useState, useRef, useCallback } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, ArrowRight } from 'lucide-react';
import { zoomIn } from '../App';

const Contact: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const handleContactSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setFormStatus('sending');
    
    // Credentials from original App.tsx
    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID, 
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID, 
      formRef.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
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

  return (
    <section id="contact" style={{ padding: '4rem 0 12rem 0' }}>
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
            padding: '3px',
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

          {/* Inner Card Content */}
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
                <motion.div
                  whileHover={{ y: -8, scale: 1.2, color: 'var(--primary)', filter: 'drop-shadow(0px 10px 10px rgba(0, 102, 204, 0.4))' }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  style={{ color: 'var(--text-main)', display: 'inline-block', cursor: 'pointer', position: 'relative' }}
                  onClick={() => {
                    navigator.clipboard.writeText('geraldbalete123@gmail.com');
                    alert('Email copied to clipboard!');
                  }}
                  title="Click to copy email"
                >
                  <Mail size={32} />
                </motion.div>
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
  );
};

export default Contact;

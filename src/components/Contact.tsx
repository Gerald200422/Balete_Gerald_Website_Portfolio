import React, { useState, useRef, useCallback } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, ArrowRight } from 'lucide-react';
import { zoomIn } from '../App';

const Contact: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [formError, setFormError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleContactSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setFormError(null);

    const formData = new FormData(formRef.current);
    const name = (formData.get('user_name') as string || '').trim();
    const email = (formData.get('user_email') as string || '').trim();
    const message = (formData.get('message') as string || '').trim();

    // 1. Name Validation
    if (name.length < 2) {
      setFormError('Please enter a valid name (at least 2 characters).');
      return;
    }
    const nameRegex = /^[a-zA-Z\s\-'.]+$/;
    if (!nameRegex.test(name)) {
      setFormError('Name can only contain letters, spaces, hyphens, and apostrophes.');
      return;
    }

    // 2. Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormError('Please enter a valid email address.');
      return;
    }

    // 3. Message Validation
    if (message.length < 10) {
      setFormError('Please enter a more detailed message (at least 10 characters).');
      return;
    }
    if (message.length > 3000) {
      setFormError('Message is too long. Please keep it under 3000 characters.');
      return;
    }
    
    // 4. Basic XSS / Security Check (Reject raw HTML tags)
    if (/<[a-z][\s\S]*>/i.test(message) || /<[a-z][\s\S]*>/i.test(name)) {
      setFormError('For security reasons, HTML tags are not allowed.');
      return;
    }

    setFormStatus('sending');
    
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Send to Site Owner
    const sendToOwner = emailjs.sendForm(
      serviceId, 
      'template_rb35ghh', 
      formRef.current,
      { publicKey }
    );

    // Send Auto-Reply to Visitor
    const sendAutoReply = emailjs.sendForm(
      serviceId, 
      'template_5rclruy', 
      formRef.current,
      { publicKey }
    );

    Promise.all([sendToOwner, sendAutoReply])
    .then(() => {
      setFormStatus('sent');
      formRef.current?.reset();
    })
    .catch(() => {
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
                  href="https://www.linkedin.com/in/geraldbalete/" 
                  target="_blank"
                  rel="noopener noreferrer"
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
                    <input type="text" name="user_name" placeholder="Name" required minLength={2} maxLength={100} className="apple-input" />
                    <input type="email" name="user_email" placeholder="Email" required maxLength={150} className="apple-input" />
                  </div>
                  <textarea placeholder="Message" name="message" required minLength={10} maxLength={3000} rows={5} className="apple-input" style={{ resize: 'none' }}></textarea>
                  
                  {formError && (
                    <motion.div 
                      initial={{ opacity: 0, y: -5 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      style={{ color: '#ff3b30', fontSize: '0.9rem', padding: '0.2rem 0.5rem' }}
                    >
                      {formError}
                    </motion.div>
                  )}

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

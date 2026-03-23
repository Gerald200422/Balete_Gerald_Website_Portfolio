import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Globe, Award, Code, ShieldCheck } from 'lucide-react';
import { SectionHeader, slideInLeft, slideInRight } from '../App';

const Experience: React.FC = () => {
  return (
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
                    Generated 500+ high-quality sales leads through targeted automated email campaigns. Improved email open rates by 15% through A/B testing and personalized content, while collaborating with the marketing team to align outreach strategies with product launches.
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
  );
};

export default Experience;

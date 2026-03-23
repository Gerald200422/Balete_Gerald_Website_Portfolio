import React from 'react';
import { motion } from 'framer-motion';
import { Star, Video, Trophy, Users } from 'lucide-react';
import { SectionHeader, flipIn } from '../App';

const Awards: React.FC = () => {
  return (
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
  );
};

export default Awards;

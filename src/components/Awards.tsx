import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Star, Video, Trophy, Users } from 'lucide-react';
import { SectionHeader, flipIn } from '../App';

const Awards: React.FC = () => {
  const iconVariants: Record<string, Variants> = {
    star: {
      hover: { 
        scale: [1, 1.3, 1],
        opacity: [1, 0.5, 1],
        transition: { repeat: Infinity, duration: 1, ease: "easeInOut" }
      }
    },
    video: {
      hover: { 
        scale: 1.2,
        rotate: [0, -5, 5, -5, 0],
        transition: { repeat: Infinity, duration: 0.8 }
      }
    },
    trophy: {
      hover: { 
        y: -10,
        scale: 1.25,
        rotateY: 360,
        transition: { duration: 0.8, ease: "backOut" }
      }
    },
    users: {
      hover: { 
        scale: 1.2,
        y: [0, -5, 0],
        transition: { repeat: Infinity, duration: 0.6, ease: "easeInOut" }
      }
    }
  };

  const getVariant = (title: string) => {
    if (title.includes("Star") || title.includes("List")) return iconVariants.star;
    if (title.includes("Video")) return iconVariants.video;
    if (title.includes("Trophy") || title.includes("Analytics")) return iconVariants.trophy;
    return iconVariants.users;
  };

  return (
    <section id="awards" style={{ padding: '8rem 0' }}>
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
              whileHover="hover"
              viewport={{ once: true }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="apple-card-elevated award-card-gold"
              style={{ 
                padding: '2.5rem', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '1rem', 
                alignItems: 'center', 
                textAlign: 'center',
                background: 'var(--bg-light)',
                border: '1px solid var(--border-soft)',
                cursor: 'pointer'
              }}
            >
              <div className="glitter-overlay" />
              <div className="glitter-particles" />
              <motion.div 
                variants={getVariant(award.title)}
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

import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileCode, Presentation, Settings, ShieldCheck, CheckCircle, 
  Zap, Target, Users, Clock 
} from 'lucide-react';
import { SectionHeader, zoomIn, slideInLeft } from '../App';

const Skills: React.FC = () => {
  return (
    <>
      {/* --- TECHNICAL SKILLS --- */}
      <section id="skills" style={{ background: 'var(--bg-light)', padding: '8rem 0' }}>
        <div className="container">
          <SectionHeader title="Technical Arsenal." subtitle="A diverse toolkit for the modern digital landscape." centered={false} />
          <div className="bento-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>

            {[
              { 
                title: "Web Development", 
                icon: <FileCode size={32} />, 
                skills: ["HTML5 / CSS3 / JavaScript", "React Frontend", "PHP Backend", "Responsive Design"] 
              },
              { 
                title: "Design & Prototyping", 
                icon: <Presentation size={32} />, 
                skills: ["Figma & Canva", "UI/UX Principles", "Graphic Design", "Video Editing"] 
              },
              { 
                title: "Mobile & Systems", 
                icon: <Settings size={32} />, 
                skills: ["Flutter Prototyping", "SQL Databases", "Networking", "Computer Troubleshooting"] 
              },
              { 
                title: "Professional Tools", 
                icon: <ShieldCheck size={32} />, 
                skills: ["Git & GitHub", "Visual Studio Code", "Microsoft Office Suite", "Data Entry"] 
              }
            ].map((domain) => (
              <motion.div
                key={domain.title}
                variants={zoomIn}
                initial="hidden"
                whileInView="visible"
                whileHover={{ 
                  y: -10, 
                  scale: 1.02, 
                  boxShadow: '0 35px 60px -15px rgba(0,0,150,0.05), inset 0 1px 0 rgba(255,255,255,0.8)' 
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                viewport={{ once: true, margin: "-50px" }}
                className="apple-card"
                style={{ padding: '2.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-soft)' }}
              >
                <motion.div 
                  whileHover={{ rotateY: 180, scale: 1.2 }}
                  transition={{ duration: 0.6, type: "spring" }}
                  style={{ color: 'var(--primary)', marginBottom: '1.5rem', display: 'inline-block' }}
                >
                  {domain.icon}
                </motion.div>
                <h4 style={{ fontSize: '1.4rem', fontWeight: 600, letterSpacing: '-0.01em', marginBottom: '1.2rem' }}>{domain.title}</h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {domain.skills.map(s => (
                    <li key={s} style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '0.6rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <CheckCircle size={14} style={{ color: 'var(--primary)' }} /> {s}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SOFT SKILLS & PHILOSOPHY --- */}
      <section id="soft-skills" style={{ background: 'var(--bg-card)', padding: '8rem 0' }}>
        <div className="container">
          <SectionHeader title="Soft Skills." subtitle="The human side of engineering." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {[
              { title: "Adaptability", icon: <Zap size={24} />, desc: "Willingness to learn new tech" },
              { title: "Precision", icon: <Target size={24} />, desc: "Strong attention to detail" },
              { title: "Synergy", icon: <Users size={24} />, desc: "Communication & teamwork" },
              { title: "Reliability", icon: <Clock size={24} />, desc: "Management & prioritization" },
              { title: "Dedication", icon: <Target size={24} />, desc: "Responsible & goal-oriented" }
            ].map((skill, i) => (
              <motion.div
                key={i}
                variants={slideInLeft}
                initial="hidden"
                whileInView="visible"
                whileHover={{ 
                  y: -10, 
                  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,1)' 
                }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
                className="apple-card-elevated"
                style={{ padding: '2rem', textAlign: 'center', background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(20px)' }}
              >
                <motion.div 
                  whileHover={{ scale: 1.2, rotate: 10 }} 
                  transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                  style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}
                >
                  {skill.icon}
                </motion.div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.3rem' }}>{skill.title}</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{skill.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Skills;

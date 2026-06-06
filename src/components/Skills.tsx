import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileCode, Presentation, Settings, CheckCircle, 
  Zap, Target, Users, Clock, Database, Wrench, BarChart, Server, MessageCircle, Briefcase, Lightbulb 
} from 'lucide-react';
import { SectionHeader, zoomIn, slideInLeft } from '../App';

const Skills: React.FC = () => {
  return (
    <>
      {/* --- TECHNICAL SKILLS --- */}
      <section id="skills" style={{ padding: '8rem 0' }}>
        <div className="container">
          <SectionHeader title="Technical Arsenal." subtitle="A diverse toolkit for the modern digital landscape." centered={false} />
          <div className="bento-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>

            {[
              { 
                title: "Web Development", 
                icon: <FileCode size={32} />, 
                skills: ["HTML, CSS, JavaScript", "PHP, React (exposure)"] 
              },
              { 
                title: "UI/UX Design", 
                icon: <Presentation size={32} />, 
                skills: ["Responsive layouts", "Figma prototyping", "Flutter (mobile interface)"] 
              },
              { 
                title: "Backend & Programming", 
                icon: <Server size={32} />, 
                skills: ["Node.js, Python", "Java, C#"] 
              },
              { 
                title: "Databases", 
                icon: <Database size={32} />, 
                skills: ["MySQL, PostgreSQL", "Firebase, Supabase"] 
              },
              { 
                title: "Tools & IDEs", 
                icon: <Wrench size={32} />, 
                skills: ["Visual Studio Code", "PyCharm, JetBrains", "GitHub (portfolio available)"] 
              },
              { 
                title: "Data & Analytics", 
                icon: <BarChart size={32} />, 
                skills: ["Tableau, Power BI"] 
              },
              { 
                title: "Other", 
                icon: <Settings size={32} />, 
                skills: ["Basic video editing", "Canva graphics", "Microsoft Office Suite"] 
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
                  boxShadow: '0 35px 60px -15px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.8)' 
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
      <section id="soft-skills" style={{ padding: '8rem 0' }}>
        <div className="container">
          <SectionHeader title="Soft Skills." subtitle="The human side of engineering." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {[
              { title: "Precision", icon: <Target size={24} />, desc: "Strong attention to detail & QA mindset" },
              { title: "Teamwork", icon: <Users size={24} />, desc: "Effective communication across teams" },
              { title: "Time Management", icon: <Clock size={24} />, desc: "Task prioritization under deadlines" },
              { title: "Adaptability", icon: <Zap size={24} />, desc: "Adaptability to new tech and workflows" },
              { title: "Problem-Solving", icon: <Lightbulb size={24} />, desc: "Proactive and goal-oriented" },
              { title: "Communication", icon: <MessageCircle size={24} />, desc: "Strong verbal and written skills" },
              { title: "Client Engagement", icon: <Briefcase size={24} />, desc: "Collaboration & consulting support" }
            ].map((skill, i) => (
              <motion.div
                key={i}
                variants={slideInLeft}
                initial="hidden"
                whileInView="visible"
                whileHover={{ 
                  y: -10, 
                  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,1)' 
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

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);
    const [hoveredMobileLink, setHoveredMobileLink] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 769) {
                setMobileMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#hero' },
        { name: 'Projects', href: '#projects' },
        { name: 'Skills', href: '#skills' },
        { name: 'Training', href: '#experience' },
        { name: 'Awards', href: '#awards' },
    ];

    return (
        <motion.nav
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
                position: 'fixed',
                top: scrolled ? 0 : '1.5rem',
                left: 0,
                right: 0,
                margin: '0 auto',
                width: scrolled ? '100%' : 'calc(100% - 3rem)',
                maxWidth: scrolled ? '100%' : '1200px',
                zIndex: 50,
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                background: scrolled ? 'rgba(235, 235, 240, 0.75)' : 'rgba(235, 235, 240, 0.4)',
                padding: scrolled ? '0.6rem 0' : '0.6rem 1.5rem',
                borderRadius: scrolled ? '0px' : '50px',
                boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.05)' : '0 20px 40px rgba(0,0,0,0.1)',
                backdropFilter: 'saturate(180%) blur(20px)',
                WebkitBackdropFilter: 'saturate(180%) blur(20px)',
            }}
        >
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <a href="#" style={{ fontSize: '1.4rem', fontWeight: 800, textDecoration: 'none', color: 'var(--text-main)', letterSpacing: '-0.03em' }}>
                    Gerald Balete.
                </a>
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <div className="nav-links">
                        {navLinks.map((link) => {
                            const isHovered = hoveredLink === link.name;
                            return (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    style={{
                                        textDecoration: 'none',
                                        color: isHovered ? '#ffffff' : 'var(--text-main)',
                                        fontSize: '0.95rem',
                                        fontWeight: 600,
                                        opacity: isHovered ? 1 : 0.8,
                                        transition: 'color 0.3s ease, opacity 0.3s ease',
                                        position: 'relative',
                                        padding: '0.4rem 0',
                                        textShadow: isHovered ? '0 2px 10px rgba(0,0,0,0.3)' : 'none'
                                    }}
                                    onMouseEnter={() => setHoveredLink(link.name)}
                                    onMouseLeave={() => setHoveredLink(null)}
                                >
                                    {link.name}
                                    {/* Animated Bottom Bar */}
                                    <span 
                                        style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            height: '2px',
                                            width: isHovered ? '100%' : '0%',
                                            background: '#ffffff',
                                            transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                            borderRadius: '2px',
                                            boxShadow: isHovered ? '0 2px 10px rgba(0,0,0,0.3)' : 'none'
                                        }}
                                    />
                                </a>
                            );
                        })}
                    </div>
                    <a href="#contact" className="btn-primary hide-on-mobile" style={{ padding: '0.6rem 1.5rem', fontSize: '0.95rem', borderRadius: '100px', fontWeight: 700 }}>Contact</a>

                    {/* MOBILE MENU BUTTON */}
                    <button
                        className="mobile-menu-btn"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-main)', alignItems: 'center' }}
                    >
                        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* MOBILE MENU DROPDOWN */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            width: '100%',
                            marginTop: '0.75rem',
                            background: 'rgb(235, 235, 240)',
                            backdropFilter: 'saturate(180%) blur(20px)',
                            WebkitBackdropFilter: 'saturate(180%) blur(20px)',
                            borderBottom: '1px solid rgba(0,0,0,0.05)',
                            borderRadius: '28px',
                            padding: '2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.75rem',
                            alignItems: 'center',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                        }}
                    >
                        {navLinks.map((link) => {
                            const isMobileHovered = hoveredMobileLink === link.name;
                            return (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    onMouseEnter={() => setHoveredMobileLink(link.name)}
                                    onMouseLeave={() => setHoveredMobileLink(null)}
                                    style={{
                                        textDecoration: 'none',
                                        color: isMobileHovered ? '#ffffff' : 'var(--text-main)',
                                        fontSize: '1.1rem',
                                        fontWeight: 600,
                                        width: '100%',
                                        textAlign: 'center',
                                        padding: '0.75rem 1.5rem',
                                        borderRadius: '100px',
                                        background: isMobileHovered ? 'var(--text-main)' : 'rgba(0,0,0,0.05)',
                                        transition: 'background 0.3s ease, color 0.3s ease',
                                    }}
                                >
                                    {link.name}
                                </a>
                            );
                        })}
                        <a
                            href="#contact"
                            onClick={() => setMobileMenuOpen(false)}
                            className="btn-primary"
                            style={{ padding: '0.8rem 2rem', fontSize: '1rem', borderRadius: '100px', marginTop: '1rem', width: '100%', textAlign: 'center' }}
                        >
                            Contact Me
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;

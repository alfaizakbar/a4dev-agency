import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about' },
    { name: 'Service', href: '/#services' },
    { name: 'Contact', href: '/#contact' },
  ];

  // Both Home and ServiceDetail have a dark hero banner at the top.
  // So the header should be dark (white text) initially, and white glass when scrolled.
  const isDarkHeader = !isScrolled;

  return (
    <>
      <header 
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          zIndex: 50,
          transition: 'all 0.3s ease',
          padding: isScrolled ? '16px 0' : '24px 0',
          color: isDarkHeader ? '#ffffff' : 'var(--text-color)',
        }}
        className={isScrolled ? 'glass' : (isDarkHeader ? '' : 'glass')}
      >
      <div className="container flex justify-between items-center" style={{ position: 'relative' }}>
        {/* Logo (Left) */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '24px', fontWeight: 800, letterSpacing: '-1px', color: isDarkHeader ? '#ffffff' : 'var(--primary-color)', zIndex: 10 }}>
          <img src={isDarkHeader ? "/logo.png" : "/logo-black.png"} alt="A4DEV Logo" style={{ width: '36px', height: '36px', borderRadius: '8px', objectFit: 'cover' }} />
          <div>A4<span style={{ color: isDarkHeader ? '#cbd5e1' : '#1e293b' }}>DEV</span></div>
        </Link>

        {/* Desktop Menu (Center) */}
        <nav 
          className="desktop-menu gap-8 items-center" 
          style={{ 
            fontWeight: 500, 
            fontSize: '15px',
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 5
          }}
        >
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              style={{ color: isDarkHeader ? 'rgba(255,255,255,0.8)' : 'var(--text-muted)', transition: 'color 0.2s' }}
              onMouseOver={(e) => e.currentTarget.style.color = isDarkHeader ? '#ffffff' : 'var(--primary-color)'}
              onMouseOut={(e) => e.currentTarget.style.color = isDarkHeader ? 'rgba(255,255,255,0.8)' : 'var(--text-muted)'}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Actions & Mobile Menu Btn */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', zIndex: 10 }}>
          <a href="#services" className="desktop-menu" style={{ padding: '10px 24px', borderRadius: '100px', backgroundColor: isDarkHeader ? 'rgba(255,255,255,0.1)' : 'var(--primary-color)', color: isDarkHeader ? '#ffffff' : '#ffffff', fontWeight: 600, fontSize: '14px', border: isDarkHeader ? '1px solid rgba(255,255,255,0.2)' : 'none', transition: 'all 0.3s ease', backdropFilter: 'blur(10px)' }} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = isDarkHeader ? 'rgba(255,255,255,0.2)' : 'var(--primary-hover)'; e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = isDarkHeader ? 'rgba(255,255,255,0.1)' : 'var(--primary-color)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
            Mulai Proyek
          </a>
          <button 
            className="mobile-menu-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ color: isDarkHeader ? 'white' : 'var(--text-color)', background: 'transparent' }}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
    </header>

    {/* Mobile Menu (Full Screen) */}
    <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'var(--primary-color)',
              backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              zIndex: 100,
              display: 'flex',
              flexDirection: 'column',
              padding: '24px',
              color: 'white',
              fontFamily: "'Plus Jakarta Sans', sans-serif"
            }}
          >
            {/* Top Bar inside Menu */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {/* Logo */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '24px', fontWeight: 800, letterSpacing: '-1px' }}>
                <img src="/logo.png" alt="A4DEV Logo" style={{ width: '36px', height: '36px', borderRadius: '8px', objectFit: 'cover' }} />
                <div>A4<span style={{ color: '#cbd5e1' }}>DEV</span></div>
              </div>
              
              {/* Close Button */}
              <button 
                onClick={() => setMobileMenuOpen(false)}
                style={{ 
                  background: 'rgba(255,255,255,0.1)', 
                  border: 'none', 
                  color: 'white', 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <X size={24} />
              </button>
            </div>

            {/* Links */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '24px', marginTop: '20px' }}>
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ 
                    fontSize: '18px', 
                    fontWeight: 500, 
                    color: 'white',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  {link.name}
                </a>
              ))}

              <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.2)', margin: '16px 0' }} />

              <a 
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  textDecoration: 'none',
                }}
              >
                Mulai Proyek →
              </a>
            </div>

            {/* Footer */}
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: 'auto', paddingBottom: '16px' }}>
              A4DEV AGENCY © {new Date().getFullYear()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;

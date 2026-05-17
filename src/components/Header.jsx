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

  // If on home page and not scrolled, header is over the purple hero.
  // Otherwise (scrolled or on other pages), header is white glass with dark text.
  const isDarkHeader = isHomePage && !isScrolled;

  return (
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
        <Link to="/" style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-1px', color: isDarkHeader ? '#ffffff' : 'var(--primary-color)', zIndex: 10 }}>
          A4<span style={{ color: isDarkHeader ? '#cbd5e1' : '#1e293b' }}>DEV</span>
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: '#ffffff',
              padding: '24px',
              borderBottom: '1px solid var(--card-border)',
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
            }}
            className="flex flex-col gap-6"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{ fontSize: '18px', fontWeight: 500, color: 'var(--text-color)' }}
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

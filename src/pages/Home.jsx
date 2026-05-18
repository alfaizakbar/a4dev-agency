import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Code, Monitor, Smartphone, ArrowRight, Mail, MapPin } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Home = () => {
  const { hash } = useLocation();

  // Slideshow State
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Form State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  // Hero Graphic State
  const [isVideoFinished, setIsVideoFinished] = useState(false);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    if (isVideoFinished) {
      const timer = setTimeout(() => setShowLogo(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [isVideoFinished]);
  
  const agencyImages = [
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % agencyImages.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(interval);
  }, [agencyImages.length]);

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  // Mouse Tracking for Godly Parallax Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 2; // -1 to 1
    const y = (clientY / innerHeight - 0.5) * 2; // -1 to 1
    mouseX.set(x);
    mouseY.set(y);
  };

  const springConfig = { damping: 30, stiffness: 100, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-1, 1], [15, -15]);
  const rotateY = useTransform(smoothX, [-1, 1], [-20, 20]);
  const translateY = useTransform(smoothY, [-1, 1], [-20, 20]);

  // Staggered Text Animations (Godly Style)
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -90, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0, 
      filter: 'blur(0px)',
      transition: { type: "spring", damping: 15, stiffness: 150 }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="hero-section" onMouseMove={handleMouseMove} style={{ perspective: '1000px', overflow: 'hidden' }}>
        {/* Dynamic Godly Background Orbs */}
        <motion.div 
          style={{ position: 'absolute', top: '20%', left: '10%', width: '400px', height: '400px', background: '#3b82f6', borderRadius: '50%', filter: 'blur(150px)', opacity: 0.3, x: useTransform(smoothX, [-1, 1], [-50, 50]), y: useTransform(smoothY, [-1, 1], [-50, 50]) }}
        />
        <motion.div 
          style={{ position: 'absolute', bottom: '10%', right: '10%', width: '500px', height: '500px', background: '#8b5cf6', borderRadius: '50%', filter: 'blur(150px)', opacity: 0.2, x: useTransform(smoothX, [-1, 1], [50, -50]), y: useTransform(smoothY, [-1, 1], [50, -50]) }}
        />

        <div className="container w-full" style={{ position: 'relative', zIndex: 10 }}>
          <div className="grid grid-cols-2 md-grid-cols-1 gap-12 items-center" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
            <motion.div style={{ maxWidth: '600px' }}>
              {/* Godly Text Reveal */}
              <motion.div variants={titleVariants} initial="hidden" animate="visible" style={{ marginBottom: '24px', perspective: '1000px' }}>
                <h1 style={{ fontSize: 'clamp(42px, 5vw, 64px)', lineHeight: 1.1, fontWeight: 800, letterSpacing: '-1.5px', display: 'flex', flexWrap: 'wrap', gap: '0.2em' }}>
                  {"A4DEV AGENCY".split(" ").map((word, wordIdx) => (
                    <span key={wordIdx} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                      {word.split("").map((char, charIdx) => (
                        <motion.span key={charIdx} variants={letterVariants} style={{ display: 'inline-block', transformOrigin: 'bottom' }}>
                          {char}
                        </motion.span>
                      ))}
                    </span>
                  ))}
                </h1>
                <h1 style={{ fontSize: 'clamp(42px, 5vw, 64px)', lineHeight: 1.1, fontWeight: 800, letterSpacing: '-1.5px', display: 'flex', flexWrap: 'wrap', gap: '0.2em', color: '#93c5fd' }}>
                  {"We Build, You Grow".split(" ").map((word, wordIdx) => (
                    <span key={wordIdx} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                      {word.split("").map((char, charIdx) => (
                        <motion.span key={charIdx} variants={letterVariants} style={{ display: 'inline-block', transformOrigin: 'bottom' }}>
                          {char === " " ? "\u00A0" : char}
                        </motion.span>
                      ))}
                    </span>
                  ))}
                </h1>
              </motion.div>

              <motion.p initial="hidden" animate="visible" variants={fadeInUp} style={{ fontSize: 'clamp(16px, 1.5vw, 18px)', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, marginBottom: '40px', maxWidth: '500px' }}>
                Solusi digital yang dirancang khusus untuk bisnis Anda. Kami menciptakan website dan aplikasi yang bekerja tanpa henti, sama kerasnya seperti Anda membangun bisnis.
              </motion.p>

              <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="flex items-center gap-4">
                <a href="#services" style={{ padding: '18px 36px', borderRadius: '100px', backgroundColor: 'white', color: 'var(--text-color)', fontWeight: 600, fontSize: '16px', transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)', display: 'inline-flex', alignItems: 'center', gap: '12px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }} onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 20px 30px rgba(0,0,0,0.15)'; }} onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)'; }}>
                  Mulai Sekarang <ArrowRight size={20} />
                </a>
              </motion.div>
            </motion.div>

            {/* Interactive Hero Graphic (Video to Image Transition) */}
            <motion.div 
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', rotateX, rotateY, translateY, transformStyle: 'preserve-3d' }}
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            >
              <div style={{ position: 'relative', width: '100%', maxWidth: '450px', aspectRatio: '1/1', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {/* Glow effect behind the graphic */}
                <motion.div 
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  style={{ position: 'absolute', width: '80%', height: '80%', background: 'radial-gradient(circle, rgba(147, 197, 253, 0.4) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(40px)', zIndex: 0 }}
                />
                
                <div style={{ position: 'relative', zIndex: 10, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <AnimatePresence mode="wait">
                    {!isVideoFinished && (
                      <motion.video 
                        key="hero-video"
                        src="/VIDEO-LOGO.mp4" 
                        autoPlay 
                        muted 
                        playsInline 
                        onEnded={() => setIsVideoFinished(true)}
                        initial={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        style={{ width: '100%', height: 'auto', borderRadius: '24px', objectFit: 'contain', boxShadow: '0 30px 60px rgba(0,0,0,0.3)' }}
                      />
                    )}
                    
                    {showLogo && (
                      <motion.img 
                        key="hero-logo"
                        src="/logo-white-gede.jpg" 
                        alt="A4DEV Logo Large"
                        initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                        animate={{ 
                          opacity: 1, 
                          scale: 1,
                          rotate: 0,
                          y: [-10, 10, -10], // Slight floating animation
                          rotateZ: [-2, 2, -2] // Slight rotation
                        }}
                        transition={{ 
                          opacity: { duration: 0.6, ease: "easeInOut" },
                          scale: { duration: 0.6, ease: "easeInOut" },
                          y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.6 },
                          rotateZ: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }
                        }}
                        style={{ width: '100%', height: 'auto', borderRadius: '24px', objectFit: 'contain', boxShadow: '0 30px 60px rgba(0,0,0,0.3)' }}
                      />
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dynamic Story-Driven About Section */}
      <section id="about" className="section" style={{ position: 'relative', overflow: 'hidden', padding: '120px 0' }}>
        {/* Abstract Background Gradients */}
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, rgba(0,0,0,0) 70%)', pointerEvents: 'none' }}></div>
        <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, rgba(0,0,0,0) 70%)', pointerEvents: 'none' }}></div>

        <div className="container">
          <div className="grid grid-cols-2 md-grid-cols-1 gap-16 items-center">
            {/* Text Storytelling Side */}
            <div style={{ position: 'relative', zIndex: 10 }}>
              <motion.div 
                initial={{ opacity: 0, x: -30 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true, margin: "-100px" }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(29, 78, 216, 0.05)', color: 'var(--primary-color)', borderRadius: '100px', fontWeight: 600, fontSize: '14px', marginBottom: '24px', border: '1px solid rgba(29, 78, 216, 0.1)' }}
              >
                <span style={{ display: 'block', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary-color)' }}></span>
                A4DEV AGENCY
              </motion.div>

              <motion.h2 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.1 }}
                style={{ fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: '32px' }}
              >
                Lebih dari sekadar <span className="text-gradient-primary">baris kode.</span>
              </motion.h2>

              <motion.div 
                variants={staggerContainer} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true, margin: "-100px" }}
                style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
              >
                <motion.p variants={fadeInUp} style={{ color: 'var(--text-muted)', fontSize: '18px', lineHeight: 1.8 }}>
                  Kami percaya bahwa setiap piksel memiliki tujuan. Di A4DEV, kami tidak hanya membangun website—kami merancang <strong>pengalaman digital</strong> yang menggerakkan bisnis Anda ke depan secara nyata.
                </motion.p>
                <motion.p variants={fadeInUp} style={{ color: 'var(--text-muted)', fontSize: '18px', lineHeight: 1.8 }}>
                  Dengan memadukan estetika desain kelas dunia dan arsitektur teknologi mutakhir, kami memastikan setiap produk yang kami ciptakan tidak hanya memanjakan mata, tetapi juga berkinerja tinggi, aman, dan dapat diskalakan tanpa batas.
                </motion.p>
              </motion.div>

              {/* Achievement Badges */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{ display: 'flex', gap: '32px', marginTop: '48px', alignItems: 'center' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ fontSize: '56px', fontWeight: 900, color: 'var(--primary-color)', letterSpacing: '-2px', lineHeight: 1 }}>50<span style={{ color: '#93c5fd' }}>+</span></div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-muted)', lineHeight: 1.4 }}>Klien<br/>Puas</div>
                </div>
                <div style={{ width: '1px', height: '40px', background: 'var(--card-border)' }}></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ fontSize: '56px', fontWeight: 900, color: 'var(--primary-color)', letterSpacing: '-2px', lineHeight: 1 }}>99<span style={{ color: '#93c5fd' }}>%</span></div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-muted)', lineHeight: 1.4 }}>Kode<br/>Optimal</div>
                </div>
              </motion.div>
            </div>

            {/* Interactive Slideshow Side */}
            <div style={{ position: 'relative', height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center', perspective: '1000px' }}>
              
              {/* Main Animated Slideshow */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, type: "spring", bounce: 0.2 }}
                style={{ width: '100%', maxWidth: '500px', height: '560px', borderRadius: '32px', overflow: 'hidden', position: 'relative', boxShadow: '0 30px 60px rgba(0,0,0,0.2)', zIndex: 2, border: '1px solid rgba(255,255,255,0.2)' }}
              >
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={activeImageIndex}
                    src={agencyImages[activeImageIndex]} 
                    alt={`Tim Kreatif ${activeImageIndex + 1}`} 
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} 
                  />
                </AnimatePresence>

                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, transparent 60%)' }}></div>
                
                <div style={{ position: 'absolute', bottom: '32px', left: '32px', right: '32px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '28px', letterSpacing: '-1px', marginBottom: '8px' }}>Tim Inovator</div>
                    <div style={{ fontSize: '15px', opacity: 0.9, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MapPin size={16} /> Berbasis di Lhokseumawe
                    </div>
                  </div>

                  {/* Slideshow Indicators */}
                  <div style={{ display: 'flex', gap: '8px', paddingBottom: '4px' }}>
                    {agencyImages.map((_, idx) => (
                      <div 
                        key={idx} 
                        style={{ 
                          width: idx === activeImageIndex ? '24px' : '8px', 
                          height: '8px', 
                          borderRadius: '10px', 
                          background: idx === activeImageIndex ? '#3b82f6' : 'rgba(255,255,255,0.3)',
                          transition: 'all 0.4s ease'
                        }} 
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section" style={{ background: '#f8fafc', color: 'var(--text-color)', position: 'relative', overflow: 'hidden', padding: '120px 0' }}>
        {/* Abstract Light Background Elements */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '400px', background: 'linear-gradient(to bottom, rgba(255,255,255,1), rgba(248,250,252,0))', pointerEvents: 'none' }}></div>
        <div style={{ position: 'absolute', top: '10%', left: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.06), transparent 70%)', pointerEvents: 'none' }}></div>
        <div style={{ position: 'absolute', bottom: '10%', right: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.06), transparent 70%)', pointerEvents: 'none' }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} style={{ textAlign: 'center', marginBottom: '80px' }}>
            <motion.div variants={fadeInUp} style={{ display: 'inline-block', padding: '8px 16px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary-color)', borderRadius: '100px', fontWeight: 700, fontSize: '14px', marginBottom: '24px' }}>
              KEAHLIAN KAMI
            </motion.div>
            <motion.h2 variants={fadeInUp} style={{ fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.1, color: 'var(--text-color)' }}>
              Solusi <span style={{ background: 'linear-gradient(to right, #2563eb, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Digital Terpadu</span>
            </motion.h2>
            <motion.p variants={fadeInUp} style={{ color: 'var(--text-muted)', fontSize: '18px', maxWidth: '600px', margin: '24px auto 0', lineHeight: 1.6 }}>
              Layanan komprehensif yang dirancang untuk mentransformasi ide Anda menjadi produk digital yang kuat dan terukur.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            {[
              { id: 'web-development', icon: <Monitor size={42} strokeWidth={1.2} color="var(--primary-color)" />, title: 'Pengembangan Web', desc: 'Website yang cepat, responsif, dan interaktif, dibangun dengan framework modern terkini untuk performa maksimal.' },
              { id: 'mobile-apps', icon: <Smartphone size={42} strokeWidth={1.2} color="#8b5cf6" />, title: 'Aplikasi Mobile', desc: 'Aplikasi seluler native dan lintas platform yang memberikan pengalaman pengguna yang intuitif dan mulus.' },
              { id: 'custom-software', icon: <Code size={42} strokeWidth={1.2} color="#10b981" />, title: 'Software Kustom', desc: 'Solusi perangkat lunak pesanan yang terukur dan dirancang khusus untuk memecahkan tantangan bisnis Anda.' }
            ].map((service, index) => (
              <motion.div key={service.id} variants={fadeInUp}>
                <Link to={`/services/${service.id}`} style={{ display: 'block', height: '100%' }}>
                  <div 
                    style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '32px', padding: '48px 40px', transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)', cursor: 'pointer', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}
                    onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-12px)'; e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.boxShadow = '0 30px 60px rgba(29, 78, 216, 0.08)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.02)'; }}
                  >
                    <div style={{ width: '80px', height: '80px', borderRadius: '24px', background: 'rgba(241, 245, 249, 0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px', border: '1px solid #e2e8f0' }}>
                      {service.icon}
                    </div>
                    <h3 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '16px', letterSpacing: '-0.5px', color: 'var(--text-color)' }}>{service.title}</h3>
                    <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '40px', flexGrow: 1, fontSize: '17px' }}>{service.desc}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-color)', fontWeight: 700, fontSize: '15px' }}>
                      Eksplorasi Layanan <ArrowRight size={18} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>      {/* Contact Section Minimalist & Modern */}
      <section id="contact" className="section" style={{ padding: '120px 0', background: 'white' }}>
        <div className="container">
          <div className="grid grid-cols-2 md-grid-cols-1 gap-16 items-start">
            
            {/* Info Side (Minimalist Typography) */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ paddingRight: 'clamp(0px, 4vw, 40px)' }}>
              <div style={{ display: 'inline-block', padding: '8px 16px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary-color)', borderRadius: '100px', fontWeight: 700, fontSize: '14px', marginBottom: '32px' }}>
                HUBUNGI KAMI
              </div>
              <h2 style={{ fontSize: 'clamp(48px, 6vw, 72px)', fontWeight: 800, letterSpacing: '-2px', marginBottom: '32px', lineHeight: 1.05, color: '#0f172a' }}>
                Mari mulai<br/><span style={{ background: 'linear-gradient(135deg, var(--primary-color), #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>sesuatu yang luar biasa.</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '20px', lineHeight: 1.6, marginBottom: '64px', maxWidth: '500px' }}>
                Ceritakan ide Anda, dan mari kita diskusikan bagaimana kami bisa membantu mewujudkannya menjadi produk digital yang sempurna.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>Email Langsung</div>
                  <a href="mailto:afordevagency@gmail.com" style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 700, color: 'var(--text-color)', transition: 'color 0.2s', display: 'inline-block' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary-color)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-color)'}>
                    afordevagency@gmail.com
                  </a>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>Lokasi Studio</div>
                  <div style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-color)', lineHeight: 1.5 }}>
                    Lhokseumawe, Aceh<br/>Indonesia
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form Side (Clean & Soft) */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ background: '#f8fafc', padding: 'clamp(32px, 5vw, 56px)', borderRadius: '32px', border: '1px solid #e2e8f0' }}>
               <form 
                 style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} 
                 onSubmit={async (e) => {
                   e.preventDefault();
                   setIsSubmitting(true);
                   setSubmitStatus(null);
                   
                   const formData = new FormData(e.target);
                   formData.append("access_key", "7e67e3a4-42f1-467a-b2c9-773d4f3369e3");
                   formData.append("subject", `Pesan Baru dari Website A4DEV - ${formData.get('name')}`);
                   formData.append("from_name", "A4DEV Website");
                   
                   const object = Object.fromEntries(formData);
                   const json = JSON.stringify(object);
                   
                   try {
                     const response = await fetch("https://api.web3forms.com/submit", {
                       method: "POST",
                       headers: {
                         "Content-Type": "application/json",
                         Accept: "application/json"
                       },
                       body: json
                     });
                     
                     const result = await response.json();
                     if (result.success) {
                       setSubmitStatus("success");
                       e.target.reset();
                     } else {
                       setSubmitStatus("error");
                     }
                   } catch (error) {
                     setSubmitStatus("error");
                   } finally {
                     setIsSubmitting(false);
                   }
                 }}
               >
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                   <input type="text" name="name" placeholder="Nama Lengkap Anda" style={{ width: '100%', padding: '20px 24px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', fontSize: '16px', color: 'var(--text-color)', outline: 'none', transition: 'all 0.3s' }} onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--primary-color)'; e.currentTarget.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)' }} onBlur={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none' }} required />
                   
                   <input type="email" name="email" placeholder="Alamat Email Anda" style={{ width: '100%', padding: '20px 24px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', fontSize: '16px', color: 'var(--text-color)', outline: 'none', transition: 'all 0.3s' }} onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--primary-color)'; e.currentTarget.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)' }} onBlur={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none' }} required />
                   
                   <textarea name="message" placeholder="Ceritakan detail proyek atau ide Anda..." rows="5" style={{ width: '100%', padding: '20px 24px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', fontSize: '16px', color: 'var(--text-color)', outline: 'none', transition: 'all 0.3s', resize: 'vertical' }} onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--primary-color)'; e.currentTarget.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)' }} onBlur={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none' }} required></textarea>
                 </div>
                 
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '8px' }}>
                   <button type="submit" disabled={isSubmitting} style={{ padding: '20px 40px', background: 'linear-gradient(135deg, var(--primary-color), #3b82f6)', color: 'white', fontWeight: 700, fontSize: '16px', border: 'none', borderRadius: '16px', cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: isSubmitting ? 0.7 : 1, transition: 'all 0.3s ease', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', width: '100%', boxShadow: '0 10px 20px rgba(37, 99, 235, 0.2)' }} onMouseOver={(e) => { if(!isSubmitting) { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 15px 30px rgba(37, 99, 235, 0.3)'; } }} onMouseOut={(e) => { if(!isSubmitting) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 20px rgba(37, 99, 235, 0.2)'; } }}>
                     {isSubmitting ? 'Mengirim Pesan...' : 'Kirim Pesan'} <ArrowRight size={20} />
                   </button>
                   {submitStatus === 'success' && <div style={{ color: '#059669', fontWeight: 600, fontSize: '15px', padding: '16px', background: '#d1fae5', borderRadius: '12px', textAlign: 'center' }}>✅ Pesan berhasil dikirim! Kami akan segera menghubungi Anda.</div>}
                   {submitStatus === 'error' && <div style={{ color: '#dc2626', fontWeight: 600, fontSize: '15px', padding: '16px', background: '#fee2e2', borderRadius: '12px', textAlign: 'center' }}>❌ Terjadi kesalahan saat mengirim. Silakan coba lagi.</div>}
                 </div>
               </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

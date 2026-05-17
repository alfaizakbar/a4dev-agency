import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X, CheckCircle, ShoppingCart, ArrowRight, Star } from 'lucide-react';

const serviceData = {
  'web-development': {
    title: 'Pengembangan Web',
    desc: 'Kami membangun website modern, cepat, dan responsif yang disesuaikan dengan kebutuhan bisnis Anda. Mulai dari landing page hingga sistem kompleks berbasis cloud.',
    price: 'Rp 5.000.000',
    features: ['Desain Premium & UI/UX Modern', 'Optimasi Kecepatan & SEO', 'Sepenuhnya Responsif di Semua Perangkat', 'Panel Admin Kustom (CMS)', 'Gratis Domain & Hosting 1 Tahun'],
    projects: [
      {
        id: 'web-1',
        title: 'Platform E-Commerce Modern',
        price: 'Rp 12.000.000',
        desc: 'Toko online lengkap dengan integrasi gateway pembayaran otomatis, manajemen inventaris, dan desain yang berpusat pada konversi.',
        coverImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
        fullImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1920&q=80'
      },
      {
        id: 'web-2',
        title: 'Corporate & Company Profile',
        price: 'Rp 5.500.000',
        desc: 'Website perusahaan profesional untuk membangun kredibilitas merek, menampilkan portofolio, dan menarik klien tingkat tinggi.',
        coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        fullImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&q=80'
      }
    ]
  },
  'mobile-apps': {
    title: 'Aplikasi Mobile',
    desc: 'Aplikasi mobile native maupun cross-platform untuk iOS dan Android. Berikan pengalaman pengguna yang mulus langsung di genggaman pelanggan Anda.',
    price: 'Rp 15.000.000',
    features: ['Support iOS & Android (Cross-platform)', 'Desain UI/UX Intuitif & Interaktif', 'Integrasi Push Notifications', 'Koneksi API & Database Real-time', 'Bantuan Publikasi ke Play Store & App Store'],
    projects: [
      {
        id: 'app-1',
        title: 'Aplikasi Keuangan (Fintech)',
        price: 'Rp 25.000.000',
        desc: 'Aplikasi dompet digital atau pelacakan finansial dengan keamanan tingkat perbankan dan analitik visual yang memukau.',
        coverImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
        fullImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&q=80'
      },
      {
        id: 'app-2',
        title: 'Aplikasi Kesehatan & Kebugaran',
        price: 'Rp 18.000.000',
        desc: 'Platform pelacakan aktivitas olahraga, pemantauan diet, dan kelas virtual dengan fitur gamifikasi yang menarik.',
        coverImage: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=800&q=80',
        fullImage: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=1920&q=80'
      }
    ]
  },
  'custom-software': {
    title: 'Software Kustom',
    desc: 'Solusi perangkat lunak khusus yang dirancang khusus untuk memecahkan tantangan dan mengoptimalkan proses operasional bisnis Anda yang kompleks.',
    price: 'Rp 25.000.000',
    features: ['Analisis Kebutuhan Bisnis Mendalam', 'Arsitektur Sistem Terukur (Scalable)', 'Protokol Keamanan Tingkat Tinggi', 'Otomatisasi Alur Kerja Khusus', 'Pemeliharaan & Dukungan Prioritas'],
    projects: [
      {
        id: 'soft-1',
        title: 'Sistem ERP Perusahaan',
        price: 'Rp 45.000.000',
        desc: 'Perangkat lunak terintegrasi untuk mengelola sumber daya, akuntansi, HR, dan rantai pasokan dari satu dasbor pusat.',
        coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
        fullImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1920&q=80'
      },
      {
        id: 'soft-2',
        title: 'Dasbor Analitik & CRM',
        price: 'Rp 30.000.000',
        desc: 'Manajemen hubungan pelanggan berbasis data dengan visualisasi matrik real-time untuk pengambilan keputusan strategis.',
        coverImage: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80',
        fullImage: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1920&q=80'
      }
    ]
  }
};

const ServiceDetail = () => {
  const { id } = useParams();
  const service = serviceData[id];
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!service) {
    return (
      <div className="section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <h2>Layanan Tidak Ditemukan</h2>
        <Link to="/" style={{ color: 'var(--primary-color)', marginTop: '16px', fontWeight: 600 }}>Kembali ke Beranda</Link>
      </div>
    );
  }

  const handleBuyWhatsApp = (projectTitle) => {
    const text = encodeURIComponent(`Halo A4DEV, saya tertarik untuk memesan layanan: ${projectTitle}. Bisakah kita mendiskusikan detail lebih lanjut?`);
    window.open(`https://wa.me/62895601827613?text=${text}`, '_blank');
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '120px' }}>
      {/* Hero Section */}
      <section className="hero-section" style={{ minHeight: 'auto', padding: '160px 0 120px' }}>
        <div style={{ position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', width: '100vw', height: '100%', background: 'radial-gradient(ellipse at top, rgba(255, 255, 255, 0.15), transparent 70%)', pointerEvents: 'none' }}></div>
        
        <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link to="/#services" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#94a3b8', marginBottom: '32px', fontWeight: 600, fontSize: '15px', transition: 'color 0.2s', padding: '8px 16px', background: 'rgba(255,255,255,0.05)', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.1)' }} onMouseOver={(e) => e.currentTarget.style.color = 'white'} onMouseOut={(e) => e.currentTarget.style.color = '#94a3b8'}>
              <ArrowLeft size={18} /> Kembali ke Layanan
            </Link>
          </motion.div>
          
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} style={{ fontSize: 'clamp(42px, 5vw, 64px)', fontWeight: 800, color: 'white', letterSpacing: '-1.5px', marginBottom: '24px', lineHeight: 1.1 }}>
            {service.title}
          </motion.h1>
          
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} style={{ fontSize: '18px', color: '#cbd5e1', lineHeight: 1.7, maxWidth: '700px', margin: '0 auto' }}>
            {service.desc}
          </motion.p>
        </div>
      </section>

      {/* Floating Info Cards */}
      <section style={{ marginTop: '-60px', position: 'relative', zIndex: 20 }}>
        <div className="container">
          <div className="grid grid-cols-2 md-grid-cols-1 gap-8">
            {/* Price Card */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} style={{ background: 'white', padding: '48px', borderRadius: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <Star size={32} color="var(--primary-color)" />
              </div>
              <div style={{ fontSize: '16px', color: 'var(--text-muted)', marginBottom: '12px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>Investasi Mulai Dari</div>
              <div style={{ fontSize: '42px', fontWeight: 800, color: 'var(--text-color)', letterSpacing: '-1px' }}>{service.price}</div>
              <p style={{ marginTop: '16px', color: 'var(--text-muted)', fontSize: '15px' }}>Disesuaikan dengan skala & kompleksitas spesifik proyek Anda.</p>
            </motion.div>

            {/* Features Card */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} style={{ background: 'white', padding: '48px', borderRadius: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '32px', letterSpacing: '-0.5px', color: 'var(--text-color)' }}>Apa yang Anda Dapatkan:</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {service.features.map((feature, idx) => (
                  <motion.li key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + (idx * 0.1) }} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <div style={{ marginTop: '2px' }}>
                      <CheckCircle size={22} color="#10b981" strokeWidth={2.5} />
                    </div>
                    <span style={{ color: 'var(--text-color)', fontWeight: 600, fontSize: '16px', lineHeight: 1.5 }}>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Gallery */}
      <section style={{ paddingTop: '100px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-1px', color: 'var(--text-color)' }}>Project <span style={{ color: 'var(--primary-color)' }}>Tersedia</span></h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '18px', marginTop: '16px' }}>Jelajahi solusi siap pakai yang dapat disesuaikan untuk bisnis Anda.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '100px' }}>
            {service.projects.map((project, idx) => (
              <motion.div 
                key={project.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                style={{ display: 'flex', flexDirection: idx % 2 === 0 ? 'row' : 'row-reverse', alignItems: 'center', gap: '64px', flexWrap: 'wrap' }}
              >
                {/* Image Side */}
                <div style={{ flex: '1 1 400px', position: 'relative', cursor: 'zoom-in', group: 'true' }} onClick={() => setSelectedProject(project)}>
                  <div style={{ borderRadius: '32px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.15)', border: '1px solid #e2e8f0', position: 'relative', aspectRatio: '4/3' }}>
                    <img src={project.coverImage} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'} />
                    {/* Dark gradient overlay at bottom for title visibility if needed, or just a hover hint */}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)', opacity: 0, transition: 'opacity 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onMouseOver={(e) => e.currentTarget.style.opacity = 1} onMouseOut={(e) => e.currentTarget.style.opacity = 0}>
                       <span style={{ background: 'white', color: 'var(--text-color)', padding: '12px 24px', borderRadius: '100px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>Pratinjau Penuh <ArrowRight size={18} /></span>
                    </div>
                  </div>
                </div>

                {/* Text Side */}
                <div style={{ flex: '1 1 400px' }}>
                  <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary-color)', borderRadius: '100px', fontWeight: 700, fontSize: '13px', marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Siap Digunakan
                  </div>
                  <h3 style={{ fontSize: '36px', fontWeight: 800, color: 'var(--text-color)', marginBottom: '24px', letterSpacing: '-1px', lineHeight: 1.2 }}>
                    {project.title}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '18px', lineHeight: 1.7, marginBottom: '32px' }}>
                    {project.desc}
                  </p>
                  <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-color)', marginBottom: '40px' }}>
                    {project.price}
                  </div>
                  
                  <button 
                    onClick={() => handleBuyWhatsApp(project.title)}
                    style={{ 
                      padding: '20px 40px', 
                      borderRadius: '100px', 
                      background: 'var(--primary-color)', 
                      color: 'white', 
                      fontWeight: 700, 
                      fontSize: '16px',
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '12px',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 10px 20px rgba(37, 99, 235, 0.2)'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--primary-hover)'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 15px 30px rgba(37, 99, 235, 0.3)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'var(--primary-color)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 20px rgba(37, 99, 235, 0.2)'; }}
                  >
                    <ShoppingCart size={20} /> Konsultasi Proyek Ini
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dark Theme Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(30, 58, 138, 0.95)', backdropFilter: 'blur(16px)', display: 'flex', flexDirection: 'column' }}
          >
            <div style={{ padding: '32px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <div>
                <h3 style={{ fontSize: '28px', fontWeight: 800, color: 'white', letterSpacing: '-0.5px' }}>{selectedProject.title}</h3>
                <div style={{ fontSize: '16px', fontWeight: 600, color: '#94a3b8', marginTop: '4px' }}>{selectedProject.price}</div>
              </div>
              <button onClick={() => setSelectedProject(null)} style={{ background: 'rgba(255,255,255,0.1)', padding: '16px', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer', transition: 'all 0.2s' }} onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; e.currentTarget.style.transform = 'rotate(90deg)'; }} onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'rotate(0deg)'; }}>
                <X size={28} />
              </button>
            </div>
            
            <div style={{ flex: 1, overflowY: 'auto', padding: '48px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
              <div style={{ maxWidth: '1200px', width: '100%', position: 'relative' }}>
                <motion.img 
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, type: 'spring', bounce: 0.3 }}
                  src={selectedProject.fullImage} 
                  alt={`${selectedProject.title} Full`} 
                  style={{ width: '100%', borderRadius: '24px', boxShadow: '0 40px 80px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }} 
                />
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  style={{ display: 'flex', justifyContent: 'center', marginTop: '48px', marginBottom: '48px' }}
                >
                  <button 
                    onClick={() => handleBuyWhatsApp(selectedProject.title)}
                    style={{ 
                      padding: '20px 48px', 
                      borderRadius: '100px', 
                      background: 'white', 
                      color: 'var(--text-color)', 
                      fontWeight: 800, 
                      fontSize: '18px',
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '12px',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(255,255,255,0.2)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    <ShoppingCart size={24} /> Beli Proyek Ini
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServiceDetail;

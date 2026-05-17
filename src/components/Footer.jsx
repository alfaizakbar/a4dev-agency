import React from 'react';

const Footer = () => {
  return (
    <footer style={{ borderTop: '1px solid var(--card-border)', padding: '40px 0', marginTop: '60px', background: 'var(--bg-color)' }}>
      <div className="container flex justify-between items-center md-flex-col gap-4">
        <div style={{ fontSize: '20px', fontWeight: 800 }}>
          <span style={{ color: 'var(--primary-color)' }}>A4</span>
          <span style={{ color: 'var(--text-color)' }}>DEV</span>
        </div>
        <div style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
          &copy; {new Date().getFullYear()} A4DEV Agency. Seluruh hak cipta dilindungi.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

const NotFound = () => {
  const clamp = (min, value, max) => Math.min(max, Math.max(min, value));

  return (
    <div style={{ minHeight: 'calc(100vh - 200px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(24px, 6vw, 48px) 24px' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ 
          background: '#FFF9E6', 
          width: 'clamp(100px, 25vw, 140px)', 
          height: 'clamp(100px, 25vw, 140px)', 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          margin: '0 auto 32px'
        }}>
          <Search size={clamp(48, 64, 64)} style={{ color: '#FFD700' }} />
        </div>
        <h1 style={{ fontSize: 'clamp(3rem, 10vw, 6rem)', fontWeight: 'bold', color: '#FFD700', marginBottom: '16px' }}>404</h1>
        <h2 style={{ fontSize: 'clamp(1.3rem, 4vw, 1.8rem)', marginBottom: '16px' }}>Page Not Found</h2>
        <p style={{ color: '#666666', marginBottom: '32px', maxWidth: '400px', margin: '0 auto 32px', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-primary" style={{ background: '#FFD700', color: '#000000', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)', padding: 'clamp(10px, 2vw, 12px) clamp(20px, 5vw, 32px)' }}>
          <Home size={18} style={{ display: 'inline', marginRight: '8px' }} />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
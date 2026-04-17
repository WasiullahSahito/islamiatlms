import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Mail, Lock } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 200px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(24px, 6vw, 48px) 24px' }}>
      <div className="card" style={{ maxWidth: '420px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ background: '#FFF9E6', width: 'clamp(50px, 12vw, 60px)', height: 'clamp(50px, 12vw, 60px)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <LogIn size={clamp(24, 28, 28)} style={{ color: '#FFD700' }} />
          </div>
          <h2 style={{ marginBottom: '8px', fontSize: 'clamp(1.5rem, 4vw, 1.8rem)' }}>Welcome Back</h2>
          <p style={{ color: '#666666', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}>Login to continue your journey</p>
        </div>

        {error && (
          <div style={{ background: '#FFF9E6', borderLeft: `3px solid #FFD700`, padding: '12px', borderRadius: '8px', marginBottom: '24px' }}>
            <p style={{ color: '#FFD700', fontSize: '0.85rem' }}>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#999999' }} />
              <input
                type="email"
                style={{
                  width: '100%',
                  padding: 'clamp(10px, 2.5vw, 12px) 16px clamp(10px, 2.5vw, 12px) 42px',
                  border: '2px solid #FFD70020',
                  borderRadius: '12px',
                  fontSize: 'clamp(0.85rem, 2vw, 0.95rem)'
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#999999' }} />
              <input
                type="password"
                style={{
                  width: '100%',
                  padding: 'clamp(10px, 2.5vw, 12px) 16px clamp(10px, 2.5vw, 12px) 42px',
                  border: '2px solid #FFD70020',
                  borderRadius: '12px',
                  fontSize: 'clamp(0.85rem, 2vw, 0.95rem)'
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '8px', background: '#FFD700', color: '#000000', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)', padding: 'clamp(12px, 2.5vw, 14px)' }}>
            <LogIn size={16} />
            Login
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #FFD70020' }}>
          <p style={{ color: '#666666', fontSize: 'clamp(0.8rem, 2vw, 0.9rem)' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#FFD700', fontWeight: '600', textDecoration: 'none' }}>
              Register here
            </Link>
          </p>
        </div>

        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <p style={{ fontSize: '0.7rem', color: '#999999' }}>
            Demo: student@islamiat.com / password123
          </p>
        </div>
      </div>
    </div>
  );
};

const clamp = (min, value, max) => Math.min(max, Math.max(min, value));

export default Login;
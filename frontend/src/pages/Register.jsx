import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, User, Mail, Lock, ArrowLeft } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [intendedCourse, setIntendedCourse] = useState(null);
  const { register, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if there's an intended course to purchase
    const storedCourse = sessionStorage.getItem('intendedCourse');
    if (storedCourse) {
      setIntendedCourse(JSON.parse(storedCourse));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    const success = register(name, email, password);
    if (success) {
      // Auto-login after registration
      const loginSuccess = login(email, password);
      if (loginSuccess) {
        // Clear stored course
        sessionStorage.removeItem('intendedCourse');
        
        // If there's an intended course, redirect to purchase
        if (intendedCourse) {
          navigate(`/course-payment/${intendedCourse.id}`, { 
            state: { course: intendedCourse.course }
          });
        } else {
          navigate('/dashboard');
        }
      } else {
        navigate('/login');
      }
    } else {
      setError('Email already exists');
    }
  };

  const clamp = (min, value, max) => Math.min(max, Math.max(min, value));

  return (
    <div style={{ minHeight: 'calc(100vh - 200px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(24px, 6vw, 48px) 24px' }}>
      <div className="card" style={{ maxWidth: '420px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ background: '#FFF9E6', width: 'clamp(50px, 12vw, 60px)', height: 'clamp(50px, 12vw, 60px)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <UserPlus size={clamp(24, 28, 28)} style={{ color: '#FFD700' }} />
          </div>
          <h2 style={{ marginBottom: '8px', fontSize: 'clamp(1.5rem, 4vw, 1.8rem)' }}>Create Account</h2>
          <p style={{ color: '#666666', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}>
            {intendedCourse ? 'Register to complete your purchase' : 'Join us on your journey to excellence'}
          </p>
          {intendedCourse && (
            <div style={{ 
              marginTop: '12px', 
              padding: '10px', 
              background: '#FFF9E6', 
              borderRadius: '8px',
              fontSize: '0.85rem'
            }}>
              <p style={{ margin: 0 }}>
                📚 You're about to purchase: <strong>{intendedCourse.course.name}</strong> (${intendedCourse.course.price})
              </p>
            </div>
          )}
        </div>

        {error && (
          <div style={{ background: '#FFF9E6', borderLeft: `3px solid #FFD700`, padding: '12px', borderRadius: '8px', marginBottom: '24px' }}>
            <p style={{ color: '#FFD700', fontSize: '0.85rem' }}>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}>Full Name</label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#999999' }} />
              <input
                type="text"
                style={{
                  width: '100%',
                  padding: 'clamp(10px, 2.5vw, 12px) 16px clamp(10px, 2.5vw, 12px) 42px',
                  border: '2px solid #FFD70020',
                  borderRadius: '12px',
                  fontSize: 'clamp(0.85rem, 2vw, 0.95rem)'
                }}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

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

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}>Confirm Password</label>
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '8px', background: '#FFD700', color: '#000000', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)', padding: 'clamp(12px, 2.5vw, 14px)' }}>
            <UserPlus size={16} />
            {intendedCourse ? 'Register & Continue to Payment' : 'Register'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #FFD70020' }}>
          <p style={{ color: '#666666', fontSize: 'clamp(0.8rem, 2vw, 0.9rem)' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#FFD700', fontWeight: '600', textDecoration: 'none' }}>
              Login here
            </Link>
          </p>
          {intendedCourse && (
            <Link 
              to={`/course/${intendedCourse.id}`} 
              style={{ 
                display: 'inline-block',
                marginTop: '16px',
                color: '#FFD700',
                fontSize: '0.85rem',
                textDecoration: 'none'
              }}
            >
              <ArrowLeft size={14} style={{ display: 'inline', marginRight: '4px' }} />
              Back to Course Details
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
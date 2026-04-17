import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, User, LogOut, Menu, X, Sparkles } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Courses', path: '/courses' },
    { name: 'Resources', path: '/resources' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      background: scrolled ? 'rgba(255, 255, 255, 0.98)' : '#FFFFFF',
      padding: scrolled ? '12px 0' : '16px 0',
      borderBottom: `1px solid ${scrolled ? 'rgba(255, 215, 0, 0.2)' : '#FFD700'}`,
      position: "sticky",
      top: 0,
      zIndex: 1000,
      transition: "all 0.3s ease",
      backdropFilter: scrolled ? "blur(10px)" : "none"
    }}>
      <div className="container" style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>

        <Link to="/" style={{
          color: "#000000",
          fontWeight: "bold",
          fontSize: "clamp(16px, 4vw, 20px)",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          textDecoration: "none",
          transition: "transform 0.3s ease"
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>
          <div style={{
            background: "linear-gradient(135deg, #FFD700, #FFE55C)",
            padding: "8px",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <BookOpen size={clamp(18, 22, 22)} style={{ color: "#000000" }} />
          </div>
          <span style={{ display: "flex", flexWrap: "wrap" }}>
            <span style={{
              background: "linear-gradient(135deg, #FFD700, #FFE55C)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>Arsslan Turabi</span>
            <span style={{ color: "#666666" }}> Islamiat 2058</span>
          </span>
        </Link>

        <div className="nav-links" style={{
          display: "flex",
          gap: "clamp(16px, 3vw, 28px)",
          alignItems: "center"
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              style={{
                ...linkStyle,
                color: isActive(link.path) ? '#FFD700' : '#000000',
                fontWeight: isActive(link.path) ? '600' : '500',
                position: 'relative',
                fontSize: 'clamp(0.85rem, 2vw, 0.95rem)'
              }}
              onMouseEnter={(e) => {
                if (!isActive(link.path)) {
                  e.currentTarget.style.color = '#FFD700';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(link.path)) {
                  e.currentTarget.style.color = '#000000';
                }
              }}
            >
              {link.name}
              {isActive(link.path) && (
                <span style={{
                  position: 'absolute',
                  bottom: '-4px',
                  left: '0',
                  right: '0',
                  height: '2px',
                  background: 'linear-gradient(90deg, #FFD700, #FFE55C)',
                  borderRadius: '2px',
                  animation: 'slideInLeft 0.3s ease'
                }} />
              )}
            </Link>
          ))}
          {user ? (
            <>
            <Link to={user.role === 'instructor' ? '/instructor-dashboard' : '/dashboard'} style={{
                ...linkStyle,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: '#FFF9E6',
                padding: '8px 16px',
                borderRadius: '100px',
                transition: 'all 0.3s ease',
                fontSize: 'clamp(0.85rem, 2vw, 0.95rem)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#FFD700';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#FFF9E6';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                <User size={16} style={{ color: '#FFD700' }} />
                <span style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name}</span>
              </Link>
              <button onClick={handleLogout} style={{
                ...linkStyle,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                fontFamily: 'inherit',
                fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#FFD700'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#000000'}>
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ ...linkStyle, fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}>
                Login
              </Link>
              <Link to="/courses" style={{
                ...linkStyle,
                background: "linear-gradient(135deg, #FFD700, #FFE55C)",
                color: "#000000",
                padding: "10px 24px",
                borderRadius: "100px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontWeight: "bold",
                transition: "all 0.3s ease",
                boxShadow: "0 2px 8px rgba(255, 215, 0, 0.3)",
                fontSize: 'clamp(0.85rem, 2vw, 0.95rem)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(255, 215, 0, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(255, 215, 0, 0.3)";
              }}>
                <Sparkles size={16} />
                Enroll Now
              </Link>
            </>
          )}
        </div>

        <div onClick={() => setIsOpen(!isOpen)} style={{
          cursor: "pointer",
          color: "#FFD700",
          display: "none",
          padding: "8px",
          borderRadius: "8px",
          transition: "background 0.3s ease"
        }}
        className="mobile-menu-btn"
        onMouseEnter={(e) => e.currentTarget.style.background = "#FFF9E6"}
        onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </div>
      </div>

      <div className={`mobile-menu ${isOpen ? 'active' : ''}`} style={{
        position: "fixed",
        top: scrolled ? "68px" : "76px",
        left: 0,
        right: 0,
        background: "#FFFFFF",
        padding: "24px",
        transform: isOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1)",
        zIndex: 1000,
        borderTop: "1px solid #FFD700",
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
      }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px"
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              style={{
                ...mobileLinkStyle,
                color: isActive(link.path) ? '#FFD700' : '#000000',
                fontWeight: isActive(link.path) ? '600' : '500'
              }}
            >
              {link.name}
            </Link>
          ))}
          {user ? (
            <>
                          <Link to={user.role === 'instructor' ? '/instructor-dashboard' : '/dashboard'} style={mobileLinkStyle}>
                <User size={16} />
                {user.name}
              </Link>
              <button onClick={handleLogout} style={{
                ...mobileLinkStyle,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                padding: 0,
                fontFamily: 'inherit',
                fontSize: 'inherit'
              }}>
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={mobileLinkStyle}>
                Login
              </Link>
              <Link to="/courses" style={{
                ...mobileLinkStyle,
                background: "linear-gradient(135deg, #FFD700, #FFE55C)",
                color: "#000000",
                padding: "12px 20px",
                borderRadius: "100px",
                textAlign: "center",
                fontWeight: "bold",
                justifyContent: "center"
              }}>
                <Sparkles size={16} />
                Enroll Now
              </Link>
            </>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-links {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </nav>
  );
};

const clamp = (min, value, max) => Math.min(max, Math.max(min, value));

const linkStyle = {
  color: "#000000",
  textDecoration: "none",
  fontWeight: "500",
  transition: "color 0.3s ease"
};

const mobileLinkStyle = {
  color: "#000000",
  textDecoration: "none",
  fontWeight: "500",
  padding: "12px 0",
  borderBottom: "1px solid rgba(255, 215, 0, 0.2)",
  display: "flex",
  alignItems: "center",
  gap: "10px"
};

export default Navbar;

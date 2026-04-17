import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Send, Video, Star } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: '',
    demoClass: false
  });
  const revealRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );

    revealRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      course: '',
      message: '',
      demoClass: false
    });
  };

  return (
    <div style={{ padding: 'clamp(40px, 8vw, 64px) 0' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(32px, 6vw, 48px)' }}>
          <div className="scroll-reveal" ref={addToRefs}>
            <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.2rem)', marginBottom: '16px' }}>
              Get in <span style={{ color: '#FFD700' }}>Touch</span>
            </h1>
            <p style={{ color: '#666666', marginBottom: '32px', fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>
              Have questions about our courses? Want to schedule a demo class?
              We're here to help you on your Islamiat learning journey.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '40px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ background: '#FFF9E6', padding: '12px', borderRadius: '12px', flexShrink: 0 }}>
                  <Mail size={20} style={{ color: '#FFD700' }} />
                </div>
                <div>
                  <h3 style={{ fontWeight: '600', marginBottom: '4px', fontSize: 'clamp(0.9rem, 2.5vw, 1rem)' }}>Email</h3>
                  <p style={{ color: '#666666', fontSize: 'clamp(0.8rem, 2vw, 0.9rem)' }}>islamiat.excellence@email.com</p>
                  <p style={{ color: '#666666', fontSize: 'clamp(0.8rem, 2vw, 0.9rem)' }}>support@islamiatexcellence.com</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ background: '#FFF9E6', padding: '12px', borderRadius: '12px', flexShrink: 0 }}>
                  <Phone size={20} style={{ color: '#FFD700' }} />
                </div>
                <div>
                  <h3 style={{ fontWeight: '600', marginBottom: '4px', fontSize: 'clamp(0.9rem, 2.5vw, 1rem)' }}>Phone</h3>
                  <p style={{ color: '#666666', fontSize: 'clamp(0.8rem, 2vw, 0.9rem)' }}>+1 234 567 8900</p>
                  <p style={{ color: '#666666', fontSize: 'clamp(0.8rem, 2vw, 0.9rem)' }}>+1 234 567 8901</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ background: '#FFF9E6', padding: '12px', borderRadius: '12px', flexShrink: 0 }}>
                  <MapPin size={20} style={{ color: '#FFD700' }} />
                </div>
                <div>
                  <h3 style={{ fontWeight: '600', marginBottom: '4px', fontSize: 'clamp(0.9rem, 2.5vw, 1rem)' }}>Location</h3>
                  <p style={{ color: '#666666', fontSize: 'clamp(0.8rem, 2vw, 0.9rem)' }}>Online - Available Worldwide</p>
                </div>
              </div>
            </div>

            <div style={{ background: '#FFF9E6', padding: 'clamp(20px, 4vw, 28px)', borderRadius: '20px' }}>
              <h3 style={{ fontWeight: 'bold', fontSize: 'clamp(1rem, 2.5vw, 1.1rem)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <Star size={18} style={{ color: '#FFD700' }} />
                Free Demo Class
              </h3>
              <p style={{ color: '#666666', marginBottom: '20px', fontSize: 'clamp(0.8rem, 2vw, 0.9rem)' }}>
                Experience our teaching methodology with a free 30-minute demo class.
              </p>
              <button className="btn-primary" style={{ background: '#FFD700', color: '#000000', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)', padding: 'clamp(10px, 2vw, 12px) clamp(20px, 4vw, 28px)' }}>
                <Video size={14} style={{ display: 'inline', marginRight: '8px' }} />
                Schedule Demo
              </button>
            </div>
          </div>

          <div className="card scroll-reveal" ref={addToRefs} style={{ animationDelay: '0.2s' }}>
            <h2 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.4rem)', marginBottom: '24px' }}>Send us a Message</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}>Full Name *</label>
                <input
                  type="text"
                  required
                  style={{
                    width: '100%',
                    padding: 'clamp(10px, 2vw, 12px) 16px',
                    border: '2px solid #FFD70020',
                    borderRadius: '12px',
                    fontSize: 'clamp(0.85rem, 2vw, 0.95rem)'
                  }}
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}>Email Address *</label>
                <input
                  type="email"
                  required
                  style={{
                    width: '100%',
                    padding: 'clamp(10px, 2vw, 12px) 16px',
                    border: '2px solid #FFD70020',
                    borderRadius: '12px',
                    fontSize: 'clamp(0.85rem, 2vw, 0.95rem)'
                  }}
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}>Phone Number</label>
                <input
                  type="tel"
                  style={{
                    width: '100%',
                    padding: 'clamp(10px, 2vw, 12px) 16px',
                    border: '2px solid #FFD70020',
                    borderRadius: '12px',
                    fontSize: 'clamp(0.85rem, 2vw, 0.95rem)'
                  }}
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}>Course Interest</label>
                <select
                  style={{
                    width: '100%',
                    padding: 'clamp(10px, 2vw, 12px) 16px',
                    border: '2px solid #FFD70020',
                    borderRadius: '12px',
                    fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                    background: '#FFFFFF'
                  }}
                  value={formData.course}
                  onChange={(e) => setFormData({...formData, course: e.target.value})}
                >
                  <option value="">Select a course</option>
                  <option value="igcse">IGCSE Islamiat</option>
                  <option value="olevel">O Level Islamiat</option>
                </select>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
                <input
                  type="checkbox"
                  id="demoClass"
                  style={{ width: '18px', height: '18px', marginRight: '10px', accentColor: '#FFD700', flexShrink: 0 }}
                  checked={formData.demoClass}
                  onChange={(e) => setFormData({...formData, demoClass: e.target.checked})}
                />
                <label htmlFor="demoClass" style={{ color: '#666666', cursor: 'pointer', fontSize: 'clamp(0.8rem, 2vw, 0.9rem)' }}>
                  Request a free demo class
                </label>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}>Message</label>
                <textarea
                  rows="4"
                  style={{
                    width: '100%',
                    padding: 'clamp(10px, 2vw, 12px) 16px',
                    border: '2px solid #FFD70020',
                    borderRadius: '12px',
                    fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                    fontFamily: 'inherit'
                  }}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Tell us about your requirements..."
                />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', background: '#FFD700', color: '#000000', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)', padding: 'clamp(12px, 2.5vw, 14px)' }}>
                <Send size={16} style={{ display: 'inline', marginRight: '8px' }} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

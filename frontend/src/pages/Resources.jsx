import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  FileText, Lock, Download, Eye, BookOpen, FileQuestion, 
  Video, Calendar, Clock, Users, Monitor, Headphones, Star, CheckCircle, X 
} from 'lucide-react';

const Resources = () => {
  const { user } = useAuth();
  const [selectedResource, setSelectedResource] = useState(null);
  const [activeTab, setActiveTab] = useState('materials');
  const revealRefs = useRef([]);
  const [key, setKey] = useState(0); // Add key to force re-render

  // Reset animations when tab changes
  useEffect(() => {
    // Reset all refs
    revealRefs.current = [];
    setKey(prev => prev + 1); // Force re-render to reset animations
  }, [activeTab]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1 }
    );

    revealRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [activeTab, key]); // Re-run when tab changes

  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
      // Only set initial styles if they haven't been revealed yet
      if (el.style.opacity !== '1') {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.2, 0.9, 0.4, 1.1)';
      }
    }
  };

  const schedule = [
    { day: 'Monday', time: '5:00 PM - 6:30 PM', topic: 'Quranic Themes Analysis' },
    { day: 'Tuesday', time: '5:00 PM - 6:30 PM', topic: 'Hadith Studies' },
    { day: 'Wednesday', time: '5:00 PM - 6:30 PM', topic: 'Life of Prophet (PBUH)' },
    { day: 'Thursday', time: '5:00 PM - 6:30 PM', topic: 'Islamic Beliefs & Practices' },
    { day: 'Saturday', time: '10:00 AM - 12:00 PM', topic: 'Weekly Test & Review' }
  ];

  const benefits = [
    'Live interactive sessions with Q&A',
    'Recorded sessions available for review',
    'Personalized attention and feedback',
    'Real-time doubt clearing',
    'Peer learning opportunities',
    'Flexible scheduling options'
  ];

  const materials = [
    {
      id: 1,
      title: 'Complete Islamiat Notes',
      type: 'Notes',
      icon: <BookOpen size={24} />,
      locked: true,
      description: 'Comprehensive notes covering all topics with examiner insights',
      content: 'Detailed notes covering the entire syllabus with examiner insights, including:\n• Major Themes of the Qur\'an\n• History and Importance of the Qur\'an\n• The Life of Prophet Muhammad (PBUH)\n• History and Importance of Hadith\n• The Rightly Guided Caliphs\n• Articles of Faith and Pillars of Islam'
    },
    {
      id: 2,
      title: 'Past Papers 2020-2024',
      type: 'Past Papers',
      icon: <FileText size={24} />,
      locked: true,
      description: 'Solved past papers with marking schemes',
      content: 'Complete collection of past papers from 2020-2024 with detailed solutions and examiner marking schemes. Includes:\n• May/June sessions\n• October/November sessions\n• Model answers\n• Examiner tips and common mistakes'
    },
    {
      id: 3,
      title: 'Rubric Exercises',
      type: 'Exercises',
      icon: <FileQuestion size={24} />,
      locked: true,
      description: 'Practice exercises based on examiner marking criteria',
      content: 'Practice exercises designed specifically to help you master the DDE (Depth, Detail, Evaluation) marking criteria. Each exercise includes:\n• Model answers\n• Marking rubric\n• Self-assessment checklist\n• Teacher feedback template'
    },
    {
      id: 4,
      title: 'Sample Notes Preview',
      type: 'Preview',
      icon: <Eye size={24} />,
      locked: false,
      description: 'Free sample notes to preview our teaching style',
      content: 'Sample notes showing our teaching methodology:\n\n"Quranic Passages - Surah Al-Fatiha:\nThis passage emphasizes the importance of praising Allah and seeking His guidance. Candidates should note:\n• The structure of the Surah\n• Key themes of praise and supplication\n• Application in daily life\n• Connection to other Quranic themes"'
    }
  ];

  const handleResourceClick = (resource) => {
    if (!resource.locked && !user) {
      setSelectedResource(resource);
    } else if (user) {
      setSelectedResource(resource);
    } else {
      alert('Please purchase a course to access this resource!');
    }
  };

  const handleDemoRequest = () => {
    alert('Demo class requested! We will contact you shortly with class details.');
  };

  return (
    <div style={{ 
      padding: '64px 0', 
      backgroundColor: '#ffffff', 
      minHeight: '100vh',
      width: '100%'
    }}>
      <div style={{ 
        maxWidth: '1280px', 
        margin: '0 auto', 
        padding: '0 24px',
        width: '100%'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '16px', color: '#1a1a1a' }}>
            Learning <span style={{ color: '#FFD700' }}>Resources</span>
          </h1>
          <p style={{ fontSize: '1rem', color: '#666666', maxWidth: '600px', margin: '16px auto 0' }}>
            Access comprehensive study materials, past papers, practice exercises, and join live online classes
          </p>
        </div>

        {/* Tab Navigation */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '16px', 
          marginBottom: '40px',
          borderBottom: '2px solid rgba(255, 215, 0, 0.125)',
          paddingBottom: '16px',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => setActiveTab('materials')}
            style={{
              padding: '12px 28px',
              background: activeTab === 'materials' ? '#FFD700' : 'transparent',
              color: activeTab === 'materials' ? '#000000' : '#666666',
              border: 'none',
              borderRadius: '40px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <BookOpen size={18} />
            Study Materials
          </button>
          <button
            onClick={() => setActiveTab('classes')}
            style={{
              padding: '12px 28px',
              background: activeTab === 'classes' ? '#FFD700' : 'transparent',
              color: activeTab === 'classes' ? '#000000' : '#666666',
              border: 'none',
              borderRadius: '40px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Video size={18} />
            Online Classes
          </button>
        </div>

        {/* STUDY MATERIALS TAB */}
        {activeTab === 'materials' && (
          <div key="materials-tab" style={{ width: '100%' }}>
            {!user && (
              <div ref={addToRefs} style={{ 
                background: '#FFF9E6', 
                borderLeft: '4px solid #FFD700', 
                padding: '20px', 
                borderRadius: '12px', 
                marginBottom: '40px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <Eye size={20} style={{ color: '#FFD700' }} />
                  <p style={{ color: '#000000', fontSize: '0.95rem', margin: 0 }}>
                    <strong>Preview Mode:</strong> You can view sample resources. 
                    <a href="/courses" style={{ color: '#FFD700', textDecoration: 'none', marginLeft: '8px', fontWeight: '600' }}>Purchase a course</a> 
                    to unlock all resources.
                  </p>
                </div>
              </div>
            )}

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
              gap: '28px',
              marginBottom: '40px'
            }}>
              {materials.map((resource, index) => (
                <div
                  key={resource.id}
                  ref={addToRefs}
                  onClick={() => handleResourceClick(resource)}
                  style={{
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    backgroundColor: '#ffffff',
                    borderRadius: '24px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    border: '1px solid #eef2f6',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(255, 215, 0, 0.15)';
                    e.currentTarget.style.borderColor = '#FFD700';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                    e.currentTarget.style.borderColor = '#eef2f6';
                  }}
                >
                  <div style={{
                    height: '4px',
                    background: 'linear-gradient(90deg, #FFD700, #FFE55C)',
                    width: '100%'
                  }}></div>
                  
                  <div style={{ padding: '28px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px' }}>
                      <div style={{ 
                        padding: '12px', 
                        background: '#FFF9E6', 
                        borderRadius: '16px', 
                        color: '#FFD700',
                        display: 'inline-flex'
                      }}>
                        {resource.icon}
                      </div>
                      {resource.locked && !user && (
                        <div style={{ 
                          background: '#f5f5f5', 
                          padding: '6px 10px', 
                          borderRadius: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          <Lock size={14} style={{ color: '#999999' }} />
                          <span style={{ fontSize: '0.7rem', color: '#999999', fontWeight: '500' }}>Locked</span>
                        </div>
                      )}
                    </div>
                    
                    <h3 style={{ 
                      fontSize: '1.3rem', 
                      marginBottom: '10px', 
                      color: '#1a1a1a',
                      fontWeight: '700'
                    }}>
                      {resource.title}
                    </h3>
                    
                    <p style={{ 
                      color: '#666666', 
                      marginBottom: '20px', 
                      lineHeight: '1.5', 
                      fontSize: '0.9rem' 
                    }}>
                      {resource.description}
                    </p>
                    
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginTop: 'auto',
                      paddingTop: '16px',
                      borderTop: '1px solid #f0f0f0'
                    }}>
                      <span style={{ 
                        fontSize: '0.75rem', 
                        color: '#FFD700', 
                        fontWeight: '600',
                        background: '#FFF9E6',
                        padding: '5px 12px',
                        borderRadius: '20px'
                      }}>
                        {resource.type}
                      </span>
                      
                      {(resource.locked && !user) ? (
                        <span style={{ 
                          fontSize: '0.8rem', 
                          color: '#999999', 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '6px'
                        }}>
                          <Lock size={12} /> Requires Purchase
                        </span>
                      ) : (
                        <span style={{ 
                          color: '#FFD700', 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '8px',
                          fontWeight: '600',
                          fontSize: '0.85rem'
                        }}>
                          <Eye size={14} /> Preview
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Info Section */}
            <div 
              ref={addToRefs}
              style={{ 
                background: 'linear-gradient(135deg, #F8F9FA 0%, #FFFFFF 100%)',
                borderRadius: '24px',
                padding: '40px',
                marginTop: '20px',
                border: '1px solid rgba(255, 215, 0, 0.2)',
                textAlign: 'center'
              }}
            >
              <BookOpen size={48} style={{ color: '#FFD700', marginBottom: '20px' }} />
              <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', color: '#1a1a1a' }}>
                Complete Study Package
              </h3>
              <p style={{ color: '#666666', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
                All materials are regularly updated to match the latest syllabus and examination patterns. 
                Get access to comprehensive notes, solved past papers, and practice exercises when you enroll.
              </p>
            </div>
          </div>
        )}

        {/* ONLINE CLASSES TAB */}
        {activeTab === 'classes' && (
          <div key="classes-tab" style={{ width: '100%', display: 'block' }}>
            {/* Hero Section */}
            <div style={{ 
              background: '#FFF9E6',
              borderRadius: '32px',
              padding: '60px 32px',
              marginBottom: '48px',
              textAlign: 'center',
              border: '3px solid #FFD700',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}>
              <Video size={70} style={{ color: '#FFD700', marginBottom: '20px' }} />
              <h2 style={{ 
                fontSize: '2.5rem', 
                marginBottom: '20px', 
                color: '#1a1a1a'
              }}>
                Live Online Classes
              </h2>
              <p style={{ 
                fontSize: '1.2rem', 
                color: '#666', 
                maxWidth: '600px', 
                margin: '0 auto'
              }}>
                Join interactive live sessions from anywhere. Get real-time feedback and personalized attention.
              </p>
            </div>

            {/* Two Column Layout */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '40px',
              marginBottom: '48px'
            }}>
              {/* Left Column - Benefits */}
              <div style={{ 
                background: 'white',
                borderRadius: '28px',
                padding: '32px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                border: '1px solid #FFD700'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <Star size={32} style={{ color: '#FFD700' }} />
                  <h3 style={{ fontSize: '1.5rem', margin: 0 }}>Why Choose Us?</h3>
                </div>
                {benefits.map((benefit, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <CheckCircle size={20} style={{ color: '#FFD700' }} />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Right Column - Requirements */}
              <div style={{ 
                background: '#FFF9E6',
                borderRadius: '28px',
                padding: '32px',
                border: '2px solid #FFD700'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <Monitor size={32} style={{ color: '#FFD700' }} />
                  <h3 style={{ fontSize: '1.5rem', margin: 0 }}>What You'll Need</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Monitor size={20} style={{ color: '#FFD700' }} /> Laptop/Desktop or Tablet
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Headphones size={20} style={{ color: '#FFD700' }} /> Headset with microphone
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Video size={20} style={{ color: '#FFD700' }} /> Zoom/Google Meet app
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <BookOpen size={20} style={{ color: '#FFD700' }} /> Notebook and pen
                  </div>
                </div>
              </div>
            </div>

            {/* Schedule Section */}
            <div style={{ 
              background: 'white',
              borderRadius: '28px',
              overflow: 'hidden',
              border: '2px solid #FFD700',
              marginBottom: '48px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}>
              <div style={{ 
                background: '#FFD700', 
                padding: '28px',
                textAlign: 'center'
              }}>
                <h3 style={{ fontSize: '1.8rem', margin: 0, color: '#000' }}>📅 Weekly Class Schedule</h3>
                <p style={{ marginTop: '8px', color: '#000' }}>All times in Pakistan Standard Time (PST)</p>
              </div>
              
              {schedule.map((item, idx) => (
                <div key={idx} style={{ 
                  padding: '24px 32px', 
                  borderBottom: idx < schedule.length - 1 ? '1px solid #eee' : 'none',
                  background: idx % 2 === 0 ? 'white' : '#FFFDF5'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '16px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <Calendar size={28} style={{ color: '#FFD700' }} />
                      <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{item.day}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Clock size={20} style={{ color: '#FFD700' }} />
                      <span style={{ 
                        background: '#FFF9E6', 
                        padding: '6px 14px', 
                        borderRadius: '30px',
                        fontWeight: '600',
                        color: '#FFD700'
                      }}>{item.time}</span>
                    </div>
                  </div>
                  <div style={{ marginLeft: '44px', marginTop: '12px' }}>
                    <span style={{ fontWeight: '500' }}>📖 {item.topic}</span>
                  </div>
                </div>
              ))}
              
              <div style={{ 
                padding: '32px', 
                background: '#FFF9E6', 
                textAlign: 'center',
                borderTop: '1px solid #FFD700'
              }}>
                <button 
                  onClick={handleDemoRequest}
                  style={{ 
                    background: '#FFD700', 
                    color: '#000',
                    border: 'none',
                    padding: '16px 48px',
                    borderRadius: '50px',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                  <Video size={22} />
                  Book Free Demo Class
                </button>
                <p style={{ marginTop: '20px', fontSize: '0.85rem', color: '#666' }}>
                  Schedule subject to change. Recordings available for all sessions.
                </p>
              </div>
            </div>

            {/* Features Bar */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center',
              gap: '40px', 
              padding: '20px 40px',
              background: '#f8f9fa',
              borderRadius: '60px',
              flexWrap: 'wrap',
              marginBottom: '48px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Video size={20} style={{ color: '#FFD700' }} /> Zoom Meetings
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={20} style={{ color: '#FFD700' }} /> Max 15 Students
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={20} style={{ color: '#FFD700' }} /> Recorded Sessions
              </div>
            </div>

            {/* FAQ */}
            <div style={{ 
              background: 'white',
              borderRadius: '28px',
              padding: '40px',
              border: '1px solid #FFD700'
            }}>
              <h3 style={{ fontSize: '1.8rem', textAlign: 'center', marginBottom: '32px' }}>❓ FAQ</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                <div>
                  <h4 style={{ color: '#FFD700', marginBottom: '8px' }}>What platform do you use?</h4>
                  <p style={{ color: '#666' }}>Zoom for live classes, Google Classroom for resources.</p>
                </div>
                <div>
                  <h4 style={{ color: '#FFD700', marginBottom: '8px' }}>Can I access recordings?</h4>
                  <p style={{ color: '#666' }}>Yes, all sessions are recorded and available.</p>
                </div>
                <div>
                  <h4 style={{ color: '#FFD700', marginBottom: '8px' }}>How do I join?</h4>
                  <p style={{ color: '#666' }}>After enrollment, you'll receive a Zoom link.</p>
                </div>
                <div>
                  <h4 style={{ color: '#FFD700', marginBottom: '8px' }}>What if I miss a class?</h4>
                  <p style={{ color: '#666' }}>Recordings available, support via WhatsApp.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Resource Preview Modal */}
        {selectedResource && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }} onClick={() => setSelectedResource(null)}>
            <div style={{
              background: '#FFFFFF',
              borderRadius: '28px',
              maxWidth: '500px',
              width: '100%',
              maxHeight: '85vh',
              overflowY: 'auto',
              border: '2px solid #FFD700'
            }} onClick={(e) => e.stopPropagation()}>
              <div style={{
                background: '#FFF9E6',
                padding: '24px',
                borderBottom: '1px solid rgba(255, 215, 0, 0.125)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <h3 style={{ fontSize: '1.4rem', color: '#1a1a1a', margin: 0 }}>{selectedResource.title}</h3>
                <button onClick={() => setSelectedResource(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  <X size={24} style={{ color: '#666' }} />
                </button>
              </div>
              <div style={{ padding: '28px' }}>
                <h4 style={{ marginBottom: '16px', color: '#FFD700', fontSize: '1rem' }}>Resource Preview</h4>
                <div style={{ color: '#666666', marginBottom: '20px', lineHeight: '1.6', whiteSpace: 'pre-line' }}>
                  {selectedResource.content || `This is a preview of the ${selectedResource.type?.toLowerCase()}. Purchase the course to access the complete resource.`}
                </div>
                <button onClick={() => setSelectedResource(null)} style={{ 
                  width: '100%', 
                  marginTop: '24px', 
                  background: '#FFD700', 
                  color: '#000000',
                  border: 'none',
                  padding: '14px',
                  borderRadius: '40px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}>
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resources;
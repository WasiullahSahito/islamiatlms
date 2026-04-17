import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ChevronRight, CreditCard, Video, CheckCircle, Star } from 'lucide-react';

const Courses = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
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

  const courses = [
    {
      id: 'igcse',
      title: 'IGCSE Islamiat',
      level: 'IGCSE',
      duration: '6 Months',
      price: 299,
      features: [
        'Complete syllabus coverage',
        'Comprehensive notes and rubrics',
        'Weekly tests and assignments',
        'Past papers with solutions',
        'Personalized feedback',
        'Exam techniques and strategies'
      ],
      syllabus: [
        'Major Themes of the Qur\'an',
        'The Life and Significance of Prophet Muhammad (PBUH)',
        'The History and Importance of the Qur\'an',
        'The History and Importance of Hadith',
        'The Rightly Guided Caliphs',
        'Articles of Faith and Pillars of Islam'
      ]
    },
    {
      id: 'olevel',
      title: 'O Level Islamiat',
      level: 'O Level',
      duration: '6 Months',
      price: 299,
      features: [
        'Comprehensive syllabus coverage',
        'Detailed notes and rubrics',
        'Weekly tests with marking',
        'Solved past papers',
        'Evaluation techniques',
        'Examiner insight sessions'
      ],
      syllabus: [
        'Qur\'anic Passages and Themes',
        'History and Importance of the Qur\'an',
        'The Life of Prophet Muhammad (PBUH)',
        'The History of Hadith',
        'The Caliphate Period',
        'Islamic Beliefs and Practices'
      ]
    }
  ];

  const handleDemoRequest = (courseTitle) => {
    alert(`Demo class requested for ${courseTitle}. We'll contact you shortly!`);
  };

  const clamp = (min, value, max) => Math.min(max, Math.max(min, value));

  return (
    <div style={{ padding: 'clamp(40px, 8vw, 64px) 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 'clamp(32px, 6vw, 48px)' }}>
          <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)' }}>
            Our <span style={{ color: '#FFD700' }}>Courses</span>
          </h1>
          <p style={{ fontSize: 'clamp(0.85rem, 2vw, 1rem)', color: '#666666', maxWidth: '600px', margin: '16px auto 0', padding: '0 16px' }}>
            Choose the right course for your academic success
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(24px, 5vw, 32px)' }}>
          {courses.map((course, idx) => (
            <div key={course.id} className="card scroll-reveal" ref={addToRefs} style={{ animationDelay: `${idx * 0.1}s` }}>
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: 'clamp(1.3rem, 3vw, 1.6rem)', marginBottom: '8px' }}>{course.title}</h2>
                <p style={{ color: '#666666', fontSize: 'clamp(0.8rem, 2vw, 0.9rem)' }}>{course.duration}</p>
              </div>

              <div>
                <div style={{ fontSize: 'clamp(1.8rem, 4vw, 2.2rem)', fontWeight: 'bold', color: '#FFD700', textAlign: 'center', marginBottom: '24px' }}>
                  ${course.price}
                </div>

                <h3 style={{ fontWeight: '600', marginBottom: '16px', fontSize: 'clamp(0.9rem, 2.5vw, 1rem)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Star size={16} style={{ color: '#FFD700' }} />
                  Course Features:
                </h3>
                <ul style={{ listStyle: 'none', margin: '0 0 20px 0' }}>
                  {course.features.slice(0, 4).map((feature, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', color: '#666666', fontSize: 'clamp(0.8rem, 2vw, 0.9rem)' }}>
                      <CheckCircle size={16} style={{ color: '#FFD700', flexShrink: 0 }} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div style={{ margin: '20px 0' }}>
                  <h3 style={{ fontWeight: '600', marginBottom: '12px', fontSize: 'clamp(0.9rem, 2.5vw, 1rem)' }}>Syllabus Highlights:</h3>
                  <ul style={{ listStyle: 'none' }}>
                    {course.syllabus.slice(0, 3).map((item, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', color: '#666666', fontSize: 'clamp(0.8rem, 2vw, 0.9rem)' }}>
                        <ChevronRight size={14} style={{ color: '#FFD700', flexShrink: 0 }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setSelectedCourse(course)}
                    style={{ color: '#FFD700', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'clamp(0.8rem, 2vw, 0.9rem)' }}
                  >
                    View Full Syllabus <ChevronRight size={14} />
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <Link to={`/courses/${course.id}`} className="btn-primary" style={{ textAlign: 'center', background: '#FFD700', color: '#000000', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)', padding: 'clamp(10px, 2vw, 14px) clamp(20px, 4vw, 36px)' }}>
                    <CreditCard size={16} style={{ display: 'inline', marginRight: '8px' }} />
                    Purchase Course - ${course.price}
                  </Link>
                  <button
                    onClick={() => handleDemoRequest(course.title)}
                    className="btn-secondary"
                    style={{ textAlign: 'center', border: '2px solid #FFD700', background: 'transparent', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)', padding: 'clamp(8px, 1.5vw, 12px) clamp(20px, 4vw, 32px)' }}
                  >
                    <Video size={16} style={{ display: 'inline', marginRight: '8px' }} />
                    Request Free Demo Class
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedCourse && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }} onClick={() => setSelectedCourse(null)}>
            <div style={{
              background: '#FFFFFF',
              borderRadius: '28px',
              maxWidth: '500px',
              width: '90%',
              maxHeight: '85vh',
              overflowY: 'auto',
              border: '2px solid #FFD700'
            }} onClick={(e) => e.stopPropagation()}>
              <div style={{
                background: '#FFF9E6',
                padding: 'clamp(20px, 5vw, 24px)',
                borderBottom: '1px solid #FFD70020',
                borderRadius: '28px 28px 0 0'
              }}>
                <h2 style={{ fontSize: 'clamp(1.3rem, 4vw, 1.6rem)' }}>{selectedCourse.title} - Syllabus</h2>
              </div>
              <div style={{ padding: 'clamp(20px, 5vw, 28px)' }}>
                <ul style={{ listStyle: 'none' }}>
                  {selectedCourse.syllabus.map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', padding: '6px 0' }}>
                      <div style={{ background: '#FFF9E6', padding: '6px', borderRadius: '8px', flexShrink: 0 }}>
                        <BookOpen size={16} style={{ color: '#FFD700' }} />
                      </div>
                      <span style={{ fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
                <button onClick={() => setSelectedCourse(null)} className="btn-primary" style={{ width: '100%', marginTop: '20px', background: '#FFD700', color: '#000000', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)', padding: 'clamp(10px, 2vw, 12px)' }}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;

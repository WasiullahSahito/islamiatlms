import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, CreditCard, ArrowLeft, Star, Smartphone, Wallet, Building, BookOpen, ChevronRight, X } from 'lucide-react';

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, purchaseCourse } = useAuth();
  const [showPayment, setShowPayment] = useState(false);
  const [showSyllabus, setShowSyllabus] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('easypaisa');
  const [processing, setProcessing] = useState(false);
  const revealRef = useRef(null);

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

    if (revealRef.current) {
      observer.observe(revealRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const courses = {
    igcse: {
      name: 'IGCSE Islamiat',
      price: 299,
      description: 'Complete course with comprehensive notes, weekly tests, and exam-focused preparation for IGCSE Islamiat students.',
      fullSyllabus: [
        { topic: 'Major Themes of the Qur\'an', subtopics: ['Allah in Himself', 'Allah\'s Relationship with the Created World', 'Prophethood and Messengers', 'Articles of Faith'] },
        { topic: 'The History and Importance of the Qur\'an', subtopics: ['Revelation and Compilation', 'Preservation of the Qur\'an', 'Major Themes and Teachings'] },
        { topic: 'The Life and Significance of Prophet Muhammad (PBUH)', subtopics: ['Early Life', 'Revelation and Prophethood', 'Migration to Madinah', 'Later Years'] },
        { topic: 'The History and Importance of Hadith', subtopics: ['Compilation of Hadith', 'Classification of Hadith', 'Major Hadith Collections'] },
        { topic: 'The Rightly Guided Caliphs', subtopics: ['Abu Bakr (RA)', 'Umar (RA)', 'Uthman (RA)', 'Ali (RA)'] },
        { topic: 'Articles of Faith and Pillars of Islam', subtopics: ['Five Pillars of Islam', 'Six Articles of Faith', 'Application in Daily Life'] }
      ],
      features: [
        'Complete syllabus coverage',
        'Detailed notes for each topic',
        'Weekly assessment tests',
        'Past papers with marking schemes',
        'Rubric-based exercises',
        'Personalized feedback',
        'Recorded sessions access',
        'WhatsApp support group',
        'Monthly progress reports',
        'Exam tips and techniques'
      ]
    },
    olevel: {
      name: 'O Level Islamiat',
      price: 299,
      description: 'Complete course with comprehensive notes, weekly tests, and exam-focused preparation for O Level Islamiat students.',
      fullSyllabus: [
        { topic: 'Qur\'anic Passages and Themes', subtopics: ['Selected Passages from the Qur\'an', 'Major Themes and Teachings', 'Application in Modern Context'] },
        { topic: 'History and Importance of the Qur\'an', subtopics: ['Revelation Process', 'Compilation and Preservation', 'Key Concepts and Terms'] },
        { topic: 'The Life of Prophet Muhammad (PBUH)', subtopics: ['Early Life in Makkah', 'Prophethood and Opposition', 'Migration to Madinah', 'Establishment of Islamic State'] },
        { topic: 'The History of Hadith', subtopics: ['Definition and Significance', 'Major Collections', 'Classification System'] },
        { topic: 'The Caliphate Period', subtopics: ['The Four Caliphs', 'Major Achievements', 'Expansion of Islam'] },
        { topic: 'Islamic Beliefs and Practices', subtopics: ['Core Beliefs', 'Worship and Rituals', 'Ethical Teachings'] }
      ],
      features: [
        'Complete syllabus coverage',
        'Detailed notes for each topic',
        'Weekly assessment tests',
        'Past papers with marking schemes',
        'Rubric-based exercises',
        'Personalized feedback',
        'Recorded sessions access',
        'WhatsApp support group',
        'Monthly progress reports',
        'Exam tips and techniques'
      ]
    }
  };

  const course = courses[id];

  const handlePurchase = async () => {
    if (!user) {
      // Store the intended course in session storage
      sessionStorage.setItem('intendedCourse', JSON.stringify({ id, course }));
      navigate('/register', { state: { from: `/course/${id}`, courseId: id, courseData: course } });
      return;
    }

    setProcessing(true);
    setTimeout(() => {
      purchaseCourse(id, course);
      setProcessing(false);
      navigate('/dashboard');
    }, 2000);
  };

  if (!course) {
    return (
      <div style={{ textAlign: 'center', padding: 'clamp(60px, 15vw, 100px) 24px' }}>
        <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>Course not found</h2>
        <button onClick={() => navigate('/courses')} className="btn-primary" style={{ marginTop: '24px', background: '#FFD700', color: '#000000' }}>
          <ArrowLeft size={18} style={{ marginRight: '8px' }} />
          Back to Courses
        </button>
      </div>
    );
  }

  const paymentMethods = [
    {
      id: 'creditcard',
      name: 'Credit/Debit Card',
      icon: <CreditCard size={24} />,
      details: {
        instructions: 'Enter your card details to complete payment'
      }
    },
    {
      id: 'easypaisa',
      name: 'EasyPaisa',
      icon: <Smartphone size={24} />,
      details: {
        account: '03XX XXXXXXX',
        name: 'Arsslan Turabi',
        instructions: 'Send payment to EasyPaisa account and share screenshot'
      }
    },
    {
      id: 'jazzcash',
      name: 'JazzCash',
      icon: <Wallet size={24} />,
      details: {
        account: '03XX XXXXXXX',
        name: 'Arsslan Turabi',
        instructions: 'Send payment to JazzCash account and share screenshot'
      }
    },
    {
      id: 'mezan',
      name: 'Mezan Bank',
      icon: <Building size={24} />,
      details: {
        account: '1234-567890-01',
        name: 'Arsslan Turabi',
        iban: 'PK12MEZN0012345678901',
        instructions: 'Bank transfer to Mezan Bank account'
      }
    }
  ];

  const currentPayment = paymentMethods.find(p => p.id === paymentMethod);

  return (
    <div className="container" style={{ padding: 'clamp(40px, 8vw, 64px) 0' }}>
      <button
        onClick={() => navigate('/courses')}
        style={{
          background: 'none',
          border: 'none',
          color: '#FFD700',
          cursor: 'pointer',
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontWeight: '500',
          fontSize: 'clamp(0.85rem, 2vw, 0.95rem)'
        }}
      >
        <ArrowLeft size={18} /> Back to Courses
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'clamp(32px, 6vw, 48px)' }}>
        <div className="scroll-reveal" ref={revealRef}>
          <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', marginBottom: '20px' }}>{course.name}</h1>
          <p style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.125rem)', color: '#666666', marginBottom: '28px', lineHeight: '1.7' }}>
            {course.description}
          </p>

          <div style={{
            background: '#FFF9E6',
            borderLeft: `4px solid #FFD700`,
            padding: '20px',
            marginBottom: '36px',
            borderRadius: '16px'
          }}>
            <p style={{ color: '#000000', fontWeight: '500', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}>
              ✨ Based on examiner marking criteria: Depth, Detail, Evaluation, and Elucidation
            </p>
          </div>

          <h2 style={{ fontSize: 'clamp(1.3rem, 4vw, 1.8rem)', marginBottom: '24px' }}>What You'll Get:</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginBottom: '36px' }}>
            {course.features.map((feature, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 0' }}>
                <CheckCircle size={18} style={{ color: '#FFD700', flexShrink: 0 }} />
                <span style={{ color: '#666666', fontSize: 'clamp(0.8rem, 2vw, 0.9rem)' }}>{feature}</span>
              </div>
            ))}
          </div>

          {/* View Syllabus Button */}
          <button
            onClick={() => setShowSyllabus(true)}
            style={{
              width: '100%',
              padding: '14px',
              background: '#FFF9E6',
              border: '2px solid #FFD700',
              borderRadius: '12px',
              fontSize: 'clamp(0.9rem, 2vw, 1rem)',
              fontWeight: '600',
              color: '#FFD700',
              cursor: 'pointer',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#FFD700';
              e.currentTarget.style.color = '#000000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#FFF9E6';
              e.currentTarget.style.color = '#FFD700';
            }}
          >
            <BookOpen size={20} />
            View Full Syllabus
            <ChevronRight size={16} />
          </button>

          <div style={{
            background: '#FFF9E6',
            borderRadius: '24px',
            padding: 'clamp(20px, 5vw, 28px)',
            border: '1px solid #FFD700'
          }}>
            <h3 style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', fontWeight: '700', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <Star size={20} style={{ color: '#FFD700' }} />
              Free Demo Class Available!
            </h3>
            <p style={{ color: '#666666', marginBottom: '20px', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}>
              Not sure? Book a free demo class to experience my teaching methodology before enrolling.
            </p>
            <button
              onClick={() => navigate('/contact')}
              className="btn-primary"
              style={{ background: '#FFD700', color: '#000000', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)', padding: 'clamp(10px, 2vw, 12px) clamp(20px, 4vw, 28px)' }}
            >
              Book Free Demo
            </button>
          </div>
        </div>

        <div className="scroll-reveal" style={{ animationDelay: '0.2s' }}>
          <div style={{
            background: '#fff',
            borderRadius: '32px',
            boxShadow: '0 12px 32px rgba(255, 215, 0, 0.15)',
            padding: 'clamp(24px, 5vw, 40px)',
            position: 'sticky',
            top: '100px',
            border: '1px solid #FFD700'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{
                fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
                fontWeight: 'bold',
                color: '#FFD700',
                marginBottom: '12px'
              }}>
                ${course.price}
              </div>
              <p style={{ color: '#666666', fontSize: 'clamp(0.8rem, 2vw, 0.9rem)' }}>Lifetime access - One-time payment</p>
            </div>

            {!showPayment ? (
              <button
                onClick={() => setShowPayment(true)}
                className="btn-primary"
                style={{ width: '100%', marginBottom: '20px', background: '#FFD700', color: '#000000', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)', padding: 'clamp(12px, 2.5vw, 14px)' }}
              >
                Purchase Course
              </button>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ fontWeight: '700', fontSize: 'clamp(1rem, 2.5vw, 1.1rem)' }}>Select Payment Method</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: 'clamp(12px, 3vw, 16px)',
                        border: `2px solid ${paymentMethod === method.id ? '#FFD700' : '#FFE8A3'}`,
                        borderRadius: '16px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        background: paymentMethod === method.id ? '#FFF9E6' : '#fff'
                      }}
                    >
                      <div style={{ color: '#FFD700' }}>{method.icon}</div>
                      <div>
                        <div style={{ fontWeight: '600', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}>{method.name}</div>
                        <div style={{ fontSize: 'clamp(0.7rem, 1.8vw, 0.85rem)', color: '#666666' }}>
                          {method.id === 'creditcard' ? 'Visa, Mastercard, etc.' : method.id === 'mezan' ? 'Bank Transfer' : 'Mobile Wallet'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {currentPayment && (
                  <div style={{
                    marginTop: '16px',
                    padding: 'clamp(16px, 4vw, 20px)',
                    background: '#FFF9E6',
                    borderRadius: '16px',
                    borderLeft: '4px solid #FFD700'
                  }}>
                    <h4 style={{ marginBottom: '12px', fontSize: 'clamp(0.9rem, 2.5vw, 1rem)' }}>Payment Details:</h4>
                    {paymentMethod === 'creditcard' && (
                      <>
                        <div style={{ marginBottom: '12px' }}>
                          <input
                            type="text"
                            placeholder="Card Number"
                            style={{
                              width: '100%',
                              padding: '12px',
                              border: '1px solid #FFD700',
                              borderRadius: '8px',
                              marginBottom: '8px',
                              fontSize: '0.9rem'
                            }}
                          />
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                            <input
                              type="text"
                              placeholder="MM/YY"
                              style={{
                                padding: '12px',
                                border: '1px solid #FFD700',
                                borderRadius: '8px',
                                fontSize: '0.9rem'
                              }}
                            />
                            <input
                              type="text"
                              placeholder="CVC"
                              style={{
                                padding: '12px',
                                border: '1px solid #FFD700',
                                borderRadius: '8px',
                                fontSize: '0.9rem'
                              }}
                            />
                          </div>
                        </div>
                        <p style={{ fontSize: 'clamp(0.7rem, 1.8vw, 0.85rem)', color: '#FFD700' }}>
                          🔒 Secure payment processing
                        </p>
                      </>
                    )}
                    {paymentMethod === 'easypaisa' && (
                      <>
                        <p style={{ fontSize: 'clamp(0.8rem, 2vw, 0.85rem)' }}><strong>EasyPaisa Account:</strong> 03XX XXXXXXX</p>
                        <p style={{ fontSize: 'clamp(0.8rem, 2vw, 0.85rem)' }}><strong>Account Holder:</strong> Arsslan Turabi</p>
                        <p style={{ fontSize: 'clamp(0.8rem, 2vw, 0.85rem)' }}><strong>Instructions:</strong> Send payment and share screenshot on WhatsApp</p>
                      </>
                    )}
                    {paymentMethod === 'jazzcash' && (
                      <>
                        <p style={{ fontSize: 'clamp(0.8rem, 2vw, 0.85rem)' }}><strong>JazzCash Account:</strong> 03XX XXXXXXX</p>
                        <p style={{ fontSize: 'clamp(0.8rem, 2vw, 0.85rem)' }}><strong>Account Holder:</strong> Arsslan Turabi</p>
                        <p style={{ fontSize: 'clamp(0.8rem, 2vw, 0.85rem)' }}><strong>Instructions:</strong> Send payment and share screenshot on WhatsApp</p>
                      </>
                    )}
                    {paymentMethod === 'mezan' && (
                      <>
                        <p style={{ fontSize: 'clamp(0.8rem, 2vw, 0.85rem)' }}><strong>Bank:</strong> Mezan Bank</p>
                        <p style={{ fontSize: 'clamp(0.8rem, 2vw, 0.85rem)' }}><strong>Account Title:</strong> Arsslan Turabi</p>
                        <p style={{ fontSize: 'clamp(0.8rem, 2vw, 0.85rem)' }}><strong>Account Number:</strong> 1234-567890-01</p>
                        <p style={{ fontSize: 'clamp(0.8rem, 2vw, 0.85rem)' }}><strong>IBAN:</strong> PK12MEZN0012345678901</p>
                        <p style={{ fontSize: 'clamp(0.8rem, 2vw, 0.85rem)' }}><strong>Instructions:</strong> Use your email as reference</p>
                      </>
                    )}
                    <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #FFE8A3' }}>
                      <p style={{ fontSize: 'clamp(0.7rem, 1.8vw, 0.85rem)', color: '#FFD700' }}>
                        📱 After payment, send screenshot to: +92 XXX XXXXXXX
                      </p>
                    </div>
                  </div>
                )}

                <button
                  onClick={handlePurchase}
                  disabled={processing}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    background: processing ? '#ccc' : '#FFD700',
                    color: '#000000',
                    opacity: processing ? 0.7 : 1,
                    marginTop: '8px',
                    fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                    padding: 'clamp(12px, 2.5vw, 14px)'
                  }}
                >
                  {processing ? 'Processing...' : `Confirm Purchase - $${course.price}`}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Syllabus Modal */}
      {showSyllabus && (
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
        }} onClick={() => setShowSyllabus(false)}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '28px',
            maxWidth: '700px',
            width: '100%',
            maxHeight: '85vh',
            overflowY: 'auto',
            border: '2px solid #FFD700'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{
              background: '#FFF9E6',
              padding: 'clamp(20px, 5vw, 28px)',
              borderBottom: '1px solid #FFD70020',
              borderRadius: '28px 28px 0 0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h2 style={{ fontSize: 'clamp(1.3rem, 4vw, 1.8rem)' }}>{course.name} - Complete Syllabus</h2>
              <button onClick={() => setShowSyllabus(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={24} style={{ color: '#666' }} />
              </button>
            </div>
            <div style={{ padding: 'clamp(20px, 5vw, 32px)' }}>
              {course.fullSyllabus.map((section, idx) => (
                <div key={idx} style={{ marginBottom: '28px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '12px',
                    background: '#FFF9E6',
                    padding: '12px 16px',
                    borderRadius: '12px'
                  }}>
                    <BookOpen size={20} style={{ color: '#FFD700' }} />
                    <h3 style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', margin: 0 }}>{section.topic}</h3>
                  </div>
                  <ul style={{ marginLeft: '20px', listStyle: 'none' }}>
                    {section.subtopics.map((subtopic, subIdx) => (
                      <li key={subIdx} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        marginBottom: '8px',
                        padding: '6px 0 6px 24px'
                      }}>
                        <ChevronRight size={14} style={{ color: '#FFD700' }} />
                        <span style={{ fontSize: 'clamp(0.85rem, 2vw, 0.95rem)', color: '#666' }}>{subtopic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <button
                onClick={() => setShowSyllabus(false)}
                className="btn-primary"
                style={{
                  width: '100%',
                  marginTop: '20px',
                  background: '#FFD700',
                  color: '#000000',
                  padding: 'clamp(10px, 2vw, 12px)'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;

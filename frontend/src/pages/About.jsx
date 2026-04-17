import React, { useEffect, useRef } from 'react';
import { Award, Users, BookOpen, Target, Star, TrendingUp, Quote } from 'lucide-react';

const About = () => {
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

  const achievements = [
    { number: '8+', label: 'Years Experience', icon: <TrendingUp size={28} /> },
    { number: '3', label: 'World Distinctions', icon: <Award size={28} /> },
    { number: '500+', label: 'Students Trained', icon: <Users size={28} /> },
    { number: '100%', label: 'Pass Rate', icon: <Target size={28} /> }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <div className="about-hero">
        <div className="container">
          <h1 className="about-hero-title">
            About{' '}
            <span className="about-hero-highlight">
              Your Instructor
            </span>
          </h1>
          <p className="about-hero-subtitle">
            Dedicated to excellence in Islamiat education with proven results
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container about-main">
        {/* Intro Section */}
        <div className="about-intro-grid">
          <div className="scroll-reveal about-intro-content" ref={addToRefs}>
            <h2 className="about-section-title">Transforming Islamiat Education</h2>
            <p className="about-text">
              With over 8 years of dedicated experience in teaching Islamiat for IGCSE and O Level, 
              I have developed a unique teaching methodology that focuses on depth, detail, evaluation, 
              and elucidation - exactly what examiners look for.
            </p>
            <p className="about-text">
              My approach has helped numerous students achieve outstanding results, including 3 world 
              distinctions. I believe in making Islamiat not just an academic subject, but a meaningful 
              learning experience that develops understanding and appreciation.
            </p>
          </div>

          <div className="card scroll-reveal about-philosophy-card" ref={addToRefs}>
            <div className="about-quote-icon">
              <Quote size={40} />
            </div>
            <h3 className="about-philosophy-title">Teaching Philosophy</h3>
            <div className="about-philosophy-list">
              <div className="about-philosophy-item">
                <h4 className="about-philosophy-item-title">Depth & Detail</h4>
                <p className="about-philosophy-item-text">Comprehensive coverage of all syllabus topics</p>
              </div>
              <div className="about-philosophy-item">
                <h4 className="about-philosophy-item-title">Evaluation Techniques</h4>
                <p className="about-philosophy-item-text">Mastering the art of critical analysis</p>
              </div>
              <div className="about-philosophy-item">
                <h4 className="about-philosophy-item-title">Elucidation Skills</h4>
                <p className="about-philosophy-item-text">Clear and precise expression of ideas</p>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="about-achievements-grid">
          {achievements.map((stat, index) => (
            <div key={index} className="card scroll-reveal about-achievement-card" ref={addToRefs}>
              <div className="about-achievement-icon">
                {stat.icon}
              </div>
              <div className="about-achievement-number">
                {stat.number}
              </div>
              <div className="about-achievement-label">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Methodology Section */}
        <div className="card scroll-reveal about-methodology-card" ref={addToRefs}>
          <h2 className="about-methodology-title">
            Our Teaching Methodology
          </h2>
          <div className="about-methodology-grid">
            <div className="about-methodology-item">
              <div className="about-methodology-icon-wrapper">
                <BookOpen size={32} />
              </div>
              <h3 className="about-methodology-item-title">Custom Notes</h3>
              <p className="about-methodology-item-text">
                Exclusive notes designed based on examiner marking criteria
              </p>
            </div>
            <div className="about-methodology-item">
              <div className="about-methodology-icon-wrapper">
                <Star size={32} />
              </div>
              <h3 className="about-methodology-item-title">Weekly Tests</h3>
              <p className="about-methodology-item-text">
                Regular assessments with detailed feedback
              </p>
            </div>
            <div className="about-methodology-item">
              <div className="about-methodology-icon-wrapper">
                <Target size={32} />
              </div>
              <h3 className="about-methodology-item-title">Exam Preparation</h3>
              <p className="about-methodology-item-text">
                Focused preparation on exam techniques and strategies
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        /* Reset and Base Styles */
        .about-page {
          width: 100%;
          overflow-x: hidden;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* Hero Section */
        .about-hero {
          background: #FFD700;
          padding: 60px 0;
        }

        .about-hero-title {
          color: #000000;
          margin-bottom: 16px;
          font-size: clamp(2rem, 5vw, 2.5rem);
          text-align: center;
        }

        .about-hero-highlight {
          color: #FFFFFF;
          -webkit-text-fill-color: #FFFFFF;
        }

        .about-hero-subtitle {
          font-size: clamp(1rem, 3vw, 1.1rem);
          color: #000000;
          max-width: 700px;
          margin: 0 auto;
          text-align: center;
          line-height: 1.5;
        }

        /* Main Content */
        .about-main {
          padding: 64px 0;
        }

        /* Intro Grid */
        .about-intro-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          margin-bottom: 64px;
        }

        .about-section-title {
          margin-bottom: 24px;
          font-size: clamp(1.5rem, 4vw, 2rem);
        }

        .about-text {
          color: #666666;
          margin-bottom: 16px;
          line-height: 1.8;
          font-size: clamp(0.95rem, 2.5vw, 1rem);
        }

        .about-philosophy-card {
          padding: 32px;
          text-align: center;
        }

        .about-quote-icon {
          display: flex;
          justify-content: center;
          margin-bottom: 24px;
          color: #FFD700;
        }

        .about-philosophy-title {
          font-size: clamp(1.2rem, 3vw, 1.4rem);
          margin-bottom: 24px;
          text-align: center;
        }

        .about-philosophy-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .about-philosophy-item-title {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 8px;
          color: #FFD700;
        }

        .about-philosophy-item-text {
          color: #666666;
          font-size: clamp(0.9rem, 2.5vw, 0.95rem);
        }

        /* Achievements Grid */
        .about-achievements-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-bottom: 64px;
        }

        .about-achievement-card {
          text-align: center;
          padding: 28px 16px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .about-achievement-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .about-achievement-icon {
          color: #FFD700;
          margin-bottom: 12px;
          display: flex;
          justify-content: center;
        }

        .about-achievement-number {
          font-size: clamp(1.5rem, 4vw, 2rem);
          font-weight: bold;
          color: #FFD700;
        }

        .about-achievement-label {
          color: #666666;
          font-size: clamp(0.85rem, 2.5vw, 0.95rem);
        }

        /* Methodology Section */
        .about-methodology-card {
          padding: 40px 24px;
        }

        .about-methodology-title {
          text-align: center;
          margin-bottom: 40px;
          font-size: clamp(1.5rem, 4vw, 2rem);
        }

        .about-methodology-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }

        .about-methodology-item {
          text-align: center;
        }

        .about-methodology-icon-wrapper {
          background: #FFF9E6;
          width: 70px;
          height: 70px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          transition: transform 0.3s ease;
        }

        .about-methodology-item:hover .about-methodology-icon-wrapper {
          transform: scale(1.05);
        }

        .about-methodology-icon-wrapper svg {
          color: #FFD700;
        }

        .about-methodology-item-title {
          font-size: clamp(1.1rem, 3vw, 1.2rem);
          margin-bottom: 12px;
        }

        .about-methodology-item-text {
          color: #666666;
          font-size: clamp(0.85rem, 2.5vw, 0.95rem);
          line-height: 1.5;
        }

        /* Card Styles */
        .card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
        }

        /* Scroll Reveal Animation */
        .scroll-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }

        .scroll-reveal.revealed {
          opacity: 1;
          transform: translateY(0);
        }

        /* Tablet Responsive (768px - 1024px) */
        @media (max-width: 1024px) {
          .container {
            padding: 0 20px;
          }

          .about-intro-grid {
            gap: 32px;
          }

          .about-achievements-grid {
            gap: 20px;
          }

          .about-methodology-grid {
            gap: 30px;
          }
        }

        /* Mobile Responsive (max-width: 768px) */
        @media (max-width: 768px) {
          .about-hero {
            padding: 48px 0;
          }

          .about-main {
            padding: 48px 0;
          }

          /* Intro becomes vertical */
          .about-intro-grid {
            grid-template-columns: 1fr;
            gap: 32px;
            margin-bottom: 48px;
          }

          .about-intro-content {
            text-align: center;
          }

          .about-section-title {
            text-align: center;
          }

          .about-text {
            text-align: center;
          }

          /* Achievements: 2x2 grid on mobile */
          .about-achievements-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
            margin-bottom: 48px;
          }

          .about-achievement-card {
            padding: 20px 12px;
          }

          /* Methodology: vertical on mobile */
          .about-methodology-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }

          .about-methodology-card {
            padding: 32px 20px;
          }

          .about-methodology-title {
            margin-bottom: 32px;
          }

          .about-philosophy-card {
            padding: 24px;
          }

          .about-philosophy-list {
            gap: 20px;
          }
        }

        /* Small Mobile (max-width: 480px) */
        @media (max-width: 480px) {
          .container {
            padding: 0 16px;
          }

          .about-hero {
            padding: 40px 0;
          }

          .about-main {
            padding: 32px 0;
          }

          .about-achievements-grid {
            gap: 12px;
          }

          .about-achievement-card {
            padding: 16px 8px;
          }

          .about-achievement-icon svg {
            width: 24px;
            height: 24px;
          }

          .about-achievement-number {
            font-size: 1.25rem;
          }

          .about-achievement-label {
            font-size: 0.75rem;
          }

          .about-methodology-icon-wrapper {
            width: 60px;
            height: 60px;
          }

          .about-methodology-icon-wrapper svg {
            width: 28px;
            height: 28px;
          }

          .about-quote-icon svg {
            width: 32px;
            height: 32px;
          }
        }

        /* Landscape orientation fix */
        @media (max-width: 768px) and (orientation: landscape) {
          .about-achievements-grid {
            grid-template-columns: repeat(4, 1fr);
          }

          .about-methodology-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </div>
  );
};

export default About;
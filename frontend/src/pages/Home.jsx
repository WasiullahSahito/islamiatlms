import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Award, Clock, ArrowRight, Star, TrendingUp } from 'lucide-react';

const Home = () => {
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

  const stats = [
    { icon: <Award size={40} />, number: '8+ Years', label: 'Teaching Experience' },
    { icon: <Star size={40} />, number: '3 World', label: 'Distinctions' },
    { icon: <Users size={40} />, number: '500+', label: 'Students Trained' },
    { icon: <TrendingUp size={40} />, number: '100%', label: 'Pass Rate' },
  ];

  const features = [
    { icon: <BookOpen size={32} />, title: 'Comprehensive Notes', desc: 'Detailed notes covering entire syllabus with examiner insights' },
    { icon: <Clock size={32} />, title: 'Weekly Tests', desc: 'Regular assessments to track progress and improve' },
    { icon: <Award size={32} />, title: 'Past Papers', desc: 'Solved papers with complete marking schemes' },
    { icon: <Star size={32} />, title: 'Rubric Exercises', desc: 'Practice based on examiner marking criteria' },
  ];

  return (
    <div>
      <section style={{
        background: "#FFD700",
        padding: "80px 0",
        position: "relative"
      }}>
        <div className="container" style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "40px"
        }}>
          <div style={{ maxWidth: "500px", flex: 1, minWidth: "280px" }}>
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: "20px", fontWeight: "bold", color: "#000000" }}>
              Master Islamiat with
              <br />
              <span style={{ 
                color: "#FFFFFF",
                WebkitTextFillColor: "#FFFFFF"
              }}>
                8+ Years of Excellence
              </span>
            </h1>

            <p style={{ marginBottom: "20px", color: "#000000", fontSize: "clamp(1rem, 2.5vw, 1.1rem)" }}>
              IGCSE & O Level Islamiat - 3 World Distinctions | Expert Notes | Exam-Focused Preparation
            </p>

            <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
              <Link to="/courses" className="btn-primary" style={{
                background: "#000000",
                color: "#FFD700"
              }}>
                Explore Courses <ArrowRight size={18} />
              </Link>

              <Link 
                to="/contact" 
                className="btn-secondary" 
                style={{
                  border: "2px solid #000000",
                  color: "#000000",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#FFFFFF";
                  e.currentTarget.style.color = "#000000";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#000000";
                }}
              >
                Book Demo Class
              </Link>
            </div>
          </div>

          <div style={{ flex: 1, textAlign: "center", minWidth: "250px" }}>
            <Link to="/about">
              <img 
                src="/fida.png" 
                alt="Logo"
                style={{
                  width: "100%",
                  maxWidth: "min(350px, 80vw)",
                  height: "auto",
                  aspectRatio: "1/1",
                  objectFit: "cover",
                  borderRadius: "20px",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 25px 50px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.1)";
                }}
              />
            </Link>
          </div>
        </div>
      </section>

      <section style={{ padding: "60px 0", background: "#FFFFFF" }}>
        <div className="container">
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
            gap: "32px",
            textAlign: "center"
          }}>
            {stats.map((stat, index) => (
              <div key={index} className="scroll-reveal card" ref={addToRefs} style={{ padding: "28px" }}>
                <div style={{ color: "#FFD700", marginBottom: "15px" }}>
                  {React.cloneElement(stat.icon, { size: "clamp(32px, 6vw, 40px)" })}
                </div>
                <h3 style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: "bold", marginBottom: "8px", color: "#FFD700" }}>{stat.number}</h3>
                <p style={{ color: "#666666", fontSize: "clamp(0.85rem, 2vw, 1rem)" }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0', background: "#FFFFFF" }}>
        <div className="container">
          <h2 className="text-center" style={{ marginBottom: '48px' }}>Why Choose My Course?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            {features.map((feature, idx) => (
              <div key={idx} className="card text-center scroll-reveal" ref={addToRefs} style={{ textAlign: "center" }}>
                <div style={{ color: '#FFD700', marginBottom: '20px' }}>
                  {React.cloneElement(feature.icon, { size: "clamp(28px, 5vw, 32px)" })}
                </div>
                <h3 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.3rem)', marginBottom: '12px' }}>{feature.title}</h3>
                <p style={{ color: '#666666', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#FFD700', padding: '60px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ color: '#000000', marginBottom: '16px', fontSize: 'clamp(1.8rem, 4vw, 2.2rem)' }}>Ready to Excel in Islamiat?</h2>
          <p style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', color: '#000000', marginBottom: '32px' }}>
            Join hundreds of successful students who achieved top grades
          </p>
          <Link to="/courses" className="btn-primary" style={{ 
            background: '#000000', 
            color: '#FFD700'
          }}>
            Start Your Journey Today <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
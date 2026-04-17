// src/pages/Dashboard.jsx
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import {
    BookOpen, Calendar, CheckCircle, Download, TrendingUp,
    Clock, Star, ClipboardList, ChevronRight, Lock
} from 'lucide-react';
import ProtectedRoute from '../components/ProtectedRoute';
import InstructorDashboard from './InstructorDashboard';

const Dashboard = () => {
    const { user } = useAuth();

    // Test Taking State
    const [activeTab, setActiveTab] = useState('overview');
    const [tests, setTests] = useState([]);
    const [studentScores, setStudentScores] = useState([]);
    const [takingTest, setTakingTest] = useState(null); // The test currently being taken
    const [studentAnswers, setStudentAnswers] = useState({}); // Stores selected options
    const revealRefs = useRef([]);

    // Load tests and scores on mount
    useEffect(() => {
        setTests(JSON.parse(localStorage.getItem('tests') || '[]'));
        setStudentScores(JSON.parse(localStorage.getItem('studentScores') || '[]'));
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add('revealed');
                });
            },
            { threshold: 0.1 }
        );
        revealRefs.current.forEach((ref) => { if (ref) observer.observe(ref); });
        return () => observer.disconnect();
    }, [activeTab, takingTest]);

    const addToRefs = (el) => {
        if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
    };

    // CALCULATE DYNAMIC PROGRESS
    const enrolledCourses = useMemo(() => {
        const calculateProgress = (courseKey) => {
            const courseTests = tests.filter(t => t.course === courseKey);
            if (courseTests.length === 0) return 0;

            // Count how many tests for this course exist in studentScores
            const completedCount = studentScores.filter(score =>
                courseTests.some(test => test.id === score.testId)
            ).length;

            return Math.round((completedCount / courseTests.length) * 100);
        };

        return [
            {
                id: 1,
                title: 'IGCSE Islamiat',
                progress: calculateProgress('igcse'), // Dynamic calculation
                nextClass: 'Monday, 5:00 PM',
                resources: ['Notes', 'Past Papers', 'Rubrics']
            }
            // You can add O Level here if needed, it will calculate automatically
        ];
    }, [tests, studentScores]);

    // If the user is an instructor, render the Instructor Dashboard
    if (user?.role === 'instructor') {
        return <InstructorDashboard />;
    }

    // Handle test submission logic
    const handleSubmitTest = () => {
        let score = 0;
        takingTest.questions.forEach((q, index) => {
            if (studentAnswers[index] === q.correctOption) score++;
        });

        const percentage = Math.round((score / takingTest.questions.length) * 100);
        const newScoreObj = {
            testId: takingTest.id,
            title: takingTest.title,
            score: percentage,
            rawScore: `${score}/${takingTest.questions.length}`,
            date: new Date().toLocaleDateString()
        };

        const updatedScores = [newScoreObj, ...studentScores];
        setStudentScores(updatedScores);
        localStorage.setItem('studentScores', JSON.stringify(updatedScores));

        alert(`Test Submitted!\nYou scored: ${score} out of ${takingTest.questions.length} (${percentage}%)`);

        // Reset states
        setTakingTest(null);
        setStudentAnswers({});
        setActiveTab('tests');
    };

    // Helper to get today's date in YYYY-MM-DD for accurate local timezone comparison
    const getTodayString = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const todayStr = getTodayString();

    return (
        <ProtectedRoute>
            <div style={{ padding: 'clamp(40px, 8vw, 64px) 0' }}>
                <div className="container">

                    {/* Header */}
                    <div className="scroll-reveal" ref={addToRefs} style={{
                        background: '#FFD700',
                        borderRadius: '32px',
                        padding: 'clamp(32px, 6vw, 48px)',
                        marginBottom: '32px'
                    }}>
                        <div>
                            <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', marginBottom: '10px', color: '#000000' }}>
                                Welcome back, {user?.name || 'Student'}! 👋
                            </h1>
                            <p style={{ color: '#000000', fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)' }}>
                                Continue your journey to excellence in Islamiat
                            </p>
                        </div>
                    </div>

                    {/* Navigation Tabs (if not currently taking a test) */}
                    {!takingTest && (
                        <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
                            <button
                                onClick={() => setActiveTab('overview')}
                                style={{
                                    padding: '12px 24px', background: activeTab === 'overview' ? '#000' : '#FFF9E6',
                                    color: activeTab === 'overview' ? '#FFD700' : '#000', border: 'none', borderRadius: '100px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s ease'
                                }}>
                                My Dashboard
                            </button>
                            <button
                                onClick={() => setActiveTab('tests')}
                                style={{
                                    padding: '12px 24px', background: activeTab === 'tests' ? '#000' : '#FFF9E6',
                                    color: activeTab === 'tests' ? '#FFD700' : '#000', border: 'none', borderRadius: '100px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s ease'
                                }}>
                                Assignments & Tests
                            </button>
                        </div>
                    )}

                    {/* OVERVIEW TAB */}
                    {activeTab === 'overview' && !takingTest && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                                <div className="card scroll-reveal" ref={addToRefs}>
                                    <h2 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <BookOpen size={24} style={{ color: '#FFD700' }} /> Your Courses
                                    </h2>
                                    {enrolledCourses.map((course) => (
                                        <div key={course.id} style={{ borderBottom: '1px solid #FFD70020', paddingBottom: '20px', marginBottom: '20px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
                                                <div>
                                                    <h3 style={{ fontWeight: '700', marginBottom: '6px', fontSize: 'clamp(1rem, 2.5vw, 1.2rem)' }}>{course.title}</h3>
                                                    <p style={{ fontSize: 'clamp(0.75rem, 2vw, 0.875rem)', color: '#666666', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                        <Clock size={14} /> Next class: {course.nextClass}
                                                    </p>
                                                </div>
                                                <span style={{ color: '#FFD700', fontWeight: '700', fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)' }}>{course.progress}%</span>
                                            </div>
                                            <div style={{ width: '100%', height: '8px', background: '#FFF9E6', borderRadius: '4px', overflow: 'hidden' }}>
                                                <div style={{ width: `${course.progress}%`, height: '100%', background: '#FFD700', borderRadius: '4px' }}></div>
                                            </div>
                                            <div style={{ display: 'flex', gap: '20px', marginTop: '16px', flexWrap: 'wrap' }}>
                                                {course.resources.map((resource, idx) => (
                                                    <button key={idx} style={{ background: 'none', border: 'none', color: '#FFD700', cursor: 'pointer', fontSize: 'clamp(0.75rem, 2vw, 0.875rem)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                        <Download size={14} /> {resource}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                                <div className="card scroll-reveal" ref={addToRefs}>
                                    <h2 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <TrendingUp size={24} style={{ color: '#FFD700' }} /> Your Progress
                                    </h2>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                        <div>
                                            <p style={{ fontSize: 'clamp(0.75rem, 2vw, 0.875rem)', color: '#666666', marginBottom: '6px' }}>Tests Completed</p>
                                            <p style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: 'bold', color: '#FFD700' }}>{studentScores.length}</p>
                                        </div>
                                        <div>
                                            <p style={{ fontSize: 'clamp(0.75rem, 2vw, 0.875rem)', color: '#666666', marginBottom: '6px' }}>Average Score</p>
                                            <p style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: 'bold', color: '#FFD700' }}>
                                                {studentScores.length > 0
                                                    ? `${Math.round(studentScores.reduce((acc, curr) => acc + curr.score, 0) / studentScores.length)}%`
                                                    : 'N/A'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TESTS LIST TAB */}
                    {activeTab === 'tests' && !takingTest && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}>
                            <div className="card scroll-reveal" ref={addToRefs}>
                                <h2 style={{ fontSize: '1.5rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <ClipboardList size={24} style={{ color: '#FFD700' }} /> Available Tests
                                </h2>
                                {tests.length === 0 ? <p style={{ color: '#666' }}>No tests available right now.</p> : (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                        {tests.map(test => {
                                            const previousScore = studentScores.find(s => s.testId === test.id);
                                            const isAvailable = test.date <= todayStr;

                                            const formattedDate = new Date(test.date).toLocaleDateString('en-US', {
                                                month: 'short', day: 'numeric', year: 'numeric'
                                            });

                                            return (
                                                <div key={test.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', background: '#FFF9E6', borderRadius: '16px' }}>
                                                    <div>
                                                        <h3 style={{ margin: '0 0 8px 0', color: !isAvailable ? '#666' : '#000' }}>
                                                            {test.title}
                                                        </h3>
                                                        <div style={{ display: 'flex', gap: '10px', fontSize: '0.85rem', color: '#666' }}>
                                                            <span>{test.course.toUpperCase()}</span>
                                                            <span>•</span>
                                                            <span>{test.questions.length} Questions</span>
                                                        </div>
                                                    </div>

                                                    {previousScore ? (
                                                        <div style={{ textAlign: 'right' }}>
                                                            <span style={{ display: 'block', fontWeight: 'bold', color: '#000' }}>Score: {previousScore.score}%</span>
                                                            <small style={{ color: '#666' }}>{previousScore.rawScore}</small>
                                                        </div>
                                                    ) : !isAvailable ? (
                                                        <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '6px', color: '#888', background: '#f5f5f5', padding: '8px 14px', borderRadius: '100px' }}>
                                                            <Lock size={16} />
                                                            <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>Opens {formattedDate}</span>
                                                        </div>
                                                    ) : (
                                                        <button
                                                            onClick={() => { setTakingTest(test); setStudentAnswers({}); }}
                                                            className="btn-primary"
                                                            style={{ background: '#FFD700', color: '#000', padding: '10px 20px' }}
                                                        >
                                                            Take Test
                                                        </button>
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* TEST TAKING VIEW */}
                    {takingTest && (
                        <div className="card scroll-reveal" ref={addToRefs} style={{ maxWidth: '800px', margin: '0 auto' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #FFF9E6', paddingBottom: '20px', marginBottom: '32px' }}>
                                <div>
                                    <h2 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>{takingTest.title}</h2>
                                    <p style={{ color: '#666' }}>Answer all {takingTest.questions.length} questions before submitting.</p>
                                </div>
                                <button onClick={() => setTakingTest(null)} style={{ background: 'none', border: 'none', color: '#ff4d4f', cursor: 'pointer', fontWeight: 'bold' }}>
                                    Cancel
                                </button>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                                {takingTest.questions.map((q, qIndex) => (
                                    <div key={qIndex} style={{ padding: '24px', background: '#fcfcfc', borderRadius: '16px', border: '1px solid #eee' }}>
                                        <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>{qIndex + 1}. {q.qText}</h3>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                            {q.options.map((opt, optIndex) => (
                                                <label
                                                    key={optIndex}
                                                    style={{
                                                        display: 'flex', alignItems: 'center', gap: '12px', padding: '16px',
                                                        borderRadius: '12px', border: '2px solid',
                                                        borderColor: studentAnswers[qIndex] === optIndex ? '#FFD700' : '#f0f0f0',
                                                        background: studentAnswers[qIndex] === optIndex ? '#FFF9E6' : '#fff',
                                                        cursor: 'pointer', transition: 'all 0.2s'
                                                    }}
                                                >
                                                    <input
                                                        type="radio"
                                                        name={`question-${qIndex}`}
                                                        checked={studentAnswers[qIndex] === optIndex}
                                                        onChange={() => setStudentAnswers({ ...studentAnswers, [qIndex]: optIndex })}
                                                        style={{ transform: 'scale(1.2)', accentColor: '#000' }}
                                                    />
                                                    <span style={{ fontSize: '1rem' }}>{opt}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={handleSubmitTest}
                                className="btn-primary"
                                style={{ width: '100%', marginTop: '32px', background: '#000', color: '#FFD700', padding: '16px', fontSize: '1.1rem' }}
                                disabled={Object.keys(studentAnswers).length < takingTest.questions.length}
                            >
                                Submit Test <ChevronRight size={20} style={{ marginLeft: '8px' }} />
                            </button>
                            {Object.keys(studentAnswers).length < takingTest.questions.length && (
                                <p style={{ textAlign: 'center', color: '#ff4d4f', marginTop: '12px', fontSize: '0.9rem' }}>
                                    Please answer all questions to submit.
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default Dashboard;

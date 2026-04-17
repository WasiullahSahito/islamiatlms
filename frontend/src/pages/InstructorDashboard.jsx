// src/pages/InstructorDashboard.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import {
    BookOpen, Users, Video, FileText, Upload, Plus, CheckCircle,
    Trash2, Link as LinkIcon, ClipboardList, Settings, ArrowLeft, Edit, Calendar
} from 'lucide-react';

const InstructorDashboard = () => {
    const { user } = useAuth();
    const revealRefs = useRef([]);
    const [activeTab, setActiveTab] = useState('overview');

    // State for uploads and tests
    const [materials, setMaterials] = useState(() => JSON.parse(localStorage.getItem('materials') || '[]'));
    const [lectures, setLectures] = useState(() => JSON.parse(localStorage.getItem('lectures') || '[]'));
    const [tests, setTests] = useState(() => JSON.parse(localStorage.getItem('tests') || '[]'));

    // Form states
    const [materialForm, setMaterialForm] = useState({ title: '', course: 'igcse', type: 'Notes' });
    const [lectureForm, setLectureForm] = useState({ title: '', course: 'igcse', link: '' });

    // Test Management States
    const [testForm, setTestForm] = useState({ title: '', course: 'igcse', date: '' });
    const [editingTest, setEditingTest] = useState(null); // The test currently opened for managing questions
    const [questionForm, setQuestionForm] = useState({ qText: '', options: ['', '', '', ''], correctOption: 0 });
    const [editingQuestionIndex, setEditingQuestionIndex] = useState(null);

    // Sync to local storage
    useEffect(() => {
        localStorage.setItem('materials', JSON.stringify(materials));
        localStorage.setItem('lectures', JSON.stringify(lectures));
        localStorage.setItem('tests', JSON.stringify(tests));
    }, [materials, lectures, tests]);

    // Reveal Animations
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
    }, [activeTab, editingTest]);

    const addToRefs = (el) => {
        if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
    };

    // Handlers for Materials & Lectures
    const handleUploadMaterial = (e) => {
        e.preventDefault();
        const newMaterial = { id: Date.now(), ...materialForm, date: new Date().toLocaleDateString() };
        setMaterials([newMaterial, ...materials]);
        setMaterialForm({ title: '', course: 'igcse', type: 'Notes' });
        alert('Material uploaded successfully!');
    };

    const handleUploadLecture = (e) => {
        e.preventDefault();
        const newLecture = { id: Date.now(), ...lectureForm, date: new Date().toLocaleDateString() };
        setLectures([newLecture, ...lectures]);
        setLectureForm({ title: '', course: 'igcse', link: '' });
        alert('Lecture added successfully!');
    };

    const handleDeleteMaterial = (id) => setMaterials(materials.filter(m => m.id !== id));
    const handleDeleteLecture = (id) => setLectures(lectures.filter(l => l.id !== id));

    // Handlers for Tests & Questions
    const handleCreateTest = (e) => {
        e.preventDefault();
        const newTest = {
            id: Date.now(),
            ...testForm,
            questions: []
        };
        setTests([newTest, ...tests]);
        setTestForm({ title: '', course: 'igcse', date: '' });
        alert('Test created successfully! You can now add questions to it.');
    };

    const handleDeleteTest = (id) => {
        if (window.confirm('Are you sure you want to delete this test?')) {
            setTests(tests.filter(t => t.id !== id));
            if (editingTest && editingTest.id === id) setEditingTest(null);
        }
    };

    const handleSaveQuestion = (e) => {
        e.preventDefault();
        // Validate options
        if (questionForm.options.some(opt => opt.trim() === '')) {
            alert('Please fill out all 4 options.');
            return;
        }

        let updatedQuestions = [...editingTest.questions];
        if (editingQuestionIndex !== null) {
            updatedQuestions[editingQuestionIndex] = questionForm;
        } else {
            updatedQuestions.push(questionForm);
        }

        const updatedTest = { ...editingTest, questions: updatedQuestions };

        // Update active editing test and global tests array
        setEditingTest(updatedTest);
        setTests(tests.map(t => t.id === updatedTest.id ? updatedTest : t));

        // Reset Question Form
        setQuestionForm({ qText: '', options: ['', '', '', ''], correctOption: 0 });
        setEditingQuestionIndex(null);
    };

    const handleEditQuestion = (index) => {
        setQuestionForm(editingTest.questions[index]);
        setEditingQuestionIndex(index);
    };

    const handleDeleteQuestion = (index) => {
        if (window.confirm('Delete this question?')) {
            const updatedQuestions = editingTest.questions.filter((_, i) => i !== index);
            const updatedTest = { ...editingTest, questions: updatedQuestions };
            setEditingTest(updatedTest);
            setTests(tests.map(t => t.id === updatedTest.id ? updatedTest : t));

            // Reset form if currently editing the deleted question
            if (editingQuestionIndex === index) {
                setQuestionForm({ qText: '', options: ['', '', '', ''], correctOption: 0 });
                setEditingQuestionIndex(null);
            }
        }
    };

    return (
        <div style={{ padding: 'clamp(40px, 8vw, 64px) 0' }}>
            <div className="container">

                {/* Header */}
                <div className="scroll-reveal" ref={addToRefs} style={{
                    background: '#000000',
                    borderRadius: '32px',
                    padding: 'clamp(32px, 6vw, 48px)',
                    marginBottom: '40px'
                }}>
                    <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', marginBottom: '10px', color: '#FFD700' }}>
                        Instructor Dashboard 👨‍🏫
                    </h1>
                    <p style={{ color: '#FFFFFF', fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)' }}>
                        Welcome back, {user?.name || 'Instructor'}! Manage your courses, tests, and uploads here.
                    </p>
                </div>

                {/* Navigation Tabs */}
                {!editingTest && (
                    <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
                        {['overview', 'materials', 'lectures', 'tests'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                style={{
                                    padding: '12px 24px',
                                    background: activeTab === tab ? '#FFD700' : '#FFF9E6',
                                    color: '#000',
                                    border: 'none',
                                    borderRadius: '100px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    textTransform: 'capitalize'
                                }}
                            >
                                {tab === 'overview' ? 'Dashboard Overview' : `Manage ${tab}`}
                            </button>
                        ))}
                    </div>
                )}

                {/* OVERVIEW TAB */}
                {activeTab === 'overview' && !editingTest && (
                    <div className="scroll-reveal" ref={addToRefs} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
                        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '32px' }}>
                            <div style={{ background: '#FFF9E6', padding: '16px', borderRadius: '50%' }}>
                                <Users size={32} style={{ color: '#FFD700' }} />
                            </div>
                            <div>
                                <p style={{ color: '#666', marginBottom: '4px' }}>Total Enrolled Students</p>
                                <h3 style={{ fontSize: '2rem' }}>142</h3>
                            </div>
                        </div>
                        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '32px' }}>
                            <div style={{ background: '#FFF9E6', padding: '16px', borderRadius: '50%' }}>
                                <FileText size={32} style={{ color: '#FFD700' }} />
                            </div>
                            <div>
                                <p style={{ color: '#666', marginBottom: '4px' }}>Materials Uploaded</p>
                                <h3 style={{ fontSize: '2rem' }}>{materials.length}</h3>
                            </div>
                        </div>
                        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '32px' }}>
                            <div style={{ background: '#FFF9E6', padding: '16px', borderRadius: '50%' }}>
                                <Video size={32} style={{ color: '#FFD700' }} />
                            </div>
                            <div>
                                <p style={{ color: '#666', marginBottom: '4px' }}>Recorded Lectures</p>
                                <h3 style={{ fontSize: '2rem' }}>{lectures.length}</h3>
                            </div>
                        </div>
                        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '32px' }}>
                            <div style={{ background: '#FFF9E6', padding: '16px', borderRadius: '50%' }}>
                                <ClipboardList size={32} style={{ color: '#FFD700' }} />
                            </div>
                            <div>
                                <p style={{ color: '#666', marginBottom: '4px' }}>Total Tests Created</p>
                                <h3 style={{ fontSize: '2rem' }}>{tests.length}</h3>
                            </div>
                        </div>
                    </div>
                )}

                {/* MATERIALS TAB */}
                {activeTab === 'materials' && !editingTest && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
                        <div className="card scroll-reveal" ref={addToRefs}>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Upload size={24} style={{ color: '#FFD700' }} /> Upload New Material
                            </h2>
                            <form onSubmit={handleUploadMaterial}>
                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Document Title</label>
                                    <input type="text" required value={materialForm.title} onChange={(e) => setMaterialForm({ ...materialForm, title: e.target.value })} style={inputStyle} placeholder="e.g. Chapter 1 Notes" />
                                </div>
                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Course</label>
                                    <select value={materialForm.course} onChange={(e) => setMaterialForm({ ...materialForm, course: e.target.value })} style={inputStyle}>
                                        <option value="igcse">IGCSE Islamiat</option>
                                        <option value="olevel">O Level Islamiat</option>
                                    </select>
                                </div>
                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Material Type</label>
                                    <select value={materialForm.type} onChange={(e) => setMaterialForm({ ...materialForm, type: e.target.value })} style={inputStyle}>
                                        <option value="Notes">Notes</option>
                                        <option value="Past Papers">Past Papers</option>
                                        <option value="Rubrics">Rubrics</option>
                                    </select>
                                </div>
                                <div style={{ marginBottom: '24px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>File Attachment</label>
                                    <input type="file" required style={{ padding: '10px', width: '100%', border: '2px dashed #FFD700', borderRadius: '12px' }} />
                                </div>
                                <button type="submit" className="btn-primary" style={{ width: '100%', background: '#FFD700', color: '#000' }}>
                                    <Plus size={18} style={{ marginRight: '8px' }} /> Upload Document
                                </button>
                            </form>
                        </div>

                        <div className="card scroll-reveal" ref={addToRefs}>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Uploaded Materials</h2>
                            {materials.length === 0 ? <p style={{ color: '#666' }}>No materials uploaded yet.</p> : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    {materials.map(mat => (
                                        <div key={mat.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: '#FFF9E6', borderRadius: '12px' }}>
                                            <div>
                                                <h4 style={{ margin: '0 0 4px 0' }}>{mat.title}</h4>
                                                <div style={{ display: 'flex', gap: '10px', fontSize: '0.8rem', color: '#666' }}>
                                                    <span style={{ background: '#FFD70030', padding: '2px 8px', borderRadius: '12px', color: '#000' }}>{mat.type}</span>
                                                    <span>{mat.course.toUpperCase()}</span>
                                                    <span>{mat.date}</span>
                                                </div>
                                            </div>
                                            <button onClick={() => handleDeleteMaterial(mat.id)} style={{ background: 'none', border: 'none', color: '#ff4d4f', cursor: 'pointer' }}>
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* LECTURES TAB */}
                {activeTab === 'lectures' && !editingTest && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
                        <div className="card scroll-reveal" ref={addToRefs}>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Video size={24} style={{ color: '#FFD700' }} /> Add Recorded Lecture
                            </h2>
                            <form onSubmit={handleUploadLecture}>
                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Lecture Title</label>
                                    <input type="text" required value={lectureForm.title} onChange={(e) => setLectureForm({ ...lectureForm, title: e.target.value })} style={inputStyle} placeholder="e.g. Life in Makkah - Part 1" />
                                </div>
                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Course</label>
                                    <select value={lectureForm.course} onChange={(e) => setLectureForm({ ...lectureForm, course: e.target.value })} style={inputStyle}>
                                        <option value="igcse">IGCSE Islamiat</option>
                                        <option value="olevel">O Level Islamiat</option>
                                    </select>
                                </div>
                                <div style={{ marginBottom: '24px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Video Link (Zoom/YouTube/Drive)</label>
                                    <div style={{ position: 'relative' }}>
                                        <LinkIcon size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                                        <input type="url" required value={lectureForm.link} onChange={(e) => setLectureForm({ ...lectureForm, link: e.target.value })} style={{ ...inputStyle, paddingLeft: '40px' }} placeholder="https://..." />
                                    </div>
                                </div>
                                <button type="submit" className="btn-primary" style={{ width: '100%', background: '#FFD700', color: '#000' }}>
                                    <Plus size={18} style={{ marginRight: '8px' }} /> Add Video Link
                                </button>
                            </form>
                        </div>

                        <div className="card scroll-reveal" ref={addToRefs}>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Recent Lectures</h2>
                            {lectures.length === 0 ? <p style={{ color: '#666' }}>No lectures added yet.</p> : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    {lectures.map(lec => (
                                        <div key={lec.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: '#FFF9E6', borderRadius: '12px' }}>
                                            <div style={{ overflow: 'hidden' }}>
                                                <h4 style={{ margin: '0 0 4px 0', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{lec.title}</h4>
                                                <div style={{ display: 'flex', gap: '10px', fontSize: '0.8rem', color: '#666' }}>
                                                    <span>{lec.course.toUpperCase()}</span>
                                                    <span>{lec.date}</span>
                                                </div>
                                            </div>
                                            <button onClick={() => handleDeleteLecture(lec.id)} style={{ background: 'none', border: 'none', color: '#ff4d4f', cursor: 'pointer', flexShrink: 0, marginLeft: '12px' }}>
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* TESTS TAB (Test List & Creation OR Question Manager) */}
                {activeTab === 'tests' && (
                    <div style={{ width: '100%' }}>
                        {!editingTest ? (
                            /* TEST CREATION & LIST */
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
                                {/* Create New Test */}
                                <div className="card scroll-reveal" ref={addToRefs}>
                                    <h2 style={{ fontSize: '1.5rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <ClipboardList size={24} style={{ color: '#FFD700' }} /> Create New Test
                                    </h2>
                                    <form onSubmit={handleCreateTest}>
                                        <div style={{ marginBottom: '16px' }}>
                                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Test Title</label>
                                            <input type="text" required value={testForm.title} onChange={(e) => setTestForm({ ...testForm, title: e.target.value })} style={inputStyle} placeholder="e.g. Weekly Quiz - Chapter 2" />
                                        </div>
                                        <div style={{ marginBottom: '16px' }}>
                                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Course</label>
                                            <select value={testForm.course} onChange={(e) => setTestForm({ ...testForm, course: e.target.value })} style={inputStyle}>
                                                <option value="igcse">IGCSE Islamiat</option>
                                                <option value="olevel">O Level Islamiat</option>
                                            </select>
                                        </div>
                                        <div style={{ marginBottom: '24px' }}>
                                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Test Date / Available From</label>
                                            <div style={{ position: 'relative' }}>
                                                <Calendar size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                                                <input type="date" required value={testForm.date} onChange={(e) => setTestForm({ ...testForm, date: e.target.value })} style={{ ...inputStyle, paddingLeft: '40px' }} />
                                            </div>
                                        </div>
                                        <button type="submit" className="btn-primary" style={{ width: '100%', background: '#FFD700', color: '#000' }}>
                                            <Plus size={18} style={{ marginRight: '8px' }} /> Initialize Test
                                        </button>
                                    </form>
                                </div>

                                {/* Existing Tests List */}
                                <div className="card scroll-reveal" ref={addToRefs}>
                                    <h2 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Manage Existing Tests</h2>
                                    {tests.length === 0 ? <p style={{ color: '#666' }}>No tests created yet.</p> : (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                            {tests.map(test => (
                                                <div key={test.id} style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px', background: '#FFF9E6', borderRadius: '12px' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                        <div>
                                                            <h4 style={{ margin: '0 0 4px 0' }}>{test.title}</h4>
                                                            <div style={{ display: 'flex', gap: '10px', fontSize: '0.8rem', color: '#666', flexWrap: 'wrap' }}>
                                                                <span>{test.course.toUpperCase()}</span>
                                                                <span>•</span>
                                                                <span>{test.date}</span>
                                                                <span>•</span>
                                                                <strong>{test.questions.length} Questions</strong>
                                                            </div>
                                                        </div>
                                                        <button onClick={() => handleDeleteTest(test.id)} style={{ background: 'none', border: 'none', color: '#ff4d4f', cursor: 'pointer', padding: '4px' }}>
                                                            <Trash2 size={20} />
                                                        </button>
                                                    </div>

                                                    <button
                                                        onClick={() => setEditingTest(test)}
                                                        style={{
                                                            background: '#000', color: '#FFD700', border: 'none', padding: '10px',
                                                            borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex',
                                                            justifyContent: 'center', alignItems: 'center', gap: '8px', fontSize: '0.9rem'
                                                        }}
                                                    >
                                                        <Settings size={16} /> Manage Questions
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            /* QUESTION MANAGEMENT VIEW */
                            <div className="scroll-reveal" ref={addToRefs}>
                                <button
                                    onClick={() => { setEditingTest(null); setEditingQuestionIndex(null); setQuestionForm({ qText: '', options: ['', '', '', ''], correctOption: 0 }); }}
                                    style={{ background: 'none', border: 'none', color: '#000', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', marginBottom: '24px' }}
                                >
                                    <ArrowLeft size={20} /> Back to Tests
                                </button>

                                <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>Editing: {editingTest.title}</h2>
                                <p style={{ color: '#666', marginBottom: '32px' }}>Add, edit, or delete questions for this test. Changes are saved automatically.</p>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
                                    {/* Question Form */}
                                    <div className="card">
                                        <h3 style={{ fontSize: '1.3rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            {editingQuestionIndex !== null ? <Edit size={20} color="#FFD700" /> : <Plus size={20} color="#FFD700" />}
                                            {editingQuestionIndex !== null ? 'Edit Question' : 'Add New Question'}
                                        </h3>
                                        <form onSubmit={handleSaveQuestion}>
                                            <div style={{ marginBottom: '16px' }}>
                                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Question Text</label>
                                                <textarea
                                                    required rows="3" value={questionForm.qText}
                                                    onChange={(e) => setQuestionForm({ ...questionForm, qText: e.target.value })}
                                                    style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }}
                                                    placeholder="What is the significance of..."
                                                />
                                            </div>

                                            <div style={{ marginBottom: '20px' }}>
                                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Options</label>
                                                {questionForm.options.map((opt, idx) => (
                                                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                                        <span style={{ fontWeight: 'bold', color: '#999', width: '24px' }}>{idx + 1}.</span>
                                                        <input
                                                            type="text" required value={opt}
                                                            onChange={(e) => {
                                                                const newOpts = [...questionForm.options];
                                                                newOpts[idx] = e.target.value;
                                                                setQuestionForm({ ...questionForm, options: newOpts });
                                                            }}
                                                            style={inputStyle} placeholder={`Option ${idx + 1}`}
                                                        />
                                                    </div>
                                                ))}
                                            </div>

                                            <div style={{ marginBottom: '24px' }}>
                                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Correct Answer</label>
                                                <select
                                                    value={questionForm.correctOption}
                                                    onChange={(e) => setQuestionForm({ ...questionForm, correctOption: parseInt(e.target.value) })}
                                                    style={inputStyle}
                                                >
                                                    {questionForm.options.map((opt, idx) => (
                                                        <option key={idx} value={idx}>Option {idx + 1} {opt ? `(${opt.substring(0, 20)}${opt.length > 20 ? '...' : ''})` : ''}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div style={{ display: 'flex', gap: '12px' }}>
                                                <button type="submit" className="btn-primary" style={{ flex: 1, background: '#FFD700', color: '#000' }}>
                                                    <CheckCircle size={18} style={{ marginRight: '8px' }} /> {editingQuestionIndex !== null ? 'Update' : 'Save'} Question
                                                </button>
                                                {editingQuestionIndex !== null && (
                                                    <button
                                                        type="button"
                                                        onClick={() => { setEditingQuestionIndex(null); setQuestionForm({ qText: '', options: ['', '', '', ''], correctOption: 0 }); }}
                                                        style={{ padding: '12px', background: '#eee', border: 'none', borderRadius: '100px', cursor: 'pointer', fontWeight: 'bold' }}
                                                    >
                                                        Cancel
                                                    </button>
                                                )}
                                            </div>
                                        </form>
                                    </div>

                                    {/* Questions List */}
                                    <div className="card">
                                        <h3 style={{ fontSize: '1.3rem', marginBottom: '20px' }}>Questions in this Test ({editingTest.questions.length})</h3>
                                        {editingTest.questions.length === 0 ? <p style={{ color: '#666' }}>No questions added yet.</p> : (
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '600px', overflowY: 'auto', paddingRight: '8px' }}>
                                                {editingTest.questions.map((q, idx) => (
                                                    <div key={idx} style={{ padding: '16px', background: '#fcfcfc', border: `2px solid ${editingQuestionIndex === idx ? '#FFD700' : '#eee'}`, borderRadius: '12px' }}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                                            <h4 style={{ margin: 0, fontSize: '1rem', lineHeight: '1.4' }}>{idx + 1}. {q.qText}</h4>
                                                            <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                                                                <button onClick={() => handleEditQuestion(idx)} style={{ background: 'none', border: 'none', color: '#000', cursor: 'pointer' }}><Edit size={18} /></button>
                                                                <button onClick={() => handleDeleteQuestion(idx)} style={{ background: 'none', border: 'none', color: '#ff4d4f', cursor: 'pointer' }}><Trash2 size={18} /></button>
                                                            </div>
                                                        </div>
                                                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem', color: '#555' }}>
                                                            {q.options.map((opt, oIdx) => (
                                                                <li key={oIdx} style={{ padding: '4px 0', color: oIdx === q.correctOption ? '#2d9e5a' : 'inherit', fontWeight: oIdx === q.correctOption ? 'bold' : 'normal' }}>
                                                                    {oIdx === q.correctOption ? '✓ ' : '• '} {opt}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
};

const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    border: '2px solid #FFD70020',
    borderRadius: '12px',
    fontSize: '0.95rem',
    background: '#fff'
};

export default InstructorDashboard;

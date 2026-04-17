import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    ArrowLeft, Smartphone, Building, CheckCircle,
    User, Phone, MapPin, AlertCircle, Copy, CreditCard, Lock
} from 'lucide-react';

// ─── tiny helper ──────────────────────────────────────────────
const Field = ({ label, children }) => (
    <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '0.88rem', color: '#444' }}>{label}</label>
        {children}
    </div>
);

const inputBase = {
    width: '100%', padding: '12px 16px', borderRadius: '10px',
    border: '1.5px solid #e0e0e0', fontSize: '0.95rem', outline: 'none',
    transition: 'border-color 0.2s', boxSizing: 'border-box',
};

const PaymentTab = ({ active, onClick, icon, label }) => (
    <button
        type="button"
        onClick={onClick}
        style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: '6px', padding: '14px 8px', borderRadius: '12px', cursor: 'pointer',
            border: `2px solid ${active ? '#FFD700' : '#eee'}`,
            background: active ? '#FFF9E6' : '#fafafa',
            transition: 'all 0.25s', fontWeight: active ? '700' : '500',
            fontSize: '0.8rem', color: active ? '#000' : '#666',
        }}
    >
        <span style={{ color: '#FFD700' }}>{icon}</span>
        {label}
        {active && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FFD700' }} />}
    </button>
);

const CopyBtn = ({ text, label = 'Copy' }) => {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <button
            type="button"
            onClick={handleCopy}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: copied ? '#e6f9ed' : '#f0f0f0', border: 'none', padding: '5px 12px', borderRadius: '6px', fontSize: '0.78rem', cursor: 'pointer', color: copied ? '#2d9e5a' : '#444', transition: 'all 0.2s', marginTop: '4px' }}
        >
            <Copy size={12} />
            {copied ? 'Copied!' : label}
        </button>
    );
};

// ─── Main Component ────────────────────────────────────────────
const Checkout = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { user, purchaseCourse } = useAuth();

    const course = location.state?.course || {
        name: id === 'igcse' ? 'IGCSE Islamiat' : 'O Level Islamiat',
        price: 299,
    };

    const [formData, setFormData] = useState({
        fullName: user?.name || '',
        email: user?.email || '',
        whatsapp: '',
        city: '',
    });

    const [paymentMethod, setPaymentMethod] = useState('easypaisa');
    const [processing, setProcessing] = useState(false);
    const [done, setDone] = useState(false);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const e = {};
        if (!formData.fullName.trim()) e.fullName = 'Full name is required';
        if (!formData.email.trim()) e.email = 'Email is required';
        if (!formData.whatsapp.trim()) e.whatsapp = 'WhatsApp number is required';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        if (errors[e.target.name]) setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        setProcessing(true);
        setTimeout(() => {
            purchaseCourse(id, course);
            setProcessing(false);
            setDone(true);
        }, 2500);
    };

    // ── Success screen ──────────────────────────────────────────
    if (done) {
        return (
            <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', background: '#fdfdfd' }}>
                <div style={{ textAlign: 'center', maxWidth: '480px', padding: '48px 36px', background: '#fff', borderRadius: '28px', border: '1px solid #FFE88A', boxShadow: '0 16px 48px rgba(255,215,0,0.12)' }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#FFF9E6', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                        <CheckCircle size={48} color="#FFD700" />
                    </div>
                    <h2 style={{ fontSize: '1.6rem', marginBottom: '12px' }}>Enrollment Request Sent!</h2>
                    <p style={{ color: '#666', lineHeight: '1.7', marginBottom: '28px' }}>
                        Thank you, <strong>{formData.fullName}</strong>! Your request for <strong>{course.name}</strong> has been received.
                        Please send the payment screenshot to our WhatsApp — your dashboard will be activated shortly.
                    </p>
                    <div style={{ background: '#FFF9E6', borderRadius: '14px', padding: '14px 20px', marginBottom: '28px', fontSize: '0.9rem', color: '#555' }}>
                        📱 Send screenshot to: <strong>+92 300 1234567</strong>
                    </div>
                    <button onClick={() => navigate('/dashboard')} style={{ width: '100%', background: '#FFD700', color: '#000', border: 'none', borderRadius: '12px', padding: '16px', fontWeight: '700', fontSize: '1rem', cursor: 'pointer' }}>
                        Go to My Dashboard
                    </button>
                </div>
            </div>
        );
    }

    // ── Payment details content per method ──────────────────────
    const paymentDetails = {
        easypaisa: (
            <div>
                <p style={detailRow}><span style={detailLabel}>Account Name</span> Arsslan Turabi</p>
                <p style={{ ...detailRow, fontSize: '1.1rem', fontWeight: '700', color: '#111' }}>
                    <span style={detailLabel}>Number</span> 0300 1234567
                </p>
                <CopyBtn text="03001234567" label="Copy Number" />
                <p style={{ marginTop: '14px', fontSize: '0.8rem', color: '#888' }}>
                    Open EasyPaisa app → Send Money → enter number above → enter amount → confirm.
                </p>
            </div>
        ),
        jazzcash: (
            <div>
                <p style={detailRow}><span style={detailLabel}>Account Name</span> Arsslan Turabi</p>
                <p style={{ ...detailRow, fontSize: '1.1rem', fontWeight: '700', color: '#111' }}>
                    <span style={detailLabel}>Number</span> 0311 7654321
                </p>
                <CopyBtn text="03117654321" label="Copy Number" />
                <p style={{ marginTop: '14px', fontSize: '0.8rem', color: '#888' }}>
                    Open JazzCash app → Send Money → enter number above → enter amount → confirm.
                </p>
            </div>
        ),
        bank: (
            <div>
                <p style={detailRow}><span style={detailLabel}>Bank</span> Mezan Bank Ltd</p>
                <p style={detailRow}><span style={detailLabel}>Account Title</span> Arsslan Turabi</p>
                <p style={detailRow}><span style={detailLabel}>Account #</span> 1234-5678-9012</p>
                <p style={{ ...detailRow, wordBreak: 'break-all' }}>
                    <span style={detailLabel}>IBAN</span> PK12 MEZN 0012 3456 7890 1234
                </p>
                <CopyBtn text="PK12MEZN0012345678901234" label="Copy IBAN" />
                <p style={{ marginTop: '14px', fontSize: '0.8rem', color: '#888' }}>
                    Use your registered email as the payment reference/narration.
                </p>
            </div>
        ),
    };

    return (
        <div style={{ padding: 'clamp(32px, 6vw, 56px) 0', background: '#fdfdfd', minHeight: '100vh' }}>
            <div className="container" style={{ maxWidth: '980px' }}>

                {/* Back */}
                <button
                    onClick={() => navigate(-1)}
                    style={{ background: 'none', border: 'none', color: '#FFD700', cursor: 'pointer', marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', fontSize: '0.95rem' }}
                >
                    <ArrowLeft size={18} /> Back
                </button>

                {/* Progress indicator */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px', fontSize: '0.82rem', color: '#aaa' }}>
                    <span style={{ color: '#FFD700', fontWeight: '700' }}>1. Course Selected</span>
                    <div style={{ flex: 1, height: '2px', background: '#FFD700', maxWidth: '60px' }} />
                    <span style={{ color: '#FFD700', fontWeight: '700' }}>2. Student Details</span>
                    <div style={{ flex: 1, height: '2px', background: '#FFD700', maxWidth: '60px' }} />
                    <span style={{ color: '#FFD700', fontWeight: '700' }}>3. Payment</span>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '28px' }}>

                        {/* ── LEFT: Student info ── */}
                        <div style={{ background: '#fff', borderRadius: '24px', padding: 'clamp(24px, 5vw, 36px)', border: '1px solid #ebebeb', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                            <h2 style={{ fontSize: '1.25rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <User size={22} color="#FFD700" /> Student Information
                            </h2>

                            <Field label="Full Name *">
                                <input
                                    name="fullName"
                                    type="text"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="e.g. Ahmed Ali"
                                    style={{ ...inputBase, borderColor: errors.fullName ? '#e55' : '#e0e0e0' }}
                                />
                                {errors.fullName && <p style={{ color: '#e55', fontSize: '0.78rem', marginTop: '4px' }}>{errors.fullName}</p>}
                            </Field>

                            <Field label="Email Address *">
                                <input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    readOnly={!!user}
                                    style={{ ...inputBase, borderColor: errors.email ? '#e55' : '#e0e0e0', background: user ? '#fafafa' : '#fff' }}
                                />
                                {errors.email && <p style={{ color: '#e55', fontSize: '0.78rem', marginTop: '4px' }}>{errors.email}</p>}
                            </Field>

                            <Field label="WhatsApp Number * (for class links & confirmation)">
                                <div style={{ position: 'relative' }}>
                                    <Phone size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#FFD700' }} />
                                    <input
                                        name="whatsapp"
                                        type="tel"
                                        value={formData.whatsapp}
                                        onChange={handleChange}
                                        placeholder="+92 300 1234567"
                                        style={{ ...inputBase, paddingLeft: '42px', borderColor: errors.whatsapp ? '#e55' : '#e0e0e0' }}
                                    />
                                </div>
                                {errors.whatsapp && <p style={{ color: '#e55', fontSize: '0.78rem', marginTop: '4px' }}>{errors.whatsapp}</p>}
                            </Field>

                            <Field label="City (optional)">
                                <div style={{ position: 'relative' }}>
                                    <MapPin size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#FFD700' }} />
                                    <input
                                        name="city"
                                        type="text"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="e.g. Karachi, London"
                                        style={{ ...inputBase, paddingLeft: '42px' }}
                                    />
                                </div>
                            </Field>

                            {/* Order summary */}
                            <div style={{ marginTop: '28px', background: '#FFF9E6', border: '1px solid #FFE88A', borderRadius: '16px', padding: '20px' }}>
                                <h3 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '14px' }}>Order Summary</h3>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#555', marginBottom: '10px' }}>
                                    <span>{course.name}</span>
                                    <span>${course.price}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: '#888', marginBottom: '12px' }}>
                                    <span>Duration</span>
                                    <span>6 Months</span>
                                </div>
                                <div style={{ borderTop: '1px solid #FFD70050', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '1.15rem' }}>
                                    <span>Total</span>
                                    <span style={{ color: '#FFD700' }}>${course.price}</span>
                                </div>
                            </div>
                        </div>

                        {/* ── RIGHT: Payment ── */}
                        <div style={{ background: '#fff', borderRadius: '24px', padding: 'clamp(24px, 5vw, 36px)', border: '1px solid #ebebeb', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                            <h2 style={{ fontSize: '1.25rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <CreditCard size={22} color="#FFD700" /> Payment Method
                            </h2>

                            {/* Tabs */}
                            <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
                                <PaymentTab active={paymentMethod === 'easypaisa'} onClick={() => setPaymentMethod('easypaisa')} icon={<Smartphone size={20} />} label="EasyPaisa" />
                                <PaymentTab active={paymentMethod === 'jazzcash'} onClick={() => setPaymentMethod('jazzcash')} icon={<Smartphone size={20} />} label="JazzCash" />
                                <PaymentTab active={paymentMethod === 'bank'} onClick={() => setPaymentMethod('bank')} icon={<Building size={20} />} label="Bank" />
                            </div>

                            {/* Details box */}
                            <div style={{ background: '#f8f8f8', border: '1.5px dashed #FFD700', borderRadius: '16px', padding: '22px', marginBottom: '22px', minHeight: '160px' }}>
                                <h4 style={{ color: '#FFD700', fontWeight: '700', marginBottom: '14px', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                    {paymentMethod === 'easypaisa' ? 'EasyPaisa Details' : paymentMethod === 'jazzcash' ? 'JazzCash Details' : 'Bank Transfer Details'}
                                </h4>
                                {paymentDetails[paymentMethod]}
                            </div>

                            {/* Note */}
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '28px', background: '#FFFBEA', border: '1px solid #FFE88A', borderRadius: '12px', padding: '14px' }}>
                                <AlertCircle size={20} color="#FFD700" style={{ flexShrink: 0, marginTop: '2px' }} />
                                <p style={{ fontSize: '0.82rem', color: '#555', lineHeight: '1.6', margin: 0 }}>
                                    <strong>Important:</strong> After sending payment, screenshot it and WhatsApp to <strong>+92 300 1234567</strong>. Your account will be activated within 2–4 hours.
                                </p>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={processing}
                                style={{
                                    width: '100%', padding: '18px', background: processing ? '#e0c840' : '#FFD700',
                                    color: '#000', border: 'none', borderRadius: '14px', fontWeight: '700',
                                    fontSize: '1.05rem', cursor: processing ? 'not-allowed' : 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                                    transition: 'transform 0.15s, box-shadow 0.15s',
                                    boxShadow: processing ? 'none' : '0 6px 20px rgba(255,215,0,0.35)',
                                }}
                                onMouseEnter={(e) => { if (!processing) e.currentTarget.style.transform = 'translateY(-1px)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                            >
                                {processing ? (
                                    <>
                                        <span style={{ width: '18px', height: '18px', border: '2px solid #00000040', borderTop: '2px solid #000', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
                                        Submitting Enrollment…
                                    </>
                                ) : (
                                    <>
                                        <Lock size={18} /> Complete Enrollment — ${course.price}
                                    </>
                                )}
                            </button>

                            <p style={{ textAlign: 'center', marginTop: '12px', fontSize: '0.75rem', color: '#bbb' }}>
                                By enrolling you agree to our terms of service.
                            </p>
                        </div>
                    </div>
                </form>

                {/* spinner keyframe */}
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        </div>
    );
};

const detailRow = { marginBottom: '8px', fontSize: '0.9rem', color: '#444', display: 'flex', gap: '8px', flexWrap: 'wrap' };
const detailLabel = { fontWeight: '700', color: '#222', minWidth: '110px', display: 'inline-block' };

export default Checkout;

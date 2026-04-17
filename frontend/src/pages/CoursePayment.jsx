import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CreditCard, ArrowLeft, Smartphone, Wallet, Building, CheckCircle } from 'lucide-react';

const CoursePayment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, purchaseCourse } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState('creditcard');
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const course = location.state?.course || {
    name: id === 'igcse' ? 'IGCSE Islamiat' : 'O Level Islamiat',
    price: 299
  };

  const handlePayment = async () => {
    setProcessing(true);
    setTimeout(() => {
      purchaseCourse(id, course);
      setProcessing(false);
      setPaymentSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }, 2000);
  };

  const paymentMethods = [
    {
      id: 'creditcard',
      name: 'Credit/Debit Card',
      icon: <CreditCard size={24} />,
      details: ['Visa', 'Mastercard', 'American Express']
    },
    {
      id: 'easypaisa',
      name: 'EasyPaisa',
      icon: <Smartphone size={24} />,
      details: ['Account: 03XX XXXXXXX', 'Name: Arsslan Turabi']
    },
    {
      id: 'jazzcash',
      name: 'JazzCash',
      icon: <Wallet size={24} />,
      details: ['Account: 03XX XXXXXXX', 'Name: Arsslan Turabi']
    },
    {
      id: 'mezan',
      name: 'Mezan Bank',
      icon: <Building size={24} />,
      details: ['Account: 1234-567890-01', 'IBAN: PK12MEZN0012345678901']
    }
  ];

  if (paymentSuccess) {
    return (
      <div style={{ minHeight: 'calc(100vh - 200px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px' }}>
        <div style={{ textAlign: 'center', maxWidth: '500px' }}>
          <CheckCircle size={80} style={{ color: '#FFD700', marginBottom: '24px' }} />
          <h2 style={{ marginBottom: '16px' }}>Payment Successful!</h2>
          <p style={{ color: '#666', marginBottom: '24px' }}>
            Thank you for purchasing {course.name}. You now have access to all course materials.
          </p>
          <button onClick={() => navigate('/dashboard')} className="btn-primary" style={{ background: '#FFD700', color: '#000' }}>
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 'clamp(40px, 8vw, 64px) 0', minHeight: 'calc(100vh - 200px)' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <button
          onClick={() => navigate(`/course/${id}`)}
          style={{
            background: 'none',
            border: 'none',
            color: '#FFD700',
            cursor: 'pointer',
            marginBottom: '32px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <ArrowLeft size={18} /> Back to Course
        </button>

        <div className="card" style={{ padding: 'clamp(24px, 5vw, 40px)' }}>
          <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', marginBottom: '8px' }}>Complete Your Purchase</h1>
          <p style={{ color: '#666', marginBottom: '32px' }}>You're about to purchase {course.name}</p>

          <div style={{
            background: '#FFF9E6',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <h3 style={{ marginBottom: '4px' }}>{course.name}</h3>
              <p style={{ color: '#666', fontSize: '0.85rem' }}>Lifetime access</p>
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#FFD700' }}>
              ${course.price}
            </div>
          </div>

          <h3 style={{ marginBottom: '20px' }}>Select Payment Method</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                onClick={() => setPaymentMethod(method.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px',
                  border: `2px solid ${paymentMethod === method.id ? '#FFD700' : '#FFE8A3'}`,
                  borderRadius: '16px',
                  cursor: 'pointer',
                  background: paymentMethod === method.id ? '#FFF9E6' : '#fff',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ color: '#FFD700' }}>{method.icon}</div>
                  <div>
                    <div style={{ fontWeight: '600' }}>{method.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#666' }}>
                      {method.details[0]}
                    </div>
                  </div>
                </div>
                {paymentMethod === method.id && (
                  <CheckCircle size={20} style={{ color: '#FFD700' }} />
                )}
              </div>
            ))}
          </div>

          {paymentMethod === 'creditcard' && (
            <div style={{ marginBottom: '24px' }}>
              <input
                type="text"
                placeholder="Card Number"
                style={{
                  width: '100%',
                  padding: '14px',
                  border: '2px solid #FFD70020',
                  borderRadius: '12px',
                  marginBottom: '12px',
                  fontSize: '1rem'
                }}
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <input
                  type="text"
                  placeholder="MM/YY"
                  style={{
                    padding: '14px',
                    border: '2px solid #FFD70020',
                    borderRadius: '12px',
                    fontSize: '1rem'
                  }}
                />
                <input
                  type="text"
                  placeholder="CVC"
                  style={{
                    padding: '14px',
                    border: '2px solid #FFD70020',
                    borderRadius: '12px',
                    fontSize: '1rem'
                  }}
                />
              </div>
            </div>
          )}

          <button
            onClick={handlePayment}
            disabled={processing}
            className="btn-primary"
            style={{
              width: '100%',
              background: processing ? '#ccc' : '#FFD700',
              color: '#000',
              padding: '16px',
              fontSize: '1rem',
              fontWeight: 'bold'
            }}
          >
            {processing ? 'Processing...' : `Pay $${course.price}`}
          </button>

          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.75rem', color: '#999' }}>
            Secure payment processing. Your information is encrypted.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoursePayment;

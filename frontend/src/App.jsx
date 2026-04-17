import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop'; // Import the ScrollToTop component
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import Resources from './pages/Resources';
import Contact from './pages/Contact';
import CourseDetails from './pages/CourseDetails';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import CoursePayment from './pages/CoursePayment';
import InstructorDashboard from './pages/InstructorDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop /> {/* Add this component here */}
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetails />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/course-payment/:id" element={<CoursePayment />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
                      {/* Optional: Direct access routes (Protected) */}
                      <Route path="/instructor-dashboard" element={
                          <ProtectedRoute>
                              <InstructorDashboard />
                          </ProtectedRoute>
                      } />

            <Route path="*" element={<NotFound />} />
          </Routes>
          <footer className="footer">
            <div className="footer-content">
              <p>© 2024 Arsslan Turabi Islamiat 2058. All rights reserved.</p>
              <p style={{ marginTop: '12px', fontSize: '0.85rem' }}>
                "Seeking knowledge is an obligation upon every Muslim"
              </p>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

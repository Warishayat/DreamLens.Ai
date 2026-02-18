import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import ImageCreation from './Pages/ImageCreation';
import VideoCreation from './Pages/VideoCreation';
import Dashboard from './Pages/Dashboard';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import NotFound from './Pages/NotFound';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const hideLayout = ['/login', '/signup'].includes(location.pathname);

  return (
    /* flex-col aur min-h-screen footer ko hamesha niche rakhega */
    <div className="flex flex-col min-h-screen bg-[#050505]">
      {!hideLayout && <Navbar />}
      
      {/* flex-grow bachi hui saari jagah le lega taake footer niche push ho jaye */}
      <main className={`flex-grow ${!hideLayout ? "pt-24" : ""}`}>
        {children}
      </main>
      
      {!hideLayout && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <LayoutWrapper>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound/>} />

          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/image-story" 
            element={
              <ProtectedRoute>
                <ImageCreation/>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/video-story" 
            element={
              <ProtectedRoute>
                <VideoCreation/>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}

export default App;
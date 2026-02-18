import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Mobile sidebar
  const [showDropdown, setShowDropdown] = useState(false); // User Dropdown
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setShowDropdown(false);
    setIsOpen(false);
    navigate('/login');
  };

  // Main Links (Sab ke liye)
  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'IMAGE STORY', path: '/image-story' },
    { name: 'VIDEO STORY', path: '/video-story' },
    { name: 'ABOUT', path: '/about' },
    { name: 'CONTACT', path: '/contact' },
  ];

  return (
    <nav className={`fixed w-full top-0 z-[100] transition-all duration-500 ${
      scrolled ? 'bg-[#050505]/90 backdrop-blur-xl border-b border-white/10 py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-black italic tracking-tighter bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          DreamLens
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`text-[10px] font-black tracking-[0.3em] transition-all hover:text-white ${
                location.pathname === link.path ? 'text-white' : 'text-gray-500'
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* User Dropdown for Desktop */}
          {token ? (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:bg-white/10 transition-all"
              >
                <div className="w-5 h-5 bg-gradient-to-tr from-purple-500 to-cyan-500 rounded-full"></div>
                <span className="text-[10px] font-black text-gray-300">ACCOUNT</span>
                <svg className={`w-3 h-3 text-gray-500 transition-transform ${showDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-3 w-48 bg-[#0F0F0F] border border-white/10 rounded-2xl shadow-2xl p-2 animate-in fade-in zoom-in duration-200">
                  <Link to="/dashboard" onClick={() => setShowDropdown(false)} className="block px-4 py-3 text-[10px] font-black tracking-widest text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">DASHBOARD</Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-[10px] font-black tracking-widest text-red-500 hover:bg-red-500/10 rounded-xl transition-all uppercase">Logout Session</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="bg-white text-black px-6 py-2 rounded-full text-[10px] font-black tracking-widest hover:bg-purple-500 hover:text-white transition-all">SIGN IN</Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-gray-400 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
          </svg>
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 right-0 w-[280px] bg-[#0A0A0A] z-[110] border-l border-white/10 p-10 transform transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'} lg:hidden`}>
        <div className="flex flex-col gap-8 mt-10">
          <p className="text-[9px] font-black tracking-[0.4em] text-gray-700 uppercase">Navigation</p>
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} onClick={() => setIsOpen(false)} className="text-xl font-black italic tracking-tighter text-white hover:text-purple-400 transition-colors">{link.name}</Link>
          ))}
          
          <div className="h-[1px] bg-white/5 my-4"></div>
          
          {token ? (
            <div className="space-y-6">
              <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block text-lg font-black tracking-tighter text-cyan-400">MY DASHBOARD</Link>
              <button onClick={handleLogout} className="text-left text-sm font-black text-red-500 tracking-widest uppercase">Terminate</button>
            </div>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)} className="text-lg font-black tracking-tighter text-purple-500">SIGN IN</Link>
          )}
        </div>
      </div>
      
      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[105] lg:hidden" onClick={() => setIsOpen(false)}></div>}
    </nav>
  );
};

export default Navbar;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userName = localStorage.getItem('user_name') || 'Dreamer'; 
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0A0A0A] border-b border-white/[0.08] px-6 py-4 shadow-2xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="text-2xl font-black italic bg-gradient-to-r from-purple-400 via-violet-500 to-cyan-400 bg-clip-text text-transparent tracking-tighter">
          DreamLens
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-gray-400 hover:text-white transition-all text-[10px] font-bold tracking-[0.2em]">HOME</Link>
          <Link to="/image-story" className="text-gray-400 hover:text-purple-400 transition-all text-[10px] font-bold tracking-[0.2em]">IMAGE STORY</Link>
          <Link to="/video-story" className="text-gray-400 hover:text-cyan-400 transition-all text-[10px] font-bold tracking-[0.2em]">VIDEO STORY</Link>
          <Link to="/about" className="text-gray-400 hover:text-white transition-all text-[10px] font-bold tracking-[0.2em]">ABOUT</Link>
          <Link to="/contact" className="text-gray-400 hover:text-white transition-all text-[10px] font-bold tracking-[0.2em]">CONTACT</Link>
        </div>

        {/* Profile/Auth Section */}
        <div className="flex items-center gap-4">
          {!token ? (
            <Link to="/login" className="bg-purple-600 text-white text-[10px] font-bold px-6 py-2.5 rounded-xl hover:bg-purple-500 transition-all tracking-widest">
              LOG IN
            </Link>
          ) : (
            <div className="relative">
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-3 bg-white/5 border border-white/10 pl-2 pr-4 py-1.5 rounded-2xl hover:bg-white/10 transition-all"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xs shadow-lg">
                  {userName[0].toUpperCase()}
                </div>
                <span className="text-white text-[10px] font-bold uppercase tracking-wider">{userName}</span>
                <svg className={`w-3 h-3 text-gray-500 transition-transform ${showDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>

              {/* Dashboard Dropdown */}
              {showDropdown && (
                <div className="absolute right-0 mt-3 w-48 bg-[#111] border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] py-2 overflow-hidden z-[60]">
                  <Link to="/dashboard" className="block px-4 py-3 text-[11px] text-gray-400 hover:bg-white/5 hover:text-white transition-all font-bold tracking-widest">
                    DASHBOARD
                  </Link>
                  <div className="h-[1px] bg-white/5 my-1"></div>
                  <button 
                    onClick={handleLogout} 
                    className="w-full text-left px-4 py-3 text-[11px] text-red-500 hover:bg-red-500/5 transition-all font-bold tracking-widest"
                  >
                    LOGOUT
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
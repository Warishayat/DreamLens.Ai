import React, { useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const Navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: name,
      email: email,
      password: password
    };

    try {
      const response = await axios.post('https://dreamlens-ai.onrender.com/auth/signup', payload);
      if (response.data) {
        toast.success('Portal Opened! Welcome Dreamer ✨');
        Navigate("/login")
      }
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Connection lost in dreams...');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#050505] relative overflow-hidden font-sans p-4">
      <Toaster position="top-right" />
    
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-cyan-600/20 rounded-full blur-[120px] animate-pulse delay-700"></div>

      <div className="relative w-full max-w-[450px] bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 md:p-12 shadow-2xl">
        
        <div className="text-center mb-10">
          <h1 className="text-5xl font-black tracking-tighter bg-gradient-to-r from-purple-400 via-violet-500 to-cyan-400 bg-clip-text text-transparent italic">
            DreamLens
          </h1>
          <p className="text-gray-400 mt-3 text-sm font-medium tracking-wide uppercase">
            Start Your Imagination Journey
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="group relative">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all duration-300 placeholder:text-gray-600"
              required
            />
          </div>

          <div className="group relative">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all duration-300 placeholder:text-gray-600"
              required
            />
          </div>

          <div className="group relative">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all duration-300 placeholder:text-gray-600"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-500 hover:to-violet-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-purple-500/20 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50"
          >
            {loading ? 'Generating Account...' : 'Sign Up Free'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-400 hover:text-purple-300 font-bold transition-colors">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
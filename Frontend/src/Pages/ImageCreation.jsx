import React, { useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

import showcase1 from '../assets/image1.jpg';
import showcase2 from '../assets/image2.jpg';
import showcase3 from '../assets/image3.jpg';

const ImageCreation = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedImg, setGeneratedImg] = useState(null);
  const [credits, setCredits] = useState(null); 
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const token = localStorage.getItem('acess_token') || localStorage.getItem('token'); 

    if (!token) {
      toast.error('Session not found. Please login again.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        'https://dreamlens-xp1l.onrender.com/generate/image', 
        { prompt }, 
        {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        }
      );

      if (response.data.success) {
        setGeneratedImg(response.data.image); 
        setCredits(response.data.remaining); 
        toast.success(response.data.message || 'Dream materialized! ✨');
        setPrompt('');
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again.');
      } else {
        toast.error(error.response?.data?.detail || 'Neural link failed.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-12 px-4 md:px-8 font-sans overflow-x-hidden">
      <Toaster position="top-right" />
      
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-center md:justify-end mb-6">
          {credits !== null && (
            <div className="px-5 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.1)]">
              <span className="text-[10px] font-black tracking-widest text-purple-400 uppercase">
                CREDITS: {credits}
              </span>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 mb-12">
          {[showcase1, showcase2, showcase3].map((img, i) => (
            <div key={i} className="h-40 md:h-44 rounded-[28px] overflow-hidden border border-white/5 bg-[#0A0A0A] group">
              <img 
                src={img} 
                className="w-full h-full object-cover opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" 
                alt="Showcase" 
              />
            </div>
          ))}
        </div>
        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleGenerate} className="relative group">
            {/* Animated Glow Border */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-cyan-500 rounded-[35px] blur-[8px] opacity-40 group-focus-within:opacity-80 transition duration-500"></div>
            
            <div className="relative bg-[#080808] border border-white/10 rounded-[32px] p-2 flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your vision..."
                className="flex-grow bg-transparent px-6 py-4 outline-none text-white placeholder:text-gray-700 font-bold text-sm"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-white text-black font-black px-8 py-4 sm:py-2 rounded-2xl hover:bg-gray-200 transition-all disabled:opacity-50 text-[10px] tracking-widest uppercase shadow-xl"
              >
                {loading ? "Processing..." : "Generate"}
              </button>
            </div>
          </form>
          
          <p className="mt-6 text-center text-gray-500 text-[8px] md:text-[9px] font-black tracking-[0.4em] uppercase opacity-40">
            AI is ready to hallucinate your dreams
          </p>
        </div>

        <div className="flex justify-center min-h-[350px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center">
              <div className="w-14 h-14 border-4 border-purple-500/10 border-t-purple-500 rounded-full animate-spin"></div>
              <p className="mt-6 text-[9px] font-black tracking-[0.6em] text-purple-500/80 uppercase">Synthesizing</p>
            </div>
          ) : generatedImg ? (
            <div className="w-full max-w-md relative group">
              <div className="absolute -inset-2 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-[40px] blur-xl opacity-20 group-hover:opacity-40 transition-all duration-1000"></div>
              <div className="relative rounded-[36px] overflow-hidden border border-white/10 bg-[#0A0A0A] shadow-2xl">
                <img src={generatedImg} alt="Generated Art" className="w-full h-auto object-contain" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-4">
                  <a 
                    href={generatedImg} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="bg-white text-black font-black px-8 py-3 rounded-full text-[10px] tracking-widest hover:scale-105 active:scale-95 transition-all"
                  >
                    DOWNLOAD HD
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center opacity-10">
                 <div className="w-24 h-24 border-2 border-dashed border-white/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-thin">+</span>
                 </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageCreation;

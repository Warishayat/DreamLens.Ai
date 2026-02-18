import React, { useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

const VideoStory = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedVid, setGeneratedVid] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setGeneratedVid(null);

    const token = localStorage.getItem('token');

    if (!token) {
      toast.error('Neural link missing. Please login.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        'https://dreamlens-ai.onrender.com/generate/video',
        { prompt },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setGeneratedVid(response.data.video);
        setCredits(response.data.remaining);
        toast.success('Motion Story Synthesized! 🎬');
        setPrompt('');
      }
    } catch (error) {
      const errorMsg = error.response?.data?.detail || 'Generation failed.';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-28 pb-20 px-4 md:px-12 overflow-x-hidden">
      <Toaster position="top-right" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] -z-10 animate-pulse delay-1000"></div>

      <div className="max-w-6xl mx-auto space-y-12">
        
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-7xl font-black italic tracking-tighter">
            MOTION <span className="bg-gradient-to-r from-fuchsia-500 to-purple-600 bg-clip-text text-transparent underline decoration-cyan-500/30">STUDIO</span>
          </h1>
          <p className="text-gray-500 text-[10px] md:text-xs font-black tracking-[0.5em] uppercase">Transform static thoughts into cinematic sequences</p>
          
          {credits !== null && (
            <div className="inline-block mt-4 px-6 py-2 bg-white/5 border border-white/10 rounded-full">
              <span className="text-[10px] font-bold text-cyan-400 tracking-widest uppercase">FREE SEQUENCES LEFT: {credits}</span>
            </div>
          )}
        </div>
        <div className="max-w-3xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-cyan-500 to-fuchsia-500 rounded-[35px] blur-md opacity-25 group-focus-within:opacity-100 transition duration-1000"></div>
          
          <form onSubmit={handleGenerate} className="relative bg-[#0A0A0A] border border-white/10 rounded-[32px] p-2 flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the motion (e.g. A futuristic car flying through cyberpunk city...)"
              className="flex-grow bg-transparent px-6 py-5 outline-none text-sm font-medium text-gray-200 placeholder:text-gray-700"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-white text-black font-black px-10 py-5 sm:py-2 rounded-[24px] hover:bg-purple-500 hover:text-white transition-all duration-500 disabled:opacity-30 uppercase text-[10px] tracking-widest shadow-2xl shadow-purple-500/20"
            >
              {loading ? "Rendering..." : "Ignite"}
            </button>
          </form>
        </div>

        <div className="flex justify-center min-h-[400px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center text-center space-y-8">
              <div className="relative">
                <div className="w-20 h-20 border-2 border-purple-500/20 rounded-full"></div>
                <div className="absolute top-0 w-20 h-20 border-t-2 border-purple-500 rounded-full animate-spin"></div>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-black tracking-[0.6em] text-purple-400 animate-pulse uppercase">Simulating Dynamics</p>
                <p className="text-gray-600 text-[9px] max-w-[200px]">AI videos take a moment to bake. Grab a coffee, Waris.</p>
              </div>
            </div>
          ) : generatedVid ? (
            <div className="w-full max-w-4xl animate-in fade-in slide-in-from-bottom-10 duration-1000">
                <div className="relative rounded-[40px] overflow-hidden border border-white/10 bg-black shadow-2xl group">
                    <video 
                      src={generatedVid} 
                      controls 
                      autoPlay
                      className="w-full aspect-video object-cover"
                    />
                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                        <a href={generatedVid} download className="bg-black/50 backdrop-blur-md p-3 rounded-full hover:bg-white hover:text-black transition-all">
                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        </a>
                    </div>
                </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center opacity-20 group">
                <div className="w-32 h-32 border border-dashed border-white/20 rounded-[40px] flex items-center justify-center group-hover:border-purple-500/50 transition-colors duration-700">
                    <svg className="w-10 h-10 text-gray-600 group-hover:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                </div>
                <p className="mt-6 text-[9px] font-black tracking-[0.5em] text-gray-500 uppercase">Input prompt to generate motion</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoStory;
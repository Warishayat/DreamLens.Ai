import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const token = localStorage.getItem('token');

  return (
    <div className="bg-[#050505] text-white min-h-screen overflow-x-hidden">
      <section className="relative flex items-start justify-center pt-16 md:pt-20 px-6 md:px-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-purple-900/10 to-transparent blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="flex justify-center mb-4">
            <div className="relative group cursor-default">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative px-6 py-2 bg-black border border-white/10 rounded-full flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                </span>
                <span className="text-[9px] font-black tracking-[0.3em] text-gray-300 uppercase whitespace-nowrap">
                  The Future of Imagination
                </span>
              </div>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-[100px] font-black italic tracking-tighter mb-6 leading-[0.8] select-none">
            SEE BEYOND <br />
            <span className="bg-gradient-to-r from-purple-400 via-violet-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(139,92,246,0.3)]">
              THE REALITY
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-gray-400 text-base md:text-lg font-medium mb-10 leading-relaxed px-6">
            DreamLens translates your neural whispers into high-fidelity visual masterpieces. 
            Experience the pinnacle of generative AI, crafted for the visionary within you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-10 mb-24">
            <Link to={token ? "/image-story" : "/login"} className="group relative w-full sm:w-auto overflow-hidden rounded-xl bg-white px-10 py-4 transition-all">
              <div className="absolute inset-0 w-0 bg-purple-600 transition-all duration-[400ms] ease-out group-hover:w-full"></div>
              <span className="relative text-black font-black tracking-widest text-[11px] group-hover:text-white transition-colors duration-300">
                {token ? "DASHBOARD" : "START CREATING"}
              </span>
            </Link>

            <Link to="/about" className="w-full sm:w-auto group border border-white/10 bg-white/5 backdrop-blur-md px-10 py-4 rounded-xl transition-all hover:bg-white/10">
              <span className="text-white font-black tracking-widest text-[11px]">
                VIEW SHOWCASE
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-12 mb-32">
            {[
              { icon: "⚡", title: "Ultra Fast", desc: "Generate high-resolution dreams in under 5 seconds.", glow: "group-hover:bg-purple-500/10" },
              { icon: "🎨", title: "Visionary Art", desc: "Studio-grade styles from hyper-realism to ethereal art.", glow: "group-hover:bg-cyan-500/10" },
              { icon: "🔒", title: "Secure Flow", desc: "Your imagination is private and owned solely by you.", glow: "group-hover:bg-indigo-500/10" },
              { icon: "🎬", title: "Motion Magic", desc: "Breathe life into static frames with cinematic tech.", glow: "group-hover:bg-rose-500/10" },
              { icon: "🔮", title: "Neural Prompt", desc: "AI that understands context and emotion perfectly.", glow: "group-hover:bg-amber-500/10" },
              { icon: "♾️", title: "Infinite Scale", desc: "Scale your creative output from frames to entire worlds.", glow: "group-hover:bg-emerald-500/10" }
            ].map((card, i) => (
              <div key={i} className="group relative bg-[#0A0A0A] border border-white/[0.05] p-10 rounded-[40px] text-left transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)] overflow-hidden">
                <div className={`absolute -right-8 -top-8 w-32 h-32 bg-white/5 rounded-full blur-3xl transition-all duration-500 ${card.glow}`}></div>
                <div className="w-14 h-14 bg-white/[0.03] border border-white/[0.05] rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 group-hover:bg-white/[0.08] transition-all duration-500">
                  {card.icon}
                </div>
                <h3 className="text-2xl font-black mb-4 italic tracking-tight text-white/90">{card.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-medium group-hover:text-gray-400 transition-colors">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="max-w-7xl mx-auto px-6 mb-32">
            <div className="bg-gradient-to-r from-purple-900/20 via-[#0A0A0A] to-cyan-900/20 border border-white/[0.05] rounded-[50px] p-16 text-center relative overflow-hidden group">
               <div className="relative z-10">
                  <h2 className="text-4xl md:text-5xl font-black italic mb-6 tracking-tighter text-white">Ready to unleash your neural engine?</h2>
                  <p className="text-gray-500 mb-10 max-w-xl mx-auto font-medium">Join 50,000+ creators who are already shaping the future of visual storytelling.</p>
                  
                  <Link to={token ? "/image-story" : "/signup"} className="inline-block bg-gradient-to-r from-purple-600 to-violet-700 text-white font-black tracking-[0.2em] text-[10px] px-12 py-5 rounded-2xl shadow-xl shadow-purple-500/20 hover:scale-105 transition-all">
                    {token ? "OPEN VISION LAB" : "CREATE YOUR FIRST DREAM"}
                  </Link>
               </div>
               <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      <div className="fixed inset-0 z-[-1] opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
      </div>
    </div>
  );
};

export default Home;
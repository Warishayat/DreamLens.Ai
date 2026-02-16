import React from 'react';

import waris from '../assets/waris.jpeg'; 
import MehreenPhoto from '../assets/girl.jpeg';

const About = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-20 flex-grow">
        
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 border border-purple-500/20 rounded-full bg-purple-500/5 mb-4">
            <span className="text-[10px] font-black tracking-[0.3em] text-purple-400 uppercase">Engineers of Imagination</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter mb-8 leading-none">
            OUR <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">STORY</span>
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto mb-32">
          
          <div className="group relative text-center">
            <div className="absolute -inset-1 bg-gradient-to-b from-purple-600 to-transparent rounded-[40px] blur opacity-10 group-hover:opacity-30 transition duration-1000"></div>
            <div className="relative bg-[#0A0A0A] border border-white/10 rounded-[40px] p-10 overflow-hidden">
              <div className="w-44 h-44 mx-auto rounded-full overflow-hidden mb-8 border-2 border-purple-500/20 shadow-2xl shadow-purple-500/10">
                <img 
                  src={waris} 
                  alt="Waris" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <h3 className="text-2xl font-black italic mb-2 tracking-tight">WARIS</h3>
              <p className="text-purple-400 text-[10px] font-black tracking-[0.2em] uppercase mb-4">Full Stack Developer | Backend & AI Specialist</p>
              <p className="text-gray-500 leading-relaxed text-sm font-medium">
                A NUML Software Engineering graduate specializing in Backend Architectures and Agentic AI. Waris masters AWS cloud infrastructure, predictive machine learning, and data science to power the complex neural engines of DreamLens.
              </p>
            </div>
          </div>

          <div className="group relative text-center">
            <div className="absolute -inset-1 bg-gradient-to-b from-cyan-600 to-transparent rounded-[40px] blur opacity-10 group-hover:opacity-30 transition duration-1000"></div>
            <div className="relative bg-[#0A0A0A] border border-white/10 rounded-[40px] p-10 overflow-hidden">
              <div className="w-44 h-44 mx-auto rounded-full overflow-hidden mb-8 border-2 border-cyan-500/20 shadow-2xl shadow-cyan-500/10">
                <img 
                  src={MehreenPhoto} 
                  alt="Mehreen" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <h3 className="text-2xl font-black italic mb-2 tracking-tight">MEHREEN</h3>
              <p className="text-cyan-400 text-[10px] font-black tracking-[0.2em] uppercase mb-4">Full Stack Developer | Frontend & ML Expert</p>
              <p className="text-gray-500 leading-relaxed text-sm font-medium">
                Pursuing CS at NUST, Mehreen is a Full Stack expert focused on high-performance ML Engineering. She integrates Data Science and Predictive ML models to ensure every user interaction is as intelligent as it is visually stunning.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/[0.02] border border-white/5 rounded-[50px] p-16 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl font-black italic mb-6 tracking-tighter text-white">The Engineering Vision</h2>
            <p className="text-gray-500 max-w-3xl mx-auto text-lg font-medium leading-relaxed">
             DreamLens is the result of a powerful technical partnership between Waris and Mehreen. 
              From architecting the robust Backend and Agentic AI frameworks to engineering immersive 
              Frontend ecosystems and Predictive ML models, they have collaborated on every line of code. 
              Together, they leverage the power of AWS and Data Science to redefine the boundaries of digital creativity.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
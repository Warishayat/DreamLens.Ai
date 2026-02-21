import React, { useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

const Contact = () => {
  const [payload, setPayload] = useState({
    name: '',
    email: '',
    topic: 'Request Credits',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('https://dreamlens-xp1l.onrender.com/admin/contact', payload);
      toast.success('Neural link established!');
      setPayload({ name: '', email: '', topic: 'Request Credits', message: '' });
    } catch (error) {
      toast.error('Transmission failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-10 pb-16 px-6">
      <Toaster position="top-right" />
      
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        
        <div className="text-center mb-10">
          <div className="inline-block px-4 py-1 border border-purple-500/20 rounded-full bg-purple-500/5 mb-4">
            <span className="text-[9px] font-black tracking-[0.4em] text-purple-400 uppercase">Support Portal</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-none mb-2">
            GET IN <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">TOUCH</span>
          </h1>
        </div>

        <div className="w-full relative group mb-12">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/10 to-cyan-500/10 rounded-[40px] blur-xl opacity-30"></div>
          <form onSubmit={handleSubmit} className="relative bg-[#0A0A0A] border border-white/10 rounded-[40px] p-8 md:p-10 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-5 mb-5">
              <input
                type="text"
                placeholder="Name"
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-purple-500/50 transition-all text-sm font-medium"
                value={payload.name}
                onChange={(e) => setPayload({...payload, name: e.target.value})}
              />
              <input
                type="email"
                required
                placeholder="Email"
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-cyan-500/50 transition-all text-sm font-medium"
                value={payload.email}
                onChange={(e) => setPayload({...payload, email: e.target.value})}
              />
            </div>

            <div className="relative mb-5">
              <select
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-purple-500/50 transition-all text-sm font-medium appearance-none cursor-pointer"
                value={payload.topic}
                onChange={(e) => setPayload({...payload, topic: e.target.value})}
              >
                <option className="bg-[#0A0A0A]" value="Request Credits">Request Credits</option>
                <option className="bg-[#0A0A0A]" value="Technical Support">Technical Support</option>
                <option className="bg-[#0A0A0A]" value="Other">Other</option>
              </select>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xs">▼</div>
            </div>

            <textarea
              required
              rows="4"
              placeholder="Your message..."
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-cyan-500/50 transition-all text-sm font-medium mb-8 resize-none"
              value={payload.message}
              onChange={(e) => setPayload({...payload, message: e.target.value})}
            ></textarea>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black font-black py-5 rounded-2xl tracking-[0.3em] text-[10px] hover:bg-purple-600 hover:text-white transition-all transform active:scale-95 disabled:opacity-50"
            >
              {loading ? "TRANSMITTING..." : "TRANSMIT MESSAGE"}
            </button>
          </form>
        </div>

        <div className="text-center max-w-lg px-4">
          <p className="text-gray-600 text-[10px] font-black tracking-[0.2em] uppercase leading-relaxed">
            Founded by Waris (NUML) & Mehreen (NUST). 
            Redefining imagination through Agentic AI and Predictive ML.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Contact;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('https://dreamlens-ai.onrender.com/dashboard/user', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(response.data);
    } catch (error) {
      toast.error("Neural link failed.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
      <div className="w-10 h-10 border-t-2 border-purple-500 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-10 px-4 md:px-10 lg:px-16 overflow-hidden">
      <Toaster position="top-right" />
      <div className="max-w-[1600px] mx-auto h-full lg:h-[85vh] grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 xl:col-span-3 space-y-6 flex flex-col h-full">
          <div className="bg-white/[0.03] border border-white/10 rounded-[40px] p-8 space-y-6">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-purple-500 tracking-[0.4em] uppercase">Operator</p>
              <h1 className="text-4xl font-black italic tracking-tighter bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent uppercase">
                {data?.user.name}
              </h1>
              <p className="text-[9px] text-gray-600 font-bold tracking-widest break-all">{data?.user.email}</p>
            </div>

            <div className="h-px bg-white/10 w-full"></div>

            <div className="grid grid-cols-1 gap-4">
              <MiniStat label="Trial Status" value={data?.usage.trial_status} color="cyan" />
              <div className="space-y-4 pt-4">
                 <p className="text-[9px] font-black text-gray-500 tracking-[0.3em] uppercase">Resource Allocation</p>
                 <ProgressBar label="Images" used={data?.usage.images_used} left={data?.usage.images_left} color="purple" />
                 <ProgressBar label="Videos" used={data?.usage.videos_used} left={data?.usage.videos_left} color="cyan" />
              </div>
            </div>
          </div>

          <div className="hidden lg:block flex-grow bg-gradient-to-b from-purple-600/10 to-transparent border border-white/5 rounded-[40px] p-8 relative overflow-hidden">
             <div className="relative z-10">
                <h3 className="text-sm font-black italic tracking-widest text-purple-400">DREAMLENS PRO</h3>
                <p className="text-[10px] text-gray-500 mt-2 leading-relaxed">Your neural generations are stored in the encrypted S3 vault.</p>
             </div>
             <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500/20 blur-3xl rounded-full"></div>
          </div>
        </div>
        <div className="lg:col-span-8 xl:col-span-9 bg-white/[0.02] border border-white/5 rounded-[45px] p-6 md:p-10 overflow-y-auto custom-scrollbar">
          
          <div className="space-y-12">
            <section>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-xs font-black tracking-[0.6em] text-gray-400 uppercase">/ Imagery_Vault</h2>
                <div className="h-px flex-grow bg-white/5"></div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {data?.media.images.map((img, i) => (
                  <div key={i} className="group relative aspect-square rounded-[35px] overflow-hidden border border-white/10 bg-[#0A0A0A] hover:scale-[1.02] transition-all duration-500">
                    <img src={img} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                      <a href={img} target="_blank" className="bg-white text-black px-8 py-3 rounded-full text-[10px] font-black tracking-widest hover:bg-purple-500 hover:text-white transition-colors">EXPAND</a>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Videos Section */}
            <section>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-xs font-black tracking-[0.6em] text-gray-400 uppercase">/ Motion_Sequences</h2>
                <div className="h-px flex-grow bg-white/5"></div>
              </div>
              
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {data?.media.videos.map((vid, i) => (
                  <div key={i} className="rounded-[40px] overflow-hidden border border-white/10 bg-black p-3 group shadow-2xl">
                    <video src={vid} controls className="w-full aspect-video rounded-[30px] object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #222; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #444; }
      `}</style>
    </div>
  );
};

// Sub-components for a cleaner Laptop UI
const MiniStat = ({ label, value, color }) => (
  <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
    <span className="text-[9px] font-bold text-gray-500 tracking-widest uppercase">{label}</span>
    <span className={`text-xs font-black tracking-tighter ${color === 'cyan' ? 'text-cyan-400' : 'text-purple-400'} uppercase`}>{value}</span>
  </div>
);

const ProgressBar = ({ label, used, left, color }) => {
  const total = used + left;
  const percentage = total > 0 ? (used / total) * 100 : 0;
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[9px] font-black tracking-widest">
        <span className="text-gray-400 uppercase">{label}</span>
        <span className="text-white">{used} / {total}</span>
      </div>
      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color === 'purple' ? 'bg-purple-600 shadow-[0_0_10px_rgba(147,51,234,0.5)]' : 'bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]'} transition-all duration-1000`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Dashboard;
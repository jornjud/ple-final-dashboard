import React, { useEffect, useState } from 'react';
import { LayoutDashboard, Coins, Zap, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = "" }) => (
  <div className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl ${className}`}>
    {children}
  </div>
);

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error("Error loading data:", err));
  }, []);

  if (!data) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  return (
    <div className="min-h-screen p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-6"
          >
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-cyan-400 overflow-hidden shadow-[0_0_20px_rgba(34,211,238,0.5)]">
                <img 
                  src="/ple-secretary.jpg" 
                  alt="Ple Secretary" 
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=Ple"; }}
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-[#0f172a]"></div>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Ple Dashboard
              </h1>
              <p className="text-cyan-400 font-medium">Executive Secretary Assistant</p>
            </div>
          </motion.div>

          <GlassCard className="flex items-center gap-4 py-4 px-8">
            <div className="text-right">
              <p className="text-xs text-gray-400 uppercase tracking-widest">Total Cost (THB)</p>
              <p className="text-3xl font-mono font-bold text-green-400">฿{data.usage.total_cost_thb.toFixed(2)}</p>
            </div>
            <BarChart3 className="text-cyan-400 w-8 h-8" />
          </GlassCard>
        </header>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {data.pricing.map((item, i) => (
            <motion.div
              key={item.model}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="hover:bg-white/15 transition-all cursor-pointer group">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">{item.model}</h3>
                  <Zap className="text-yellow-400 w-5 h-5" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Input / 1K Tokens</span>
                    <span className="font-mono text-cyan-200">฿{item.input_1k_thb.toFixed(4)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Output / 1K Tokens</span>
                    <span className="font-mono text-cyan-200">฿{item.output_1k_thb.toFixed(4)}</span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <GlassCard>
          <div className="flex items-center gap-2 mb-6">
            <Coins className="text-cyan-400" />
            <h2 className="text-xl font-semibold">Token Usage Summary</h2>
          </div>
          <div className="w-full bg-white/5 rounded-full h-4 mb-4 overflow-hidden border border-white/10">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '65%' }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full shadow-[0_0_10px_rgba(6,182,212,0.5)]"
            />
          </div>
          <div className="flex justify-between text-sm text-gray-400">
            <span>Total Tokens: {data.usage.total_tokens.toLocaleString()}</span>
            <span>Last Updated: {new Date(data.last_updated).toLocaleString()}</span>
          </div>
        </GlassCard>

        <footer className="mt-16 text-center text-gray-500 text-sm italic">
          Powered by OpenClaw • 1 USD = 35 THB
        </footer>
      </div>
    </div>
  );
}

export default App;

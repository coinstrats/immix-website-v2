import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

export const HeroPromptBox = () => {
  return (
    <div className="w-[340px] bg-[#0a0a0a]/92 backdrop-blur-xl border border-white/[0.08] rounded-lg overflow-hidden shadow-2xl"
      style={{ boxShadow: '0 0 40px 8px rgba(0, 115, 255, 0.06), 0 20px 40px -8px rgba(0, 0, 0, 0.5)' }}
    >
      <div className="px-3 py-1.5 border-b border-white/[0.06] flex items-center gap-2 bg-white/[0.02]">
        <Sparkles size={10} className="text-immix-blue" />
        <span className="text-[10px] text-white/50 font-mono tracking-wide uppercase">IMMIX SDK Strategy Builder</span>
      </div>

      <div className="p-3">
        <div className="flex items-start gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-[11px] text-white/70 leading-relaxed font-mono">
              <span className="text-immix-blue">{'>'}</span>{' '}
              Create a BTC basis trade across Binance and OKX perpetuals with 10bps target spread, auto-hedging on fill
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
                className="inline-block w-[6px] h-[13px] bg-immix-blue/80 ml-0.5 align-middle"
              />
            </p>
          </div>
        </div>

        <div className="mt-2.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[9px] text-white/30 font-mono">immix-sdk v2.4</span>
          </div>

          <button className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-immix-blue/15 border border-immix-blue/25 hover:bg-immix-blue/25 transition-colors group">
            <span className="text-[10px] text-immix-blue font-medium">Generate</span>
            <ArrowRight size={10} className="text-immix-blue group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

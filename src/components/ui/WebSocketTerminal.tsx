import { motion } from 'framer-motion';

export const WebSocketTerminal = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[500px]"
    >
      <div className="bg-[#0D0D0D] border border-slate-800 rounded-lg shadow-2xl overflow-hidden">
        <div className="bg-[#0A0A0A] px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-slate-700"></div>
              <div className="w-3 h-3 rounded-full bg-slate-700"></div>
              <div className="w-3 h-3 rounded-full bg-slate-700"></div>
            </div>
            <span className="font-mono text-xs text-slate-400">wss://api.immix.xyz/v1/stream</span>
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-green-500"
            ></motion.div>
            <span className="text-xs text-green-400 font-mono">Connected</span>
          </div>
        </div>

        <div className="p-5">
          <pre className="font-mono text-xs leading-relaxed">
            <code>
              <span className="text-slate-500">{'{'}</span>
              {'\n  '}
              <span className="text-blue-400">"type"</span>
              <span className="text-slate-500">: </span>
              <span className="text-green-400">"SUBSCRIBE"</span>
              <span className="text-slate-500">,</span>
              {'\n  '}
              <span className="text-blue-400">"channel"</span>
              <span className="text-slate-500">: </span>
              <span className="text-green-400">"execution.router"</span>
              <span className="text-slate-500">,</span>
              {'\n  '}
              <span className="text-blue-400">"payload"</span>
              <span className="text-slate-500">: {'{'}</span>
              {'\n    '}
              <span className="text-blue-400">"strategy"</span>
              <span className="text-slate-500">: </span>
              <span className="text-green-400">"SMART_SOR"</span>
              <span className="text-slate-500">,</span>
              {'\n    '}
              <span className="text-blue-400">"symbol"</span>
              <span className="text-slate-500">: </span>
              <span className="text-green-400">"BTC-USD"</span>
              <span className="text-slate-500">,</span>
              {'\n    '}
              <span className="text-blue-400">"size"</span>
              <span className="text-slate-500">: </span>
              <span className="text-orange-400">15.0</span>
              <span className="text-slate-500">,</span>
              {'\n    '}
              <span className="text-blue-400">"params"</span>
              <span className="text-slate-500">: {'{'}</span>
              {'\n      '}
              <span className="text-blue-400">"urgency"</span>
              <span className="text-slate-500">: </span>
              <span className="text-green-400">"LOW_IMPACT"</span>
              <span className="text-slate-500">,</span>
              {'\n      '}
              <span className="text-blue-400">"venues"</span>
              <span className="text-slate-500">: [</span>
              <span className="text-green-400">"BINANCE"</span>
              <span className="text-slate-500">, </span>
              <span className="text-green-400">"COINBASE"</span>
              <span className="text-slate-500">, </span>
              <span className="text-green-400">"KRAKEN"</span>
              <span className="text-slate-500">]</span>
              {'\n    '}
              <span className="text-slate-500">{'}'}</span>
              {'\n  '}
              <span className="text-slate-500">{'}'}</span>
              {'\n'}
              <span className="text-slate-500">{'}'}</span>
              {'\n\n'}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="text-slate-400"
              >
                {'// > Response: '}
                <span className="text-cyan-400">Routing 4.2 BTC to Binance...</span>
              </motion.span>
            </code>
          </pre>
        </div>
      </div>
    </motion.div>
  );
};

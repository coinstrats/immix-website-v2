import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Tab {
  id: string;
  label: string;
  code: string;
}

const tabs: Tab[] = [
  {
    id: 'basis',
    label: 'BasisTrade.java',
    code: `execution.smartRouter("BTC-USD", Side.BUY).strategy(Basis.CAPTURE);`,
  },
  {
    id: 'payments',
    label: 'PaymentsCorridor.java',
    code: `payment.route("USDC").to("Singapore").settle(Instant.TRUE);`,
  },
  {
    id: 'treasury',
    label: 'TreasuryYield.java',
    code: `yield.optimize("ETH").risk(Level.LOW).rebalance(Daily);`,
  },
];

const HighlightedCode = ({ code }: { code: string }) => {
  const parts = code.split(/(".*?"|\.|\(|\)|;)/g).filter(Boolean);

  return (
    <code className="font-mono text-sm">
      {parts.map((part, idx) => {
        if (part.startsWith('"') && part.endsWith('"')) {
          return (
            <span key={idx} className="text-emerald-400">
              {part}
            </span>
          );
        }
        if (/^[A-Z][a-zA-Z]*$/.test(part)) {
          return (
            <span key={idx} className="text-cyan-400">
              {part}
            </span>
          );
        }
        if (/^[a-z][a-zA-Z]*$/.test(part) && idx > 0) {
          return (
            <span key={idx} className="text-blue-400">
              {part}
            </span>
          );
        }
        return (
          <span key={idx} className="text-slate-200">
            {part}
          </span>
        );
      })}
    </code>
  );
};

export const StrategyCodeCard = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const activeTabData = tabs.find((tab) => tab.id === activeTab) || tabs[0];

  return (
    <div className="bg-slate-900/90 backdrop-blur border border-blue-500/30 rounded-lg shadow-2xl overflow-hidden">
      <div className="flex border-b border-slate-700/50 bg-slate-800/50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              px-4 py-3 text-sm font-mono transition-all relative flex items-center
              ${
                activeTab === tab.id
                  ? 'text-blue-400 bg-slate-900/80'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
              }
            `}
          >
            <span className="leading-none">{tab.label}</span>
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="px-6 py-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex items-center leading-relaxed"
          >
            <HighlightedCode code={activeTabData.code} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

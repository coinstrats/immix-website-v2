import { motion } from 'framer-motion';
import { Lock, Zap, TrendingUp, Shield, Terminal, BarChart, Building2, Network, Database, ExternalLink, Server } from 'lucide-react';
import { AnimatedElement, Button } from '../ui';

const DataFlowDot = ({ delay = 0, reverse = false, speed = 1, color = 'bg-immix-blue' }: { delay?: number; reverse?: boolean; speed?: number; color?: string }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{
      opacity: [0, 1, 1, 0],
      left: reverse ? ['100%', '0%'] : ['0%', '100%'],
    }}
    transition={{
      duration: speed,
      delay,
      repeat: Infinity,
      repeatDelay: 0.3,
      ease: 'linear',
    }}
    className="absolute top-1/2 -translate-y-1/2 w-2 h-2 -ml-1"
  >
    <div className={`w-full h-full ${color} shadow-glow`} />
  </motion.div>
);

export const EcosystemMap = () => {
  return (
    <section id="architecture" className="section-wrapper relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="schematic-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#schematic-grid)" />
        </svg>
      </div>

      <div className="container-max space-y-16 relative z-10">
        <div className="text-center space-y-4">
          <AnimatedElement type="fadeInUp">
            <h2 className="text-4xl md:text-5xl font-bold">Your stack, unified</h2>
          </AnimatedElement>
          <AnimatedElement type="fadeInUp" delay={0.1}>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              IMMIX orchestrates custody, venues, and private data—integrating your business logic, risk controls, and compliance into real-time execution.
            </p>
          </AnimatedElement>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="hidden lg:grid grid-cols-12 gap-6 items-center py-16">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
  
              className="col-span-3 space-y-4"
            >
              <div className="relative p-6 border border-immix-purple/30 bg-immix-dark/40 backdrop-blur">
                <div className="absolute -top-3 left-4 px-2 bg-immix-darker">
                  <div className="flex items-center gap-2 text-xs text-immix-purple font-mono">
                    <Lock size={14} />
                    <span>CUSTODY</span>
                  </div>
                </div>

                <div className="space-y-2 mt-2">
                  {['Fireblocks', 'Copper', 'Hex Trust', 'Anchorage', 'BitGo'].map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.05 }}
          
                      className="flex items-center gap-2 px-3 py-2 bg-immix-purple/5 border border-immix-purple/20 text-xs font-mono text-white/70 hover:bg-immix-purple/10 hover:border-immix-purple/30 transition-colors"
                    >
                      <Building2 size={14} className="text-white/40" />
                      {item}
                    </motion.div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-white/10">
                  <p className="text-xs text-white/40 font-mono">
                    MPC • Cold Storage • Compliance
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
  
              className="col-span-1 flex items-center justify-center relative h-80"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full h-px bg-gradient-to-r from-immix-purple/30 via-immix-blue/50 to-immix-blue/30" />
                </div>

                {[0, 0.6, 1.2].map((delay) => (
                  <DataFlowDot key={`left-${delay}`} delay={delay} reverse={false} speed={2} color="bg-immix-purple" />
                ))}
                {[0.3, 0.9].map((delay) => (
                  <DataFlowDot key={`left-rev-${delay}`} delay={delay} reverse={true} speed={2} color="bg-immix-blue" />
                ))}

                <div className="absolute left-1/2 top-1/4 -translate-x-1/2">
                  <div className="px-2 py-1 bg-immix-darker border border-immix-blue/30 text-xs font-mono text-immix-blue">
                    5μs
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
  
              className="col-span-4 relative"
            >
              <div className="relative p-8 border-2 border-immix-blue/50 bg-immix-dark/60 backdrop-blur">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 bg-immix-darker">
                  <div className="text-xs font-mono text-immix-blue flex items-center gap-2">
                    <span className="w-2 h-2 bg-immix-blue animate-pulse"></span>
                    <span>IMMIX CORE CLUSTER</span>
                    <span className="w-2 h-2 bg-immix-blue animate-pulse"></span>
                  </div>
                </div>

                <div className="text-center mb-8 mt-2">
                  <h3 className="font-bold text-2xl mb-1 text-white">Sequencer</h3>
                  <p className="text-xs text-white/60 font-mono">RAFT Consensus • 1M+ msg/s • 5μs latency</p>
                </div>

                <div className="flex flex-col items-center relative h-64 mb-6">
                  <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
                    <defs>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>

                    <line x1="50%" y1="15%" x2="30%" y2="80%" stroke="rgb(148, 163, 184)" strokeOpacity="0.2" strokeWidth="1.5" strokeDasharray="4,4" />
                    <line x1="50%" y1="15%" x2="70%" y2="80%" stroke="rgb(148, 163, 184)" strokeOpacity="0.2" strokeWidth="1.5" strokeDasharray="4,4" />

                    <motion.circle
                      key="dot-s1-s2"
                      r="3"
                      fill="rgb(59, 130, 246)"
                      filter="url(#glow)"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: [0, 1, 1, 0],
                        cx: ['50%', '30%'],
                        cy: ['15%', '80%'],
                      }}
                      transition={{
                        duration: 0.7,
                        delay: 0,
                        repeat: Infinity,
                        repeatDelay: 1.3,
                        ease: 'linear',
                      }}
                    />

                    <motion.circle
                      key="dot-s1-s3"
                      r="3"
                      fill="rgb(59, 130, 246)"
                      filter="url(#glow)"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: [0, 1, 1, 0],
                        cx: ['50%', '70%'],
                        cy: ['15%', '80%'],
                      }}
                      transition={{
                        duration: 0.7,
                        delay: 0,
                        repeat: Infinity,
                        repeatDelay: 1.3,
                        ease: 'linear',
                      }}
                    />

                    <motion.circle
                      key="dot-s2-s1"
                      r="3"
                      fill="rgb(59, 130, 246)"
                      filter="url(#glow)"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: [0, 1, 1, 0],
                        cx: ['30%', '50%'],
                        cy: ['80%', '15%'],
                      }}
                      transition={{
                        duration: 0.7,
                        delay: 0.7,
                        repeat: Infinity,
                        repeatDelay: 1.3,
                        ease: 'linear',
                      }}
                    />

                    <motion.circle
                      key="dot-s3-s1"
                      r="3"
                      fill="rgb(59, 130, 246)"
                      filter="url(#glow)"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: [0, 1, 1, 0],
                        cx: ['70%', '50%'],
                        cy: ['80%', '15%'],
                      }}
                      transition={{
                        duration: 0.7,
                        delay: 0.7,
                        repeat: Infinity,
                        repeatDelay: 1.3,
                        ease: 'linear',
                      }}
                    />
                  </svg>

                  <div className="absolute top-2 left-0 right-0 flex justify-center" style={{ zIndex: 20 }}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className="w-24 h-24 bg-white border-2 border-white/60 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                    >
                      <div className="text-center">
                        <Zap className="text-immix-dark mx-auto" size={24} />
                        <div className="text-xs font-mono text-immix-dark/90 mt-1 font-bold">S1</div>
                        <div className="text-[10px] font-mono text-immix-dark/60 font-semibold">Leader</div>
                      </div>
                    </motion.div>
                  </div>

                  <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-16" style={{ zIndex: 10 }}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 }}
                      className="w-20 h-20 bg-slate-900 border-2 border-slate-700 flex items-center justify-center"
                    >
                      <div className="text-center">
                        <Zap className="text-slate-400 mx-auto" size={20} />
                        <div className="text-xs font-mono text-slate-400 mt-1 font-bold">S2</div>
                        <div className="text-[10px] font-mono text-slate-500 font-semibold">Follower</div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 }}
                      className="w-20 h-20 bg-slate-900 border-2 border-slate-700 flex items-center justify-center"
                    >
                      <div className="text-center">
                        <Zap className="text-slate-400 mx-auto" size={20} />
                        <div className="text-xs font-mono text-slate-400 mt-1 font-bold">S3</div>
                        <div className="text-[10px] font-mono text-slate-500 font-semibold">Follower</div>
                      </div>
                    </motion.div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
                  {[
                    { label: 'Risk Books', icon: Network, metric: 'Strategy Pods' },
                    { label: 'Business Logic', icon: Terminal, metric: 'SDK' },
                    { label: 'Data Lab', icon: Database, metric: '360 Insights' },
                  ].map((feature, i) => {
                    const Icon = feature.icon;
                    return (
                      <motion.div
                        key={feature.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + i * 0.1 }}
            
                        className="p-3 bg-immix-blue/5 border border-immix-blue/30 hover:bg-immix-blue/10 transition-colors"
                      >
                        <Icon className="text-immix-blue mb-2" size={16} />
                        <p className="text-xs font-semibold text-white/80 leading-tight mb-1">{feature.label}</p>
                        <p className="text-xs text-immix-blue/60 font-mono">{feature.metric}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-6 h-6 border-2 border-immix-blue/30 bg-immix-darker flex items-center justify-center">
                <div className="w-2 h-2 bg-immix-blue" />
              </div>
              <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-6 h-6 border-2 border-immix-blue/30 bg-immix-darker flex items-center justify-center">
                <div className="w-2 h-2 bg-immix-blue" />
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-6 h-6 border-2 border-immix-blue/30 bg-immix-darker flex items-center justify-center">
                <div className="w-2 h-2 bg-immix-blue" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
  
              className="col-span-1 flex items-center justify-center relative h-80"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full h-px bg-gradient-to-r from-immix-blue/30 via-immix-blue/50 to-immix-blue/30" />
                </div>

                {[0, 0.4, 0.8, 1.2].map((delay) => (
                  <DataFlowDot key={`right-${delay}`} delay={delay} reverse={false} speed={0.7} />
                ))}
                {[0.2, 0.6, 1.0].map((delay) => (
                  <DataFlowDot key={`right-rev-${delay}`} delay={delay} reverse={true} speed={0.7} />
                ))}

                <div className="absolute left-1/2 bottom-1/4 -translate-x-1/2">
                  <div className="px-2 py-1 bg-immix-darker border border-immix-blue/30 text-xs font-mono text-immix-blue">
                    70+ venues
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
  
              className="col-span-3 space-y-4"
            >
              <div className="relative p-6 border border-immix-blue/30 bg-immix-dark/40 backdrop-blur">
                <div className="absolute -top-3 right-4 px-2 bg-immix-darker">
                  <div className="flex items-center gap-2 text-xs text-immix-blue font-mono">
                    <span>VENUES</span>
                    <TrendingUp size={14} />
                  </div>
                </div>

                <div className="space-y-2 mt-2">
                  {['Binance', 'Coinbase', 'Kraken', 'CME', 'OKX', 'Bybit', 'Deribit'].map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.05 }}
          
                      className="flex items-center gap-2 px-3 py-2 bg-immix-blue/5 border border-immix-blue/20 text-xs font-mono text-white/70 hover:bg-immix-blue/10 hover:border-immix-blue/30 transition-colors"
                    >
                      <Building2 size={14} className="text-white/40" />
                      {item}
                    </motion.div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-white/10">
                  <p className="text-xs text-white/40 font-mono">
                    CEX • DEX • OTC • DMA
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="hidden lg:grid grid-cols-12 gap-6 -mt-8">
            <div className="col-start-3 col-span-8 flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
    
                className="w-full flex items-center justify-center relative h-20 mb-2"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="h-full w-px bg-gradient-to-b from-emerald-600/30 via-emerald-600/50 to-emerald-600/30" />
                  </div>

                  {[0, 0.4, 0.8].map((delay) => (
                    <motion.div
                      key={`down-${delay}`}
                      className="absolute w-2 h-2 bg-immix-blue border border-immix-blue"
                      style={{ left: '50%', transform: 'translateX(-50%)' }}
                      initial={{ top: '0%', opacity: 0 }}
                      animate={{
                        top: ['0%', '100%'],
                        opacity: [0, 1, 1, 0],
                      }}
                      transition={{
                        duration: 1.2,
                        delay: delay,
                        repeat: Infinity,
                        repeatDelay: 1.0,
                        ease: 'linear',
                      }}
                    />
                  ))}
                  {[0.2, 0.6].map((delay) => (
                    <motion.div
                      key={`up-${delay}`}
                      className="absolute w-2 h-2 bg-emerald-600 border border-emerald-600"
                      style={{ left: '50%', transform: 'translateX(-50%)' }}
                      initial={{ top: '100%', opacity: 0 }}
                      animate={{
                        top: ['100%', '0%'],
                        opacity: [0, 1, 1, 0],
                      }}
                      transition={{
                        duration: 1.2,
                        delay: delay,
                        repeat: Infinity,
                        repeatDelay: 1.0,
                        ease: 'linear',
                      }}
                    />
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
    
                className="w-full"
              >
                <div className="relative p-6 border border-emerald-600/30 bg-immix-dark/40 backdrop-blur">
                  <div className="absolute -top-3 left-8 px-2 bg-immix-darker">
                    <div className="flex items-center gap-2 text-xs text-emerald-600 font-mono">
                      <Server size={14} />
                      <span>GATEWAY</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 mt-2">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 }}
          
                      className="w-16 h-16 bg-emerald-600/10 border-2 border-emerald-600/40 flex items-center justify-center flex-shrink-0"
                    >
                      <Shield className="text-emerald-600" size={32} />
                    </motion.div>
                    <div className="flex-1">
                      <p className="text-base text-white/90 font-mono mb-2 font-semibold">Private Connection Bridge</p>
                      <p className="text-xs text-white/60 font-mono leading-relaxed">
                        Direct integration into internal tech stacks. Consolidate internal models, treasury, and data workflows into unified sequencer workflows.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="lg:hidden space-y-8">
            {[
              {
                title: 'Private Connection Bridge',
                icon: Server,
                color: 'cyan',
                items: ['Direct API', 'Access Layer', 'Secure', 'Private'],
                desc: 'Secure • Private • Fast',
              },
              {
                title: 'Custody Layer',
                icon: Lock,
                color: 'purple',
                items: ['Fireblocks', 'Copper', 'Hex Trust', 'Anchorage'],
                desc: 'MPC • Cold Storage • Compliance',
              },
              {
                title: 'Liquidity Venues',
                icon: TrendingUp,
                color: 'blue',
                items: ['Binance', 'Coinbase', 'Kraken', 'CME', 'OKX', 'Bybit'],
                desc: 'CEX • DEX • OTC • DMA',
              },
            ].map((zone, i) => (
              <AnimatedElement key={zone.title} type="fadeInUp" delay={i * 0.2}>
                <div className="relative p-6 border border-white/10 bg-immix-dark/40">
                  <div className="absolute -top-3 left-4 px-2 bg-immix-darker">
                    <div className="flex items-center gap-2">
                      <zone.icon
                        className={
                          zone.color === 'purple'
                            ? 'text-immix-purple'
                            : zone.color === 'cyan'
                            ? 'text-cyan-400'
                            : 'text-immix-blue'
                        }
                        size={14}
                      />
                      <h3 className="text-xs font-mono uppercase">{zone.title}</h3>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {zone.items.map((item) => (
                      <div
                        key={item}
                        className={`px-3 py-2 text-xs font-mono ${
                          zone.color === 'purple'
                            ? 'bg-immix-purple/5 border border-immix-purple/20'
                            : zone.color === 'cyan'
                            ? 'bg-cyan-500/5 border border-cyan-500/20'
                            : 'bg-immix-blue/5 border border-immix-blue/20'
                        }`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10">
                    <p className="text-xs text-white/40 font-mono">{zone.desc}</p>
                  </div>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </motion.div>

        <AnimatedElement type="fadeInUp">
          <div className="text-center pt-8 border-t border-white/10 space-y-6">
            <p className="text-white/60 text-sm max-w-2xl mx-auto font-mono">
              IMMIX works alongside your existing systems as a complementary infrastructure layer. With a <span className="text-immix-blue">non-custodial</span> architecture, you integrate our platform into your workflow without replacing what already works—maintaining full control of your digital assets.
            </p>
            <div>
              <Button
                variant="secondary"
                href="https://docs.immix.xyz/core/exchanges"
                icon={<ExternalLink size={18} />}
              >
                View All Integrations
              </Button>
            </div>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
};

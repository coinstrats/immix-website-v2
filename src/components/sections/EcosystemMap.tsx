import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Lock, Zap, TrendingUp, Shield, Terminal, Network, Database, Server, Building2, Crown, Play } from 'lucide-react';
import { AnimatedElement } from '../ui';
import {
  LeftHorizontalConnector,
  RightHorizontalConnector,
  VerticalConnector,
  SequencerInternalAnimation,
} from './EcosystemConnectors';

const CUSTODY_PROVIDERS = ['Fireblocks', 'Copper', 'Ripple Custody', 'Anchorage', 'BitGo'];
const VENUES = ['Binance', 'Coinbase', 'Jane Street', 'CME', 'Hyperliquid', 'Polymarket', 'Deribit'];
const VENUE_CATEGORIES = 'CEX \u2022 DEX \u2022 OTC \u2022 DMA \u2022 PRIME';

const STATS = [
  { value: '1M+', label: 'Messages / Second' },
  { value: '0', label: 'Downtime Upgrades' },
  { value: '5\u00B5s', label: 'Round-Trip Latency' },
  { value: '~10ms', label: 'Failover Recovery' },
  { value: '365/24/7', label: 'Operations' },
];

const CONFERENCES = [
  { name: 'AIIB Beijing', short: 'AIIB', url: 'https://www.aiib.org/en/index.html' },
  { name: 'QuantMinds International', short: 'QuantMinds', url: 'https://informaconnect.com/quantminds-international/' },
  { name: 'Aeron', short: 'Aeron', url: 'https://aeron.io/' },
];

const GATEWAY_TEXT = 'Bridge your internal systems directly into the core sequencer. Models, treasury operations, and proprietary data streams are consolidated into a unified, fault-tolerant sequenced stream for maximum operational efficiency.';

const StatCards = () => (
  <AnimatedElement type="fadeInUp" delay={0.2}>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4 max-w-5xl mx-auto items-stretch">
      {STATS.map((stat, i) => (
        <AnimatedElement key={stat.label} type="fadeInUp" delay={0.25 + i * 0.08} className="h-full">
          <div className="relative p-4 lg:p-5 border border-white/10 bg-immix-dark/40 backdrop-blur text-center group hover:border-immix-blue/30 transition-colors h-full flex flex-col items-center justify-center">
            <p className="text-2xl lg:text-3xl font-mono font-bold text-immix-blue mb-1 tabular-nums">
              {stat.value}
            </p>
            <p className="text-[10px] lg:text-xs font-mono text-white/50 uppercase tracking-wider leading-tight">
              {stat.label}
            </p>
          </div>
        </AnimatedElement>
      ))}
    </div>
  </AnimatedElement>
);

const CustodyPanel = () => (
  <div className="col-span-3 space-y-4">
    <div className="relative p-6 border border-immix-purple/30 bg-immix-dark/40 backdrop-blur">
      <div className="absolute -top-3 left-4 px-2 bg-immix-darker">
        <div className="flex items-center gap-2 text-xs text-immix-purple font-mono">
          <Lock size={14} />
          <span>CUSTODY</span>
        </div>
      </div>

      <div className="space-y-2 mt-2">
        {CUSTODY_PROVIDERS.map((item) => (
          <div
            key={item}
            className="flex items-center gap-2 px-3 py-2 bg-immix-purple/5 border border-immix-purple/20 text-xs font-mono text-white/70 hover:bg-immix-purple/10 hover:border-immix-purple/30 transition-colors"
          >
            <Building2 size={14} className="text-white/40" />
            {item}
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-white/10">
        <p className="text-xs text-white/40 font-mono">
          MPC &bull; Cold Storage &bull; Compliance
        </p>
      </div>
    </div>
  </div>
);

const VenuesPanel = () => (
  <div className="col-span-3 space-y-4">
    <div className="relative p-6 border border-immix-blue/30 bg-immix-dark/40 backdrop-blur">
      <div className="absolute -top-3 right-4 px-2 bg-immix-darker">
        <div className="flex items-center gap-2 text-xs text-immix-blue font-mono">
          <span>VENUES</span>
          <TrendingUp size={14} />
        </div>
      </div>

      <div className="space-y-2 mt-2">
        {VENUES.map((item) => (
          <div
            key={item}
            className="flex items-center gap-2 px-3 py-2 bg-immix-blue/5 border border-immix-blue/20 text-xs font-mono text-white/70 hover:bg-immix-blue/10 hover:border-immix-blue/30 transition-colors"
          >
            <Building2 size={14} className="text-white/40" />
            {item}
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-white/10">
        <p className="text-xs text-white/40 font-mono">{VENUE_CATEGORIES}</p>
      </div>
    </div>
  </div>
);

const SequencerCore = ({ inView }: { inView: boolean }) => (
  <div className="col-span-4 relative">
    <div className="relative p-8 border-2 border-immix-blue/50 bg-immix-dark/60 backdrop-blur">
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 bg-immix-darker">
        <div className="text-xs font-mono text-immix-blue flex items-center gap-2">
          <span className="w-2 h-2 bg-immix-blue animate-pulse"></span>
          <span>CORE CLUSTER</span>
          <span className="w-2 h-2 bg-immix-blue animate-pulse"></span>
        </div>
      </div>

      <div className="text-center mb-8 mt-2">
        <h3 className="font-bold text-2xl mb-1 text-white">Sequencer</h3>
        <p className="text-xs text-white/60 font-mono">RAFT Consensus &bull; 1M+ msg/s &bull; 5&mu;s latency</p>
      </div>

      <div className="flex flex-col items-center relative h-64 mb-6">
        <SequencerInternalAnimation inView={inView} />

        <div className="absolute top-2 left-0 right-0 flex justify-center" style={{ zIndex: 20 }}>
          <div className="w-24 h-24 bg-white border-2 border-white/60 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.3)]">
            <div className="text-center">
              <Zap className="text-immix-dark mx-auto" size={24} />
              <div className="text-xs font-mono text-immix-dark/90 mt-1 font-bold">S1</div>
              <div className="text-[10px] font-mono text-immix-dark/60 font-semibold">Leader</div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-16" style={{ zIndex: 10 }}>
          <div className="w-20 h-20 bg-slate-900 border-2 border-slate-700 flex items-center justify-center">
            <div className="text-center">
              <Zap className="text-slate-400 mx-auto" size={20} />
              <div className="text-xs font-mono text-slate-400 mt-1 font-bold">S2</div>
              <div className="text-[10px] font-mono text-slate-500 font-semibold">Follower</div>
            </div>
          </div>

          <div className="w-20 h-20 bg-slate-900 border-2 border-slate-700 flex items-center justify-center">
            <div className="text-center">
              <Zap className="text-slate-400 mx-auto" size={20} />
              <div className="text-xs font-mono text-slate-400 mt-1 font-bold">S3</div>
              <div className="text-[10px] font-mono text-slate-500 font-semibold">Follower</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
        {[
          { label: 'Risk Books', icon: Network, metric: 'Strategy Pods' },
          { label: 'Business Logic', icon: Terminal, metric: 'SDK' },
          { label: 'Data Lab', icon: Database, metric: '360 Insights' },
        ].map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.label}
              className="p-3 bg-immix-blue/5 border border-immix-blue/30 hover:bg-immix-blue/10 transition-colors"
            >
              <Icon className="text-immix-blue mb-2" size={16} />
              <p className="text-xs font-semibold text-white/80 leading-tight mb-1">{feature.label}</p>
              <p className="text-xs text-immix-blue/60 font-mono">{feature.metric}</p>
            </div>
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
  </div>
);

const GatewaySection = ({ inView }: { inView: boolean }) => (
  <div className="hidden lg:grid grid-cols-12 gap-6 -mt-8">
    <div className="col-start-3 col-span-8 flex flex-col items-center">
      <VerticalConnector inView={inView} />

      <div className="w-full">
        <div className="relative p-6 border border-emerald-600/30 bg-immix-dark/40 backdrop-blur">
          <div className="absolute -top-3 left-8 px-2 bg-immix-darker">
            <div className="flex items-center gap-2 text-xs text-emerald-600 font-mono">
              <Server size={14} />
              <span>GATEWAY</span>
            </div>
          </div>

          <div className="flex items-center gap-6 mt-2">
            <div className="w-16 h-16 bg-emerald-600/10 border-2 border-emerald-600/40 flex items-center justify-center flex-shrink-0">
              <Shield className="text-emerald-600" size={32} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <p className="text-base text-white/90 font-mono font-semibold">Private Connection Bridge</p>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-amber-500/10 border border-amber-500/40 text-amber-400 text-[10px] font-mono font-semibold uppercase tracking-wider">
                  <Crown size={10} />
                  Enterprise
                </span>
              </div>
              <p className="text-xs text-white/60 font-mono leading-relaxed">
                {GATEWAY_TEXT}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const MobileLayout = () => (
  <div className="lg:hidden space-y-8">
    <div className="grid grid-cols-2 gap-3">
      {STATS.map((stat) => (
        <div key={stat.label} className="p-3 border border-white/10 bg-immix-dark/40 text-center">
          <p className="text-xl font-mono font-bold text-immix-blue tabular-nums">{stat.value}</p>
          <p className="text-[9px] font-mono text-white/50 uppercase tracking-wider mt-1">{stat.label}</p>
        </div>
      ))}
    </div>

    {[
      {
        title: 'Private Connection Bridge',
        icon: Server,
        color: 'cyan' as const,
        items: ['Direct API', 'Access Layer', 'Secure', 'Private'],
        desc: 'Secure \u2022 Private \u2022 Fast',
        enterprise: true,
      },
      {
        title: 'Custody Layer',
        icon: Lock,
        color: 'purple' as const,
        items: ['Fireblocks', 'Copper', 'Ripple Custody', 'Anchorage'],
        desc: 'MPC \u2022 Cold Storage \u2022 Compliance',
      },
      {
        title: 'Liquidity Venues',
        icon: TrendingUp,
        color: 'blue' as const,
        items: ['Binance', 'Coinbase', 'Jane Street', 'CME', 'Hyperliquid', 'Polymarket'],
        desc: VENUE_CATEGORIES,
      },
    ].map((zone) => (
      <div key={zone.title} className="relative p-6 border border-white/10 bg-immix-dark/40">
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
            {'enterprise' in zone && zone.enterprise && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-amber-500/10 border border-amber-500/40 text-amber-400 text-[9px] font-mono font-semibold uppercase">
                <Crown size={8} />
                Enterprise
              </span>
            )}
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
    ))}

    <div className="text-center space-y-4 pt-4">
      <p className="text-xs text-white/40 font-mono">{GATEWAY_TEXT}</p>
    </div>
  </div>
);

const VideoAndConferences = () => (
  <AnimatedElement type="fadeInUp" delay={0.15}>
    <div className="pt-12 space-y-8">
      <div className="flex justify-center">
        <a
          href="https://www.youtube.com/watch?v=dqQvHgqOuc4"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 px-5 py-3 border border-white/10 bg-immix-dark/40 hover:border-immix-blue/40 hover:bg-immix-blue/5 transition-all duration-300"
        >
          <span className="flex items-center justify-center w-8 h-8 bg-immix-blue/10 border border-immix-blue/30 group-hover:bg-immix-blue/20 transition-colors">
            <Play size={14} className="text-immix-blue" />
          </span>
          <span className="text-sm font-mono text-white/70 group-hover:text-white/90 transition-colors">
            Watch: Fault-Tolerant Sequencer Architecture
          </span>
        </a>
      </div>

      <div className="text-center space-y-5">
        <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">Presented At</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
          {CONFERENCES.map((conf) => (
            <a
              key={conf.name}
              href={conf.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-4 py-2 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500"
            >
              <div className="w-8 h-8 border border-white/20 bg-white/5 flex items-center justify-center text-xs font-mono font-bold text-white/40 group-hover:text-white/80 group-hover:border-white/40 transition-all">
                {conf.short.charAt(0)}
              </div>
              <span className="text-xs font-mono text-white/40 group-hover:text-white/70 transition-colors whitespace-nowrap">
                {conf.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  </AnimatedElement>
);

export const EcosystemMap = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });

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
            <h2 className="text-4xl md:text-5xl font-bold">Your Operational Edge, Unified</h2>
            <div className="mt-4 mx-auto w-16 h-[2px] bg-gradient-to-r from-transparent via-immix-blue to-transparent" />
          </AnimatedElement>
          <AnimatedElement type="fadeInUp" delay={0.1}>
            <p className="text-lg text-white/60 max-w-3xl mx-auto leading-relaxed">
              One sequenced stream designed for continuous operations and native AI agent integration. Every custodian, every venue, every rule &mdash; unified into deterministic, fault-tolerant execution at microsecond latency, running 365/24/7.
            </p>
          </AnimatedElement>
        </div>

        <StatCards />

        <div ref={sectionRef} className="relative">
          <div className="hidden lg:grid grid-cols-12 gap-6 items-center py-16">
            <CustodyPanel />
            <LeftHorizontalConnector inView={inView} />
            <SequencerCore inView={inView} />
            <RightHorizontalConnector inView={inView} />
            <VenuesPanel />
          </div>

          <GatewaySection inView={inView} />
          <MobileLayout />
        </div>

        <VideoAndConferences />
      </div>
    </section>
  );
};

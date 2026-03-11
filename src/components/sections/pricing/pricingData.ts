import type { ElementType } from 'react';
import {
  Layers,
  Rocket,
  Shield,
  Clock,
  Zap,
  Gauge,
  Cpu,
  Server,
  Lock,
  Headphones,
  ShieldCheck,
} from 'lucide-react';

export type TierColor = 'blue' | 'teal' | 'amber' | 'slate' | 'emerald';

export interface PrimaryCard {
  icon: ElementType;
  title: string;
  subtitle: string;
  pricingLabel: string;
  pricingNote?: string;
  description: string;
  bullets: string[];
  cta: string;
  ctaHref: string;
  tags?: { icon: ElementType; label: string }[];
  tierColor: TierColor;
  highlighted: boolean;
}

export interface BillingMeter {
  icon: ElementType;
  title: string;
  description: string;
}

export interface WorkloadProfile {
  eyebrow: string;
  title: string;
  pricingNote: string;
  description: string;
  bullets: string[];
  badge: string;
  tierColor: TierColor;
}

export interface ExplainerItem {
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export const pricingHero = {
  eyebrow: 'Pricing',
  headline: 'Infrastructure pricing.',
  subhead:
    'Predictable pricing that scales with your business. Pay for infrastructure consumed \u2014 runtime, execution, throughput, and inference \u2014 not basis points on flow.',
};

export const foundingBanner = {
  prefix: 'Founding terms available through',
  highlightDate: 'June 30, 2026',
  suffix:
    '\u2014 usage-based pricing for new deployments, with managed programs for startups and enterprise.',
};

export const primaryCards: PrimaryCard[] = [
  {
    icon: Layers,
    title: 'Core',
    subtitle: 'Usage-based access to IMMIX infrastructure',
    pricingLabel: 'Usage-based',
    pricingNote: 'Founding terms available',
    description:
      'For teams building on shared infrastructure through UI, SDK, or API.',
    bullets: [
      'Markets, Trade, Connect, Transfers, Earn, and Lab',
      'Shared sequencer access',
      'UI, SDK, and API access',
      'Standard execution and automation primitives',
      'Billing based on runtime, execution ops, throughput, and inference',
    ],
    cta: 'Get Started',
    ctaHref: 'https://app.immix.xyz',
    tierColor: 'blue',
    highlighted: true,
  },
  {
    icon: Rocket,
    title: 'Startup Program',
    subtitle: 'Backed infrastructure for early-stage teams',
    pricingLabel: 'Apply',
    description:
      'For early-stage funds, fintechs, protocols, and ambitious new teams building on programmable market infrastructure.',
    bullets: [
      'Full Core access',
      'Reduced or waived minimums for an initial term',
      'Sponsored platform usage',
      'Onboarding and architecture support',
      'Early access to new platform capabilities',
    ],
    cta: 'Apply Now',
    ctaHref: 'mailto:sales@immix.xyz',
    tags: [
      { icon: Zap, label: 'Up to $30,000 sponsored usage' },
      { icon: Clock, label: '6 months of support' },
      { icon: ShieldCheck, label: 'Full platform access' },
    ],
    tierColor: 'teal',
    highlighted: false,
  },
  {
    icon: Shield,
    title: 'Enterprise',
    subtitle: 'Reserved performance, control, and custom terms',
    pricingLabel: 'Custom',
    description:
      'For institutions running at scale with strict latency, control, security, and operational requirements.',
    bullets: [
      'Committed-spend discounts',
      'Reserved throughput and low-latency lanes',
      'Private Connection Bridge and dedicated connectivity',
      'SLA, security, compliance, and white-glove support',
      'Custom commercial and deployment terms',
    ],
    cta: 'Talk to Sales',
    ctaHref: 'mailto:sales@immix.xyz',
    tags: [
      { icon: Server, label: 'Dedicated connectivity' },
      { icon: Lock, label: 'Private Connection Bridge' },
      { icon: Gauge, label: 'Low-latency SDKs' },
      { icon: Headphones, label: 'Dedicated success manager' },
    ],
    tierColor: 'amber',
    highlighted: false,
  },
];

export const billingMeters: BillingMeter[] = [
  {
    icon: Clock,
    title: 'Runtime',
    description:
      'Dashboards, algos, agents, and workflows while active.',
  },
  {
    icon: Zap,
    title: 'Execution ops',
    description:
      'Submits, amends, cancels, transfers, allocations, and other state-changing actions.',
  },
  {
    icon: Gauge,
    title: 'Reserved throughput',
    description:
      'Sustained and burst messaging capacity, plus priority lanes for low-latency workloads.',
  },
  {
    icon: Cpu,
    title: 'Inference & batch compute',
    description:
      'Predictors, AI agents, backtests, heavy analytics, and other compute-intensive jobs.',
  },
];

export const workloadProfiles: WorkloadProfile[] = [
  {
    eyebrow: 'Typical workload',
    title: 'Lite',
    pricingNote: 'From $500 / month during founding period',
    description:
      'For analysts and teams needing view-heavy access to markets and data.',
    bullets: [
      'Markets analytics dashboard',
      'View-focused trade workspaces',
      'Read-only market data API',
      'Python SDK',
      'Real-time data streaming',
      '7-day historical data',
    ],
    badge: 'Read-heavy',
    tierColor: 'slate',
  },
  {
    eyebrow: 'Typical workload',
    title: 'Pro',
    pricingNote: 'From $2,500 / month during founding period',
    description:
      'For traders and funds running active execution and managed strategies.',
    bullets: [
      'Simple order types',
      'Advanced multi-instrument order types',
      'Full trade API',
      'Post-trade analytics',
      'Managed execution workflows',
    ],
    badge: 'Execution-heavy',
    tierColor: 'emerald',
  },
  {
    eyebrow: 'Typical workload',
    title: 'Ultra',
    pricingNote: 'From $5,000 / month during founding period',
    description:
      'For institutions running continuous workflows, automation, and advanced operations.',
    bullets: [
      'Continuous workflows',
      'Full risk API access',
      'Risk models and analytics',
      'Earn access',
      'Advanced automation and coordination',
    ],
    badge: 'Continuous operations',
    tierColor: 'blue',
  },
];

export const executionPricing: ExplainerItem[] = [
  {
    title: 'Direct execution',
    description:
      'Market, limit, stop, peg, submit, amend, and cancel actions are billed as execution operations.',
  },
  {
    title: 'Managed execution',
    description:
      'TWAP, VWAP, spreaders, portfolio execution, and smart routing are billed as active strategy runtime plus child execution ops.',
  },
  {
    title: 'Continuous workflows',
    description:
      'Market making, continuous hedging, treasury automation, yield allocation, and risk agents are billed as workflow runtime plus execution ops and reserved throughput where applicable.',
  },
];

export const connectivityPricing: ExplainerItem[] = [
  {
    title: 'Shared lane',
    description:
      'Included in Core for dashboards, read-heavy usage, and lighter execution workloads.',
  },
  {
    title: 'Reserved lane',
    description:
      'Available for sustained message rates, burst envelopes, and more demanding algo execution.',
  },
  {
    title: 'Dedicated / Private lane',
    description:
      'Enterprise-grade dedicated connectivity, Private Connection Bridge, and custom routing for institutions with strict latency and control requirements.',
  },
];

export const faqItems: FAQItem[] = [
  {
    question: "Why don't you charge basis points?",
    answer:
      'Basis point pricing misaligns incentives \u2014 it taxes customer performance. We charge for infrastructure consumed: runtime, execution ops, throughput, and compute. Your alpha is yours.',
  },
  {
    question: 'What counts as runtime?',
    answer:
      'Any active session \u2014 dashboards, running algos, live agents, or workflow processes. Idle resources are not billed.',
  },
  {
    question: 'How are advanced order types billed?',
    answer:
      'Managed execution strategies like TWAP, VWAP, and portfolio orders are billed as strategy runtime plus child execution ops. Simple orders are billed as single execution ops.',
  },
  {
    question: 'When do I need reserved throughput?',
    answer:
      'When your workloads require sustained message rates or burst capacity beyond shared lane limits \u2014 typically for algo execution, market making, or high-frequency data consumption.',
  },
  {
    question: 'What does Enterprise unlock?',
    answer:
      'Committed-spend pricing, reserved throughput, Private Connection Bridge, dedicated connectivity, SLAs, compliance support, and a dedicated success manager. Custom terms for institutions running at scale.',
  },
];

export const tierColors = {
  blue: {
    icon: 'bg-immix-blue/20 text-immix-blue',
    check: 'text-immix-blue',
    accent: 'from-blue-500 to-blue-400',
    hoverShadow: 'hover:shadow-[0_0_30px_rgba(0,115,255,0.15)]',
    glow: 'from-immix-blue/10 via-transparent to-transparent',
    tag: 'bg-immix-blue/[0.06] border-immix-blue/15',
    tagIcon: 'text-immix-blue/70',
    ctaHighlighted:
      'bg-immix-blue/15 border border-immix-blue/40 text-immix-blue hover:bg-immix-blue/25 hover:border-immix-blue/60',
    ctaDefault:
      'border border-white/15 text-white/70 hover:border-white/30 hover:text-white/90',
    badge: 'bg-immix-blue/10 text-immix-blue/80 border-immix-blue/20',
  },
  teal: {
    icon: 'bg-teal-500/20 text-teal-400',
    check: 'text-teal-400',
    accent: 'from-teal-500 to-teal-400',
    hoverShadow: 'hover:shadow-[0_0_30px_rgba(20,184,166,0.12)]',
    glow: 'from-teal-400/10 via-transparent to-transparent',
    tag: 'bg-teal-500/[0.06] border-teal-500/15',
    tagIcon: 'text-teal-400/70',
    ctaHighlighted:
      'bg-teal-500/15 border border-teal-500/40 text-teal-400 hover:bg-teal-500/25 hover:border-teal-400',
    ctaDefault:
      'border border-teal-500/40 text-teal-400 hover:border-teal-400 hover:bg-teal-500/10',
    badge: 'bg-teal-500/10 text-teal-400/80 border-teal-500/20',
  },
  amber: {
    icon: 'bg-amber-500/20 text-amber-400',
    check: 'text-amber-400',
    accent: 'from-amber-500 to-amber-400',
    hoverShadow: 'hover:shadow-[0_0_30px_rgba(245,158,11,0.12)]',
    glow: 'from-amber-400/8 via-transparent to-transparent',
    tag: 'bg-amber-500/[0.06] border-amber-500/15',
    tagIcon: 'text-amber-400/70',
    ctaHighlighted:
      'bg-amber-500/15 border border-amber-500/40 text-amber-400 hover:bg-amber-500/25 hover:border-amber-400',
    ctaDefault:
      'border border-amber-500/40 text-amber-400 hover:border-amber-400 hover:bg-amber-500/10',
    badge: 'bg-amber-500/10 text-amber-400/80 border-amber-500/20',
  },
  slate: {
    icon: 'bg-slate-500/20 text-slate-300',
    check: 'text-slate-400',
    accent: 'from-slate-500 to-slate-400',
    hoverShadow: 'hover:shadow-[0_0_20px_rgba(148,163,184,0.06)]',
    glow: 'from-slate-400/5 via-transparent to-transparent',
    tag: 'bg-slate-500/[0.06] border-slate-500/15',
    tagIcon: 'text-slate-400/70',
    ctaHighlighted:
      'border border-white/15 text-white/70 hover:border-white/30 hover:text-white/90',
    ctaDefault:
      'border border-white/15 text-white/70 hover:border-white/30 hover:text-white/90',
    badge: 'bg-slate-500/10 text-slate-300/80 border-slate-500/20',
  },
  emerald: {
    icon: 'bg-emerald-500/20 text-emerald-400',
    check: 'text-emerald-400',
    accent: 'from-emerald-500 to-emerald-400',
    hoverShadow: 'hover:shadow-[0_0_20px_rgba(16,185,129,0.08)]',
    glow: 'from-emerald-400/5 via-transparent to-transparent',
    tag: 'bg-emerald-500/[0.06] border-emerald-500/15',
    tagIcon: 'text-emerald-400/70',
    ctaHighlighted:
      'border border-white/15 text-white/70 hover:border-white/30 hover:text-white/90',
    ctaDefault:
      'border border-white/15 text-white/70 hover:border-white/30 hover:text-white/90',
    badge: 'bg-emerald-500/10 text-emerald-400/80 border-emerald-500/20',
  },
};

import {
  BarChart3,
  Zap,
  Landmark,
  Search,
  TrendingUp,
  Shield,
  Rocket,
  Bot,
  Activity,
  Wallet,
  Cpu,
} from 'lucide-react';

export interface UseCasesHero {
  eyebrow: string;
  headline: string;
  subheadline: string;
  supportLine: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  anchorChips: { label: string; anchor: string }[];
}

export interface FeaturedUseCase {
  title: string;
  audience: string;
  problem: string;
  solution: string;
  value: string[];
  tags: string[];
  cta: { label: string; href: string };
  anchorId: string;
  icon: React.ElementType;
}

export interface BuildBlock {
  title: string;
  description: string;
}

export interface AudienceCard {
  title: string;
  bestFor: string;
  brokenToday: string;
  withImmix: string;
  value: string;
  icon: React.ElementType;
}

export interface FutureTile {
  title: string;
  description: string;
  icon: React.ElementType;
}

export interface FinalCta {
  headline: string;
  subcopy: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

export interface HomepagePreviewCard {
  title: string;
  audienceLine: string;
  shortCopy: string;
  cta: { label: string; href: string };
}

export const useCasesHero: UseCasesHero = {
  eyebrow: 'USE CASES',
  headline: 'Built for every team managing tokenized assets.',
  subheadline:
    'Analyze markets, execute strategies, move value, allocate capital, and build new products on top of one programmable infrastructure layer.',
  supportLine:
    'From dashboards and trading desks today to treasury, payments, and AI-native capital operations tomorrow.',
  primaryCta: { label: 'Get Started', href: 'https://app.immix.xyz' },
  secondaryCta: { label: 'View Pricing', href: '/#pricing' },
  anchorChips: [
    { label: 'Analyze Markets', anchor: '#analyze-markets' },
    { label: 'Execute Strategies', anchor: '#execute-strategies' },
    { label: 'Operate Treasury', anchor: '#operate-treasury' },
    { label: 'Embedded Products', anchor: '#who-builds' },
    { label: 'Risk & Operations', anchor: '#who-builds' },
    { label: 'AI-Native Capital', anchor: '#ai-era' },
  ],
};

export const featuredUseCases: FeaturedUseCase[] = [
  {
    title: 'Analyze markets',
    audience:
      'Analysts, researchers, media teams, risk teams, operational analysts',
    problem:
      'Tokenized market data is fragmented across venues, custodians, instruments, and workflows. Teams waste time stitching together feeds, dashboards, and historical data before they can act on insight.',
    solution:
      'IMMIX unifies live data streaming, historical analytics, normalized instruments, and strategy-ready dashboards through UI, SDK, and API.',
    value: [
      'Less data engineering overhead',
      'Faster research and monitoring',
      'Cleaner reporting and market intelligence',
      'Easier publishing, alerting, and internal analysis',
    ],
    tags: ['Markets', 'Lab', 'API', 'SDK', 'UI'],
    cta: { label: 'Explore market intelligence', href: '#analyze-markets' },
    anchorId: 'analyze-markets',
    icon: BarChart3,
  },
  {
    title: 'Execute strategies',
    audience:
      'Traders, quant traders, hedge funds, institutional desks, market makers',
    problem:
      'Execution is fragmented across venues and connectors. Every workflow becomes a custom engineering problem, and scaling from manual trading to automation is slow and operationally heavy.',
    solution:
      'IMMIX provides one programmable execution surface with order tooling, advanced routing, continuous workflows, and deterministic sequencing.',
    value: [
      'Launch strategies faster',
      'Trade across venues through one layer',
      'Automate hedging, routing, and rebalancing',
      'Scale from discretionary to systematic execution',
    ],
    tags: ['Trade', 'Connect', 'API', 'SDK'],
    cta: { label: 'Explore execution workflows', href: '#execute-strategies' },
    anchorId: 'execute-strategies',
    icon: Zap,
  },
  {
    title: 'Operate treasury',
    audience:
      'Asset managers, family offices, treasuries, banks, fintechs, payments companies',
    problem:
      'Transfers, treasury allocation, yield access, and cross-platform value movement are still fragmented and operationally manual.',
    solution:
      'IMMIX enables programmable transfers, capital routing, yield allocation, and always-on treasury workflows through one infrastructure layer.',
    value: [
      'Better capital efficiency',
      'Fewer manual operational steps',
      'Faster movement of value',
      'Easier product-building for treasury and payments use cases',
    ],
    tags: ['Transfers', 'Earn', 'Connect', 'API', 'SDK'],
    cta: { label: 'Explore treasury workflows', href: '#operate-treasury' },
    anchorId: 'operate-treasury',
    icon: Landmark,
  },
];

export const buildBlocksHeader = {
  eyebrow: 'HOW IT WORKS',
  headline: 'One infrastructure layer. Three building blocks.',
  subcopy:
    'Use IMMIX through the interface of your choice, then combine data, execution, and continuous workflows into whatever operating model your team needs.',
  supportLine:
    'Start with dashboards. Scale to automation. Embed IMMIX into your own products.',
};

export const buildBlocks: BuildBlock[] = [
  {
    title: 'Stream the market',
    description:
      'Consume normalized real-time and historical data across venues, instruments, and operational events.',
  },
  {
    title: 'Execute actions',
    description:
      'Submit, amend, cancel, route, transfer, allocate, and coordinate value movement through one programmable surface.',
  },
  {
    title: 'Run continuous workflows',
    description:
      'Keep strategies, hedging, treasury, risk logic, and AI-driven processes running on always-on infrastructure.',
  },
];

export const interfaceModes = ['UI', 'SDK', 'API'];

export const audienceHeader = {
  eyebrow: 'WHO BUILDS WITH IMMIX',
  headline: 'Built for teams across the tokenized asset stack.',
  subcopy:
    'IMMIX serves current demand in trading and analytics, while extending naturally into treasury, payments, and software-native capital operations.',
};

export const audienceUseCases: AudienceCard[] = [
  {
    title: 'Analysts & Researchers',
    bestFor: 'Research teams, strategists, media, intelligence desks',
    brokenToday:
      'Too many fragmented sources. Too much manual normalization. Not enough time spent on insight.',
    withImmix:
      'Live and historical market intelligence through one surface.',
    value: 'Faster insight, cleaner monitoring, less data wrangling.',
    icon: Search,
  },
  {
    title: 'Traders & Quant Desks',
    bestFor: 'Discretionary traders, systematic desks, quant teams',
    brokenToday:
      'Execution logic is spread across venue-specific tooling and custom connector code.',
    withImmix:
      'Unified execution, routing, and automation across tokenized markets.',
    value: 'Faster deployment, cleaner control, easier scaling.',
    icon: TrendingUp,
  },
  {
    title: 'Market Makers & Institutional Desks',
    bestFor:
      'Low-latency desks, professional liquidity providers, institutional execution teams',
    brokenToday:
      'Continuous quoting, hedging, and inventory control require tight operational loops and resilient messaging.',
    withImmix:
      'Sequenced messaging, continuous workflows, and infrastructure built for always-on execution.',
    value:
      'More reliable operations, tighter control, better performance management.',
    icon: Activity,
  },
  {
    title: 'Asset Managers & Family Offices',
    bestFor: 'Portfolio managers, allocators, treasury teams, family offices',
    brokenToday:
      'Rebalancing, transfers, yield access, and treasury operations are fragmented across tools and venues.',
    withImmix:
      'One stack for execution, transfer, treasury routing, and yield workflows.',
    value: 'Improved capital efficiency and fewer operational bottlenecks.',
    icon: Wallet,
  },
  {
    title: 'Banks, FinTechs & Payments',
    bestFor:
      'Neobanks, investment banks, fintechs, payment companies, embedded-finance builders',
    brokenToday:
      'Teams want tokenized asset and treasury capabilities without building every rail from scratch.',
    withImmix:
      'Embed execution, transfer, treasury, and yield workflows into customer-facing products through API and SDK infrastructure.',
    value: 'Ship faster, reduce infrastructure lift, expand product scope.',
    icon: Landmark,
  },
  {
    title: 'Risk, Portfolio & Operations Teams',
    bestFor:
      'Risk managers, portfolio managers, operations analysts, control teams',
    brokenToday:
      'Monitoring, exposure tracking, transfer coordination, and policy enforcement are too manual and too fragmented.',
    withImmix:
      'Continuous books, workflow logic, analytics, and operational controls on one deterministic stack.',
    value: 'Less manual coordination, better visibility, stronger control.',
    icon: Shield,
  },
  {
    title: 'Startups & Product Builders',
    bestFor:
      'Early-stage companies, builders, product teams launching new financial workflows',
    brokenToday:
      'Small teams cannot afford to build market connectivity, execution, treasury rails, and analytics from scratch.',
    withImmix:
      'Launch on institutional-grade infrastructure without rebuilding the full stack.',
    value: 'Faster time to market and more product leverage.',
    icon: Rocket,
  },
  {
    title: 'AI Agents & Software-Native Treasuries',
    bestFor:
      'AI-native companies, autonomous systems, machine-led workflows, software treasuries',
    brokenToday:
      'Software agents need deterministic ways to observe markets, move value, and operate capital safely.',
    withImmix:
      'One control layer for data, execution, transfer, and continuous automation.',
    value:
      'A credible foundation for agentic finance and machine-native capital operations.',
    icon: Bot,
  },
];

export const futureHeader = {
  eyebrow: 'BUILT FOR THE AI ERA',
  headline: 'Software-native capital operations.',
  subcopy:
    'As software, products, and autonomous systems begin to hold and manage tokenized assets directly, IMMIX provides one deterministic layer to observe markets, move value, and automate capital decisions.',
};

export const futureUseCases: FutureTile[] = [
  {
    title: 'AI agents',
    description:
      'Agents that monitor markets, route execution, rebalance capital, and operate treasury logic.',
    icon: Bot,
  },
  {
    title: 'Embedded treasury products',
    description:
      'Apps and fintech products that need tokenized asset execution, transfer, and yield inside their own experience.',
    icon: Wallet,
  },
  {
    title: 'Machine-native endpoints',
    description:
      'Software-led or device-led systems that need to hold, move, or optimize tokenized assets over time.',
    icon: Cpu,
  },
];

export const finalCta: FinalCta = {
  headline: 'Build on IMMIX.',
  subcopy:
    'Start with shared infrastructure. Scale to reserved performance, deeper automation, and enterprise control.',
  primaryCta: { label: 'Get Started', href: 'https://app.immix.xyz' },
  secondaryCta: { label: 'Talk to Sales', href: 'mailto:sales@immix.xyz' },
};

export const homepagePreviewHeader = {
  eyebrow: 'USE CASES',
  headline: 'From research to execution to treasury.',
  subcopy:
    'IMMIX helps teams analyze markets, automate execution, and operate tokenized asset workflows on one programmable infrastructure layer.',
  bottomCta: { label: 'Explore all use cases', href: '/use-cases' },
};

export const homepagePreviewCards: HomepagePreviewCard[] = [
  {
    title: 'Analyze markets',
    audienceLine: 'For analysts, researchers, media, and risk teams',
    shortCopy:
      'Unify fragmented market data into live dashboards, analytics streams, and research-ready infrastructure.',
    cta: { label: 'Learn more', href: '/use-cases' },
  },
  {
    title: 'Execute strategies',
    audienceLine: 'For traders, quant desks, hedge funds, and market makers',
    shortCopy:
      'Route, trade, hedge, and automate through one deterministic execution layer.',
    cta: { label: 'Learn more', href: '/use-cases' },
  },
  {
    title: 'Operate treasury',
    audienceLine:
      'For asset managers, fintechs, banks, payments teams, and treasuries',
    shortCopy:
      'Transfer value, allocate capital, and access yield through programmable workflows.',
    cta: { label: 'Learn more', href: '/use-cases' },
  },
];

export const audienceChips = [
  'Analysts',
  'Researchers',
  'Traders',
  'Market Makers',
  'Asset Managers',
  'Banks',
  'FinTechs',
  'Treasuries',
  'AI Agents',
];

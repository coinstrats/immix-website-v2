import {
  BarChart3,
  Link,
  ArrowRightLeft,
  TrendingUp,
  FlaskConical,
  ArrowLeftRight,
  LayoutDashboard,
  Code,
  Terminal,
} from 'lucide-react';
import { MarketsVisual } from '../../ui/MarketsVisual';
import { ConnectVisual } from '../../ui/ConnectVisual';
import { TradeVisual } from '../../ui/TradeVisual';
import { PayVisual } from '../../ui/PayVisual';
import { EarnVisual } from '../../ui/EarnVisual';
import { LabVisual } from '../../ui/LabVisual';

export type IntegrationLevel = 'ui' | 'sdk' | 'api';
export type ProductStatus = 'live' | 'coming-soon';

export interface Product {
  id: string;
  name: string;
  icon: React.ElementType;
  tagline: string;
  clientType: string;
  capabilities: string[];
  integrations: IntegrationLevel[];
  accentColor: string;
  accentBg: string;
  accentBorder: string;
  accentHex: string;
  visual: React.ComponentType;
  status: ProductStatus;
  videoSrc?: string;
}

export interface JourneyStage {
  id: string;
  number: string;
  label: string;
  headline: string;
  description: string;
  products: Product[];
}

const markets: Product = {
  id: 'markets',
  name: 'Markets',
  icon: BarChart3,
  tagline: 'Analytics across the derivative term structure, funding rates, and arbitrage opportunities.',
  clientType: 'Researchers & Strategists',
  capabilities: [
    'Term structure analytics',
    'Funding rate monitoring',
    'Arbitrage opportunity detection',
    'Market-wide insights dashboard',
  ],
  integrations: ['ui', 'api'],
  accentColor: 'text-blue-400',
  accentBg: 'bg-blue-500/10',
  accentBorder: 'border-blue-500/30',
  accentHex: '#60a5fa',
  visual: MarketsVisual,
  status: 'live',
  videoSrc: '/market-analytics-showcase.mp4',
};

const connect: Product = {
  id: 'connect',
  name: 'Connect',
  icon: Link,
  tagline: 'One API to the full digital asset ecosystem — crypto, tokenized commodities, stocks, ETFs, and money market funds.',
  clientType: 'Developers & Integration Teams',
  capabilities: [
    'REST, WebSocket & FIX protocols',
    'Crypto & tokenized RWAs',
    'Tokenized ETFs & money markets',
    'Unified streaming & trading',
  ],
  integrations: ['sdk', 'api'],
  accentColor: 'text-cyan-400',
  accentBg: 'bg-cyan-500/10',
  accentBorder: 'border-cyan-500/30',
  accentHex: '#22d3ee',
  visual: ConnectVisual,
  status: 'coming-soon',
};

const trade: Product = {
  id: 'trade',
  name: 'Trade',
  icon: ArrowRightLeft,
  tagline: 'Advanced order types and algos across CeFi, DeFi and RWAs — from multi-leg spreads to continuous hedging.',
  clientType: 'Traders & Fund Managers',
  capabilities: [
    'Multi-leg spreads & portfolio rebalancing',
    'Market making & smart order routing',
    'Continuous hedging of staking rewards',
    'CeFi, DeFi & RWA execution',
  ],
  integrations: ['ui', 'sdk', 'api'],
  accentColor: 'text-emerald-400',
  accentBg: 'bg-emerald-500/10',
  accentBorder: 'border-emerald-500/30',
  accentHex: '#34d399',
  visual: TradeVisual,
  status: 'live',
  videoSrc: '/trading-workspace-tutorial.mp4',
};

const earn: Product = {
  id: 'earn',
  name: 'Earn',
  icon: TrendingUp,
  tagline: 'Yield-bearing strategies exploiting secondary market dislocations for USD stablecoins.',
  clientType: 'Treasuries & Asset Allocators',
  capabilities: [
    'Continuous yield strategies',
    'Stablecoin dislocation capture',
    'BTC, ETH & XRP yield coming soon',
    'Automated position management',
  ],
  integrations: ['ui', 'api'],
  accentColor: 'text-sky-400',
  accentBg: 'bg-sky-500/10',
  accentBorder: 'border-sky-500/30',
  accentHex: '#38bdf8',
  visual: EarnVisual,
  status: 'coming-soon',
};

const lab: Product = {
  id: 'lab',
  name: 'Lab',
  icon: FlaskConical,
  tagline: '360-degree insight to all messages in a deterministic, real-time, fault-tolerant ordered stream.',
  clientType: 'Analysts & Data Teams',
  capabilities: [
    'Market data, risk & trading feeds',
    'Internal analytics streams',
    'Deterministic message ordering',
    'Real-time fault-tolerant replay',
  ],
  integrations: ['ui', 'api'],
  accentColor: 'text-blue-300',
  accentBg: 'bg-blue-400/10',
  accentBorder: 'border-blue-400/30',
  accentHex: '#93c5fd',
  visual: LabVisual,
  status: 'coming-soon',
};

const transfers: Product = {
  id: 'transfers',
  name: 'Transfers',
  icon: ArrowLeftRight,
  tagline: 'Configurable settlement corridors for cross-border transfers via stablecoin transport with minimal slippage.',
  clientType: 'Payment Operators & CFOs',
  capabilities: [
    'Any source-to-target fiat corridor',
    'Stablecoin cross-border transport',
    'Smart order router for speed',
    'Configurable settlement workflows',
  ],
  integrations: ['ui', 'sdk', 'api'],
  accentColor: 'text-teal-400',
  accentBg: 'bg-teal-500/10',
  accentBorder: 'border-teal-500/30',
  accentHex: '#2dd4bf',
  visual: PayVisual,
  status: 'coming-soon',
};

export const journeyStages: JourneyStage[] = [
  {
    id: 'land',
    number: '01',
    label: 'Land',
    headline: 'See the whole market. Then plug in.',
    description: 'Start with full visibility into digital asset markets and a single connection to every venue.',
    products: [markets, connect],
  },
  {
    id: 'expand',
    number: '02',
    label: 'Expand',
    headline: 'Execute and grow.',
    description: 'Move from observation to action — trade across venues and deploy yield strategies.',
    products: [trade, earn],
  },
  {
    id: 'embed',
    number: '03',
    label: 'Embed',
    headline: 'Instrument and settle.',
    description: 'Embed real-time data streams into your stack and build settlement into your products.',
    products: [lab, transfers],
  },
];

export const allProducts: Product[] = journeyStages.flatMap((s) => s.products);

export const featuredProducts: Product[] = [markets, trade];
export const secondaryProducts: Product[] = [connect, earn, transfers, lab];

export const integrationModes = [
  {
    key: 'ui' as IntegrationLevel,
    tier: 'UI',
    label: 'No Code',
    icon: LayoutDashboard,
    description: 'Point-and-click configuration. Compose workflows and deploy directly from the dashboard.',
  },
  {
    key: 'sdk' as IntegrationLevel,
    tier: 'SDK',
    label: 'Low Code',
    icon: Code,
    description: 'Composable libraries in Python, Java, Rust, and C++. Import modules, chain them together, ship faster.',
  },
  {
    key: 'api' as IntegrationLevel,
    tier: 'API',
    label: 'Full Code',
    icon: Terminal,
    description: 'REST, WebSocket, and FIX endpoints. Fully programmable, protocol-level control.',
  },
];

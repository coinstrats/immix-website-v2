import { TrendingUp } from 'lucide-react';
import { SolutionPageLayout } from './SolutionPageLayout';

export const TradingOpsPage = () => {
  return (
    <SolutionPageLayout
      eyebrow="Trading Ops"
      headline="Institutional-grade execution, out of the box."
      subheadline="Smart order routing, algorithmic execution, and consolidated position management across every connected venue — without building an OMS from scratch."
      icon={TrendingUp}
      audiences={['Hedge Funds', 'Prop Trading Desks', 'Market Makers', 'Quantitative Traders', 'OTC Desks']}
      problemTitle="The challenge"
      problems={[
        'Building and maintaining direct integrations to fragmented venues',
        'Developing in-house OMS/EMS with institutional-grade reliability',
        'Managing positions and risk across multiple execution venues',
        'Maintaining low-latency market data across diverse protocols',
        'Scaling infrastructure without proportional engineering headcount',
      ]}
      solutionTitle="With IMMIX"
      solutions={[
        'Pre-built connections to major CEX, DEX, OTC, and DMA venues',
        'Institutional execution infrastructure with 5µs round-trip latency',
        'Consolidated position management with real-time P&L and risk',
        'Normalized market data streams via WebSocket and FIX protocol',
        'Horizontally scalable architecture with zero-downtime upgrades',
      ]}
      engines={[
        {
          name: 'Execution Engine',
          description: 'Route and execute orders across all connected venues with smart order routing, algorithmic strategies, and real-time fill analytics.',
          capabilities: ['Smart order routing', 'Algo execution', 'Position management', 'Fill analytics'],
        },
        {
          name: 'Automation Engine',
          description: 'Define risk rules, rebalancing triggers, and multi-step trading workflows that execute deterministically across your entire stack.',
          capabilities: ['Risk triggers', 'Rebalancing rules', 'Multi-leg strategies', 'Stop-loss automation'],
        },
        {
          name: 'Pricing Engine',
          description: 'Aggregate real-time market data across venues for accurate pricing, spread analysis, and execution benchmarking.',
          capabilities: ['Real-time VWAP', 'Spread analysis', 'Execution benchmarks', 'Historical data'],
        },
      ]}
      useCases={[
        {
          title: 'Multi-venue execution',
          description: 'Split and route orders across venues to minimize market impact and achieve best execution with configurable algo strategies.',
        },
        {
          title: 'Algorithmic trading strategies',
          description: 'Deploy TWAP, VWAP, iceberg, and custom algorithms with full SDK control and real-time strategy monitoring.',
        },
        {
          title: 'Real-time risk monitoring',
          description: 'Monitor exposure, drawdown, and concentration limits in real-time with automated circuit breakers and position alerts.',
        },
        {
          title: 'Market making operations',
          description: 'Maintain two-sided quotes across venues with automated inventory management, spread optimization, and hedge execution.',
        },
      ]}
      otherSolutions={[
        { name: 'Payment Ops', href: '/solutions/payment-ops', description: 'For PSPs, remittance providers, and on/off ramp platforms' },
        { name: 'Treasury Ops', href: '/solutions/treasury-ops', description: 'For asset managers, neo-banks, and fintechs' },
      ]}
      accentColor="blue"
      accentBorder="border-[#0073FF]/20"
      accentBg="bg-[#0073FF]/[0.05]"
      accentText="text-[#0073FF]"
    />
  );
};

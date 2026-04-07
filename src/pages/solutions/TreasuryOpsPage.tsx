import { Landmark } from 'lucide-react';
import { SolutionPageLayout } from './SolutionPageLayout';

export const TreasuryOpsPage = () => {
  return (
    <SolutionPageLayout
      eyebrow="Treasury Ops"
      headline="Consolidated treasury for the digital asset era."
      subheadline="Track balances across custodians and venues, automate rebalancing workflows, and generate compliance-ready reporting — all from a single pane of glass."
      icon={Landmark}
      audiences={['Asset Managers', 'Neo-banks', 'Fintechs', 'Family Offices', 'Corporate Treasuries']}
      problemTitle="The challenge"
      problems={[
        'Tracking balances across multiple custodians, wallets, and venues',
        'Manual rebalancing processes that are slow and error-prone',
        'Generating compliance reports from fragmented data sources',
        'Lack of real-time visibility into total portfolio exposure',
        'Reconciliation overhead consuming senior operational staff time',
      ]}
      solutionTitle="With IMMIX"
      solutions={[
        'Unified balance view across all custodians, wallets, and venues',
        'Automated rebalancing with configurable triggers and guardrails',
        'One-click compliance reporting with full audit trail',
        'Real-time portfolio analytics with mark-to-market pricing',
        'Automated reconciliation with exception detection and alerting',
      ]}
      engines={[
        {
          name: 'Automation Engine',
          description: 'Define rebalancing rules, compliance triggers, and operational workflows that execute automatically based on configurable conditions.',
          capabilities: ['Rebalancing triggers', 'Compliance checks', 'Exception workflows', 'Scheduled operations'],
        },
        {
          name: 'Pricing Engine',
          description: 'Real-time mark-to-market pricing across all held assets. Power NAV calculations, performance reporting, and internal valuations.',
          capabilities: ['NAV calculation', 'Mark-to-market', 'Performance attribution', 'Multi-source pricing'],
        },
        {
          name: 'Execution Engine',
          description: 'Execute rebalancing trades and treasury operations with smart routing that minimizes cost and market impact.',
          capabilities: ['Rebalance execution', 'Cost optimization', 'Settlement tracking', 'Venue selection'],
        },
      ]}
      useCases={[
        {
          title: 'Automated rebalancing',
          description: 'Set portfolio allocation targets and let the platform automatically execute rebalancing trades when thresholds are breached.',
        },
        {
          title: 'Cross-custodian visibility',
          description: 'See all assets across every custodian and venue in real-time. Drill into positions, pending settlements, and historical movements.',
        },
        {
          title: 'Compliance reporting automation',
          description: 'Generate jurisdiction-specific compliance reports on demand with complete audit trails and automated regulatory submissions.',
        },
        {
          title: 'Cash management optimization',
          description: 'Optimize operational float across venues by automating sweep operations and maintaining minimum balance requirements.',
        },
      ]}
      otherSolutions={[
        { name: 'Payment Ops', href: '/solutions/payment-ops', description: 'For PSPs, remittance providers, and on/off ramp platforms' },
        { name: 'Trading Ops', href: '/solutions/trading-ops', description: 'For hedge funds, prop desks, and market makers' },
      ]}
      accentColor="amber"
      accentBorder="border-amber-500/20"
      accentBg="bg-amber-500/[0.05]"
      accentText="text-amber-400"
    />
  );
};

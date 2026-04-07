import { CreditCard } from 'lucide-react';
import { SolutionPageLayout } from './SolutionPageLayout';

export const PaymentOpsPage = () => {
  return (
    <SolutionPageLayout
      eyebrow="Payment Ops"
      headline="Unified payment infrastructure for digital assets."
      subheadline="Connect to every liquidity venue, automate settlement across corridors, and maintain real-time pricing — all through a single integration."
      icon={CreditCard}
      audiences={['PSPs', 'Remittance Providers', 'On/Off Ramp Platforms', 'Payment Gateways', 'Neobanks']}
      problemTitle="The challenge"
      problems={[
        'Managing direct integrations with dozens of liquidity venues',
        'Reconciling settlements across multiple corridors and currencies',
        'Maintaining accurate real-time FX pricing across providers',
        'Meeting compliance requirements across jurisdictions',
        'Building and maintaining custom routing logic in-house',
      ]}
      solutionTitle="With IMMIX"
      solutions={[
        'One API to access all connected venues and liquidity pools',
        'Automated settlement workflows with full audit trails',
        'Real-time pricing aggregation with configurable models',
        'Built-in compliance hooks and jurisdiction-aware routing',
        'Smart order routing optimized for cost, speed, or fill rate',
      ]}
      engines={[
        {
          name: 'Pricing Engine',
          description: 'Aggregate and distribute real-time pricing across every venue. Power client quotes, internal valuations, and corridor pricing from one source.',
          capabilities: ['Multi-venue aggregation', 'Corridor pricing', 'Custom spread models', 'Historical replay'],
        },
        {
          name: 'Execution Engine',
          description: 'Route payments to the best venue based on cost, speed, and fill probability. Manage settlement flows with automated confirmation.',
          capabilities: ['Smart routing', 'Auto-settlement', 'Fill tracking', 'Venue failover'],
        },
        {
          name: 'Automation Engine',
          description: 'Define rules for corridor management, compliance checks, and exception handling. Automate the operational overhead of cross-border payments.',
          capabilities: ['Rule-based routing', 'Compliance triggers', 'Exception workflows', 'Alert management'],
        },
      ]}
      useCases={[
        {
          title: 'Cross-border settlement',
          description: 'Route payments through optimal corridors with automated FX conversion and settlement confirmation across time zones.',
        },
        {
          title: 'Fiat on/off ramp orchestration',
          description: 'Manage the full lifecycle of fiat-to-crypto and crypto-to-fiat transactions with automated KYC triggers and venue selection.',
        },
        {
          title: 'Multi-venue liquidity sourcing',
          description: 'Access deep liquidity across connected venues with smart order routing that optimizes for price, speed, and counterparty risk.',
        },
        {
          title: 'Real-time treasury management',
          description: 'Monitor balances across venues and custodians in real-time. Automate rebalancing to maintain operational float requirements.',
        },
      ]}
      otherSolutions={[
        { name: 'Trading Ops', href: '/solutions/trading-ops', description: 'For hedge funds, prop desks, and market makers' },
        { name: 'Treasury Ops', href: '/solutions/treasury-ops', description: 'For asset managers, neo-banks, and fintechs' },
      ]}
      accentColor="emerald"
      accentBorder="border-emerald-500/20"
      accentBg="bg-emerald-500/[0.05]"
      accentText="text-emerald-400"
    />
  );
};

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, Terminal, Globe } from 'lucide-react';
import { AnimatedElement, CodeShowcaseCard } from '../ui';

type CodeType = 'sdk' | 'api' | 'python';

interface CodeExample {
  code: string;
  filename: string;
  docUrl: string;
  docTooltip: string;
}

interface Pattern {
  id: string;
  label: string;
  context?: string;
  sdk: CodeExample;
  api: CodeExample;
  python: CodeExample;
}

interface UseCase {
  id: string;
  label: string;
  description: string;
  patterns: Pattern[];
  image: string;
}

const useCases: UseCase[] = [
  {
    id: 'trading',
    label: 'Trading',
    description: 'Execute across 70+ venues with a single API. Trade spot, futures, and perpetuals on Binance, Coinbase, Kraken, and more — all with the same code.',
    image: '/image.png',
    patterns: [
      {
        id: 'basis',
        label: 'Basis Trading',
        context: 'Monitor spot-futures spreads and execute atomic pairs when thresholds are breached.',
        sdk: {
          code: `// Monitor spot vs perpetual spread
public void onTick(MarketData spot, MarketData perp) {
    double spread = perp.midPrice() - spot.midPrice();
    double zScore = (spread - meanSpread) / stdDevSpread;

    if (zScore > 2.0) {
        // Spread too wide: buy spot, sell perp
        execution.atomicPair(
            Order.limit("BINANCE", "BTC-USDT", Side.BUY, size, spot.ask),
            Order.limit("BINANCE", "BTC-USDT-PERP", Side.SELL, size, perp.bid)
        );
    }
}`,
          filename: 'BasisStrategy.java',
          docUrl: '#sdk-trading',
          docTooltip: 'View SDK Trading Guide'
        },
        api: {
          code: `# Create atomic order pair
POST /v1/orders/atomic

{
  "strategy": "basis_trade",
  "legs": [
    {
      "venue": "BINANCE",
      "symbol": "BTC-USDT",
      "side": "BUY",
      "size": 0.1,
      "type": "LIMIT",
      "price": 42150.00
    },
    {
      "venue": "BINANCE",
      "symbol": "BTC-USDT-PERP",
      "side": "SELL",
      "size": 0.1,
      "type": "LIMIT",
      "price": 42200.00
    }
  ]
}`,
          filename: 'trading-api.http',
          docUrl: '#api-trading',
          docTooltip: 'View Trading API Reference'
        },
        python: {
          code: `from immix import Client

client = Client(api_key="your_key")

# Get real-time spread
spot = client.market_data.quote("BINANCE", "BTC-USDT")
perp = client.market_data.quote("BINANCE", "BTC-USDT-PERP")

spread = perp.mid - spot.mid
print(f"Current spread: \${spread:.2f}")

# Execute basis trade
if spread > 50:
    client.trading.atomic_pair(
        buy=("BINANCE", "BTC-USDT", 0.1, spot.ask),
        sell=("BINANCE", "BTC-USDT-PERP", 0.1, perp.bid)
    )`,
          filename: 'basis_trade.py',
          docUrl: '#cookbook-trading',
          docTooltip: 'View Python Cookbook'
        }
      },
      {
        id: 'market-making',
        label: 'Market Making',
        context: 'Quote liquid pairs across venues with auto-hedging and inventory skew protection.',
        sdk: {
          code: `// Multi-venue market making with inventory skew
public void quote() {
    double fairPrice = pricingEngine.calcFairPrice("BTC-USDT");
    double skew = position.inventory() * riskFactor;

    // Quote on Binance & Coinbase simultaneously
    algoOrderPublisher.publish(
        Order.limit("BINANCE", Side.BUY, fairPrice - spread - skew, qty),
        Order.limit("COINBASE", Side.SELL, fairPrice + spread - skew, qty)
    );
}`,
          filename: 'MarketMaker.java',
          docUrl: '#sdk-market-making',
          docTooltip: 'View Market Making Guide'
        },
        api: {
          code: `# Update quotes across venues
POST /v1/quotes/batch

{
  "symbol": "BTC-USDT",
  "quotes": [
    {
      "venue": "BINANCE",
      "bid": { "price": 42100, "size": 0.5 },
      "ask": { "price": 42150, "size": 0.5 }
    },
    {
      "venue": "COINBASE",
      "bid": { "price": 42095, "size": 0.5 },
      "ask": { "price": 42155, "size": 0.5 }
    }
  ],
  "ttl_ms": 1000
}`,
          filename: 'quoting-api.http',
          docUrl: '#api-quoting',
          docTooltip: 'View Quoting API Reference'
        },
        python: {
          code: `from immix import Client

client = Client(api_key="your_key")

# Get fair price from pricing engine
fair = client.pricing.fair_value("BTC-USDT")
inventory = client.positions.get("BTC-USDT").quantity

# Calculate skew-adjusted quotes
skew = inventory * 0.0001
bid = fair - 25 - skew
ask = fair + 25 - skew

# Publish quotes to multiple venues
client.quoting.update_batch([
    {"venue": "BINANCE", "bid": bid, "ask": ask},
    {"venue": "COINBASE", "bid": bid - 5, "ask": ask + 5}
])`,
          filename: 'market_making.py',
          docUrl: '#cookbook-mm',
          docTooltip: 'View Python Cookbook'
        }
      },
      {
        id: 'arbitrage',
        label: 'Cross-Venue Arbitrage',
        context: 'Capture price discrepancies across venues with latency-optimized execution.',
        sdk: {
          code: `// Latency-sensitive arbitrage logic
if (coinbase.bid > binance.ask + fees) {
    execution.smartRouter("BTC-USDT")
        .withStrategy(Strategy.ARBITRAGE)
        .legs(
            Leg.buy("BINANCE", size),
            Leg.sell("COINBASE", size)
        )
        .execute();
}`,
          filename: 'Arbitrage.java',
          docUrl: '#sdk-arbitrage',
          docTooltip: 'View Arbitrage Guide'
        },
        api: {
          code: `# Execute cross-venue arbitrage
POST /v1/execution/smart-route

{
  "symbol": "BTC-USDT",
  "strategy": "ARBITRAGE",
  "legs": [
    { "venue": "BINANCE", "side": "BUY", "size": 0.1 },
    { "venue": "COINBASE", "side": "SELL", "size": 0.1 }
  ],
  "max_slippage_bps": 5
}`,
          filename: 'execution-api.http',
          docUrl: '#api-execution',
          docTooltip: 'View Execution API Reference'
        },
        python: {
          code: `from immix import Client

client = Client(api_key="your_key")

# Stream prices from multiple venues
binance = client.market_data.quote("BINANCE", "BTC-USDT")
coinbase = client.market_data.quote("COINBASE", "BTC-USDT")

# Check for arbitrage opportunity
if coinbase.bid > binance.ask + 10:
    profit = coinbase.bid - binance.ask
    print(f"Arb opportunity: \${profit:.2f}")

    client.execution.smart_route(
        symbol="BTC-USDT",
        buy_venue="BINANCE",
        sell_venue="COINBASE",
        size=0.1
    )`,
          filename: 'arbitrage.py',
          docUrl: '#cookbook-arb',
          docTooltip: 'View Python Cookbook'
        }
      }
    ]
  },
  {
    id: 'treasury',
    label: 'Treasury',
    description: 'Automate portfolio rebalancing across exchanges and custody providers. Monitor balances in real-time and execute multi-step workflows with a single command.',
    image: '/image copy copy.png',
    patterns: [
      {
        id: 'rebalance',
        label: 'Multi-Venue Rebalance',
        context: 'Automatically rebalance assets between cold storage, custody, and exchange accounts.',
        sdk: {
          code: `// Rebalance portfolio across venues
@OnTimer(interval = "1h")
public void rebalance() {
    Map<String, Balance> balances = treasury.getBalances();
    double target = totalBtc / venues.length;

    for (var entry : balances.entrySet()) {
        if (entry.getValue() > target + threshold) {
            treasury.transfer()
                .from(entry.getKey())
                .to(underAllocatedVenue)
                .asset("BTC")
                .amount(entry.getValue() - target)
                .execute();
        }
    }
}`,
          filename: 'Rebalancer.java',
          docUrl: '#sdk-treasury',
          docTooltip: 'View Treasury SDK Guide'
        },
        api: {
          code: `# Get all venue balances
GET /v1/treasury/balances

# Response:
{
  "balances": [
    { "venue": "BINANCE", "asset": "BTC", "free": 2.5 },
    { "venue": "COINBASE", "asset": "BTC", "free": 1.8 },
    { "venue": "FIREBLOCKS", "asset": "BTC", "free": 10.0 }
  ]
}

# Execute rebalance transfer
POST /v1/treasury/transfer
{
  "from": "BINANCE",
  "to": "COINBASE",
  "asset": "BTC",
  "amount": 0.35
}`,
          filename: 'treasury-api.http',
          docUrl: '#api-treasury',
          docTooltip: 'View Treasury API Reference'
        },
        python: {
          code: `from immix import Client

client = Client(api_key="your_key")

# Get balances across all venues
balances = client.treasury.balances(asset="BTC")
total = sum(b.free for b in balances)
target = total / len(balances)

print(f"Target per venue: {target:.4f} BTC")

# Rebalance from over-allocated venues
for b in balances:
    if b.free > target + 0.1:
        excess = b.free - target
        client.treasury.transfer(
            from_venue=b.venue,
            to_venue="FIREBLOCKS",
            asset="BTC",
            amount=excess
        )`,
          filename: 'rebalance.py',
          docUrl: '#cookbook-treasury',
          docTooltip: 'View Python Cookbook'
        }
      },
      {
        id: 'yield',
        label: 'Stablecoin Yield',
        context: 'Route idle stablecoins to the highest-yielding protocol automatically.',
        sdk: {
          code: `// Route idle USDC to highest yield protocol
double aaveRate = marketData.getYield("AAVE", "USDC");
double compRate = marketData.getYield("COMPOUND", "USDC");

if (aaveRate > compRate + minDiff) {
    treasury.withdraw("COMPOUND", "USDC", amount)
           .then()
           .deposit("AAVE", "USDC", amount)
           .execute();
}`,
          filename: 'YieldOptimizer.java',
          docUrl: '#sdk-yield',
          docTooltip: 'View Yield SDK Guide'
        },
        api: {
          code: `# Get current yield rates
GET /v1/market-data/yields?asset=USDC

# Response:
{
  "yields": [
    { "protocol": "AAVE", "apy": 4.52 },
    { "protocol": "COMPOUND", "apy": 3.89 }
  ]
}

# Move funds to higher yield
POST /v1/treasury/yield-swap
{
  "asset": "USDC",
  "from_protocol": "COMPOUND",
  "to_protocol": "AAVE",
  "amount": 100000
}`,
          filename: 'yield-api.http',
          docUrl: '#api-yield',
          docTooltip: 'View Market Data API Reference'
        },
        python: {
          code: `from immix import Client

client = Client(api_key="your_key")

# Compare yield rates
yields = client.market_data.yields(asset="USDC")
best = max(yields, key=lambda y: y.apy)

print(f"Best yield: {best.protocol} @ {best.apy}%")

# Move funds to best protocol
current = client.treasury.defi_positions(asset="USDC")
for pos in current:
    if pos.protocol != best.protocol:
        client.treasury.yield_swap(
            asset="USDC",
            from_protocol=pos.protocol,
            to_protocol=best.protocol,
            amount=pos.amount
        )`,
          filename: 'yield_optimizer.py',
          docUrl: '#cookbook-yield',
          docTooltip: 'View Python Cookbook'
        }
      },
      {
        id: 'sweep',
        label: 'Daily Sweep',
        context: 'Automatically move excess funds to cold storage at end of day.',
        sdk: {
          code: `// Sweep excess cash to Cold Storage at 23:59
@OnTimer(cron = "59 23 * * *")
public void dailySweep() {
    Balance cash = treasury.getBalance("HOT_WALLET", "USDC");
    if (cash.free > operatingBuffer) {
        treasury.transfer()
            .from("HOT_WALLET")
            .to("FIREBLOCKS_VAULT")
            .asset("USDC")
            .amount(cash.free - operatingBuffer)
            .execute();
    }
}`,
          filename: 'DailySweep.java',
          docUrl: '#sdk-sweep',
          docTooltip: 'View Treasury SDK Guide'
        },
        api: {
          code: `# Configure automated sweep rule
POST /v1/treasury/sweep-rules

{
  "name": "daily_cold_storage",
  "schedule": "59 23 * * *",
  "from_venue": "HOT_WALLET",
  "to_venue": "FIREBLOCKS_VAULT",
  "asset": "USDC",
  "keep_balance": 50000,
  "enabled": true
}

# Check sweep rule status
GET /v1/treasury/sweep-rules/daily_cold_storage`,
          filename: 'sweep-api.http',
          docUrl: '#api-sweep',
          docTooltip: 'View Treasury API Reference'
        },
        python: {
          code: `from immix import Client

client = Client(api_key="your_key")

# Check hot wallet balance
hot = client.treasury.balance("HOT_WALLET", "USDC")
operating_buffer = 50000

print(f"Hot wallet: \${hot.free:,.2f}")

# Sweep excess to cold storage
if hot.free > operating_buffer:
    sweep_amount = hot.free - operating_buffer
    tx = client.treasury.transfer(
        from_venue="HOT_WALLET",
        to_venue="FIREBLOCKS_VAULT",
        asset="USDC",
        amount=sweep_amount
    )
    print(f"Swept \${sweep_amount:,.2f} -> {tx.id}")`,
          filename: 'daily_sweep.py',
          docUrl: '#cookbook-sweep',
          docTooltip: 'View Python Cookbook'
        }
      }
    ]
  },
  {
    id: 'payments',
    label: 'Payments',
    description: 'Build cross-border payment rails on crypto. Route payments through the most efficient corridors and execute multi-hop conversions automatically.',
    image: '/image.png',
    patterns: [
      {
        id: 'cross-border',
        label: 'Cross-Border Settlement',
        context: 'Execute multi-hop fiat-to-crypto payments. SGD -> USDC -> MXN in milliseconds.',
        sdk: {
          code: `// Route international payments via crypto rails
public void onPaymentRequest(Payment p) {
    // 1. Convert Fiat to Stablecoin
    execution.smartRouter("SGD-USDC")
        .side(Side.BUY)
        .amount(p.amount)
        .execute();

    // 2. Transfer across borders
    treasury.transfer("USDC")
        .from("SG_NODE")
        .to("MX_NODE")
        .execute();

    // 3. Off-ramp to local currency
    execution.smartRouter("USDC-MXN")
        .side(Side.SELL)
        .execute();
}`,
          filename: 'CrossBorderPayment.java',
          docUrl: '#sdk-payments',
          docTooltip: 'View Payments SDK Guide'
        },
        api: {
          code: `# Execute cross-border payment
POST /v1/payments/cross-border

{
  "source_currency": "SGD",
  "destination_currency": "MXN",
  "amount": 10000,
  "corridor": "SG_MX",
  "beneficiary": {
    "name": "Acme Corp MX",
    "account": "MX12345678"
  },
  "reference": "INV-2024-001"
}

# Response:
{
  "payment_id": "pay_abc123",
  "status": "COMPLETED",
  "fx_rate": 13.45,
  "fees": { "total": 12.50 }
}`,
          filename: 'payments-api.http',
          docUrl: '#api-payments',
          docTooltip: 'View Payments API Reference'
        },
        python: {
          code: `from immix import Client

client = Client(api_key="your_key")

# Get best route for cross-border payment
route = client.payments.get_route(
    source="SGD",
    destination="MXN",
    amount=10000
)

print(f"Route: {route.path}")
print(f"FX rate: {route.rate}")
print(f"Fees: \${route.fees}")

# Execute payment
payment = client.payments.send(
    route=route,
    beneficiary="Acme Corp MX",
    reference="INV-2024-001"
)

print(f"Payment {payment.id}: {payment.status}")`,
          filename: 'cross_border.py',
          docUrl: '#cookbook-payments',
          docTooltip: 'View Python Cookbook'
        }
      },
      {
        id: 'smart-router',
        label: 'Smart Routing',
        context: 'Find optimal conversion paths across multiple venues and currencies.',
        sdk: {
          code: `// Optimize FX conversion path
Quote quote = router.getBestQuote(
    "EUR", "USD", amount,
    Strategies.MIN_SLIPPAGE
);

// Path: EUR -> KRAKEN(EUR/USDT) -> BINANCE(USDT/USD)
log.info("Best path: " + quote.getPath());
log.info("Total cost: " + quote.getTotalCost());

quote.execute();`,
          filename: 'SmartRouter.java',
          docUrl: '#sdk-routing',
          docTooltip: 'View Routing SDK Guide'
        },
        api: {
          code: `# Get optimal route quote
POST /v1/routing/quote

{
  "source": "EUR",
  "destination": "USD",
  "amount": 50000,
  "strategy": "MIN_SLIPPAGE"
}

# Response:
{
  "quote_id": "qt_xyz789",
  "path": ["EUR", "USDT", "USD"],
  "venues": ["KRAKEN", "BINANCE"],
  "rate": 1.0845,
  "fees_bps": 8,
  "expires_at": "2024-01-15T10:30:00Z"
}`,
          filename: 'routing-api.http',
          docUrl: '#api-routing',
          docTooltip: 'View Routing API Reference'
        },
        python: {
          code: `from immix import Client

client = Client(api_key="your_key")

# Get best route for FX conversion
quote = client.routing.get_quote(
    source="EUR",
    destination="USD",
    amount=50000,
    strategy="MIN_SLIPPAGE"
)

print(f"Path: {' -> '.join(quote.path)}")
print(f"Rate: {quote.rate}")
print(f"Fees: {quote.fees_bps} bps")

# Execute if rate is acceptable
if quote.rate > 1.08:
    result = client.routing.execute(quote.id)
    print(f"Executed: {result.status}")`,
          filename: 'smart_routing.py',
          docUrl: '#cookbook-routing',
          docTooltip: 'View Python Cookbook'
        }
      },
      {
        id: 'hedging',
        label: 'Auto-Hedger',
        context: 'Automatically hedge incoming crypto payments to lock in fiat value.',
        sdk: {
          code: `// Auto-hedge incoming crypto payments
@OnWebhook("/payment/receive")
public void onReceive(Payment p) {
    if (p.currency.equals("BTC")) {
        // Lock in USD value immediately
        execution.smartRouter("BTC-USD")
            .side(Side.SELL)
            .amount(p.amount)
            .strategy(Strategy.TWAP_5MIN)
            .execute();
    }
}`,
          filename: 'AutoHedger.java',
          docUrl: '#sdk-hedging',
          docTooltip: 'View Hedging SDK Guide'
        },
        api: {
          code: `# Configure auto-hedge webhook
POST /v1/webhooks/auto-hedge

{
  "trigger": "PAYMENT_RECEIVED",
  "conditions": {
    "currency": "BTC",
    "min_amount": 0.01
  },
  "action": {
    "type": "SELL_TO_USD",
    "strategy": "TWAP_5MIN",
    "slippage_limit_bps": 10
  }
}

# Check hedge status
GET /v1/hedges?payment_id=pay_123`,
          filename: 'hedging-api.http',
          docUrl: '#api-hedging',
          docTooltip: 'View Hedging API Reference'
        },
        python: {
          code: `from immix import Client

client = Client(api_key="your_key")

# Set up auto-hedge rule
rule = client.hedging.create_rule(
    trigger="PAYMENT_RECEIVED",
    currency="BTC",
    action="SELL_TO_USD",
    strategy="TWAP_5MIN"
)

print(f"Auto-hedge rule active: {rule.id}")

# Manual hedge example
btc_received = 0.5
hedge = client.hedging.execute(
    asset="BTC",
    amount=btc_received,
    target="USD",
    strategy="TWAP_5MIN"
)

print(f"Hedged {btc_received} BTC @ \${hedge.avg_price:,.2f}")`,
          filename: 'auto_hedger.py',
          docUrl: '#cookbook-hedging',
          docTooltip: 'View Python Cookbook'
        }
      }
    ]
  }
];

const codeTypeConfig = {
  sdk: {
    icon: <Code2 size={14} className="text-orange-400" />,
    title: 'Java SDK',
    language: 'java' as const
  },
  api: {
    icon: <Globe size={14} className="text-green-400" />,
    title: 'REST API',
    language: 'rest' as const
  },
  python: {
    icon: <Terminal size={14} className="text-yellow-400" />,
    title: 'Python',
    language: 'python' as const
  }
};

export const SolutionsEngine = () => {
  const [activeUseCase, setActiveUseCase] = useState(useCases[0].id);
  const [activePattern, setActivePattern] = useState(useCases[0].patterns[0].id);
  const [activeCodeType, setActiveCodeType] = useState<CodeType>('sdk');
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});

  const currentUseCase = useCases.find(uc => uc.id === activeUseCase) || useCases[0];
  const currentPattern = currentUseCase.patterns.find(p => p.id === activePattern) || currentUseCase.patterns[0];

  useEffect(() => {
    useCases.forEach(uc => {
      const img = new Image();
      img.onload = () => {
        setImagesLoaded(prev => ({ ...prev, [uc.image]: true }));
      };
      img.src = uc.image;
    });
  }, []);

  const handleUseCaseChange = (useCaseId: string) => {
    setActiveUseCase(useCaseId);
    const useCase = useCases.find(uc => uc.id === useCaseId);
    if (useCase) {
      setActivePattern(useCase.patterns[0].id);
    }
  };

  const getCodeExample = (type: CodeType) => {
    return currentPattern[type];
  };

  return (
    <section id="solutions" className="section-wrapper overflow-hidden">
      <div className="container-max space-y-12">
        <div className="text-center space-y-4">
          <AnimatedElement type="fadeInUp">
            <h2 className="text-4xl md:text-5xl font-bold">Solutions for every workflow.</h2>
          </AnimatedElement>
          <AnimatedElement type="fadeInUp" delay={0.1}>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              Three ways to integrate. Choose your path — from quick Python scripts to full SDK power.
            </p>
          </AnimatedElement>
        </div>

        <AnimatedElement type="fadeInUp" delay={0.2}>
          <div className="flex justify-center gap-4 mb-8">
            {useCases.map((useCase) => (
              <motion.button
                key={useCase.id}
                onClick={() => handleUseCaseChange(useCase.id)}
                className={`
                  px-8 py-3 font-semibold text-lg transition-all
                  ${activeUseCase === useCase.id
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {useCase.label}
              </motion.button>
            ))}
          </div>
        </AnimatedElement>

        <motion.div
          key={activeUseCase}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <p className="text-xl text-white/70 leading-relaxed text-center max-w-4xl mx-auto">
            {currentUseCase.description}
          </p>
        </motion.div>

        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-6 relative z-20">
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-white/50 uppercase tracking-wider">Use Cases</h4>
                <div className="flex flex-wrap gap-2">
                  {currentUseCase.patterns.map((pattern) => (
                    <motion.button
                      key={pattern.id}
                      onClick={() => setActivePattern(pattern.id)}
                      className={`
                        px-4 py-2 text-sm font-medium transition-all
                        ${activePattern === pattern.id
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50'
                          : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white'
                        }
                      `}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {pattern.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {currentPattern.context && (
                <motion.p
                  key={`${activeUseCase}-${activePattern}-context`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-white/60 leading-relaxed"
                >
                  {currentPattern.context}
                </motion.p>
              )}

              <div className="space-y-2">
                {(['python', 'api', 'sdk'] as CodeType[]).map((type, index) => {
                  const config = codeTypeConfig[type];
                  const example = getCodeExample(type);

                  return (
                    <CodeShowcaseCard
                      key={`${activeUseCase}-${activePattern}-${type}`}
                      title={config.title}
                      icon={config.icon}
                      code={example.code}
                      language={config.language}
                      filename={example.filename}
                      docUrl={example.docUrl}
                      docTooltip={example.docTooltip}
                      isActive={activeCodeType === type}
                      onClick={() => setActiveCodeType(type)}
                      index={index}
                    />
                  );
                })}
              </div>

              <p className="text-xs text-white/40 font-mono pt-2">
                SDKs: Java &bull; APIs: REST, WebSocket &bull; Cookbooks: Python
              </p>
            </div>

            <div className="lg:col-span-7 relative">
              <div className="relative h-[600px] lg:h-[700px]">
                <div
                  className="absolute inset-0 rounded-lg"
                  style={{
                    boxShadow: '0 0 80px 20px rgba(59, 130, 246, 0.12), 0 0 120px 40px rgba(59, 130, 246, 0.06)'
                  }}
                />

                <div className="absolute inset-0 w-[140%] lg:w-[160%] -right-[40%] lg:-right-[60%]">
                  {useCases.map((uc) => (
                    <motion.div
                      key={uc.id}
                      className="absolute inset-0"
                      initial={false}
                      animate={{
                        opacity: activeUseCase === uc.id ? 1 : 0,
                        scale: activeUseCase === uc.id ? 1 : 1.02
                      }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      style={{ pointerEvents: activeUseCase === uc.id ? 'auto' : 'none' }}
                    >
                      <img
                        src={uc.image}
                        alt={`${uc.label} UI Preview`}
                        className="w-full h-full object-cover object-left-top rounded-lg"
                        style={{
                          opacity: imagesLoaded[uc.image] ? 1 : 0,
                          transition: 'opacity 0.3s ease'
                        }}
                      />
                    </motion.div>
                  ))}
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 via-20% to-transparent pointer-events-none rounded-lg z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent from-50% to-[#050505] pointer-events-none rounded-lg z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent pointer-events-none rounded-lg z-10" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/30 via-transparent to-transparent pointer-events-none rounded-lg z-10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

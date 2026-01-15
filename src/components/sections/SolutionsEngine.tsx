import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { AnimatedElement, IntegrationDeck, IntegrationExample } from '../ui';

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
          code: `// Connect to streaming market data
-> { "op": "subscribe", "channel": "ticker",
     "symbols": ["BTC-USDT", "BTC-USDT-PERP"] }

<- { "channel": "ticker", "symbol": "BTC-USDT",
     "bid": 42150.00, "ask": 42152.50, "ts": 1705312800 }

<- { "channel": "ticker", "symbol": "BTC-USDT-PERP",
     "bid": 42198.00, "ask": 42200.50, "ts": 1705312800 }

// Execute atomic trade when spread triggers
-> { "op": "order", "type": "atomic_pair",
     "legs": [
       { "symbol": "BTC-USDT", "side": "BUY", "size": 0.1 },
       { "symbol": "BTC-USDT-PERP", "side": "SELL", "size": 0.1 }
     ]}

<- { "op": "order_ack", "order_id": "ord_abc123",
     "status": "FILLED", "fill_price": 42151.25 }`,
          filename: 'ws-trading.json',
          docUrl: '#ws-trading',
          docTooltip: 'View WebSocket Streaming Guide'
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
          code: `// Subscribe to orderbook updates
-> { "op": "subscribe", "channel": "orderbook",
     "symbol": "BTC-USDT", "depth": 10 }

<- { "channel": "orderbook", "symbol": "BTC-USDT",
     "bids": [[42100, 1.5], [42095, 2.0]],
     "asks": [[42105, 1.2], [42110, 1.8]] }

// Update quotes in real-time
-> { "op": "quote_update",
     "quotes": [
       { "venue": "BINANCE", "bid": 42100, "ask": 42105 },
       { "venue": "COINBASE", "bid": 42098, "ask": 42107 }
     ],
     "ttl_ms": 500 }

<- { "op": "quote_ack", "active_quotes": 2 }`,
          filename: 'ws-quoting.json',
          docUrl: '#ws-quoting',
          docTooltip: 'View WebSocket Quoting Guide'
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
          code: `// Multi-venue price stream
-> { "op": "subscribe", "channel": "ticker",
     "venues": ["BINANCE", "COINBASE"],
     "symbol": "BTC-USDT" }

<- { "venue": "BINANCE", "bid": 42100, "ask": 42102 }
<- { "venue": "COINBASE", "bid": 42115, "ask": 42118 }

// Arb detected! Execute immediately
-> { "op": "arb_execute",
     "buy": { "venue": "BINANCE", "size": 0.1 },
     "sell": { "venue": "COINBASE", "size": 0.1 },
     "max_slippage_bps": 5 }

<- { "op": "arb_filled", "profit_usd": 12.50,
     "latency_ms": 45 }`,
          filename: 'ws-arbitrage.json',
          docUrl: '#ws-arbitrage',
          docTooltip: 'View WebSocket Arb Guide'
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
          code: `// Subscribe to balance updates
-> { "op": "subscribe", "channel": "balances",
     "venues": ["BINANCE", "COINBASE", "FIREBLOCKS"] }

<- { "channel": "balances",
     "data": [
       { "venue": "BINANCE", "asset": "BTC", "free": 2.5 },
       { "venue": "COINBASE", "asset": "BTC", "free": 1.8 },
       { "venue": "FIREBLOCKS", "asset": "BTC", "free": 10.0 }
     ]}

// Execute rebalance transfer
-> { "op": "transfer",
     "from": "BINANCE", "to": "COINBASE",
     "asset": "BTC", "amount": 0.35 }

<- { "op": "transfer_ack", "tx_id": "tx_xyz789",
     "status": "PENDING", "eta_seconds": 300 }`,
          filename: 'ws-treasury.json',
          docUrl: '#ws-treasury',
          docTooltip: 'View WebSocket Treasury Guide'
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
          code: `// Subscribe to yield rate updates
-> { "op": "subscribe", "channel": "yields",
     "asset": "USDC" }

<- { "channel": "yields",
     "rates": [
       { "protocol": "AAVE", "apy": 4.52, "tvl": "2.1B" },
       { "protocol": "COMPOUND", "apy": 3.89, "tvl": "1.8B" }
     ]}

// Move funds to higher yield
-> { "op": "yield_swap",
     "asset": "USDC", "amount": 100000,
     "from": "COMPOUND", "to": "AAVE" }

<- { "op": "yield_swap_ack", "tx_id": "ys_123",
     "new_apy": 4.52, "gas_cost_usd": 2.50 }`,
          filename: 'ws-yields.json',
          docUrl: '#ws-yields',
          docTooltip: 'View WebSocket Yield Guide'
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
          code: `// Subscribe to sweep rule events
-> { "op": "subscribe", "channel": "sweep_rules" }

// Configure automated sweep
-> { "op": "create_sweep_rule",
     "name": "daily_cold_storage",
     "schedule": "59 23 * * *",
     "from": "HOT_WALLET", "to": "FIREBLOCKS_VAULT",
     "asset": "USDC", "keep_balance": 50000 }

<- { "op": "rule_created", "rule_id": "sr_abc",
     "next_run": "2024-01-15T23:59:00Z" }

// Sweep execution notification
<- { "channel": "sweep_executed",
     "rule_id": "sr_abc", "amount": 125000,
     "tx_id": "tx_sweep_456" }`,
          filename: 'ws-sweep.json',
          docUrl: '#ws-sweep',
          docTooltip: 'View WebSocket Sweep Guide'
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
          code: `// Subscribe to payment status updates
-> { "op": "subscribe", "channel": "payments",
     "payment_id": "pay_abc123" }

// Initiate cross-border payment
-> { "op": "payment_create",
     "source": "SGD", "destination": "MXN",
     "amount": 10000,
     "beneficiary": { "name": "Acme Corp MX" }}

<- { "channel": "payment_status",
     "payment_id": "pay_abc123",
     "step": 1, "status": "SGD_TO_USDC_COMPLETE" }

<- { "channel": "payment_status",
     "step": 2, "status": "USDC_TRANSFERRED" }

<- { "channel": "payment_status",
     "step": 3, "status": "COMPLETED",
     "fx_rate": 13.45, "fees": 12.50 }`,
          filename: 'ws-payments.json',
          docUrl: '#ws-payments',
          docTooltip: 'View WebSocket Payments Guide'
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
          code: `// Request optimal route quote
-> { "op": "quote_request",
     "source": "EUR", "destination": "USD",
     "amount": 50000, "strategy": "MIN_SLIPPAGE" }

<- { "op": "quote_response",
     "quote_id": "qt_xyz789",
     "path": ["EUR", "USDT", "USD"],
     "venues": ["KRAKEN", "BINANCE"],
     "rate": 1.0845, "fees_bps": 8,
     "expires_in_ms": 5000 }

// Execute the quote
-> { "op": "quote_execute", "quote_id": "qt_xyz789" }

<- { "op": "execution_complete",
     "filled_rate": 1.0843, "amount_usd": 54215 }`,
          filename: 'ws-routing.json',
          docUrl: '#ws-routing',
          docTooltip: 'View WebSocket Routing Guide'
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
          code: `// Subscribe to incoming payments
-> { "op": "subscribe", "channel": "payments_incoming",
     "currencies": ["BTC", "ETH"] }

// Incoming payment detected
<- { "channel": "payment_received",
     "currency": "BTC", "amount": 0.5,
     "from": "customer_wallet_abc" }

// Auto-hedge triggered
-> { "op": "hedge_execute",
     "asset": "BTC", "amount": 0.5,
     "target": "USD", "strategy": "TWAP_5MIN" }

<- { "channel": "hedge_progress",
     "filled": 0.3, "remaining": 0.2,
     "avg_price": 42150.00 }

<- { "channel": "hedge_complete",
     "total_usd": 21075.00, "avg_price": 42150.00 }`,
          filename: 'ws-hedging.json',
          docUrl: '#ws-hedging',
          docTooltip: 'View WebSocket Hedging Guide'
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

export const SolutionsEngine = () => {
  const [activeUseCase, setActiveUseCase] = useState(useCases[0].id);
  const [activePattern, setActivePattern] = useState(useCases[0].patterns[0].id);
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

  const integrationExamples: IntegrationExample[] = useMemo(() => [
    {
      id: 'api',
      label: 'WebSocket API',
      subtitle: 'Streaming',
      code: currentPattern.api.code,
      filename: currentPattern.api.filename,
      docUrl: currentPattern.api.docUrl,
      docTooltip: currentPattern.api.docTooltip,
      language: 'websocket' as const
    },
    {
      id: 'python',
      label: 'Python',
      subtitle: 'Quickstart',
      code: currentPattern.python.code,
      filename: currentPattern.python.filename,
      docUrl: currentPattern.python.docUrl,
      docTooltip: currentPattern.python.docTooltip,
      language: 'python' as const
    },
    {
      id: 'sdk',
      label: 'Java SDK',
      subtitle: 'Full SDK',
      code: currentPattern.sdk.code,
      filename: currentPattern.sdk.filename,
      docUrl: currentPattern.sdk.docUrl,
      docTooltip: currentPattern.sdk.docTooltip,
      language: 'java' as const
    }
  ], [currentPattern]);

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
                  px-8 py-3 font-semibold text-lg transition-all rounded-lg
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 space-y-5 relative z-30">
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-white/50 uppercase tracking-wider">Use Cases</h4>
                <div className="flex flex-wrap gap-2">
                  {currentUseCase.patterns.map((pattern) => (
                    <motion.button
                      key={pattern.id}
                      onClick={() => setActivePattern(pattern.id)}
                      className={`
                        px-4 py-2 text-sm font-medium transition-all rounded-md
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
                  className="text-sm text-white/60 leading-relaxed max-w-xl"
                >
                  {currentPattern.context}
                </motion.p>
              )}

              <motion.div
                key={`${activeUseCase}-${activePattern}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <IntegrationDeck
                  examples={integrationExamples}
                  defaultActive="python"
                />
              </motion.div>
            </div>

            <div className="lg:col-span-7 relative hidden lg:block">
              <div className="relative h-[540px]">
                <div className="absolute inset-0 w-[200%] -right-[100%]">
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

                <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/70 via-20% to-transparent pointer-events-none z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none z-10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

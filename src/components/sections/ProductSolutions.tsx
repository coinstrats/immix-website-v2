import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3,
  Cable,
  LineChart,
  Coins,
  ArrowRightLeft,
  Monitor,
  Settings,
  Code2,
  Terminal,
  ExternalLink
} from 'lucide-react';
import { AnimatedElement } from '../ui';

type IntegrationLevel = 'no-code' | 'low-code' | 'sdk' | 'api';
type Domain = 'trading' | 'treasury' | 'payments';

interface ProductExample {
  domain: Domain;
  title: string;
  description: string;
  code: string;
  filename: string;
}

interface IntegrationContent {
  level: IntegrationLevel;
  headline: string;
  description: string;
  examples: ProductExample[];
  available: boolean;
}

interface Product {
  id: string;
  name: string;
  tagline: string;
  icon: React.ReactNode;
  image: string;
  integrations: IntegrationContent[];
  comingSoon?: boolean;
}

const integrationLevels: { id: IntegrationLevel; label: string; icon: React.ReactNode; description: string }[] = [
  { id: 'no-code', label: 'No Code', icon: <Monitor size={16} />, description: 'Visual dashboards and click-to-trade' },
  { id: 'low-code', label: 'Config', icon: <Settings size={16} />, description: 'YAML/JSON configuration templates' },
  { id: 'sdk', label: 'SDK', icon: <Code2 size={16} />, description: 'Python and Java libraries' },
  { id: 'api', label: 'API', icon: <Terminal size={16} />, description: 'WebSocket and REST endpoints' },
];

const products: Product[] = [
  {
    id: 'markets',
    name: 'Markets',
    tagline: 'Real-time spot and derivatives analytics',
    icon: <BarChart3 size={20} />,
    image: '/orderbook.png',
    integrations: [
      {
        level: 'no-code',
        headline: 'Visual Market Intelligence',
        description: 'Monitor spot and derivative markets across 70+ venues with interactive dashboards, heatmaps, and alerts.',
        available: true,
        examples: [
          {
            domain: 'trading',
            title: 'Live Orderbook Depth',
            description: 'Visualize bid/ask depth across venues in real-time',
            code: `# No code required - use the dashboard
# Navigate to Markets > Orderbook
# Select instrument: BTC-USDT
# View aggregated depth across venues`,
            filename: 'dashboard-config.yaml'
          }
        ]
      },
      {
        level: 'sdk',
        headline: 'Programmatic Market Access',
        description: 'Stream normalized market data into your applications with type-safe SDKs.',
        available: true,
        examples: [
          {
            domain: 'trading',
            title: 'Real-time Price Streaming',
            description: 'Subscribe to live price updates across venues',
            code: `from immix import Client

client = Client(api_key="your_key")

# Stream prices from multiple venues
for tick in client.market_data.stream("BTC-USDT"):
    print(f"{tick.venue}: {tick.bid} / {tick.ask}")

    # Calculate cross-venue spread
    if tick.venue == "BINANCE":
        binance_mid = (tick.bid + tick.ask) / 2
    elif tick.venue == "COINBASE":
        spread = tick.bid - binance_mid
        print(f"Venue spread: \${spread:.2f}")`,
            filename: 'market_stream.py'
          }
        ]
      }
    ]
  },
  {
    id: 'connect',
    name: 'Connect',
    tagline: 'Managed API for the digital asset ecosystem',
    icon: <Cable size={20} />,
    image: '/balance-map.png',
    integrations: [
      {
        level: 'low-code',
        headline: 'Configure Your Connections',
        description: 'Define venue connections and data flows with simple configuration files.',
        available: true,
        examples: [
          {
            domain: 'treasury',
            title: 'Multi-Venue Balance Sync',
            description: 'Aggregate balances across exchanges and custodians',
            code: `# connections.yaml
venues:
  - name: binance
    type: exchange
    credentials: \${BINANCE_API_KEY}
    sync:
      - balances
      - positions

  - name: coinbase
    type: exchange
    credentials: \${COINBASE_API_KEY}
    sync:
      - balances

  - name: fireblocks
    type: custody
    credentials: \${FIREBLOCKS_API_KEY}
    sync:
      - balances
      - transactions`,
            filename: 'connections.yaml'
          }
        ]
      },
      {
        level: 'sdk',
        headline: 'Unified Venue Access',
        description: 'One SDK to connect, stream, and trade across the entire digital asset ecosystem.',
        available: true,
        examples: [
          {
            domain: 'treasury',
            title: 'Cross-Venue Balance Query',
            description: 'Query balances across all connected venues',
            code: `from immix import Client

client = Client(api_key="your_key")

# Get balances across all venues
balances = client.connect.balances()

for venue, assets in balances.items():
    print(f"\\n{venue}:")
    for asset, balance in assets.items():
        if balance.total > 0:
            print(f"  {asset}: {balance.total:.4f}")

# Calculate total portfolio value
total_usd = client.connect.portfolio_value("USD")
print(f"\\nTotal Portfolio: \${total_usd:,.2f}")`,
            filename: 'balance_query.py'
          }
        ]
      },
      {
        level: 'api',
        headline: 'Low-Latency Streaming',
        description: 'WebSocket connections for real-time data and order management.',
        available: true,
        examples: [
          {
            domain: 'trading',
            title: 'WebSocket Market Data',
            description: 'Stream normalized data via WebSocket',
            code: `from immix import Client

client = Client(api_key="your_key")

# WebSocket streaming with callbacks
def on_tick(tick):
    print(f"{tick.symbol}: {tick.price}")

def on_order(order):
    print(f"Order {order.id}: {order.status}")

# Subscribe to multiple streams
client.ws.subscribe(
    tickers=["BTC-USDT", "ETH-USDT"],
    venues=["BINANCE", "COINBASE"],
    on_tick=on_tick,
    on_order=on_order
)

client.ws.run_forever()`,
            filename: 'websocket_stream.py'
          }
        ]
      }
    ]
  },
  {
    id: 'trade',
    name: 'Trade',
    tagline: 'Multi-venue execution workspace',
    icon: <LineChart size={20} />,
    image: '/image.png',
    integrations: [
      {
        level: 'no-code',
        headline: 'Click-to-Trade Interface',
        description: 'Execute limit and market orders across venues with an intuitive trading workspace.',
        available: true,
        examples: [
          {
            domain: 'trading',
            title: 'Visual Order Entry',
            description: 'Place orders directly from the orderbook UI',
            code: `# No code required - use the trading workspace
#
# 1. Select instrument from watchlist
# 2. View aggregated orderbook
# 3. Click price level to set limit price
# 4. Enter quantity and submit
#
# Available order types:
# - Market, Limit
# - Peg, Iceberg
# - Smart Order Router`,
            filename: 'trading-workspace.md'
          }
        ]
      },
      {
        level: 'low-code',
        headline: 'Strategy Configuration',
        description: 'Configure execution algorithms and smart order routing with templates.',
        available: true,
        examples: [
          {
            domain: 'trading',
            title: 'Smart Order Router Config',
            description: 'Configure intelligent order routing across venues',
            code: `# sor-config.yaml
strategy: smart_order_router
symbol: BTC-USDT
size: 1.0

routing:
  mode: best_price
  venues:
    - binance: { weight: 0.4, max_size: 0.5 }
    - coinbase: { weight: 0.3, max_size: 0.3 }
    - kraken: { weight: 0.3, max_size: 0.2 }

execution:
  slippage_limit_bps: 10
  timeout_ms: 5000
  retry_on_reject: true`,
            filename: 'sor-config.yaml'
          }
        ]
      },
      {
        level: 'sdk',
        headline: 'Programmatic Execution',
        description: 'Execute complex strategies with the Python SDK. Access SOR, Peg, Iceberg, and AutoSpreader.',
        available: true,
        examples: [
          {
            domain: 'trading',
            title: 'Smart Order Routing',
            description: 'Route orders intelligently across venues',
            code: `from immix import Client

client = Client(api_key="your_key")

# Execute with Smart Order Router
order = client.trade.smart_route(
    symbol="BTC-USDT",
    side="BUY",
    size=1.0,
    strategy="BEST_PRICE",
    venues=["BINANCE", "COINBASE", "KRAKEN"],
    max_slippage_bps=10
)

print(f"Order {order.id} filled at \${order.avg_price:,.2f}")
print(f"Venue breakdown: {order.fills}")

# Iceberg order for large sizes
iceberg = client.trade.iceberg(
    symbol="ETH-USDT",
    side="SELL",
    total_size=50.0,
    show_size=2.0,
    limit_price=2450.00
)`,
            filename: 'smart_order.py'
          }
        ]
      },
      {
        level: 'api',
        headline: 'Full Execution Control',
        description: 'Direct WebSocket access for latency-sensitive trading and custom algorithms.',
        available: true,
        examples: [
          {
            domain: 'trading',
            title: 'Low-Latency Execution',
            description: 'Submit orders with minimal latency',
            code: `from immix import Client

client = Client(api_key="your_key")

# Low-latency order submission
async def on_signal(signal):
    order = await client.trade.submit_async(
        symbol=signal.symbol,
        side=signal.side,
        size=signal.size,
        type="LIMIT",
        price=signal.price,
        time_in_force="IOC"
    )
    return order

# AutoSpreader for basis trading
spreader = client.trade.auto_spreader(
    leg1=("BINANCE", "BTC-USDT", "BUY"),
    leg2=("BINANCE", "BTC-USDT-PERP", "SELL"),
    spread_target=50.0,
    size=0.1
)`,
            filename: 'low_latency.py'
          }
        ]
      }
    ]
  },
  {
    id: 'earn',
    name: 'Earn',
    tagline: 'Configurable yield strategies',
    icon: <Coins size={20} />,
    image: '/strategies.png',
    integrations: [
      {
        level: 'no-code',
        headline: 'One-Click Yield',
        description: 'Deploy capital to curated yield strategies with a single click.',
        available: true,
        examples: [
          {
            domain: 'treasury',
            title: 'Stablecoin Yield Vaults',
            description: 'Earn yield on idle stablecoins',
            code: `# No code required - use the Earn dashboard
#
# Available strategies:
# - USDC Yield Vault: 4.2% APY
# - USDT Lending Pool: 3.8% APY
#
# Coming soon:
# - BTC Yield Strategies
# - ETH Staking
# - XRP Yield`,
            filename: 'earn-dashboard.md'
          }
        ]
      },
      {
        level: 'low-code',
        headline: 'Strategy Configuration',
        description: 'Configure yield parameters, auto-compounding, and risk limits.',
        available: true,
        examples: [
          {
            domain: 'treasury',
            title: 'Yield Strategy Config',
            description: 'Configure automated yield optimization',
            code: `# yield-strategy.yaml
strategy: stablecoin_yield
asset: USDC
amount: 100000

parameters:
  min_apy: 3.5
  max_protocol_allocation: 0.4
  auto_compound: true
  compound_frequency: daily

risk_limits:
  max_single_protocol: 50000
  allowed_protocols:
    - aave
    - compound
  min_tvl: 1000000000`,
            filename: 'yield-strategy.yaml'
          }
        ]
      },
      {
        level: 'sdk',
        headline: 'Programmatic Yield',
        description: 'Build custom yield strategies and automate capital allocation.',
        available: true,
        examples: [
          {
            domain: 'treasury',
            title: 'Yield Optimization',
            description: 'Automatically route to highest yield',
            code: `from immix import Client

client = Client(api_key="your_key")

# Get current yield rates
yields = client.earn.get_rates(asset="USDC")
for y in yields:
    print(f"{y.protocol}: {y.apy:.2f}% APY")

# Deploy to best yield
best = max(yields, key=lambda y: y.apy)
position = client.earn.deposit(
    protocol=best.protocol,
    asset="USDC",
    amount=50000
)

print(f"Deposited to {best.protocol}")
print(f"Expected annual: \${50000 * best.apy / 100:,.2f}")`,
            filename: 'yield_optimizer.py'
          }
        ]
      }
    ]
  },
  {
    id: 'transfer',
    name: 'Transfer',
    tagline: 'Cross-border value movement',
    icon: <ArrowRightLeft size={20} />,
    image: '/image copy.png',
    integrations: [
      {
        level: 'low-code',
        headline: 'Transfer Workflows',
        description: 'Configure multi-step transfer workflows for cross-border payments.',
        available: true,
        examples: [
          {
            domain: 'payments',
            title: 'Cross-Border Config',
            description: 'SGD to MXN transfer workflow',
            code: `# transfer-workflow.yaml
name: sgd_to_mxn
description: Singapore to Mexico corridor

steps:
  - action: buy
    market: SGD/USDT
    venue: binance

  - action: transfer
    asset: USDT
    from: binance
    to: bitso

  - action: sell
    market: MXN/USDT
    venue: bitso

# Coming soon: DeFi bridge integration
# for multi-chain transfers`,
            filename: 'transfer-workflow.yaml'
          }
        ]
      },
      {
        level: 'sdk',
        headline: 'Programmable Transfers',
        description: 'Build custom transfer logic with automatic FX conversion and routing.',
        available: true,
        examples: [
          {
            domain: 'payments',
            title: 'Cross-Border Payment',
            description: 'Execute multi-hop cross-border transfer',
            code: `from immix import Client

client = Client(api_key="your_key")

# Get optimal route
route = client.transfer.get_route(
    source_currency="SGD",
    target_currency="MXN",
    amount=10000
)

print(f"Route: {' -> '.join(route.path)}")
print(f"FX Rate: {route.rate:.4f}")
print(f"Total Fees: \${route.fees:.2f}")

# Execute transfer
tx = client.transfer.execute(
    route=route,
    beneficiary={
        "name": "Acme Corp MX",
        "account": "MX123456789"
    }
)

print(f"Transfer {tx.id}: {tx.status}")`,
            filename: 'cross_border.py'
          }
        ]
      },
      {
        level: 'api',
        headline: 'Real-Time Settlement',
        description: 'WebSocket notifications for transfer status and settlement confirmation.',
        available: true,
        examples: [
          {
            domain: 'payments',
            title: 'Transfer Monitoring',
            description: 'Track transfers in real-time',
            code: `from immix import Client

client = Client(api_key="your_key")

# Monitor transfer status
def on_status(event):
    print(f"Transfer {event.id}: {event.status}")
    if event.status == "COMPLETED":
        print(f"  Amount: {event.amount} {event.currency}")
        print(f"  FX Rate: {event.rate}")

# Subscribe to transfer events
client.ws.subscribe_transfers(
    on_status=on_status,
    transfer_ids=["tx_abc123"]
)

# Batch transfer API
batch = client.transfer.batch([
    {"to": "vendor_a", "amount": 5000, "currency": "MXN"},
    {"to": "vendor_b", "amount": 3000, "currency": "MXN"},
])`,
            filename: 'transfer_monitor.py'
          }
        ]
      }
    ]
  }
];

export const ProductSolutions = () => {
  const [activeProduct, setActiveProduct] = useState<string>('trade');
  const [activeLevel, setActiveLevel] = useState<IntegrationLevel>('sdk');

  const currentProduct = products.find(p => p.id === activeProduct) || products[0];

  const availableLevels = currentProduct.integrations.map(i => i.level);
  const currentIntegration = currentProduct.integrations.find(i => i.level === activeLevel)
    || currentProduct.integrations[0];

  const handleLevelChange = useCallback((level: IntegrationLevel) => {
    if (availableLevels.includes(level)) {
      setActiveLevel(level);
    }
  }, [availableLevels]);

  const handleProductChange = useCallback((productId: string) => {
    setActiveProduct(productId);
    const product = products.find(p => p.id === productId);
    if (product) {
      const defaultLevel = product.integrations.find(i => i.level === 'sdk')?.level
        || product.integrations[0]?.level;
      if (defaultLevel) {
        setActiveLevel(defaultLevel);
      }
    }
  }, []);

  const currentExample = currentIntegration?.examples[0];
  const levelIndex = integrationLevels.findIndex(l => l.id === activeLevel);
  const sliderPosition = (levelIndex / (integrationLevels.length - 1)) * 100;

  return (
    <section id="solutions" className="section-wrapper overflow-hidden">
      <div className="container-max space-y-12">
        <div className="text-center space-y-4">
          <AnimatedElement type="fadeInUp">
            <h2 className="text-4xl md:text-5xl font-bold">One platform. Every level of control.</h2>
          </AnimatedElement>
          <AnimatedElement type="fadeInUp" delay={0.1}>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              From no-code dashboards to full API access. Choose how you want to build.
            </p>
          </AnimatedElement>
        </div>

        <AnimatedElement type="fadeInUp" delay={0.2}>
          <div className="flex flex-wrap justify-center gap-3">
            {products.map((product) => (
              <motion.button
                key={product.id}
                onClick={() => handleProductChange(product.id)}
                className={`
                  flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all
                  ${activeProduct === product.id
                    ? 'bg-white text-gray-900'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                  }
                `}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className={activeProduct === product.id ? 'text-gray-700' : 'text-white/50'}>
                  {product.icon}
                </span>
                {product.name}
                {product.comingSoon && (
                  <span className="text-[10px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded font-medium">
                    SOON
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        </AnimatedElement>

        <AnimatedElement type="fadeInUp" delay={0.3}>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="flex justify-between mb-3">
                {integrationLevels.map((level) => {
                  const isAvailable = availableLevels.includes(level.id);
                  const isActive = activeLevel === level.id;

                  return (
                    <button
                      key={level.id}
                      onClick={() => handleLevelChange(level.id)}
                      disabled={!isAvailable}
                      className={`
                        flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all relative z-10
                        ${isActive
                          ? 'text-white'
                          : isAvailable
                            ? 'text-white/40 hover:text-white/70'
                            : 'text-white/20 cursor-not-allowed'
                        }
                      `}
                    >
                      <span className={`
                        p-2 rounded-full transition-all
                        ${isActive ? 'bg-blue-500 text-white' : 'bg-white/5'}
                      `}>
                        {level.icon}
                      </span>
                      <span className="text-sm font-medium">{level.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="relative h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
                  initial={false}
                  animate={{ width: `${sliderPosition}%` }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              </div>

              <div className="flex justify-between mt-2 text-xs text-white/30">
                <span>Visual</span>
                <span>Programmatic</span>
              </div>
            </div>
          </div>
        </AnimatedElement>

        <motion.div
          key={activeProduct}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <p className="text-white/60 text-lg">{currentProduct.tagline}</p>
        </motion.div>

        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeProduct}-${activeLevel}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                      {integrationLevels.find(l => l.id === activeLevel)?.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {currentIntegration?.headline}
                      </h3>
                      <p className="text-sm text-white/40">
                        {integrationLevels.find(l => l.id === activeLevel)?.description}
                      </p>
                    </div>
                  </div>

                  <p className="text-white/60 leading-relaxed">
                    {currentIntegration?.description}
                  </p>

                  {currentExample && (
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.02]">
                        <div className="flex items-center gap-3">
                          <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-white/10" />
                            <div className="w-3 h-3 rounded-full bg-white/10" />
                            <div className="w-3 h-3 rounded-full bg-white/10" />
                          </div>
                          <span className="text-sm text-white/50 font-mono">
                            {currentExample.filename}
                          </span>
                        </div>
                        <button className="text-white/30 hover:text-white/60 transition-colors">
                          <ExternalLink size={14} />
                        </button>
                      </div>
                      <div className="p-4 overflow-x-auto">
                        <pre className="text-sm font-mono leading-relaxed">
                          <code className="text-white/80">
                            {currentExample.code.split('\n').map((line, i) => (
                              <div key={i} className="flex">
                                <span className="text-white/20 w-8 flex-shrink-0 select-none text-right pr-4">
                                  {i + 1}
                                </span>
                                <span className={
                                  line.trim().startsWith('#') || line.trim().startsWith('//')
                                    ? 'text-white/30'
                                    : line.includes('client.') || line.includes('Client')
                                      ? 'text-blue-400'
                                      : line.includes('print') || line.includes('def ') || line.includes('for ') || line.includes('if ')
                                        ? 'text-emerald-400'
                                        : 'text-white/70'
                                }>
                                  {line || ' '}
                                </span>
                              </div>
                            ))}
                          </code>
                        </pre>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-white/40">Use case:</span>
                    <span className={`
                      px-2 py-1 rounded text-xs font-medium
                      ${currentExample?.domain === 'trading'
                        ? 'bg-blue-500/10 text-blue-400'
                        : currentExample?.domain === 'treasury'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : 'bg-amber-500/10 text-amber-400'
                      }
                    `}>
                      {currentExample?.domain === 'trading' ? 'Trading'
                        : currentExample?.domain === 'treasury' ? 'Treasury'
                        : 'Payments'}
                    </span>
                    <span className="text-white/40 ml-2">{currentExample?.title}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="lg:col-span-7 relative hidden lg:block">
              <div className="relative h-[500px]">
                <div className="absolute inset-0 w-[180%] -right-[80%]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentProduct.id}
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0"
                    >
                      <img
                        src={currentProduct.image}
                        alt={`${currentProduct.name} Interface`}
                        className="w-full h-full object-cover object-left-top rounded-lg"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/60 via-15% to-transparent pointer-events-none z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none z-10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

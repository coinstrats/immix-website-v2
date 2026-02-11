import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Briefcase, Zap } from 'lucide-react';
import { AnimatedElement, IntegrationDeck } from '../ui';
import type { IntegrationExample } from '../ui';

interface UseCase {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
  image: string;
  sdk: { code: string; filename: string };
  python: { code: string; filename: string };
  api: { code: string; filename: string };
}

const useCases: UseCase[] = [
  {
    id: 'trading',
    label: 'Trading',
    icon: <BarChart3 size={18} />,
    description: 'Execute across 70+ venues with a single API. Smart order routing, basis trading, and market making — all with the same code.',
    image: '/image.png',
    sdk: {
      code: `// Atomic basis trade: buy spot, sell perp
public void onTick(MarketData spot, MarketData perp) {
    double spread = perp.midPrice() - spot.midPrice();

    if (spread > threshold) {
        execution.atomicPair(
            Order.limit("BINANCE", "BTC-USDT",
                Side.BUY, size, spot.ask),
            Order.limit("BINANCE", "BTC-USDT-PERP",
                Side.SELL, size, perp.bid)
        );
    }
}`,
      filename: 'BasisStrategy.java'
    },
    python: {
      code: `from immix import Client

client = Client(api_key="your_key")

spot = client.market_data.quote("BINANCE", "BTC-USDT")
perp = client.market_data.quote("BINANCE", "BTC-USDT-PERP")

spread = perp.mid - spot.mid
print(f"Current spread: \${spread:.2f}")

if spread > 50:
    client.trading.atomic_pair(
        buy=("BINANCE", "BTC-USDT", 0.1, spot.ask),
        sell=("BINANCE", "BTC-USDT-PERP", 0.1, perp.bid)
    )`,
      filename: 'basis_trade.py'
    },
    api: {
      code: `-> { "op": "subscribe", "channel": "ticker",
     "symbols": ["BTC-USDT", "BTC-USDT-PERP"] }

<- { "channel": "ticker", "symbol": "BTC-USDT",
     "bid": 42150.00, "ask": 42152.50 }

<- { "channel": "ticker", "symbol": "BTC-USDT-PERP",
     "bid": 42198.00, "ask": 42200.50 }

-> { "op": "order", "type": "atomic_pair",
     "legs": [
       { "symbol": "BTC-USDT", "side": "BUY", "size": 0.1 },
       { "symbol": "BTC-USDT-PERP", "side": "SELL", "size": 0.1 }
     ]}

<- { "op": "order_ack", "order_id": "ord_abc123",
     "status": "FILLED", "fill_price": 42151.25 }`,
      filename: 'ws-trading.json'
    }
  },
  {
    id: 'treasury',
    label: 'Treasury',
    icon: <Briefcase size={18} />,
    description: 'Automate portfolio rebalancing across exchanges and custody providers. Monitor balances and execute multi-step workflows with a single command.',
    image: '/balance-map.png',
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
      filename: 'Rebalancer.java'
    },
    python: {
      code: `from immix import Client

client = Client(api_key="your_key")

balances = client.treasury.balances(asset="BTC")
total = sum(b.free for b in balances)
target = total / len(balances)

print(f"Target per venue: {target:.4f} BTC")

for b in balances:
    if b.free > target + 0.1:
        excess = b.free - target
        client.treasury.transfer(
            from_venue=b.venue,
            to_venue="FIREBLOCKS",
            asset="BTC",
            amount=excess
        )`,
      filename: 'rebalance.py'
    },
    api: {
      code: `-> { "op": "subscribe", "channel": "balances",
     "venues": ["BINANCE", "COINBASE", "FIREBLOCKS"] }

<- { "channel": "balances",
     "data": [
       { "venue": "BINANCE", "asset": "BTC", "free": 2.5 },
       { "venue": "COINBASE", "asset": "BTC", "free": 1.8 },
       { "venue": "FIREBLOCKS", "asset": "BTC", "free": 10.0 }
     ]}

-> { "op": "transfer",
     "from": "BINANCE", "to": "COINBASE",
     "asset": "BTC", "amount": 0.35 }

<- { "op": "transfer_ack", "tx_id": "tx_xyz789",
     "status": "PENDING", "eta_seconds": 300 }`,
      filename: 'ws-treasury.json'
    }
  },
  {
    id: 'payments',
    label: 'Payments',
    icon: <Zap size={18} />,
    description: 'Build cross-border payment rails on crypto. Route payments through the most efficient corridors and settle in milliseconds.',
    image: '/image.png',
    sdk: {
      code: `// Multi-hop cross-border payment
public void onPaymentRequest(Payment p) {
    // 1. Convert fiat to stablecoin
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
      filename: 'CrossBorderPayment.java'
    },
    python: {
      code: `from immix import Client

client = Client(api_key="your_key")

route = client.payments.get_route(
    source="SGD",
    destination="MXN",
    amount=10000
)

print(f"Route: {route.path}")
print(f"FX rate: {route.rate}")
print(f"Fees: \${route.fees}")

payment = client.payments.send(
    route=route,
    beneficiary="Acme Corp MX",
    reference="INV-2024-001"
)

print(f"Payment {payment.id}: {payment.status}")`,
      filename: 'cross_border.py'
    },
    api: {
      code: `-> { "op": "subscribe", "channel": "payments",
     "payment_id": "pay_abc123" }

-> { "op": "payment_create",
     "source": "SGD", "destination": "MXN",
     "amount": 10000,
     "beneficiary": { "name": "Acme Corp MX" }}

<- { "channel": "payment_status",
     "step": 1, "status": "SGD_TO_USDC_COMPLETE" }

<- { "channel": "payment_status",
     "step": 2, "status": "USDC_TRANSFERRED" }

<- { "channel": "payment_status",
     "step": 3, "status": "COMPLETED",
     "fx_rate": 13.45, "fees": 12.50 }`,
      filename: 'ws-payments.json'
    }
  }
];

export const ProductSolutions = () => {
  const [activeUseCase, setActiveUseCase] = useState(useCases[0].id);
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});

  const currentUseCase = useCases.find(uc => uc.id === activeUseCase) || useCases[0];

  useEffect(() => {
    useCases.forEach(uc => {
      const img = new Image();
      img.onload = () => {
        setImagesLoaded(prev => ({ ...prev, [uc.image]: true }));
      };
      img.src = uc.image;
    });
  }, []);

  const integrationExamples: IntegrationExample[] = useMemo(() => [
    {
      id: 'api',
      label: 'WebSocket API',
      subtitle: 'Streaming',
      code: currentUseCase.api.code,
      filename: currentUseCase.api.filename,
      language: 'websocket' as const
    },
    {
      id: 'python',
      label: 'Python',
      subtitle: 'Quickstart',
      code: currentUseCase.python.code,
      filename: currentUseCase.python.filename,
      language: 'python' as const
    },
    {
      id: 'sdk',
      label: 'Java SDK',
      subtitle: 'Full SDK',
      code: currentUseCase.sdk.code,
      filename: currentUseCase.sdk.filename,
      language: 'java' as const
    }
  ], [currentUseCase]);

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
          <div className="flex justify-center gap-3">
            {useCases.map((uc) => (
              <motion.button
                key={uc.id}
                onClick={() => setActiveUseCase(uc.id)}
                className={`
                  flex items-center gap-2 px-6 py-3 font-semibold text-base transition-all rounded-lg
                  ${activeUseCase === uc.id
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                  }
                `}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className={activeUseCase === uc.id ? 'text-white/80' : 'text-white/40'}>
                  {uc.icon}
                </span>
                {uc.label}
              </motion.button>
            ))}
          </div>
        </AnimatedElement>

        <motion.p
          key={activeUseCase}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-lg text-white/60 leading-relaxed text-center max-w-3xl mx-auto"
        >
          {currentUseCase.description}
        </motion.p>

        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 relative z-30">
              <motion.div
                key={activeUseCase}
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
              <div className="relative h-[560px]">
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

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedElement } from '../ui';

interface Pattern {
  id: string;
  label: string;
  context?: string;
  code: string;
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
}`
      },
      {
        id: 'market-making',
        label: 'Market Making',
        context: 'Quote liquid pairs across venues with auto-hedging and inventory skew protection.',
        code: `// Multi-venue market making with inventory skew
public void quote() {
    double fairPrice = pricingEngine.calcFairPrice("BTC-USDT");
    double skew = position.inventory() * riskFactor;

    // Quote on Binance & Coinbase simultaneously
    algoOrderPublisher.publish(
        Order.limit("BINANCE", Side.BUY, fairPrice - spread - skew, qty),
        Order.limit("COINBASE", Side.SELL, fairPrice + spread - skew, qty)
    );
}`
      },
      {
        id: 'arbitrage',
        label: 'Cross-Venue Arbitrage',
        code: `// Latency-sensitive arbitrage logic
if (coinbase.bid > binance.ask + fees) {
    execution.smartRouter("BTC-USDT")
        .withStrategy(Strategy.ARBITRAGE)
        .legs(
            Leg.buy("BINANCE", size),
            Leg.sell("COINBASE", size)
        )
        .execute();
}`
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
}`
      },
      {
        id: 'yield',
        label: 'Stablecoin Yield',
        code: `// Route idle USDC to highest yield protocol
double aaveRate = marketData.getYield("AAVE", "USDC");
double compRate = marketData.getYield("COMP", "USDC");

if (aaveRate > compRate + minDiff) {
    treasury.withdraw("COMP", "USDC", amount)
           .then()
           .deposit("AAVE", "USDC", amount)
           .execute();
}`
      },
      {
        id: 'sweep',
        label: 'Daily Sweep',
        code: `// Sweep excess cash to Cold Storage at 23:59
@OnTimer(cron = "59 23 * * *")
public void dailySweep() {
    Balance cash = treasury.getBalance("HOT_WALLET");
    if (cash > operatingBuffer) {
        treasury.transfer()
            .from("HOT_WALLET")
            .to("FIREBLOCKS_VAULT")
            .amount(cash - operatingBuffer)
            .execute();
    }
}`
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
        code: `// Route international payments via crypto rails
public void onPaymentRequest(Payment p) {
    // 1. Convert Fiat to Stablecoin
    execution.smartRouter("SGD-USDC").side(Side.BUY).amount(p.amount).execute();

    // 2. Transfer across borders
    treasury.transfer("USDC").from("SG_NODE").to("MX_NODE").execute();

    // 3. Off-ramp to local currency
    execution.smartRouter("USDC-MXN").side(Side.SELL).execute();
}`
      },
      {
        id: 'smart-router',
        label: 'Smart Routing',
        code: `// Optimize FX conversion path
Quote quote = router.getBestQuote("EUR", "USD", amount, Strategies.MIN_SLIPPAGE);

// Path: EUR -> KRAKEN(EUR/USDT) -> BINANCE(USDT/USD) -> USD
log.info("Best path: " + quote.getPath());

quote.execute();`
      },
      {
        id: 'hedging',
        label: 'Auto-Hedger',
        code: `// Auto-hedge incoming crypto payments
@OnWebhook("/payment/receive")
public void onReceive(Payment p) {
    if (p.currency.equals("BTC")) {
        // Lock in USD value immediately
        execution.smartRouter("BTC-USD")
            .side(Side.SELL)
            .amount(p.amount)
            .execute();
    }
}`
      }
    ]
  }
];

const JavaSyntaxHighlighter = ({ code }: { code: string }) => {
  const keywords = new Set([
    'public', 'private', 'protected', 'static', 'final', 'void', 'double', 'int', 'long',
    'boolean', 'String', 'class', 'interface', 'enum', 'if', 'else', 'for', 'while',
    'return', 'new', 'throw', 'try', 'catch', 'finally', 'var'
  ]);

  const types = new Set([
    'Map', 'List', 'HashMap', 'ArrayList', 'Comparator', 'TimeInForce', 'Side', 'Balance',
    'Payment', 'Deposit', 'Quote', 'YieldProduct', 'MarketData', 'Order', 'Venue',
    'Strategy', 'Leg', 'Strategies'
  ]);

  const highlightLine = (line: string) => {
    const tokens: JSX.Element[] = [];
    let currentIndex = 0;
    let tokenId = 0;

    const commentIndex = line.indexOf('//');
    const codeBeforeComment = commentIndex !== -1 ? line.substring(0, commentIndex) : line;
    const comment = commentIndex !== -1 ? line.substring(commentIndex) : '';

    const tokenRegex = /(@\w+(?:\([^)]*\))?)|("(?:[^"\\]|\\.)*")|(\b\d+\.?\d*\b)|(\b[a-zA-Z_]\w*\b)|([^\s\w])/g;
    let match;

    while ((match = tokenRegex.exec(codeBeforeComment)) !== null) {
      if (match.index > currentIndex) {
        const whitespace = codeBeforeComment.substring(currentIndex, match.index);
        tokens.push(<span key={`ws-${tokenId++}`}>{whitespace}</span>);
      }

      const token = match[0];

      if (match[1]) {
        tokens.push(<span key={`ann-${tokenId++}`} className="text-yellow-400">{token}</span>);
      } else if (match[2]) {
        tokens.push(<span key={`str-${tokenId++}`} className="text-orange-400">{token}</span>);
      } else if (match[3]) {
        tokens.push(<span key={`num-${tokenId++}`} className="text-purple-400">{token}</span>);
      } else if (keywords.has(token)) {
        tokens.push(<span key={`kw-${tokenId++}`} className="text-blue-400">{token}</span>);
      } else if (types.has(token)) {
        tokens.push(<span key={`type-${tokenId++}`} className="text-blue-400">{token}</span>);
      } else {
        tokens.push(<span key={`txt-${tokenId++}`}>{token}</span>);
      }

      currentIndex = match.index + token.length;
    }

    if (currentIndex < codeBeforeComment.length) {
      tokens.push(<span key={`end-${tokenId++}`}>{codeBeforeComment.substring(currentIndex)}</span>);
    }

    if (comment) {
      tokens.push(<span key={`cmt-${tokenId++}`} className="text-green-500/60">{comment}</span>);
    }

    return tokens;
  };

  const lines = code.split('\n');

  return (
    <pre className="text-sm leading-relaxed">
      <code className="font-mono text-white/90">
        {lines.map((line, i) => (
          <div key={i} className="flex hover:bg-white/5">
            <span className="text-white/30 select-none mr-4 text-right min-w-[2rem]">{i + 1}</span>
            <span className="whitespace-pre">{highlightLine(line)}</span>
          </div>
        ))}
      </code>
    </pre>
  );
};

export const SolutionsEngine = () => {
  const [activeUseCase, setActiveUseCase] = useState(useCases[0].id);
  const [activePattern, setActivePattern] = useState(useCases[0].patterns[0].id);

  const currentUseCase = useCases.find(uc => uc.id === activeUseCase) || useCases[0];
  const currentPattern = currentUseCase.patterns.find(p => p.id === activePattern) || currentUseCase.patterns[0];

  const handleUseCaseChange = (useCaseId: string) => {
    setActiveUseCase(useCaseId);
    const useCase = useCases.find(uc => uc.id === useCaseId);
    if (useCase) {
      setActivePattern(useCase.patterns[0].id);
    }
  };

  return (
    <section id="solutions" className="section-wrapper">
      <div className="container-max space-y-12">
        <div className="text-center space-y-4">
          <AnimatedElement type="fadeInUp">
            <h2 className="text-4xl md:text-5xl font-bold">Solutions for every workflow.</h2>
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

        <AnimatePresence mode="wait">
          <motion.div
            key={activeUseCase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="mb-12"
          >
            <p className="text-xl text-white/70 leading-relaxed text-center max-w-4xl mx-auto">
              {currentUseCase.description}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeUseCase}-${activePattern}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-white/50 uppercase tracking-wider">SDK Patterns</h4>
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
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {pattern.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {currentPattern.context && (
                <p className="text-sm text-white/60 leading-relaxed">
                  {currentPattern.context}
                </p>
              )}

              <div className="bg-[#0a0a0a] border border-white/10 overflow-hidden h-[656px] flex flex-col">
                <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
                  </div>
                  <span className="text-xs text-white/50 font-mono ml-2">{currentPattern.label}.java</span>
                </div>
                <div className="p-6 overflow-x-auto overflow-y-auto flex-1">
                  <JavaSyntaxHighlighter code={currentPattern.code} />
                </div>
              </div>

              <p className="text-sm text-white/50 font-mono">
                SDKs available in: Java, C++, Go, Python, Rust
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="relative flex flex-col">
            <div className="space-y-6 flex-shrink-0">
              <div className="space-y-3">
                <div className="h-[20px]"></div>
                <div className="h-[40px]"></div>
              </div>
              {currentPattern.context && (
                <div className="h-[42px]"></div>
              )}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeUseCase}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="relative overflow-visible"
              >
                <div className="relative w-[180%] -mr-[80%] h-[656px]">
                  <div className="absolute inset-0 rounded-lg" style={{ boxShadow: '0 0 80px 20px rgba(59, 130, 246, 0.15), 0 0 120px 40px rgba(59, 130, 246, 0.08)' }} />
                  <img
                    src={currentUseCase.image}
                    alt="Platform UI Preview"
                    className="w-full h-full object-cover object-left-top rounded-lg relative z-10"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/20 via-transparent via-40% to-[#050505] pointer-events-none rounded-lg z-20" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent from-60% to-[#050505] pointer-events-none rounded-lg z-20" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/40 via-transparent to-transparent pointer-events-none rounded-lg z-20" />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/20 via-transparent to-transparent pointer-events-none rounded-lg z-20" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

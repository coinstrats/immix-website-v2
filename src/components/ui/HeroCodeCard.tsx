const pythonCode = `from immix import ImmixClient

client = ImmixClient(api_key="sk_live_...")

stream = client.market_data.subscribe(
    symbols=["BTC/USDT", "ETH/USDT"],
    venues=["binance", "okx", "bybit"],
    channels=["orderbook", "trades"]
)

for tick in stream:
    spread = tick.best_ask - tick.best_bid
    if spread > client.config.threshold:
        client.orders.submit(tick.signal)`;

const highlightLine = (line: string) => {
  const keywords = new Set([
    'from', 'import', 'for', 'in', 'if', 'as', 'def', 'class',
    'return', 'async', 'await', 'with', 'True', 'False', 'None'
  ]);

  const tokens: JSX.Element[] = [];
  let currentIndex = 0;
  let tokenId = 0;

  const commentIndex = line.indexOf('#');
  const codeBeforeComment = commentIndex !== -1 ? line.substring(0, commentIndex) : line;
  const comment = commentIndex !== -1 ? line.substring(commentIndex) : '';

  const tokenRegex = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(\b\d+\.?\d*\b)|(\b[a-zA-Z_]\w*\b)|([^\s\w])/g;
  let match;

  while ((match = tokenRegex.exec(codeBeforeComment)) !== null) {
    if (match.index > currentIndex) {
      tokens.push(<span key={`ws-${tokenId++}`}>{codeBeforeComment.substring(currentIndex, match.index)}</span>);
    }

    const token = match[0];

    if (match[1]) {
      tokens.push(<span key={`str-${tokenId++}`} className="text-orange-400">{token}</span>);
    } else if (match[2]) {
      tokens.push(<span key={`num-${tokenId++}`} className="text-cyan-400">{token}</span>);
    } else if (keywords.has(token)) {
      tokens.push(<span key={`kw-${tokenId++}`} className="text-blue-400">{token}</span>);
    } else if (token === 'ImmixClient' || token === 'client') {
      tokens.push(<span key={`type-${tokenId++}`} className="text-cyan-300">{token}</span>);
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

export const HeroCodeCard = () => {
  const lines = pythonCode.split('\n');

  return (
    <div className="w-[260px] bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/[0.08] rounded-lg overflow-hidden"
      style={{
        boxShadow: '0 0 60px 12px rgba(0, 115, 255, 0.06), 0 25px 50px -12px rgba(0, 0, 0, 0.7)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <div className="px-3 py-2 border-b border-white/[0.06] flex items-center gap-2 bg-white/[0.02]">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
          <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
          <div className="w-2 h-2 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-[10px] text-yellow-400/80 font-mono">Python</span>
        <span className="text-[9px] text-white/25 font-mono ml-auto">strategy.py</span>
      </div>

      <div className="px-3 py-3 overflow-hidden">
        <pre className="text-[9.5px] leading-[1.75]">
          <code className="font-mono text-white/85">
            {lines.map((line, i) => (
              <div key={i} className="flex">
                <span className="text-white/20 select-none mr-3 text-right w-4 shrink-0 text-[9px]">{i + 1}</span>
                <span className="whitespace-pre">{highlightLine(line)}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
};

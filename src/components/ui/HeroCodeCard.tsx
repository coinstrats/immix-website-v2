const pythonCode = `from immix import Client

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

# Stream execution reports
for fill in order.stream_fills():
    update_position(fill)
    log_execution(fill.venue, fill.price)`;

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
    } else if (token === 'Client' || token === 'client' || token === 'order') {
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
    <div
      className="w-[360px] rounded-xl overflow-hidden"
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
      }}
    >
      <div className="px-5 py-4">
        <pre className="text-[11px] leading-[1.8]">
          <code className="font-mono text-white/85">
            {lines.map((line, i) => (
              <div key={i}>
                <span className="whitespace-pre">{highlightLine(line)}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
};

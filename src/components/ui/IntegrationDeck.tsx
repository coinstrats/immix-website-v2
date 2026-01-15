import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Copy, Check, ExternalLink, Code2, Terminal, Zap, ChevronLeft, ChevronRight } from 'lucide-react';

export interface IntegrationExample {
  id: string;
  label: string;
  subtitle: string;
  code: string;
  filename: string;
  docUrl?: string;
  docTooltip?: string;
  language: 'java' | 'python' | 'websocket' | 'rest';
}

interface IntegrationDeckProps {
  examples: IntegrationExample[];
  defaultActive?: string;
}

const languageColors: Record<string, { text: string; bg: string; border: string }> = {
  java: { text: 'text-orange-400', bg: 'bg-orange-500/15', border: 'border-orange-500/30' },
  python: { text: 'text-yellow-400', bg: 'bg-yellow-500/15', border: 'border-yellow-500/30' },
  websocket: { text: 'text-emerald-400', bg: 'bg-emerald-500/15', border: 'border-emerald-500/30' },
  rest: { text: 'text-green-400', bg: 'bg-green-500/15', border: 'border-green-500/30' }
};

const languageIcons: Record<string, React.ReactNode> = {
  java: <Code2 size={14} />,
  python: <Terminal size={14} />,
  websocket: <Zap size={14} />,
  rest: <Zap size={14} />
};

const JavaSyntaxHighlighter = ({ code }: { code: string }) => {
  const keywords = new Set([
    'public', 'private', 'protected', 'static', 'final', 'void', 'double', 'int', 'long',
    'boolean', 'String', 'class', 'interface', 'enum', 'if', 'else', 'for', 'while',
    'return', 'new', 'throw', 'try', 'catch', 'finally', 'var'
  ]);

  const types = new Set([
    'Map', 'List', 'HashMap', 'ArrayList', 'Comparator', 'TimeInForce', 'Side', 'Balance',
    'Payment', 'Deposit', 'Quote', 'YieldProduct', 'MarketData', 'Order', 'Venue',
    'Strategy', 'Leg', 'Strategies', 'ImmixClient', 'OrderResponse', 'Position'
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
        tokens.push(<span key={`ws-${tokenId++}`}>{codeBeforeComment.substring(currentIndex, match.index)}</span>);
      }
      const token = match[0];
      if (match[1]) {
        tokens.push(<span key={`ann-${tokenId++}`} className="text-yellow-400">{token}</span>);
      } else if (match[2]) {
        tokens.push(<span key={`str-${tokenId++}`} className="text-orange-400">{token}</span>);
      } else if (match[3]) {
        tokens.push(<span key={`num-${tokenId++}`} className="text-cyan-400">{token}</span>);
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

  return (
    <pre className="text-[11px] leading-relaxed">
      <code className="font-mono text-white/90">
        {code.split('\n').map((line, i) => (
          <div key={i} className="flex">
            <span className="text-white/20 select-none mr-4 text-right w-5">{i + 1}</span>
            <span className="whitespace-pre">{highlightLine(line)}</span>
          </div>
        ))}
      </code>
    </pre>
  );
};

const PythonSyntaxHighlighter = ({ code }: { code: string }) => {
  const keywords = new Set([
    'import', 'from', 'as', 'def', 'class', 'if', 'else', 'elif', 'for', 'while',
    'return', 'try', 'except', 'finally', 'with', 'async', 'await', 'None', 'True', 'False',
    'and', 'or', 'not', 'in', 'is', 'lambda', 'pass', 'break', 'continue'
  ]);

  const builtins = new Set(['print', 'len', 'range', 'str', 'int', 'float', 'list', 'dict', 'set', 'tuple', 'sum', 'max', 'min']);

  const highlightLine = (line: string) => {
    const tokens: JSX.Element[] = [];
    let currentIndex = 0;
    let tokenId = 0;

    const commentIndex = line.indexOf('#');
    const codeBeforeComment = commentIndex !== -1 ? line.substring(0, commentIndex) : line;
    const comment = commentIndex !== -1 ? line.substring(commentIndex) : '';

    const tokenRegex = /(@\w+)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(\b\d+\.?\d*\b)|(\b[a-zA-Z_]\w*\b)|([^\s\w])/g;
    let match;

    while ((match = tokenRegex.exec(codeBeforeComment)) !== null) {
      if (match.index > currentIndex) {
        tokens.push(<span key={`ws-${tokenId++}`}>{codeBeforeComment.substring(currentIndex, match.index)}</span>);
      }
      const token = match[0];
      if (match[1]) {
        tokens.push(<span key={`dec-${tokenId++}`} className="text-yellow-400">{token}</span>);
      } else if (match[2]) {
        tokens.push(<span key={`str-${tokenId++}`} className="text-orange-400">{token}</span>);
      } else if (match[3]) {
        tokens.push(<span key={`num-${tokenId++}`} className="text-cyan-400">{token}</span>);
      } else if (keywords.has(token)) {
        tokens.push(<span key={`kw-${tokenId++}`} className="text-blue-400">{token}</span>);
      } else if (builtins.has(token)) {
        tokens.push(<span key={`bi-${tokenId++}`} className="text-cyan-400">{token}</span>);
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

  return (
    <pre className="text-[11px] leading-relaxed">
      <code className="font-mono text-white/90">
        {code.split('\n').map((line, i) => (
          <div key={i} className="flex">
            <span className="text-white/20 select-none mr-4 text-right w-5">{i + 1}</span>
            <span className="whitespace-pre">{highlightLine(line)}</span>
          </div>
        ))}
      </code>
    </pre>
  );
};

const RestSyntaxHighlighter = ({ code }: { code: string }) => {
  const highlightLine = (line: string) => {
    if (line.startsWith('#') || line.startsWith('//')) {
      return <span className="text-green-500/60">{line}</span>;
    }
    if (line.match(/^(GET|POST|PUT|DELETE|PATCH)\s/)) {
      const [method, ...rest] = line.split(' ');
      return (
        <>
          <span className="text-blue-400 font-semibold">{method}</span>
          <span className="text-cyan-400"> {rest.join(' ')}</span>
        </>
      );
    }
    if (line.includes('->') || line.includes('<-')) {
      const arrowMatch = line.match(/^(.*?)(->|<-)(.*)/);
      if (arrowMatch) {
        return (
          <>
            <span className="text-white/70">{arrowMatch[1]}</span>
            <span className="text-emerald-400 font-semibold">{arrowMatch[2]}</span>
            <span className="text-cyan-400">{arrowMatch[3]}</span>
          </>
        );
      }
    }
    const jsonMatch = line.match(/^(\s*)(".*?")(:\s*)(.*)/);
    if (jsonMatch) {
      return (
        <>
          {jsonMatch[1]}
          <span className="text-blue-400">{jsonMatch[2]}</span>
          <span className="text-white/50">{jsonMatch[3]}</span>
          <span className="text-orange-400">{jsonMatch[4]}</span>
        </>
      );
    }
    return <span>{line}</span>;
  };

  return (
    <pre className="text-[11px] leading-relaxed">
      <code className="font-mono text-white/90">
        {code.split('\n').map((line, i) => (
          <div key={i} className="flex">
            <span className="text-white/20 select-none mr-4 text-right w-5">{i + 1}</span>
            <span className="whitespace-pre">{highlightLine(line)}</span>
          </div>
        ))}
      </code>
    </pre>
  );
};

const getSyntaxHighlighter = (language: string) => {
  switch (language) {
    case 'python': return PythonSyntaxHighlighter;
    case 'websocket':
    case 'rest': return RestSyntaxHighlighter;
    default: return JavaSyntaxHighlighter;
  }
};

interface CardProps {
  example: IntegrationExample;
  position: 'left' | 'center' | 'right';
  isActive: boolean;
  onClick: () => void;
  onCopy: () => void;
  copied: boolean;
  reducedMotion: boolean;
}

const CARD_WIDTH = 320;
const CENTER_CARD_WIDTH = 380;
const CARD_HEIGHT = 460;
const SIDE_OVERLAP_PERCENT = 0.55;

const DeckCard = ({
  example,
  position,
  isActive,
  onClick,
  onCopy,
  copied,
  reducedMotion
}: CardProps) => {
  const SyntaxHighlighter = getSyntaxHighlighter(example.language);
  const colors = languageColors[example.language];

  const getTransform = () => {
    const visiblePortion = CARD_WIDTH * (1 - SIDE_OVERLAP_PERCENT);
    const hiddenPortion = CARD_WIDTH * SIDE_OVERLAP_PERCENT;

    if (position === 'center') {
      return { x: 0, scale: 1, zIndex: 30, opacity: 1 };
    }
    if (position === 'left') {
      return {
        x: -visiblePortion,
        scale: 0.92,
        zIndex: 20,
        opacity: 0.4
      };
    }
    return {
      x: CENTER_CARD_WIDTH - hiddenPortion,
      scale: 0.92,
      zIndex: 20,
      opacity: 0.4
    };
  };

  const transform = getTransform();
  const cardWidth = position === 'center' ? CENTER_CARD_WIDTH : CARD_WIDTH;

  return (
    <motion.div
      initial={false}
      animate={{
        x: transform.x,
        scale: transform.scale,
        opacity: transform.opacity,
        width: cardWidth
      }}
      transition={reducedMotion ? { duration: 0 } : {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }}
      style={{ zIndex: transform.zIndex, width: cardWidth }}
      onClick={onClick}
      className="absolute left-1/2 top-0 -translate-x-1/2 cursor-pointer"
    >
      <div
        style={{ width: '100%', height: CARD_HEIGHT }}
        className={`
          bg-[#0a0a0a]/98 backdrop-blur-xl rounded-xl overflow-hidden
          border transition-all duration-200
          ${isActive
            ? 'border-blue-500/50 shadow-2xl shadow-blue-500/20'
            : 'border-white/10 shadow-xl shadow-black/40'
          }
        `}
      >
        <div className="px-3 py-2.5 border-b border-white/[0.06] flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-500/60"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500/60"></div>
              <div className="w-2 h-2 rounded-full bg-green-500/60"></div>
            </div>
            <div className="flex items-center gap-2">
              <span className={colors.text}>{languageIcons[example.language]}</span>
              <span className={`text-sm font-semibold ${colors.text}`}>{example.label}</span>
            </div>
          </div>

          {isActive && (
            <motion.div
              className="flex items-center gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className="text-[9px] text-white/30 font-mono">{example.filename}</span>
              <button
                onClick={(e) => { e.stopPropagation(); onCopy(); }}
                className="p-1 hover:bg-white/10 transition-colors rounded flex items-center gap-1"
                title="Copy code"
              >
                {copied ? (
                  <Check size={12} className="text-green-400" />
                ) : (
                  <Copy size={12} className="text-white/40 hover:text-white/70" />
                )}
              </button>
              {example.docUrl && (
                <a
                  href={example.docUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-1 hover:bg-white/10 transition-colors rounded"
                  title={example.docTooltip || 'View docs'}
                >
                  <ExternalLink size={12} className="text-white/40 hover:text-blue-400" />
                </a>
              )}
            </motion.div>
          )}
        </div>

        <div
          className={`
            h-[calc(100%-44px)] overflow-auto p-3
            scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10
            ${!isActive ? 'opacity-40' : ''}
          `}
          style={{ pointerEvents: isActive ? 'auto' : 'none' }}
        >
          <div className="min-w-max">
            <SyntaxHighlighter code={example.code} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const IntegrationDeck = ({ examples, defaultActive }: IntegrationDeckProps) => {
  const [activeId, setActiveId] = useState(defaultActive || examples[1]?.id || examples[0]?.id);
  const [copied, setCopied] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const reducedMotion = useReducedMotion() ?? false;

  const activeExample = examples.find(e => e.id === activeId);

  const orderedExamples = [
    examples.find(e => e.language === 'websocket' || e.language === 'rest') || examples[0],
    examples.find(e => e.language === 'python') || examples[1],
    examples.find(e => e.language === 'java') || examples[2]
  ].filter(Boolean);

  const getActiveIndex = () => orderedExamples.findIndex(e => e.id === activeId);

  const getCircularPosition = (example: IntegrationExample): 'left' | 'center' | 'right' => {
    if (example.id === activeId) return 'center';
    const activeIdx = getActiveIndex();
    const exampleIdx = orderedExamples.findIndex(e => e.id === example.id);
    const total = orderedExamples.length;
    const leftIdx = (activeIdx - 1 + total) % total;
    if (exampleIdx === leftIdx) return 'left';
    return 'right';
  };

  const navigateLeft = useCallback(() => {
    const activeIdx = orderedExamples.findIndex(e => e.id === activeId);
    const leftIdx = (activeIdx - 1 + orderedExamples.length) % orderedExamples.length;
    setActiveId(orderedExamples[leftIdx].id);
  }, [activeId, orderedExamples]);

  const navigateRight = useCallback(() => {
    const activeIdx = orderedExamples.findIndex(e => e.id === activeId);
    const rightIdx = (activeIdx + 1) % orderedExamples.length;
    setActiveId(orderedExamples[rightIdx].id);
  }, [activeId, orderedExamples]);

  const handleCopy = useCallback(async () => {
    if (activeExample) {
      await navigator.clipboard.writeText(activeExample.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [activeExample]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') navigateLeft();
    else if (e.key === 'ArrowRight') navigateRight();
  }, [navigateLeft, navigateRight]);

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) navigateRight();
      else navigateLeft();
    }
    setTouchStart(null);
  };

  useEffect(() => {
    if (defaultActive) setActiveId(defaultActive);
  }, [defaultActive]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const visibleSideWidth = CARD_WIDTH * (1 - SIDE_OVERLAP_PERCENT);
  const deckWidth = CENTER_CARD_WIDTH + visibleSideWidth;
  const leftShift = -180;

  const getAdjacentCards = () => {
    const activeIdx = getActiveIndex();
    const total = orderedExamples.length;
    const leftIdx = (activeIdx - 1 + total) % total;
    const rightIdx = (activeIdx + 1) % total;
    return {
      left: orderedExamples[leftIdx],
      right: orderedExamples[rightIdx]
    };
  };

  const adjacentCards = getAdjacentCards();

  return (
    <div
      className="relative"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ marginLeft: leftShift }}
    >
      <div
        className="relative overflow-visible"
        style={{ height: CARD_HEIGHT, width: deckWidth }}
      >
        <AnimatePresence mode="sync">
          {orderedExamples.map((example) => (
            <DeckCard
              key={example.id}
              example={example}
              position={getCircularPosition(example)}
              isActive={activeId === example.id}
              onClick={() => setActiveId(example.id)}
              onCopy={handleCopy}
              copied={copied && activeId === example.id}
              reducedMotion={reducedMotion}
            />
          ))}
        </AnimatePresence>
      </div>

      <div
        className="flex items-center justify-between mt-3 px-2"
        style={{ marginLeft: leftShift * -1, width: CENTER_CARD_WIDTH }}
      >
        <motion.button
          onClick={navigateLeft}
          className="flex items-center gap-1 text-white/30 hover:text-white/60 transition-colors cursor-pointer group"
          whileHover={{ x: -2 }}
        >
          <ChevronLeft size={12} className="text-white/20 group-hover:text-white/40" />
          <span className="text-[10px] font-medium">
            {adjacentCards.left?.label}
          </span>
        </motion.button>

        <motion.button
          onClick={navigateRight}
          className="flex items-center gap-1 text-white/30 hover:text-white/60 transition-colors cursor-pointer group"
          whileHover={{ x: 2 }}
        >
          <span className="text-[10px] font-medium">
            {adjacentCards.right?.label}
          </span>
          <ChevronRight size={12} className="text-white/20 group-hover:text-white/40" />
        </motion.button>
      </div>

      <div
        className="flex items-center justify-center gap-2 mt-4"
        style={{ marginLeft: leftShift * -1 }}
      >
        {orderedExamples.map((example) => (
          <button
            key={example.id}
            onClick={() => setActiveId(example.id)}
            className={`
              h-2 rounded-full transition-all duration-300
              ${activeId === example.id
                ? 'w-8 bg-blue-400'
                : 'w-2 bg-white/20 hover:bg-white/40'
              }
            `}
            aria-label={`View ${example.label}`}
          />
        ))}
      </div>

      <p className="text-[10px] text-white/30 text-center mt-2" style={{ marginLeft: leftShift * -1 }}>
        Click cards or swipe to navigate
      </p>
    </div>
  );
};

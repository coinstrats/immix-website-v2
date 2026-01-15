import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Copy, Check } from 'lucide-react';

interface CodeShowcaseCardProps {
  title: string;
  icon: React.ReactNode;
  code: string;
  language: 'java' | 'python' | 'rest';
  filename: string;
  docUrl?: string;
  docTooltip?: string;
  isActive: boolean;
  onClick: () => void;
  index: number;
  totalCards: number;
  hoveredIndex: number | null;
  onHover: (index: number | null) => void;
}

const languageLabels = {
  java: 'Java SDK',
  python: 'Python',
  rest: 'REST API'
};

const languageColors = {
  java: 'text-orange-400',
  python: 'text-yellow-400',
  rest: 'text-green-400'
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
        const whitespace = codeBeforeComment.substring(currentIndex, match.index);
        tokens.push(<span key={`ws-${tokenId++}`}>{whitespace}</span>);
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

  const lines = code.split('\n');

  return (
    <pre className="text-[11px] leading-relaxed">
      <code className="font-mono text-white/90">
        {lines.map((line, i) => (
          <div key={i} className="flex">
            <span className="text-white/20 select-none mr-2 text-right min-w-[1.25rem]">{i + 1}</span>
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

  const builtins = new Set([
    'print', 'len', 'range', 'str', 'int', 'float', 'list', 'dict', 'set', 'tuple', 'sum', 'max', 'min'
  ]);

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
        const whitespace = codeBeforeComment.substring(currentIndex, match.index);
        tokens.push(<span key={`ws-${tokenId++}`}>{whitespace}</span>);
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

  const lines = code.split('\n');

  return (
    <pre className="text-[11px] leading-relaxed">
      <code className="font-mono text-white/90">
        {lines.map((line, i) => (
          <div key={i} className="flex">
            <span className="text-white/20 select-none mr-2 text-right min-w-[1.25rem]">{i + 1}</span>
            <span className="whitespace-pre">{highlightLine(line)}</span>
          </div>
        ))}
      </code>
    </pre>
  );
};

const RestSyntaxHighlighter = ({ code }: { code: string }) => {
  const highlightLine = (line: string) => {
    let tokenId = 0;

    if (line.startsWith('#')) {
      return [<span key={`cmt-${tokenId}`} className="text-green-500/60">{line}</span>];
    }

    if (line.startsWith('curl') || line.startsWith('  curl')) {
      const parts = line.split(' ');
      return parts.map((part, idx) => {
        if (part === 'curl') {
          return <span key={`curl-${idx}`} className="text-blue-400">{part} </span>;
        } else if (part.startsWith('-')) {
          return <span key={`flag-${idx}`} className="text-yellow-400">{part} </span>;
        } else if (part.startsWith('"') || part.startsWith("'")) {
          return <span key={`str-${idx}`} className="text-orange-400">{part} </span>;
        } else if (part.startsWith('http')) {
          return <span key={`url-${idx}`} className="text-cyan-400">{part} </span>;
        }
        return <span key={`txt-${idx}`}>{part} </span>;
      });
    }

    const methodMatch = line.match(/^(GET|POST|PUT|DELETE|PATCH)\s+(.+)/);
    if (methodMatch) {
      return [
        <span key="method" className="text-green-400 font-semibold">{methodMatch[1]}</span>,
        <span key="space"> </span>,
        <span key="url" className="text-cyan-400">{methodMatch[2]}</span>
      ];
    }

    if (line.includes(':')) {
      const colonIndex = line.indexOf(':');
      const key = line.substring(0, colonIndex);
      const value = line.substring(colonIndex);
      return [
        <span key="key" className="text-blue-400">{key}</span>,
        <span key="value" className="text-orange-400">{value}</span>
      ];
    }

    return [<span key={`line-${tokenId}`}>{line}</span>];
  };

  const lines = code.split('\n');

  return (
    <pre className="text-[11px] leading-relaxed">
      <code className="font-mono text-white/90">
        {lines.map((line, i) => (
          <div key={i} className="flex">
            <span className="text-white/20 select-none mr-2 text-right min-w-[1.25rem]">{i + 1}</span>
            <span className="whitespace-pre">{highlightLine(line)}</span>
          </div>
        ))}
      </code>
    </pre>
  );
};

export const CodeShowcaseCard = ({
  icon,
  code,
  language,
  filename,
  docUrl = '#',
  docTooltip = 'View documentation',
  isActive,
  onClick,
  index,
  totalCards,
  hoveredIndex,
  onHover
}: CodeShowcaseCardProps) => {
  const [copied, setCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const SyntaxHighlighter = language === 'python'
    ? PythonSyntaxHighlighter
    : language === 'rest'
      ? RestSyntaxHighlighter
      : JavaSyntaxHighlighter;

  const isHovered = hoveredIndex === index;
  const isAnyHovered = hoveredIndex !== null;
  const shouldExpand = isActive || isHovered;

  const baseX = index * 100;
  const baseY = (totalCards - 1 - index) * 45;
  const baseZ = index + 1;

  const getTransform = () => {
    if (shouldExpand) {
      return {
        x: baseX,
        y: baseY - 8,
        scale: 1.02,
        zIndex: 50
      };
    }
    if (isAnyHovered && !isHovered) {
      return {
        x: baseX,
        y: baseY + 3,
        scale: 0.98,
        zIndex: baseZ
      };
    }
    return {
      x: baseX,
      y: baseY,
      scale: 1,
      zIndex: isActive ? 40 : baseZ
    };
  };

  const transform = getTransform();

  return (
    <motion.div
      initial={{ opacity: 0, x: -30, y: baseY }}
      animate={{
        opacity: 1,
        x: transform.x,
        y: transform.y,
        scale: transform.scale,
        zIndex: transform.zIndex
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 30,
        mass: 0.8
      }}
      onClick={onClick}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      className="absolute cursor-pointer"
      style={{
        width: '380px',
        height: '220px'
      }}
    >
      <div
        className={`
          h-full bg-[#0a0a0a]/90 backdrop-blur-md border overflow-hidden transition-all duration-300
          ${shouldExpand
            ? 'border-blue-400/60 shadow-2xl shadow-blue-500/20'
            : 'border-blue-500/30 animate-pulse-border'
          }
        `}
      >
        <div className="px-3 py-2 border-b border-white/[0.06] flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-white/10"></div>
              <div className="w-2 h-2 rounded-full bg-white/10"></div>
              <div className="w-2 h-2 rounded-full bg-white/10"></div>
            </div>
            <div className="flex items-center gap-1.5">
              {icon}
              <span className={`text-[11px] font-medium ${languageColors[language]}`}>
                {languageLabels[language]}
              </span>
            </div>
            <span className="text-[10px] text-white/30 font-mono">{filename}</span>
          </div>

          <motion.div
            className="flex items-center gap-1"
            initial={false}
            animate={{ opacity: shouldExpand ? 1 : 0 }}
            transition={{ duration: 0.15 }}
          >
            <button
              onClick={handleCopy}
              className="p-1 hover:bg-white/10 transition-colors rounded"
              title="Copy code"
            >
              {copied ? (
                <Check size={12} className="text-green-400" />
              ) : (
                <Copy size={12} className="text-white/40 hover:text-white/70" />
              )}
            </button>

            <div
              className="relative"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <a
                href={docUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1 hover:bg-white/10 transition-colors rounded flex items-center"
              >
                <ExternalLink size={12} className="text-white/40 hover:text-blue-400" />
              </a>

              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 top-full mt-2 px-2 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-[10px] text-white/70 whitespace-nowrap z-50 rounded"
                >
                  {docTooltip}
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        <div className="h-[180px] overflow-hidden">
          <div className="p-3 overflow-x-auto">
            <SyntaxHighlighter code={code} />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none"></div>
      </div>
    </motion.div>
  );
};

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
}

const languageLabels = {
  java: 'Java SDK',
  python: 'Python',
  rest: 'REST API'
};

const languageColors = {
  java: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  python: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  rest: 'bg-green-500/20 text-green-400 border-green-500/30'
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
    <pre className="text-xs leading-relaxed">
      <code className="font-mono text-white/90">
        {lines.map((line, i) => (
          <div key={i} className="flex hover:bg-white/5">
            <span className="text-white/30 select-none mr-3 text-right min-w-[1.5rem]">{i + 1}</span>
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
    'print', 'len', 'range', 'str', 'int', 'float', 'list', 'dict', 'set', 'tuple'
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
    <pre className="text-xs leading-relaxed">
      <code className="font-mono text-white/90">
        {lines.map((line, i) => (
          <div key={i} className="flex hover:bg-white/5">
            <span className="text-white/30 select-none mr-3 text-right min-w-[1.5rem]">{i + 1}</span>
            <span className="whitespace-pre">{highlightLine(line)}</span>
          </div>
        ))}
      </code>
    </pre>
  );
};

const RestSyntaxHighlighter = ({ code }: { code: string }) => {
  const methods = new Set(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']);

  const highlightLine = (line: string) => {
    const tokens: JSX.Element[] = [];
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
    <pre className="text-xs leading-relaxed">
      <code className="font-mono text-white/90">
        {lines.map((line, i) => (
          <div key={i} className="flex hover:bg-white/5">
            <span className="text-white/30 select-none mr-3 text-right min-w-[1.5rem]">{i + 1}</span>
            <span className="whitespace-pre">{highlightLine(line)}</span>
          </div>
        ))}
      </code>
    </pre>
  );
};

export const CodeShowcaseCard = ({
  title,
  icon,
  code,
  language,
  filename,
  docUrl = '#',
  docTooltip = 'View documentation',
  isActive,
  onClick,
  index
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

  return (
    <motion.div
      initial={{ opacity: 0, x: -20, y: index * 10 }}
      animate={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: isActive ? 1 : 0.98,
        zIndex: isActive ? 30 : 20 - index
      }}
      transition={{
        duration: 0.3,
        delay: index * 0.1,
        scale: { duration: 0.2 }
      }}
      onClick={onClick}
      className={`
        relative cursor-pointer transition-all duration-300
        ${isActive
          ? 'ring-2 ring-blue-500/50 shadow-lg shadow-blue-500/20'
          : 'hover:ring-1 hover:ring-white/20'
        }
      `}
      style={{
        marginTop: index > 0 ? '-8px' : '0'
      }}
    >
      <div className={`
        bg-[#0a0a0a]/95 backdrop-blur-sm border border-white/10 overflow-hidden
        transition-all duration-300
        ${isActive ? 'border-blue-500/30' : ''}
      `}>
        <div className="bg-white/5 px-4 py-2.5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/60"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/60"></div>
            </div>
            <div className="flex items-center gap-2">
              {icon}
              <span className="text-xs text-white/70 font-medium">{title}</span>
            </div>
            <span className={`text-[10px] px-2 py-0.5 border ${languageColors[language]}`}>
              {languageLabels[language]}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="p-1.5 hover:bg-white/10 transition-colors rounded"
              title="Copy code"
            >
              {copied ? (
                <Check size={14} className="text-green-400" />
              ) : (
                <Copy size={14} className="text-white/50 hover:text-white/80" />
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
                className="p-1.5 hover:bg-white/10 transition-colors rounded flex items-center"
              >
                <ExternalLink size={14} className="text-white/50 hover:text-blue-400" />
              </a>

              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 top-full mt-2 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-xs text-white/80 whitespace-nowrap z-50 rounded"
                >
                  {docTooltip}
                  <div className="absolute -top-1 right-3 w-2 h-2 bg-white/10 border-l border-t border-white/20 transform rotate-45"></div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        <div className="px-4 py-1 bg-white/[0.02] border-b border-white/5">
          <span className="text-[10px] text-white/40 font-mono">{filename}</span>
        </div>

        <motion.div
          className="overflow-hidden"
          initial={false}
          animate={{
            height: isActive ? 'auto' : '120px',
            opacity: isActive ? 1 : 0.7
          }}
          transition={{ duration: 0.3 }}
        >
          <div className={`p-4 overflow-x-auto ${!isActive ? 'mask-gradient-bottom' : ''}`}>
            <SyntaxHighlighter code={code} />
          </div>
        </motion.div>

        {!isActive && (
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none"></div>
        )}
      </div>
    </motion.div>
  );
};

import { motion } from 'framer-motion';
import { monoFontFamily } from './fontFamily';

const TEAL = 'rgb(45,212,191)';

const sourceWallets = [
  { label: '0x3f...a2c', amount: '2,400' },
  { label: '0x7b...1d8', amount: '850' },
  { label: '0xe1...4f0', amount: '5,100' },
];

const targetWallets = [
  { label: '0xa4...c7e', amount: '3,200' },
  { label: '0x2d...9b3', amount: '1,750' },
  { label: '0xf8...6a1', amount: '4,300' },
];

export const PayVisual = () => {
  return (
    <div className="w-full h-full relative">
      <svg
        viewBox="0 0 360 98"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <pattern id="pay-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="0.5" fill="white" opacity="0.1" />
          </pattern>
        </defs>

        <rect width="360" height="98" fill="url(#pay-grid)" />

        <rect x="8" y="14" width="100" height="72" rx="4"
          fill={TEAL} fillOpacity="0.05" stroke={TEAL} strokeOpacity="0.25" strokeWidth="0.8" />
        <text x="58" y="27" textAnchor="middle" fill={TEAL} fillOpacity="0.5"
          fontSize="5.5" fontFamily={monoFontFamily} fontWeight="600" letterSpacing="0.5">
          SOURCE WALLETS
        </text>
        <line x1="16" y1="31" x2="100" y2="31" stroke={TEAL} strokeOpacity="0.12" strokeWidth="0.5" />

        {sourceWallets.map((w, i) => (
          <g key={`src-${i}`}>
            <rect x="16" y={35 + i * 15} width="84" height="11" rx="2"
              fill={TEAL} fillOpacity="0.04" stroke={TEAL} strokeOpacity="0.12" strokeWidth="0.5" />
            <motion.rect x="16" y={35 + i * 15} width="84" height="11" rx="2"
              fill={TEAL}
              initial={{ fillOpacity: 0 }}
              whileInView={{ fillOpacity: [0, 0.1, 0] }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 1.2,
                delay: 1.2 + i * 1.8,
                repeat: Infinity,
                repeatDelay: 4,
              }}
            />
            <text x="22" y={42.5 + i * 15} fill={TEAL} fillOpacity={0.6 - i * 0.1}
              fontSize="5" fontFamily={monoFontFamily}>
              {w.label}
            </text>
            <text x="94" y={42.5 + i * 15} textAnchor="end" fill={TEAL} fillOpacity={0.4 - i * 0.06}
              fontSize="4.5" fontFamily={monoFontFamily}>
              ${w.amount}
            </text>
          </g>
        ))}

        <line x1="112" y1="49" x2="138" y2="49"
          stroke={TEAL} strokeOpacity="0.3" strokeWidth="1" strokeDasharray="3 3" />
        <polygon points="136,45.5 143,49 136,52.5" fill={TEAL} fillOpacity="0.3" />

        <rect x="143" y="14" width="74" height="72" rx="4"
          fill={TEAL} fillOpacity="0.08" stroke={TEAL} strokeOpacity="0.35" strokeWidth="0.8" />

        <circle cx="180" cy="7" r="7" fill={TEAL} fillOpacity="0.1"
          stroke={TEAL} strokeOpacity="0.4" strokeWidth="0.6" />
        <text x="180" y="10" textAnchor="middle" fill={TEAL} fillOpacity="0.6"
          fontSize="8" fontFamily={monoFontFamily} fontWeight="bold">$</text>

        <text x="180" y="38" textAnchor="middle" fill={TEAL} fillOpacity="0.9"
          fontSize="9" fontFamily={monoFontFamily} fontWeight="bold">
          TRANSFER
        </text>

        <line x1="155" y1="44" x2="205" y2="44"
          stroke={TEAL} strokeOpacity="0.15" strokeWidth="0.5" />

        <text x="180" y="56" textAnchor="middle" fill={TEAL} fillOpacity="0.35"
          fontSize="6" fontFamily={monoFontFamily}>
          SOR
        </text>

        {[0, 1, 2].map((i) => (
          <motion.rect key={`sor-ind-${i}`}
            x={160 + i * 14} y="62" width="10" height="3.5" rx="1.5"
            fill={TEAL}
            initial={{ fillOpacity: 0.06 }}
            whileInView={{ fillOpacity: [0.06, 0.3, 0.06] }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 1.4,
              delay: 1.6 + i * 0.35,
              repeat: Infinity,
              repeatDelay: 2.5,
            }}
          />
        ))}

        <motion.rect x="152" y="70" width="56" height="4" rx="2"
          fill={TEAL}
          initial={{ fillOpacity: 0 }}
          whileInView={{ fillOpacity: [0, 0.06, 0.12, 0.06, 0] }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 2.5,
            delay: 2,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        />

        <line x1="221" y1="49" x2="247" y2="49"
          stroke={TEAL} strokeOpacity="0.3" strokeWidth="1" strokeDasharray="3 3" />
        <polygon points="245,45.5 252,49 245,52.5" fill={TEAL} fillOpacity="0.3" />

        <rect x="252" y="14" width="100" height="72" rx="4"
          fill={TEAL} fillOpacity="0.05" stroke={TEAL} strokeOpacity="0.25" strokeWidth="0.8" />
        <text x="302" y="27" textAnchor="middle" fill={TEAL} fillOpacity="0.5"
          fontSize="5.5" fontFamily={monoFontFamily} fontWeight="600" letterSpacing="0.5">
          TARGET WALLETS
        </text>
        <line x1="260" y1="31" x2="344" y2="31" stroke={TEAL} strokeOpacity="0.12" strokeWidth="0.5" />

        {targetWallets.map((w, i) => (
          <g key={`tgt-${i}`}>
            <rect x="260" y={35 + i * 15} width="84" height="11" rx="2"
              fill={TEAL} fillOpacity="0.04" stroke={TEAL} strokeOpacity="0.12" strokeWidth="0.5" />
            <motion.rect x="260" y={35 + i * 15} width="84" height="11" rx="2"
              fill={TEAL}
              initial={{ fillOpacity: 0 }}
              whileInView={{ fillOpacity: [0, 0.1, 0] }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 1.2,
                delay: 2.2 + i * 1.8,
                repeat: Infinity,
                repeatDelay: 4,
              }}
            />
            <text x="266" y={42.5 + i * 15} fill={TEAL} fillOpacity={0.6 - i * 0.1}
              fontSize="5" fontFamily={monoFontFamily}>
              {w.label}
            </text>
            <text x="338" y={42.5 + i * 15} textAnchor="end" fill={TEAL} fillOpacity={0.4 - i * 0.06}
              fontSize="4.5" fontFamily={monoFontFamily}>
              ${w.amount}
            </text>
          </g>
        ))}

        {[0, 1.8, 3.6].map((delay) => (
          <motion.circle key={`dot-fwd-${delay}`} r="2" fill={TEAL}
            initial={{ opacity: 0 }}
            whileInView={{
              opacity: [0, 0.8, 0.8, 0],
              cx: [112, 140],
              cy: [49, 49],
            }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.8,
              delay: 1.5 + delay,
              repeat: Infinity,
              repeatDelay: 3,
              ease: 'linear',
            }}
          />
        ))}

        {[0.3, 2.1, 3.9].map((delay) => (
          <motion.circle key={`dot-fwd2-${delay}`} r="2" fill={TEAL}
            initial={{ opacity: 0 }}
            whileInView={{
              opacity: [0, 0.8, 0.8, 0],
              cx: [221, 249],
              cy: [49, 49],
            }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.8,
              delay: 1.8 + delay,
              repeat: Infinity,
              repeatDelay: 3,
              ease: 'linear',
            }}
          />
        ))}
      </svg>
    </div>
  );
};

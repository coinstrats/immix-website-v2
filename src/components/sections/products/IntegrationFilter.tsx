import { integrationModes, type IntegrationLevel } from './productData';

interface IntegrationFilterProps {
  activeFilter: IntegrationLevel | null;
  onFilterChange: (filter: IntegrationLevel | null) => void;
}

export function IntegrationFilter({ activeFilter, onFilterChange }: IntegrationFilterProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
      {integrationModes.map((mode) => {
        const ModeIcon = mode.icon;
        const isActive = activeFilter === mode.key;

        return (
          <button
            key={mode.key}
            onClick={() => onFilterChange(isActive ? null : mode.key)}
            className={`
              relative text-left rounded-xl border p-5 sm:p-6
              transition-all duration-300 cursor-pointer group
              ${isActive
                ? 'border-[#0073FF]/40 bg-white/[0.04] shadow-[0_0_24px_rgba(0,115,255,0.12)]'
                : 'border-white/[0.08] bg-white/[0.02] hover:border-white/[0.15] hover:bg-white/[0.03]'
              }
            `}
          >
            {isActive && (
              <div
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at 50% 0%, rgba(0,115,255,0.06) 0%, transparent 70%)',
                }}
              />
            )}
            <div
              className={`absolute top-0 left-0 right-0 h-px transition-colors duration-300 ${
                isActive ? 'bg-[#0073FF]/60' : 'bg-white/[0.06]'
              }`}
            />

            <div className="relative flex items-start gap-4">
              <div
                className={`
                  w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                  transition-colors duration-300
                  ${isActive
                    ? 'bg-[#0073FF]/15'
                    : 'bg-white/[0.05] group-hover:bg-white/[0.08]'
                  }
                `}
              >
                <ModeIcon
                  size={18}
                  className={`transition-colors duration-300 ${
                    isActive ? 'text-[#0073FF]' : 'text-white/40 group-hover:text-white/60'
                  }`}
                />
              </div>
              <div className="min-w-0">
                <span
                  className={`text-sm font-semibold transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-white/70 group-hover:text-white/90'
                  }`}
                >
                  {mode.label}
                </span>
                <p className="text-xs text-white/35 leading-relaxed mt-1">
                  {mode.description}
                </p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

import { StrategyCodeCard } from './StrategyCodeCard';

export const HeroVisualStack = () => {
  return (
    <div className="relative h-[600px] bg-[#050505] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black z-40 pointer-events-none" />

      <div className="absolute top-8 left-8 z-20">
        <StrategyCodeCard />
      </div>

      <div className="absolute top-12 right-12 z-10">
        <img
          src="/orderbook.png"
          alt="Orderbook"
          className="w-[280px] shadow-[0_0_40px_rgba(34,211,238,0.3)]"
        />
      </div>

      <div className="absolute top-80 left-16 z-[15]">
        <img
          src="/balance-map.png"
          alt="Balance Map"
          className="w-[260px] opacity-90"
        />
      </div>

      <div className="absolute bottom-4 right-8 z-[5]">
        <img
          src="/strategies-table.png"
          alt="Strategies Table"
          className="w-[500px]"
        />
      </div>
    </div>
  );
};

import { AnimatedElement } from '../../ui';
import { PricingCard } from './PricingCard';
import { workloadProfiles } from './pricingData';

export function TypicalWorkloads() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <AnimatedElement type="fadeInUp">
          <p className="text-xs font-mono text-white/30 tracking-[0.15em] uppercase">
            Typical workloads
          </p>
          <h3 className="text-2xl md:text-3xl font-bold mt-2">
            Start with Core. Scale by role.
          </h3>
        </AnimatedElement>
        <AnimatedElement type="fadeInUp" delay={0.05}>
          <p className="text-base text-white/50 max-w-2xl mx-auto">
            These are example usage profiles, not separate plans. Actual billing
            rolls up under Core, Startup Program, or Enterprise terms.
          </p>
        </AnimatedElement>
      </div>

      <AnimatedElement type="fadeInUp" delay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {workloadProfiles.map((profile) => (
            <PricingCard
              key={profile.title}
              variant="workload"
              eyebrow={profile.eyebrow}
              title={profile.title}
              pricingLabel={profile.pricingNote}
              description={profile.description}
              bullets={profile.bullets}
              badge={profile.badge}
              tierColor={profile.tierColor}
            />
          ))}
        </div>
      </AnimatedElement>
    </div>
  );
}

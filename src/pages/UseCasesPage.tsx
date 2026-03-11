import { lazy, Suspense } from 'react';
import { UseCasesHero } from '../components/sections/useCases';

const FeaturedUseCases = lazy(() =>
  import('../components/sections/useCases/FeaturedUseCases').then((m) => ({
    default: m.FeaturedUseCases,
  }))
);
const HowItWorks = lazy(() =>
  import('../components/sections/useCases/HowItWorks').then((m) => ({
    default: m.HowItWorks,
  }))
);
const AudienceGrid = lazy(() =>
  import('../components/sections/useCases/AudienceGrid').then((m) => ({
    default: m.AudienceGrid,
  }))
);
const FutureUseCases = lazy(() =>
  import('../components/sections/useCases/FutureUseCases').then((m) => ({
    default: m.FutureUseCases,
  }))
);
const UseCasesCta = lazy(() =>
  import('../components/sections/useCases/UseCasesCta').then((m) => ({
    default: m.UseCasesCta,
  }))
);

const SectionFallback = () => (
  <div className="min-h-[400px] bg-immix-darker" />
);

export const UseCasesPage = () => {
  return (
    <>
      <UseCasesHero />
      <Suspense fallback={<SectionFallback />}>
        <FeaturedUseCases />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <HowItWorks />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <AudienceGrid />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <FutureUseCases />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <UseCasesCta />
      </Suspense>
    </>
  );
};

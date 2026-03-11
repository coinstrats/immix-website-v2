import { lazy, Suspense, useEffect } from 'react';
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
const MarketsWeUnderpin = lazy(() =>
  import('../components/sections/useCases/MarketsWeUnderpin').then((m) => ({
    default: m.MarketsWeUnderpin,
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
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const timeout = setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, []);

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
        <MarketsWeUnderpin />
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

import { lazy, Suspense } from 'react';
import { Hero } from '../components/sections';

const TrustBar = lazy(() => import('../components/sections/TrustBar').then(m => ({ default: m.TrustBar })));
const ProblemSolution = lazy(() => import('../components/sections/ProblemSolution').then(m => ({ default: m.ProblemSolution })));
const EnginesOverview = lazy(() => import('../components/sections/EnginesOverview').then(m => ({ default: m.EnginesOverview })));
const SolutionVerticals = lazy(() => import('../components/sections/SolutionVerticals').then(m => ({ default: m.SolutionVerticals })));
const BusinessBenefits = lazy(() => import('../components/sections/BusinessBenefits').then(m => ({ default: m.BusinessBenefits })));
const DeveloperSection = lazy(() => import('../components/sections/DeveloperSection').then(m => ({ default: m.DeveloperSection })));
const Pricing = lazy(() => import('../components/sections/Pricing').then(m => ({ default: m.Pricing })));
const FinalCta = lazy(() => import('../components/sections/FinalCta').then(m => ({ default: m.FinalCta })));

const SectionFallback = () => <div className="min-h-[400px] bg-immix-darker" />;

export const HomePage = () => {
  return (
    <>
      <Hero />
      <Suspense fallback={<SectionFallback />}>
        <TrustBar />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ProblemSolution />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <EnginesOverview />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <SolutionVerticals />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <BusinessBenefits />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <DeveloperSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Pricing />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <FinalCta />
      </Suspense>
    </>
  );
};

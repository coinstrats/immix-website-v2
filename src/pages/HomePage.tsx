import { lazy, Suspense } from 'react';
import { Hero } from '../components/sections';

const ProductSolutions = lazy(() => import('../components/sections/ProductSolutions').then(m => ({ default: m.ProductSolutions })));
const EcosystemMap = lazy(() => import('../components/sections/EcosystemMap').then(m => ({ default: m.EcosystemMap })));
const UseCasesPreview = lazy(() => import('../components/sections/UseCasesPreview').then(m => ({ default: m.UseCasesPreview })));
const Pricing = lazy(() => import('../components/sections/Pricing').then(m => ({ default: m.Pricing })));

const SectionFallback = () => <div className="min-h-[400px] bg-immix-darker" />;

export const HomePage = () => {
  return (
    <>
      <Hero />
      <Suspense fallback={<SectionFallback />}>
        <ProductSolutions />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <UseCasesPreview />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <EcosystemMap />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Pricing />
      </Suspense>
    </>
  );
};

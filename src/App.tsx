import { Navigation, Footer } from './components/layout';
import {
  Hero,
  EcosystemMap,
  SolutionsEngine,
  DeveloperExperience,
  Pricing,
} from './components/sections';

function App() {
  return (
    <div className="min-h-screen bg-immix-darker text-white overflow-x-hidden">
      <Navigation />
      <main>
        <Hero />
        <EcosystemMap />
        <SolutionsEngine />
        <DeveloperExperience />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}

export default App;

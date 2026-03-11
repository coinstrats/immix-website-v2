import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation, Footer, ScrollToTop } from './components/layout';

const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const CustomersPage = lazy(() => import('./pages/CustomersPage').then(m => ({ default: m.CustomersPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const UseCasesPage = lazy(() => import('./pages/UseCasesPage').then(m => ({ default: m.UseCasesPage })));

const CAREERS_URL = 'https://immix.notion.site/Careers-8a8e66223c1c4c8cbae9495f99d66840';

function ExternalRedirect({ url }: { url: string }) {
  useEffect(() => {
    window.location.replace(url);
  }, [url]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-immix-darker text-white overflow-x-hidden">
        <ScrollToTop />
        <Navigation />
        <main>
          <Suspense fallback={<div className="min-h-screen bg-immix-darker" />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/customers" element={<CustomersPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/use-cases" element={<UseCasesPage />} />
              <Route
                path="/careers"
                element={<ExternalRedirect url={CAREERS_URL} />}
              />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

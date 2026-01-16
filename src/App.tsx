import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation, Footer } from './components/layout';
import { HomePage, CustomersPage, PlaceholderPage } from './pages';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-immix-darker text-white overflow-x-hidden">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route
              path="/blog"
              element={
                <PlaceholderPage
                  title="Blog"
                  description="Insights and updates from the IMMIX team. Coming soon."
                />
              }
            />
            <Route
              path="/about"
              element={
                <PlaceholderPage
                  title="About Us"
                  description="Learn more about IMMIX and our mission to revolutionize digital asset infrastructure."
                />
              }
            />
            <Route
              path="/careers"
              element={
                <PlaceholderPage
                  title="Careers"
                  description="Join our team and help build the future of programmable finance."
                />
              }
            />
            <Route
              path="/contact"
              element={
                <PlaceholderPage
                  title="Contact"
                  description="Get in touch with our team. We'd love to hear from you."
                />
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

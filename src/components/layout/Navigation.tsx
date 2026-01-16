import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui';

const companyDropdownItems = [
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false);
  const companyRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (companyRef.current && !companyRef.current.contains(event.target as Node)) {
        setCompanyOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setMobileCompanyOpen(false);
  }, [location]);

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        return;
      }
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-effect-dark' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Link to="/" className="flex items-center">
            <svg viewBox="0 0 1920 509" className="w-[85px] h-auto">
              <path fill="white" d="M0 509V0h85.19v509H0ZM169.25 509V0h76.7l176.04 360.54L598.03 0h76.7v509H595.2V182.74L438.96 509h-33.94L249.13 182.74V509h-79.89ZM755.47 509V0h76.7l176.05 360.54L1184.26 0h76.7v509h-79.53V182.74L1025.19 509h-33.94L835.36 182.74V509h-79.89ZM1344.88 509V0h85.19v509h-85.19ZM1470.71 509l172.51-257.33L1475.66 0h104.28l115.95 179.21L1810.77 0h104.99l-167.55 251.67L1920 509h-104.27L1695.9 324.13 1575.71 509h-104.99Z"></path>
            </svg>
          </Link>
        </motion.div>

        <div className="hidden md:flex items-center gap-8">
          <motion.a
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            href={location.pathname === '/' ? '#solutions' : '/#solutions'}
            onClick={() => handleNavClick('#solutions')}
            className="nav-link text-sm font-medium"
          >
            Solutions
          </motion.a>

          <motion.a
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            href="https://docs.immix.xyz/core/introduction"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link text-sm font-medium"
          >
            Docs
          </motion.a>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/customers" className="nav-link text-sm font-medium">
              Customers
            </Link>
          </motion.div>

          <motion.div
            ref={companyRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="relative"
          >
            <button
              onClick={() => setCompanyOpen(!companyOpen)}
              className="nav-link text-sm font-medium flex items-center gap-1"
            >
              Company
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${companyOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <AnimatePresence>
              {companyOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-2 w-40 py-2 bg-immix-dark/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl"
                >
                  {companyDropdownItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      className="block px-4 py-2 text-sm text-white/70 hover:text-immix-blue hover:bg-white/5 transition-colors"
                      onClick={() => setCompanyOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.a
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            href={location.pathname === '/' ? '#pricing' : '/#pricing'}
            onClick={() => handleNavClick('#pricing')}
            className="nav-link text-sm font-medium"
          >
            Pricing
          </motion.a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" href="https://app.immix.xyz">
            Login
          </Button>
          <Button variant="primary" size="sm" href="https://app.immix.xyz">
            Sign Up
          </Button>
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-immix-blue"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-effect-dark border-t border-white/10"
          >
            <div className="px-6 py-4 space-y-1">
              <a
                href={location.pathname === '/' ? '#solutions' : '/#solutions'}
                className="block nav-link text-sm font-medium py-3"
                onClick={() => setIsOpen(false)}
              >
                Solutions
              </a>
              <a
                href="https://docs.immix.xyz/core/introduction"
                target="_blank"
                rel="noopener noreferrer"
                className="block nav-link text-sm font-medium py-3"
                onClick={() => setIsOpen(false)}
              >
                Docs
              </a>
              <Link
                to="/customers"
                className="block nav-link text-sm font-medium py-3"
                onClick={() => setIsOpen(false)}
              >
                Customers
              </Link>
              <div>
                <button
                  onClick={() => setMobileCompanyOpen(!mobileCompanyOpen)}
                  className="w-full flex items-center justify-between nav-link text-sm font-medium py-3"
                >
                  Company
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${mobileCompanyOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {mobileCompanyOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 space-y-1 overflow-hidden"
                    >
                      {companyDropdownItems.map((item) => (
                        <Link
                          key={item.label}
                          to={item.href}
                          className="block text-sm text-white/60 hover:text-immix-blue py-2"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <a
                href={location.pathname === '/' ? '#pricing' : '/#pricing'}
                className="block nav-link text-sm font-medium py-3"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </a>
              <div className="pt-4 space-y-2 border-t border-white/10">
                <Button variant="ghost" size="sm" className="w-full justify-center" href="https://app.immix.xyz">
                  Login
                </Button>
                <Button variant="primary" size="sm" className="w-full justify-center" href="https://app.immix.xyz">
                  Sign Up
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

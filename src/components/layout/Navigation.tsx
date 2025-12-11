import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Ecosystem', 'Solutions', 'Case Studies', 'Pricing'];

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-effect-dark' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        <motion.a
          href="#hero"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center"
        >
          <svg viewBox="0 0 1920 509" className="w-[85px] h-auto">
            <path fill="white" d="M0 509V0h85.19v509H0ZM169.25 509V0h76.7l176.04 360.54L598.03 0h76.7v509H595.2V182.74L438.96 509h-33.94L249.13 182.74V509h-79.89ZM755.47 509V0h76.7l176.05 360.54L1184.26 0h76.7v509h-79.53V182.74L1025.19 509h-33.94L835.36 182.74V509h-79.89ZM1344.88 509V0h85.19v509h-85.19ZM1470.71 509l172.51-257.33L1475.66 0h104.28l115.95 179.21L1810.77 0h104.99l-167.55 251.67L1920 509h-104.27L1695.9 324.13 1575.71 509h-104.99Z"></path>
          </svg>
        </motion.a>

        <div className="hidden md:flex items-center gap-12">
          {navItems.map((item, i) => (
            <motion.a
              key={item}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              href={`#${item.toLowerCase()}`}
              className="nav-link text-sm font-medium"
            >
              {item}
            </motion.a>
          ))}
          <motion.a
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + navItems.length * 0.05 }}
            href="https://app.immix.xyz"
            className="nav-link text-sm font-medium"
          >
            Trade
          </motion.a>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="primary" size="sm">
            Contact Sales
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

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden glass-effect-dark border-t"
        >
          <div className="px-6 py-4 space-y-4">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block nav-link text-sm font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            ))}
            <a
              href="https://app.immix.xyz"
              className="block nav-link text-sm font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              Trade
            </a>
            <div className="pt-4 space-y-2 border-t border-white/10">
              <Button variant="primary" size="sm" className="w-full justify-center">
                Contact Sales
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

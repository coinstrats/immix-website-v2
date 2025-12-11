import { motion } from 'framer-motion';
import { Button } from '../ui';

export const Footer = () => {
  const footerLinks = {
    Product: ['Documentation', 'API Status', 'Changelog'],
    Company: ['Careers', 'Blog', 'Partners'],
    Legal: ['Privacy', 'Terms', 'Security'],
  };

  return (
    <footer className="bg-immix-darker border-t border-white/10">
      <div className="section-wrapper">
        <div className="container-max space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-4 pb-8 border-b border-white/10"
          >
            <h3 className="text-2xl md:text-3xl font-bold">
              Ready to upgrade your infrastructure?
            </h3>
            <p className="text-white/60 max-w-2xl mx-auto">
              Join the institutions building the future of decentralized finance with IMMIX.
            </p>
            <Button variant="primary">Get Started</Button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-bold mb-4 text-white">IMMIX</h4>
              <p className="text-white/60 text-sm">
                The unified operating system for institutions
              </p>
            </motion.div>

            {Object.entries(footerLinks).map(([category, links], i) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (i + 1) * 0.1 }}
                viewport={{ once: true }}
              >
                <h5 className="font-semibold mb-4">{category}</h5>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href={category === 'Product' && link === 'Documentation' ? 'https://docs.immix.xyz/core/introduction' : '#'}
                        className="text-white/60 hover:text-immix-blue transition-colors text-sm"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-sm text-white/60"
          >
            <p>© 2026 IMMIX. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-immix-blue transition-colors">
                Twitter
              </a>
              <a href="#" className="hover:text-immix-blue transition-colors">
                Discord
              </a>
              <a href="#" className="hover:text-immix-blue transition-colors">
                GitHub
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

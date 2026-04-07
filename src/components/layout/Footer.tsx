import { Link } from 'react-router-dom';

const CAREERS_URL = 'https://immix.notion.site/Careers-8a8e66223c1c4c8cbae9495f99d66840';

const platformLinks = [
  { label: 'Pricing Engine', href: '/#platform', anchor: true },
  { label: 'Automation Engine', href: '/#platform', anchor: true },
  { label: 'Execution Engine', href: '/#platform', anchor: true },
  { label: 'Infrastructure', href: '/infrastructure' },
  { label: 'Documentation', href: 'https://docs.immix.xyz/core/introduction', external: true },
];

const solutionLinks = [
  { label: 'Payment Ops', href: '/solutions/payment-ops' },
  { label: 'Trading Ops', href: '/solutions/trading-ops' },
  { label: 'Treasury Ops', href: '/solutions/treasury-ops' },
];

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Customers', href: '/customers' },
  { label: 'Careers', href: CAREERS_URL, external: true },
  { label: 'Contact', href: 'mailto:sales@immix.xyz', external: true },
];

export const Footer = () => {
  return (
    <footer className="bg-immix-darker border-t border-white/10">
      <div className="section-wrapper">
        <div className="container-max space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div>
              <h4 className="text-lg font-bold mb-4 text-white">IMMIX</h4>
              <p className="text-white/50 text-sm leading-relaxed mb-4">
                Unified digital asset infrastructure for institutions.
              </p>
              <a
                href="mailto:sales@immix.xyz"
                className="text-sm text-immix-blue hover:text-immix-blue-light transition-colors"
              >
                sales@immix.xyz
              </a>
            </div>

            <div>
              <h5 className="font-semibold mb-4 text-white/80">Platform</h5>
              <ul className="space-y-2">
                {platformLinks.map((link) =>
                  link.external ? (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/50 hover:text-immix-blue transition-colors text-sm"
                      >
                        {link.label}
                      </a>
                    </li>
                  ) : link.anchor ? (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-white/50 hover:text-immix-blue transition-colors text-sm"
                      >
                        {link.label}
                      </a>
                    </li>
                  ) : (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="text-white/50 hover:text-immix-blue transition-colors text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4 text-white/80">Solutions</h5>
              <ul className="space-y-2">
                {solutionLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-white/50 hover:text-immix-blue transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4 text-white/80">Company</h5>
              <ul className="space-y-2">
                {companyLinks.map((link) =>
                  link.external ? (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        {...(!link.href.startsWith('mailto:') && { target: '_blank', rel: 'noopener noreferrer' })}
                        className="text-white/50 hover:text-immix-blue transition-colors text-sm"
                      >
                        {link.label}
                      </a>
                    </li>
                  ) : (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="text-white/50 hover:text-immix-blue transition-colors text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-sm text-white/50">
            <p>&copy; 2026 IMMIX. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="https://x.com/immix_xyz" target="_blank" rel="noopener noreferrer" className="hover:text-immix-blue transition-colors">
                Twitter
              </a>
              <a href="https://github.com/coinstrats" target="_blank" rel="noopener noreferrer" className="hover:text-immix-blue transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

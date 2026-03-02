export const Footer = () => {
  const footerLinks = {
    Product: ['Documentation', 'API Status', 'Changelog'],
    Company: ['Careers', 'Partners'],
    Legal: ['Privacy', 'Terms', 'Security'],
  };

  return (
    <footer className="bg-immix-darker border-t border-white/10">
      <div className="section-wrapper">
        <div className="container-max space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
            <div>
              <h4 className="text-lg font-bold mb-4 text-white">IMMIX</h4>
              <p className="text-white/60 text-sm">
                Programmable Digital Asset Infrastructure
              </p>
            </div>

            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h5 className="font-semibold mb-4">{category}</h5>
                <ul className="space-y-2">
                  {links.map((link) => {
                    const isExternal =
                      (category === 'Product' && link === 'Documentation') ||
                      (category === 'Company' && link === 'Careers');
                    const href =
                      category === 'Product' && link === 'Documentation'
                        ? 'https://docs.immix.xyz/core/introduction'
                        : category === 'Company' && link === 'Careers'
                          ? 'https://immix.notion.site/Careers-8a8e66223c1c4c8cbae9495f99d66840'
                          : '#';
                    return (
                      <li key={link}>
                        <a
                          href={href}
                          {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
                          className="text-white/60 hover:text-immix-blue transition-colors text-sm"
                        >
                          {link}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-sm text-white/60">
            <p>&copy; 2026 IMMIX. All rights reserved.</p>
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
          </div>
        </div>
      </div>
    </footer>
  );
};

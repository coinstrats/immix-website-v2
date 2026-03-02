import { Linkedin } from 'lucide-react';
import { AnimatedElement, Badge } from '../ui';

const founders = [
  {
    name: 'Andrew Mann',
    role: 'Co-Founder & CEO',
    bio: 'Former institutional trader with experience across equities, fixed income, and digital assets at tier-one banks and proprietary trading firms. Andrew leads company strategy, client relationships, and capital markets positioning. He brings deep domain knowledge of market microstructure and post-trade infrastructure.',
    credentials: ['Goldman Sachs', 'Citadel', 'Imperial College London'],
    linkedin: '#',
  },
  {
    name: 'David Twomey',
    role: 'Co-Founder & CTO',
    bio: 'Systems architect and quantitative engineer with a background in low-latency trading systems, distributed computing, and financial protocol design. David oversees all engineering, infrastructure, and research efforts. He has built execution platforms processing billions in daily volume.',
    credentials: ['Jane Street', 'Two Sigma', 'University of Cambridge'],
    linkedin: '#',
  },
];

export const AboutLeadership = () => {
  return (
    <section className="section-wrapper">
      <div className="container-max">
        <div className="text-center mb-16">
          <AnimatedElement type="fadeInUp">
            <h2 className="text-3xl lg:text-4xl font-bold">Leadership</h2>
            <div className="mt-4 mx-auto w-16 h-[2px] bg-gradient-to-r from-transparent via-immix-blue to-transparent" />
          </AnimatedElement>
          <AnimatedElement type="fadeInUp" delay={0.1}>
            <p className="text-lg text-white/60 mt-6 max-w-2xl mx-auto">
              Founded by practitioners who spent years on the front lines of institutional
              trading and systems engineering.
            </p>
          </AnimatedElement>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {founders.map((founder, i) => (
            <AnimatedElement key={founder.name} type="fadeInUp" delay={0.1 + i * 0.1}>
              <div className="group h-full p-8 bg-immix-dark/50 border border-white/10 rounded-lg transition-all duration-300 hover:border-immix-blue/20">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-immix-blue/30 to-immix-blue/10 border border-immix-blue/20 flex items-center justify-center mb-4">
                      <span className="text-xl font-bold text-immix-blue">
                        {founder.name.split(' ').map((n) => n[0]).join('')}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold">{founder.name}</h3>
                    <p className="text-immix-blue font-mono text-sm mt-1">{founder.role}</p>
                  </div>
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-white/30 hover:text-immix-blue transition-colors"
                  >
                    <Linkedin size={20} />
                  </a>
                </div>

                <p className="text-sm text-white/50 leading-relaxed mb-6">{founder.bio}</p>

                <div className="flex flex-wrap gap-2">
                  {founder.credentials.map((cred) => (
                    <Badge key={cred} variant="neutral">{cred}</Badge>
                  ))}
                </div>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
};

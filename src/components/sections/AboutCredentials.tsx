import { GraduationCap } from 'lucide-react';
import { AnimatedElement } from '../ui';

const institutions = [
  'Goldman Sachs',
  'Citadel',
  'Jane Street',
  'Two Sigma',
  'JPMorgan',
  'Morgan Stanley',
  'Bridgewater',
  'DE Shaw',
  'Bloomberg',
  'Google',
  'Meta',
];

const universities = [
  { name: 'Imperial College London', field: 'Mathematics & Computing' },
  { name: 'University of Cambridge', field: 'Computer Science' },
  { name: 'MIT', field: 'Financial Engineering' },
  { name: 'ETH Zurich', field: 'Systems Engineering' },
];

export const AboutCredentials = () => {
  return (
    <section className="section-wrapper">
      <div className="container-max space-y-16">
        <div>
          <AnimatedElement type="fadeInUp">
            <div className="text-center mb-10">
              <p className="text-xs font-mono text-white/40 uppercase tracking-widest mb-3">
                Institutional Pedigree
              </p>
              <h3 className="text-2xl lg:text-3xl font-bold">
                Built by alumni from
              </h3>
            </div>
          </AnimatedElement>

          <AnimatedElement type="fadeInUp" delay={0.1}>
            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              {institutions.map((inst) => (
                <div
                  key={inst}
                  className="px-5 py-2.5 bg-white/[0.03] border border-white/8 rounded-full text-sm text-white/50 font-medium transition-colors hover:border-white/15 hover:text-white/70"
                >
                  {inst}
                </div>
              ))}
            </div>
          </AnimatedElement>
        </div>

        <div className="border-t border-white/8 pt-16">
          <AnimatedElement type="fadeInUp">
            <div className="text-center mb-10">
              <p className="text-xs font-mono text-white/40 uppercase tracking-widest mb-3">
                Academic Foundations
              </p>
              <h3 className="text-2xl lg:text-3xl font-bold">
                Research-driven credentials
              </h3>
            </div>
          </AnimatedElement>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {universities.map((uni, i) => (
              <AnimatedElement key={uni.name} type="fadeInUp" delay={0.05 + i * 0.06}>
                <div className="text-center p-5 bg-immix-dark/40 border border-white/8 rounded-lg">
                  <GraduationCap size={20} className="mx-auto text-immix-blue/60 mb-3" />
                  <p className="text-sm font-semibold mb-1">{uni.name}</p>
                  <p className="text-xs text-white/40">{uni.field}</p>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

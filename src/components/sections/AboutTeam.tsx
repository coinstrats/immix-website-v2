import { AnimatedElement } from '../ui';

const team = [
  {
    name: 'Elena Voss',
    role: 'Head of Engineering',
    focus: 'Distributed systems & API infrastructure',
  },
  {
    name: 'Marcus Chen',
    role: 'Lead Quantitative Researcher',
    focus: 'Execution algorithms & market microstructure',
  },
  {
    name: 'Sophie Laurent',
    role: 'Head of Product',
    focus: 'Workflow design & institutional UX',
  },
  {
    name: 'James Okoro',
    role: 'Principal Engineer',
    focus: 'Real-time data pipelines & WebSocket infra',
  },
  {
    name: 'Anya Petrov',
    role: 'Head of Security',
    focus: 'Cryptographic protocols & compliance',
  },
  {
    name: 'Rafael Moreno',
    role: 'Head of Integrations',
    focus: 'Exchange & custodian connectivity',
  },
];

export const AboutTeam = () => {
  return (
    <section className="section-wrapper">
      <div className="container-max">
        <div className="text-center mb-16">
          <AnimatedElement type="fadeInUp">
            <h2 className="text-3xl lg:text-4xl font-bold">The team</h2>
            <div className="mt-4 mx-auto w-16 h-[2px] bg-gradient-to-r from-transparent via-immix-blue to-transparent" />
          </AnimatedElement>
          <AnimatedElement type="fadeInUp" delay={0.1}>
            <p className="text-lg text-white/60 mt-6 max-w-2xl mx-auto">
              Engineers, researchers, and operators from the world's leading financial
              and technology institutions.
            </p>
          </AnimatedElement>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member, i) => (
            <AnimatedElement key={member.name} type="fadeInUp" delay={0.05 + i * 0.06}>
              <div className="group p-6 bg-immix-dark/40 border border-white/8 rounded-lg transition-all duration-300 hover:border-white/15 hover:bg-immix-dark/60">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                  <span className="text-sm font-bold text-white/40">
                    {member.name.split(' ').map((n) => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-base font-bold mb-1">{member.name}</h3>
                <p className="text-immix-blue text-xs font-mono mb-3">{member.role}</p>
                <p className="text-xs text-white/40 leading-relaxed">{member.focus}</p>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
};

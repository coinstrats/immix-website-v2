import { Code2, FlaskConical, ShieldCheck, Server } from 'lucide-react';
import { AnimatedElement } from '../ui';

const values = [
  {
    icon: Code2,
    title: 'Engineering Excellence',
    description:
      'Every system is designed for correctness first. We write deterministic, testable code with comprehensive observability built in from day one.',
    accent: 'bg-immix-blue/10 text-immix-blue border-immix-blue/20',
  },
  {
    icon: FlaskConical,
    title: 'Research-Driven',
    description:
      'Our quantitative research team continuously models market microstructure, optimises execution algorithms, and stress-tests strategies against historical data.',
    accent: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  },
  {
    icon: Server,
    title: 'Institutional Reliability',
    description:
      '99.99% uptime SLA, automatic failover across regions, and rigorous incident management. Infrastructure our clients can depend on around the clock.',
    accent: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  },
  {
    icon: ShieldCheck,
    title: 'Security First',
    description:
      'SOC 2 aligned processes, end-to-end encryption, least-privilege access controls, and continuous penetration testing by independent auditors.',
    accent: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  },
];

export const AboutValues = () => {
  return (
    <section className="section-wrapper">
      <div className="container-max">
        <div className="text-center mb-16">
          <AnimatedElement type="fadeInUp">
            <h2 className="text-3xl lg:text-4xl font-bold">Core principles</h2>
            <div className="mt-4 mx-auto w-16 h-[2px] bg-gradient-to-r from-transparent via-immix-blue to-transparent" />
          </AnimatedElement>
          <AnimatedElement type="fadeInUp" delay={0.1}>
            <p className="text-lg text-white/60 mt-6 max-w-2xl mx-auto">
              The standards that guide every decision we make — from system architecture to
              client relationships.
            </p>
          </AnimatedElement>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((val, i) => {
            const Icon = val.icon;
            return (
              <AnimatedElement key={val.title} type="fadeInUp" delay={0.1 + i * 0.08}>
                <div className="group h-full p-8 bg-immix-dark/50 border border-white/10 rounded-lg transition-all duration-300 hover:border-white/20 hover:bg-immix-dark/70">
                  <div className={`inline-flex p-3 rounded-lg border mb-5 ${val.accent}`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{val.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{val.description}</p>
                </div>
              </AnimatedElement>
            );
          })}
        </div>
      </div>
    </section>
  );
};

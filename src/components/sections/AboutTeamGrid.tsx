import { Linkedin } from 'lucide-react';
import { AnimatedElement } from '../ui';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  linkedin?: string;
}

const founders: TeamMember[] = [
  {
    name: 'Andrew Mann, PhD.',
    role: 'Co-Founder',
    bio: 'Andrew worked at several institutions and quantitative hedge funds including Morgan Stanley, Matrix8J, and Virtu Financial as a front office quantitative researcher & strategist before founding IMMIX. He holds degrees in Mechanical Engineering (BEng Hons.), Quantitative Finance (MSc), Computational Finance (MRes) and a PhD from the Computer Science department at UCL.',
    linkedin: 'https://www.linkedin.com/in/andrew-mann-912a4449/',
  },
  {
    name: 'David Twomey, PhD.',
    role: 'Co-Founder',
    bio: 'David started his career at JP Morgan and has since worked as a consultant for several hedge funds & asset managers. Within crypto, he has worked on everything from corporate due-diligence, forensic analysis and trading. David holds degrees in Mathematics with Computer Science (BSc Hons.), Finance Risk (MSc), Computational Finance (MRes) and a PhD from the Computer Science department at UCL.',
    linkedin: 'https://www.linkedin.com/in/david-twomey-82860785/',
  },
];

const team: TeamMember[] = [
  {
    name: 'Vaishal Parmar',
    role: 'Founding Engineer',
    bio: 'Vaishal is a senior software engineer that leads the product development of IMMIX client applications. He has over a decade of experience building performant and robust web applications across multiple industries.',
  },
  {
    name: 'Jose Chittilappilly',
    role: 'Senior Software Engineer',
    bio: 'Jose is a passionate technologist with over two decades of experience in the finance industry, specialising in high frequency trading platforms. Before joining IMMIX, he worked across several leadership and core development roles at Adaptive Financial, Instinet, Lehman Brothers, and ICE.',
  },
  {
    name: 'Keith Liu',
    role: 'Senior Software Engineer',
    bio: 'Keith specialises in developing low-latency, scalable trading systems for cryptocurrencies, equities, and futures. He brings over 15 years of experience from top firms like BAML, JPMC, UBS, HSBC, and CLSA.',
  },
  {
    name: 'Wenzhe Hu',
    role: 'Senior Software Engineer',
    bio: 'Wenzhe is a specialist in designing ultra-low latency trading systems. His interests lie in crafting HFT strategies and bespoke infrastructures. Before joining IMMIX, he worked with major investment banks such as UBS and the top cryptocurrency exchange Crypto.com.',
  },
  {
    name: 'Vasily Shelkov',
    role: 'Senior Frontend Engineer',
    bio: 'Vasily is a senior product-focused frontend engineer who architects and builds the client-facing experiences at IMMIX. With over a decade of experience delivering complex web platforms that prioritise clarity, performance, and reliability at scale. He has a strong bias toward pragmatic decision-making, and building systems that translate sophisticated infrastructure into intuitive user experiences.',
  },
  {
    name: 'David Fellah',
    role: 'Quantitative Research',
    bio: 'David specializes in designing and refining algorithmic trading strategies using advanced mathematical and statistical techniques. He has developed predictive models for leading financial institutions, honing his expertise in market microstructure and risk management.',
  },
  {
    name: 'Modestas Gujis',
    role: 'Software Engineer',
    bio: 'Modestas is a recent UCL Computer Science graduate with extensive software engineering experience through multiple international olympiads in informatics and a previous role developing Ocado Technology\'s smart platform.',
  },
];

const getInitials = (name: string) =>
  name.split(' ').map((n) => n[0]).join('');

const MemberCard = ({
  member,
  featured = false,
  delay = 0,
}: {
  member: TeamMember;
  featured?: boolean;
  delay?: number;
}) => (
  <AnimatedElement type="fadeInUp" delay={delay}>
    <div
      className={`group h-full ${featured ? 'p-8' : 'p-6'} bg-immix-dark/50 border border-white/10 rounded-lg transition-all duration-300 hover:border-immix-blue/20 hover:bg-immix-dark/70`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div
            className={`${featured ? 'w-14 h-14' : 'w-11 h-11'} rounded-full bg-gradient-to-br from-immix-blue/30 to-immix-blue/10 border border-immix-blue/20 flex items-center justify-center shrink-0`}
          >
            <span
              className={`${featured ? 'text-base' : 'text-sm'} font-bold text-immix-blue`}
            >
              {getInitials(member.name)}
            </span>
          </div>
          <div>
            <h3 className={`${featured ? 'text-xl' : 'text-base'} font-bold`}>
              {member.name}
            </h3>
            <p className="text-immix-blue font-mono text-xs mt-0.5">
              {member.role}
            </p>
          </div>
        </div>
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-white/30 hover:text-immix-blue transition-colors shrink-0"
          >
            <Linkedin size={18} />
          </a>
        )}
      </div>
      <p
        className={`${featured ? 'text-sm' : 'text-[13px]'} text-white/50 leading-relaxed`}
      >
        {member.bio}
      </p>
    </div>
  </AnimatedElement>
);

export const AboutTeamGrid = () => {
  return (
    <section className="section-wrapper">
      <div className="container-max">
        <div className="mb-12">
          <AnimatedElement type="fadeInUp">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-[2px] bg-immix-blue" />
              <p className="text-xs font-mono text-white/40 uppercase tracking-widest">
                Leadership
              </p>
            </div>
          </AnimatedElement>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          {founders.map((member, i) => (
            <MemberCard
              key={member.name}
              member={member}
              featured
              delay={0.1 + i * 0.1}
            />
          ))}
        </div>

        <div className="mb-12">
          <AnimatedElement type="fadeInUp">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-[2px] bg-white/20" />
              <p className="text-xs font-mono text-white/40 uppercase tracking-widest">
                Engineering & Research
              </p>
            </div>
          </AnimatedElement>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member, i) => (
            <MemberCard
              key={member.name}
              member={member}
              delay={0.05 + i * 0.06}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

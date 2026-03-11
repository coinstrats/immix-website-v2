import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { AnimatedElement } from '../../ui';
import { faqItems } from './pricingData';

function FAQRow({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-white/[0.06] last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-4 text-left group"
      >
        <span className="text-sm font-medium text-white/80 group-hover:text-white/95 transition-colors">
          {question}
        </span>
        <ChevronDown
          size={16}
          className={`flex-shrink-0 text-white/30 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? 'max-h-40 pb-4' : 'max-h-0'
        }`}
      >
        <p className="text-sm text-white/45 leading-relaxed pr-8">{answer}</p>
      </div>
    </div>
  );
}

export function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <AnimatedElement type="fadeInUp">
        <div className="text-center">
          <p className="text-xs font-mono text-white/30 tracking-[0.15em] uppercase">
            FAQ
          </p>
        </div>
      </AnimatedElement>

      <AnimatedElement type="fadeInUp" delay={0.05}>
        <div className="max-w-2xl mx-auto bg-white/[0.015] border border-white/[0.06] p-6">
          {faqItems.map((item, idx) => (
            <FAQRow
              key={item.question}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === idx}
              onToggle={() =>
                setOpenIndex(openIndex === idx ? null : idx)
              }
            />
          ))}
        </div>
      </AnimatedElement>
    </div>
  );
}

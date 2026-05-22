import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How far in advance should we book your services?",
      answer: "We recommend booking at least 6 to 12 months in advance, especially for dates during peak wedding seasons, to ensure our team is available for your special day."
    },
    {
      question: "Do you travel for destination weddings?",
      answer: "Absolutely. We love capturing love stories around the globe. Our team is fully equipped and experienced in handling destination weddings and international events."
    },
    {
      question: "When can we expect our final photos and videos?",
      answer: "We focus on meticulous editing to ensure cinematic quality. You can expect a highlight reel within a few days, while the complete curated gallery and full films are typically delivered within 4 to 6 weeks."
    },
    {
      question: "Do you provide raw, unedited footage?",
      answer: "Our signature style relies heavily on our specialized color grading and editorial process. Therefore, we provide fully edited, high-resolution final products rather than unedited RAW files."
    },
    {
      question: "What is your approach to posing and candid moments?",
      answer: "We believe in a hybrid approach. While we gently guide you for those timeless, editorial portraits, a majority of our work focuses on capturing genuine, candid, and uninterrupted moments as they unfold."
    }
  ];

  return (
    <section className="py-12 md:py-32 bg-[#050505] relative overflow-hidden border-t border-white/5">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#c1272d]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full relative px-6 md:px-12 z-10 max-w-4xl mx-auto">
        <div className="flex flex-col items-center text-center mb-8 md:mb-16">
          <span className="text-[#c1272d] font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4 block">Got Questions?</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-[1.1] text-white mb-6">
            Frequently Asked <span className="italic text-gray-500">Questions</span>
          </h2>
          <div className="w-12 h-[1px] bg-white/20"></div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border border-white/10 rounded-sm overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'bg-white/[0.02] border-[#c1272d]/30 shadow-[0_5px_15px_rgba(193,39,45,0.05)]' : 'hover:border-white/20'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 md:px-8 py-6 flex items-center justify-between text-left focus:outline-none"
              >
                <span className={`text-base md:text-lg font-serif leading-snug transition-colors ${openIndex === index ? 'text-[#c1272d]' : 'text-white'}`}>
                  {faq.question}
                </span>
                <span className="ml-4 flex-shrink-0 text-gray-500">
                  {openIndex === index ? <Minus className="w-4 h-4 text-[#c1272d]" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>
              
              <div 
                className={`px-6 md:px-8 overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-gray-400 font-light text-sm md:text-base leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

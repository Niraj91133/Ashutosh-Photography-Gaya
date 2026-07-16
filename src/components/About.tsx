import { useEffect, useState, useRef } from 'react';
import { supabase } from '../lib/supabase';
import TextReveal from './TextReveal';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [config, setConfig] = useState({
    text: "At Asutosh Photography, we archive the soul of every moment. Founded on the principles of luxury and storytelling, we've spent over 6 years refining the alchemy of light and emotion.\n\nWhether it's a wedding vow or the joy of a child's laugh, we deliver high-end visuals that transcend time. We believe in minimal distractions and maximum impact.",
    url: 'https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=1200'
  });

  useEffect(() => {
    const fetchConfig = async () => {
      if (!supabase) return;
      const { data } = await supabase
        .from('site_images')
        .select('*')
        .eq('section', 'config')
        .eq('category', 'about')
        .maybeSingle();

      if (data) {
        try {
          const parsed = JSON.parse(data.description || '{}');
          setConfig({
            text: parsed.text || "At Asutosh Photography, we archive the soul of every moment. Founded on the principles of luxury and storytelling, we've spent over 6 years refining the alchemy of light and emotion.\n\nWhether it's a wedding vow or the joy of a child's laugh, we deliver high-end visuals that transcend time. We believe in minimal distractions and maximum impact.",
            url: data.url || 'https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=1200'
          });
        } catch(e) {}
      }
    };
    fetchConfig();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSectionVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-32 bg-[#050505] text-white border-b border-white/5 overflow-hidden">
      <div className="w-full px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Split Layout - Compact Luxury */}
          <div className="relative flex justify-center lg:justify-start">
            <div 
              className="aspect-[3/4] w-full max-w-md rounded-lg overflow-hidden shadow-xl relative z-10"
              style={{
                opacity: isSectionVisible ? 1 : 0,
                transform: isSectionVisible ? 'scale(1) translateY(0)' : 'scale(1.05) translateY(20px)',
                transition: 'opacity 1500ms cubic-bezier(0.16, 1, 0.3, 1), transform 1500ms cubic-bezier(0.16, 1, 0.3, 1)',
                willChange: 'transform, opacity',
              }}
            >
              <img
                src={config.url}
                alt="Our Story"
                className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out hover:scale-105"
              />
            </div>
            <div 
              className="absolute -bottom-4 -right-4 w-48 h-48 bg-transparent shadow-md rounded-lg -z-10 hidden md:block border border-[#c1272d]"
              style={{
                opacity: isSectionVisible ? 0.3 : 0,
                transform: isSectionVisible ? 'translate(0, 0)' : 'translate(-12px, -12px)',
                transition: 'opacity 1500ms cubic-bezier(0.16, 1, 0.3, 1), transform 1500ms cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: '300ms',
                willChange: 'transform, opacity',
              }}
            ></div>
          </div>

          {/* Storytelling Content - Reduced Sizes */}
          <div className="space-y-8">
            <div className="space-y-4 mb-6">
              <span className="text-[#c1272d] font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4 block">
                <TextReveal text="Our Heritage" type="char" stagger={25} />
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-[1.1] text-white">
                <TextReveal text="Preserving the" type="word" stagger={85} variant="cinematic" />{' '}
                <span className="italic text-[#c1272d] block md:inline mt-1 md:mt-0">
                  <TextReveal text="Art of Emotion" type="word" delay={250} stagger={85} variant="cinematic" />
                </span>
              </h2>
            </div>

            <div className="space-y-6 text-base md:text-lg lg:text-xl font-light leading-relaxed text-gray-300 max-w-2xl whitespace-pre-line">
              <p>
                <TextReveal text={config.text} type="word" delay={500} stagger={18} variant="cinematic" />
              </p>
            </div>

            <div className="pt-6 grid grid-cols-2 gap-8 border-t border-white/5 max-w-sm">
              <div
                style={{
                  opacity: isSectionVisible ? 1 : 0,
                  transform: isSectionVisible ? 'translateY(0)' : 'translateY(15px)',
                  transition: 'opacity 1000ms cubic-bezier(0.16, 1, 0.3, 1), transform 1000ms cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: '850ms',
                  willChange: 'transform, opacity',
                }}
              >
                <p className="text-2xl font-serif text-white mb-0.5">500+</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-black">Events</p>
              </div>
              <div
                style={{
                  opacity: isSectionVisible ? 1 : 0,
                  transform: isSectionVisible ? 'translateY(0)' : 'translateY(15px)',
                  transition: 'opacity 1000ms cubic-bezier(0.16, 1, 0.3, 1), transform 1000ms cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: '1000ms',
                  willChange: 'transform, opacity',
                }}
              >
                <p className="text-2xl font-serif text-white mb-0.5">20+</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-black">Cities</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
import { Star, Quote } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const DEFAULT_TESTIMONIALS = [
  {
    name: 'Priya & Rahul',
    event: 'Wedding, Patna',
    rating: 5,
    text: 'Asutosh Photography captured our special day beautifully. Every candid moment was perfect and the cinematic video is like a movie!',
    initials: 'PR'
  },
  {
    name: 'Anjali Sharma',
    event: 'Pre-Wedding, Bodhgaya',
    rating: 5,
    text: 'Professional team with amazing creativity. They made us feel so comfortable in front of the camera. Highly recommend for any occasion!',
    initials: 'AS'
  },
  {
    name: 'Vikash Kumar',
    event: 'Birthday Party, Gaya',
    rating: 5,
    text: 'Excellent service and beautiful, high-quality photos. They made our celebration truly memorable and delivered everything on time.',
    initials: 'VK'
  },
  {
    name: 'Neha & Sumit',
    event: 'Engagement, Ranchi',
    rating: 5,
    text: 'The absolute best decision we made was hiring Asutosh! The premium luxury feel of their work is unmatched in the region.',
    initials: 'NS'
  }
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<any[]>(DEFAULT_TESTIMONIALS);

  useEffect(() => {
    const fetchTestimonials = async () => {
      if (!supabase) return;
      try {
        const { data, error } = await supabase
          .from('site_images')
          .select('*')
          .eq('section', 'testimonials');

        if (error) throw error;

        if (data && data.length > 0) {
          const formatted = data.map((item: any) => ({
            name: item.title,
            event: item.category,
            rating: 5,
            text: item.description || 'Excellent work!',
            initials: item.title.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2),
            url: item.url
          }));
          setTestimonials(formatted);
        }
      } catch (err) {
        console.error('Error fetching testimonials:', err);
      }
    };

    fetchTestimonials();
  }, []);

  // Duplicate testimonials array twice to ensure smooth infinite scrolling
  const marqueeItems = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-[#050505] border-y border-white/5 relative overflow-hidden">
      
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#c1272d]/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full relative px-6 md:px-12">
        <div className="flex flex-col items-start text-left mb-20 space-y-4 relative z-10">
          <span className="text-[#c1272d] font-bold uppercase tracking-[0.3em] text-[10px]">Client Love</span>
          <h2 className="text-4xl md:text-5xl font-serif text-white font-medium leading-tight">Words of Praise</h2>
          <div className="w-12 h-[1px] bg-white/20"></div>
        </div>

        {/* Continuous Marquee Container */}
        <div className="relative flex overflow-x-hidden group">
          
          {/* Gradient fade on edges for luxury effect */}
          <div className="absolute top-0 bottom-0 left-0 w-24 md:w-48 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none"></div>
          <div className="absolute top-0 bottom-0 right-0 w-24 md:w-48 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none"></div>

          <div className="flex animate-marquee gap-8 py-4 px-4 w-max">
            {marqueeItems.map((testimonial, index) => (
              <div
                key={index}
                className="w-[350px] md:w-[450px] p-10 bg-[#0a0a0a] rounded-sm border border-white/5 shadow-sm transition-all duration-500 flex flex-col relative group-hover:border-white/10"
              >
                <Quote className="text-[#c1272d] w-12 h-12 absolute top-6 right-6 -z-0 opacity-10" />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-[#c1272d] fill-[#c1272d]" />
                    ))}
                  </div>

                  <p className="text-gray-300 font-light leading-relaxed text-sm md:text-base mb-10 flex-grow">
                    "{testimonial.text}"
                  </p>

                  <div className="pt-6 border-t border-white/10 mt-auto">
                    <h4 className="font-serif text-white text-lg tracking-wide">{testimonial.name}</h4>
                    <p className="text-[9px] text-gray-500 font-bold uppercase tracking-[0.2em] mt-1.5">{testimonial.event}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface HeroProps {
  onNavClick: (section: string) => void;
}

export default function Hero({ onNavClick }: HeroProps) {
  const [heroImages, setHeroImages] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchHero = async () => {
      if (!supabase) return;
      const { data } = await supabase
        .from('site_images')
        .select('*')
        .eq('section', 'hero')
        .order('created_at', { ascending: false });

      if (data && data.length > 0) {
        setHeroImages(data);
      } else {
        setHeroImages([{ url: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop", media_type: 'image' }]);
      }
    };

    fetchHero();
  }, []);

  // Set up auto-scroll for slider
  useEffect(() => {
    if (heroImages.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <section id="hero" className="relative h-screen w-full flex items-center overflow-hidden bg-[#050505]">
      {/* Background Images */}
      {heroImages.map((hero, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-0' : 'opacity-0 -z-10'
          }`}
        >
          {hero.media_type === 'video' ? (
            <video
              src={hero.url}
              className="w-full h-full object-cover scale-105"
              autoPlay muted loop playsInline
            />
          ) : (
            <img
              src={hero.url}
              alt="Photography background"
              className="w-full h-full object-cover scale-105"
            />
          )}
          {/* Heavy Gradients to match screenshot (dark on left and bottom) */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/95 via-[#050505]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-transparent to-transparent" />
        </div>
      ))}

      {/* Left and Right Nav Arrows */}
      {heroImages.length > 1 && (
        <>
          <button 
            onClick={prevSlide}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/40 hover:bg-[#ff3333] border border-white/10 text-white transition-all backdrop-blur-md"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <button 
            onClick={nextSlide}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/40 hover:bg-[#ff3333] border border-white/10 text-white transition-all backdrop-blur-md"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </>
      )}

      {/* Pagination Dots (Bottom Right) */}
      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-20 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-[#ff3333] w-5' : 'bg-white/30 hover:bg-white/50 w-1.5'
            }`}
          />
        ))}
      </div>

      {/* Text Content (Left Aligned) */}
      <div className="relative z-10 w-full px-6 md:px-12 mt-12 md:mt-20">
        <h1 className="font-sans font-black text-[clamp(2.8rem,7vw,6.5rem)] text-white leading-[1] mb-6 tracking-tight fade-in drop-shadow-2xl uppercase">
          ASUTOSH
          <br />
          PHOTOGRAPHY
        </h1>

        <p className="font-sans text-sm md:text-[17px] text-gray-300 mb-10 max-w-lg leading-relaxed fade-in font-medium tracking-wide" style={{ animationDelay: '0.2s' }}>
          Write Something About the Asutosh Photography so That User get Attracted and book Us FAst
        </p>

        <div className="fade-in" style={{ animationDelay: '0.4s' }}>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              onNavClick('contact');
            }}
            className="inline-flex items-center justify-center bg-[#050505] text-white px-12 py-3.5 rounded-sm border border-[#ff3333]/60 hover:border-[#ff3333] hover:bg-[#ff3333] transition-all duration-300 text-sm font-semibold tracking-wide shadow-[0_0_15px_rgba(255,51,51,0.15)] hover:shadow-[0_0_20px_rgba(255,51,51,0.5)]"
          >
            Book Us
          </a>
        </div>
      </div>
    </section>
  );
}
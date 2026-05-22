import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface HeroProps {
  onNavClick: (section: string) => void;
}

export default function Hero({ onNavClick }: HeroProps) {
  const [heroImages, setHeroImages] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [config, setConfig] = useState({
    big_text: 'ASUTOSH\nPHOTOGRAPHY',
    small_text: 'Write Something About the Asutosh Photography so That User get Attracted and book Us FAst',
    autoscroll: true
  });

  useEffect(() => {
    const fetchHero = async () => {
      if (!supabase) return;
      const { data } = await supabase
        .from('site_images')
        .select('*')
        .eq('section', 'hero')
        .order('created_at', { ascending: false });

      if (data && data.length > 1) {
        setHeroImages(data);
      } else if (data && data.length === 1) {
        setHeroImages([
          data[0],
          { url: "https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop", media_type: 'image' },
          { url: "https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop", media_type: 'image' }
        ]);
      } else {
        setHeroImages([
          { url: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop", media_type: 'image' },
          { url: "https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop", media_type: 'image' },
          { url: "https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop", media_type: 'image' }
        ]);
      }

      const { data: configData } = await supabase
        .from('site_images')
        .select('*')
        .eq('section', 'config')
        .eq('category', 'hero')
        .maybeSingle();

      if (configData) {
        try {
          const parsed = JSON.parse(configData.description || '{}');
          setConfig({
            big_text: parsed.big_text || 'ASUTOSH\nPHOTOGRAPHY',
            small_text: parsed.small_text || 'Write Something About the Asutosh Photography so That User get Attracted and book Us FAst',
            autoscroll: parsed.autoscroll !== false
          });
        } catch(e) {}
      }
    };

    fetchHero();
  }, []);

  // Set up auto-scroll for slider
  useEffect(() => {
    if (heroImages.length <= 1 || !config.autoscroll) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 3500); // Faster slide interval (3.5 seconds)
    
    return () => clearInterval(interval);
  }, [heroImages.length, config.autoscroll]);

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
            className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full bg-black/40 hover:bg-[#c1272d] border border-white/10 text-white transition-all backdrop-blur-md"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button 
            onClick={nextSlide}
            className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full bg-black/40 hover:bg-[#c1272d] border border-white/10 text-white transition-all backdrop-blur-md"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Pagination Dots (Bottom Right) */}
      <div className="hidden md:flex absolute bottom-8 right-8 md:bottom-12 md:right-12 z-20 gap-2">
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
        <h1 className="font-sans font-black text-[clamp(3rem,8vw,7rem)] text-white leading-[0.95] mb-6 tracking-tighter fade-in drop-shadow-2xl uppercase whitespace-pre-line">
          {config.big_text}
        </h1>

        <p className="text-base md:text-lg lg:text-xl font-light leading-relaxed text-gray-300 mb-10 max-w-2xl fade-in whitespace-pre-line" style={{ animationDelay: '0.2s' }}>
          {config.small_text}
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
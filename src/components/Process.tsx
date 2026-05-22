import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Process() {
  const [config, setConfig] = useState({
    text: 'Write Something About the Asutosh Potography\nso That User get Attracted and book Us FAst',
    url: 'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop'
  });

  useEffect(() => {
    const fetchConfig = async () => {
      if (!supabase) return;
      const { data } = await supabase
        .from('site_images')
        .select('*')
        .eq('section', 'config')
        .eq('category', 'process')
        .maybeSingle();

      if (data) {
        try {
          const parsed = JSON.parse(data.description || '{}');
          setConfig({
            text: parsed.text || 'Write Something About the Asutosh Potography\nso That User get Attracted and book Us FAst',
            url: data.url || 'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop'
          });
        } catch(e) {}
      }
    };
    fetchConfig();
  }, []);

  const isVideo = config.url.match(/\.(mp4|webm|mov)$/i) || config.url.includes('video');

  return (
    <section className="relative h-[350px] md:h-[450px] flex items-center bg-[#050505] overflow-hidden border-y border-white/5">
      {/* Background Image & Overlays */}
      <div className="absolute inset-0 z-0">
        {isVideo ? (
          <video
            src={config.url}
            className="w-full h-full object-cover grayscale opacity-60"
            autoPlay muted loop playsInline
          />
        ) : (
          <img
            src={config.url}
            alt="Process Background"
            className="w-full h-full object-cover grayscale opacity-60"
          />
        )}
        {/* Left-heavy gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
      </div>

      {/* Content aligned with landing page */}
      <div className="w-full relative px-6 md:px-12 z-10">
        <div className="max-w-2xl">
          <p className="text-base md:text-lg lg:text-xl font-light leading-relaxed text-gray-300 mb-10 max-w-2xl whitespace-pre-line">
            {config.text}
          </p>

          <a
            href="#contact"
            className="inline-flex items-center justify-center bg-[#050505] text-white px-12 py-3.5 rounded-sm border border-[#ff3333]/60 hover:border-[#ff3333] hover:bg-[#ff3333] transition-all duration-300 text-sm font-semibold tracking-wider shadow-[0_0_15px_rgba(255,51,51,0.15)] hover:shadow-[0_0_20px_rgba(255,51,51,0.5)]"
          >
            Book Us
          </a>
        </div>
      </div>
    </section>
  );
}

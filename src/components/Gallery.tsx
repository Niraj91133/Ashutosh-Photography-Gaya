import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { Film, X, ChevronLeft, ChevronRight } from 'lucide-react';

const DEFAULT_IMAGES = [
  { url: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Wedding', title: 'Eternal Vows', media_type: 'image' },
  { url: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Pre-Wedding', title: 'Romantic Sunset', media_type: 'image' },
  { url: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Wedding', title: 'The Reception', media_type: 'image' },
  { url: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Wedding', title: 'Bridal Portrait', media_type: 'image' },
  { url: 'https://images.pexels.com/photos/2253879/pexels-photo-2253879.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Birthday', title: 'First Joy', media_type: 'image' },
  { url: 'https://images.pexels.com/photos/2253842/pexels-photo-2253842.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Baby', title: 'Sweet Innocence', media_type: 'image' },
  { url: 'https://images.pexels.com/photos/5804899/pexels-photo-5804899.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Product', title: 'Luxury Watch', media_type: 'image' },
  { url: 'https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Wedding', title: 'The Ring', media_type: 'image' },
  { url: 'https://images.pexels.com/photos/206533/pexels-photo-206533.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Wedding', title: 'Celebration', media_type: 'image' },
  { url: 'https://images.pexels.com/photos/3014853/pexels-photo-3014853.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Pre-Wedding', title: 'Lakeside Love', media_type: 'image' },
  { url: 'https://images.pexels.com/photos/1128783/pexels-photo-1128783.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Wedding', title: 'The Dance', media_type: 'image' },
  { url: 'https://images.pexels.com/photos/5638732/pexels-photo-5638732.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Birthday', title: 'Cake Smash', media_type: 'image' },
  { url: 'https://images.pexels.com/photos/1407106/pexels-photo-1407106.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Portrait', title: 'Studio Fine Art', media_type: 'image' },
  { url: 'https://images.pexels.com/photos/2253844/pexels-photo-2253844.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Baby', title: 'Dreamy Sleep', media_type: 'image' },
  { url: 'https://images.pexels.com/photos/3352548/pexels-photo-3352548.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Product', title: 'Perfume Shot', media_type: 'image' },
  { url: 'https://images.pexels.com/photos/2917380/pexels-photo-2917380.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Pre-Wedding', title: 'City Lights', media_type: 'image' },
  { url: 'https://images.pexels.com/photos/157757/wedding-dresses-fashion-character-bride-157757.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Wedding', title: 'The Gown', media_type: 'image' },
  { url: 'https://images.pexels.com/photos/1964970/pexels-photo-1964970.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Product', title: 'Jewelry Detail', media_type: 'image' },
  { url: 'https://images.pexels.com/photos/1154189/pexels-photo-1154189.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Commercial', title: 'Fashion Shoot', media_type: 'image' },
  { url: 'https://images.pexels.com/photos/3225528/pexels-photo-3225528.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Wedding', title: 'Candid Smile', media_type: 'image' }
];

interface GalleryProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

export default function Gallery({ activeFilter, setActiveFilter }: GalleryProps) {
  const [images, setImages] = useState(DEFAULT_IMAGES);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [distortionScale, setDistortionScale] = useState(0);

  const getInitialCount = () => typeof window !== 'undefined' && window.innerWidth < 768 ? 6 : 12;
  const [visibleCount, setVisibleCount] = useState(getInitialCount());

  useEffect(() => {
    const fetchGallery = async () => {
      if (!supabase) return;
      try {
        const { data } = await supabase
          .from('site_images')
          .select('*')
          .eq('section', 'gallery')
          .order('created_at', { ascending: false });

        if (data && data.length > 0) {
          setImages([...data]);
        }
      } catch (err) {
        console.error('Error fetching gallery:', err);
      }
    };
    fetchGallery();
  }, []);

  const filters = [
    'All', 'Wedding', 'Pre-Wedding', 'Birthday', 'Product', 'Baby',
    'Videography', 'Reels', 'Wedding Films', 'Editing', 'Photo & Video Editing',
    'Album Design', 'Custom Album', 'Backlit Printing', 'Portrait', 'Commercial', 'Cinematic Films'
  ];

  const filteredImages = activeFilter === 'All'
    ? images
    : images.filter(img => img.category === activeFilter);

  const paginatedImages = filteredImages.slice(0, visibleCount);

  // Reset pagination when filter changes
  useEffect(() => {
    setVisibleCount(getInitialCount());
  }, [activeFilter]);

  const changeSlide = useCallback((index: number) => {
    if (selectedIndex === null || index === selectedIndex) return;

    // Start distortion transition
    const duration = 600; // ms
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Wave effect: starts at 0, peaks at 70 around progress=0.5, then goes back to 0
      let scale = 0;
      if (progress < 0.5) {
        scale = (progress / 0.5) * 70;
      } else {
        scale = 70 * (1 - (progress - 0.5) / 0.5);
      }

      setDistortionScale(scale);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDistortionScale(0);
      }
    };

    // Update the image at the peak of distortion (approx 200ms)
    setTimeout(() => {
      setSelectedIndex(index);
    }, 200);

    requestAnimationFrame(animate);
  }, [selectedIndex]);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      const newIndex = (selectedIndex - 1 + paginatedImages.length) % paginatedImages.length;
      changeSlide(newIndex);
    }
  }, [selectedIndex, paginatedImages.length, changeSlide]);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      const newIndex = (selectedIndex + 1) % paginatedImages.length;
      changeSlide(newIndex);
    }
  }, [selectedIndex, paginatedImages.length, changeSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') setSelectedIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, handlePrev, handleNext]);

  return (
    <section id="gallery" className="py-24 md:py-32 bg-[#050505]">
      <div className="w-full relative px-6 md:px-12">
        {/* Filter Tabs - Single Row with Invisible Scroll */}
        <div className="flex flex-nowrap overflow-x-auto gap-3 mb-10 pb-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {filters.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all rounded-[4px] border whitespace-nowrap flex-shrink-0
                  ${isActive 
                    ? 'bg-[#c1272d] text-white border-[#c1272d]' 
                    : 'bg-transparent text-gray-400 border-white/20 hover:border-white/40 hover:text-white'
                  }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Clean Masonry Layout */}
        <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-6 gap-4 space-y-4">
          {paginatedImages.map((image, index) => (
            <div
              key={index}
              onClick={() => setSelectedIndex(index)}
              className="break-inside-avoid relative group overflow-hidden bg-[#0a0a0a] cursor-zoom-in rounded-sm"
            >
              {image.media_type === 'video' ? (
                <div className="relative">
                  <video
                    src={image.url}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    autoPlay muted loop playsInline
                  />
                  <div className="absolute top-2 right-2 w-6 h-6 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Film className="w-3 h-3 text-white" />
                  </div>
                </div>
              ) : (
                <img
                  src={image.url}
                  alt={image.title}
                  loading="lazy"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
              )}
            </div>
          ))}
        </div>

        {/* See More Button */}
        {visibleCount < filteredImages.length && (
          <div className="mt-16 flex justify-center">
            <button
              onClick={() => setVisibleCount(prev => prev + getInitialCount())}
              className="px-8 py-3 bg-transparent border border-white/20 text-white text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-white hover:text-black transition-all duration-300"
            >
              See More
            </button>
          </div>
        )}
      </div>

      {/* Luxury Lightbox / Previewer */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl animate-in fade-in duration-300"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Distorto SVG Filter */}
          <svg className="absolute w-0 h-0 hidden" aria-hidden="true">
            <defs>
              <filter id="distorto-fx">
                <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale={distortionScale} xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </defs>
          </svg>

          {/* Close Button */}
          <button
            className="absolute top-6 right-6 md:top-8 md:right-8 text-white/50 hover:text-white transition-colors z-[120]"
            onClick={() => setSelectedIndex(null)}
          >
            <X className="w-8 h-8" />
          </button>

          {/* Left Arrow */}
          <button
            className="absolute left-2 md:left-8 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all z-[110]"
            onClick={handlePrev}
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 h-8" />
          </button>
          
          {/* Right Arrow */}
          <button
            className="absolute right-2 md:right-8 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all z-[110]"
            onClick={handleNext}
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6 md:w-8 h-8" />
          </button>

          {/* Main Display Container */}
          <div
            className="relative max-w-4xl max-h-[60vh] md:max-h-[65vh] w-full mx-4 md:mx-0 flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full h-full flex items-center justify-center">
              {paginatedImages[selectedIndex].media_type === 'video' ? (
                <video
                  src={paginatedImages[selectedIndex].url}
                  controls
                  autoPlay
                  className="max-h-[60vh] md:max-h-[65vh] w-auto h-full object-contain rounded-md shadow-2xl transition-all duration-300"
                  style={{ filter: distortionScale > 0.1 ? 'url(#distorto-fx)' : 'none' }}
                />
              ) : (
                <img
                  src={paginatedImages[selectedIndex].url}
                  alt={paginatedImages[selectedIndex].title}
                  className="max-h-[60vh] md:max-h-[65vh] w-auto h-full object-contain rounded-md shadow-2xl transition-all duration-300"
                  style={{ filter: distortionScale > 0.1 ? 'url(#distorto-fx)' : 'none' }}
                />
              )}
            </div>
          </div>

          {/* Distorto-style Bottom Navigation & Labels */}
          <div 
            className="absolute bottom-6 left-0 right-0 flex flex-col items-center z-[110] px-6 select-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Slide Title and Category Label */}
            <div className="mb-5 text-center">
              <span className="text-[#c1272d] font-black uppercase tracking-[0.2em] text-[10px] md:text-xs block mb-1">
                {paginatedImages[selectedIndex].category}
              </span>
              <h3 className="text-xl md:text-2xl font-serif font-medium text-white flex items-center gap-2 justify-center">
                {paginatedImages[selectedIndex].title}
                <span className="text-[#c1272d] text-sm md:text-base font-sans">↗</span>
              </h3>
            </div>

            {/* Horizontal Thumbnail Slider Track */}
            <div className="flex items-center gap-3 overflow-x-auto max-w-full md:max-w-2xl py-2 px-4 scrollbar-hide bg-black/40 backdrop-blur-md rounded-full border border-white/5 shadow-lg">
              {paginatedImages.map((image, idx) => {
                const isActive = idx === selectedIndex;
                return (
                  <button
                    key={idx}
                    onClick={() => changeSlide(idx)}
                    className="relative flex-shrink-0 focus:outline-none transition-all duration-300"
                  >
                    <img
                      src={image.url}
                      alt={image.title}
                      className={`w-10 h-10 md:w-12 md:h-12 object-cover rounded-full transition-all duration-300 ${
                        isActive 
                          ? 'scale-110 border border-white/80 opacity-100 ring-2 ring-[#c1272d]/40' 
                          : 'opacity-40 hover:opacity-80'
                      }`}
                    />
                    {isActive && (
                      <div className="absolute -bottom-1 left-2 right-2 h-[2px] bg-white rounded-full animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
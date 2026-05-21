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

  useEffect(() => {
    const fetchGallery = async () => {
      if (!supabase) return;
      try {
        const { data } = await supabase
          .from('site_images')
          .select('*')
          .eq('section', 'services')
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

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + filteredImages.length) % filteredImages.length);
    }
  }, [selectedIndex, filteredImages.length]);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % filteredImages.length);
    }
  }, [selectedIndex, filteredImages.length]);

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
    <section id="gallery" className="py-20 bg-white">
      <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Title Section */}
        <div className="mb-12">
          <span className="text-gray-500 font-bold uppercase tracking-[0.2em] text-[10px]">The Showcase</span>
          <h2 className="text-3xl md:text-5xl font-serif text-[#050505] font-medium leading-tight mt-2">Collected Masterpieces</h2>
        </div>

        {/* Filter Tabs - Matching Reference exactly */}
        <div className="flex flex-wrap gap-2 md:gap-3 mb-10 overflow-x-auto pb-4 scrollbar-hide">
          {filters.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 text-[13px] font-medium transition-all rounded-[4px] border whitespace-nowrap
                  ${isActive 
                    ? 'bg-[#c1272d] text-white border-[#c1272d]' 
                    : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400 hover:text-gray-900'
                  }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Clean Masonry Layout */}
        <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-6 gap-4 space-y-4">
          {filteredImages.map((image, index) => (
            <div
              key={index}
              onClick={() => setSelectedIndex(index)}
              className="break-inside-avoid relative group overflow-hidden bg-gray-100 cursor-zoom-in"
            >
              {image.media_type === 'video' ? (
                <div className="relative">
                  <video
                    src={image.url}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    autoPlay muted loop playsInline
                  />
                  <div className="absolute top-2 right-2 w-6 h-6 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Film className="w-3 h-3 text-white" />
                  </div>
                </div>
              ) : (
                <img
                  src={image.url}
                  alt={image.title}
                  loading="lazy"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Luxury Lightbox / Previewer */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl animate-in fade-in duration-300"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            className="absolute top-6 right-6 md:top-8 md:right-8 text-white/50 hover:text-white transition-colors z-[110]"
            onClick={() => setSelectedIndex(null)}
          >
            <X className="w-8 h-8" />
          </button>

          <button
            className="absolute left-2 md:left-8 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all z-[110]"
            onClick={handlePrev}
            aria-label="Previous"
          >
            <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
          </button>
          
          <button
            className="absolute right-2 md:right-8 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all z-[110]"
            onClick={handleNext}
            aria-label="Next"
          >
            <ChevronRight className="w-8 h-8 md:w-10 md:h-10" />
          </button>

          <div
            className="relative max-w-5xl max-h-[80vh] w-full mx-4 md:mx-0 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full h-full flex items-center justify-center">
              {filteredImages[selectedIndex].media_type === 'video' ? (
                <video
                  src={filteredImages[selectedIndex].url}
                  controls
                  autoPlay
                  className="max-h-[85vh] w-auto h-full object-contain"
                />
              ) : (
                <img
                  src={filteredImages[selectedIndex].url}
                  alt={filteredImages[selectedIndex].title}
                  className="max-h-[85vh] w-auto h-full object-contain"
                />
              )}
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium">
            {selectedIndex + 1} / {filteredImages.length}
          </div>
        </div>
      )}
    </section>
  );
}
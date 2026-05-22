import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Blog() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      if (!supabase) return;
      const { data } = await supabase
        .from('site_images')
        .select('*')
        .eq('section', 'blog')
        .order('created_at', { ascending: false });

      if (data) {
        setBlogs(data.map(item => {
          const [title, date] = (item.title || '').split(' | ');
          return {
            id: item.id,
            image: item.url,
            category: item.category,
            date: date || '',
            title: title || 'Blog Post',
            desc: item.description
          };
        }));
      }
    };
    fetchBlogs();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 md:py-32 bg-[#0a0a0a] border-t border-white/5 relative">
      <div className="w-full relative px-6 md:px-12 z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-8 md:mb-16">
          <div className="flex flex-col items-start text-left max-w-2xl">
            <span className="text-[#c1272d] font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4 block">Journal</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-[1.1] text-white">
              Latest from the <span className="italic text-gray-500">Blog</span>
            </h2>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center bg-[#050505] hover:bg-[#c1272d] hover:text-white transition-all shadow-md active:scale-95 group"
              aria-label="Scroll Left"
            >
              <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-0.5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center bg-[#050505] hover:bg-[#c1272d] hover:text-white transition-all shadow-md active:scale-95 group"
              aria-label="Scroll Right"
            >
              <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory pb-8 -mx-6 px-6 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          {blogs.map((blog) => (
            <Link 
              to={`/blog/${blog.id}`}
              target="_blank"
              rel="noopener noreferrer"
              key={blog.id} 
              className="flex-none w-[200px] md:w-[350px] snap-center group cursor-pointer flex flex-col bg-[#050505] rounded-sm border border-white/5 hover:border-white/20 transition-all duration-500 overflow-hidden shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
              </div>
              
              <div className="p-3 md:p-8 flex flex-col flex-grow">
                <span className="text-gray-500 text-[8px] md:text-[10px] uppercase tracking-widest font-bold mb-1 md:mb-3">
                  {blog.date}
                </span>
                <h3 className="text-sm md:text-2xl font-serif text-white mb-2 md:mb-3 leading-snug group-hover:text-[#c1272d] transition-colors duration-300 line-clamp-2 md:line-clamp-none">
                  {blog.title}
                </h3>
                <p className="text-gray-400 text-[9px] md:text-sm font-light leading-relaxed mb-3 md:mb-6 flex-grow line-clamp-3 md:line-clamp-none">
                  {blog.desc}
                </p>
                
                <span className="text-[8px] md:text-xs uppercase tracking-widest font-bold text-gray-300 group-hover:text-white flex items-center gap-1.5 md:gap-2 transition-colors mt-auto w-max">
                  Read
                  <span className="h-[1px] w-2 md:w-4 bg-[#c1272d] group-hover:w-4 md:group-hover:w-8 transition-all duration-300"></span>
                </span>
              </div>
            </Link>
          ))}
        </div>



      </div>
    </section>
  );
}

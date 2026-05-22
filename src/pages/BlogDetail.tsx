import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function BlogDetail() {
  const { id } = useParams();
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const [blog, setBlog] = useState<any>(null);
  const [otherBlogs, setOtherBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogData = async () => {
      if (!supabase) return;
      
      // Fetch the specific blog post
      const { data: currentBlog } = await supabase
        .from('site_images')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      // Fetch other blog posts
      const { data: others } = await supabase
        .from('site_images')
        .select('*')
        .eq('section', 'blog')
        .neq('id', id)
        .order('created_at', { ascending: false });

      if (currentBlog) {
        const [title, date] = (currentBlog.title || '').split(' | ');
        setBlog({
          id: currentBlog.id,
          image: currentBlog.url,
          category: currentBlog.category,
          date: date || '',
          title: title || 'Blog Post',
          desc: currentBlog.description
        });
      }

      if (others) {
        setOtherBlogs(others.map(item => {
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
      
      setLoading(false);
    };

    fetchBlogData();
  }, [id]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  // Scroll to top when loaded
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-[#c1272d]">
        <div className="w-12 h-12 border-4 border-[#c1272d] border-t-transparent animate-spin rounded-full"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-serif mb-4">Blog not found</h1>
          <Link to="/" className="text-[#c1272d] hover:text-white transition-colors">Return to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-24 md:pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Header / Meta */}
        <div className="mb-8 md:mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-[1.1] text-white mb-6">
            {blog.title}
          </h1>
          <p className="text-gray-500 text-[10px] md:text-xs uppercase tracking-widest font-bold">
            Published on {blog.date}
          </p>
        </div>

        {/* Main Image */}
        <div className="w-full aspect-video md:aspect-[21/9] rounded-sm overflow-hidden mb-12 shadow-2xl">
          <img 
            src={blog.image} 
            alt={blog.title} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none text-gray-300 font-light text-base md:text-lg lg:text-xl leading-relaxed mb-24">
          <p className="first-letter:text-5xl first-letter:font-serif first-letter:text-[#c1272d] first-letter:mr-3 first-letter:float-left">
            {blog.desc}
          </p>
          <p className="mt-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
          </p>
          <h3 className="text-2xl md:text-3xl font-serif text-white mt-12 mb-6">The Importance of Light</h3>
          <p>
            Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.
          </p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 mb-16"></div>

        {/* Past Blog Cards */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-8">
            <span className="text-[#c1272d] font-black uppercase tracking-[0.3em] text-[10px] md:text-xs block">
              Read More
            </span>
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
            className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory pb-8 -mx-6 px-6 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
          >
            {otherBlogs.map((otherBlog) => (
              <Link 
                to={`/blog/${otherBlog.id}`}
                key={otherBlog.id} 
                className="flex-none w-[200px] md:w-[350px] snap-center group cursor-pointer flex flex-col bg-[#0a0a0a] rounded-sm border border-white/5 hover:border-white/20 transition-all duration-500 overflow-hidden shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={otherBlog.image} 
                    alt={otherBlog.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  />
                </div>
                
                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <span className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mb-3">
                    {otherBlog.date}
                  </span>
                  <h3 className="text-xl md:text-2xl font-serif text-white mb-3 leading-snug group-hover:text-[#c1272d] transition-colors duration-300">
                    {otherBlog.title}
                  </h3>
                  <p className="text-gray-400 text-sm font-light leading-relaxed flex-grow">
                    {otherBlog.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

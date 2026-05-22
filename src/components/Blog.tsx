import { ArrowRight } from 'lucide-react';

export default function Blog() {
  const blogs = [
    {
      id: 1,
      image: "https://images.pexels.com/photos/256737/pexels-photo-256737.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "Tips",
      date: "August 15, 2026",
      title: "5 Tips for Perfect Pre-Wedding Poses",
      desc: "Discover how to act natural in front of the camera and get those stunning candid editorial shots."
    },
    {
      id: 2,
      image: "https://images.pexels.com/photos/3379934/pexels-photo-3379934.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "Trends",
      date: "September 02, 2026",
      title: "The Rise of Cinematic Wedding Films",
      desc: "Why more couples are opting for high-production cinematic films instead of traditional videography."
    },
    {
      id: 3,
      image: "https://images.pexels.com/photos/1046497/pexels-photo-1046497.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "Guide",
      date: "October 10, 2026",
      title: "Choosing the Right Wedding Venue",
      desc: "A photographer's perspective on how venue lighting and architecture can make or break your photos."
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-[#0a0a0a] border-t border-white/5 relative">
      <div className="w-full relative px-6 md:px-12 z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="flex flex-col items-start text-left max-w-2xl">
            <span className="text-[#c1272d] font-bold uppercase tracking-[0.3em] text-[10px]">Journal</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white font-medium mt-4 leading-tight">
              Latest from the <span className="italic text-gray-500">Blog</span>
            </h2>
          </div>
          <button className="hidden md:flex items-center gap-2 text-gray-400 hover:text-white transition-colors group text-sm uppercase tracking-widest font-bold">
            View All Posts
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#c1272d]" />
          </button>
        </div>

        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 overflow-x-auto snap-x snap-mandatory pb-8 -mx-6 px-6 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          {blogs.map((blog) => (
            <a 
              key={blog.id} 
              href={`#blog-${blog.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-[260px] sm:min-w-[300px] md:min-w-0 flex-shrink-0 snap-center md:snap-align-none group cursor-pointer flex flex-col bg-[#050505] rounded-sm border border-white/5 hover:border-white/20 transition-all duration-500 overflow-hidden shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute top-4 left-4 bg-[#c1272d] text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-sm shadow-md">
                  {blog.category}
                </div>
              </div>
              
              <div className="p-5 md:p-8 flex flex-col flex-grow">
                <span className="text-gray-500 text-[9px] md:text-[10px] uppercase tracking-widest font-bold mb-3">
                  {blog.date}
                </span>
                <h3 className="text-lg md:text-xl font-serif text-white mb-2 md:mb-3 group-hover:text-[#c1272d] transition-colors duration-300">
                  {blog.title}
                </h3>
                <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed mb-6 flex-grow line-clamp-3">
                  {blog.desc}
                </p>
                
                <span className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-gray-300 group-hover:text-white flex items-center gap-2 transition-colors mt-auto w-max">
                  Read More
                  <span className="h-[1px] w-4 bg-[#c1272d] group-hover:w-8 transition-all duration-300"></span>
                </span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-[#050505] text-white border-b border-white/5">
      <div className="w-full px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Split Layout - Compact Luxury */}
          <div className="relative flex justify-center lg:justify-start">
            <div className="aspect-[3/4] w-full max-w-md rounded-lg overflow-hidden shadow-xl relative z-10">
              <img
                src="https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Our Story"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-48 h-48 bg-gold-50 shadow-md rounded-lg -z-10 hidden md:block border border-[#c1272d]"></div>
          </div>

          {/* Storytelling Content - Reduced Sizes */}
          <div className="space-y-8">
            <div className="space-y-4 mb-6">
              <span className="text-[#c1272d] font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4 block">Our Heritage</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-[1.1] text-white">
                Preserving the <span className="italic text-[#c1272d]">Art of Emotion</span>
              </h2>
            </div>

            <div className="space-y-6 text-base md:text-lg lg:text-xl font-light leading-relaxed text-gray-300 max-w-2xl">
              <p>
                At <span className="text-white font-medium">Asutosh Photography</span>, we archive the soul of every moment. Founded on the principles of luxury and storytelling, we've spent over 6 years refining the alchemy of light and emotion.
              </p>
              <p>
                Whether it's a wedding vow or the joy of a child's laugh, we deliver high-end visuals that transcend time. We believe in minimal distractions and maximum impact.
              </p>
            </div>

            <div className="pt-6 grid grid-cols-2 gap-8 border-t border-white/5 max-w-sm">
              <div>
                <p className="text-2xl font-serif text-white mb-0.5">500+</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-black">Events</p>
              </div>
              <div>
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
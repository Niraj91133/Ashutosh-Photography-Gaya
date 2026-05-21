export default function Process() {
  return (
    <section className="relative py-24 md:py-32 bg-[#050505] overflow-hidden border-y border-white/5">
      {/* Background Image & Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop"
          alt="Wedding Moments"
          className="w-full h-full object-cover grayscale opacity-60"
        />
        {/* Left-heavy gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-16 lg:px-32 flex flex-col justify-center h-full">
        <div className="max-w-xl">
          <p className="font-sans text-sm md:text-base text-gray-300 mb-8 leading-relaxed font-medium tracking-wide">
            Write Something About the Asutosh Potography<br />
            so That User get Attracted and book Us FAst
          </p>

          <a
            href="#contact"
            className="inline-flex items-center justify-center bg-[#050505] text-white px-10 py-3 rounded-sm border border-[#ff3333]/60 hover:border-[#ff3333] hover:bg-[#ff3333] transition-all duration-300 text-sm font-semibold tracking-wide shadow-[0_0_15px_rgba(255,51,51,0.15)] hover:shadow-[0_0_20px_rgba(255,51,51,0.5)]"
          >
            Book Us
          </a>
        </div>
      </div>
    </section>
  );
}

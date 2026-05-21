export default function Process() {
    return (
        <section className="w-full bg-white py-12 md:py-20">
            <div className="relative w-full max-w-[1600px] mx-auto h-[350px] md:h-[450px] flex items-center overflow-hidden bg-[#050505]">
                {/* Background Image (Black and White filter) */}
                <div className="absolute inset-0 z-0 bg-[#050505]">
                    <img
                        src="https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
                        alt="Background"
                        className="w-full h-full object-cover grayscale opacity-80"
                    />
                    {/* Dark Gradients for Vignette and bottom fade */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/95 via-[#050505]/50 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                </div>

                {/* Content (Left Aligned) */}
                <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 md:px-16 lg:px-32">
                    <p className="font-sans text-xs md:text-[15px] text-gray-200 mb-6 md:mb-8 max-w-[400px] leading-relaxed font-medium tracking-wide drop-shadow-md">
                        Write Something About the Asutosh Photography so That User get Attracted and book Us FAst
                    </p>

                    <div>
                        <a
                            href="#contact"
                            className="inline-flex items-center justify-center bg-[#050505] text-white px-10 py-3 rounded-sm border border-[#ff3333]/60 hover:border-[#ff3333] hover:bg-[#ff3333] transition-all duration-300 text-xs font-semibold tracking-wide shadow-[0_0_15px_rgba(255,51,51,0.15)] hover:shadow-[0_0_20px_rgba(255,51,51,0.5)]"
                        >
                            Book Us
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

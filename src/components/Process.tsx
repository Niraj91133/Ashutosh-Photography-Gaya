export default function Process() {
    return (
        <section className="relative w-full h-[60vh] min-h-[500px] flex items-center overflow-hidden bg-[#050505] border-b border-white/5">
            {/* Background Image (Black and White filter) */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
                    alt="Background"
                    className="w-full h-full object-cover grayscale opacity-80 scale-105"
                />
                {/* Heavy Dark Gradients for Vignette and Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/95 via-[#050505]/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-[#050505]/30 to-transparent" />
            </div>

            {/* Content (Left Aligned) */}
            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-16 lg:px-32 mt-12">
                <p className="font-sans text-sm md:text-[17px] text-gray-300 mb-10 max-w-[500px] leading-relaxed font-medium tracking-wide">
                    Write Something About the Asutosh Photography so That User get Attracted and book Us FAst
                </p>

                <div>
                    <a
                        href="#contact"
                        className="inline-flex items-center justify-center bg-[#050505] text-white px-12 py-3.5 rounded-sm border border-[#ff3333]/60 hover:border-[#ff3333] hover:bg-[#ff3333] transition-all duration-300 text-sm font-semibold tracking-wide shadow-[0_0_15px_rgba(255,51,51,0.15)] hover:shadow-[0_0_20px_rgba(255,51,51,0.5)]"
                    >
                        Book Us
                    </a>
                </div>
            </div>
        </section>
    );
}

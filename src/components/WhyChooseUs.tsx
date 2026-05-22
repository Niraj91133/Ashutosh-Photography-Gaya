export default function WhyChooseUs() {
    const features = [
        {
            number: '01',
            title: 'Premium Quality',
            desc: 'Industry-leading 4K equipment and high-end editing for a cinematic feel that mirrors true luxury.'
        },
        {
            number: '02',
            title: 'Timely Delivery',
            desc: 'We respect your time. Expect your meticulously edited memories delivered on schedule, without compromise.'
        },
        {
            number: '03',
            title: 'Emotional Detail',
            desc: 'We look beyond the obvious, focusing on the candid, fleeting moments that tell the authentic story.'
        },
        {
            number: '04',
            title: 'Trusted Team',
            desc: 'Over 6 years of experience seamlessly documenting high-profile weddings and intimate events globally.'
        },
        {
            number: '05',
            title: 'Artistic Vision',
            desc: 'A unique editorial approach blending traditional elegance with a modern, high-fashion aesthetic.'
        },
        {
            number: '06',
            title: 'Tailored Service',
            desc: 'Bespoke packages designed to perfectly fit your specific vision, ensuring a truly personalized experience.'
        }
    ];

    return (
        <section className="py-24 md:py-40 bg-[#050505] border-y border-white/5 relative">
            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#c1272d]/5 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
                    
                    {/* Left Sticky Content */}
                    <div className="lg:w-5/12">
                        <div className="sticky top-40 space-y-8">
                            <span className="text-[#c1272d] font-bold uppercase tracking-[0.3em] text-[10px]">The Asutosh Signature</span>
                            <h2 className="text-4xl md:text-6xl font-serif text-white font-medium leading-[1.1]">
                                Elevating the <br />
                                <span className="italic text-gray-400">Art of Memory</span>
                            </h2>
                            <p className="text-gray-400 font-light leading-relaxed text-sm md:text-base max-w-sm">
                                We don't just take photographs; we craft legacy artifacts. Every frame is treated as a masterpiece, ensuring your most precious moments are immortalized with unparalleled elegance and precision.
                            </p>
                            <div className="pt-8">
                                <div className="w-16 h-[1px] bg-white/20"></div>
                            </div>
                        </div>
                    </div>

                    {/* Right Editorial List */}
                    <div className="lg:w-7/12">
                        <div className="flex flex-col">
                            {features.map((item, index) => (
                                <div 
                                    key={index} 
                                    className="group relative flex flex-col md:flex-row md:items-start gap-6 md:gap-12 py-10 md:py-14 border-t border-white/10 first:border-t-0 transition-all duration-500 hover:bg-white/[0.02] -mx-6 px-6 md:mx-0 md:px-6 rounded-lg"
                                >
                                    {/* Large Number */}
                                    <div className="text-5xl md:text-7xl font-serif italic text-white/10 font-light group-hover:text-[#c1272d]/40 transition-colors duration-500">
                                        {item.number}
                                    </div>
                                    
                                    {/* Content */}
                                    <div className="space-y-4 pt-2">
                                        <h3 className="text-2xl md:text-3xl font-serif text-white tracking-wide group-hover:text-[#c1272d] transition-colors duration-500">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-400 font-light leading-relaxed text-sm md:text-base max-w-md">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
    );
}

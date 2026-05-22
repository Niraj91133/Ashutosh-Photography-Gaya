export default function WhyChooseUs() {
    const features = [
        {
            number: '01',
            title: 'Premium Quality',
            desc: '4K equipment and high-end editing for a cinematic feel.'
        },
        {
            number: '02',
            title: 'Timely Delivery',
            desc: 'Meticulously edited memories delivered exactly on schedule.'
        },
        {
            number: '03',
            title: 'Emotional Detail',
            desc: 'Focusing on candid, fleeting moments that tell your story.'
        },
        {
            number: '04',
            title: 'Trusted Team',
            desc: 'Years of experience documenting high-profile events globally.'
        },
        {
            number: '05',
            title: 'Artistic Vision',
            desc: 'An editorial approach blending elegance with modern aesthetics.'
        },
        {
            number: '06',
            title: 'Tailored Service',
            desc: 'Bespoke packages designed to perfectly fit your vision.'
        }
    ];

    return (
        <section className="py-24 md:py-32 bg-[#050505] border-y border-white/5 relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-[#c1272d]/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="w-full relative px-6 md:px-12 z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div className="flex flex-col items-start text-left max-w-2xl">
                        <span className="text-[#c1272d] font-bold uppercase tracking-[0.3em] text-[10px]">Why Choose Us</span>
                        <h2 className="text-4xl md:text-5xl font-serif text-white font-medium mt-4 leading-tight">
                            The Asutosh Photography <span className="italic text-gray-500">Difference</span>
                        </h2>
                    </div>
                    <div className="hidden md:block w-32 h-[1px] bg-white/20 mb-3"></div>
                </div>

                {/* Stacked Scroll (Mobile) / Compact Grid (Desktop) */}
                <div className="block md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-x-8 md:gap-y-12">
                    {features.map((item, index) => (
                        <div 
                            key={index} 
                            className="group relative flex flex-col items-start border-l border-white/10 pl-6 hover:border-[#c1272d] transition-colors duration-500
                                       sticky top-[15vh] md:static bg-[#050505] md:bg-transparent z-10 
                                       min-h-[35vh] md:min-h-0 mb-[25vh] md:mb-0 last:mb-0
                                       py-8 md:py-0 shadow-[0_-20px_30px_rgba(5,5,5,1)] md:shadow-none"
                        >
                            <span className="text-xs font-black text-white/20 group-hover:text-[#c1272d] mb-4 tracking-[0.2em] transition-colors duration-500">
                                {item.number}.
                            </span>
                            <h3 className="text-xl font-serif text-white mb-3 tracking-wide">
                                {item.title}
                            </h3>
                            <p className="text-gray-400 font-light leading-relaxed text-sm">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

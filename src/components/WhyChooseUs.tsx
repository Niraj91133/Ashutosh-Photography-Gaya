export default function WhyChooseUs() {
    const features = [
        {
            number: '01',
            title: 'Premium Quality',
            desc: 'Industry-leading 4K equipment and high-end editing for a cinematic feel that mirrors true luxury.',
            className: 'md:col-span-2 lg:col-span-2'
        },
        {
            number: '02',
            title: 'Timely Delivery',
            desc: 'We respect your time. Expect your meticulously edited memories delivered on schedule, without compromise.',
            className: 'col-span-1'
        },
        {
            number: '03',
            title: 'Emotional Detail',
            desc: 'We look beyond the obvious, focusing on the candid, fleeting moments that tell the authentic story.',
            className: 'col-span-1'
        },
        {
            number: '04',
            title: 'Trusted Team',
            desc: 'Over 6 years of experience seamlessly documenting high-profile weddings and intimate events globally.',
            className: 'md:col-span-2 lg:col-span-2'
        },
        {
            number: '05',
            title: 'Artistic Vision',
            desc: 'A unique editorial approach blending traditional elegance with a modern, high-fashion aesthetic.',
            className: 'md:col-span-2 lg:col-span-2'
        },
        {
            number: '06',
            title: 'Tailored Service',
            desc: 'Bespoke packages designed to perfectly fit your specific vision, ensuring a truly personalized experience.',
            className: 'col-span-1'
        }
    ];

    return (
        <section className="py-24 md:py-32 bg-[#050505] border-y border-white/5 relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-[#c1272d]/5 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="w-full relative px-6 md:px-12 z-10 max-w-[1600px] mx-auto">
                {/* Header aligned to the left */}
                <div className="flex flex-col items-start text-left mb-16 md:mb-24 relative z-10">
                    <span className="text-[#c1272d] font-bold uppercase tracking-[0.3em] text-[10px]">Why Choose Us</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white font-medium mt-4 mb-6 leading-[1.1]">
                        The Asutosh Photography <span className="italic text-gray-500">Difference</span>
                    </h2>
                    <div className="w-16 h-[1px] bg-white/20"></div>
                </div>

                {/* Asymmetrical Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {features.map((item, index) => (
                        <div 
                            key={index}
                            className={`group relative overflow-hidden rounded-[10px] bg-[#0a0a0a]/50 backdrop-blur-sm border border-white/5 p-8 md:p-10 flex flex-col justify-end min-h-[300px] md:min-h-[350px] transition-all duration-700 hover:border-white/10 hover:bg-[#0f0f0f] hover:shadow-[0_20px_40px_-15px_rgba(193,39,45,0.1)] ${item.className}`}
                        >
                            {/* Animated Top Border Accent */}
                            <div className="absolute top-0 left-0 w-0 h-1 bg-[#c1272d] group-hover:w-full transition-all duration-700 ease-out z-20"></div>

                            {/* Background Glow on Hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#c1272d]/0 to-transparent group-hover:from-[#c1272d]/[0.03] transition-colors duration-700 z-0"></div>

                            {/* Massive Watermark Number */}
                            <div className="absolute top-4 right-6 text-7xl md:text-8xl lg:text-9xl font-serif italic font-black text-white/[0.02] group-hover:text-[#c1272d]/10 transition-colors duration-700 select-none z-0 pointer-events-none transform group-hover:scale-105 group-hover:-translate-y-2 group-hover:translate-x-2 ease-out">
                                {item.number}
                            </div>

                            {/* Content */}
                            <div className="relative z-10 transform group-hover:-translate-y-2 transition-transform duration-500 ease-out flex flex-col h-full justify-end">
                                <h3 className="text-2xl md:text-3xl font-serif text-white mb-4 tracking-wide flex items-center gap-3">
                                    <span className="w-6 h-[1px] bg-[#c1272d] inline-block transition-all duration-500 group-hover:w-10"></span>
                                    {item.title}
                                </h3>
                                <p className="text-gray-400 font-light leading-relaxed text-sm md:text-[15px] max-w-lg group-hover:text-gray-300 transition-colors duration-500">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

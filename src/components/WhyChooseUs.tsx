import TextReveal from './TextReveal';

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
                        <span className="text-[#c1272d] font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4 block">
                            <TextReveal text="Why Choose Us" type="char" stagger={20} />
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-[1.1] text-white">
                            <TextReveal text="The Asutosh Photography" type="word" stagger={60} />{' '}
                            <span className="italic text-gray-500 block md:inline mt-1 md:mt-0">
                                <TextReveal text="Difference" type="word" delay={300} />
                            </span>
                        </h2>
                    </div>
                    <div className="hidden md:block w-32 h-[1px] bg-white/20 mb-3 animate-pulse"></div>
                </div>

                {/* Compact Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {features.map((item, index) => (
                        <div 
                            key={index} 
                            className="group relative flex flex-col items-start border-l border-white/10 pl-6 hover:border-[#c1272d] transition-colors duration-500"
                        >
                            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-white/20 group-hover:text-[#c1272d] mb-4 transition-colors duration-500">
                                <TextReveal text={`${item.number}.`} type="char" delay={index * 100} />
                            </span>
                            <h3 className="text-xl md:text-2xl font-serif text-white mb-3 leading-snug">
                                <TextReveal text={item.title} type="char" delay={index * 100 + 40} stagger={12} />
                            </h3>
                            <p className="text-gray-400 font-light leading-relaxed text-sm md:text-base">
                                <TextReveal text={item.desc} type="word" delay={index * 100 + 150} stagger={25} />
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

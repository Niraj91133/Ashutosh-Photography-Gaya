import { Phone } from 'lucide-react';

export default function CTA() {
    return (
        <section className="pt-12 pb-16 md:py-40 bg-[#050505] relative overflow-hidden">
            {/* Subtle Background Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-50/50 rounded-full blur-[120px] -z-10"></div>

            <div className="w-full px-12 text-center space-y-12">
                <div className="space-y-6">
                    <span className="text-[#c1272d] font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4 block">Take the Next Step</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-[1.1] max-w-4xl mx-auto">
                        Let's Capture Your <span className="italic text-[#c1272d]">Legacy</span> Together.
                    </h2>
                    <p className="text-base md:text-lg lg:text-xl font-light leading-relaxed text-gray-300 max-w-2xl mx-auto">
                        Ready to turn your most precious moments into high-end visual masterpieces? Our calendars fill up fast—reserve your date today.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <a
                        href="tel:9667517894"
                        className="w-full sm:w-auto px-12 py-6 bg-[#c1272d] hover:bg-[#c1272d] text-white rounded-full font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-[#c1272d]/20 active:scale-95 flex items-center justify-center gap-3"
                    >
                        <Phone className="w-4 h-4" />
                        Book Your Shoot
                    </a>
                    <a
                        href="#gallery"
                        className="w-full sm:w-auto px-12 py-6 bg-transparent hover:bg-[#0a0a0a] text-white border border-gray-200 rounded-full font-black uppercase tracking-widest text-[10px] transition-all"
                    >
                        View Portfolio
                    </a>
                </div>

                <div className="pt-12">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em]">Available globally • Based in Bihar, India</p>
                </div>
            </div>
        </section>
    );
}

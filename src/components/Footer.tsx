import { Camera, Instagram, Facebook, Mail, Phone, MapPin, Heart, MessageSquare, Layers } from 'lucide-react';
import { useSiteSettings } from '../hooks/useSiteSettings';

export default function Footer() {
  const settings = useSiteSettings();
  const currentYear = new Date().getFullYear();


  return (
    <footer className="bg-dark-900 pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c1272d]/20 to-transparent"></div>

      <div className="w-full relative px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-6">
              <Camera className="w-8 h-8 text-[#c1272d]" />
              <span className="text-2xl font-serif font-bold text-white">
                Asutosh<span className="text-[#c1272d]">Photography</span>
              </span>
            </div>
            <p className="text-gray-400 font-light leading-relaxed">
              Capturing the essence of your most beautiful moments with elegance and artistry. We turn memories into timeless treasures.
            </p>
            <div className="flex gap-4 flex-wrap">
              <a href={settings.instagram_link} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-sm bg-white/5 flex items-center justify-center hover:bg-[#c1272d] hover:text-white text-gray-400 transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={settings.facebook_link} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-sm bg-white/5 flex items-center justify-center hover:bg-[#c1272d] hover:text-white text-gray-400 transition-all duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              {/* Mobile-only additional contact icons */}
              <a href={`https://wa.me/${settings.phone?.replace(/\D/g, '') || '919667517894'}`} className="md:hidden w-10 h-10 rounded-sm bg-white/5 flex items-center justify-center hover:bg-[#c1272d] hover:text-white text-gray-400 transition-all duration-300">
                <MessageSquare className="w-5 h-5" />
              </a>
              <a href="#contact" className="md:hidden w-10 h-10 rounded-sm bg-white/5 flex items-center justify-center hover:bg-[#c1272d] hover:text-white text-gray-400 transition-all duration-300">
                <MapPin className="w-5 h-5" />
              </a>
              <a href={`mailto:${settings.email}`} className="md:hidden w-10 h-10 rounded-sm bg-white/5 flex items-center justify-center hover:bg-[#c1272d] hover:text-white text-gray-400 transition-all duration-300">
                <Mail className="w-5 h-5" />
              </a>
            </div>

          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-2 lg:grid-cols-2 lg:col-span-2">
            {/* Quick Links */}
            <div>
              <h4 className="text-white text-lg font-serif mb-8 flex items-center gap-2">
                Explore
                <span className="h-px w-8 bg-[#c1272d] hidden md:block"></span>
              </h4>
              <ul className="space-y-4">
                {['Home', 'Services', 'Gallery', 'Packages', 'Testimonials', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()} `} className="text-gray-400 hover:text-[#c1272d] transition-colors uppercase text-sm tracking-wider">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white text-lg font-serif mb-8 flex items-center gap-2">
                Services
                <span className="h-px w-8 bg-[#c1272d] hidden md:block"></span>
              </h4>
              <ul className="space-y-4">
                {['Wedding Photography', 'Cinematic Films', 'Candid Photography', 'Pre-Wedding Shoots', 'Event Coverage', 'Product Shoots'].map((item) => (
                  <li key={item}>
                    <a href="#services" className="text-gray-400 hover:text-[#c1272d] transition-colors text-sm font-light">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="hidden md:block">
            <h4 className="text-white text-lg font-serif mb-8 flex items-center gap-2">
              Contact
              <span className="h-px w-8 bg-[#c1272d]"></span>
            </h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#c1272d] flex-shrink-0 mt-1" />
                <span className="text-gray-400 font-light text-sm">gaya(bihar) Manpur patwatoli</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-[#c1272d] flex-shrink-0" />
                <a href={`tel:${settings.phone}`} className="text-gray-400 hover:text-[#c1272d] transition-colors font-light text-sm">{settings.phone}</a>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-[#c1272d] flex-shrink-0" />
                <a href={`mailto:${settings.email}`} className="text-gray-400 hover:text-[#c1272d] transition-colors font-light text-sm">{settings.email}</a>
              </li>

            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm font-light text-center md:text-left w-full md:w-auto">
            © {currentYear} Asutosh Photography. All rights reserved.
          </p>
          <div className="flex items-center justify-between w-full md:w-auto gap-4 md:gap-6">
            <a href="/admin/login" className="text-gray-500 hover:text-[#c1272d] text-xs transition-colors uppercase tracking-widest whitespace-nowrap">Admin Login</a>
            <p className="text-gray-500 text-xs md:text-sm font-light flex items-center gap-1 whitespace-nowrap">
              Made with <Heart className="w-3 h-3 text-[#c1272d] fill-current" /> in Bihar
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Floating Bottom Navigation - Luxury Minimalist */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-[320px] bg-[#050505]/95 backdrop-blur-2xl border border-white/10 z-50 rounded-full h-[60px] flex justify-around items-center px-6 shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
        <a href="#gallery" className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-all mt-1">
          <Camera className="w-[18px] h-[18px]" />
          <span className="text-[8px] uppercase font-bold tracking-[0.2em]">Gallery</span>
        </a>
        
        {/* Highlighted WhatsApp CTA */}
        <a href={`https://wa.me/${settings.phone?.replace(/\D/g, '') || '919667517894'}`} className="flex flex-col items-center justify-center -mt-6 bg-[#c1272d] text-white w-14 h-14 rounded-full border-[4px] border-[#050505] shadow-[0_0_20px_rgba(193,39,45,0.4)] transition-transform active:scale-95">
          <MessageSquare className="w-5 h-5" />
        </a>

        <a href={`tel:${settings.phone}`} className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-all mt-1">
          <Phone className="w-[18px] h-[18px]" />
          <span className="text-[8px] uppercase font-bold tracking-[0.2em]">Call Us</span>
        </a>
      </div>
    </footer>
  );
}
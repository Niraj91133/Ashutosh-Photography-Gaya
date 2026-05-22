import { Check, Download, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const DEFAULT_PACKAGES = [
  {
    name: 'Traditional Collection',
    price: 'Contact for Quote',
    description: 'Perfect for traditional ceremonies and intimate celebrations',
    features: [
      '2–3 Professional Cameramen',
      'DSLR, LED lights, optional drone',
      '1–3 Days Coverage',
      'High-end Photo Editing',
      'Online Digital Gallery Access'
    ],
    popular: false,
    plan: 'Basic Plan'
  },
  {
    name: 'Cinematic Storytelling',
    price: 'Bespoke Quote',
    description: 'Complete coverage with high-end cinematic storytelling',
    features: [
      'Cinematic Short Film + Full Coverage',
      'Drone + Advanced Gimbal Setup',
      'Candid + Editorial Style Photos',
      'Premium Online Gallery & USB'
    ],
    popular: true,
    plan: 'Premium Plan'
  }
];

export default function Packages() {
  const [packages, setPackages] = useState<any[]>(DEFAULT_PACKAGES);
  const [activeTab, setActiveTab] = useState<'Basic Plan' | 'Premium Plan'>('Basic Plan');

  useEffect(() => {
    const fetchPackages = async () => {
      if (!supabase) return;
      try {
        const { data, error } = await supabase
          .from('site_images')
          .select('*')
          .eq('section', 'packages')
          .order('created_at', { ascending: true });

        if (error) throw error;

        if (data && data.length > 0) {
          const formatted = data.map((item: any) => {
            const [name] = item.title.includes('|')
              ? item.title.split('|').map((s: string) => s.trim())
              : [item.title];

            return {
              name: name,
              price: 'Bespoke Quote', // Enforce no money shown
              plan: item.category,
              description: item.category,
              features: item.description?.split('\n').filter((f: string) => f.trim()) || [],
              popular: item.category.toLowerCase().includes('premium') || item.category.toLowerCase().includes('popular'),
              url: item.url
            };
          });
          setPackages(formatted);
        }

      } catch (err) {
        console.error('Error fetching packages:', err);
      }
    };

    fetchPackages();
  }, []);

  const filteredPackages = packages.filter(pkg =>
    pkg.description === activeTab ||
    pkg.plan === activeTab
  );

  return (
    <section id="packages" className="py-24 md:py-32 bg-[#050505] border-y border-white/5 relative overflow-hidden">
      {/* Abstract Background Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-red-900/5 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[100px]"></div>
      </div>

      <div className="w-full relative px-6 md:px-12 z-10">
        
        {/* Simple Left-Aligned Header */}
        <div className="flex flex-col items-start text-left mb-16 md:mb-20 space-y-8">
          <div className="space-y-4 flex flex-col items-start">
            <span className="text-[#c1272d] font-bold uppercase tracking-[0.3em] text-[10px]">Offerings</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white font-medium leading-tight">
              Our Packages
            </h2>
            <div className="w-12 h-[1px] bg-white/20"></div>
          </div>
          
          {/* Centered Tab Navigation */}
          <div className="flex bg-white/5 p-1 rounded-sm border border-white/10 backdrop-blur-sm">
            {(['Basic Plan', 'Premium Plan'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-2.5 text-xs font-semibold uppercase tracking-widest transition-all rounded-sm ${
                  activeTab === tab
                    ? 'bg-[#c1272d] text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Cards - Narrower Width */}
        <div className="flex flex-wrap justify-start gap-6 md:gap-10">
          {filteredPackages.map((pkg, index) => (
            <div
              key={index}
              className={`relative flex flex-col p-8 md:p-12 w-full max-w-[420px] transition-all duration-500 overflow-hidden rounded-sm group
                ${pkg.popular
                  ? 'bg-[#0a0a0a] border border-[#c1272d]/30 hover:border-[#c1272d]/60 shadow-[0_0_30px_rgba(193,39,45,0.05)]'
                  : 'bg-transparent border border-white/10 hover:border-white/20 hover:bg-white/[0.02]'
                }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute top-0 right-8">
                  <div className="bg-[#c1272d] text-white px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.3em] shadow-lg">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Card Header text-left */}
              <div className="mb-10 relative z-10 text-left flex flex-col items-start">
                <h3 className="text-2xl md:text-3xl font-serif text-white mb-4 leading-snug group-hover:text-gray-100 transition-colors">
                  {pkg.name}
                </h3>
                <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed max-w-[280px] mb-6">
                  {pkg.description}
                </p>
                <div className="inline-block border-b border-gray-600 pb-1">
                  <span className={`text-[11px] uppercase tracking-[0.2em] font-medium ${pkg.popular ? 'text-[#c1272d]' : 'text-gray-300'}`}>
                    Available upon Request
                  </span>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-4 mb-14 flex-grow relative z-10">
                {pkg.features.map((feature: string, featureIndex: number) => (
                  <div key={featureIndex} className="flex items-start group/feature">
                    <Check className={`w-4 h-4 mr-4 mt-0.5 flex-shrink-0 transition-colors ${pkg.popular ? 'text-[#c1272d]' : 'text-gray-500 group-hover/feature:text-white'}`} />
                    <span className="text-gray-300 text-sm font-light leading-relaxed group-hover/feature:text-white transition-colors">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Card Actions - Single Button */}
              <div className="mt-auto relative z-10">
                <a
                  href="#contact"
                  className={`w-full flex items-center justify-center py-4 px-6 rounded-sm font-semibold uppercase tracking-widest text-[10px] transition-all duration-500
                    ${pkg.popular
                      ? 'bg-[#c1272d] text-white hover:bg-red-800 shadow-[0_0_20px_rgba(193,39,45,0.2)] hover:shadow-[0_0_30px_rgba(193,39,45,0.4)]'
                      : 'border border-white/20 text-white hover:bg-white hover:text-black'
                    }`}
                >
                  <Mail className="w-3.5 h-3.5 mr-2" />
                  Inquire Now
                </a>
              </div>

              {/* Faint Background Number/Icon */}
              <div className="absolute -bottom-10 -right-10 text-[200px] font-serif text-white/[0.02] group-hover:text-white/[0.04] transition-colors pointer-events-none select-none">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
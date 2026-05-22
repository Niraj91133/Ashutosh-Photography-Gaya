import { useState } from 'react';
import { Phone, Mail, MapPin, Send, MessageSquareHeart, Star } from 'lucide-react';
import { useSiteSettings } from '../hooks/useSiteSettings';
import { supabase } from '../lib/supabase';

export default function Contact() {
  const settings = useSiteSettings();
  const [activeTab, setActiveTab] = useState<'Inquiry' | 'Review'>('Inquiry');
  
  // Inquiry Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: 'Wedding',
    date: '',
    budget: '',
    message: ''
  });

  // Review Form State
  const [reviewData, setReviewData] = useState({
    name: '',
    event: 'Wedding, City',
    rating: 5,
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInquiryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setReviewData({ ...reviewData, [e.target.name]: e.target.value });
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `New Inquiry from ${formData.name}%0A
Phone: ${formData.phone}%0A
Event: ${formData.eventType}%0A
Date: ${formData.date}%0A
Budget: ${formData.budget}%0A
Message: ${formData.message}`;

    const whatsappPhone = settings.phone?.replace(/\D/g, '') || '919667517894';
    window.open(`https://wa.me/${whatsappPhone}?text=${message}`, '_blank');
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (!supabase) throw new Error('Supabase client not initialized');
      
      const { error } = await supabase.from('site_images').insert([{
        section: 'testimonials',
        title: reviewData.name,
        category: reviewData.event,
        description: reviewData.message,
      }]);

      if (error) throw error;
      
      alert("Thank you! Your love and review have been submitted successfully.");
      setReviewData({ name: '', event: '', rating: 5, message: '' });
      setActiveTab('Inquiry'); // switch back after success
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("There was an error submitting your review. It might require admin approval.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-40 bg-[#050505] relative border-y border-white/5 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#c1272d]/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-start">

          {/* Left Column: Contact Info */}
          <div className="lg:col-span-5 space-y-16">
            <div>
              <span className="text-[#c1272d] font-bold uppercase tracking-[0.3em] text-[10px]">Get in Touch</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-white mt-4 mb-8 font-serif leading-[1.1]">
                Let's Create <br />
                <span className="italic text-gray-500">Magic Together</span>
              </h2>
              <div className="w-12 h-[1px] bg-white/20 mb-8"></div>
              <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed max-w-md">
                Whether you're planning a grand celebration or an intimate gathering, we are here to document your legacy. Reach out to discuss your vision or share your experience with us.
              </p>
            </div>

            <div className="space-y-10">
              <div className="flex items-start group">
                <div className="mt-1 mr-6 text-[#c1272d] opacity-70 group-hover:opacity-100 transition-opacity">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-2">Phone</h4>
                  <a href={`tel:${settings.phone}`} className="text-gray-400 hover:text-white transition-colors font-light">{settings.phone}</a>
                </div>
              </div>

              <div className="flex items-start group">
                <div className="mt-1 mr-6 text-[#c1272d] opacity-70 group-hover:opacity-100 transition-opacity">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-2">Email</h4>
                  <a href={`mailto:${settings.email}`} className="text-gray-400 hover:text-white transition-colors font-light">{settings.email}</a>
                </div>
              </div>

              <div className="flex items-start group">
                <div className="mt-1 mr-6 text-[#c1272d] opacity-70 group-hover:opacity-100 transition-opacity">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-2">Studio</h4>
                  <p className="text-gray-400 font-light leading-relaxed">Manpur Patwatoli<br />Gaya, Bihar</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Forms */}
          <div className="lg:col-span-7">
            <div className="bg-[#0a0a0a] p-8 md:p-12 rounded-sm border border-white/5 shadow-2xl relative overflow-hidden">
              
              {/* Tab Toggles */}
              <div className="flex bg-[#050505] p-1 rounded-sm border border-white/10 mb-10 w-fit">
                <button
                  onClick={() => setActiveTab('Inquiry')}
                  className={`px-8 py-3 text-[10px] font-bold uppercase tracking-widest transition-all rounded-sm flex items-center gap-2 ${
                    activeTab === 'Inquiry' ? 'bg-[#c1272d] text-white' : 'text-gray-500 hover:text-white'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" /> Book Us
                </button>
                <button
                  onClick={() => setActiveTab('Review')}
                  className={`px-8 py-3 text-[10px] font-bold uppercase tracking-widest transition-all rounded-sm flex items-center gap-2 ${
                    activeTab === 'Review' ? 'bg-[#c1272d] text-white' : 'text-gray-500 hover:text-white'
                  }`}
                >
                  <MessageSquareHeart className="w-3.5 h-3.5" /> Leave a Review
                </button>
              </div>

              {/* Form Content Container */}
              <div className="relative min-h-[400px]">
                
                {/* --- INQUIRY FORM --- */}
                {activeTab === 'Inquiry' && (
                  <form onSubmit={handleInquirySubmit} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-500 text-[10px] font-bold mb-2 uppercase tracking-widest">Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInquiryChange}
                          className="w-full bg-[#050505] border border-white/10 rounded-sm px-4 py-3.5 text-white placeholder-gray-700 focus:outline-none focus:border-[#c1272d] transition-colors text-sm font-light"
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-500 text-[10px] font-bold mb-2 uppercase tracking-widest">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInquiryChange}
                          className="w-full bg-[#050505] border border-white/10 rounded-sm px-4 py-3.5 text-white placeholder-gray-700 focus:outline-none focus:border-[#c1272d] transition-colors text-sm font-light"
                          placeholder="Your WhatsApp number"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-500 text-[10px] font-bold mb-2 uppercase tracking-widest">Event Type</label>
                        <select
                          name="eventType"
                          value={formData.eventType}
                          onChange={handleInquiryChange}
                          className="w-full bg-[#050505] border border-white/10 rounded-sm px-4 py-3.5 text-white placeholder-gray-700 focus:outline-none focus:border-[#c1272d] transition-colors text-sm font-light appearance-none"
                        >
                          <option>Wedding</option>
                          <option>Pre-Wedding</option>
                          <option>Engagement</option>
                          <option>Birthday</option>
                          <option>Maternity</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-500 text-[10px] font-bold mb-2 uppercase tracking-widest">Date</label>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInquiryChange}
                          className="w-full bg-[#050505] border border-white/10 rounded-sm px-4 py-3.5 text-white placeholder-gray-700 focus:outline-none focus:border-[#c1272d] transition-colors text-sm font-light [color-scheme:dark]"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-500 text-[10px] font-bold mb-2 uppercase tracking-widest">Message / Details</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInquiryChange}
                        rows={3}
                        className="w-full bg-[#050505] border border-white/10 rounded-sm px-4 py-3.5 text-white placeholder-gray-700 focus:outline-none focus:border-[#c1272d] transition-colors text-sm font-light resize-none"
                        placeholder="Tell us a bit about your event..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#c1272d] text-white font-bold py-4 rounded-sm hover:bg-red-800 transition-all duration-300 uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 group mt-4"
                    >
                      Send Inquiry
                      <Send className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                )}

                {/* --- REVIEW FORM --- */}
                {activeTab === 'Review' && (
                  <form onSubmit={handleReviewSubmit} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-500 text-[10px] font-bold mb-2 uppercase tracking-widest">Your Name</label>
                        <input
                          type="text"
                          name="name"
                          value={reviewData.name}
                          onChange={handleReviewChange}
                          className="w-full bg-[#050505] border border-white/10 rounded-sm px-4 py-3.5 text-white placeholder-gray-700 focus:outline-none focus:border-[#c1272d] transition-colors text-sm font-light"
                          placeholder="E.g. Priya & Rahul"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-500 text-[10px] font-bold mb-2 uppercase tracking-widest">Event & Location</label>
                        <input
                          type="text"
                          name="event"
                          value={reviewData.event}
                          onChange={handleReviewChange}
                          className="w-full bg-[#050505] border border-white/10 rounded-sm px-4 py-3.5 text-white placeholder-gray-700 focus:outline-none focus:border-[#c1272d] transition-colors text-sm font-light"
                          placeholder="E.g. Wedding, Patna"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-500 text-[10px] font-bold mb-3 uppercase tracking-widest">Rating</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReviewData({ ...reviewData, rating: star })}
                            className="focus:outline-none"
                          >
                            <Star 
                              className={`w-8 h-8 transition-colors duration-300 ${
                                star <= reviewData.rating ? 'text-[#c1272d] fill-[#c1272d]' : 'text-gray-700 fill-transparent'
                              }`} 
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-500 text-[10px] font-bold mb-2 uppercase tracking-widest">Your Experience</label>
                      <textarea
                        name="message"
                        value={reviewData.message}
                        onChange={handleReviewChange}
                        rows={4}
                        className="w-full bg-[#050505] border border-white/10 rounded-sm px-4 py-3.5 text-white placeholder-gray-700 focus:outline-none focus:border-[#c1272d] transition-colors text-sm font-light resize-none"
                        placeholder="Share your experience working with us..."
                        required
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full bg-[#c1272d] text-white font-bold py-4 rounded-sm hover:bg-red-800 transition-all duration-300 uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 group mt-4 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Review'}
                      {!isSubmitting && <MessageSquareHeart className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />}
                    </button>
                  </form>
                )}
                
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
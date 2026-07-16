import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Process from './components/Process';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Packages from './components/Packages';
import FAQ from './components/FAQ';
import Blog from './components/Blog';
import CTA from './components/CTA';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import ProtectedRoute from './components/admin/ProtectedRoute';
import ClientPortal from './pages/ClientPortal';
import BlogDetail from './pages/BlogDetail';
import { useSiteSettings } from './hooks/useSiteSettings';
import ScrollReveal from './components/ScrollReveal';

function MainSite() {
  const settings = useSiteSettings();
  const [activeSection, setActiveSection] = useState('hero');
  const [activeGalleryFilter, setActiveGalleryFilter] = useState('All');

  const handleNavClick = (section: string, filter?: string) => {
    if (filter) {
      setActiveGalleryFilter(filter);
    }
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'services', 'gallery', 'testimonials', 'packages', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHidden = (id: string) => settings.disabled_sections?.includes(id);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#c1272d] selection:text-white overflow-x-hidden w-full relative">
      <Header activeSection={activeSection} onNavClick={handleNavClick} />
      <main>
        {!isHidden('hero') && <Hero onNavClick={handleNavClick} />}
        {!isHidden('services') && <Services onCategoryClick={(cat: string) => handleNavClick('gallery', cat)} />}
        <ScrollReveal>
          <Process />
        </ScrollReveal>
        {!isHidden('gallery') && (
          <ScrollReveal>
            <Gallery activeFilter={activeGalleryFilter} setActiveFilter={setActiveGalleryFilter} />
          </ScrollReveal>
        )}
        <ScrollReveal>
          <WhyChooseUs />
        </ScrollReveal>
        {!isHidden('packages') && (
          <ScrollReveal>
            <Packages />
          </ScrollReveal>
        )}
        <ScrollReveal>
          <FAQ />
        </ScrollReveal>
        {!isHidden('about') && <About />}
        {!isHidden('testimonials') && (
          <ScrollReveal>
            <Testimonials />
          </ScrollReveal>
        )}
        {!isHidden('blog') && (
          <ScrollReveal>
            <Blog />
          </ScrollReveal>
        )}
        <ScrollReveal>
          <CTA />
        </ScrollReveal>
        {!isHidden('contact') && (
          <ScrollReveal>
            <Contact />
          </ScrollReveal>
        )}
      </main>
      <Footer />

      {/* Add bottom padding for mobile bottom bar */}
      <div className="h-20 md:hidden block bg-dark-900"></div>
    </div>
  );
}


function App() {
  console.log('App component rendering...');
  return (

    <Routes>
      <Route path="/" element={<MainSite />} />
      <Route path="/clients" element={
        <>
          <Header activeSection="" onNavClick={() => { }} />
          <ClientPortal />
          <Footer />
        </>
      } />
      <Route path="/blog/:id" element={
        <>
          <Header activeSection="" onNavClick={() => { }} />
          <BlogDetail />
          <Footer />
        </>
      } />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;
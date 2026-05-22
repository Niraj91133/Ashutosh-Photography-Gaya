import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface HeaderProps {
  activeSection: string;
  onNavClick: (section: string) => void;
}

export default function Header({ activeSection, onNavClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navItems = [
    { id: 'hero', label: 'Photography', path: '/' },
    { id: 'services', label: 'Cinematography', path: '/#services' },
    { id: 'gallery', label: 'Gallery', path: '/#gallery' },
    { id: 'about', label: 'About', path: '/#about' },
    { id: 'packages', label: 'Services', path: '/#packages' },
    { id: 'contact', label: 'More', path: '/#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-dark-500/80 backdrop-blur-xl border-b border-white/10 py-4'
          : 'bg-gradient-to-b from-black/70 to-transparent py-6'
      }`}
    >
      <nav className="w-full relative px-6 md:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group cursor-pointer">
            <span className="text-xl md:text-2xl font-serif font-bold tracking-tight text-[#ff3333]">
              Asutosh Photography
            </span>
          </Link>

          {/* Desktop Navigation & CTA */}
          <div className="hidden md:flex items-center justify-end flex-1">
            <div className="flex items-center space-x-6 lg:space-x-10 mr-8 lg:mr-12">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={(e) => {
                    if (item.path.startsWith('/#')) {
                      e.preventDefault();
                      if (location.pathname !== '/') {
                        navigate(item.path);
                      } else {
                        onNavClick(item.path.replace('/#', ''));
                      }
                    } else if (item.path === '/') {
                      e.preventDefault();
                      if (location.pathname !== '/') {
                        navigate('/');
                      } else {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }
                  }}
                  className={`text-sm lg:text-[15px] font-medium tracking-wide transition-all duration-300 relative group py-2 ${
                    activeSection === item.id
                      ? 'text-white'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.label}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#ff3333] transform origin-left transition-transform duration-300 ${
                    activeSection === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}></span>
                </Link>
              ))}
            </div>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                onNavClick('contact');
              }}
              className="bg-[#050505] text-white px-8 py-2.5 rounded-sm border border-[#ff3333]/50 hover:border-[#ff3333] hover:bg-[#ff3333] transition-all duration-300 text-sm font-semibold tracking-wide shadow-[0_0_15px_rgba(255,51,51,0.1)] hover:shadow-[0_0_20px_rgba(255,51,51,0.4)]"
            >
              Book Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white hover:text-[#ff3333] transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Overlay */}
        <div className={`md:hidden fixed inset-0 z-[60] bg-[#050505] backdrop-blur-3xl transition-all duration-500 transform ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
          <div className="flex items-center justify-between px-6 pt-8 pb-4 border-b border-white/5">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              <span className="text-2xl font-serif font-bold text-[#ff3333]">
                Asutosh Photography
              </span>
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-white hover:text-[#ff3333] transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
          </div>

          <div className="flex flex-col h-[calc(100vh-100px)] overflow-y-auto">
            <div className="flex flex-col space-y-6 px-8 py-12">
              <p className="text-[#ff3333] text-[10px] font-black uppercase tracking-[0.3em] ml-1">Menu</p>
              {navItems.map((item, index) => (
                <Link
                  key={item.id}
                  to={item.path}
                  style={{ transitionDelay: `${index * 50}ms` }}
                  onClick={(e) => {
                    setIsMenuOpen(false);
                    if (item.path.startsWith('/#')) {
                      e.preventDefault();
                      if (location.pathname !== '/') {
                        navigate(item.path);
                      } else {
                        onNavClick(item.path.replace('/#', ''));
                      }
                    } else if (item.path === '/') {
                      e.preventDefault();
                      if (location.pathname !== '/') {
                        navigate('/');
                      } else {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }
                  }}
                  className={`text-4xl font-serif font-bold text-left transition-all duration-500 ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'} ${
                    activeSection === item.id ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              <Link
                to="/clients"
                onClick={() => setIsMenuOpen(false)}
                className={`text-4xl font-serif font-bold text-left transition-all duration-500 delay-300 ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'} text-gray-400 hover:text-white`}
              >
                Client Drive
              </Link>
            </div>
            
            <div className={`mt-auto p-8 border-t border-white/5 transition-all duration-700 delay-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}>
               <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMenuOpen(false);
                  onNavClick('contact');
                }}
                className="block w-full text-center bg-[#050505] text-white px-8 py-4 rounded-sm border border-[#ff3333] hover:bg-[#ff3333] transition-all duration-300 text-lg font-semibold tracking-wide"
              >
                Book Now
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
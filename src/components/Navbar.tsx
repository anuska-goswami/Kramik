import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', active: true, path: '/' },
    { name: 'Features', active: false, path: '/#features' },
    { name: 'Roadmap', active: false, path: '/#roadmap' },
    { name: 'Mock Tests', active: false, path: '/#mock-tests' },
    { name: 'Pricing', active: false, path: '/#pricing' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          scrolled || mobileMenuOpen
            ? 'bg-bg-primary/80 backdrop-blur-[20px] border-b border-border-custom shadow-[0_4px_30px_var(--shadow-color)] py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          
          {/* Logo */}
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            className="flex items-center group outline-none focus-visible:ring-2 focus-visible:ring-[#B5FF45] rounded-md z-50 relative"
          >
            <span className="text-xl lg:text-2xl font-bold tracking-tight transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(181,255,69,0.4)]">
              <span className="text-[#B5FF45]">K</span>
              <span className="text-text-primary">ramik</span>
            </span>
          </motion.a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className={`relative text-[14px] lg:text-[15px] font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#B5FF45] rounded-sm py-1 group ${
                  link.active ? 'text-[#B5FF45]' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {link.name}
                <span 
                  className={`absolute left-0 -bottom-1 h-[2px] bg-[#B5FF45] transition-all duration-300 ease-out ${
                    link.active ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} 
                />
              </a>
            ))}
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            {isAuthenticated ? (
              <>
                <button 
                  onClick={() => navigate('/profile')}
                  className="w-10 h-10 rounded-full bg-item-hover border border-border-custom flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-[#B5FF45]/50 hover:bg-[#B5FF45]/10 transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#B5FF45]"
                >
                  <User className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="group flex items-center gap-1.5 lg:gap-2 px-4 py-2 lg:px-6 lg:py-2.5 text-sm font-semibold text-[#05080D] bg-[#B5FF45] rounded-xl shadow-[0_0_20px_rgba(181,255,69,0.1)] transition-all duration-300 hover:bg-[#c3ff5c] hover:-translate-y-0.5 hover:shadow-[0_4px_25px_rgba(181,255,69,0.3)] outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05080D] focus-visible:ring-[#B5FF45]"
                >
                  Dashboard
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => navigate('/login')}
                  className="px-4 py-2 lg:px-5 lg:py-2.5 text-sm font-medium text-text-secondary bg-transparent border border-border-custom rounded-xl transition-all duration-300 hover:text-text-primary hover:bg-item-hover hover:border-border-hover hover:-translate-y-[1px] outline-none focus-visible:ring-2 focus-visible:ring-[#B5FF45]"
                >
                  Login
                </button>
                <button 
                  onClick={() => navigate('/signup')}
                  className="group flex items-center gap-1.5 lg:gap-2 px-4 py-2 lg:px-6 lg:py-2.5 text-sm font-semibold text-[#05080D] bg-[#B5FF45] rounded-xl shadow-[0_0_20px_rgba(181,255,69,0.1)] transition-all duration-300 hover:bg-[#c3ff5c] hover:-translate-y-0.5 hover:shadow-[0_4px_25px_rgba(181,255,69,0.3)] outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05080D] focus-visible:ring-[#B5FF45]"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden relative z-50 p-2 -mr-2 text-text-secondary hover:text-text-primary transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#B5FF45] rounded-md"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-bg-primary/95 md:hidden pt-28 px-6 pb-8 flex flex-col overflow-y-auto"
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1, ease: "easeOut" }}
                  onClick={() => {
                    setMobileMenuOpen(false);
                  }}
                  className={`text-2xl font-medium tracking-tight border-b border-border-custom pb-4 ${
                    link.active ? 'text-[#B5FF45]' : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, ease: "easeOut" }}
              className="flex flex-col gap-4 mt-auto pt-10"
            >
              {isAuthenticated ? (
                <>
                  <button 
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate('/profile');
                    }}
                    className="flex items-center justify-center gap-2 w-full py-4 text-base font-medium text-text-primary bg-transparent border border-border-custom rounded-xl transition-all duration-300 hover:bg-item-hover active:scale-[0.98]"
                  >
                    <User className="w-5 h-5" />
                    Profile
                  </button>
                  <button 
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate('/dashboard');
                    }}
                    className="flex items-center justify-center gap-2 w-full py-4 text-base font-semibold text-[#05080D] bg-[#B5FF45] rounded-xl transition-all duration-300 hover:bg-[#c3ff5c] active:scale-[0.98]"
                  >
                    Dashboard
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate('/login');
                    }}
                    className="w-full py-4 text-base font-medium text-text-primary bg-transparent border border-border-custom rounded-xl transition-all duration-300 hover:bg-item-hover active:scale-[0.98]"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate('/signup');
                    }}
                    className="flex items-center justify-center gap-2 w-full py-4 text-base font-semibold text-[#05080D] bg-[#B5FF45] rounded-xl transition-all duration-300 hover:bg-[#c3ff5c] active:scale-[0.98]"
                  >
                    Get Started
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

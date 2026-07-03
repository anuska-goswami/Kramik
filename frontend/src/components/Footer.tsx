import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="border-t border-border-custom bg-[#05080D] pt-16 pb-8 text-white relative z-10">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 lg:col-span-2">
            <a href="/" className="flex items-center mb-6 outline-none rounded-md w-fit">
              <span className="text-2xl font-bold tracking-tight">
                <span className="text-[#B5FF45]">K</span>
                <span className="text-white">RAMIK</span>
              </span>
            </a>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs mb-8">
              Your all-in-one AI-powered placement preparation platform helping you master aptitude, core computer science subjects, and technical interviews.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                referrerPolicy="no-referrer"
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-text-secondary hover:text-[#B5FF45] hover:bg-white/10 hover:border-[#B5FF45]/30 transition-all duration-300"
              >
                <Github className="w-4 h-4" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                referrerPolicy="no-referrer"
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-text-secondary hover:text-[#B5FF45] hover:bg-white/10 hover:border-[#B5FF45]/30 transition-all duration-300"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://x.com" 
                target="_blank" 
                referrerPolicy="no-referrer"
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-text-secondary hover:text-[#B5FF45] hover:bg-white/10 hover:border-[#B5FF45]/30 transition-all duration-300"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider font-heading">Quick Links</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a href="/" className="text-text-secondary hover:text-white text-sm transition-colors">Home</a>
              </li>
              <li>
                <a href="#features" className="text-text-secondary hover:text-white text-sm transition-colors">Features</a>
              </li>
              <li>
                <button onClick={() => navigate('/dashboard')} className="text-text-secondary hover:text-white text-sm transition-colors text-left bg-transparent border-none p-0 cursor-pointer">Dashboard</button>
              </li>
              <li>
                <a href="mailto:support@kramik.com" className="text-text-secondary hover:text-white text-sm transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Resources & Support */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider font-heading">Resources</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a href="#faq" className="text-text-secondary hover:text-white text-sm transition-colors">FAQ</a>
              </li>
              <li>
                <a href="/privacy" className="text-text-secondary hover:text-white text-sm transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="/terms" className="text-text-secondary hover:text-white text-sm transition-colors">Terms of Service</a>
              </li>
              <li className="flex items-center gap-2 text-text-secondary text-sm mt-2">
                <Mail className="w-4 h-4 text-[#B5FF45]" />
                <a href="mailto:support@kramik.com" className="hover:text-white transition-colors">support@kramik.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border-custom flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-secondary/60 text-sm">
            © {new Date().getFullYear()} KRAMIK. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-sm text-text-secondary/60">
              <span className="w-2 h-2 rounded-full bg-[#B5FF45] shadow-[0_0_8px_rgba(181,255,69,0.8)]"></span>
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

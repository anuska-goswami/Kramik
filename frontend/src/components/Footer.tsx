import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border-custom bg-bg-primary pt-16 pb-8">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <a href="#" className="flex items-center mb-6 outline-none rounded-md w-fit">
              <span className="text-2xl font-bold tracking-tight">
                <span className="text-[#B5FF45]">K</span>
                <span className="text-text-primary">ramik</span>
              </span>
            </a>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs mb-8">
              The premium placement preparation platform helping students master aptitude, core subjects, and interviews to land their dream jobs.
            </p>
            <div className="flex items-center gap-4">
              {[Twitter, Github, Linkedin, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-item-hover border border-border-custom flex items-center justify-center text-text-secondary hover:text-[#B5FF45] hover:bg-bg-secondary hover:border-[#B5FF45]/30 transition-all duration-300">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-text-primary font-semibold mb-5">Product</h3>
            <ul className="flex flex-col gap-3">
              {['Features', 'Mock Tests', 'Core Subjects', 'Roadmap', 'Pricing'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-text-secondary hover:text-text-primary text-sm transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-text-primary font-semibold mb-5">Company</h3>
            <ul className="flex flex-col gap-3">
              {['About Us', 'Careers', 'Blog', 'Contact', 'Partners'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-text-secondary hover:text-text-primary text-sm transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-text-primary font-semibold mb-5">Legal</h3>
            <ul className="flex flex-col gap-3">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Security'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-text-secondary hover:text-text-primary text-sm transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border-custom flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-secondary/60 text-sm">
            © {new Date().getFullYear()} Kramik. All rights reserved.
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

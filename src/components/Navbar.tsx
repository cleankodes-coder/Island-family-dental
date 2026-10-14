import React, { useState } from 'react';
import { Menu, X, Shield, Calendar, ArrowRight } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Services', path: '/services' },
    { label: 'Dr. Stan', path: '/dr-stanislav-golyand' },
    { label: 'About', path: '/about' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'New Patients', path: '/new-patients' },
    { label: 'Contact', path: '/contact' }
  ];

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F4]/95 backdrop-blur-md border-b border-slate-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => handleLinkClick('/')}
            className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-[#162C54] flex items-center justify-center p-2 shadow-sm group-hover:bg-[#204270] transition-colors">
              <img
                src="/assets/tooth_icon.svg"
                alt="Island Family Dental Icon"
                className="w-full h-full object-contain filter brightness-0 invert"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-[#162C54] group-hover:text-[#204270] whitespace-nowrap leading-tight">
                Island Family Dental
              </span>
              <span className="text-[11px] font-medium text-slate-500 tracking-wider uppercase">
                Staten Island · Est. 2006
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links (single line, clean typography) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            {navLinks.map((item) => (
              <button
                key={item.path}
                onClick={() => handleLinkClick(item.path)}
                className={`transition-colors whitespace-nowrap cursor-pointer hover:text-[#162C54] py-1 border-b-2 ${
                  currentPath === item.path
                    ? 'border-[#162C54] text-[#162C54] font-semibold'
                    : 'border-transparent text-slate-600'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleLinkClick('/faq')}
              className={`transition-colors whitespace-nowrap cursor-pointer hover:text-[#162C54] py-1 border-b-2 ${
                currentPath === '/faq'
                  ? 'border-[#162C54] text-[#162C54] font-semibold'
                  : 'border-transparent text-slate-600'
              }`}
            >
              FAQ
            </button>
          </nav>

          {/* Zone 3: Primary Action + Staff Portal Quick Link */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleLinkClick('/portal')}
              className="text-xs font-semibold text-slate-600 hover:text-[#162C54] px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Staff & Operations Portal"
            >
              <Shield className="w-3.5 h-3.5 text-slate-500" />
              <span>Operations Portal</span>
            </button>
            <button
              onClick={() => handleLinkClick('/book-demo')}
              className="px-4 py-2.5 text-xs font-semibold text-white bg-[#162C54] hover:bg-[#204270] rounded-xl shadow-sm transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5 text-[#7DAED6]" />
              <span>Try Demo Booking</span>
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => handleLinkClick('/book-demo')}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-[#162C54] rounded-lg"
            >
              Demo Booking
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-[#162C54] rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-slate-200 bg-[#FAF8F4] px-4 pt-2 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((item) => (
              <button
                key={item.path}
                onClick={() => handleLinkClick(item.path)}
                className={`text-left py-2 px-3 rounded-lg text-sm font-medium ${
                  currentPath === item.path
                    ? 'bg-slate-200/70 text-[#162C54] font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleLinkClick('/faq')}
              className="text-left py-2 px-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              FAQ
            </button>
            <button
              onClick={() => handleLinkClick('/insurance-financing')}
              className="text-left py-2 px-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Insurance & Financing
            </button>
            <button
              onClick={() => handleLinkClick('/portal')}
              className="text-left py-2 px-3 rounded-lg text-sm font-semibold text-[#162C54] bg-[#F5F8FC] flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#7DAED6]" />
                Staff Operations Portal (Desktop)
              </span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

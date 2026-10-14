import React from 'react';
import { Phone, MapPin, Clock, ExternalLink, Shield, ArrowUpRight } from 'lucide-react';
import { CLINIC_CONFIG, OFFICIAL_ZOCDOC_URL, OFFICIAL_SITE_URL, GOOGLE_MAPS_DIRECTIONS_URL } from '../data/clinicData';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#162C54] text-slate-300 border-t border-[#204270]">
      {/* Top Footer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Col 1: Clinic Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#204270] flex items-center justify-center p-2 border border-[#7DAED6]/30">
                <img
                  src="/assets/tooth_icon.svg"
                  alt="Tooth Emblem"
                  className="w-full h-full object-contain filter brightness-0 invert"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">Island Family Dental</h3>
                <p className="text-xs text-[#7DAED6]">Dr. Stanislav Golyand, DDS</p>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-slate-300">
              Thoughtful, modern, and compassionate family dentistry serving Staten Island, New York since 2006.
            </p>
            <div className="pt-2">
              <a
                href={OFFICIAL_ZOCDOC_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg bg-[#204270] hover:bg-[#204270]/80 text-[#7DAED6] hover:text-white transition-colors border border-[#7DAED6]/20"
              >
                <span>Book Real Visit on Zocdoc</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Col 2: Richmond Avenue Location & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7DAED6]">Location & Contact</h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#7DAED6] shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">4032 Richmond Avenue</p>
                  <p>Staten Island, NY 10312</p>
                  <a
                    href={GOOGLE_MAPS_DIRECTIONS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#7DAED6] hover:underline inline-flex items-center gap-1 mt-1 font-medium"
                  >
                    <span>Get Directions</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#7DAED6] shrink-0" />
                <div>
                  <span className="text-slate-400">Phone: </span>
                  <a href="tel:+17189486500" className="text-white font-medium hover:text-[#7DAED6]">
                    +1 (718) 948-6500
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-slate-400 ml-6">Fax: +1 (718) 948-0255</span>
              </div>
            </div>
          </div>

          {/* Col 3: Published Operating Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7DAED6]">Published Office Hours</h4>
            <ul className="space-y-1.5 text-xs text-slate-300 tabular-nums">
              <li className="flex justify-between">
                <span>Monday:</span>
                <span className="text-white font-medium">9:00 AM – 5:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Tuesday:</span>
                <span className="text-white font-medium">12:30 PM – 8:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Wednesday:</span>
                <span className="text-white font-medium">9:00 AM – 5:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Thursday:</span>
                <span className="text-white font-medium">12:30 PM – 8:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Friday:</span>
                <span className="text-white font-medium">9:00 AM – 3:00 PM</span>
              </li>
              <li className="flex justify-between text-slate-400">
                <span>Sat & Sun:</span>
                <span>Closed</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Navigation & Portal */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7DAED6]">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('/services')} className="hover:text-white transition-colors cursor-pointer">
                  Treatments & Services
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/dr-stanislav-golyand')} className="hover:text-white transition-colors cursor-pointer">
                  About Dr. Stanislav Golyand, DDS
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/new-patients')} className="hover:text-white transition-colors cursor-pointer">
                  New Patient Experience
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/insurance-financing')} className="hover:text-white transition-colors cursor-pointer">
                  Insurance & Payment Information
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/gallery')} className="hover:text-white transition-colors cursor-pointer">
                  Practice Gallery & Tour
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/faq')} className="hover:text-white transition-colors cursor-pointer">
                  Frequently Asked Questions
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => onNavigate('/portal')}
                  className="flex items-center gap-1.5 text-[#7DAED6] hover:text-white font-medium transition-colors cursor-pointer"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Operations Portal (Desktop Only)</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Disclaimer Callout Box */}
        <div className="mt-12 pt-8 border-t border-[#204270]/80">
          <div className="bg-[#204270]/40 rounded-xl p-4 border border-[#7DAED6]/20 text-xs leading-relaxed text-slate-300">
            <p className="font-semibold text-white mb-1">
              Independent Concept Demo Notice
            </p>
            <p>
              This website is an independent architectural and user experience concept demo created to showcase modern dental web design, synthetic appointment scheduling, and AI-assisted patient services. It is not affiliated with, sponsored by, or operated by Island Family Dental or Dr. Stanislav Golyand, DDS. No real medical records are collected and no actual clinical appointments are scheduled through this platform.
            </p>
          </div>
        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="mt-8 pt-6 border-t border-[#204270]/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 Island Family Dental Concept Demo. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('/privacy')} className="hover:text-white transition-colors">
              Privacy Notice
            </button>
            <button onClick={() => onNavigate('/terms')} className="hover:text-white transition-colors">
              Demo Terms
            </button>
            <a
              href={OFFICIAL_SITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors inline-flex items-center gap-1"
            >
              <span>Practice Official Website</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

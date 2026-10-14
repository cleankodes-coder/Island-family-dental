import React from 'react';
import { ArrowRight, ShieldCheck, Heart, Sparkles, Building, CheckCircle2, MapPin, Camera, ExternalLink, Calendar } from 'lucide-react';
import { CLINIC_TECHNOLOGY, OFFICIAL_ZOCDOC_URL, GOOGLE_MAPS_DIRECTIONS_URL } from '../data/clinicData';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
      
      {/* Title & Introduction */}
      <div className="max-w-3xl space-y-4">
        <div className="text-xs font-semibold text-[#7DAED6] uppercase tracking-wider">
          Practice Heritage · Staten Island, NY
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#162C54] tracking-tight leading-tight">
          Thoughtful, Modern Dentistry for Staten Island Families.
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Since 2006, Island Family Dental has served as a trusted neighborhood dental home for patients of all ages, blending clinical excellence with compassionate, patient-centered care.
        </p>
      </div>

      {/* History & Doctor Feature Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-xs">
        
        {/* Lead Clinician Authentic Portrait */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full max-w-sm aspect-square sm:aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-slate-100 ring-1 ring-slate-200/80 relative group">
            <img
              src="/assets/island-family-dental/doctor/dr-stanislav-golyand.jpg"
              alt="Dr. Stanislav Golyand, DDS — Lead Dentist at Island Family Dental"
              className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-500"
            />
            <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md border border-slate-200/80 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-[#162C54]">Dr. Stanislav Golyand, DDS</div>
                <div className="text-[10px] text-slate-500">Practice Principal Since 2006</div>
              </div>
              <span className="px-2 py-0.5 text-[9px] font-bold uppercase bg-emerald-50 text-emerald-700 rounded border border-emerald-200">
                Verified
              </span>
            </div>
          </div>
        </div>

        {/* History & Mission */}
        <div className="lg:col-span-7 space-y-5">
          <div className="text-xs font-bold text-[#204270] uppercase tracking-wider">Our History</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#162C54]">
            Rooted in Staten Island Since 2006
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            In 2006, Dr. Stanislav Golyand, DDS acquired Island Family Dental at 4032 Richmond Avenue with a clear commitment: to provide local families with high-caliber, honest dental care where patient comfort always comes first.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            Over nearly two decades, the practice has grown through word-of-mouth recommendations from multi-generational Staten Island families who value unhurried consultations, transparent explanations, and gentle hands.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('/dr-stanislav-golyand')}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-[#162C54] hover:bg-[#204270] rounded-xl transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>Meet Dr. Stanislav Golyand, DDS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('/gallery')}
              className="px-4 py-2.5 text-xs font-semibold text-[#162C54] bg-[#F5F8FC] hover:bg-slate-200 rounded-xl transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5 text-[#7DAED6]" />
              <span>Practice Photo Gallery</span>
            </button>
          </div>
        </div>

      </section>

      {/* Facility & Location Photo Section */}
      <section className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-xs space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="text-xs font-bold text-[#204270] uppercase tracking-wider">Our Practice Facility</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#162C54]">
              4032 Richmond Avenue, Staten Island
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Our standalone two-story clinical facility provides a comfortable, quiet environment away from busy retail complexes. Features dedicated on-site parking for patients and easy accessibility.
            </p>
            <div className="space-y-2 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#7DAED6] shrink-0" />
                <span>Dedicated on-site patient parking lot</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#7DAED6] shrink-0" />
                <span>Modern diagnostic suites equipped with digital X-rays and 3D scanners</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#7DAED6] shrink-0" />
                <span>Comfort-focused operatories tailored for anxious patients</span>
              </div>
            </div>
            <div className="pt-2">
              <a
                href={GOOGLE_MAPS_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#204270] hover:underline"
              >
                <span>Get directions on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#7DAED6]" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 relative aspect-[4/3] shadow-xs group">
              <img
                src="/assets/island-family-dental/clinic-exterior/richmond-avenue-exterior.jpg"
                alt="Island Family Dental Building Facade"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-lg text-[10px] font-medium text-slate-700 flex items-center justify-between">
                <span>Exterior Facade</span>
                <span className="text-slate-400">Street View</span>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 relative aspect-[4/3] shadow-xs group">
              <img
                src="/assets/island-family-dental/clinic-exterior/richmond-avenue-map.png"
                alt="4032 Richmond Ave Map"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-lg text-[10px] font-medium text-slate-700 flex items-center justify-between">
                <span>Richmond Ave Pin</span>
                <span className="text-slate-400">Location Map</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Technology Section */}
      <section className="space-y-8">
        <div className="space-y-2">
          <div className="text-xs font-semibold text-[#204270] uppercase tracking-wider">Modern Diagnostics</div>
          <h2 className="text-3xl font-extrabold text-[#162C54]">Published Clinical Technologies</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CLINIC_TECHNOLOGY.map((t, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#F5F8FC] flex items-center justify-center p-2">
                <img
                  src={
                    idx === 0 ? '/assets/tech_xray.svg' :
                    idx === 1 ? '/assets/tech_laser.svg' :
                    idx === 2 ? '/assets/tech_scanner.svg' :
                    '/assets/tech_ct.svg'
                  }
                  alt={t.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-base font-bold text-[#162C54]">{t.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{t.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Box */}
      <div className="bg-[#162C54] text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold">Ready to experience Island Family Dental?</h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Try our interactive synthetic booking demo or schedule a real visit directly.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('/book-demo')}
            className="px-5 py-3 text-xs font-semibold text-[#162C54] bg-white hover:bg-slate-100 rounded-xl transition-all cursor-pointer shadow-sm"
          >
            Try Demo Booking
          </button>
          <button
            onClick={() => onNavigate('/contact')}
            className="px-5 py-3 text-xs font-semibold text-white bg-[#204270] hover:bg-[#204270]/80 rounded-xl transition-all cursor-pointer border border-[#7DAED6]/40"
          >
            Contact Office
          </button>
        </div>
      </div>

    </div>
  );
};

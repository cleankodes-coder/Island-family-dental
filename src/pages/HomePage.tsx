import React, { useState } from 'react';
import { ThreeToothHero } from '../components/ThreeToothHero';
import {
  Calendar,
  ExternalLink,
  ArrowRight,
  Shield,
  Clock,
  MapPin,
  Phone,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  Layers,
  HeartHandshake,
  Camera
} from 'lucide-react';
import {
  CLINIC_CONFIG,
  DR_STANISLAV_GOLYAND,
  CLINIC_SERVICES,
  CLINIC_TECHNOLOGY,
  CLINIC_FAQS,
  OFFICIAL_ZOCDOC_URL,
  GOOGLE_MAPS_DIRECTIONS_URL
} from '../data/clinicData';
import { ServiceCategory } from '../types';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | 'all'>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const filteredServices = activeCategory === 'all'
    ? CLINIC_SERVICES.slice(0, 6)
    : CLINIC_SERVICES.filter(s => s.category === activeCategory).slice(0, 6);

  return (
    <div className="space-y-24 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 border-b border-slate-200/80 bg-gradient-to-b from-[#FAF8F4] via-[#F5F8FC]/60 to-[#FAF8F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Unboxed Metadata Header (Zero-Pill Discipline) */}
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <span>Staten Island, NY</span>
                <span aria-hidden="true">·</span>
                <span>Serving Families Since 2006</span>
                <span aria-hidden="true">·</span>
                <span>4032 Richmond Avenue</span>
              </div>

              {/* Display Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#162C54] tracking-tight leading-[1.08] text-balance">
                Where Staten Island Families Find Their Smile.
              </h1>

              {/* Subtitle */}
              <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl">
                Thoughtful, modern dentistry led by Dr. Stanislav Golyand, DDS. Delivering gentle preventive care, restorative precision, and family comfort for nearly two decades.
              </p>

              {/* Primary Actions Strip */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate('/book-demo')}
                  className="px-6 py-3.5 text-sm font-semibold text-white bg-[#162C54] hover:bg-[#204270] rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95 whitespace-nowrap"
                >
                  <Calendar className="w-4 h-4 text-[#7DAED6]" />
                  <span>Try Demo Booking</span>
                </button>

                <button
                  onClick={() => onNavigate('/services')}
                  className="px-5 py-3.5 text-sm font-semibold text-[#162C54] bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-xs whitespace-nowrap"
                >
                  <span>Explore Our Care</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </button>

                <a
                  href={OFFICIAL_ZOCDOC_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 text-sm font-semibold text-[#204270] hover:text-[#162C54] bg-transparent hover:bg-[#7DAED6]/10 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap"
                >
                  <span>Schedule on Zocdoc</span>
                  <ExternalLink className="w-4 h-4 text-[#7DAED6]" />
                </a>
              </div>

              {/* Verified Trust Strip */}
              <div className="pt-6 border-t border-slate-200/60 grid grid-cols-3 gap-4 text-left">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#162C54] tabular-nums">2006</div>
                  <div className="text-xs text-slate-500 font-medium">Established in SI</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#162C54]">NYU DDS</div>
                  <div className="text-xs text-slate-500 font-medium">Dr. Stan Credential</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#162C54]">13+</div>
                  <div className="text-xs text-slate-500 font-medium">Full Care Treatments</div>
                </div>
              </div>

            </div>

            {/* Right Column: 3D Tooth Sculpture */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="w-full max-w-md lg:max-w-none aspect-square rounded-3xl bg-white/70 p-4 border border-slate-200/80 shadow-lg relative backdrop-blur-xs">
                <ThreeToothHero />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. PRACTICE OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#F5F8FC] flex items-center justify-center text-[#162C54]">
              <HeartHandshake className="w-5 h-5 text-[#204270]" />
            </div>
            <h3 className="text-lg font-bold text-[#162C54]">Family-First Oral Health</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We welcome patients of all generations, from young children receiving their first sealants to seniors needing restorative implant care.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#F5F8FC] flex items-center justify-center text-[#162C54]">
              <Sparkles className="w-5 h-5 text-[#204270]" />
            </div>
            <h3 className="text-lg font-bold text-[#162C54]">Modern Digital Technology</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Low-radiation digital imaging, soft-tissue laser therapy, and 3D digital impressions ensure comfortable, precise diagnostic dentistry.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#F5F8FC] flex items-center justify-center text-[#162C54]">
              <Clock className="w-5 h-5 text-[#204270]" />
            </div>
            <h3 className="text-lg font-bold text-[#162C54]">Flexible Evening Hours</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Convenient Tuesday and Thursday evening hours until 8:00 PM to accommodate busy work schedules and school commitments.
            </p>
          </div>
        </div>
      </section>

      {/* 3. FEATURED SERVICES WITH CATEGORY FILTER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="text-xs font-semibold text-[#7DAED6] uppercase tracking-wider mb-1">Comprehensive Care</div>
            <h2 className="text-3xl font-extrabold text-[#162C54] tracking-tight">Featured Dental Treatments</h2>
          </div>

          {/* Interactive Segmented Control */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
            {(['all', 'preventive', 'restorative', 'cosmetic', 'emergency'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors capitalize cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-white text-[#162C54] shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map(service => (
            <div
              key={service.id}
              onClick={() => onNavigate(`/services/${service.slug}`)}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-[#7DAED6] transition-all hover:shadow-md cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="capitalize font-medium text-[#204270]">{service.category} Care</span>
                  <span className="tabular-nums font-mono">{service.durationMinutes} min</span>
                </div>
                <h3 className="text-lg font-bold text-[#162C54] group-hover:text-[#204270] transition-colors">
                  {service.name}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {service.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#162C54]">
                <span>View Details & Request</span>
                <ArrowRight className="w-4 h-4 text-[#7DAED6] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => onNavigate('/services')}
            className="px-5 py-2.5 text-xs font-semibold text-[#162C54] bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <span>View All 13 Supported Treatments</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 4. DOCTOR SPOTLIGHT: DR. STANISLAV GOLYAND, DDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#162C54] text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-64 sm:w-80 aspect-square sm:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 bg-[#204270] relative group">
                <img
                  src="/assets/island-family-dental/doctor/dr-stanislav-golyand.jpg"
                  alt="Dr. Stanislav Golyand, DDS — Lead Dentist at Island Family Dental"
                  className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-[#162C54]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 flex items-center justify-between text-[11px] text-white">
                  <span className="font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#7DAED6]" />
                    Official Biography Photo
                  </span>
                  <span className="text-[10px] text-slate-300">DDS</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="text-xs font-semibold text-[#7DAED6] uppercase tracking-wider">Lead Dentist & Director</div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Dr. Stanislav Golyand, DDS
                </h2>
                <p className="text-sm font-medium text-slate-300">
                  Known to Staten Island families as &quot;Dr. Stan&quot;
                </p>
              </div>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                Dr. Golyand completed his initial dental training in Moscow and received his Doctor of Dental Surgery degree from the renowned NYU College of Dentistry. Following graduation, he completed an intensive general practice residency at Downstate Medical Center in Brooklyn. In 2006, Dr. Golyand acquired Island Family Dental, building a practice rooted in clinical integrity and thoughtful, patient-focused care.
              </p>

              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#7DAED6] shrink-0" />
                  <span>Doctor of Dental Surgery (DDS) — NYU College of Dentistry</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#7DAED6] shrink-0" />
                  <span>General Practice Residency — Downstate Medical Center (Brooklyn)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#7DAED6] shrink-0" />
                  <span>Staten Island practice owner and clinician since 2006</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate('/dr-stanislav-golyand')}
                  className="px-5 py-3 text-xs font-semibold text-[#162C54] bg-white hover:bg-slate-100 rounded-xl transition-all cursor-pointer shadow-sm"
                >
                  Read Full Doctor Biography
                </button>
                <button
                  onClick={() => onNavigate('/book-demo')}
                  className="px-5 py-3 text-xs font-semibold text-white bg-[#204270] hover:bg-[#204270]/80 border border-[#7DAED6]/40 rounded-xl transition-all cursor-pointer"
                >
                  Try Demo Booking with Dr. Stan
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. TECHNOLOGY & PATIENT CARE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-semibold text-[#204270] uppercase tracking-wider">Clinical Excellence</div>
          <h2 className="text-3xl font-extrabold text-[#162C54] tracking-tight">Modern Dental Technology</h2>
          <p className="text-sm text-slate-600">
            Investing in advanced diagnostic tools to make dental visits faster, gentler, and more predictable.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CLINIC_TECHNOLOGY.map((tech, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-16 h-16 rounded-xl bg-[#F5F8FC] p-2 border border-slate-200/50 flex items-center justify-center">
                  <img
                    src={
                      idx === 0 ? '/assets/tech_xray.svg' :
                      idx === 1 ? '/assets/tech_laser.svg' :
                      idx === 2 ? '/assets/tech_scanner.svg' :
                      '/assets/tech_ct.svg'
                    }
                    alt={tech.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-base font-bold text-[#162C54]">{tech.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{tech.description}</p>
              </div>
              <div className="text-[11px] font-medium text-[#204270] pt-2 border-t border-slate-100">
                {tech.badge}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. TRANSPARENT DEMO BOOKING EXPLANATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF8F4] border border-[#7DAED6]/40 rounded-3xl p-8 sm:p-12 space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-semibold text-[#162C54] uppercase tracking-wider">Concept Demo Engine</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#162C54]">
              How Our Synthetic Booking Engine Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Experience our proposed scheduling architecture firsthand. This simulation tests real-time availability calculations and synchronizes directly with our desktop operations portal.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-5 rounded-xl border border-slate-200/80 space-y-2">
              <div className="text-xs font-bold text-[#204270]">01. Select Treatment</div>
              <p className="text-xs text-slate-600">Choose from 13 verified services with realistic duration calculations.</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200/80 space-y-2">
              <div className="text-xs font-bold text-[#204270]">02. Choose Available Date</div>
              <p className="text-xs text-slate-600">Live query checks Richmond Avenue operating shifts and buffers.</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200/80 space-y-2">
              <div className="text-xs font-bold text-[#204270]">03. Synthetic Request</div>
              <p className="text-xs text-slate-600">Generate unique reference code (e.g. IFD-2026-XXXX) in Pending status.</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200/80 space-y-2">
              <div className="text-xs font-bold text-[#204270]">04. Portal Synchronization</div>
              <p className="text-xs text-slate-600">Request immediately appears on the desktop portal for staff approval.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
            <div className="text-xs text-slate-500">
              * Remember: No actual appointment is sent to Island Family Dental. Fictional test data only.
            </div>
            <button
              onClick={() => onNavigate('/book-demo')}
              className="px-6 py-3 text-xs font-semibold text-white bg-[#162C54] hover:bg-[#204270] rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer shrink-0"
            >
              <span>Launch Demo Booking Flow</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <div className="text-xs font-semibold text-[#204270] uppercase tracking-wider">Clear Answers</div>
          <h2 className="text-3xl font-extrabold text-[#162C54] tracking-tight">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {CLINIC_FAQS.slice(0, 5).map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm text-[#162C54] hover:text-[#204270] cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                    openFaqIndex === index ? 'rotate-180 text-[#162C54]' : ''
                  }`}
                />
              </button>
              {openFaqIndex === index && (
                <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => onNavigate('/faq')}
            className="text-xs font-semibold text-[#162C54] hover:underline"
          >
            Explore all questions & answers →
          </button>
        </div>
      </section>

      {/* 8. AUTHENTIC GALLERY PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF8F4] border border-slate-200/90 rounded-3xl p-8 sm:p-12 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#162C54]/5 text-[#162C54] rounded-full text-xs font-semibold uppercase tracking-wider">
                <Camera className="w-3.5 h-3.5 text-[#7DAED6]" />
                <span>Practice Visual Assets</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#162C54]">
                Authentic Photography & Clinical Tour
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We believe in visual honesty. View authentic photos of lead dentist Dr. Stanislav Golyand, our Richmond Avenue exterior, and our diagnostic technologies.
              </p>
            </div>
            <button
              onClick={() => onNavigate('/gallery')}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-[#162C54] hover:bg-[#204270] rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer shrink-0"
            >
              <span>Explore Full Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div 
              onClick={() => onNavigate('/gallery')}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 p-3 group cursor-pointer hover:shadow-md transition-all"
            >
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 mb-3 relative">
                <img
                  src="/assets/island-family-dental/doctor/dr-stanislav-golyand.jpg"
                  alt="Dr. Stanislav Golyand, DDS"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="font-bold text-xs text-[#162C54]">Dr. Stanislav Golyand, DDS</div>
              <div className="text-[11px] text-slate-500">Official Clinician Portrait</div>
            </div>

            <div 
              onClick={() => onNavigate('/gallery')}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 p-3 group cursor-pointer hover:shadow-md transition-all"
            >
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 mb-3 relative">
                <img
                  src="/assets/island-family-dental/clinic-exterior/richmond-avenue-exterior.jpg"
                  alt="Island Family Dental 4032 Richmond Ave"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="font-bold text-xs text-[#162C54]">4032 Richmond Ave Facility</div>
              <div className="text-[11px] text-slate-500">Staten Island Clinic Exterior</div>
            </div>

            <div 
              onClick={() => onNavigate('/gallery')}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 p-3 group cursor-pointer hover:shadow-md transition-all"
            >
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 mb-3 relative">
                <img
                  src="/assets/island-family-dental/branding/ifd-brand-cover.jpg"
                  alt="Official Island Family Dental Brand Mark"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="font-bold text-xs text-[#162C54]">Official Brand & Monogram</div>
              <div className="text-[11px] text-slate-500">Navy & White IFD Identity</div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. LOCATION & HOURS CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-4 space-y-4">
              <div className="text-xs font-semibold text-[#204270] uppercase tracking-wider">Visit The Practice</div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#162C54]">
                Conveniently Located on Richmond Avenue
              </h2>
              <div className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#7DAED6] shrink-0 mt-0.5" />
                  <span>4032 Richmond Avenue, Staten Island, NY 10312</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#7DAED6] shrink-0" />
                  <span>+1 (718) 948-6500</span>
                </p>
              </div>
              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={GOOGLE_MAPS_DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 text-xs font-semibold text-white bg-[#162C54] hover:bg-[#204270] rounded-xl transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Google Maps Directions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href={OFFICIAL_ZOCDOC_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 text-xs font-semibold text-[#162C54] bg-[#F5F8FC] hover:bg-slate-200 rounded-xl transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Schedule on Zocdoc</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Building Photo & Map Preview */}
            <div className="lg:col-span-4 space-y-3">
              <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 relative aspect-[16/10] shadow-xs">
                <img
                  src="/assets/island-family-dental/clinic-exterior/richmond-avenue-exterior.jpg"
                  alt="Island Family Dental Building at 4032 Richmond Ave"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-lg text-[10px] font-medium text-slate-700 flex items-center justify-between">
                  <span>4032 Richmond Ave Facade</span>
                  <span className="text-slate-400">Exterior Reference</span>
                </div>
              </div>
            </div>

            {/* Schedule Table */}
            <div className="lg:col-span-4 bg-[#FAF8F4] rounded-2xl p-6 border border-slate-200 space-y-3">
              <h3 className="text-sm font-bold text-[#162C54] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#204270]" />
                <span>Operating Hours Schedule</span>
              </h3>
              <div className="space-y-2 text-xs tabular-nums text-slate-700">
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span>Monday</span>
                  <span className="font-semibold text-[#162C54]">9:00 AM – 5:00 PM</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span>Tuesday</span>
                  <span className="font-semibold text-[#162C54]">12:30 PM – 8:00 PM</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span>Wednesday</span>
                  <span className="font-semibold text-[#162C54]">9:00 AM – 5:00 PM</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span>Thursday</span>
                  <span className="font-semibold text-[#162C54]">12:30 PM – 8:00 PM</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span>Friday</span>
                  <span className="font-semibold text-[#162C54]">9:00 AM – 3:00 PM</span>
                </div>
                <div className="flex justify-between py-1 text-slate-400">
                  <span>Saturday & Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

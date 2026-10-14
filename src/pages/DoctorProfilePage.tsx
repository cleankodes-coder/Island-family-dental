import React from 'react';
import { ArrowLeft, CheckCircle2, Award, GraduationCap, Building2, Calendar, ExternalLink } from 'lucide-react';
import { DR_STANISLAV_GOLYAND, OFFICIAL_ZOCDOC_URL, OFFICIAL_SITE_URL } from '../data/clinicData';

interface DoctorProfilePageProps {
  onNavigate: (path: string) => void;
}

export const DoctorProfilePage: React.FC<DoctorProfilePageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      
      {/* Back navigation */}
      <button
        onClick={() => onNavigate('/')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-[#162C54] transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Home</span>
      </button>

      {/* Main Profile Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-xs">
        
        {/* Doctor Authentic Portrait */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full max-w-sm aspect-square sm:aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-slate-100 ring-1 ring-slate-200/80 relative group">
            <img
              src="/assets/island-family-dental/doctor/dr-stanislav-golyand.jpg"
              alt="Dr. Stanislav Golyand, DDS — Lead Dentist at Island Family Dental"
              className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-500"
            />
            <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md border border-slate-200/80 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#162C54]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Authentic Physician Portrait</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">dentalofstatenisland.com</span>
            </div>
          </div>
        </div>

        {/* Doctor Information */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <div className="text-xs font-semibold text-[#7DAED6] uppercase tracking-wider">
              Lead General & Family Dentist
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#162C54] tracking-tight">
              Dr. Stanislav Golyand, DDS
            </h1>
            <p className="text-sm font-medium text-slate-600">
              Affectionately known as &quot;Dr. Stan&quot; by his Staten Island patients
            </p>
          </div>

          <div className="prose text-xs sm:text-sm text-slate-600 space-y-3 leading-relaxed">
            <p>
              Dr. Stanislav Golyand has dedicated his professional career to delivering thoughtful, high-precision oral healthcare tailored to the unique needs of every family member.
            </p>
            <p>
              He completed his initial dental education in Moscow before relocating to New York to obtain his Doctor of Dental Surgery (DDS) degree from the NYU College of Dentistry. Dr. Golyand completed his comprehensive general practice residency at Downstate Medical Center in Brooklyn.
            </p>
            <p>
              In 2006, Dr. Golyand acquired Island Family Dental at 4032 Richmond Avenue. For nearly two decades, he has emphasized conservative, evidence-based dentistry, ensuring patients understand all treatment options without feeling pressured.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('/book-demo')}
              className="px-6 py-3 text-xs font-semibold text-white bg-[#162C54] hover:bg-[#204270] rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#7DAED6]" />
              <span>Simulate Appointment with Dr. Stan</span>
            </button>
            <a
              href={OFFICIAL_ZOCDOC_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 text-xs font-semibold text-[#162C54] bg-[#F5F8FC] hover:bg-slate-200 rounded-xl transition-colors inline-flex items-center gap-1.5"
            >
              <span>Verified Zocdoc Reviews & Booking</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#7DAED6]" />
            </a>
          </div>

        </div>

      </div>

      {/* Verified Education & Clinical Background Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 text-[#162C54] font-bold text-base">
            <GraduationCap className="w-5 h-5 text-[#204270]" />
            <h3>Education & Residency</h3>
          </div>
          <ul className="space-y-3 text-xs text-slate-700">
            {DR_STANISLAV_GOLYAND.education.map((edu, idx) => (
              <li key={idx} className="flex items-start gap-2.5 pb-2.5 border-b border-slate-100 last:border-0 last:pb-0">
                <CheckCircle2 className="w-4 h-4 text-[#7DAED6] shrink-0 mt-0.5" />
                <span>{edu}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 text-[#162C54] font-bold text-base">
            <Award className="w-5 h-5 text-[#204270]" />
            <h3>Clinical Focus & Expertise</h3>
          </div>
          <ul className="space-y-3 text-xs text-slate-700">
            {DR_STANISLAV_GOLYAND.specialties.map((spec, idx) => (
              <li key={idx} className="flex items-start gap-2.5 pb-2.5 border-b border-slate-100 last:border-0 last:pb-0">
                <CheckCircle2 className="w-4 h-4 text-[#7DAED6] shrink-0 mt-0.5" />
                <span>{spec}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

    </div>
  );
};

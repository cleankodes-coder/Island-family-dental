import React from 'react';
import { ArrowLeft, Clock, Calendar, CheckCircle2, Shield, ArrowRight, ExternalLink } from 'lucide-react';
import { CLINIC_SERVICES, OFFICIAL_ZOCDOC_URL, DR_STANISLAV_GOLYAND } from '../data/clinicData';

interface ServiceDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ slug, onNavigate }) => {
  const service = CLINIC_SERVICES.find(s => s.slug === slug) || CLINIC_SERVICES[0];
  const relatedServices = CLINIC_SERVICES.filter(s => s.category === service.category && s.id !== service.id).slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      
      {/* Back button */}
      <button
        onClick={() => onNavigate('/services')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-[#162C54] transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to All Services</span>
      </button>

      {/* Main Treatment Card */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xs space-y-8">
        
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <span className="capitalize font-semibold text-[#204270] tracking-wide">
              {service.category} Dentistry
            </span>
            <span>·</span>
            <span className="flex items-center gap-1 font-mono">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Estimated Duration: ~{service.durationMinutes} Minutes</span>
            </span>
            <span>·</span>
            <span>Lead Dentist: Dr. Stanislav Golyand, DDS</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#162C54] tracking-tight">
            {service.name}
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Treatment Details & What to Expect */}
        <div className="bg-[#FAF8F4] p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-4">
          <h2 className="text-base font-bold text-[#162C54]">
            What to Expect During Care
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
            {service.details.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#7DAED6] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center gap-4">
          <button
            onClick={() => onNavigate(`/book-demo?service=${service.slug}`)}
            className="px-6 py-3.5 text-xs font-semibold text-white bg-[#162C54] hover:bg-[#204270] rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <Calendar className="w-4 h-4 text-[#7DAED6]" />
            <span>Try Demo Booking For This Service</span>
          </button>

          <a
            href={OFFICIAL_ZOCDOC_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3.5 text-xs font-semibold text-[#162C54] bg-[#F5F8FC] hover:bg-slate-200 rounded-xl transition-colors inline-flex items-center gap-1.5"
          >
            <span>Schedule Official Visit on Zocdoc</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#7DAED6]" />
          </a>
        </div>

        {/* Medical disclaimer note */}
        <p className="text-[11px] text-slate-400 italic leading-relaxed pt-4 border-t border-slate-100">
          Disclaimer: Treatment information provided on this concept demo is educational only and does not constitute individual medical advice or a diagnosis. Actual dental treatment plans are formulated by Dr. Stanislav Golyand, DDS following an in-person clinical examination and necessary diagnostic imaging.
        </p>

      </div>

      {/* Related Care */}
      {relatedServices.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-[#162C54]">Related Care</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedServices.map(rel => (
              <div
                key={rel.id}
                onClick={() => onNavigate(`/services/${rel.slug}`)}
                className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-[#7DAED6] transition-all cursor-pointer group"
              >
                <h4 className="text-sm font-bold text-[#162C54] group-hover:text-[#204270]">
                  {rel.name}
                </h4>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {rel.description}
                </p>
                <div className="mt-3 flex items-center justify-between text-xs font-semibold text-[#204270]">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#7DAED6]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

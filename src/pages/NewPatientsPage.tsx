import React from 'react';
import { CheckCircle2, Clock, MapPin, Phone, HelpCircle, FileText, ArrowRight } from 'lucide-react';
import { CLINIC_CONFIG } from '../data/clinicData';

interface NewPatientsPageProps {
  onNavigate: (path: string) => void;
}

export const NewPatientsPage: React.FC<NewPatientsPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="text-xs font-semibold text-[#7DAED6] uppercase tracking-wider">
          Welcoming Staten Island Families
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#162C54] tracking-tight">
          Your First Visit Experience
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          We believe every dental relationship starts with listening. Here is a clear guide to what you can expect during your initial visit with Dr. Stanislav Golyand, DDS.
        </p>
      </div>

      {/* 4 Steps of First Visit */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="w-8 h-8 rounded-lg bg-[#F5F8FC] flex items-center justify-center font-bold text-[#162C54] text-xs">
            01
          </div>
          <h3 className="text-lg font-bold text-[#162C54]">Unhurried Consultation</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Dr. Stan takes time to understand your dental history, any current sensitivities or tooth concerns, and your long-term smile expectations.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="w-8 h-8 rounded-lg bg-[#F5F8FC] flex items-center justify-center font-bold text-[#162C54] text-xs">
            02
          </div>
          <h3 className="text-lg font-bold text-[#162C54]">Low-Dose Digital Imaging</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Targeted digital radiographs and 3D scans are captured only when clinically indicated, reducing radiation exposure while giving high-resolution clarity.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="w-8 h-8 rounded-lg bg-[#F5F8FC] flex items-center justify-center font-bold text-[#162C54] text-xs">
            03
          </div>
          <h3 className="text-lg font-bold text-[#162C54]">Gentle Cleaning & Periodontal Check</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Thorough plaque and tartar scaling, gentle gum pocket measurements, and a delicate polish tailored to your enamel sensitivity.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="w-8 h-8 rounded-lg bg-[#F5F8FC] flex items-center justify-center font-bold text-[#162C54] text-xs">
            04
          </div>
          <h3 className="text-lg font-bold text-[#162C54]">Transparent Care Plan</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            If restorative care is needed, Dr. Stan reviews digital images side-by-side with you, explaining conservative options without pressure.
          </p>
        </div>

      </div>

      {/* Helpful Pre-Visit Checklist */}
      <section className="bg-[#FAF8F4] p-8 sm:p-12 rounded-3xl border border-slate-200 space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-[#162C54]">
          Helpful Information to Prepare Before Your Visit
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#7DAED6] shrink-0 mt-0.5" />
            <span>Valid government-issued photo ID and current dental insurance card (if applicable).</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#7DAED6] shrink-0 mt-0.5" />
            <span>List of current prescription medications, vitamins, and relevant medical conditions.</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#7DAED6] shrink-0 mt-0.5" />
            <span>Previous dental records or X-rays from your prior dentist (our office can assist with record release requests).</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#7DAED6] shrink-0 mt-0.5" />
            <span>Questions or smile goals you would like to discuss directly with Dr. Stan.</span>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-600">
            Have questions prior to scheduling? Call our front desk at <span className="font-semibold text-[#162C54]">+1 (718) 948-6500</span>.
          </div>
          <button
            onClick={() => onNavigate('/book-demo')}
            className="px-6 py-3 text-xs font-semibold text-white bg-[#162C54] hover:bg-[#204270] rounded-xl transition-colors shrink-0"
          >
            Try Simulated Booking
          </button>
        </div>
      </section>

    </div>
  );
};

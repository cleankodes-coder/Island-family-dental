import React, { useState } from 'react';
import { ChevronDown, Search, HelpCircle, ArrowRight } from 'lucide-react';
import { CLINIC_FAQS } from '../data/clinicData';

interface FaqPageProps {
  onNavigate: (path: string) => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onNavigate }) => {
  const [search, setSearch] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = CLINIC_FAQS.filter(f =>
    f.q.toLowerCase().includes(search.toLowerCase()) ||
    f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      
      {/* Header */}
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <div className="text-xs font-semibold text-[#7DAED6] uppercase tracking-wider">
          Patient Knowledge Base
        </div>
        <h1 className="text-4xl font-extrabold text-[#162C54] tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-slate-600">
          Find answers regarding office hours, Dr. Stanislav Golyand, our Richmond Avenue facility, and how our concept demo operates.
        </p>

        {/* Search Input */}
        <div className="relative pt-4 max-w-md mx-auto">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 mt-2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions (e.g. hours, Dr. Stan, demo booking)..."
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#7DAED6] text-slate-800 placeholder:text-slate-400 shadow-xs"
          />
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-xs text-slate-500">
            No matching questions found. Try typing a different keyword or contact our front desk at (718) 948-6500.
          </div>
        ) : (
          filteredFaqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden transition-all shadow-xs"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm text-[#162C54] hover:text-[#204270] cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                    openIndex === idx ? 'rotate-180 text-[#162C54]' : ''
                  }`}
                />
              </button>
              {openIndex === idx && (
                <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                  {faq.a}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* AI Assistant Help Strip */}
      <div className="bg-[#F5F8FC] rounded-2xl p-6 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div>
          <span className="font-bold text-[#162C54]">Still have questions? </span>
          <span className="text-slate-600">Click the floating &quot;Ask Island Family Dental&quot; widget below to converse with our Gemini AI receptionist.</span>
        </div>
        <button
          onClick={() => onNavigate('/contact')}
          className="px-4 py-2 text-xs font-semibold text-[#162C54] bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shrink-0"
        >
          Contact Front Desk
        </button>
      </div>

    </div>
  );
};

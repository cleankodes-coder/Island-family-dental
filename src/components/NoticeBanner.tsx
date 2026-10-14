import React from 'react';
import { ExternalLink, AlertCircle } from 'lucide-react';
import { OFFICIAL_ZOCDOC_URL } from '../data/clinicData';

export const NoticeBanner: React.FC = () => {
  return (
    <div className="bg-[#162C54] text-white border-b border-[#204270]/60 text-xs py-2 px-4 relative z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-3.5 h-3.5 text-[#7DAED6] shrink-0" />
          <span className="font-medium text-slate-200">
            Independent Concept Demo — Not the Official Island Family Dental Website. No Real Appointments Are Created.
          </span>
        </div>
        <div className="flex items-center gap-4 shrink-0 text-slate-300">
          <span>Staten Island, NY</span>
          <span className="hidden sm:inline text-slate-500">·</span>
          <a
            href={OFFICIAL_ZOCDOC_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#7DAED6] hover:text-white inline-flex items-center gap-1 font-semibold transition-colors underline-offset-2 hover:underline"
          >
            <span>Schedule Real Visit on Zocdoc</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};

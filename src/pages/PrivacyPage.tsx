import React from 'react';
import { ArrowLeft, ShieldAlert } from 'lucide-react';

interface LegalPageProps {
  onNavigate: (path: string) => void;
}

export const PrivacyPage: React.FC<LegalPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <button
        onClick={() => onNavigate('/')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-[#162C54] transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Home</span>
      </button>

      <div className="space-y-4">
        <h1 className="text-3xl font-extrabold text-[#162C54]">Demo Privacy Notice</h1>
        <div className="bg-[#FAF8F4] p-4 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>This web application is an independent concept demo. It is not affiliated with Island Family Dental or Dr. Stanislav Golyand, DDS.</span>
        </div>
      </div>

      <div className="prose text-xs text-slate-700 leading-relaxed space-y-4">
        <h2 className="text-base font-bold text-[#162C54]">1. No Collection of Protected Health Information (PHI)</h2>
        <p>
          This website does not solicit, collect, process, or store Protected Health Information (PHI) governed by the Health Insurance Portability and Accountability Act (HIPAA). All appointment bookings, patient names, and inquiry details created on this platform are synthetic demonstration records.
        </p>

        <h2 className="text-base font-bold text-[#162C54]">2. Synthetic Data and Demo Storage</h2>
        <p>
          Demonstration booking requests are stored temporarily in a simulated database to test scheduling workflows, real-time slot conflict resolution, and management portal synchronization. Do not submit real medical records, credit card numbers, or sensitive personal data.
        </p>

        <h2 className="text-base font-bold text-[#162C54]">3. AI Receptionist Processing</h2>
        <p>
          Conversations conducted through the &quot;Ask Island Family Dental&quot; widget are processed via Google Gemini API servers. No personal clinical diagnoses are provided.
        </p>

        <h2 className="text-base font-bold text-[#162C54]">4. Contact for Official Practice Queries</h2>
        <p>
          To contact the real Island Family Dental office for official clinical appointments or patient records, call +1 (718) 948-6500.
        </p>
      </div>
    </div>
  );
};

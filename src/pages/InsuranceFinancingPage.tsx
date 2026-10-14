import React from 'react';
import { Phone, ShieldCheck, CreditCard, HelpCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { CLINIC_CONFIG, OFFICIAL_ZOCDOC_URL } from '../data/clinicData';

interface InsuranceFinancingPageProps {
  onNavigate: (path: string) => void;
}

export const InsuranceFinancingPage: React.FC<InsuranceFinancingPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      
      {/* Page Header */}
      <div className="space-y-4">
        <div className="text-xs font-semibold text-[#7DAED6] uppercase tracking-wider">
          Patient Information & Guidance
        </div>
        <h1 className="text-4xl font-extrabold text-[#162C54] tracking-tight">
          Insurance & Financial Information
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          At Island Family Dental, we are dedicated to helping Staten Island patients maximize their dental health benefits with complete transparency.
        </p>
      </div>

      {/* Primary Verification Callout */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#F5F8FC] flex items-center justify-center text-[#162C54] shrink-0">
            <Phone className="w-6 h-6 text-[#204270]" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-[#162C54]">
              Direct Benefit Verification with Our Front Desk
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Dental insurance coverage, in-network participation, copayments, and annual maximums vary significantly by employer and specific policy plan. Rather than publishing static or outdated insurance lists, we encourage all new and returning patients to contact our Staten Island office directly prior to their appointment.
            </p>
            <div className="pt-2">
              <a
                href="tel:+17189486500"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#162C54] hover:text-[#204270] underline-offset-4 hover:underline"
              >
                <span>Call +1 (718) 948-6500 for Policy Verification</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-600">
          <div>
            <div className="font-bold text-[#162C54] mb-1">Benefit Assistance</div>
            <p>Our experienced staff handles claims submission and pre-treatment estimates on your behalf.</p>
          </div>
          <div>
            <div className="font-bold text-[#162C54] mb-1">Pre-Determination</div>
            <p>For extensive restorative care, we request insurance pre-authorizations to clarify out-of-pocket costs.</p>
          </div>
          <div>
            <div className="font-bold text-[#162C54] mb-1">Self-Pay Transparency</div>
            <p>Clear, itemized fee breakdowns discussed upfront prior to initiating any elective procedure.</p>
          </div>
        </div>
      </div>

      {/* Zocdoc Verified Network Notice */}
      <div className="bg-[#FAF8F4] p-8 rounded-3xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-[#162C54]">Looking for Instant Online Insurance Verification?</h3>
          <p className="text-xs text-slate-600">
            You can also check Dr. Stanislav Golyand&apos;s real-time accepted insurance networks through his verified Zocdoc portal.
          </p>
        </div>
        <a
          href={OFFICIAL_ZOCDOC_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-3 text-xs font-semibold text-white bg-[#162C54] hover:bg-[#204270] rounded-xl transition-colors inline-flex items-center gap-2 shrink-0"
        >
          <span>View on Zocdoc</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#7DAED6]" />
        </a>
      </div>

    </div>
  );
};

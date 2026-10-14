import React, { useState } from 'react';
import { DR_STANISLAV_GOLYAND, CLINIC_CONFIG } from '../../data/clinicData';
import { User, Clock, CheckCircle2, AlertCircle, Calendar } from 'lucide-react';

export const PortalProviders: React.FC = () => {
  const [shifts, setShifts] = useState(CLINIC_CONFIG.operatingHours);
  const [activeTab, setActiveTab] = useState<'profile' | 'shifts' | 'absences'>('profile');

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-base font-bold text-[#162C54]">Provider & Clinical Shifts</h2>
          <p className="text-xs text-slate-500">Verified doctor credentialing and operating roster</p>
        </div>

        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'profile' ? 'bg-white text-[#162C54] shadow-xs' : 'text-slate-600'
            }`}
          >
            Clinician Profile
          </button>
          <button
            onClick={() => setActiveTab('shifts')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'shifts' ? 'bg-white text-[#162C54] shadow-xs' : 'text-slate-600'
            }`}
          >
            Weekly Shifts
          </button>
          <button
            onClick={() => setActiveTab('absences')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'absences' ? 'bg-white text-[#162C54] shadow-xs' : 'text-slate-600'
            }`}
          >
            Time Off & Blocks
          </button>
        </div>
      </div>

      {/* PROFILE VIEW */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-8 space-y-6">
          <div className="flex items-start gap-6">
            <div className="w-24 h-28 rounded-2xl bg-[#162C54] p-1 border border-slate-200 overflow-hidden shrink-0">
              <img
                src="/assets/dr_stan_portrait.svg"
                alt="Dr. Stan"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-[#162C54]">{DR_STANISLAV_GOLYAND.name}</h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Verified Sole Provider
                </span>
              </div>
              <p className="text-xs text-[#204270] font-medium">{DR_STANISLAV_GOLYAND.title} · {DR_STANISLAV_GOLYAND.credentials}</p>
              <p className="text-xs text-slate-600 leading-relaxed max-w-2xl pt-1">
                {DR_STANISLAV_GOLYAND.bio}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100 text-xs">
            <div className="space-y-2">
              <h4 className="font-bold text-[#162C54]">Verified Credentials & Residency</h4>
              <ul className="space-y-1.5 text-slate-600">
                {DR_STANISLAV_GOLYAND.education.map((e, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#7DAED6]" />
                    <span>{e}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-[#162C54]">Clinical Scope</h4>
              <ul className="space-y-1.5 text-slate-600">
                {DR_STANISLAV_GOLYAND.specialties.map((s, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#7DAED6]" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* SHIFTS VIEW */}
      {activeTab === 'shifts' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="text-xs text-slate-500">
            Shifts directly govern the public synthetic slot availability engine. Changes take effect on subsequent searches.
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {shifts.map((sh, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between">
                <span className="font-bold text-[#162C54] w-32">{sh.day}</span>
                <span className="font-mono tabular-nums text-slate-700">{sh.hours}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  sh.isOpen ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-400'
                }`}>
                  {sh.isOpen ? 'Open Shift' : 'Closed'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ABSENCES & BLOCKS */}
      {activeTab === 'absences' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-8 text-center space-y-3">
          <Calendar className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-sm font-bold text-[#162C54]">No Active Clinician Blocks</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Dr. Stanislav Golyand has no upcoming time-off blocks scheduled. Available slots will be generated following regular office hours.
          </p>
        </div>
      )}

    </div>
  );
};

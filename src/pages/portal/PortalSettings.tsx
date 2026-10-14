import React, { useState } from 'react';
import { CLINIC_CONFIG } from '../../data/clinicData';
import { Settings, Save, CheckCircle2, Clock, MapPin, Phone } from 'lucide-react';

export const PortalSettings: React.FC = () => {
  const [config, setConfig] = useState(CLINIC_CONFIG);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-base font-bold text-[#162C54]">Clinic Operational Settings</h2>
          <p className="text-xs text-slate-500">Configure scheduling buffers, lead time, and practice metadata</p>
        </div>
        {saved && (
          <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Settings Saved!</span>
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-8 space-y-6 text-xs">
        
        {/* Practice Identity */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-[#162C54] pb-2 border-b border-slate-100">
            Practice Metadata
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Practice Name</label>
              <input
                type="text"
                value={config.clinicName}
                onChange={e => setConfig({ ...config, clinicName: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Timezone</label>
              <input
                type="text"
                value={config.timezone}
                disabled
                className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Address</label>
              <input
                type="text"
                value={config.address}
                onChange={e => setConfig({ ...config, address: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Main Phone</label>
              <input
                type="text"
                value={config.phone}
                onChange={e => setConfig({ ...config, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Scheduling Logic Parameters */}
        <div className="space-y-4 pt-4">
          <h3 className="text-sm font-bold text-[#162C54] pb-2 border-b border-slate-100">
            Synthetic Booking Engine Parameters
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Minimum Lead Time (Hours)</label>
              <input
                type="number"
                min={1}
                max={48}
                value={config.minLeadHours}
                onChange={e => setConfig({ ...config, minLeadHours: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
              />
              <p className="text-[10px] text-slate-400">Slots sooner than this are hidden.</p>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Turnaround Buffer (Mins)</label>
              <input
                type="number"
                min={0}
                max={30}
                value={config.bufferMinutes}
                onChange={e => setConfig({ ...config, bufferMinutes: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
              />
              <p className="text-[10px] text-slate-400">Sanitization gap between bookings.</p>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Max Future Window (Days)</label>
              <input
                type="number"
                min={7}
                max={180}
                value={config.maxFutureDays}
                onChange={e => setConfig({ ...config, maxFutureDays: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
              />
              <p className="text-[10px] text-slate-400">Maximum advance booking days.</p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 text-xs font-semibold text-white bg-[#162C54] hover:bg-[#204270] rounded-xl transition-colors cursor-pointer flex items-center gap-2 shadow-xs"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Operational Parameters</span>
          </button>
        </div>

      </form>

    </div>
  );
};

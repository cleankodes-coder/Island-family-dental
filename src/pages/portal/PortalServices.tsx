import React, { useState } from 'react';
import { CLINIC_SERVICES } from '../../data/clinicData';
import { DentalService } from '../../types';
import { Clock, CheckCircle2, XCircle, Search, Edit2 } from 'lucide-react';

export const PortalServices: React.FC = () => {
  const [services, setServices] = useState<DentalService[]>(CLINIC_SERVICES);
  const [editingService, setEditingService] = useState<DentalService | null>(null);

  const handleToggleActive = (id: string) => {
    setServices(prev =>
      prev.map(s => s.id === id ? { ...s, active: !s.active } : s)
    );
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    setServices(prev =>
      prev.map(s => s.id === editingService.id ? editingService : s)
    );
    setEditingService(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-base font-bold text-[#162C54]">Treatment Catalog & Durations</h2>
          <p className="text-xs text-slate-500">
            Governs estimated booking time slots and active treatment listings
          </p>
        </div>
        <span className="text-xs font-mono text-slate-400">13 Verified Services</span>
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[10px]">
            <tr>
              <th className="py-3.5 px-4">Treatment Name</th>
              <th className="py-3.5 px-4">Category</th>
              <th className="py-3.5 px-4">Estimated Duration</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {services.map(s => (
              <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="font-bold text-[#162C54]">{s.name}</div>
                  <div className="text-[11px] text-slate-400 line-clamp-1">{s.description}</div>
                </td>
                <td className="py-3.5 px-4 capitalize font-medium text-[#204270]">
                  {s.category}
                </td>
                <td className="py-3.5 px-4 font-mono tabular-nums text-slate-800">
                  {s.durationMinutes} mins
                </td>
                <td className="py-3.5 px-4">
                  <button
                    onClick={() => handleToggleActive(s.id)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                      s.active ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {s.active ? 'Active' : 'Disabled'}
                  </button>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={() => setEditingService(s)}
                    className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Duration Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleSaveEdit} className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-[#162C54]">Edit Treatment Duration</h3>
            
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Service Name</label>
                <input
                  type="text"
                  value={editingService.name}
                  disabled
                  className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Estimated Duration (Minutes)</label>
                <input
                  type="number"
                  min={15}
                  max={120}
                  step={15}
                  value={editingService.durationMinutes}
                  onChange={e => setEditingService({ ...editingService, durationMinutes: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[#162C54]"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingService.description}
                  onChange={e => setEditingService({ ...editingService, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditingService(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-[#162C54] hover:bg-[#204270] rounded-xl cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};

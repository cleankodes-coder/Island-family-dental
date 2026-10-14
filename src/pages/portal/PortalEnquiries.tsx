import React, { useState, useEffect } from 'react';
import { Enquiry, EnquiryStatus } from '../../types';
import { subscribeToEnquiries } from '../../services/dbService';
import { Mail, Clock, CheckCircle2, Search, MessageSquare } from 'lucide-react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';

export const PortalEnquiries: React.FC = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const unsub = subscribeToEnquiries(setEnquiries);
    return () => unsub();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: EnquiryStatus) => {
    try {
      await updateDoc(doc(db, 'enquiries', id), { status: newStatus });
    } catch {}
    setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status: newStatus } : e));
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const filtered = enquiries.filter(e => {
    const matchesFilter = filter === 'all' || e.status === filter;
    const matchesSearch = e.name.toLowerCase().includes(search.toLowerCase()) ||
                          e.subject.toLowerCase().includes(search.toLowerCase()) ||
                          e.message.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search enquiries by patient or message..."
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#7DAED6]"
          />
        </div>

        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
          {(['all', 'new', 'read', 'responded'] as const).map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors capitalize cursor-pointer ${
                filter === s
                  ? 'bg-white text-[#162C54] shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Enquiries List & Detail Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* List (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden">
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-xs text-slate-400">
              No enquiries match the current filter.
            </div>
          ) : (
            filtered.map(enq => (
              <div
                key={enq.id}
                onClick={() => {
                  setSelectedEnquiry(enq);
                  if (enq.status === 'new') handleUpdateStatus(enq.id, 'read');
                }}
                className={`p-4 text-xs cursor-pointer transition-colors hover:bg-slate-50 ${
                  selectedEnquiry?.id === enq.id ? 'bg-[#F5F8FC]' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#162C54]">{enq.name}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                      enq.status === 'new' ? 'bg-amber-100 text-amber-800' :
                      enq.status === 'responded' ? 'bg-emerald-100 text-emerald-800' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {enq.status}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {new Date(enq.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="font-semibold text-slate-800 mb-0.5">{enq.subject}</div>
                <p className="text-slate-500 line-clamp-2">{enq.message}</p>
              </div>
            ))
          )}
        </div>

        {/* Selected Detail Pane (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          {selectedEnquiry ? (
            <div className="space-y-4 text-xs">
              <div className="border-b border-slate-100 pb-3 space-y-1">
                <h3 className="text-base font-bold text-[#162C54]">{selectedEnquiry.subject}</h3>
                <div className="text-slate-500">From: <strong>{selectedEnquiry.name}</strong> ({selectedEnquiry.email})</div>
                {selectedEnquiry.phone && <div className="text-slate-500">Phone: {selectedEnquiry.phone}</div>}
              </div>

              <div>
                <span className="text-slate-400 block mb-1 font-semibold">Message:</span>
                <p className="bg-slate-50 p-4 rounded-xl text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {selectedEnquiry.message}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Update Status:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleUpdateStatus(selectedEnquiry.id, 'responded')}
                    className="px-3 py-1.5 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 cursor-pointer"
                  >
                    Mark Responded
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedEnquiry.id, 'archived')}
                    className="px-3 py-1.5 bg-slate-100 text-slate-600 font-semibold rounded-lg hover:bg-slate-200 cursor-pointer"
                  >
                    Archive
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-20 text-center text-xs text-slate-400 space-y-2">
              <Mail className="w-8 h-8 text-slate-300 mx-auto" />
              <p>Select an enquiry from the list to view its message details.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

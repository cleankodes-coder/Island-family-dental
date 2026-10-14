import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Calendar,
  Clock,
  User,
  MoreVertical,
  Check,
  AlertTriangle,
  FileText,
  RotateCcw,
  UserX
} from 'lucide-react';
import { Booking, BookingStatus } from '../../types';
import { subscribeToBookings, updateBookingStatus, calculateAvailableSlots } from '../../services/dbService';

export const PortalAppointments: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // Modals
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [newDate, setNewDate] = useState('');
  const [newSlots, setNewSlots] = useState<{ time: string; available: boolean }[]>([]);
  const [selectedNewSlot, setSelectedNewSlot] = useState('');
  const [isRescheduling, setIsRescheduling] = useState(false);

  // Staff notes editor
  const [staffNoteInput, setStaffNoteInput] = useState('');

  useEffect(() => {
    const unsub = subscribeToBookings(setBookings);
    return () => unsub();
  }, []);

  const filteredBookings = bookings.filter(b => {
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    const matchesSearch =
      b.patientName.toLowerCase().includes(search.toLowerCase()) ||
      b.bookingReference.toLowerCase().includes(search.toLowerCase()) ||
      b.serviceName.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleOpenReschedule = async (b: Booking) => {
    setSelectedBooking(b);
    setNewDate(b.appointmentDate);
    const slots = await calculateAvailableSlots(b.appointmentDate, b.durationMinutes);
    setNewSlots(slots);
    setShowRescheduleModal(true);
  };

  const handleDateChangeForReschedule = async (d: string) => {
    setNewDate(d);
    if (selectedBooking) {
      const slots = await calculateAvailableSlots(d, selectedBooking.durationMinutes);
      setNewSlots(slots);
      setSelectedNewSlot('');
    }
  };

  const handleConfirmReschedule = async () => {
    if (!selectedBooking || !newDate || !selectedNewSlot) return;
    setIsRescheduling(true);
    try {
      const [sh, sm] = selectedNewSlot.split(':').map(Number);
      const endM = sh * 60 + sm + selectedBooking.durationMinutes;
      const endHour = Math.floor(endM / 60);
      const endMin = endM % 60;
      const endTimeStr = `${String(endHour).padStart(2, '0')}:${String(endMin).padStart(2, '0')}`;

      await updateBookingStatus(selectedBooking.id, 'rescheduled', {
        newDate,
        newStartTime: selectedNewSlot,
        newEndTime: endTimeStr,
        staffNotes: `Rescheduled to ${newDate} at ${selectedNewSlot}`
      });
      setShowRescheduleModal(false);
    } catch (e) {
      console.warn("Reschedule err:", e);
    } finally {
      setIsRescheduling(false);
    }
  };

  const handleSaveStaffNotes = async () => {
    if (!selectedBooking) return;
    await updateBookingStatus(selectedBooking.id, selectedBooking.status, {
      staffNotes: staffNoteInput
    });
    setSelectedBooking(prev => prev ? { ...prev, staffNotes: staffNoteInput } : null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search patient, reference (e.g. IFD-2026-), service..."
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#7DAED6]"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1 overflow-x-auto p-1 bg-slate-100 rounded-xl">
          {(['all', 'pending', 'confirmed', 'rescheduled', 'completed', 'cancelled', 'no-show'] as const).map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors capitalize whitespace-nowrap cursor-pointer ${
                statusFilter === s
                  ? 'bg-white text-[#162C54] shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

      </div>

      {/* Main Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Reference</th>
                <th className="py-3.5 px-4">Patient Name</th>
                <th className="py-3.5 px-4">Service</th>
                <th className="py-3.5 px-4">Date & Slot</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No appointments match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/70 transition-colors">
                    
                    <td className="py-3.5 px-4 font-mono font-bold text-[#162C54]">
                      {b.bookingReference}
                    </td>

                    <td className="py-3.5 px-4 font-medium text-slate-900">
                      <div>{b.patientName}</div>
                      <div className="text-[11px] text-slate-400">{b.patientEmail} · {b.patientPhone}</div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-700">
                      <div>{b.serviceName}</div>
                      <div className="text-[11px] text-slate-400 font-mono">~{b.durationMinutes}m duration</div>
                    </td>

                    <td className="py-3.5 px-4 font-mono tabular-nums text-slate-800">
                      <div>{b.appointmentDate}</div>
                      <div className="text-slate-500 font-semibold">{b.startTime} – {b.endTime}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold capitalize inline-block border ${
                        b.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        b.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        b.status === 'rescheduled' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        b.status === 'completed' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                        b.status === 'no-show' ? 'bg-red-50 text-red-700 border-red-200' :
                        'bg-slate-100 text-slate-600 border-slate-200'
                      }`}>
                        {b.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                      {b.status === 'pending' && (
                        <button
                          onClick={() => updateBookingStatus(b.id, 'confirmed')}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-[11px] transition-colors cursor-pointer"
                        >
                          Confirm
                        </button>
                      )}

                      <button
                        onClick={() => handleOpenReschedule(b)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg text-[11px] transition-colors cursor-pointer"
                      >
                        Reschedule
                      </button>

                      {b.status !== 'completed' && b.status !== 'cancelled' && (
                        <button
                          onClick={() => updateBookingStatus(b.id, 'completed')}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-purple-700 font-medium rounded-lg text-[11px] transition-colors cursor-pointer"
                        >
                          Complete
                        </button>
                      )}

                      {b.status !== 'cancelled' && (
                        <button
                          onClick={() => updateBookingStatus(b.id, 'cancelled', { cancellationReason: 'Cancelled by staff' })}
                          className="px-2 py-1 text-slate-400 hover:text-red-600 text-[11px] transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                      )}
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reschedule Conflict-Validated Modal */}
      {showRescheduleModal && selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-[#162C54]">Reschedule Appointment</h3>
                <p className="text-xs text-slate-500">{selectedBooking.patientName} · {selectedBooking.bookingReference}</p>
              </div>
              <button
                onClick={() => setShowRescheduleModal(false)}
                className="text-slate-400 hover:text-slate-700 text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">New Date</label>
                <input
                  type="date"
                  value={newDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={e => handleDateChangeForReschedule(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Available Validated Slots</label>
                <div className="grid grid-cols-4 gap-2 max-h-[180px] overflow-y-auto p-1">
                  {newSlots.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      disabled={!s.available}
                      onClick={() => setSelectedNewSlot(s.time)}
                      className={`p-2 rounded-lg font-mono text-[11px] border transition-all ${
                        selectedNewSlot === s.time
                          ? 'bg-[#162C54] text-white font-bold'
                          : s.available
                          ? 'bg-slate-50 text-slate-800 hover:bg-slate-100'
                          : 'bg-slate-100 text-slate-300 line-through cursor-not-allowed'
                      }`}
                    >
                      {s.time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setShowRescheduleModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReschedule}
                disabled={!selectedNewSlot || isRescheduling}
                className="px-5 py-2 text-xs font-semibold text-white bg-[#162C54] hover:bg-[#204270] disabled:bg-slate-300 rounded-xl transition-all"
              >
                {isRescheduling ? 'Updating...' : 'Save New Slot'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

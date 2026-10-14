import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  User,
  Plus,
  ShieldAlert,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { Booking } from '../../types';
import { subscribeToBookings, updateBookingStatus } from '../../services/dbService';

export const PortalCalendar: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('week');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    const unsub = subscribeToBookings(setBookings);
    return () => unsub();
  }, []);

  const formatDateYMD = (d: Date) => {
    return d.toISOString().split('T')[0];
  };

  const handlePrev = () => {
    const d = new Date(currentDate);
    if (viewMode === 'day') d.setDate(d.getDate() - 1);
    else if (viewMode === 'week') d.setDate(d.getDate() - 7);
    else d.setMonth(d.getMonth() - 1);
    setCurrentDate(d);
  };

  const handleNext = () => {
    const d = new Date(currentDate);
    if (viewMode === 'day') d.setDate(d.getDate() + 1);
    else if (viewMode === 'week') d.setDate(d.getDate() + 7);
    else d.setMonth(d.getMonth() + 1);
    setCurrentDate(d);
  };

  // Generate 7 days for week view
  const getWeekDays = () => {
    const curr = new Date(currentDate);
    const day = curr.getDay(); // 0 is Sunday
    const startOfWeek = new Date(curr);
    startOfWeek.setDate(curr.getDate() - day + 1); // Monday start

    const days: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const nextDay = new Date(startOfWeek);
      nextDay.setDate(startOfWeek.getDate() + i);
      days.push(nextDay);
    }
    return days;
  };

  const weekDays = getWeekDays();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Calendar Top Control Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        
        {/* Navigation & Current Range */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={handlePrev}
              className="p-1.5 hover:bg-white rounded-lg text-slate-700 transition-colors cursor-pointer"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-3 py-1 text-xs font-semibold text-[#162C54] hover:bg-white rounded-lg transition-colors cursor-pointer"
            >
              Today
            </button>
            <button
              onClick={handleNext}
              className="p-1.5 hover:bg-white rounded-lg text-slate-700 transition-colors cursor-pointer"
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <h2 className="text-base font-bold text-[#162C54]">
            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h2>
        </div>

        {/* View Switcher: Day, Week, Month */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
          {(['day', 'week', 'month'] as const).map(mode => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors cursor-pointer ${
                viewMode === mode
                  ? 'bg-white text-[#162C54] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {mode} view
            </button>
          ))}
        </div>

      </div>

      {/* WEEK VIEW */}
      {viewMode === 'week' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50/80 text-center text-xs">
            {weekDays.map((d, idx) => {
              const isToday = formatDateYMD(d) === formatDateYMD(new Date());
              return (
                <div key={idx} className={`py-3 px-2 border-r border-slate-200 last:border-0 ${isToday ? 'bg-[#7DAED6]/15' : ''}`}>
                  <div className="text-[11px] font-semibold text-slate-500 uppercase">
                    {d.toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                  <div className={`text-sm font-bold mt-0.5 tabular-nums ${isToday ? 'text-[#162C54]' : 'text-slate-700'}`}>
                    {d.getDate()}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 7 Columns Content Grid */}
          <div className="grid grid-cols-7 min-h-[500px] divide-x divide-slate-100">
            {weekDays.map((dayDate, dayIdx) => {
              const dateStr = formatDateYMD(dayDate);
              const dayBookings = bookings.filter(b => b.appointmentDate === dateStr);
              const isWeekend = dayDate.getDay() === 0 || dayDate.getDay() === 6;

              return (
                <div
                  key={dayIdx}
                  className={`p-2 space-y-2 relative ${
                    isWeekend ? 'bg-slate-50/60' : 'bg-white'
                  }`}
                >
                  {isWeekend && (
                    <div className="text-[10px] text-slate-400 text-center pt-8 italic">
                      Office Closed
                    </div>
                  )}

                  {dayBookings.map(b => (
                    <div
                      key={b.id}
                      onClick={() => setSelectedBooking(b)}
                      className={`p-2 rounded-xl border text-xs cursor-pointer transition-all hover:scale-[1.02] shadow-xs ${
                        b.status === 'confirmed' ? 'bg-emerald-50 border-emerald-200 text-emerald-950' :
                        b.status === 'pending' ? 'bg-amber-50 border-amber-200 text-amber-950' :
                        b.status === 'rescheduled' ? 'bg-blue-50 border-blue-200 text-blue-950' :
                        b.status === 'completed' ? 'bg-purple-50 border-purple-200 text-purple-950' :
                        'bg-slate-100 border-slate-200 text-slate-500 line-through'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono tabular-nums mb-1 font-bold">
                        <span>{b.startTime}</span>
                        <span className="capitalize">{b.status}</span>
                      </div>
                      <div className="font-bold truncate">{b.patientName}</div>
                      <div className="text-[10px] truncate text-slate-600">{b.serviceName}</div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* DAY VIEW */}
      {viewMode === 'day' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-sm text-[#162C54]">
              Schedule for {currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </h3>
            <span className="text-xs font-mono text-slate-400">Dr. Stanislav Golyand, DDS</span>
          </div>

          <div className="divide-y divide-slate-100">
            {bookings.filter(b => b.appointmentDate === formatDateYMD(currentDate)).length === 0 ? (
              <p className="py-12 text-center text-xs text-slate-400">No appointments scheduled for this date.</p>
            ) : (
              bookings
                .filter(b => b.appointmentDate === formatDateYMD(currentDate))
                .sort((a, b) => a.startTime.localeCompare(b.startTime))
                .map(b => (
                  <div
                    key={b.id}
                    onClick={() => setSelectedBooking(b)}
                    className="py-3 flex items-center justify-between hover:bg-slate-50 px-3 rounded-xl cursor-pointer text-xs"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono font-bold text-[#162C54] w-24 tabular-nums">
                        {b.startTime} – {b.endTime}
                      </span>
                      <div>
                        <div className="font-bold text-slate-900">{b.patientName}</div>
                        <div className="text-slate-500 text-[11px]">{b.serviceName} · {b.bookingReference}</div>
                      </div>
                    </div>

                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize bg-slate-100">
                      {b.status}
                    </span>
                  </div>
                ))
            )}
          </div>
        </div>
      )}

      {/* MONTH VIEW */}
      {viewMode === 'month' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-500 pb-2 border-b border-slate-100">
            <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 35 }).map((_, idx) => {
              const dayNum = (idx % 31) + 1;
              return (
                <div key={idx} className="min-h-[80px] p-2 bg-slate-50/60 rounded-xl border border-slate-100 text-xs text-slate-600">
                  <div className="font-bold text-slate-400 mb-1">{dayNum}</div>
                  <div className="text-[10px] text-[#204270]">
                    {/* Month sample indicators */}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-[#162C54]">Appointment Details</h3>
                <p className="text-xs text-slate-400 font-mono">{selectedBooking.bookingReference}</p>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer text-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400">Patient:</span>
                <span className="font-bold text-[#162C54]">{selectedBooking.patientName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400">Contact:</span>
                <span>{selectedBooking.patientEmail} · {selectedBooking.patientPhone}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400">Treatment:</span>
                <span className="font-medium text-[#204270]">{selectedBooking.serviceName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400">Date & Slot:</span>
                <span className="font-mono font-bold">{selectedBooking.appointmentDate} · {selectedBooking.startTime} – {selectedBooking.endTime}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400">Status:</span>
                <span className="capitalize font-bold text-slate-800">{selectedBooking.status}</span>
              </div>
              {selectedBooking.notes && (
                <div className="pt-1">
                  <span className="text-slate-400 block mb-0.5">Patient Notes:</span>
                  <p className="bg-slate-50 p-2.5 rounded-lg text-slate-600 italic">{selectedBooking.notes}</p>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              {selectedBooking.status === 'pending' && (
                <button
                  onClick={() => {
                    updateBookingStatus(selectedBooking.id, 'confirmed');
                    setSelectedBooking(null);
                  }}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Confirm Slot
                </button>
              )}
              {selectedBooking.status !== 'completed' && (
                <button
                  onClick={() => {
                    updateBookingStatus(selectedBooking.id, 'completed');
                    setSelectedBooking(null);
                  }}
                  className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Mark Completed
                </button>
              )}
              <button
                onClick={() => setSelectedBooking(null)}
                className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

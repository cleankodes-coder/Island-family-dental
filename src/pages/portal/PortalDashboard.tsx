import React, { useState, useEffect } from 'react';
import {
  CalendarCheck2,
  Clock,
  AlertCircle,
  Users,
  CheckCircle2,
  XCircle,
  TrendingUp,
  ArrowRight,
  ShieldAlert,
  Activity
} from 'lucide-react';
import { Booking, ActivityLog } from '../../types';
import { subscribeToBookings, subscribeToActivityLogs, updateBookingStatus } from '../../services/dbService';

interface PortalDashboardProps {
  onNavigateTab: (tab: string) => void;
}

export const PortalDashboard: React.FC<PortalDashboardProps> = ({ onNavigateTab }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [logs, setLogs] = useState<ActivityLog[]>([]);

  useEffect(() => {
    const unsubB = subscribeToBookings(setBookings);
    const unsubL = subscribeToActivityLogs(setLogs);
    return () => {
      unsubB();
      unsubL();
    };
  }, []);

  const todayStr = new Date().toISOString().split('T')[0];

  // Calculations
  const todayAppointments = bookings.filter(b => b.appointmentDate === todayStr);
  const pendingRequests = bookings.filter(b => b.status === 'pending');
  const confirmedCount = bookings.filter(b => b.status === 'confirmed').length;
  const cancelledCount = bookings.filter(b => b.status === 'cancelled').length;

  // Service distribution
  const serviceCounts: Record<string, number> = {};
  bookings.forEach(b => {
    serviceCounts[b.serviceName] = (serviceCounts[b.serviceName] || 0) + 1;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Notice Ribbon */}
      <div className="bg-[#FAF8F4] p-4 rounded-2xl border border-slate-200/80 flex items-center justify-between text-xs text-slate-700">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Operational calculations derived from real-time persistent Cloud Firestore synthetic demo records.</span>
        </div>
        <span className="font-mono text-slate-400">Database ID: ai-studio-8d5548ae-51ad-490e-be72-2a91e32d9612</span>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Pending Requests</span>
            <AlertCircle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-bold text-[#162C54] tabular-nums">
            {pendingRequests.length}
          </div>
          <div className="text-[11px] text-slate-500">
            Awaiting receptionist review
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Today&apos;s Appointments</span>
            <Clock className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-3xl font-bold text-[#162C54] tabular-nums">
            {todayAppointments.length}
          </div>
          <div className="text-[11px] text-slate-500">
            Scheduled for {todayStr}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Total Confirmed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-3xl font-bold text-[#162C54] tabular-nums">
            {confirmedCount}
          </div>
          <div className="text-[11px] text-slate-500">
            Approved demo visits
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Provider Utilization</span>
            <TrendingUp className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-3xl font-bold text-[#162C54] tabular-nums">
            {bookings.length > 0 ? Math.min(100, Math.round((confirmedCount / Math.max(1, bookings.length)) * 100)) : 0}%
          </div>
          <div className="text-[11px] text-slate-500">
            Dr. Stanislav Golyand, DDS
          </div>
        </div>

      </div>

      {/* Main Grid: Pending Approval Queue & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Pending Requests Review Queue (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-[#162C54]">Pending Booking Requests</h2>
              <p className="text-xs text-slate-500">Needs staff confirmation or rescheduling validation</p>
            </div>
            <button
              onClick={() => onNavigateTab('appointments')}
              className="text-xs font-semibold text-[#204270] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View all ({bookings.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {pendingRequests.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400 space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <p>No pending booking requests! All appointments are processed.</p>
              <button
                onClick={() => onNavigateTab('calendar')}
                className="text-[#162C54] font-semibold hover:underline"
              >
                Inspect Calendar Schedule →
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 space-y-2">
              {pendingRequests.slice(0, 5).map(req => (
                <div key={req.id} className="pt-3 pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#162C54]">{req.patientName}</span>
                      <span className="font-mono text-slate-400">({req.bookingReference})</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                        Pending
                      </span>
                    </div>
                    <div className="text-slate-600">
                      {req.serviceName} · <span className="font-mono">{req.appointmentDate} at {req.startTime}</span>
                    </div>
                    {req.notes && (
                      <p className="text-slate-500 text-[11px] italic">&quot;{req.notes}&quot;</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => updateBookingStatus(req.id, 'confirmed', { staffNotes: 'Approved via Dashboard' })}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors cursor-pointer"
                    >
                      Confirm Slot
                    </button>
                    <button
                      onClick={() => updateBookingStatus(req.id, 'rejected', { rejectionReason: 'Slot conflict on review' })}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Audit Activity & Service Distribution (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Top Requested Services */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <h3 className="text-sm font-bold text-[#162C54]">Top Treatments Requested</h3>
            <div className="space-y-3 text-xs">
              {Object.entries(serviceCounts).slice(0, 5).map(([name, count], idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-slate-600 truncate pr-2">{name}</span>
                  <span className="font-bold text-[#162C54] tabular-nums font-mono">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Real-time Activity Audit Trail */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#162C54]">Recent Activity Log</h3>
              <Activity className="w-4 h-4 text-slate-400" />
            </div>

            <div className="space-y-3 text-xs max-h-[260px] overflow-y-auto pr-1">
              {logs.length === 0 ? (
                <p className="text-slate-400 text-center py-4">No logged activity yet.</p>
              ) : (
                logs.slice(0, 6).map(log => (
                  <div key={log.id} className="pb-2.5 border-b border-slate-100 last:border-0 last:pb-0 space-y-0.5">
                    <div className="font-semibold text-slate-800 text-[11px]">{log.action}</div>
                    <div className="text-[10px] text-slate-400">
                      {log.actorEmail} · {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

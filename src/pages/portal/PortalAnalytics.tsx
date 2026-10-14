import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Booking } from '../../types';
import { subscribeToBookings } from '../../services/dbService';
import { BarChart3, TrendingUp, ShieldAlert, Layers } from 'lucide-react';

export const PortalAnalytics: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const unsub = subscribeToBookings(setBookings);
    return () => unsub();
  }, []);

  // Status breakdown
  const statusCounts: Record<string, number> = {
    pending: 0,
    confirmed: 0,
    rescheduled: 0,
    completed: 0,
    cancelled: 0
  };

  bookings.forEach(b => {
    if (statusCounts[b.status] !== undefined) {
      statusCounts[b.status]++;
    }
  });

  const statusPieData = [
    { name: 'Pending', value: statusCounts.pending, color: '#f59e0b' },
    { name: 'Confirmed', value: statusCounts.confirmed, color: '#10b981' },
    { name: 'Rescheduled', value: statusCounts.rescheduled, color: '#3b82f6' },
    { name: 'Completed', value: statusCounts.completed, color: '#8b5cf6' },
    { name: 'Cancelled', value: statusCounts.cancelled, color: '#ef4444' }
  ].filter(d => d.value > 0);

  // Service distribution
  const serviceMap: Record<string, number> = {};
  bookings.forEach(b => {
    serviceMap[b.serviceName] = (serviceMap[b.serviceName] || 0) + 1;
  });

  const serviceBarData = Object.entries(serviceMap).map(([name, count]) => ({
    name: name.length > 20 ? name.substring(0, 18) + '...' : name,
    requests: count
  }));

  // Hourly distribution
  const hourMap: Record<string, number> = {
    '09:00': 1, '10:00': 2, '11:00': 1, '13:00': 1, '14:00': 3, '15:00': 2, '17:00': 1, '18:00': 2
  };
  bookings.forEach(b => {
    const hr = b.startTime.split(':')[0] + ':00';
    hourMap[hr] = (hourMap[hr] || 0) + 1;
  });

  const hourBarData = Object.entries(hourMap).map(([hour, count]) => ({
    hour,
    bookings: count
  }));

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-base font-bold text-[#162C54]">Practice Performance Analytics</h2>
          <p className="text-xs text-slate-500">Visual operational insights from synthetic booking records</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1 bg-[#F5F8FC] text-[#204270] rounded-lg border border-slate-200">
          <ShieldAlert className="w-3.5 h-3.5 text-[#7DAED6]" />
          <span>Synthetic Demo Data</span>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Service Popularity Bar Chart (8 cols) */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-[#162C54]">Treatments Requested (Synthetic Records)</h3>
            <span className="text-[11px] font-mono text-slate-400">Total: {bookings.length} requests</span>
          </div>

          <div className="h-[280px] w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={serviceBarData.length > 0 ? serviceBarData : [{ name: 'Exams & Cleanings', requests: 4 }, { name: 'Crowns', requests: 2 }, { name: 'Emergency', requests: 1 }]}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} interval={0} angle={-15} textAnchor="end" height={50} />
                <YAxis stroke="#94a3b8" fontSize={11} allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="requests" fill="#162C54" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Distribution Pie Chart (4 cols) */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-[#162C54]">Status Distribution</h3>
            <p className="text-[11px] text-slate-400">Pipeline health across active requests</p>
          </div>

          <div className="h-[200px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusPieData.length > 0 ? statusPieData : [{ name: 'Confirmed', value: 3, color: '#10b981' }, { name: 'Pending', value: 1, color: '#f59e0b' }]}
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {(statusPieData.length > 0 ? statusPieData : [{ color: '#10b981' }, { color: '#f59e0b' }]).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
            {statusPieData.map((s, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                <span className="text-slate-600 truncate">{s.name}:</span>
                <span className="font-bold text-[#162C54] tabular-nums font-mono">{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Peak Scheduling Times (12 cols) */}
        <div className="lg:col-span-12 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-[#162C54]">Time-of-Day Booking Density</h3>
            <p className="text-[11px] text-slate-400">Hourly distribution of reserved appointment slots</p>
          </div>

          <div className="h-[200px] w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourBarData}>
                <XAxis dataKey="hour" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="bookings" fill="#7DAED6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};

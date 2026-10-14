import React, { useState, useEffect } from 'react';
import { NotificationItem } from '../../types';
import { subscribeToNotifications, markNotificationAsRead } from '../../services/dbService';
import { Bell, CheckCircle2, ShieldAlert, AlertCircle, Calendar } from 'lucide-react';

export const PortalNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    const unsub = subscribeToNotifications(setNotifications);
    return () => unsub();
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-base font-bold text-[#162C54]">Simulated Operational Alerts</h2>
          <p className="text-xs text-slate-500">
            Real-time triggers for booking submissions, confirmations, and enquiry alerts
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1 bg-amber-50 text-amber-800 rounded-lg border border-amber-200">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
          <span>SIMULATED — NO REAL MESSAGES SENT</span>
        </div>
      </div>

      {/* Notifications Feed */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden">
        {notifications.length === 0 ? (
          <div className="py-16 text-center text-xs text-slate-400">
            No notifications logged yet.
          </div>
        ) : (
          notifications.map(n => (
            <div
              key={n.id}
              onClick={() => markNotificationAsRead(n.id)}
              className={`p-5 text-xs flex items-start justify-between gap-4 transition-colors cursor-pointer hover:bg-slate-50 ${
                !n.read ? 'bg-[#F5F8FC]' : ''
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#162C54]">{n.title}</span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {!n.read && (
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                  )}
                </div>
                <p className="text-slate-600">{n.message}</p>
                <div className="pt-1 flex items-center gap-3 text-[11px] text-slate-400">
                  <span>Channel: {n.simulatedChannel}</span>
                  <span>·</span>
                  <span className="font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {n.simulatedDelivery}
                  </span>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  markNotificationAsRead(n.id);
                }}
                className="text-[11px] font-semibold text-slate-400 hover:text-[#162C54]"
              >
                {n.read ? 'Read' : 'Mark as read'}
              </button>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

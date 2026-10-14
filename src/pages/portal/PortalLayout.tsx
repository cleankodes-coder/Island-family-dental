import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  CalendarDays,
  CalendarCheck2,
  Users,
  Layers,
  Inbox,
  Bell,
  BarChart3,
  Bot,
  Settings,
  Shield,
  Monitor,
  LogOut,
  ChevronRight,
  Home,
  CheckCircle2,
  UserCheck
} from 'lucide-react';
import { StaffUser, UserRole, Booking, NotificationItem, Enquiry } from '../../types';
import { subscribeToBookings, subscribeToNotifications, subscribeToEnquiries } from '../../services/dbService';
import { auth, signInWithGoogle, signOutUser } from '../../services/firebase';

interface PortalLayoutProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onNavigateHome: () => void;
  children: React.ReactNode;
}

export const PortalLayout: React.FC<PortalLayoutProps> = ({
  currentTab,
  onTabChange,
  onNavigateHome,
  children
}) => {
  // Desktop screen width check (Prompt: "On smaller viewports, display: 'This management portal is optimized for desktop. Please open it on a computer.'")
  const [isDesktop, setIsDesktop] = useState(true);

  // Active user session & demo role
  const [currentUser, setCurrentUser] = useState<StaffUser>({
    uid: 'demo-admin-1',
    email: 'cleankodes@gmail.com',
    displayName: 'Admin User',
    role: 'admin',
    isDemo: true
  });

  // Badge counters
  const [pendingBookingsCount, setPendingBookingsCount] = useState(0);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);
  const [newEnquiriesCount, setNewEnquiriesCount] = useState(0);

  useEffect(() => {
    const checkWidth = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  // Listen to remote changes for live badge updates
  useEffect(() => {
    const unsubBookings = subscribeToBookings((bookings) => {
      const pending = bookings.filter(b => b.status === 'pending').length;
      setPendingBookingsCount(pending);
    });

    const unsubNotifs = subscribeToNotifications((notifs) => {
      const unread = notifs.filter(n => !n.read).length;
      setUnreadNotificationsCount(unread);
    });

    const unsubEnq = subscribeToEnquiries((enqs) => {
      const newItems = enqs.filter(e => e.status === 'new').length;
      setNewEnquiriesCount(newItems);
    });

    return () => {
      unsubBookings();
      unsubNotifs();
      unsubEnq();
    };
  }, []);

  // Sync auth state if user signs in with Google
  useEffect(() => {
    const unsubAuth = auth.onAuthStateChanged(user => {
      if (user) {
        const isAdminEmail = user.email === 'cleankodes@gmail.com';
        setCurrentUser({
          uid: user.uid,
          email: user.email || 'staff@islandfamilydental.local',
          displayName: user.displayName || user.email?.split('@')[0] || 'Staff Member',
          role: isAdminEmail ? 'admin' : 'receptionist',
          isDemo: false
        });
      }
    });
    return () => unsubAuth();
  }, []);

  const handleRoleSwitch = (newRole: UserRole) => {
    setCurrentUser(prev => ({
      ...prev,
      role: newRole,
      displayName: newRole === 'admin' ? 'Demo Admin' : newRole === 'doctor' ? 'Dr. Stan (Provider)' : 'Demo Receptionist'
    }));
  };

  // Nav menu definition
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'appointments', label: 'Appointments', icon: CalendarCheck2, badge: pendingBookingsCount },
    { id: 'calendar', label: 'Calendar Schedule', icon: CalendarDays },
    { id: 'providers', label: 'Dentist & Shifts', icon: Users },
    { id: 'services', label: 'Dental Services', icon: Layers },
    { id: 'enquiries', label: 'Enquiries Inbox', icon: Inbox, badge: newEnquiriesCount },
    { id: 'notifications', label: 'Simulated Alerts', icon: Bell, badge: unreadNotificationsCount },
    { id: 'analytics', label: 'Analytics Reports', icon: BarChart3 },
    { id: 'assistant', label: 'AI Receptionist Logs', icon: Bot },
    { id: 'settings', label: 'Clinic Settings', icon: Settings }
  ];

  // Mobile screen gate
  if (!isDesktop) {
    return (
      <div className="min-h-screen bg-[#162C54] text-white flex flex-col items-center justify-center p-8 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-[#204270] border border-[#7DAED6]/40 flex items-center justify-center text-[#7DAED6]">
          <Monitor className="w-8 h-8" />
        </div>
        <div className="space-y-2 max-w-sm">
          <h2 className="text-xl font-bold">Desktop Optimization Notice</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            This management portal is optimized for desktop. Please open it on a computer (viewport width &ge; 1024px) to view and manage operational records.
          </p>
        </div>
        <button
          onClick={onNavigateHome}
          className="px-5 py-2.5 text-xs font-semibold text-[#162C54] bg-white rounded-xl hover:bg-slate-100 transition-colors flex items-center gap-2 cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>Return to Public Website</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 text-slate-800 overflow-hidden font-sans">
      
      {/* Sidebar (Midnight Navy #162C54) */}
      <aside className="w-64 bg-[#162C54] text-slate-200 flex flex-col border-r border-[#204270] shrink-0">
        
        {/* Brand Lockup */}
        <div className="p-5 border-b border-[#204270] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#204270] flex items-center justify-center p-2 border border-[#7DAED6]/30">
              <img
                src="/assets/tooth_icon.svg"
                alt="Emblem"
                className="w-full h-full object-contain filter brightness-0 invert"
              />
            </div>
            <div>
              <div className="text-sm font-bold text-white tracking-tight leading-none">Operations Portal</div>
              <div className="text-[10px] text-[#7DAED6] mt-0.5">Island Family Dental</div>
            </div>
          </div>
        </div>

        {/* User Session & Role Switcher */}
        <div className="p-4 bg-[#204270]/40 border-b border-[#204270] space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-[#7DAED6] tracking-wider">Active Role</span>
            <span className="text-[10px] text-slate-400 capitalize">{currentUser.role}</span>
          </div>
          <div className="flex items-center gap-1 bg-[#162C54] p-1 rounded-lg border border-[#204270]">
            {(['admin', 'receptionist', 'doctor'] as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => handleRoleSwitch(r)}
                className={`flex-1 py-1 text-[10px] font-semibold rounded capitalize transition-all cursor-pointer ${
                  currentUser.role === r
                    ? 'bg-[#7DAED6] text-[#162C54] shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
                title={`Switch demo role to ${r}`}
              >
                {r === 'receptionist' ? 'Recept' : r}
              </button>
            ))}
          </div>
          <div className="text-[11px] text-slate-300 truncate">
            {currentUser.displayName}
          </div>
        </div>

        {/* Navigation Menu Links */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1 text-xs">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all font-medium cursor-pointer ${
                  isActive
                    ? 'bg-[#204270] text-white font-semibold shadow-xs'
                    : 'text-slate-300 hover:bg-[#204270]/50 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#7DAED6]' : 'text-slate-400'}`} />
                  <span className="whitespace-nowrap">{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold tabular-nums ${
                    isActive ? 'bg-[#7DAED6] text-[#162C54]' : 'bg-[#7DAED6]/20 text-[#7DAED6]'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-3 border-t border-[#204270] space-y-1 text-xs">
          <button
            onClick={onNavigateHome}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-slate-300 hover:text-white hover:bg-[#204270]/40 rounded-xl transition-colors cursor-pointer"
          >
            <Home className="w-4 h-4 text-slate-400" />
            <span>Public Website View</span>
          </button>
          
          <button
            onClick={() => {
              if (currentUser.isDemo) {
                signInWithGoogle().catch(e => console.warn("Google sign-in popup closed or restricted:", e));
              } else {
                signOutUser();
                setCurrentUser({
                  uid: 'demo-admin-1',
                  email: 'cleankodes@gmail.com',
                  displayName: 'Demo Admin',
                  role: 'admin',
                  isDemo: true
                });
              }
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-[#7DAED6] hover:text-white hover:bg-[#204270]/40 rounded-xl transition-colors cursor-pointer"
          >
            <Shield className="w-4 h-4" />
            <span>{currentUser.isDemo ? 'Sign in with Google' : 'Sign Out'}</span>
          </button>
        </div>

      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-50">
        
        {/* Top Header Bar */}
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <h1 className="text-base font-bold text-[#162C54] capitalize">
              {menuItems.find(m => m.id === currentTab)?.label || 'Operations'}
            </h1>
            <span className="text-slate-300">/</span>
            <span className="text-xs text-slate-500">Live Synthetic Synchronization</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2 text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200/80">
              <span className="font-medium">Clinic Timezone:</span>
              <span className="font-mono text-[#162C54] font-semibold">America/New_York (EDT)</span>
            </div>

            <div className="flex items-center gap-2 text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-medium">Firestore Connected</span>
            </div>
          </div>
        </header>

        {/* Scrollable Viewport */}
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>

      </main>

    </div>
  );
};

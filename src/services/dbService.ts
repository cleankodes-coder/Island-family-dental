import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  where,
  limit,
  serverTimestamp
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType, auth } from './firebase';
import {
  Booking,
  BookingStatus,
  DentalService,
  Enquiry,
  NotificationItem,
  TimeSlot,
  ActivityLog,
  WeeklyShift
} from '../types';
import {
  CLINIC_CONFIG,
  CLINIC_SERVICES,
  DR_STANISLAV_GOLYAND
} from '../data/clinicData';

// In-memory fallback cache if offline or demo mode
let localBookings: Booking[] = [];
let localEnquiries: Enquiry[] = [];
let localNotifications: NotificationItem[] = [];
let localLogs: ActivityLog[] = [];

export async function seedInitialDataIfEmpty() {
  try {
    // 1. Seed Clinic Config
    const configRef = doc(db, 'clinicConfig', 'main');
    const configSnap = await getDoc(configRef).catch(e => {
      console.warn("Could not fetch remote config, using local defaults:", e);
      return null;
    });

    if (!configSnap || !configSnap.exists()) {
      await setDoc(configRef, {
        clinicName: CLINIC_CONFIG.clinicName,
        address: CLINIC_CONFIG.address,
        phone: CLINIC_CONFIG.phone,
        fax: CLINIC_CONFIG.fax,
        timezone: CLINIC_CONFIG.timezone,
        minLeadHours: CLINIC_CONFIG.minLeadHours,
        maxFutureDays: CLINIC_CONFIG.maxFutureDays,
        bufferMinutes: CLINIC_CONFIG.bufferMinutes,
        slotIntervalMinutes: CLINIC_CONFIG.slotIntervalMinutes,
        updatedAt: new Date().toISOString()
      }).catch(err => console.warn("Config seeding notice:", err));
    }

    // 2. Seed Lead Provider (Dr. Stan)
    const providerRef = doc(db, 'providers', DR_STANISLAV_GOLYAND.id);
    const providerSnap = await getDoc(providerRef).catch(() => null);
    if (!providerSnap || !providerSnap.exists()) {
      await setDoc(providerRef, DR_STANISLAV_GOLYAND).catch(err => console.warn("Provider seed:", err));
    }

    // 3. Seed Services
    for (const s of CLINIC_SERVICES) {
      const sRef = doc(db, 'services', s.id);
      const sSnap = await getDoc(sRef).catch(() => null);
      if (!sSnap || !sSnap.exists()) {
        await setDoc(sRef, s).catch(() => null);
      }
    }

    // 4. Seed Standard Weekly Shifts
    const shifts = [
      { id: 'shift-1', providerId: DR_STANISLAV_GOLYAND.id, dayOfWeek: 1, dayName: 'Monday', startTime: '09:00', endTime: '17:00', isOpen: true },
      { id: 'shift-2', providerId: DR_STANISLAV_GOLYAND.id, dayOfWeek: 2, dayName: 'Tuesday', startTime: '12:30', endTime: '20:00', isOpen: true },
      { id: 'shift-3', providerId: DR_STANISLAV_GOLYAND.id, dayOfWeek: 3, dayName: 'Wednesday', startTime: '09:00', endTime: '17:00', isOpen: true },
      { id: 'shift-4', providerId: DR_STANISLAV_GOLYAND.id, dayOfWeek: 4, dayName: 'Thursday', startTime: '12:30', endTime: '20:00', isOpen: true },
      { id: 'shift-5', providerId: DR_STANISLAV_GOLYAND.id, dayOfWeek: 5, dayName: 'Friday', startTime: '09:00', endTime: '15:00', isOpen: true },
      { id: 'shift-6', providerId: DR_STANISLAV_GOLYAND.id, dayOfWeek: 6, dayName: 'Saturday', startTime: '00:00', endTime: '00:00', isOpen: false },
      { id: 'shift-0', providerId: DR_STANISLAV_GOLYAND.id, dayOfWeek: 0, dayName: 'Sunday', startTime: '00:00', endTime: '00:00', isOpen: false }
    ];

    for (const sh of shifts) {
      const shRef = doc(db, 'weeklyShifts', sh.id);
      const shSnap = await getDoc(shRef).catch(() => null);
      if (!shSnap || !shSnap.exists()) {
        await setDoc(shRef, sh).catch(() => null);
      }
    }

    // 5. Seed Initial Synthetic Bookings if collection is empty
    const bookingsSnap = await getDocs(collection(db, 'bookings')).catch(() => null);
    if (!bookingsSnap || bookingsSnap.empty) {
      const today = new Date();
      const getFormattedDate = (offsetDays: number) => {
        const d = new Date(today);
        d.setDate(d.getDate() + offsetDays);
        return d.toISOString().split('T')[0];
      };

      const seedBookings: Booking[] = [
        {
          id: 'booking-seed-1',
          bookingReference: 'IFD-2026-7841',
          providerId: DR_STANISLAV_GOLYAND.id,
          providerName: DR_STANISLAV_GOLYAND.name,
          serviceId: 'dental-exams-cleanings',
          serviceName: 'Dental Exams & Professional Cleanings',
          appointmentDate: getFormattedDate(1),
          startTime: '10:00',
          endTime: '10:45',
          durationMinutes: 45,
          patientName: 'Elena Rostova (Synthetic)',
          patientEmail: 'elena.rostova@example.com',
          patientPhone: '(718) 555-0192',
          isNewPatient: true,
          notes: 'Routine 6-month checkup. Interested in Invisalign consultation.',
          status: 'pending',
          createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
          updatedAt: new Date(Date.now() - 3600000 * 4).toISOString()
        },
        {
          id: 'booking-seed-2',
          bookingReference: 'IFD-2026-9214',
          providerId: DR_STANISLAV_GOLYAND.id,
          providerName: DR_STANISLAV_GOLYAND.name,
          serviceId: 'crowns-bridges',
          serviceName: 'Crowns & Dental Bridges',
          appointmentDate: getFormattedDate(2),
          startTime: '14:00',
          endTime: '15:00',
          durationMinutes: 60,
          patientName: 'Michael Torres (Synthetic)',
          patientEmail: 'michael.torres@example.com',
          patientPhone: '(718) 555-0143',
          isNewPatient: false,
          notes: 'Crown delivery on lower right molar #30.',
          status: 'confirmed',
          staffNotes: 'Confirmed by reception. Lab case received and verified.',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          updatedAt: new Date(Date.now() - 43200000).toISOString()
        },
        {
          id: 'booking-seed-3',
          bookingReference: 'IFD-2026-4402',
          providerId: DR_STANISLAV_GOLYAND.id,
          providerName: DR_STANISLAV_GOLYAND.name,
          serviceId: 'emergency-dental-care',
          serviceName: 'Emergency Dental Care',
          appointmentDate: getFormattedDate(0),
          startTime: '11:30',
          endTime: '12:15',
          durationMinutes: 45,
          patientName: 'Anthony V. (Synthetic)',
          patientEmail: 'anthony.v@example.com',
          patientPhone: '(718) 555-0188',
          isNewPatient: true,
          notes: 'Chipped front tooth while playing basketball.',
          status: 'confirmed',
          staffNotes: 'Urgent slot prioritized by Dr. Stan.',
          createdAt: new Date(Date.now() - 7200000).toISOString(),
          updatedAt: new Date(Date.now() - 3600000).toISOString()
        }
      ];

      for (const b of seedBookings) {
        await setDoc(doc(db, 'bookings', b.id), b).catch(() => null);
      }

      // Seed sample notifications
      const seedNotifications: NotificationItem[] = [
        {
          id: 'notif-1',
          title: 'New Demo Request',
          message: 'Elena Rostova requested Dental Exam for tomorrow at 10:00 AM.',
          type: 'booking_request',
          relatedId: 'booking-seed-1',
          read: false,
          simulatedChannel: 'Internal',
          simulatedDelivery: 'SIMULATED — NOT SENT',
          createdAt: new Date().toISOString()
        },
        {
          id: 'notif-2',
          title: 'Booking Confirmed',
          message: 'Michael Torres crown appointment confirmed for 2:00 PM.',
          type: 'booking_confirmed',
          relatedId: 'booking-seed-2',
          read: true,
          simulatedChannel: 'SMS',
          simulatedDelivery: 'SIMULATED — NOT SENT',
          createdAt: new Date(Date.now() - 43200000).toISOString()
        }
      ];

      for (const n of seedNotifications) {
        await setDoc(doc(db, 'notifications', n.id), n).catch(() => null);
      }
    }
  } catch (err) {
    console.warn("Seeding completed with notes:", err);
  }
}

/**
 * Real-time listener for bookings collection
 */
export function subscribeToBookings(onUpdate: (bookings: Booking[]) => void) {
  try {
    const q = query(collection(db, 'bookings'), orderBy('appointmentDate', 'asc'));
    return onSnapshot(q, (snapshot) => {
      const items: Booking[] = [];
      snapshot.forEach(docSnap => {
        items.push(docSnap.data() as Booking);
      });
      localBookings = items;
      onUpdate(items);
    }, (error) => {
      console.warn("Snapshot error, falling back to local store:", error);
      onUpdate(localBookings);
    });
  } catch (error) {
    console.warn("Could not bind remote listener:", error);
    onUpdate(localBookings);
    return () => {};
  }
}

/**
 * Fetch a single booking by reference or ID
 */
export async function getBookingById(bookingId: string): Promise<Booking | null> {
  try {
    const snap = await getDoc(doc(db, 'bookings', bookingId));
    if (snap.exists()) {
      return snap.data() as Booking;
    }
  } catch (e) {
    console.warn("Fetch booking err:", e);
  }
  return localBookings.find(b => b.id === bookingId || b.bookingReference === bookingId) || null;
}

/**
 * Compute slot availability for a specific date and duration
 */
export async function calculateAvailableSlots(dateStr: string, durationMinutes: number): Promise<TimeSlot[]> {
  const [year, month, day] = dateStr.split('-').map(Number);
  const targetDate = new Date(year, month - 1, day);
  const dayOfWeek = targetDate.getDay();

  // Find office hours for this weekday
  const hoursConfig = CLINIC_CONFIG.operatingHours.find(h => h.dayOfWeek === dayOfWeek);
  if (!hoursConfig || !hoursConfig.isOpen) {
    return [];
  }

  // Parse start and end time (Mon/Wed/Fri 09:00, Tue/Thu 12:30)
  let openHour = 9;
  let openMinute = 0;
  let closeHour = 17;
  let closeMinute = 0;

  if (dayOfWeek === 2 || dayOfWeek === 4) { // Tue/Thu
    openHour = 12;
    openMinute = 30;
    closeHour = 20;
    closeMinute = 0;
  } else if (dayOfWeek === 5) { // Friday
    openHour = 9;
    openMinute = 0;
    closeHour = 15;
    closeMinute = 0;
  }

  // Fetch existing bookings for this date
  let existingBookings: Booking[] = [];
  try {
    const q = query(
      collection(db, 'bookings'),
      where('appointmentDate', '==', dateStr),
      where('status', 'in', ['pending', 'confirmed'])
    );
    const snap = await getDocs(q);
    snap.forEach(d => existingBookings.push(d.data() as Booking));
  } catch {
    existingBookings = localBookings.filter(b =>
      b.appointmentDate === dateStr && ['pending', 'confirmed'].includes(b.status)
    );
  }

  // Generate slots in 15-minute increments
  const slots: TimeSlot[] = [];
  const startMinutes = openHour * 60 + openMinute;
  const endMinutes = closeHour * 60 + closeMinute;

  // Lead time constraint (minimum 2 hours ahead if today)
  const now = new Date();
  const isToday = now.toISOString().split('T')[0] === dateStr;
  const currentMinutesFromMidnight = now.getHours() * 60 + now.getMinutes() + (CLINIC_CONFIG.minLeadHours * 60);

  for (let m = startMinutes; m + durationMinutes <= endMinutes; m += CLINIC_CONFIG.slotIntervalMinutes) {
    const slotHour = Math.floor(m / 60);
    const slotMin = m % 60;
    const timeStr = `${String(slotHour).padStart(2, '0')}:${String(slotMin).padStart(2, '0')}`;

    const endM = m + durationMinutes;
    const endHour = Math.floor(endM / 60);
    const endMin = endM % 60;
    const endTimeStr = `${String(endHour).padStart(2, '0')}:${String(endMin).padStart(2, '0')}`;

    // Check if slot starts in the past
    if (isToday && m < currentMinutesFromMidnight) {
      continue;
    }

    // Check collision with existing bookings
    const isConflict = existingBookings.some(b => {
      const [bStartH, bStartM] = b.startTime.split(':').map(Number);
      const [bEndH, bEndM] = b.endTime.split(':').map(Number);
      const bStartMinutes = bStartH * 60 + bStartM;
      const bEndMinutes = bEndH * 60 + bEndM;

      // Overlap condition: start < bEnd && end > bStart
      return m < bEndMinutes && endM > bStartMinutes;
    });

    slots.push({
      time: timeStr,
      endTime: endTimeStr,
      available: !isConflict,
      reason: isConflict ? "Slot already reserved" : undefined
    });
  }

  return slots;
}

/**
 * Submit a new synthetic booking request
 */
export async function createBookingRequest(params: {
  serviceId: string;
  serviceName: string;
  durationMinutes: number;
  appointmentDate: string;
  startTime: string;
  endTime: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  isNewPatient: boolean;
  notes?: string;
}): Promise<Booking> {
  // Re-verify availability
  const slots = await calculateAvailableSlots(params.appointmentDate, params.durationMinutes);
  const targetSlot = slots.find(s => s.time === params.startTime);
  if (targetSlot && !targetSlot.available) {
    throw new Error("This demo time slot was just claimed. Please choose another available time.");
  }

  const id = `booking-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const randNum = Math.floor(1000 + Math.random() * 9000);
  const bookingReference = `IFD-2026-${randNum}`;

  const newBooking: Booking = {
    id,
    bookingReference,
    providerId: DR_STANISLAV_GOLYAND.id,
    providerName: DR_STANISLAV_GOLYAND.name,
    serviceId: params.serviceId,
    serviceName: params.serviceName,
    appointmentDate: params.appointmentDate,
    startTime: params.startTime,
    endTime: params.endTime,
    durationMinutes: params.durationMinutes,
    patientName: params.patientName,
    patientEmail: params.patientEmail,
    patientPhone: params.patientPhone,
    isNewPatient: params.isNewPatient,
    notes: params.notes || '',
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  try {
    await setDoc(doc(db, 'bookings', id), newBooking);
    localBookings = [newBooking, ...localBookings];

    // Create staff notification
    const notifId = `notif-${Date.now()}`;
    await setDoc(doc(db, 'notifications', notifId), {
      id: notifId,
      title: 'New Demo Request',
      message: `${params.patientName} requested ${params.serviceName} on ${params.appointmentDate} at ${params.startTime}.`,
      type: 'booking_request',
      relatedId: id,
      read: false,
      simulatedChannel: 'Internal',
      simulatedDelivery: 'SIMULATED — NOT SENT',
      createdAt: new Date().toISOString()
    }).catch(() => null);

  } catch (error) {
    console.warn("Remote write failed, saving locally:", error);
    localBookings = [newBooking, ...localBookings];
  }

  return newBooking;
}

/**
 * Update booking status from portal (confirm, cancel, reschedule, reject, complete, no-show)
 */
export async function updateBookingStatus(
  bookingId: string,
  newStatus: BookingStatus,
  options?: {
    staffNotes?: string;
    cancellationReason?: string;
    rejectionReason?: string;
    newDate?: string;
    newStartTime?: string;
    newEndTime?: string;
  }
) {
  const bookingRef = doc(db, 'bookings', bookingId);
  const updates: Partial<Booking> = {
    status: newStatus,
    updatedAt: new Date().toISOString()
  };

  if (options?.staffNotes) updates.staffNotes = options.staffNotes;
  if (options?.cancellationReason) updates.cancellationReason = options.cancellationReason;
  if (options?.rejectionReason) updates.rejectionReason = options.rejectionReason;
  if (options?.newDate) updates.appointmentDate = options.newDate;
  if (options?.newStartTime) updates.startTime = options.newStartTime;
  if (options?.newEndTime) updates.endTime = options.newEndTime;

  try {
    await updateDoc(bookingRef, updates);
  } catch (err) {
    console.warn("Remote updateDoc err, updating local store:", err);
  }

  // Update in-memory
  localBookings = localBookings.map(b => (b.id === bookingId ? { ...b, ...updates } : b));

  // Log activity
  await logActivity(
    `Updated booking ${bookingId} to ${newStatus}`,
    'Booking',
    bookingId,
    `Status transitioned to ${newStatus}`
  );
}

/**
 * Enquiry service
 */
export async function submitEnquiry(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}): Promise<Enquiry> {
  const id = `enquiry-${Date.now()}`;
  const enquiry: Enquiry = {
    id,
    name: data.name,
    email: data.email,
    phone: data.phone || '',
    subject: data.subject,
    message: data.message,
    status: 'new',
    createdAt: new Date().toISOString()
  };

  try {
    await setDoc(doc(db, 'enquiries', id), enquiry);
    localEnquiries = [enquiry, ...localEnquiries];

    const notifId = `notif-enq-${Date.now()}`;
    await setDoc(doc(db, 'notifications', notifId), {
      id: notifId,
      title: 'New Demo Message',
      message: `${data.name} sent a question: "${data.subject}"`,
      type: 'enquiry_received',
      relatedId: id,
      read: false,
      simulatedChannel: 'Internal',
      simulatedDelivery: 'SIMULATED — NOT SENT',
      createdAt: new Date().toISOString()
    }).catch(() => null);

  } catch (e) {
    localEnquiries = [enquiry, ...localEnquiries];
  }

  return enquiry;
}

export function subscribeToEnquiries(onUpdate: (enquiries: Enquiry[]) => void) {
  try {
    const q = query(collection(db, 'enquiries'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const items: Enquiry[] = [];
      snapshot.forEach(docSnap => items.push(docSnap.data() as Enquiry));
      localEnquiries = items;
      onUpdate(items);
    }, () => onUpdate(localEnquiries));
  } catch {
    onUpdate(localEnquiries);
    return () => {};
  }
}

export function subscribeToNotifications(onUpdate: (notifs: NotificationItem[]) => void) {
  try {
    const q = query(collection(db, 'notifications'), orderBy('createdAt', 'desc'), limit(50));
    return onSnapshot(q, (snapshot) => {
      const items: NotificationItem[] = [];
      snapshot.forEach(docSnap => items.push(docSnap.data() as NotificationItem));
      localNotifications = items;
      onUpdate(items);
    }, () => onUpdate(localNotifications));
  } catch {
    onUpdate(localNotifications);
    return () => {};
  }
}

export async function markNotificationAsRead(id: string) {
  try {
    await updateDoc(doc(db, 'notifications', id), { read: true });
  } catch {}
  localNotifications = localNotifications.map(n => n.id === id ? { ...n, read: true } : n);
}

export async function logActivity(action: string, targetEntity: string, targetId: string, details: string) {
  const log: ActivityLog = {
    id: `log-${Date.now()}`,
    action,
    actorEmail: auth.currentUser?.email || 'reception@demo.local',
    actorRole: 'Staff',
    targetEntity,
    targetId,
    details,
    timestamp: new Date().toISOString()
  };
  try {
    await setDoc(doc(db, 'activityLogs', log.id), log);
  } catch {}
  localLogs = [log, ...localLogs];
}

export function subscribeToActivityLogs(onUpdate: (logs: ActivityLog[]) => void) {
  try {
    const q = query(collection(db, 'activityLogs'), orderBy('timestamp', 'desc'), limit(30));
    return onSnapshot(q, (snapshot) => {
      const items: ActivityLog[] = [];
      snapshot.forEach(docSnap => items.push(docSnap.data() as ActivityLog));
      localLogs = items;
      onUpdate(items);
    }, () => onUpdate(localLogs));
  } catch {
    onUpdate(localLogs);
    return () => {};
  }
}

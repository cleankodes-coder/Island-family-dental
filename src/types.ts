/**
 * Domain types for Island Family Dental Concept Demo
 */

export type ServiceCategory = 'preventive' | 'restorative' | 'cosmetic' | 'emergency';

export interface DentalService {
  id: string;
  slug: string;
  name: string;
  category: ServiceCategory;
  durationMinutes: number;
  description: string;
  details: string[];
  active: boolean;
  order: number;
}

export interface Provider {
  id: string;
  name: string;
  title: string;
  credentials: string;
  bio: string;
  active: boolean;
  acceptsNewPatients: boolean;
  supportedServiceIds: string[];
  education: string[];
  specialties: string[];
}

export interface WeeklyShift {
  id: string;
  providerId: string;
  dayOfWeek: number; // 0=Sun, 1=Mon, ..., 6=Sat
  dayName: string;
  startTime: string; // "09:00"
  endTime: string;   // "17:00"
  isOpen: boolean;
}

export interface ScheduleException {
  id: string;
  providerId: string;
  date: string; // YYYY-MM-DD
  reason: string;
  allDay: boolean;
  startTime?: string;
  endTime?: string;
}

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'rescheduled'
  | 'cancelled'
  | 'rejected'
  | 'completed'
  | 'no-show';

export interface Booking {
  id: string;
  bookingReference: string;
  providerId: string;
  providerName: string;
  serviceId: string;
  serviceName: string;
  appointmentDate: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string;   // HH:mm
  startUtc?: string;
  endUtc?: string;
  durationMinutes: number;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  isNewPatient: boolean;
  notes?: string;
  status: BookingStatus;
  staffNotes?: string;
  rejectionReason?: string;
  cancellationReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SlotLock {
  id: string;
  providerId: string;
  appointmentDate: string;
  startTime: string;
  endTime: string;
  expiresAt: number; // epoch ms
  sessionToken: string;
}

export type EnquiryStatus = 'new' | 'read' | 'responded' | 'archived';

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: EnquiryStatus;
  createdAt: string;
  responseNotes?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'booking_request' | 'booking_confirmed' | 'booking_cancelled' | 'booking_rescheduled' | 'enquiry_received';
  relatedId?: string;
  read: boolean;
  simulatedChannel: 'SMS' | 'Email' | 'Internal';
  simulatedDelivery: string;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  actorEmail: string;
  actorRole: string;
  targetEntity: string;
  targetId: string;
  details: string;
  timestamp: string;
}

export interface ClinicConfig {
  clinicName: string;
  address: string;
  phone: string;
  fax: string;
  timezone: string;
  minLeadHours: number;
  maxFutureDays: number;
  bufferMinutes: number;
  slotIntervalMinutes: number;
  operatingHours: {
    day: string;
    dayOfWeek: number;
    hours: string;
    isOpen: boolean;
  }[];
}

export type UserRole = 'admin' | 'receptionist' | 'doctor';

export interface StaffUser {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  isDemo?: boolean;
}

export interface TimeSlot {
  time: string; // "09:30"
  endTime: string; // "10:15"
  available: boolean;
  reason?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  suggestedAction?: {
    type: 'book' | 'service' | 'zocdoc' | 'hours';
    serviceSlug?: string;
    label: string;
  };
}

# Firestore Security Specification & Invariants

## 1. Data Invariants
1. Global Catch-All: Any unmatched document read or write is rejected (`allow read, write: if false`).
2. Public Access: Public read is permitted for `/clinicConfig`, `/providers`, and `/services`.
3. Synthetic Booking Requests: Anyone (including anonymous visitors or unauthenticated public users) may create a booking request if:
   - Valid schema, field sizes, and required keys are met.
   - Status MUST be initialized to `"pending"`. Public cannot create `"confirmed"`, `"completed"`, or other statuses.
   - Timestamps and references are strictly bounded.
4. Booking Read & Update:
   - Public can retrieve a single booking by ID if they know the document ID (for immediate confirmation screen).
   - Public CANNOT list all bookings (prevents mass PII scraping).
   - Only authorized staff (`isAdmin()` or authenticated staff in `/admins`) can read all bookings, update statuses (confirm, cancel, reschedule), or delete.
5. Enquiry Submissions:
   - Public can create an enquiry with `"status": "new"`.
   - Only staff can list, read, or update enquiries.
6. Admin & Staff RBAC:
   - Super admin is bootstrapped for `cleankodes@gmail.com`.
   - Only admins can write to `/admins`, `/clinicConfig`, `/weeklyShifts`, `/scheduleExceptions`.
   - Activity logs are append-only by authenticated staff.

## 2. The "Dirty Dozen" Threat Payloads
1. **Public Confirmed Booking Injection**: A visitor tries to create a booking directly with `"status": "confirmed"`. (Target: REJECT)
2. **Oversized String DoS**: A visitor submits a patientName with 50,000 characters. (Target: REJECT)
3. **Ghost Field Poisoning**: A visitor injects `"isAdmin": true` or `"role": "admin"` into a booking document. (Target: REJECT)
4. **Public Collection List Scraping**: An unauthenticated user attempts `collection(db, "bookings").getDocs()` to harvest all patient records. (Target: REJECT)
5. **Enquiry State Escalation**: An attacker sends `"status": "responded"` with malicious notes on creation. (Target: REJECT)
6. **Provider Record Tampering**: An unauthenticated user attempts to update Dr. Golyand's profile or change operating hours. (Target: REJECT)
7. **Admin Privilege Self-Grant**: An authenticated user writes their UID to `/admins/{uid}` with `"role": "admin"`. (Target: REJECT)
8. **Booking Status Override via Update**: An unauthorized user attempts to change their pending booking to confirmed. (Target: REJECT)
9. **Staff Notification Spoofing**: An unauthenticated user attempts to delete or write fake notification alerts. (Target: REJECT)
10. **Activity Log Deletion**: An attacker attempts to delete audit logs to hide changes. (Target: REJECT)
11. **Malicious ID Path Poisoning**: Attempt to use `../` or special control characters in document IDs. (Target: REJECT)
12. **Past Date / Invalid Slot Lock Injection**: Writing expired locks or overlapping slot claims without validation. (Target: REJECT)

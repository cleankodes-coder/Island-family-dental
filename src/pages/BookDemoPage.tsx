import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  RefreshCw,
  Search
} from 'lucide-react';
import { CLINIC_SERVICES, DR_STANISLAV_GOLYAND, CLINIC_CONFIG, OFFICIAL_ZOCDOC_URL } from '../data/clinicData';
import { calculateAvailableSlots, createBookingRequest } from '../services/dbService';
import { Booking, TimeSlot } from '../types';

interface BookDemoPageProps {
  initialServiceSlug?: string;
  onNavigate: (path: string) => void;
}

export const BookDemoPage: React.FC<BookDemoPageProps> = ({ initialServiceSlug, onNavigate }) => {
  // Step tracking: 1=Service, 2=Date & Time, 3=Fictional Details, 4=Confirmed Reference
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Selected values
  const defaultService = CLINIC_SERVICES.find(s => s.slug === initialServiceSlug) || CLINIC_SERVICES[0];
  const [selectedServiceId, setSelectedServiceId] = useState<string>(defaultService.id);
  
  // Date selection: default to next available operating weekday
  const getInitialDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    while (d.getDay() === 0 || d.getDay() === 6) {
      d.setDate(d.getDate() + 1);
    }
    return d.toISOString().split('T')[0];
  };

  const [selectedDate, setSelectedDate] = useState<string>(getInitialDate());
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState<boolean>(false);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  // Patient fictional info
  const [patientName, setPatientName] = useState('Alex Mercer (Synthetic)');
  const [patientEmail, setPatientEmail] = useState('alex.mercer@example.com');
  const [patientPhone, setPatientPhone] = useState('(718) 555-0144');
  const [isNewPatient, setIsNewPatient] = useState(true);
  const [notes, setNotes] = useState('Initial consultation and preventative checkup.');

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdBooking, setCreatedBooking] = useState<Booking | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const currentService = CLINIC_SERVICES.find(s => s.id === selectedServiceId) || CLINIC_SERVICES[0];

  // Fetch slots whenever date or service duration changes
  useEffect(() => {
    let isMounted = true;
    const fetchSlots = async () => {
      setLoadingSlots(true);
      setSelectedSlot(null);
      try {
        const slots = await calculateAvailableSlots(selectedDate, currentService.durationMinutes);
        if (isMounted) {
          setAvailableSlots(slots);
          const firstOpen = slots.find(s => s.available);
          if (firstOpen) setSelectedSlot(firstOpen);
        }
      } catch (err) {
        console.warn("Slots error:", err);
      } finally {
        if (isMounted) setLoadingSlots(false);
      }
    };

    fetchSlots();
    return () => { isMounted = false; };
  }, [selectedDate, currentService.durationMinutes]);

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const booking = await createBookingRequest({
        serviceId: currentService.id,
        serviceName: currentService.name,
        durationMinutes: currentService.durationMinutes,
        appointmentDate: selectedDate,
        startTime: selectedSlot.time,
        endTime: selectedSlot.endTime,
        patientName,
        patientEmail,
        patientPhone,
        isNewPatient,
        notes
      });

      setCreatedBooking(booking);
      setStep(4);

      // Trigger celebratory confetti for simulated booking completion
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 }
      });

    } catch (err: any) {
      setSubmitError(err?.message || "An error occurred while reserving this slot. Please try another time.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
      
      {/* Mandatory Prominent Independent Concept Banner */}
      <div className="bg-[#162C54] text-white p-5 rounded-2xl border border-[#204270] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-[#7DAED6] shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#7DAED6]">
              Synthetic Scheduling Simulation
            </h4>
            <p className="text-xs text-slate-200">
              Demo Request Only — No Appointment Will Be Sent to Island Family Dental. No Real Patient Data Is Collected.
            </p>
          </div>
        </div>
        <a
          href={OFFICIAL_ZOCDOC_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold px-4 py-2 bg-[#204270] hover:bg-[#204270]/80 text-[#7DAED6] hover:text-white rounded-lg transition-colors inline-flex items-center gap-1.5 shrink-0"
        >
          <span>Book Real Visit on Zocdoc</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Main Flow Container */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        
        {/* Step Progress Indicators */}
        <div className="border-b border-slate-200 bg-slate-50/70 p-4 sm:p-6 grid grid-cols-4 gap-2 text-center text-xs">
          <div className={`flex flex-col items-center gap-1 ${step >= 1 ? 'text-[#162C54] font-bold' : 'text-slate-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${step >= 1 ? 'bg-[#162C54] text-white' : 'bg-slate-200 text-slate-600'}`}>1</span>
            <span className="hidden sm:inline">Treatment</span>
          </div>
          <div className={`flex flex-col items-center gap-1 ${step >= 2 ? 'text-[#162C54] font-bold' : 'text-slate-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${step >= 2 ? 'bg-[#162C54] text-white' : 'bg-slate-200 text-slate-600'}`}>2</span>
            <span className="hidden sm:inline">Date & Time</span>
          </div>
          <div className={`flex flex-col items-center gap-1 ${step >= 3 ? 'text-[#162C54] font-bold' : 'text-slate-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${step >= 3 ? 'bg-[#162C54] text-white' : 'bg-slate-200 text-slate-600'}`}>3</span>
            <span className="hidden sm:inline">Patient Info</span>
          </div>
          <div className={`flex flex-col items-center gap-1 ${step >= 4 ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${step >= 4 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'}`}>4</span>
            <span className="hidden sm:inline">Confirmation</span>
          </div>
        </div>

        {/* STEP 1: SELECT SERVICE */}
        {step === 1 && (
          <div className="p-6 sm:p-10 space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-[#162C54]">Step 1: Select Dental Service</h2>
              <p className="text-xs text-slate-500">
                Choose the desired treatment. Estimated duration will automatically govern slot calculations.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
              {CLINIC_SERVICES.map(s => (
                <div
                  key={s.id}
                  onClick={() => setSelectedServiceId(s.id)}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                    selectedServiceId === s.id
                      ? 'border-[#162C54] bg-[#F5F8FC] ring-1 ring-[#162C54]'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span className="capitalize text-[#204270] font-semibold">{s.category}</span>
                      <span className="font-mono tabular-nums">~{s.durationMinutes} min</span>
                    </div>
                    <div className="text-sm font-bold text-[#162C54]">{s.name}</div>
                    <p className="text-xs text-slate-600 line-clamp-2">{s.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Provider Spotlight */}
            <div className="p-4 bg-[#FAF8F4] rounded-2xl border border-slate-200 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#162C54] flex items-center justify-center text-white font-bold text-xs shrink-0">
                  SG
                </div>
                <div>
                  <div className="text-xs font-bold text-[#162C54]">Dr. Stanislav Golyand, DDS</div>
                  <div className="text-[11px] text-slate-500">Lead Clinician · Practice Owner (Since 2006)</div>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/80">
                Accepting New Patients
              </span>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 text-xs font-semibold text-white bg-[#162C54] hover:bg-[#204270] rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Continue to Date & Time</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: SELECT DATE & TIME */}
        {step === 2 && (
          <div className="p-6 sm:p-10 space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-[#162C54]">Step 2: Choose Date & Available Slot</h2>
              <p className="text-xs text-slate-500">
                Operating days: Mon/Wed (9am-5pm), Tue/Thu (12:30pm-8pm), Fri (9am-3pm). Closed Sat & Sun.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              
              {/* Date Input Column */}
              <div className="md:col-span-5 space-y-4">
                <label className="text-xs font-bold text-[#162C54] block">
                  Select Appointment Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-[#162C54] focus:outline-none focus:border-[#7DAED6]"
                />

                <div className="p-4 bg-[#FAF8F4] rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1.5">
                  <div className="font-semibold text-[#162C54]">Selected Treatment:</div>
                  <div className="text-slate-800">{currentService.name}</div>
                  <div className="text-slate-500 font-mono">Estimated Duration: {currentService.durationMinutes} minutes</div>
                </div>
              </div>

              {/* Time Slots Column */}
              <div className="md:col-span-7 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#162C54]">
                    Available Demo Slots
                  </label>
                  {loadingSlots && (
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      Computing availability...
                    </span>
                  )}
                </div>

                {availableSlots.length === 0 ? (
                  <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-500 space-y-2">
                    <p className="font-semibold text-slate-700">Office is Closed on this Day</p>
                    <p>Island Family Dental is open Monday through Friday. Please select a weekday.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-[300px] overflow-y-auto pr-1">
                    {availableSlots.map((slot, idx) => (
                      <button
                        key={idx}
                        type="button"
                        disabled={!slot.available}
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-2.5 rounded-lg text-xs font-mono tabular-nums transition-all border text-center ${
                          selectedSlot?.time === slot.time
                            ? 'bg-[#162C54] text-white border-[#162C54] font-bold shadow-xs'
                            : slot.available
                            ? 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 cursor-pointer'
                            : 'bg-slate-100 text-slate-300 border-slate-100 line-through cursor-not-allowed'
                        }`}
                        title={slot.reason || "Available time slot"}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                )}
              </div>

            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs font-semibold text-slate-600 hover:text-[#162C54]"
              >
                ← Back to Services
              </button>
              <button
                type="button"
                disabled={!selectedSlot || !selectedSlot.available}
                onClick={() => setStep(3)}
                className="px-6 py-3 text-xs font-semibold text-white bg-[#162C54] hover:bg-[#204270] disabled:bg-slate-300 rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-xs disabled:cursor-not-allowed"
              >
                <span>Continue with {selectedSlot ? selectedSlot.time : 'Selected Slot'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: PATIENT FICTIONAL DETAILS */}
        {step === 3 && (
          <form onSubmit={handleSubmitBooking} className="p-6 sm:p-10 space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-[#162C54]">Step 3: Enter Fictional Demo Identity</h2>
              <p className="text-xs text-slate-500">
                Please use fictional placeholder data for testing. Do not input real confidential health information.
              </p>
            </div>

            {submitError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Fictional Name *</label>
                <input
                  type="text"
                  required
                  value={patientName}
                  onChange={e => setPatientName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#7DAED6]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Fictional Email *</label>
                <input
                  type="email"
                  required
                  value={patientEmail}
                  onChange={e => setPatientEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#7DAED6]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Demo Phone</label>
                <input
                  type="tel"
                  value={patientPhone}
                  onChange={e => setPatientPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#7DAED6]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Patient Status</label>
                <div className="flex items-center gap-4 pt-2">
                  <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="patientStatus"
                      checked={isNewPatient}
                      onChange={() => setIsNewPatient(true)}
                    />
                    <span>New Patient</span>
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="patientStatus"
                      checked={!isNewPatient}
                      onChange={() => setIsNewPatient(false)}
                    />
                    <span>Returning Patient</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Clinical Reason / Visit Notes (Optional)</label>
              <textarea
                rows={3}
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#7DAED6]"
              />
            </div>

            {/* Summary Review Strip */}
            <div className="p-4 bg-[#FAF8F4] rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-1">
              <div className="font-bold text-[#162C54] mb-1">Appointment Summary:</div>
              <div><strong>Procedure:</strong> {currentService.name} (~{currentService.durationMinutes} min)</div>
              <div><strong>Doctor:</strong> Dr. Stanislav Golyand, DDS</div>
              <div><strong>Date & Time:</strong> {selectedDate} at {selectedSlot?.time} – {selectedSlot?.endTime}</div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-xs font-semibold text-slate-600 hover:text-[#162C54]"
              >
                ← Back to Date & Time
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 text-xs font-semibold text-white bg-[#162C54] hover:bg-[#204270] disabled:bg-slate-300 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Reserving Slot in Database...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#7DAED6]" />
                    <span>Submit Synthetic Request</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: SUCCESS CONFIRMATION */}
        {step === 4 && createdBooking && (
          <div className="p-8 sm:p-12 text-center space-y-6">
            
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#162C54]">
                Synthetic Demo Request Created!
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                Your request has been registered in Cloud Firestore in <strong>Pending</strong> status and transmitted to the reception portal.
              </p>
            </div>

            {/* Reference Badge */}
            <div className="p-6 bg-[#FAF8F4] border-2 border-dashed border-[#7DAED6] rounded-2xl max-w-md mx-auto space-y-2">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                Booking Reference Code
              </div>
              <div className="text-2xl font-mono font-extrabold text-[#162C54] tracking-wider">
                {createdBooking.bookingReference}
              </div>
              <div className="text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1 rounded-full inline-block border border-amber-200">
                Status: Pending Staff Review
              </div>
            </div>

            {/* Appointment Details Table */}
            <div className="max-w-md mx-auto text-xs text-left bg-white p-5 rounded-xl border border-slate-200 space-y-2 text-slate-700">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Service:</span>
                <span className="font-semibold text-[#162C54]">{createdBooking.serviceName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Dentist:</span>
                <span className="font-semibold text-[#162C54]">{createdBooking.providerName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Date & Slot:</span>
                <span className="font-semibold text-[#162C54] font-mono">{createdBooking.appointmentDate} · {createdBooking.startTime}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Patient:</span>
                <span className="font-semibold text-[#162C54]">{createdBooking.patientName}</span>
              </div>
            </div>

            {/* Next Steps Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => onNavigate('/portal')}
                className="px-5 py-3 text-xs font-semibold text-white bg-[#162C54] hover:bg-[#204270] rounded-xl transition-colors inline-flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>View Request in Operations Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  setStep(1);
                  setCreatedBooking(null);
                }}
                className="px-5 py-3 text-xs font-semibold text-[#162C54] bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                Create Another Demo Request
              </button>
            </div>

            <div className="text-[11px] text-slate-400 pt-2">
              * Remember: To schedule an authentic clinical visit, please call Island Family Dental directly at +1 (718) 948-6500 or use Dr. Stanislav Golyand&apos;s verified Zocdoc profile.
            </div>

          </div>
        )}

      </div>

    </div>
  );
};

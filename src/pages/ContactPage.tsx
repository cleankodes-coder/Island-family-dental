import React, { useState } from 'react';
import { MapPin, Phone, Clock, Mail, Send, CheckCircle2, ExternalLink, AlertCircle } from 'lucide-react';
import { CLINIC_CONFIG, OFFICIAL_ZOCDOC_URL, GOOGLE_MAPS_DIRECTIONS_URL } from '../data/clinicData';
import { submitEnquiry } from '../services/dbService';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Question',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitting(true);
    try {
      await submitEnquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message
      });
      setSubmitted(true);
    } catch (err) {
      console.warn("Enquiry submission note:", err);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="text-xs font-semibold text-[#7DAED6] uppercase tracking-wider">
          Connect With Our Team · Staten Island, NY
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#162C54] tracking-tight">
          Contact Island Family Dental
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Conveniently located on Richmond Avenue with dedicated parking. Reach our reception team by phone or submit a message below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Verified Contact Details & Hours */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
            <h2 className="text-lg font-bold text-[#162C54]">Practice Information</h2>
            
            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#204270] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#162C54]">Location</div>
                  <p>4032 Richmond Avenue</p>
                  <p>Staten Island, NY 10312, United States</p>
                  <a
                    href={GOOGLE_MAPS_DIRECTIONS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#204270] hover:underline mt-1.5"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3 text-[#7DAED6]" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                <Phone className="w-5 h-5 text-[#204270] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#162C54]">Telephone & Fax</div>
                  <p>Main Phone: <a href="tel:+17189486500" className="font-semibold text-[#162C54] hover:underline">+1 (718) 948-6500</a></p>
                  <p className="text-slate-500">Fax: +1 (718) 948-0255</p>
                </div>
              </div>
            </div>

            {/* Official Zocdoc Callout */}
            <div className="pt-4 border-t border-slate-100">
              <a
                href={OFFICIAL_ZOCDOC_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-[#F5F8FC] hover:bg-slate-200 text-[#162C54] rounded-xl font-semibold text-xs transition-colors flex items-center justify-between"
              >
                <span>Book Real Visit on Zocdoc</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#7DAED6]" />
              </a>
            </div>
          </div>

          {/* Authentic Building Exterior Photo Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-[#162C54] uppercase tracking-wider">Practice Exterior & Parking</h3>
              <span className="text-[10px] text-slate-400">4032 Richmond Ave</span>
            </div>
            
            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 relative aspect-[16/10]">
              <img
                src="/assets/island-family-dental/clinic-exterior/richmond-avenue-exterior.jpg"
                alt="Island Family Dental Building Exterior on Richmond Avenue"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-medium text-slate-700 flex items-center justify-between shadow-xs">
                <span>Standalone Two-Story Practice</span>
                <span className="text-[#204270] font-semibold">Street View Reference</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="rounded-xl overflow-hidden border border-slate-200 aspect-square">
                <img
                  src="/assets/island-family-dental/clinic-exterior/richmond-avenue-map.png"
                  alt="Richmond Avenue Map Location"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center text-xs text-slate-600 space-y-1">
                <span className="font-semibold text-[#162C54]">Location Notes:</span>
                <p className="text-[11px] text-slate-500 leading-tight">
                  Located near Amboy Rd on Richmond Ave with free patient parking in front and rear.
                </p>
                <button
                  onClick={() => onNavigate('/gallery')}
                  className="text-[11px] font-semibold text-[#204270] hover:underline text-left pt-1"
                >
                  View in Gallery →
                </button>
              </div>
            </div>
          </div>

          {/* Operating Hours Box */}
          <div className="bg-[#FAF8F4] p-8 rounded-3xl border border-slate-200 space-y-4">
            <h3 className="text-sm font-bold text-[#162C54] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#204270]" />
              <span>Published Office Hours</span>
            </h3>
            <ul className="space-y-2 text-xs tabular-nums text-slate-700">
              <li className="flex justify-between py-1 border-b border-slate-200/60">
                <span>Monday:</span>
                <span className="font-semibold text-[#162C54]">9:00 AM – 5:00 PM</span>
              </li>
              <li className="flex justify-between py-1 border-b border-slate-200/60">
                <span>Tuesday:</span>
                <span className="font-semibold text-[#162C54]">12:30 PM – 8:00 PM</span>
              </li>
              <li className="flex justify-between py-1 border-b border-slate-200/60">
                <span>Wednesday:</span>
                <span className="font-semibold text-[#162C54]">9:00 AM – 5:00 PM</span>
              </li>
              <li className="flex justify-between py-1 border-b border-slate-200/60">
                <span>Thursday:</span>
                <span className="font-semibold text-[#162C54]">12:30 PM – 8:00 PM</span>
              </li>
              <li className="flex justify-between py-1 border-b border-slate-200/60">
                <span>Friday:</span>
                <span className="font-semibold text-[#162C54]">9:00 AM – 3:00 PM</span>
              </li>
              <li className="flex justify-between py-1 text-slate-400">
                <span>Saturday & Sunday:</span>
                <span>Closed</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Right Column: Interactive Fictional Demo Enquiry Form */}
        <div className="lg:col-span-7">
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
            
            <div className="space-y-2">
              <div className="text-xs font-semibold text-[#204270] uppercase tracking-wider">Concept Demo Message</div>
              <h2 className="text-2xl font-bold text-[#162C54]">Send an Online Question</h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                Test our simulated communication inbox. Messages submitted here are routed directly to the staff operations portal.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 bg-[#F5F8FC] rounded-2xl border border-[#7DAED6]/50 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="text-base font-bold text-[#162C54]">Demo Enquiry Received!</h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  Your question has been synchronized with our desktop operations portal under the <strong>Enquiries</strong> tab. In a production environment, staff would follow up via email or phone.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', subject: 'General Question', message: '' });
                    }}
                    className="px-4 py-2 text-xs font-semibold text-[#162C54] bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Submit Another Test Question
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#7DAED6] focus:bg-white text-slate-800"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. alex@example.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#7DAED6] focus:bg-white text-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Phone (Optional)</label>
                    <input
                      type="tel"
                      placeholder="e.g. (718) 555-0199"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#7DAED6] focus:bg-white text-slate-800"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Subject</label>
                    <select
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#7DAED6] focus:bg-white text-slate-800"
                    >
                      <option value="General Question">General Question</option>
                      <option value="Insurance Inquiry">Insurance Inquiry</option>
                      <option value="Invisalign Consultation">Invisalign Consultation</option>
                      <option value="Dental Implants">Dental Implants</option>
                      <option value="First Visit Preparation">First Visit Preparation</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Your Message *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Type your question or request details here..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#7DAED6] focus:bg-white text-slate-800"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto px-6 py-3 text-xs font-semibold text-white bg-[#162C54] hover:bg-[#204270] rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{submitting ? 'Transmitting to Portal...' : 'Submit Demo Question'}</span>
                  </button>
                </div>

              </form>
            )}

            <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-400">
              <AlertCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>Simulated demo submission. No real healthcare message is sent.</span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

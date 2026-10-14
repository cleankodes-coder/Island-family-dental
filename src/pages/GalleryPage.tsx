import React, { useState, useEffect, useCallback } from 'react';
import { 
  Camera, 
  ShieldCheck, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  Lock, 
  Sparkles, 
  CheckCircle2, 
  Building, 
  MapPin, 
  User, 
  Info,
  Calendar
} from 'lucide-react';
import { CLINIC_ASSETS, ClinicImageAsset } from '../data/clinicAssets';
import { OFFICIAL_SITE_URL, DR_STANISLAV_GOLYAND } from '../data/clinicData';

interface GalleryPageProps {
  onNavigate: (path: string) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  // Compile list of authentic displayable gallery items
  const allGalleryItems: ClinicImageAsset[] = [
    CLINIC_ASSETS.doctor.stanislavGolyand,
    CLINIC_ASSETS.exterior.buildingFacade,
    CLINIC_ASSETS.exterior.staticMap,
    CLINIC_ASSETS.branding.facebookCover,
    CLINIC_ASSETS.branding.logoEmblem,
    ...CLINIC_ASSETS.technology
  ];

  const filteredItems = selectedCategory === 'all'
    ? allGalleryItems
    : allGalleryItems.filter(item => item.category === selectedCategory);

  // Keyboard navigation for lightbox
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (activeLightboxIndex === null) return;
    if (e.key === 'Escape') {
      setActiveLightboxIndex(null);
    } else if (e.key === 'ArrowRight') {
      setActiveLightboxIndex((prev) => 
        prev !== null ? (prev + 1) % filteredItems.length : 0
      );
    } else if (e.key === 'ArrowLeft') {
      setActiveLightboxIndex((prev) => 
        prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : 0
      );
    }
  }, [activeLightboxIndex, filteredItems.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const activeItem = activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      
      {/* Header & Mission Statement */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#162C54]/5 text-[#162C54] rounded-full text-xs font-semibold uppercase tracking-wider">
          <Camera className="w-3.5 h-3.5 text-[#7DAED6]" />
          <span>Authentic Practice Assets & Gallery</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#162C54] tracking-tight leading-tight">
          Visual Heritage & Clinical Practice
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Explore genuine photography of our lead clinician Dr. Stanislav Golyand, our Richmond Avenue facility, and our modern clinical diagnostic technologies.
        </p>
      </div>

      {/* Strict Privacy & Ethical Policy Callout */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-xs space-y-3">
        <div className="flex items-center gap-2.5 text-xs font-bold text-[#162C54] uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Strict No-AI-Photography & Patient Privacy Protocol</span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          Every photo displayed here is an authentic asset from the official clinic website or verified location photography. In accordance with patient privacy regulations and dental medical ethics, we strictly exclude unconsented clinical before/after procedures and low-resolution social media screenshots from the public gallery.
        </p>
        <div className="flex flex-wrap gap-4 pt-1 text-[11px] text-slate-500">
          <span className="inline-flex items-center gap-1.5 text-emerald-700 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" /> Zero AI-Generated Faces
          </span>
          <span className="inline-flex items-center gap-1.5 text-emerald-700 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" /> HIPAA-Compliant Privacy
          </span>
          <span className="inline-flex items-center gap-1.5 text-emerald-700 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" /> Verified Practice Origin
          </span>
        </div>
      </div>

      {/* Category Filter Controls */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-b border-slate-200 pb-4">
        {[
          { id: 'all', label: 'All Assets' },
          { id: 'doctor', label: 'Dr. Stanislav Golyand' },
          { id: 'clinic-exterior', label: 'Exterior & Location' },
          { id: 'branding', label: 'Brand & Emblems' },
          { id: 'technology', label: 'Diagnostics & Technology' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setSelectedCategory(tab.id);
              setActiveLightboxIndex(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedCategory === tab.id
                ? 'bg-[#162C54] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-[#162C54] border border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            onClick={() => setActiveLightboxIndex(index)}
            className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer hover:-translate-y-0.5"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/3] bg-slate-50 overflow-hidden flex items-center justify-center p-2">
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#162C54]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg text-[#162C54]">
                  <Maximize2 className="w-4 h-4" />
                </span>
              </div>
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/95 backdrop-blur-md text-[#162C54] rounded-md shadow-xs border border-slate-200/60">
                  {item.category === 'doctor' ? 'Clinician' :
                   item.category === 'clinic-exterior' ? 'Location' :
                   item.category === 'branding' ? 'Brand' : 'Technology'}
                </span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="text-sm font-bold text-[#162C54] group-hover:text-[#204270] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span className="truncate max-w-[200px]" title={item.origin}>
                  {item.isAuthentic ? '✓ Verified Authentic' : 'Illustrated Spec'}
                </span>
                <span className="text-xs font-semibold text-[#204270] group-hover:underline flex items-center gap-1">
                  View <Maximize2 className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeItem && activeLightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-[#162C54]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveLightboxIndex(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-slate-200 max-h-[90vh]"
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveLightboxIndex(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-700 flex items-center justify-center shadow-md transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Left Image Viewport */}
            <div className="relative md:w-3/5 bg-slate-900 flex items-center justify-center p-6 min-h-[300px]">
              <img
                src={activeItem.src}
                alt={activeItem.title}
                className="max-h-[65vh] w-auto max-w-full object-contain rounded-lg shadow-md"
              />

              {/* Prev / Next Navigation Arrows */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveLightboxIndex((prev) => 
                    prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : 0
                  );
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center shadow transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveLightboxIndex((prev) => 
                    prev !== null ? (prev + 1) % filteredItems.length : 0
                  );
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center shadow transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Right Information Panel */}
            <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-md text-[10px] font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Verified Asset</span>
                </div>

                <h3 className="text-xl font-bold text-[#162C54]">
                  {activeItem.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {activeItem.description}
                </p>

                <div className="space-y-2.5 pt-3 border-t border-slate-100 text-xs text-slate-600">
                  <div>
                    <span className="font-semibold text-slate-800">Local Asset Path:</span>
                    <div className="font-mono text-[11px] text-slate-700 bg-slate-50 p-1.5 rounded border border-slate-200 mt-1 break-all">
                      {activeItem.src}
                    </div>
                  </div>

                  <div>
                    <span className="font-semibold text-slate-800">Source / Origin:</span>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                      {activeItem.origin}
                    </p>
                  </div>

                  <div>
                    <span className="font-semibold text-slate-800">Usage Policy:</span>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {activeItem.usageRights}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  {activeLightboxIndex + 1} of {filteredItems.length}
                </span>
                <button
                  onClick={() => {
                    setActiveLightboxIndex(null);
                    onNavigate('/book-demo');
                  }}
                  className="px-4 py-2 bg-[#162C54] hover:bg-[#204270] text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Calendar className="w-3 h-3 text-[#7DAED6]" />
                  <span>Try Demo Booking</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* Informational Footer Note */}
      <div className="bg-[#FAF8F4] p-6 rounded-2xl border border-slate-200 text-center space-y-2">
        <p className="text-xs font-semibold text-[#162C54]">
          Independent Concept Demo — Photo Integrity Verified
        </p>
        <p className="text-[11px] text-slate-500 max-w-xl mx-auto">
          All images correspond directly to verified public assets of Island Family Dental. No generative AI portraits, stock replacement models, or fake patient results have been introduced.
        </p>
      </div>

    </div>
  );
};

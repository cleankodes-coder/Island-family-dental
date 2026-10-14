import React, { useState } from 'react';
import { Search, ArrowRight, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import { CLINIC_SERVICES } from '../data/clinicData';
import { ServiceCategory } from '../types';

interface ServicesPageProps {
  onNavigate: (path: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = CLINIC_SERVICES.filter(service => {
    const matchesCat = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      
      {/* Page Header */}
      <div className="max-w-3xl space-y-4">
        <div className="text-xs font-semibold text-[#7DAED6] uppercase tracking-wider">
          Clinical Treatments & Family Dentistry
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#162C54] tracking-tight">
          Comprehensive Dental Services
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          From preventative biannual cleanings to gentle root canal therapies and custom Invisalign aligners, Dr. Stanislav Golyand, DDS provides personalized care under one roof.
        </p>
      </div>

      {/* Search and Category Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search treatments (e.g. cleanings, crowns, implants)..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#7DAED6] focus:bg-white transition-all text-slate-800 placeholder:text-slate-400"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto p-1 bg-slate-100 rounded-xl">
          {(['all', 'preventive', 'restorative', 'cosmetic', 'emergency'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors capitalize whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-white text-[#162C54] shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Services Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-3">
          <p className="text-sm font-semibold text-slate-700">No matching treatments found.</p>
          <p className="text-xs text-slate-500">Try adjusting your search query or category filter.</p>
          <button
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
            className="px-4 py-2 text-xs font-semibold text-[#162C54] bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(service => (
            <div
              key={service.id}
              onClick={() => onNavigate(`/services/${service.slug}`)}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-[#7DAED6] transition-all hover:shadow-md cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="capitalize font-semibold text-[#204270] tracking-wide">
                    {service.category}
                  </span>
                  <div className="flex items-center gap-1 font-mono text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>~{service.durationMinutes}m</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#162C54] group-hover:text-[#204270] transition-colors leading-snug">
                  {service.name}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {service.description}
                </p>

                <ul className="space-y-1.5 pt-2 text-xs text-slate-500">
                  {service.details.slice(0, 2).map((d, i) => (
                    <li key={i} className="flex items-start gap-1.5 line-clamp-1">
                      <span className="text-[#7DAED6] font-bold">·</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#162C54]">
                <span>View Full Overview</span>
                <ArrowRight className="w-4 h-4 text-[#7DAED6] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom Booking Prompt */}
      <div className="bg-[#FAF8F4] border border-[#7DAED6]/40 rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-bold text-[#162C54]">Have a question about a specific procedure?</h3>
          <p className="text-xs text-slate-600 mt-1">
            Our Gemini AI receptionist can answer questions about treatment steps or office preparation.
          </p>
        </div>
        <button
          onClick={() => onNavigate('/book-demo')}
          className="px-6 py-3 text-xs font-semibold text-white bg-[#162C54] hover:bg-[#204270] rounded-xl transition-colors cursor-pointer shrink-0"
        >
          Try Demo Booking
        </button>
      </div>

    </div>
  );
};

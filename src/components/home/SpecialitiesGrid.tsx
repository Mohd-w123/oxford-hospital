'use client';

import React from 'react';
import Link from 'next/link';
import { 
  HeartHandshake, 
  Stethoscope, 
  Activity, 
  ShieldCheck, 
  Bed, 
  Pill, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { ServiceItem } from '@/lib/types';

interface SpecialitiesGridProps {
  services: ServiceItem[];
}

export default function SpecialitiesGrid({ services }: SpecialitiesGridProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartHandshake': return <HeartHandshake className="w-6 h-6 text-[#000066]" />;
      case 'Stethoscope': return <Stethoscope className="w-6 h-6 text-blue-700" />;
      case 'Activity': return <Activity className="w-6 h-6 text-indigo-700" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-blue-800" />;
      case 'Bed': return <Bed className="w-6 h-6 text-amber-600" />;
      case 'Pill': return <Pill className="w-6 h-6 text-rose-600" />;
      default: return <Stethoscope className="w-6 h-6 text-[#000066]" />;
    }
  };

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-[#000066] text-xs font-bold uppercase tracking-wider shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Centres of Clinical Excellence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Medical Services & Specialties
          </h2>
          <p className="text-base text-slate-600">
            ऑक्सफोर्ड हॉस्पिटल में विशेषज्ञ डॉक्टर्स, अत्याधुनिक तकनीकी उपकरण और 24 घंटे समर्पित चिकित्सा सुविधाएं उपलब्ध हैं।
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:border-blue-400 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col group"
            >
              {/* Image Preview */}
              <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-3 right-3 bg-blue-950/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-sky-200 border border-blue-400/30">
                  Super Speciality
                </div>
                <div className="absolute bottom-3 left-4 bg-white/95 backdrop-blur-md p-2.5 rounded-2xl shadow-lg border border-slate-100">
                  {getIcon(service.icon)}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-black text-slate-900 group-hover:text-[#000066] transition-colors">
                    {service.title}
                  </h3>
                  {service.titleHindi && (
                    <p className="text-xs font-bold text-blue-700 mb-2">
                      {service.titleHindi}
                    </p>
                  )}
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>

                {/* Key Bullet Features */}
                <div className="space-y-1.5 pt-3 border-t border-slate-100">
                  {service.features?.slice(0, 3).map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#000066] shrink-0 mt-0.5" />
                      <span className="line-clamp-1 font-medium">{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Footer Action */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/appointment?department=${encodeURIComponent(service.title)}`}
                    className="text-xs font-bold text-[#000066] hover:text-blue-800 flex items-center gap-1.5 group-hover:gap-2 transition-all"
                  >
                    <span>Book For This Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/services"
                    className="text-xs font-semibold text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded-lg transition"
                  >
                    Details &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 bg-gradient-to-r from-[#000066] via-blue-950 to-slate-950 rounded-3xl p-6 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl border border-blue-800/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="space-y-1.5 text-center sm:text-left relative z-10">
            <h3 className="text-xl sm:text-2xl font-black">Need assistance choosing the right department?</h3>
            <p className="text-xs sm:text-sm text-sky-200">Call our 24×7 hospital reception desk for immediate doctor scheduling assistance.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 relative z-10 shrink-0">
            <a
              href="tel:9460841406"
              className="bg-white text-[#000066] hover:bg-blue-50 font-black px-6 py-3.5 rounded-2xl shadow transition text-xs sm:text-sm"
            >
              Call 9460841406
            </a>
            <Link
              href="/appointment"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-6 py-3.5 rounded-2xl shadow transition text-xs sm:text-sm"
            >
              Book Online
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

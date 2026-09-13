import React from 'react';
import { getSiteContent } from '@/lib/content-store';
import Link from 'next/link';
import { Building2, Sparkles, CheckCircle2, ShieldCheck, HeartPulse, ArrowRight } from 'lucide-react';
import FacilitiesTour from '@/components/home/FacilitiesTour';

export default async function FacilitiesPage() {
  const content = await getSiteContent();
  const { gallery, hospital } = content;

  const facilitiesList = [
    {
      title: 'Oxford Hospital Reception & Cashless MAA Desk',
      desc: 'Air-conditioned main reception with 24x7 patient registration, computerized token assistance, and dedicated MAA Yojana & insurance guidance desk.',
      tag: 'Reception',
      imageUrl: '/images/gallery/oxford-reception.jpg'
    },
    {
      title: 'Oxford Diagnostic Center & Waiting Lobby',
      desc: 'Dedicated diagnostic wing offering pathology, sonography, X-Ray, and comfortable seating with CCTV surveillance and fire safety.',
      tag: 'Diagnostics',
      imageUrl: '/images/gallery/oxford-diagnostic-center.jpg'
    },
    {
      title: 'In-Patient Department (IPD) & General Wards',
      desc: 'Spacious patient beds with privacy curtains, central oxygen lines, IV drip stands, attendant seating, and biomedical hygiene maintenance.',
      tag: 'Wards',
      imageUrl: '/images/gallery/oxford-inpatient-ward.jpg'
    },
    {
      title: 'Intensive Care (ICU) & High Dependency Monitoring',
      desc: 'Equipped with multi-channel cardiac monitors, oxygen therapy, emergency crash cart, and round-the-clock nursing supervision.',
      tag: 'Critical Care',
      imageUrl: '/images/gallery/oxford-icu-monitoring.jpg'
    },
    {
      title: 'Specialist Doctor Consultation Chambers',
      desc: 'Private, fully equipped consultation suites ensuring patient privacy, sterile examination tables, and personalized clinical attention.',
      tag: 'OPD Clinics',
      imageUrl: '/images/gallery/oxford-doctor-consultation.jpg'
    },
    {
      title: 'Modular Operation Theatre (OT)',
      desc: 'Sterile surgical suites with laminar airflow, HEPA filters, advanced anaesthesia stations, and laparoscopy equipment for safe procedures.',
      tag: 'Surgery',
      imageUrl: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: '24x7 In-House Hospital Pharmacy',
      desc: 'Fully stocked pharmacy carrying 100% genuine emergency medications, surgical consumables, antibiotics, and vaccines day and night.',
      tag: 'Pharmacy',
      imageUrl: 'https://images.unsplash.com/photo-1586015555751-63c25227aa71?auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <div className="bg-slate-50 py-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#000066] via-blue-950 to-slate-950 text-white py-16 mb-12 border-b border-blue-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-900/60 text-sky-300 text-xs font-bold uppercase tracking-wider border border-blue-400/30 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>State of the Art Facilities</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Hospital Infrastructure & Patient Amenities
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto">
            Explore our advanced surgical suites, modern diagnostics, comfortable wards, 24x7 pharmacy, and patient-first amenities in Sikar.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilitiesList.map((facility, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:border-blue-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                <img
                  src={facility.imageUrl}
                  alt={facility.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-sky-300 text-xs font-bold px-3 py-1 rounded-full border border-blue-400/30">
                  {facility.tag}
                </div>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#000066] transition-colors">
                    {facility.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {facility.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-[#000066]">
                  <CheckCircle2 className="w-4 h-4 text-blue-700 mr-1.5" />
                  <span>24x7 Maintained & Monitored</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Visual Tour Section */}
        <FacilitiesTour gallery={gallery} />

      </div>
    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import {
  MapPin,
  PhoneCall,
  Clock,
  ExternalLink,
  ShieldCheck,
  Calendar,
  MessageCircle,
  Building2,
  Stethoscope,
  Sparkles,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';

import { Branch } from '@/lib/types';

interface OurBranchesProps {
  branches?: Branch[];
}

const defaultBranchesList: Branch[] = [
  {
    id: 'branch-jhunjhunu',
    name: 'Oxford Multispeciality Hospital',
    hindiName: 'ऑक्सफोर्ड मल्टीस्पेशलिटी हॉस्पिटल',
    badge: 'Main Branch / मुख्य शाखा',
    tagline: 'बेहतर इलाज की शुरुआत, सही जगह से।',
    address: 'Churu Baipass Tiraha, Jhunjhunu, Rajasthan',
    addressHindi: 'चूरू बाईपास तिराहा, झुंझुनूं',
    phone: '9460841406',
    whatsapp: '9460841406',
    timings: '24×7 Emergency & Trauma | Daily OPD 9:00 AM - 8:00 PM',
    timingsHindi: '24×7 आपातकालीन सेवाएँ | ओपीडी: प्रातः 9 से सायं 8 बजे तक',
    services: [
      'General & Internal Medicine',
      'Dental & Oral Surgery',
      'Eye Care / Ophthalmology',
      'Physiotherapy & Rehabilitation',
      'Gynaecology & Obstetrics',
      'General & Laparoscopic Surgery'
    ],
    schemes: ['ECHS', 'RGHS', 'ESIC', 'CAPF', 'MAA Yojana'],
    googleMapsUrl: 'https://maps.google.com/?q=Oxford+Multispeciality+Hospital+Churu+Bypass+Tiraha+Jhunjhunu',
    isMainBranch: true
  },
  {
    id: 'branch-rajgarh',
    name: 'Ayushman Hospital Rajgarh',
    hindiName: 'आयुष्मान हॉस्पिटल राजगढ़',
    badge: 'Rajgarh Branch / राजगढ़ शाखा',
    tagline: 'ऑक्सफोर्ड हॉस्पिटल झुंझुनू द्वारा संचालित',
    doctorName: 'Dr H. ALTAF',
    doctorDegree: 'MBBS, MD (Internal Medicine)',
    doctorRole: 'Fellowship in Critical Society • Senior Consultant Physician',
    address: 'Opposite Krishi Mandi, Rajgarh, Churu, Rajasthan',
    addressHindi: 'कृषि मंडी के सामने, राजगढ़, चूरू',
    phone: '9257841406',
    whatsapp: '9257841406',
    timings: 'Daily Physician Consultation & Critical Care OPD',
    timingsHindi: 'दैनिक फिजिशियन परामर्श एवं क्रिटिकल केयर ओपीडी',
    services: [
      'बुखार एवं संक्रमण (Fever & Infection)',
      'BP एवं Diabetes (Hypertension & Diabetes)',
      'कमजोरी एवं थकान (Weakness & Fatigue)',
      'सिरदर्द एवं चक्कर (Headache & Dizziness)',
      'सांस संबंधी समस्याएँ (Respiratory Ailments)',
      'सामान्य एवं जटिल स्वास्थ्य समस्याएँ'
    ],
    schemes: ['ECHS', 'RGHS', 'ESIC', 'CAPF', 'MAA Yojana'],
    googleMapsUrl: 'https://maps.google.com/?q=Ayushman+Hospital+Opposite+Krishi+Mandi+Rajgarh+Churu'
  },
  {
    id: 'branch-sultana',
    name: 'Oxford Hospital Sultana',
    hindiName: 'ऑक्सफोर्ड हॉस्पिटल सुल्ताना',
    badge: 'Sultana Branch / सुल्ताना शाखा',
    tagline: 'मल्टीस्पेशलिटी हॉस्पिटल - सही समय पर इलाज ही समझदारी है',
    doctorName: 'डॉ प्रमोद शेखावत (Dr. Pramod Shekhawat)',
    doctorDegree: 'BDS (R.U.H.S)',
    doctorRole: 'Endodontics & Conservative Procedure (RCT) • Exodontia & Periodontal',
    address: 'Tekra Stand, Sultana, Rajasthan',
    addressHindi: 'टेकड़ा स्टैंड, सुल्ताना',
    phone: '9256841406',
    whatsapp: '9256841406',
    timings: 'Daily Dental & Multi-Speciality OPD Care',
    timingsHindi: 'दैनिक दंत चिकित्सा एवं मल्टीस्पेशलिटी ओपीडी',
    services: [
      'दाँतों में दर्द का त्वरित उपचार',
      'कैविटी एवं कीड़ा लगना (Dental Filling)',
      'मसूड़ों से खून आना व पायरिया उपचार',
      'रूट केनाल ट्रीटमेंट (Painless RCT)',
      'दाँतों में पीलापन व टीथ वाइटनिंग',
      'दाँतों की संवेदनशीलता (Sensitivity Relief)'
    ],
    schemes: ['ECHS', 'RGHS', 'ESIC', 'CAPF', 'MAA Yojana'],
    googleMapsUrl: 'https://maps.google.com/?q=Oxford+Hospital+Tekra+Stand+Sultana'
  }
];

const gradients = [
  'from-[#000066] via-blue-900 to-blue-800',
  'from-blue-900 via-indigo-900 to-slate-900',
  'from-[#000066] via-blue-950 to-cyan-950'
];

export default function OurBranches({ branches }: OurBranchesProps) {
  const activeBranches = branches && branches.length > 0 ? branches : defaultBranchesList;
  return (
    <section id="branches" className="py-16 sm:py-24 bg-gradient-to-b from-slate-50 via-white to-slate-100/70 relative overflow-hidden">
      {/* Subtle background ambient elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-64 bg-blue-600/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/90 border border-blue-200 text-[#000066] text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-2xs">
            <Building2 className="w-4 h-4 text-[#000066]" />
            <span>Our Hospital Network & Locations</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Integrated Multispeciality Hospital Network
          </h2>
          
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            झुंझुनूं, राजगढ़ एवं सुल्ताना में ऑक्सफोर्ड हॉस्पिटल नेटवर्क द्वारा संचालित आधुनिक चिकित्सा केंद्र, वरिष्ठ विशेषज्ञ चिकित्सक एवं 100% कैशलेस स्वास्थ्य योजनाएं।
          </p>
        </div>

        {/* 3 Branches Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {activeBranches.map((branch, bIdx) => (
            <div
              key={branch.id}
              className={`rounded-3xl bg-white border ${
                branch.isMainBranch ? 'border-blue-600 shadow-2xl ring-2 ring-blue-600/20' : 'border-slate-200/90 shadow-xl'
              } flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 group`}
            >
              {/* Card Header with Top Gradient Banner */}
              <div>
                <div className={`p-6 bg-gradient-to-r ${gradients[bIdx % gradients.length]} text-white relative shadow-sm`}>
                  {/* Branch Badge & Live status */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md text-white border border-white/30">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      {branch.badge}
                    </span>
                    {branch.isMainBranch ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 shadow-sm">
                        <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
                        Main HQ
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-sky-200 bg-white/10 px-2 py-0.5 rounded-full">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        OPD Active
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
                    {branch.hindiName}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-sky-200 mt-0.5">
                    {branch.name}
                  </p>

                  {branch.tagline && (
                    <div className="mt-3 pt-2.5 border-t border-white/20 text-xs text-sky-100 font-medium leading-relaxed">
                      {branch.tagline}
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-5">
                  
                  {/* Doctor Spotlight (if branch has dedicated lead doctor) */}
                  {branch.doctorName && (
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50/90 to-indigo-50/50 border border-blue-200/80 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-[#000066] font-extrabold text-sm">
                          <Stethoscope className="w-4 h-4 text-blue-700 shrink-0" />
                          <span>{branch.doctorName}</span>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-[#000066]">
                          Lead Specialist
                        </span>
                      </div>
                      {branch.doctorDegree && (
                        <p className="text-xs font-semibold text-blue-900 pl-6">
                          {branch.doctorDegree}
                        </p>
                      )}
                      {branch.doctorRole && (
                        <p className="text-[11px] text-blue-800/90 pl-6">
                          {branch.doctorRole}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Location & Address */}
                  <div className="flex items-start gap-3 text-slate-700">
                    <MapPin className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        {branch.addressHindi}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {branch.address}
                      </p>
                    </div>
                  </div>

                  {/* Contact Number & WhatsApp */}
                  <div className="flex items-center justify-between gap-3 text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
                    <div className="flex items-center gap-2">
                      <PhoneCall className="w-4 h-4 text-blue-700 shrink-0" />
                      <div>
                        <span className="text-[11px] font-semibold text-slate-500 block leading-none">हेल्पलाइन</span>
                        <a
                          href={`tel:${branch.phone}`}
                          className="text-sm font-extrabold text-[#000066] hover:text-blue-700 transition"
                        >
                          {branch.phone}
                        </a>
                      </div>
                    </div>
                    {branch.whatsapp && (
                      <a
                        href={`https://wa.me/91${branch.whatsapp}?text=${encodeURIComponent(`Hello ${branch.name}, I want to book an appointment.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-white" />
                        <span>Chat</span>
                      </a>
                    )}
                  </div>

                  {/* OPD Timings */}
                  <div className="flex items-start gap-3 text-slate-700">
                    <Clock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-slate-800">
                        {branch.timingsHindi}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {branch.timings}
                      </p>
                    </div>
                  </div>

                  {/* Services / Treatments Offered */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Key Services & Treatments
                    </p>
                    <ul className="grid grid-cols-1 gap-1.5">
                      {branch.services.map((service, sIdx) => (
                        <li key={sIdx} className="flex items-center gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#000066] shrink-0" />
                          <span className="line-clamp-1">{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Cashless Schemes Badge Strip */}
                  <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-50/60 to-slate-50 border border-emerald-100 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Govt. Empanelled Cashless Treatment</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {branch.schemes.map((scheme, scIdx) => (
                        <span
                          key={scIdx}
                          className="px-2.5 py-1 rounded-lg bg-white border border-emerald-200/70 text-[11px] font-bold text-slate-700 shadow-2xs"
                        >
                          {scheme}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-6 pt-0 space-y-2.5">
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`tel:${branch.phone}`}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#000066] text-xs font-bold transition border border-blue-200"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Call Helpline</span>
                  </a>

                  <a
                    href={branch.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition border border-slate-200"
                  >
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    <span>Directions</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </div>

                <Link
                  href="/appointment"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#000066] via-blue-900 to-blue-700 hover:from-blue-950 hover:to-blue-800 text-white text-xs sm:text-sm font-bold shadow-md shadow-[#000066]/20 hover:shadow-lg transition transform hover:-translate-y-0.5"
                >
                  <Calendar className="w-4 h-4 text-sky-200" />
                  <span>Book Appointment at this Branch</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { Award, ShieldCheck, HeartPulse, Clock, Sparkles, Users, Stethoscope, Star, CheckCircle } from 'lucide-react';
import { HospitalInfo } from '@/lib/types';

interface WhyChooseUsProps {
  hospital: HospitalInfo;
}

export default function WhyChooseUs({ hospital }: WhyChooseUsProps) {
  const stats = [
    { number: '15,000+', label: 'Happy Families & Patients', icon: Users },
    { number: '13+', label: 'Medical Specialities & Panel', icon: Award },
    { number: '24×7', label: 'Emergency, ICU, Lab & Pharmacy', icon: Clock },
    { number: '100%', label: 'Cashless & Empanelled Schemes', icon: ShieldCheck },
  ];

  const pillars = [
    {
      title: '13+ Speciality Senior Doctor Panel',
      desc: 'Expert consultants in General Medicine, Surgery, Orthopaedics, Gynaecology, Paediatrics, Cardiology, Urology and more.',
      icon: Award
    },
    {
      title: '24×7 ICU, HDU & Emergency Trauma Care',
      desc: 'Round-the-clock intensive care unit with advanced ventilators, multipara monitors, and rapid trauma resuscitation bay.',
      icon: HeartPulse
    },
    {
      title: 'Modular Operation Theatre & Diagnostic Imaging',
      desc: 'Laminar airflow surgical suites, C-Arm, digital X-Ray, Color Doppler 4D sonography, and automated pathology lab.',
      icon: Stethoscope
    },
    {
      title: 'Cashless Insurance & Empanelled Govt Schemes',
      desc: 'Seamless cashless admissions under ECHS, RGHS, MAA Yojana, ESIC, GIC and all leading private insurance TPAs.',
      icon: ShieldCheck
    }
  ];

  const testimonials = [
    {
      quote: "ऑक्सफोर्ड हॉस्पिटल में इमरजेंसी और आईसीयू की सुविधाएं बहुत ही बेहतरीन हैं। डॉक्टरों और नर्सिंग स्टाफ ने बहुत संवेदनशीलता से इलाज किया।",
      author: "Pooja Kanwar",
      location: "Fatehpur, Sikar",
      tag: "Critical Care"
    },
    {
      quote: "Oxford Hospital provides top-notch care. The 24/7 lab and rapid emergency response saved us precious time during trauma.",
      author: "Mohammad Imran",
      location: "Sikar",
      tag: "Emergency & Diagnostics"
    },
    {
      quote: "आरजीएचएस (RGHS) कैशलेस सुविधा और विशेषज्ञ डॉक्टरों का परामर्श बहुत ही सुविधाजनक और पारदर्शी रहा।",
      author: "Sunita Saini",
      location: "Nechwa, Sikar",
      tag: "Cashless RGHS"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Stats Counter Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white p-7 rounded-3xl border border-slate-200/90 text-center hover:border-blue-500 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group shadow-sm relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#000066] to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-14 h-14 bg-blue-50 text-[#000066] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#000066] group-hover:text-white transition-all shadow-xs ring-4 ring-blue-50/50">
                  <Icon className="w-7 h-7" />
                </div>
                <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-1.5 tracking-tight group-hover:text-[#000066] transition-colors">
                  {stat.number}
                </p>
                <p className="text-xs sm:text-sm font-bold text-slate-600">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Pillars of Excellence */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100 text-[#000066] text-xs font-extrabold uppercase tracking-wider shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Why Oxford Hospital</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Patient-First Healthcare Centered on Safety, Warmth & Quality
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              At <strong>Oxford Hospital</strong>, we believe every patient deserves top-tier medical expertise without having to travel to metro cities. We combine senior medical leadership with modern medical technology across Jhunjhunu, Rajgarh & Sultana.
            </p>

            <div className="space-y-4 pt-2">
              {pillars.map((pillar, i) => {
                const Icon = pillar.icon;
                return (
                  <div key={i} className="flex items-start gap-4 p-4.5 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-400 hover:shadow-lg transition-all duration-300 group shadow-xs">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#000066] to-blue-700 text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-base group-hover:text-[#000066] transition-colors">{pillar.title}</h4>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">{pillar.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hospital Building Image with Floating Badge */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="/images/gallery/oxford-reception.jpg"
                alt="Oxford Hospital"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <p className="text-xs font-bold text-sky-300 uppercase tracking-wider">Convenient Network Locations</p>
                <p className="text-lg font-bold">{hospital.address}, {hospital.city}</p>
                <p className="text-xs text-slate-300">Ambulance Bay, Spacious Parking, Lift & 24/7 Emergency Counter</p>
              </div>
            </div>

            {/* Float badge */}
            <div className="absolute -top-6 -right-6 hidden sm:flex bg-white p-4.5 rounded-2xl shadow-xl border border-slate-100 items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Daily OPD Available</p>
                <p className="text-sm font-extrabold text-slate-900">9:00 AM - 8:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Patient Testimonials */}
        <div className="bg-gradient-to-br from-slate-50 to-blue-50/40 rounded-3xl p-8 sm:p-14 border border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              What Our Patients Say (मरीजों के अनुभव)
            </h3>
            <p className="text-sm sm:text-base text-slate-600">
              Hear from families who trusted Oxford Hospital network for their health, surgery, and emergency care needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white p-7 rounded-3xl shadow-md border border-slate-200/80 flex flex-col justify-between space-y-5 hover:shadow-xl transition-all">
                <div className="space-y-3.5">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-700 italic leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">{t.author}</h5>
                    <p className="text-xs text-slate-500">{t.location}</p>
                  </div>
                  <span className="text-[11px] font-bold bg-blue-50 text-[#000066] px-3 py-1 rounded-full border border-blue-100">
                    {t.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

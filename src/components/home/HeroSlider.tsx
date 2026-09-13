'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Calendar,
  PhoneCall,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  MapPin,
  ShieldCheck,
  Stethoscope
} from 'lucide-react';
import { HeroSlide, HospitalInfo } from '@/lib/types';

interface HeroSliderProps {
  slides: HeroSlide[];
  hospital: HospitalInfo;
}

export default function HeroSlider({ slides, hospital }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (slides.length <= 1 || isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [slides.length, isPaused]);

  const slide = slides[current] || slides[0];

  return (
    <div
      className="relative bg-slate-950 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slide Carousel Track */}
      <div className="relative min-h-[500px] sm:min-h-[560px] lg:min-h-[620px] flex items-center justify-center">
        {slides.map((s, idx) => {
          const isActive = idx === current;
          const isSquare = s.imageUrl.includes('altaf') || s.imageUrl.includes('shekhawat');

          return (
            <div
              key={s.id || idx}
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Background ambient decorative glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-[#03091e] to-slate-950" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

              {/* Slide Content Container */}
              <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full h-full flex items-center justify-center">
                {isSquare ? (
                  /* Split Layout for Square Promotional Flyers */
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full max-w-6xl">
                    {/* Left/Graphic: Poster Image */}
                    <div className="lg:col-span-6 flex justify-center">
                      <Link
                        href={s.ctaLink || '/appointment'}
                        className="group relative block rounded-3xl overflow-hidden shadow-2xl border border-blue-900/60 bg-slate-900 transition-transform duration-300 hover:scale-[1.02] max-w-[420px] sm:max-w-[460px] w-full cursor-pointer ring-1 ring-white/10"
                      >
                        <img
                          src={s.imageUrl}
                          alt={s.title}
                          className="w-full h-auto object-contain rounded-3xl"
                        />
                        <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors pointer-events-none" />
                      </Link>
                    </div>

                    {/* Right: Companion Quick Consultation Card */}
                    <div className="lg:col-span-6 text-white space-y-6">
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-400/30 text-sky-300 text-xs sm:text-sm font-semibold backdrop-blur-md shadow-sm">
                        <Sparkles className="w-4 h-4 text-sky-300" />
                        <span>{s.badge || 'Oxford Specialist Consultation'}</span>
                      </div>

                      <div className="space-y-2">
                        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                          {s.title}
                        </h2>
                        {s.titleHindi && (
                          <h3 className="text-lg sm:text-xl font-bold text-sky-300">
                            {s.titleHindi}
                          </h3>
                        )}
                      </div>

                      <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                        {s.subtitle}
                      </p>

                      <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-blue-900/40 flex items-center gap-2 text-xs text-amber-300 font-semibold shadow-inner">
                        <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
                        <span>ECHS • RGHS • ESIC • CAPF • MAA Yojana Cashless Treatment</span>
                      </div>

                      {/* Action CTAs */}
                      <div className="flex flex-wrap items-center gap-4 pt-2">
                        <Link
                          href={s.ctaLink || '/appointment'}
                          className="bg-gradient-to-r from-[#000066] via-blue-900 to-blue-700 hover:from-blue-950 hover:to-blue-800 text-white font-bold px-6 py-3.5 rounded-2xl shadow-xl shadow-[#000066]/40 transition-all flex items-center gap-2.5 transform hover:-translate-y-0.5 text-sm border border-blue-400/20"
                        >
                          <Calendar className="w-4 h-4 text-sky-200" />
                          <span>{s.ctaText || 'Book Appointment Online'}</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>

                        <a
                          href={`tel:${hospital.emergencyPhone}`}
                          className="bg-slate-800/90 hover:bg-slate-800 text-white border border-slate-700 font-bold px-5 py-3.5 rounded-2xl backdrop-blur-md transition flex items-center gap-2 text-sm"
                        >
                          <PhoneCall className="w-4 h-4 text-rose-400 animate-pulse" />
                          <span>24/7 Helpline: {hospital.emergencyPhone}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Full-Width Landscape Promotional Banner Layout */
                  <div className="w-full max-w-6xl space-y-4">
                    <Link
                      href={s.ctaLink || '/appointment'}
                      className="group relative block rounded-3xl overflow-hidden shadow-2xl border border-blue-900/60 bg-slate-900 transition-transform duration-300 hover:scale-[1.01] cursor-pointer ring-1 ring-white/10"
                    >
                      <img
                        src={s.imageUrl}
                        alt={s.title}
                        className="w-full h-auto object-contain rounded-3xl max-h-[480px]"
                      />
                      <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors pointer-events-none" />
                    </Link>

                    {/* Quick Info Bar Below Wide Banner */}
                    <div className="bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm shadow-xl">
                      <div className="flex items-center gap-2 text-slate-300">
                        <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                        <span className="font-semibold">चूरू बाईपास तिराहा, झुंझुनूं (Churu Baipass Tiraha, Jhunjhunu)</span>
                      </div>
                      
                      <div className="flex items-center gap-4 font-bold">
                        <a href="tel:9460841406" className="text-sky-400 hover:text-sky-300 flex items-center gap-1.5">
                          <PhoneCall className="w-3.5 h-3.5 text-sky-400" />
                          <span>9460841406</span>
                        </a>
                        <Link
                          href="/appointment"
                          className="bg-[#000066] hover:bg-blue-900 text-white px-4 py-2 rounded-xl transition flex items-center gap-1.5 shadow-md"
                        >
                          <span>Book Appointment &rarr;</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Slide Navigation Arrows */}
        {slides.length > 1 && (
          <>
            <button
              onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-slate-900/80 hover:bg-[#000066] text-white border border-slate-700/80 backdrop-blur-md transition shadow-xl cursor-pointer"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-slate-900/80 hover:bg-[#000066] text-white border border-slate-700/80 backdrop-blur-md transition shadow-xl cursor-pointer"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </>
        )}

        {/* Slide Dots / Pagination Indicators */}
        {slides.length > 1 && (
          <div className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  idx === current
                    ? 'w-8 h-2.5 bg-sky-400 shadow-lg shadow-sky-400/50'
                    : 'w-2.5 h-2.5 bg-slate-600 hover:bg-slate-400'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Trust & Accreditations Highlights Strip */}
      <div className="relative z-25 bg-slate-900/90 border-y border-slate-800/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-6 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-bold text-white">⭐ 4.9/5 Rating</span>
              <span className="text-slate-400 hidden sm:inline">• 15,000+ Families Treated</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
              <span className="font-semibold text-sky-200">100% Cashless Treatment:</span>
              <span className="font-bold text-amber-300">ECHS • RGHS • MAA Yojana • ESIC</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span className="font-semibold text-slate-200">3 Hospital Centers: Jhunjhunu • Rajgarh • Sultana</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hospital Quick Action Cards Strip */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1: Book Appointment */}
          <Link
            href="/appointment"
            className="relative bg-white rounded-3xl p-6 shadow-xl border border-slate-100 hover:border-blue-400 hover:shadow-2xl hover:shadow-[#000066]/10 transition-all duration-300 transform hover:-translate-y-1.5 group overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#000066] to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-4">
              <div className="w-13 h-13 rounded-2xl bg-blue-50 text-[#000066] flex items-center justify-center group-hover:bg-[#000066] group-hover:text-white transition-all duration-300 shadow-sm ring-4 ring-blue-50/50">
                <Calendar className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-50 text-[#000066] border border-blue-100 group-hover:bg-blue-100 transition-colors">
                Instant Slot
              </span>
            </div>
            <h3 className="font-black text-slate-900 text-lg group-hover:text-[#000066] transition-colors leading-tight">
              Book Appointment
            </h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Select doctor, branch & get instant SMS/WhatsApp confirmation online
            </p>
            <div className="flex items-center gap-1 text-xs font-bold text-[#000066] mt-4 group-hover:gap-2 transition-all">
              <span>Book Doctor OPD</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          {/* Card 2: Find a Doctor */}
          <Link
            href="/doctors"
            className="relative bg-white rounded-3xl p-6 shadow-xl border border-slate-100 hover:border-sky-400 hover:shadow-2xl hover:shadow-sky-600/10 transition-all duration-300 transform hover:-translate-y-1.5 group overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-4">
              <div className="w-13 h-13 rounded-2xl bg-sky-50 text-sky-700 flex items-center justify-center group-hover:bg-sky-600 group-hover:text-white transition-all duration-300 shadow-sm ring-4 ring-sky-50/50">
                <Stethoscope className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-100 group-hover:bg-sky-100 transition-colors">
                Senior Panel
              </span>
            </div>
            <h3 className="font-black text-slate-900 text-lg group-hover:text-sky-700 transition-colors leading-tight">
              Find Our Doctors
            </h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Physicians, Gynecologists, Surgeons, Dental & Critical care consultants
            </p>
            <div className="flex items-center gap-1 text-xs font-bold text-sky-700 mt-4 group-hover:gap-2 transition-all">
              <span>View Specialists</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          {/* Card 3: 24/7 Emergency & ICU */}
          <a
            href={`tel:${hospital.emergencyPhone}`}
            className="relative bg-white rounded-3xl p-6 shadow-xl border border-slate-100 hover:border-rose-400 hover:shadow-2xl hover:shadow-rose-600/10 transition-all duration-300 transform hover:-translate-y-1.5 group overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-4">
              <div className="w-13 h-13 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition-all duration-300 shadow-sm ring-4 ring-rose-50/50">
                <PhoneCall className="w-6 h-6 animate-pulse" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-100 group-hover:bg-rose-100 transition-colors">
                24×7 Rapid Care
              </span>
            </div>
            <h3 className="font-black text-slate-900 text-lg group-hover:text-rose-600 transition-colors leading-tight">
              Emergency & ICU
            </h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Immediate trauma resuscitation, ICU admission & ambulance hotline
            </p>
            <div className="flex items-center gap-1 text-xs font-bold text-rose-600 mt-4 group-hover:gap-2 transition-all">
              <span>Call {hospital.emergencyPhone}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </a>

          {/* Card 4: Our Branches */}
          <a
            href="#branches"
            className="relative bg-white rounded-3xl p-6 shadow-xl border border-slate-100 hover:border-indigo-400 hover:shadow-2xl hover:shadow-indigo-600/10 transition-all duration-300 transform hover:-translate-y-1.5 group overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#000066] to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-4">
              <div className="w-13 h-13 rounded-2xl bg-indigo-50 text-[#000066] flex items-center justify-center group-hover:bg-[#000066] group-hover:text-white transition-all duration-300 shadow-sm ring-4 ring-indigo-50/50">
                <MapPin className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-50 text-[#000066] border border-indigo-100 group-hover:bg-indigo-100 transition-colors">
                3 Branches
              </span>
            </div>
            <h3 className="font-black text-slate-900 text-lg group-hover:text-[#000066] transition-colors leading-tight">
              Hospital Branches
            </h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Jhunjhunu (HQ), Rajgarh & Sultana branches with OPD & diagnostics
            </p>
            <div className="flex items-center gap-1 text-xs font-bold text-[#000066] mt-4 group-hover:gap-2 transition-all">
              <span>Locate Nearest Branch</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </a>

        </div>
      </div>
    </div>
  );
}

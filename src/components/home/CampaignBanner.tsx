'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, PhoneCall, MapPin, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { HospitalInfo } from '@/lib/types';

interface CampaignBannerProps {
  hospital: HospitalInfo;
}

export default function CampaignBanner({ hospital }: CampaignBannerProps) {
  const specialties = [
    'Physician',
    'Dental',
    'Eye Care',
    'Physiotherapy',
    'Gynae & Obstetric',
    'General Surgery'
  ];

  return (
    <section className="py-8 sm:py-12 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
        
        {/* Banner Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/80 text-sky-300 text-xs font-bold uppercase tracking-wider border border-blue-400/30 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Hospital Announcement</span>
            </div>
            <span className="hidden sm:inline-block text-xs text-slate-400 font-medium">
              चूरू बाईपास तिराहा, झुंझुनूं
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:9460841406"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-sky-400 hover:text-sky-300 transition"
            >
              <PhoneCall className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
              <span>हेल्पलाइन: 9460841406</span>
            </a>
          </div>
        </div>

        {/* Graphical Hospital Banner Card */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-slate-700 bg-white group">
          <Link href="/appointment" className="block relative cursor-pointer" title="Click to book an appointment">
            <img
              src="/images/oxford-banner.jpg"
              alt="Oxford Multispeciality Hospital - बेहतर इलाज की शुरुआत, सही जगह से।"
              className="w-full h-auto object-cover sm:object-contain transition-transform duration-500 group-hover:scale-[1.01]"
            />
            <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/10 transition-colors pointer-events-none" />
          </Link>

          {/* Bottom Interactive Action Strip */}
          <div className="bg-slate-950/95 border-t border-slate-800 px-4 sm:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Specialties & Location */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs">
              <div className="flex items-center gap-1 text-slate-400 font-semibold mr-1">
                <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>चूरू बाईपास तिराहा, झुंझुनूं</span>
              </div>
              <div className="h-4 w-px bg-slate-800 hidden sm:block" />
              {specialties.map((spec) => (
                <span
                  key={spec}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-medium text-[11px] sm:text-xs"
                >
                  {spec}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto justify-center">
              <Link
                href="/appointment"
                className="bg-gradient-to-r from-[#000066] to-blue-700 hover:from-blue-950 hover:to-blue-800 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-lg transition-all flex items-center gap-2 border border-blue-400/20"
              >
                <Calendar className="w-4 h-4 text-sky-200" />
                <span>Book Appointment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <a
                href="tel:9460841406"
                className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-sky-400" />
                <span>Call: 9460841406</span>
              </a>

              <a
                href="https://wa.me/919460841406"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm p-2.5 rounded-xl transition hidden sm:flex items-center justify-center"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

import React from 'react';
import Link from 'next/link';
import { Phone, Clock, Mail, MessageCircle, ShieldAlert, Sparkles, Lock, ShieldCheck } from 'lucide-react';
import { HospitalInfo } from '@/lib/types';

interface TopBarProps {
  hospital: HospitalInfo;
}

export default function TopBar({ hospital }: TopBarProps) {
  return (
    <div className="bg-slate-950 text-slate-200 text-xs border-b border-slate-800/80">
      {/* Top Announcement Strip */}
      {hospital.noticeBanner?.active && (
        <div className="bg-gradient-to-r from-[#000066] via-blue-900 to-indigo-950 text-white px-4 py-1.5 text-center text-xs font-semibold flex items-center justify-center gap-2 shadow-inner">
          <Sparkles className="w-3.5 h-3.5 shrink-0 text-yellow-300 animate-pulse" />
          <span className="truncate">
            <span className="bg-yellow-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase mr-1.5 shadow-sm">
              विशेष सूचना
            </span>
            {hospital.noticeBanner.textHindi || hospital.noticeBanner.text}
          </span>
          <Link
            href={hospital.noticeBanner.linkUrl || '/appointment'}
            className="ml-2 font-bold underline hover:text-yellow-200 shrink-0 text-[11px]"
          >
            अपॉइंटमेंट लें &rarr;
          </Link>
        </div>
      )}

      {/* Main TopBar Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-3">
        
        {/* Left Side: Emergency & Cashless Schemes */}
        <div className="flex items-center gap-2.5 sm:gap-4 overflow-hidden">
          {/* Emergency 24x7 Badge */}
          <a
            href={`tel:${hospital.emergencyPhone}`}
            className="flex items-center gap-1.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white px-3 py-1 rounded-full font-bold text-xs shrink-0 shadow-sm transition transform hover:scale-[1.02]"
          >
            <ShieldAlert className="w-3.5 h-3.5 animate-pulse" />
            <span className="hidden xs:inline">24×7 Trauma:</span>
            <span className="font-extrabold">{hospital.emergencyPhone}</span>
          </a>

          {/* Cashless Schemes Strip */}
          <div className="hidden lg:flex items-center gap-1.5 text-slate-300 text-[11px] bg-slate-900/90 border border-slate-800 px-2.5 py-0.5 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="text-slate-400 font-medium">Cashless:</span>
            <span className="text-amber-300 font-bold">ECHS • RGHS • MAA Yojana • ESIC</span>
          </div>

          {/* OPD Hours */}
          <div className="hidden md:flex items-center gap-1.5 text-slate-300 text-xs truncate">
            <Clock className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <span>OPD: <strong className="text-white">{hospital.opdTimingsHindi || '9:00 AM - 8:00 PM'}</strong></span>
          </div>
        </div>

        {/* Right Side: Branches shortcut, Contact & WhatsApp */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto">
          {/* Branches Quick Link */}
          <a
            href="/#branches"
            className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-sky-300 hover:text-sky-200 bg-blue-950/60 border border-blue-800/40 px-2.5 py-0.5 rounded-full transition"
          >
            <span>Jhunjhunu • Rajgarh • Sultana</span>
          </a>

          {/* Helpline Phone */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs">
            <Phone className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <a
              href={`tel:${hospital.phoneNumbers[0]}`}
              className="font-bold text-white hover:text-sky-300 transition"
            >
              {hospital.phoneNumbers[0]}
            </a>
          </div>

          {/* WhatsApp Direct Button */}
          <a
            href={`https://wa.me/91${hospital.whatsappNumber}?text=${encodeURIComponent(`Hello ${hospital.name}, I want to book an appointment.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 rounded-full text-xs font-bold transition shadow-sm"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white shrink-0" />
            <span>WhatsApp</span>
          </a>

          {/* Admin Login Button */}
          <Link
            href="/admin"
            className="flex items-center gap-1 text-slate-400 hover:text-white bg-slate-900/80 hover:bg-slate-800 px-2 py-1 rounded-lg text-xs font-semibold border border-slate-800 transition"
            title="Admin Management Panel"
          >
            <Lock className="w-3 h-3 text-sky-400" />
            <span className="hidden xs:inline">Admin</span>
          </Link>
        </div>

      </div>
    </div>
  );
}

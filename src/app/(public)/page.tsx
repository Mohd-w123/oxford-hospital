import React from 'react';
import { getSiteContent } from '@/lib/content-store';
import HeroSlider from '@/components/home/HeroSlider';
import OurBranches from '@/components/home/OurBranches';
import CampaignBanner from '@/components/home/CampaignBanner';
import SpecialitiesGrid from '@/components/home/SpecialitiesGrid';
import DoctorSpotlight from '@/components/home/DoctorSpotlight';
import FacilitiesTour from '@/components/home/FacilitiesTour';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import AppointmentForm from '@/components/shared/AppointmentForm';
import { Calendar, PhoneCall, ShieldAlert, Clock, MapPin, CheckCircle2, HeartHandshake } from 'lucide-react';
import Link from 'next/link';

export default async function HomePage() {
  const content = await getSiteContent();

  return (
    <div className="space-y-0">
      
      {/* 1. Hero Slider & Quick Action Cards */}
      <HeroSlider slides={content.heroSlides} hospital={content.hospital} />

      {/* 2. Our Branches Section (3 Cards from Hospital Banners) */}
      <OurBranches branches={content.branches} />

      {/* 3. Official Hospital Announcement Banner */}
      <CampaignBanner hospital={content.hospital} />

      {/* 3. Medical Specialties & Clinical Departments */}
      <SpecialitiesGrid services={content.services} />

      {/* 4. Doctors Showcase (Dr. Anjuman Sayyad & Panel) */}
      <DoctorSpotlight doctors={content.doctors} />

      {/* 5. Hospital Facilities & Infrastructure Tour */}
      <FacilitiesTour gallery={content.gallery} />

      {/* 6. Why Choose Us & Patient Testimonials */}
      <WhyChooseUs hospital={content.hospital} />

      {/* 7. Dedicated Appointment Section on Homepage */}
      <section className="py-20 sm:py-24 bg-gradient-to-b from-[#00004d] via-[#000066] to-[#020b1e] text-white relative overflow-hidden" id="book-appointment">
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Booking Info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/80 text-sky-300 text-xs font-bold uppercase tracking-wider border border-blue-400/30 shadow-2xs">
                <Calendar className="w-3.5 h-3.5" />
                <span>Fast & Easy OPD Consultation</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Book Your Doctor Consultation
              </h2>

              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                Consult with our senior specialists across our <strong>Jhunjhunu, Rajgarh & Sultana</strong> centers. Fill out the quick form below for prompt confirmation via phone/WhatsApp.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-4 bg-slate-900/90 p-4.5 rounded-2xl border border-blue-900/50 shadow-md">
                  <Clock className="w-6 h-6 text-sky-400 shrink-0" />
                  <div>
                    <p className="text-xs text-sky-300 font-bold uppercase tracking-wider">Daily OPD Hours</p>
                    <p className="text-sm font-extrabold text-white">{content.hospital.opdTimingsHindi || 'प्रातः 9:00 से सायं 8:00 बजे तक'}</p>
                    <p className="text-xs text-slate-300">{content.hospital.opdTimings || 'Monday - Sunday: 9:00 AM - 8:00 PM'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-slate-900/90 p-4.5 rounded-2xl border border-blue-900/50 shadow-md">
                  <PhoneCall className="w-6 h-6 text-sky-400 shrink-0" />
                  <div>
                    <p className="text-xs text-sky-300 font-bold uppercase tracking-wider">Direct Hospital Helpline</p>
                    <p className="text-sm font-extrabold text-white">{content.hospital.phoneNumbers.join(' / ')}</p>
                    <p className="text-xs text-slate-300">24×7 Trauma Helpline: {content.hospital.emergencyPhone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-slate-900/90 p-4.5 rounded-2xl border border-blue-900/50 shadow-md">
                  <MapPin className="w-6 h-6 text-sky-400 shrink-0" />
                  <div>
                    <p className="text-xs text-sky-300 font-bold uppercase tracking-wider">Headquarters & Network</p>
                    <p className="text-sm font-extrabold text-white">{content.hospital.address}</p>
                    <p className="text-xs text-slate-300">{content.hospital.city}, {content.hospital.state} - {content.hospital.pincode}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Appointment Form Card */}
            <div className="lg:col-span-7 bg-white text-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-100">
              <div className="mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">Patient Appointment Request</h3>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-50 text-[#000066]">
                    Instant Online OPD
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Please enter patient details for instant OPD scheduling & SMS confirmation</p>
              </div>

              <AppointmentForm
                doctors={content.doctors}
                services={content.services}
                whatsappNumber={content.hospital.whatsappNumber}
              />
            </div>

          </div>
        </div>
      </section>

      {/* 8. Google Maps & Location Directions Strip */}
      <section className="bg-slate-100 py-14 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center md:text-left">
              <span className="text-xs font-bold text-[#000066] uppercase tracking-wider">Hospital Location & Map Directions</span>
              <h4 className="text-lg sm:text-xl font-black text-slate-900">
                {content.hospital.name}, {content.hospital.address}, {content.hospital.city}
              </h4>
              <p className="text-xs sm:text-sm text-slate-500">
                Prime location at Churu Baipass Tiraha, Jhunjhunu with spacious parking, stretcher ramp, and 24-hour pharmacy & lab.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a
                href={content.hospital.googleMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-[#000066] to-blue-700 hover:from-blue-950 hover:to-blue-800 text-white font-extrabold px-6 py-3.5 rounded-2xl shadow-lg transition text-xs sm:text-sm flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-sky-300" />
                <span>Open Google Maps</span>
              </a>
              <Link
                href="/contact"
                className="bg-blue-50 text-[#000066] hover:bg-blue-100 font-bold px-5 py-3.5 rounded-2xl transition text-xs sm:text-sm border border-blue-200"
              >
                Contact Details
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

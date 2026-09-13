import React from 'react';
import { getSiteContent } from '@/lib/content-store';
import Link from 'next/link';
import { Award, ShieldCheck, HeartPulse, Clock, Sparkles, CheckCircle2, PhoneCall, Calendar, MapPin, Users } from 'lucide-react';

export default async function AboutPage() {
  const content = await getSiteContent();
  const { hospital, aboutPage } = content;

  // 100% Dynamic Content with seamless defaults
  const bannerTitle = aboutPage?.bannerTitle || 'Compassionate Care, Advanced Medicine';
  const bannerSubtitle =
    aboutPage?.bannerSubtitle ||
    `${hospital.name} (${hospital.hindiName}) is committed to elevating healthcare standards through expert clinical leadership and patient-centric services.`;
  const missionTitle = aboutPage?.missionTitle || 'Our Journey & Healthcare Mission';
  const storyParagraph1 =
    aboutPage?.storyParagraph1 ||
    `Founded with the vision to provide world-class multi-speciality, critical care, surgical, and emergency medical services to families, ${hospital.name} brings together experienced specialists across 13+ clinical disciplines.`;
  const storyParagraph2 =
    aboutPage?.storyParagraph2 ||
    'We specialize in 24×7 Emergency & Trauma Care, Intensive Care (ICU), High Dependency Unit (HDU), Modular Operation Theatres, CT Scan, Color Doppler Sonography, Diagnostic Lab, 24/7 Pharmacy, Ambulance, and cashless empanelments under ECHS, RGHS, MAA Yojana, ESIC, and GIC.';
  const features =
    aboutPage?.features && aboutPage.features.length > 0
      ? aboutPage.features
      : [
          '13+ Speciality Medical Panel',
          '24x7 Emergency, ICU & HDU',
          'Modern CT & 4D Color Doppler',
          'Modular Operation Theatres'
        ];
  const imageUrl = aboutPage?.imageUrl || '/images/gallery/oxford-reception.jpg';
  const doctorName = aboutPage?.doctorMessage?.doctorName || 'Dr. Hussain Khan';
  const designation = aboutPage?.doctorMessage?.designation || '(MBBS, MD Internal Medicine)';
  const subDesignation =
    aboutPage?.doctorMessage?.subDesignation ||
    `वरिष्ठ चिकित्सक (इंटरनल मेडिसिन) एवं मेडिकल टीम नेतृत्व | ${hospital.name}`;
  const leadershipQuote =
    aboutPage?.doctorMessage?.message ||
    `"Our single-minded aim at ${hospital.name} is to deliver top-tier multi-speciality healthcare, prompt trauma resuscitation, and advanced critical care for every patient. With our round-the-clock emergency, ICU, modular surgical suites, diagnostic facilities, and cashless insurance partnerships, we ensure that the people receive the highest standard of ethical medical care."`;
  const photoUrl = aboutPage?.doctorMessage?.photoUrl || '/images/doctors/doc-hussain.jpg';

  return (
    <div className="bg-slate-50 py-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#000066] via-blue-950 to-slate-950 text-white py-16 mb-12 border-b border-blue-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-900/60 text-sky-300 text-xs font-bold uppercase tracking-wider border border-blue-400/30 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>About {hospital.name}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            {bannerTitle}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto">
            {bannerSubtitle}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Story & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {missionTitle}
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              {storyParagraph1}
            </p>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              {storyParagraph2}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {features.map((feature, fIdx) => (
                <div key={fIdx} className="flex items-center gap-2 text-sm font-semibold text-slate-800 bg-white p-3 rounded-xl border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#000066] shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src={imageUrl}
                alt={`${hospital.name} About`}
                className="w-full h-auto object-cover max-h-[440px]"
              />
            </div>
          </div>
        </div>

        {/* Doctor Leadership Message */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4 flex justify-center">
              <div className="w-48 h-60 sm:w-56 sm:h-72 rounded-2xl overflow-hidden shadow-xl border-4 border-blue-400/30 bg-slate-100">
                <img
                  src={photoUrl}
                  alt={doctorName}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            <div className="md:col-span-8 space-y-4">
              <div className="inline-block bg-blue-100 text-[#000066] font-bold px-3 py-1 rounded-full text-xs uppercase shadow-2xs">
                Leadership Message (चिकित्सक सन्देश)
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                {doctorName} <span className="text-slate-500 text-lg font-normal">{designation}</span>
              </h3>
              <p className="text-xs font-bold text-[#000066]">
                {subDesignation}
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed italic">
                {leadershipQuote}
              </p>
              
              <div className="pt-2 flex items-center gap-4">
                <Link
                  href="/appointment"
                  className="bg-gradient-to-r from-[#000066] to-blue-700 hover:from-blue-950 hover:to-blue-800 text-white font-bold px-5 py-2.5 rounded-xl shadow-md text-sm transition"
                >
                  Book Consultation
                </Link>
                <Link
                  href="/doctors"
                  className="text-slate-700 hover:text-[#000066] font-semibold text-sm"
                >
                  View Full Medical Team &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center mb-10">
            Our Guiding Healthcare Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-3">
              <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center mx-auto">
                <HeartPulse className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900">Patient-Centric</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Every treatment plan is tailored to the physical and emotional well-being of the patient.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-3">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900">Safety & Hygiene</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Sterile modular OTs, HEPA air filtration, and stringent infection control protocols.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mx-auto">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900">24/7 Availability</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Round-the-clock emergency medical officers, trauma response, pharmacy, and diagnostic lab.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-3">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mx-auto">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900">Affordable Excellence</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Transparent charges, free checkup schemes for expectant mothers, and accessible care for all.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

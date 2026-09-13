import React from 'react';
import { getSiteContent } from '@/lib/content-store';
import FacilitiesTour from '@/components/home/FacilitiesTour';
import { Sparkles, Image as ImageIcon } from 'lucide-react';

export default async function GalleryPage() {
  const content = await getSiteContent();
  const { gallery, hospital } = content;

  return (
    <div className="bg-slate-50 py-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#000066] via-blue-950 to-slate-950 text-white py-16 mb-12 border-b border-blue-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-900/60 text-sky-300 text-xs font-bold uppercase tracking-wider border border-blue-400/30 shadow-2xs">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Hospital Photo Gallery</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            {hospital.name} Photo Gallery
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto">
            Explore authentic photos of our Main Reception, Oxford Diagnostic Center, IPD Patient Wards, Critical Care Monitoring, and Doctor OPD Suites.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FacilitiesTour gallery={gallery} showAll={true} hideViewAllLink={true} />
      </div>
    </div>
  );
}

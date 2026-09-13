'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  Plus,
  Edit2,
  Trash2,
  X,
  Save,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Sparkles,
  Building2,
  Users,
  Stethoscope,
  Image as ImageIcon,
  MapPin,
  Calendar,
  Layers,
  ArrowUpRight,
  Globe,
  Award,
  HeartPulse,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { CustomPage, AboutPageContent, SiteContent } from '@/lib/types';
import RichTextEditor from '@/components/admin/RichTextEditor';
import ImageUploader from '@/components/admin/ImageUploader';

interface CorePageInfo {
  title: string;
  url: string;
  description: string;
  adminLink: string;
  adminLabel: string;
  icon: any;
  badge: string;
  badgeColor: string;
}

const corePages: CorePageInfo[] = [
  {
    title: 'About Us',
    url: '/about',
    description: 'Hospital healthcare mission, journey in Sikar & Shekhawati, 13+ speciality panel overview, and clinical standards.',
    adminLink: '#about-editor',
    adminLabel: 'Edit About Us Below',
    icon: Building2,
    badge: 'Core Story Page',
    badgeColor: 'bg-teal-500/10 text-teal-400 border-teal-500/20'
  },
  {
    title: 'Specialities & Services',
    url: '/services',
    description: '24×7 Emergency, ICU, HDU, Modular OT, Diagnostic Lab, Pharmacy, and clinical departments overview.',
    adminLink: '/admin/services',
    adminLabel: 'Manage Services & Specialties',
    icon: Stethoscope,
    badge: 'Clinical Services',
    badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
  },
  {
    title: 'Our Doctors Panel',
    url: '/doctors',
    description: 'Doctor profiles, qualifications, medical specialities, OPD schedules, and consultation availability.',
    adminLink: '/admin/doctors',
    adminLabel: 'Manage Doctors Panel',
    icon: Users,
    badge: 'Medical Faculty',
    badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20'
  },
  {
    title: 'Hospital Facilities',
    url: '/facilities',
    description: 'Hospital infrastructure showcase including Modular OTs, ICU monitoring, Deluxe IPD wards, and diagnostics.',
    adminLink: '/admin/gallery',
    adminLabel: 'Manage Facility Content',
    icon: Layers,
    badge: 'Infrastructure',
    badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20'
  },
  {
    title: 'Photo Gallery',
    url: '/gallery',
    description: 'Categorized hospital photo tour covering OT, IPD wards, diagnostic centers, reception, and patient care areas.',
    adminLink: '/admin/gallery',
    adminLabel: 'Manage Photo Gallery',
    icon: ImageIcon,
    badge: 'Media Gallery',
    badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20'
  },
  {
    title: 'Contact & Location',
    url: '/contact',
    description: 'Hospital addresses in Sikar, Jhunjhunu, Rajgarh & Sultana, 24/7 helplines, WhatsApp, and Google Maps.',
    adminLink: '/admin/branches',
    adminLabel: 'Manage Branches & Contacts',
    icon: MapPin,
    badge: 'Contact & Maps',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20'
  },
  {
    title: 'Doctor Appointment',
    url: '/appointment',
    description: 'Online patient consultation booking form with automated database booking and instant WhatsApp connectivity.',
    adminLink: '/admin/appointments',
    adminLabel: 'View Patient Bookings',
    icon: Calendar,
    badge: 'Booking Portal',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
  },
  {
    title: 'Homepage Landing',
    url: '/',
    description: 'Hero slider banners, 3 hospital branches cards, announcement banner, and quick booking actions.',
    adminLink: '/admin/slider',
    adminLabel: 'Manage Slider & Home',
    icon: Sparkles,
    badge: 'Main Homepage',
    badgeColor: 'bg-teal-500/10 text-teal-400 border-teal-500/20'
  }
];

const defaultAbout: AboutPageContent = {
  bannerTitle: 'Compassionate Care, Advanced Medicine',
  bannerSubtitle: 'Oxford Hospital (ऑक्सफोर्ड हॉस्पिटल) is committed to elevating healthcare standards in Sikar, Rajasthan through expert clinical leadership and patient-centric services.',
  missionTitle: 'Our Journey & Healthcare Mission',
  storyParagraph1: 'Founded with the vision to provide world-class multi-speciality, critical care, surgical, and emergency medical services to families in Sikar and the Shekhawati region, Oxford Hospital brings together experienced specialists across 13+ clinical disciplines.',
  storyParagraph2: 'We specialize in 24×7 Emergency & Trauma Care, Intensive Care (ICU), High Dependency Unit (HDU), Modular Operation Theatres, CT Scan, Color Doppler Sonography, Diagnostic Lab, 24/7 Pharmacy, Ambulance, and cashless empanelments under ECHS, RGHS, MAA Yojana, ESIC, and GIC.',
  features: [
    '13+ Speciality Medical Panel',
    '24x7 Emergency, ICU & HDU',
    'Modern CT & 4D Color Doppler',
    'Modular Operation Theatres'
  ],
  imageUrl: '/images/gallery/oxford-reception.jpg',
  doctorMessage: {
    doctorName: 'Dr. Hussain Khan',
    designation: '(MBBS, MD Internal Medicine)',
    subDesignation: 'वरिष्ठ चिकित्सक (इंटरनल मेडिसिन) एवं मेडिकल टीम नेतृत्व | Oxford Hospital',
    message: '"Our single-minded aim at Oxford Hospital is to deliver top-tier multi-speciality healthcare, prompt trauma resuscitation, and advanced critical care for every patient. With our round-the-clock emergency, ICU, modular surgical suites, diagnostic facilities, and cashless insurance partnerships, we ensure that the people receive the highest standard of ethical medical care."',
    photoUrl: '/images/doctors/doc-hussain.jpg'
  }
};

export default function AdminPages() {
  const [activeTab, setActiveTab] = useState<'about' | 'core' | 'custom'>('about');
  const [pages, setPages] = useState<CustomPage[]>([]);
  const [content, setContent] = useState<SiteContent | null>(null);
  const [aboutData, setAboutData] = useState<AboutPageContent>(defaultAbout);
  const [loading, setLoading] = useState(true);
  const [editingPage, setEditingPage] = useState<CustomPage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [aboutSaving, setAboutSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const emptyPage: Omit<CustomPage, 'id' | 'lastUpdated'> = {
    slug: '',
    title: '',
    subtitle: '',
    content: '<h2>Page Heading</h2><p>Write detailed information about hospital services, maternity packages, or visitor guidelines here...</p>',
    metaDescription: '',
    published: true
  };

  const [formData, setFormData] = useState<any>(emptyPage);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/content');
      const data: SiteContent = await res.json();
      setContent(data);
      setPages(data.customPages || []);
      if (data.aboutPage) {
        setAboutData(data.aboutPage);
      }
    } catch (e) {
      setError('Failed to load page content');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleSaveAboutPage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;
    try {
      setAboutSaving(true);
      setMessage('');
      setError('');

      const updatedContent: SiteContent = {
        ...content,
        aboutPage: aboutData
      };

      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedContent)
      });

      if (!res.ok) throw new Error('Failed to save About Us content');

      setContent(updatedContent);
      setMessage('About Us page updated and saved to MongoDB Atlas!');
      setTimeout(() => setMessage(''), 4000);
    } catch (err: any) {
      setError(err.message || 'Failed to save');
    } finally {
      setAboutSaving(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingPage(null);
    setFormData(emptyPage);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (page: CustomPage) => {
    setEditingPage(page);
    setFormData(page);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this custom page?')) return;
    try {
      const res = await fetch(`/api/pages?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete page');
      setMessage('Page removed successfully');
      fetchContent();
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');

    try {
      const cleanedSlug = formData.slug
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

      const payload = {
        ...formData,
        slug: cleanedSlug
      };

      const method = editingPage ? 'PUT' : 'POST';
      const res = await fetch('/api/pages', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Failed to save custom page');

      setMessage(editingPage ? 'Page updated successfully!' : 'New page published!');
      setIsModalOpen(false);
      fetchContent();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-wider mb-1">
            <Globe className="w-4 h-4" />
            <span>Website Pages & CMS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            100% Dynamic Website Pages
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Directly edit the About Us page, inspect core website pages, or create new custom CMS pages.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start">
          <a
            href="/about"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-semibold px-3.5 py-2.5 rounded-xl border border-slate-700 transition flex items-center gap-1.5"
          >
            <span>View /about</span>
            <ArrowUpRight className="w-4 h-4 text-teal-400" />
          </a>

          <button
            onClick={handleOpenAdd}
            className="bg-teal-600 hover:bg-teal-500 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow transition flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Page</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2.5 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('about')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
            activeTab === 'about'
              ? 'bg-teal-600 text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>About Us Page (Direct Dynamic CMS)</span>
        </button>

        <button
          onClick={() => setActiveTab('core')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
            activeTab === 'core'
              ? 'bg-teal-600 text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>All Website Core Pages ({corePages.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('custom')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
            activeTab === 'custom'
              ? 'bg-teal-600 text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Custom Dynamic Pages ({pages.length})</span>
        </button>
      </div>

      {/* Notifications */}
      {message && (
        <div className="p-4 bg-teal-950/80 border border-teal-800 text-teal-300 rounded-2xl flex items-center gap-2 text-sm">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-950/80 border border-red-800 text-red-300 rounded-2xl flex items-center gap-2 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* TAB 1: 100% Dynamic About Us Page Editor */}
      {activeTab === 'about' && (
        <form onSubmit={handleSaveAboutPage} className="space-y-6">
          
          {/* Section 1: Header Banner */}
          <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-teal-400" />
                <h3 className="font-bold text-base text-white">About Page Header Banner</h3>
              </div>
              <span className="text-[11px] text-teal-400 font-semibold bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/20">
                Live on /about
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Banner Main Headline *
                </label>
                <input
                  type="text"
                  required
                  value={aboutData.bannerTitle}
                  onChange={(e) => setAboutData({ ...aboutData, bannerTitle: e.target.value })}
                  placeholder="Compassionate Care, Advanced Medicine"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Banner Subtitle / Statement
                </label>
                <input
                  type="text"
                  value={aboutData.bannerSubtitle}
                  onChange={(e) => setAboutData({ ...aboutData, bannerSubtitle: e.target.value })}
                  placeholder="Oxford Hospital is committed to elevating healthcare standards..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Journey & Healthcare Mission */}
          <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Building2 className="w-5 h-5 text-teal-400" />
              <h3 className="font-bold text-base text-white">Our Journey & Healthcare Mission</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Mission Section Heading *
                </label>
                <input
                  type="text"
                  required
                  value={aboutData.missionTitle}
                  onChange={(e) => setAboutData({ ...aboutData, missionTitle: e.target.value })}
                  placeholder="Our Journey & Healthcare Mission"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Story Paragraph 1 (Vision, specialties & leadership) *
                </label>
                <textarea
                  rows={3}
                  required
                  value={aboutData.storyParagraph1}
                  onChange={(e) => setAboutData({ ...aboutData, storyParagraph1: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Story Paragraph 2 (Services, ICU, OT & Cashless empanelments) *
                </label>
                <textarea
                  rows={3}
                  required
                  value={aboutData.storyParagraph2}
                  onChange={(e) => setAboutData({ ...aboutData, storyParagraph2: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              {/* 4 Feature Badges */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Key Feature Highlights (Checkmark points - one per line)
                </label>
                <textarea
                  rows={4}
                  value={aboutData.features.join('\n')}
                  onChange={(e) =>
                    setAboutData({
                      ...aboutData,
                      features: e.target.value.split('\n').filter((s) => s.trim() !== '')
                    })
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-teal-500"
                />
              </div>

              {/* About Showcase Photo */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-bold text-slate-300">
                  About Us Main Showcase Photo
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                  <div className="md:col-span-2">
                    <input
                      type="text"
                      value={aboutData.imageUrl}
                      onChange={(e) => setAboutData({ ...aboutData, imageUrl: e.target.value })}
                      placeholder="/images/gallery/oxford-reception.jpg or Cloudinary URL"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-teal-500 mb-3"
                    />
                    <ImageUploader
                      value={aboutData.imageUrl}
                      onChange={(url: string) => setAboutData({ ...aboutData, imageUrl: url })}
                      folder="oxford-hms/about"
                    />
                  </div>

                  <div className="rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 p-2 text-center">
                    <p className="text-[11px] text-slate-400 mb-1 font-semibold">Photo Preview</p>
                    <img
                      src={aboutData.imageUrl}
                      alt="About Preview"
                      className="w-full h-32 object-cover rounded-xl bg-black/40"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Leadership Message */}
          <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Users className="w-5 h-5 text-teal-400" />
              <h3 className="font-bold text-base text-white">Doctor Leadership Message (चिकित्सक सन्देश)</h3>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Doctor / Leader Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={aboutData.doctorMessage.doctorName}
                    onChange={(e) =>
                      setAboutData({
                        ...aboutData,
                        doctorMessage: { ...aboutData.doctorMessage, doctorName: e.target.value }
                      })
                    }
                    placeholder="Dr. Hussain Khan"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Degrees / Qualifications *
                  </label>
                  <input
                    type="text"
                    required
                    value={aboutData.doctorMessage.designation}
                    onChange={(e) =>
                      setAboutData({
                        ...aboutData,
                        doctorMessage: { ...aboutData.doctorMessage, designation: e.target.value }
                      })
                    }
                    placeholder="(MBBS, MD Internal Medicine)"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Sub-designation / Role in Hindi *
                </label>
                <input
                  type="text"
                  required
                  value={aboutData.doctorMessage.subDesignation}
                  onChange={(e) =>
                    setAboutData({
                      ...aboutData,
                      doctorMessage: { ...aboutData.doctorMessage, subDesignation: e.target.value }
                    })
                  }
                  placeholder="वरिष्ठ चिकित्सक (इंटरनल मेडिसिन) एवं मेडिकल टीम नेतृत्व"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Leadership Quote / Message (संदेश) *
                </label>
                <textarea
                  rows={4}
                  required
                  value={aboutData.doctorMessage.message}
                  onChange={(e) =>
                    setAboutData({
                      ...aboutData,
                      doctorMessage: { ...aboutData.doctorMessage, message: e.target.value }
                    })
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              {/* Leadership Doctor Photo */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-bold text-slate-300">
                  Doctor Photo
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                  <div className="md:col-span-2">
                    <input
                      type="text"
                      value={aboutData.doctorMessage.photoUrl}
                      onChange={(e) =>
                        setAboutData({
                          ...aboutData,
                          doctorMessage: { ...aboutData.doctorMessage, photoUrl: e.target.value }
                        })
                      }
                      placeholder="/images/doctors/doc-hussain.jpg or Cloudinary URL"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-teal-500 mb-3"
                    />
                    <ImageUploader
                      value={aboutData.doctorMessage.photoUrl}
                      onChange={(url: string) =>
                        setAboutData({
                          ...aboutData,
                          doctorMessage: { ...aboutData.doctorMessage, photoUrl: url }
                        })
                      }
                      folder="oxford-hms/doctors"
                    />
                  </div>

                  <div className="rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 p-2 text-center">
                    <p className="text-[11px] text-slate-400 mb-1 font-semibold">Doctor Photo</p>
                    <img
                      src={aboutData.doctorMessage.photoUrl}
                      alt="Doctor Preview"
                      className="w-full h-32 object-cover object-top rounded-xl bg-black/40"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Save Actions */}
          <div className="sticky bottom-6 z-20 flex items-center justify-end gap-3 bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-slate-800 shadow-2xl">
            <a
              href="/about"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white"
            >
              Preview /about Page &rarr;
            </a>

            <button
              type="submit"
              disabled={aboutSaving}
              className="flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-teal-600/30 transition text-sm disabled:opacity-50 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{aboutSaving ? 'Saving to Database...' : 'Save About Us Page'}</span>
            </button>
          </div>

        </form>
      )}

      {/* TAB 2: Built-in Core Pages */}
      {activeTab === 'core' && (
        <div className="space-y-4">
          <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>
              These <strong>8 core pages</strong> are built into the hospital website. Click <strong>&quot;View Live Page&quot;</strong> to see them, or <strong>&quot;Edit Content&quot;</strong> to manage their details.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {corePages.map((page, idx) => {
              const IconComponent = page.icon;

              return (
                <div
                  key={idx}
                  className="bg-slate-950 rounded-2xl p-5 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between space-y-4 shadow-sm group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 text-teal-400 flex items-center justify-center shrink-0">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-base group-hover:text-teal-300 transition-colors">
                            {page.title}
                          </h3>
                          <span className="font-mono text-[11px] text-teal-400">
                            {page.url}
                          </span>
                        </div>
                      </div>

                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${page.badgeColor}`}>
                        {page.badge}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {page.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <a
                      href={page.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800"
                    >
                      <span>View Live Page</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>

                    {page.url === '/about' ? (
                      <button
                        onClick={() => setActiveTab('about')}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-300 hover:text-white transition px-3.5 py-1.5 rounded-lg bg-teal-500/10 hover:bg-teal-600 border border-teal-500/20 cursor-pointer"
                      >
                        <span>Edit About Us Here &rarr;</span>
                      </button>
                    ) : (
                      <Link
                        href={page.adminLink}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-300 hover:text-white transition px-3.5 py-1.5 rounded-lg bg-teal-500/10 hover:bg-teal-600 border border-teal-500/20"
                      >
                        <span>{page.adminLabel}</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: Custom Dynamic Pages (CMS) */}
      {activeTab === 'custom' && (
        <div className="space-y-4">
          {pages.length === 0 ? (
            <div className="bg-slate-950 rounded-3xl p-12 border border-slate-800 text-center space-y-4 max-w-xl mx-auto shadow-xl">
              <div className="w-16 h-16 rounded-2xl bg-teal-500/10 text-teal-400 flex items-center justify-center mx-auto border border-teal-500/20">
                <FileText className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">No Custom Pages Created Yet</h3>
                <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                  Create custom informational web pages (such as Privacy Policy, Terms, Special Camp Guides, or FAQs) with full rich-text formatting.
                </p>
              </div>
              <div className="pt-2">
                <button
                  onClick={handleOpenAdd}
                  className="bg-teal-600 hover:bg-teal-500 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl shadow transition inline-flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Your First Custom Page</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pages.map((page) => (
                <div
                  key={page.id}
                  className="bg-slate-950 rounded-3xl p-6 border border-slate-800 shadow-md flex flex-col justify-between space-y-4 hover:border-slate-700 transition"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-teal-400 bg-teal-950/70 px-2 py-0.5 rounded border border-teal-800">
                        /page/{page.slug}
                      </span>
                      <span className="text-[11px] text-slate-400">Updated: {page.lastUpdated}</span>
                    </div>

                    <h3 className="text-lg font-bold text-white mt-3">{page.title}</h3>
                    {page.subtitle && (
                      <p className="text-xs text-slate-400 mt-1">{page.subtitle}</p>
                    )}

                    {/* Rich text snippet preview */}
                    <div
                      className="text-xs text-slate-400 mt-3 line-clamp-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800 prose prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: page.content }}
                    />
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <a
                      href={`/page/${page.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-teal-400 hover:text-teal-300 font-semibold"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>View Live Page</span>
                    </a>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEdit(page)}
                        className="p-2 text-slate-400 hover:text-teal-400 hover:bg-slate-900 rounded-lg transition cursor-pointer"
                        title="Edit Page"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(page.id)}
                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-900 rounded-lg transition cursor-pointer"
                        title="Delete Page"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modal: Create / Edit Dynamic Custom Page */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white">
                  {editingPage ? 'Edit Custom Page' : 'Create New Custom Page'}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Set page title, URL slug, and format the body content with rich text.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Page Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      setFormData({
                        ...formData,
                        title,
                        slug: editingPage ? formData.slug : title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
                      });
                    }}
                    placeholder="e.g. Health Schemes & Insurance Policy"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">URL Slug (e.g. /page/your-slug) *</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="health-schemes-policy"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-teal-400 font-mono focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Subtitle / Tagline (Optional)</label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="Short summary displayed under the title header"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">SEO Meta Description</label>
                <input
                  type="text"
                  value={formData.metaDescription}
                  onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  placeholder="Brief description for search engine previews"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Page Body Content (Rich Text) *</label>
                <RichTextEditor
                  value={formData.content}
                  onChange={(content) => setFormData({ ...formData, content })}
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-4 h-4 text-teal-600 rounded bg-slate-950 border-slate-800 focus:ring-teal-500"
                />
                <label htmlFor="published" className="text-xs text-slate-300 font-semibold cursor-pointer">
                  Publish page immediately to live website
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow transition flex items-center gap-2 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? 'Saving...' : 'Save & Publish'}</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}

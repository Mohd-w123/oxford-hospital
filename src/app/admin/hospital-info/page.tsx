'use client';

import React, { useEffect, useState } from 'react';
import {
  Building2,
  Save,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Sparkles,
  Navigation,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Eye,
  Image as ImageIcon,
  ChevronRight,
  Globe
} from 'lucide-react';
import { SiteContent, HospitalInfo, NavItem, SubNavItem } from '@/lib/types';
import ImageUploader from '@/components/admin/ImageUploader';

export default function AdminHospitalInfo() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [hospital, setHospital] = useState<HospitalInfo | null>(null);
  const [navigation, setNavigation] = useState<NavItem[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const defaultNavItems: NavItem[] = [
    { id: 'nav-1', name: 'Home', href: '/', enabled: true, order: 1 },
    { id: 'nav-2', name: 'About Us', href: '/about', enabled: true, order: 2 },
    { id: 'nav-3', name: 'Our Doctors', href: '/doctors', enabled: true, order: 3 },
    {
      id: 'nav-4',
      name: 'Specialities & Services',
      href: '/services',
      enabled: true,
      order: 4,
      subItems: [
        { id: 'sub-1', name: 'Obstetrics & Gynaecology', href: '/services#serv-obg-gynae' },
        { id: 'sub-2', name: 'General Physician', href: '/services#serv-general-physician' },
        { id: 'sub-3', name: 'Color Doppler Sonography', href: '/services#serv-sonography-doppler' },
        { id: 'sub-4', name: 'Modular Operation Theatre (OT)', href: '/services#serv-modular-ot' },
        { id: 'sub-5', name: 'In-Patient (IPD) & Wards', href: '/services#serv-ipd-ward' },
        { id: 'sub-6', name: '24/7 Lab & Pharmacy', href: '/services#serv-lab-pharma' }
      ]
    },
    { id: 'nav-5', name: 'Facilities', href: '/facilities', enabled: true, order: 5 },
    { id: 'nav-6', name: 'Photo Gallery', href: '/gallery', enabled: true, order: 6 },
    { id: 'nav-7', name: 'Contact Us', href: '/contact', enabled: true, order: 7 }
  ];

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data: SiteContent) => {
        setContent(data);
        setHospital(data.hospital);
        setNavigation(data.navigation && data.navigation.length > 0 ? data.navigation : defaultNavItems);
      })
      .catch((e) => setError('Failed to fetch hospital settings'));
  }, []);

  const handleAddNavItem = () => {
    const newItem: NavItem = {
      id: `nav-${Date.now()}`,
      name: 'New Menu Link',
      href: '/page/...',
      enabled: true,
      order: navigation.length + 1,
      subItems: []
    };
    setNavigation([...navigation, newItem]);
  };

  const handleUpdateNavItem = (index: number, field: keyof NavItem, value: any) => {
    const updated = [...navigation];
    updated[index] = { ...updated[index], [field]: value };
    setNavigation(updated);
  };

  const handleDeleteNavItem = (index: number) => {
    const updated = navigation.filter((_, i) => i !== index);
    setNavigation(updated);
  };

  const handleMoveNav = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === navigation.length - 1)) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const updated = [...navigation];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    const reordered = updated.map((item, idx) => ({ ...item, order: idx + 1 }));
    setNavigation(reordered);
  };

  // Submenu Handlers
  const handleAddSubItem = (navIndex: number) => {
    const updated = [...navigation];
    const currentSub = updated[navIndex].subItems || [];
    const newSub: SubNavItem = {
      id: `sub-${Date.now()}`,
      name: 'Submenu Item',
      href: '/page/...'
    };
    updated[navIndex].subItems = [...currentSub, newSub];
    setNavigation(updated);
  };

  const handleUpdateSubItem = (navIndex: number, subIndex: number, field: keyof SubNavItem, value: string) => {
    const updated = [...navigation];
    if (!updated[navIndex].subItems) return;
    const subItems = [...updated[navIndex].subItems!];
    subItems[subIndex] = { ...subItems[subIndex], [field]: value };
    updated[navIndex].subItems = subItems;
    setNavigation(updated);
  };

  const handleDeleteSubItem = (navIndex: number, subIndex: number) => {
    const updated = [...navigation];
    if (!updated[navIndex].subItems) return;
    updated[navIndex].subItems = updated[navIndex].subItems!.filter((_, i) => i !== subIndex);
    setNavigation(updated);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content || !hospital) return;
    setSaving(true);
    setMessage('');
    setError('');

    try {
      const updatedContent: SiteContent = {
        ...content,
        hospital: hospital,
        navigation: navigation
      };

      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedContent)
      });

      if (!res.ok) throw new Error('Failed to update hospital info');
      setMessage('Hospital details, Logos, Google Maps, Menus & Submenus saved successfully!');
    } catch (err: any) {
      setError(err.message || 'Error saving settings');
    } finally {
      setSaving(false);
    }
  };

  if (!hospital) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Hospital Settings & Dynamic CMS</span>
          <h1 className="text-2xl font-extrabold text-white">Manage Hospital Info, Logos, Menus & Maps</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Control header & footer logos, navigation menus with submenus, Google Maps embed, phone numbers, and timings.
          </p>
        </div>
      </div>

      {message && (
        <div className="p-4 bg-blue-950/80 border border-blue-800 text-sky-300 rounded-2xl flex items-center gap-2 text-sm">
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

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* 1. Hospital Identity & Header Branding */}
        <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Building2 className="w-5 h-5 text-sky-400" />
            <h3 className="font-bold text-base text-white">Hospital Identity & Header Branding</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Hospital Name (English)
              </label>
              <input
                type="text"
                required
                value={hospital.name || ''}
                onChange={(e) => setHospital({ ...hospital, name: e.target.value })}
                placeholder="Oxford Hospital"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Displayed in the main header (first word in dark, remainder in teal)
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Hospital Name (Hindi)
              </label>
              <input
                type="text"
                value={hospital.hindiName || ''}
                onChange={(e) => setHospital({ ...hospital, hindiName: e.target.value })}
                placeholder="ऑक्सफोर्ड हॉस्पिटल"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Header Tagline / Subtitle
              </label>
              <input
                type="text"
                value={hospital.tagline || ''}
                onChange={(e) => setHospital({ ...hospital, tagline: e.target.value })}
                placeholder="Multi-Speciality & Critical Care"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Displayed directly below the hospital name in the header
              </span>
            </div>

            <div className="md:col-span-3">
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Website Title (Browser Tab & SEO Title)
              </label>
              <input
                type="text"
                value={hospital.websiteTitle || ''}
                onChange={(e) => setHospital({ ...hospital, websiteTitle: e.target.value })}
                placeholder={`${hospital.name}${hospital.hindiName ? ` (${hospital.hindiName})` : ''} | ${hospital.tagline || 'Multi-Speciality Hospital'} - ${hospital.city || 'Jhunjhunu'}`}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                The main title shown on the browser tab and search engines. (Leave blank to auto-generate from hospital name, tagline and city).
              </span>
            </div>
          </div>
        </div>

        {/* 2. Header, Footer & Favicon Branding */}
        <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <ImageIcon className="w-5 h-5 text-sky-400" />
            <h3 className="font-bold text-base text-white">Header, Footer & Favicon Logo Settings</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Header Logo */}
            <div className="space-y-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
              <ImageUploader
                value={hospital.logoUrl || ''}
                onChange={(url) => setHospital({ ...hospital, logoUrl: url })}
                label="Header Logo (Cloudinary - oxford-hms/branding)"
                folder="oxford-hms/branding"
              />
              <div className="pt-2">
                <span className="text-[11px] text-slate-400 block mb-1">Live Header Preview:</span>
                <div className="bg-white p-2.5 rounded-xl border border-slate-300 inline-block">
                  <img
                    src={hospital.logoUrl || '/images/logo.png'}
                    alt="Header Logo"
                    className="h-10 w-auto object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Footer Logo */}
            <div className="space-y-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
              <ImageUploader
                value={hospital.footerLogoUrl || hospital.logoUrl || ''}
                onChange={(url) => setHospital({ ...hospital, footerLogoUrl: url })}
                label="Footer Logo (Cloudinary - oxford-hms/branding)"
                folder="oxford-hms/branding"
              />
              <div className="pt-2">
                <span className="text-[11px] text-slate-400 block mb-1">Live Footer Preview:</span>
                <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-700 inline-block">
                  <img
                    src={hospital.footerLogoUrl || hospital.logoUrl || '/images/logo.png'}
                    alt="Footer Logo"
                    className="h-10 w-auto object-contain bg-white p-1 rounded"
                  />
                </div>
              </div>
            </div>

            {/* Browser Favicon */}
            <div className="space-y-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
              <ImageUploader
                value={hospital.faviconUrl || ''}
                onChange={(url) => setHospital({ ...hospital, faviconUrl: url })}
                label="Browser Favicon Icon (.ico, .png, .svg)"
                folder="oxford-hms/branding"
              />
              <div className="pt-2">
                <span className="text-[11px] text-slate-400 block mb-1">Live Browser Tab Simulation:</span>
                <div className="bg-slate-900 px-3 py-2 rounded-xl border border-slate-700 flex items-center gap-2 max-w-full">
                  <img
                    src={hospital.faviconUrl || hospital.logoUrl || '/favicon.ico'}
                    alt="Favicon"
                    className="w-4 h-4 object-contain rounded shrink-0 bg-white/20 p-0.5"
                  />
                  <span className="text-xs text-slate-200 font-medium truncate">
                    {hospital.websiteTitle || `${hospital.name} (${hospital.hindiName}) | ${hospital.city || 'Jhunjhunu'}`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Website Navigation Menus & Submenus */}
        <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Navigation className="w-5 h-5 text-sky-400" />
                <h3 className="font-bold text-base text-white">Website Navigation Menus & Submenus</h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Add, rename, reorder menu items, and attach dropdown submenus to any menu link!
              </p>
            </div>

            <button
              type="button"
              onClick={handleAddNavItem}
              className="bg-slate-900 hover:bg-slate-800 text-sky-300 text-xs font-bold px-3.5 py-2 rounded-xl border border-slate-700 flex items-center gap-1.5 self-start cursor-pointer transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add Top Menu Link</span>
            </button>
          </div>

          <div className="space-y-4">
            {navigation.map((item, navIndex) => (
              <div
                key={item.id || navIndex}
                className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-3"
              >
                {/* Main Menu Row */}
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleMoveNav(navIndex, 'up')}
                      disabled={navIndex === 0}
                      title="Move Up"
                      className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 cursor-pointer"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMoveNav(navIndex, 'down')}
                      disabled={navIndex === navigation.length - 1}
                      title="Move Down"
                      className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 cursor-pointer"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <label className="flex items-center gap-1.5 cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={item.enabled !== false}
                      onChange={(e) => handleUpdateNavItem(navIndex, 'enabled', e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 bg-slate-950 border-slate-700"
                    />
                    <span className="text-xs text-slate-400">Show</span>
                  </label>

                  <div className="flex-1 w-full sm:w-auto">
                    <input
                      type="text"
                      required
                      value={item.name}
                      onChange={(e) => handleUpdateNavItem(navIndex, 'name', e.target.value)}
                      placeholder="Menu Name (e.g. Specialities & Services)"
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-white font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="flex-1 w-full sm:w-auto">
                    <input
                      type="text"
                      required
                      value={item.href}
                      onChange={(e) => handleUpdateNavItem(navIndex, 'href', e.target.value)}
                      placeholder="Link URL (/services or /page/...)"
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-sky-300 font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAddSubItem(navIndex)}
                    className="text-xs font-semibold bg-[#000066]/80 text-sky-300 hover:bg-blue-900 px-2.5 py-1.5 rounded-lg border border-blue-800 flex items-center gap-1 shrink-0 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>+ Submenu</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteNavItem(navIndex)}
                    title="Remove this menu link"
                    className="p-1.5 text-slate-500 hover:text-red-400 transition cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Nested Submenus List */}
                {item.subItems && item.subItems.length > 0 && (
                  <div className="pl-6 sm:pl-10 space-y-2 border-l-2 border-blue-500 ml-4 py-2">
                    <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider block">
                      Dropdown Submenu Items:
                    </span>
                    {item.subItems.map((sub, subIndex) => (
                      <div key={sub.id || subIndex} className="flex items-center gap-2">
                        <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <input
                          type="text"
                          required
                          value={sub.name}
                          onChange={(e) => handleUpdateSubItem(navIndex, subIndex, 'name', e.target.value)}
                          placeholder="Submenu Label (e.g. Normal Delivery)"
                          className="flex-1 px-3 py-1 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <input
                          type="text"
                          required
                          value={sub.href}
                          onChange={(e) => handleUpdateSubItem(navIndex, subIndex, 'href', e.target.value)}
                          placeholder="Link URL (/services#serv-obg-gynae)"
                          className="flex-1 px-3 py-1 bg-slate-950 border border-slate-700 rounded-lg text-xs text-sky-300 font-mono focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => handleDeleteSubItem(navIndex, subIndex)}
                          className="p-1 text-slate-500 hover:text-red-400"
                          title="Delete submenu item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 3. Google Maps Settings */}
        <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-sky-400" />
              <h3 className="font-bold text-base text-white">Google Maps Integration</h3>
            </div>

            <button
              type="button"
              onClick={() => {
                const query = encodeURIComponent(`${hospital.name} ${hospital.address} ${hospital.city} ${hospital.state} ${hospital.pincode}`.trim());
                setHospital({
                  ...hospital,
                  googleMapEmbedUrl: `https://maps.google.com/maps?q=${query}&output=embed`
                });
              }}
              className="text-xs font-semibold bg-[#000066]/80 text-sky-300 hover:bg-blue-900 border border-blue-800 px-3 py-1.5 rounded-xl flex items-center gap-1.5 self-start cursor-pointer transition"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Auto-Generate Embed from Address</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Google Maps Direct Link URL (Opens when users click 'Directions')
              </label>
              <input
                type="text"
                value={hospital.googleMapUrl || ''}
                onChange={(e) => setHospital({ ...hospital, googleMapUrl: e.target.value })}
                placeholder="https://maps.google.com/?q=..."
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-sky-300 font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Paste your Google Maps link or share link (e.g. https://maps.google.com/... or https://share.google/...)
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Google Maps Embed Iframe URL (For interactive live map on contact page)
              </label>
              <input
                type="text"
                value={hospital.googleMapEmbedUrl || ''}
                onChange={(e) => {
                  let val = e.target.value.trim();
                  // If admin pasted entire <iframe> code, extract the src
                  if (val.includes('<iframe')) {
                    const match = val.match(/src=["']([^"']+)["']/);
                    if (match) val = match[1];
                  }
                  setHospital({ ...hospital, googleMapEmbedUrl: val });
                }}
                placeholder="https://maps.google.com/maps?q=...&output=embed"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-sky-300 font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Supports official Google Embed URL, full &lt;iframe&gt; code, or click &quot;Auto-Generate Embed from Address&quot; above.
              </span>
            </div>

            {/* Live Map Preview */}
            <div className="mt-2 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
              <span className="text-xs font-semibold text-slate-300 block mb-2">Live Map Preview:</span>
              <div className="h-48 w-full rounded-xl overflow-hidden border border-slate-700 bg-slate-950">
                <iframe
                  src={
                    hospital.googleMapEmbedUrl && (hospital.googleMapEmbedUrl.includes('/embed') || hospital.googleMapEmbedUrl.includes('output=embed'))
                      ? hospital.googleMapEmbedUrl
                      : `https://maps.google.com/maps?q=${encodeURIComponent(`${hospital.name} ${hospital.address} ${hospital.city}`)}&output=embed`
                  }
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  title="Admin Map Preview"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 4. Footer Texts & Descriptions */}
        <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Building2 className="w-5 h-5 text-sky-400" />
            <h3 className="font-bold text-base text-white">Footer Content & Copyright</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Footer About Hospital Text</label>
              <textarea
                rows={3}
                value={hospital.footerAboutText || ''}
                onChange={(e) => setHospital({ ...hospital, footerAboutText: e.target.value })}
                placeholder="Oxford Hospital is committed to providing world-class, compassionate healthcare in Sikar..."
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Footer Copyright Text</label>
              <input
                type="text"
                value={hospital.footerCopyrightText || ''}
                onChange={(e) => setHospital({ ...hospital, footerCopyrightText: e.target.value })}
                placeholder="All Rights Reserved. Oxford Hospital, Sikar."
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* 5. Contact Numbers & OPD Timings */}
        <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="font-bold text-base text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-sky-400" />
            <span>OPD Timings & Contact Helplines</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">OPD Timings (Hindi)</label>
              <input
                type="text"
                value={hospital.opdTimingsHindi}
                onChange={(e) => setHospital({ ...hospital, opdTimingsHindi: e.target.value })}
                placeholder="सुबह 9 बजे से शाम 8 बजे"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">OPD Timings (English)</label>
              <input
                type="text"
                value={hospital.opdTimings}
                onChange={(e) => setHospital({ ...hospital, opdTimings: e.target.value })}
                placeholder="9:00 AM to 8:00 PM (Daily)"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Official Mobile Numbers (comma separated)</label>
              <input
                type="text"
                value={hospital.phoneNumbers.join(', ')}
                onChange={(e) =>
                  setHospital({
                    ...hospital,
                    phoneNumbers: e.target.value.split(',').map((s) => s.trim())
                  })
                }
                placeholder="01572 299062, 9571177525, 8769750999"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp Number (10 digits without +91)</label>
              <input
                type="text"
                value={hospital.whatsappNumber}
                onChange={(e) => setHospital({ ...hospital, whatsappNumber: e.target.value })}
                placeholder="9571177525"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">24/7 Emergency Phone</label>
              <input
                type="text"
                value={hospital.emergencyPhone}
                onChange={(e) => setHospital({ ...hospital, emergencyPhone: e.target.value })}
                placeholder="9571177525"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Official Email ID</label>
              <input
                type="email"
                value={hospital.email}
                onChange={(e) => setHospital({ ...hospital, email: e.target.value })}
                placeholder="oxfordhospitalsikar@gmail.com"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* 6. Hospital Address & Location */}
        <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="font-bold text-base text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-sky-400" />
            <span>Hospital Physical Address</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-3">
              <label className="block text-xs font-semibold text-slate-300 mb-1">Address / Landmark</label>
              <input
                type="text"
                value={hospital.address}
                onChange={(e) => setHospital({ ...hospital, address: e.target.value })}
                placeholder="Madani Mahal, Fatehpur Road, Ward No. 1"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">City</label>
              <input
                type="text"
                value={hospital.city}
                onChange={(e) => setHospital({ ...hospital, city: e.target.value })}
                placeholder="Sikar"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">State</label>
              <input
                type="text"
                value={hospital.state}
                onChange={(e) => setHospital({ ...hospital, state: e.target.value })}
                placeholder="Rajasthan"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Pincode</label>
              <input
                type="text"
                value={hospital.pincode}
                onChange={(e) => setHospital({ ...hospital, pincode: e.target.value })}
                placeholder="332001"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* 7. Save All Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-gradient-to-r from-[#000066] to-blue-700 hover:from-blue-950 hover:to-blue-800 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-blue-900/40 transition flex items-center gap-2 disabled:opacity-50 cursor-pointer text-sm"
          >
            {saving ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save All Settings, Logos, Menus & Maps</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}

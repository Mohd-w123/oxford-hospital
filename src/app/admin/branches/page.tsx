'use client';

import React, { useEffect, useState } from 'react';
import {
  Building2,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  AlertCircle,
  Edit,
  ExternalLink,
  MapPin,
  PhoneCall,
  Clock,
  Sparkles,
  Stethoscope,
  ShieldCheck
} from 'lucide-react';
import { Branch, SiteContent } from '@/lib/types';

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

export default function AdminBranches() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data: SiteContent) => {
        setContent(data);
        if (data.branches && data.branches.length > 0) {
          setBranches(data.branches);
        } else {
          setBranches(defaultBranchesList);
        }
      })
      .catch(() => setError('Failed to load branches'))
      .finally(() => setLoading(false));
  }, []);

  const handleAddBranch = () => {
    const newBranch: Branch = {
      id: `branch-${Date.now()}`,
      name: 'Oxford Hospital Branch',
      hindiName: 'ऑक्सफोर्ड हॉस्पिटल नई शाखा',
      badge: 'New Branch / नई शाखा',
      tagline: '24x7 Multi-Speciality Care',
      address: 'Branch Address, City, Rajasthan',
      addressHindi: 'शाखा पता, शहर, राजस्थान',
      phone: '9460841406',
      whatsapp: '9460841406',
      timings: 'Daily OPD 9:00 AM - 8:00 PM',
      timingsHindi: 'दैनिक ओपीडी 9:00 AM - 8:00 PM',
      services: ['General Medicine', 'Specialist Consultation'],
      schemes: ['ECHS', 'RGHS', 'ESIC', 'MAA Yojana'],
      googleMapsUrl: 'https://maps.google.com'
    };
    const updated = [...branches, newBranch];
    setBranches(updated);
    setEditingIndex(updated.length - 1);
  };

  const handleUpdateBranch = (index: number, field: keyof Branch, value: any) => {
    const updated = [...branches];
    updated[index] = { ...updated[index], [field]: value };
    setBranches(updated);
  };

  const handleDeleteBranch = (index: number) => {
    if (!confirm('Are you sure you want to remove this branch from the website?')) return;
    const updated = branches.filter((_, i) => i !== index);
    setBranches(updated);
    if (editingIndex === index) setEditingIndex(null);
  };

  const handleSaveAll = async () => {
    if (!content) return;
    try {
      setSaving(true);
      setMessage('');
      setError('');

      const updatedContent: SiteContent = {
        ...content,
        branches: branches
      };

      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedContent)
      });

      if (!res.ok) throw new Error('Failed to save branches');

      setContent(updatedContent);
      setMessage('Hospital branches updated and saved to MongoDB Atlas!');
      setTimeout(() => setMessage(''), 4000);
    } catch (e: any) {
      setError(e.message || 'Error saving branches');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-10 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-wider mb-1">
            <Building2 className="w-4 h-4" />
            <span>Hospital Network CMS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Hospital Branches Management
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage contact numbers, addresses, specialist doctors, OPD hours, and locations for all branches.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleAddBranch}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold px-4 py-2.5 rounded-xl border border-slate-700 transition text-sm cursor-pointer"
          >
            <Plus className="w-4 h-4 text-sky-400" />
            <span>Add Branch</span>
          </button>

          <button
            onClick={handleSaveAll}
            disabled={saving}
            className="flex items-center gap-2 bg-gradient-to-r from-[#000066] to-blue-700 hover:from-blue-950 hover:to-blue-800 text-white font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-blue-900/30 transition text-sm disabled:opacity-50 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save All Changes'}</span>
          </button>
        </div>
      </div>

      {/* Toast notifications */}
      {message && (
        <div className="p-4 rounded-xl bg-blue-950/80 border border-blue-800 text-sky-300 flex items-center gap-3 text-sm">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 flex items-center gap-3 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Branches List */}
      <div className="space-y-6">
        {branches.map((branch, index) => {
          const isEditing = editingIndex === index;

          return (
            <div
              key={branch.id || index}
              className={`rounded-2xl border ${
                isEditing ? 'border-blue-600/60 bg-slate-900/90' : 'border-slate-800 bg-slate-900/50'
              } overflow-hidden transition-all`}
            >
              {/* Branch Header Row */}
              <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-800/40">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#000066] text-sky-300 font-bold flex items-center justify-center shrink-0 border border-blue-800/60">
                    <Building2 className="w-5 h-5" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white text-base">
                        {branch.hindiName} ({branch.name})
                      </h3>
                      {branch.isMainBranch && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-amber-400 text-slate-950">
                          Main Branch
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
                      <span className="flex items-center gap-1 text-rose-400">
                        <MapPin className="w-3.5 h-3.5" />
                        {branch.addressHindi}
                      </span>
                      <span className="flex items-center gap-1 text-sky-400">
                        <PhoneCall className="w-3.5 h-3.5" />
                        {branch.phone}
                      </span>
                      {branch.doctorName && (
                        <span className="flex items-center gap-1 text-blue-300">
                          <Stethoscope className="w-3.5 h-3.5" />
                          {branch.doctorName}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-auto">
                  <button
                    onClick={() => setEditingIndex(isEditing ? null : index)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      isEditing
                        ? 'bg-gradient-to-r from-[#000066] to-blue-700 text-white shadow-sm'
                        : 'bg-slate-800 hover:bg-slate-700 text-sky-300'
                    }`}
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>{isEditing ? 'Close' : 'Edit Branch'}</span>
                  </button>

                  <button
                    onClick={() => handleDeleteBranch(index)}
                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition cursor-pointer"
                    title="Delete Branch"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Edit Drawer */}
              {isEditing && (
                <div className="p-6 border-t border-slate-800 space-y-6 bg-slate-950/40">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    
                    {/* English Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        Branch Name (English)
                      </label>
                      <input
                        type="text"
                        value={branch.name}
                        onChange={(e) => handleUpdateBranch(index, 'name', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* Hindi Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        Branch Name (Hindi)
                      </label>
                      <input
                        type="text"
                        value={branch.hindiName}
                        onChange={(e) => handleUpdateBranch(index, 'hindiName', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* Badge */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        Badge Label (e.g. Main Branch / Rajgarh Branch)
                      </label>
                      <input
                        type="text"
                        value={branch.badge}
                        onChange={(e) => handleUpdateBranch(index, 'badge', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* Tagline */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        Branch Tagline / Operating Note
                      </label>
                      <input
                        type="text"
                        value={branch.tagline || ''}
                        onChange={(e) => handleUpdateBranch(index, 'tagline', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* Phone & WhatsApp */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        Helpline Phone Number
                      </label>
                      <input
                        type="text"
                        value={branch.phone}
                        onChange={(e) => handleUpdateBranch(index, 'phone', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        WhatsApp Number
                      </label>
                      <input
                        type="text"
                        value={branch.whatsapp || ''}
                        onChange={(e) => handleUpdateBranch(index, 'whatsapp', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* Doctor in Charge */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        Doctor In Charge Name
                      </label>
                      <input
                        type="text"
                        value={branch.doctorName || ''}
                        onChange={(e) => handleUpdateBranch(index, 'doctorName', e.target.value)}
                        placeholder="e.g. Dr H. ALTAF or डॉ प्रमोद शेखावत"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        Doctor Degrees & Role
                      </label>
                      <input
                        type="text"
                        value={branch.doctorDegree || ''}
                        onChange={(e) => handleUpdateBranch(index, 'doctorDegree', e.target.value)}
                        placeholder="e.g. MBBS, MD (Internal Medicine)"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* Address Hindi & English */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        Address in Hindi
                      </label>
                      <input
                        type="text"
                        value={branch.addressHindi}
                        onChange={(e) => handleUpdateBranch(index, 'addressHindi', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        Address in English
                      </label>
                      <input
                        type="text"
                        value={branch.address}
                        onChange={(e) => handleUpdateBranch(index, 'address', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* Timings */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        OPD Timings (Hindi)
                      </label>
                      <input
                        type="text"
                        value={branch.timingsHindi}
                        onChange={(e) => handleUpdateBranch(index, 'timingsHindi', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        OPD Timings (English)
                      </label>
                      <input
                        type="text"
                        value={branch.timings}
                        onChange={(e) => handleUpdateBranch(index, 'timings', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* Google Maps Link */}
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        Google Maps Location / Navigation Link
                      </label>
                      <input
                        type="text"
                        value={branch.googleMapsUrl}
                        onChange={(e) => handleUpdateBranch(index, 'googleMapsUrl', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* Services & Treatments List (one per line) */}
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        Key Services & Treatments (Enter one per line)
                      </label>
                      <textarea
                        rows={4}
                        value={branch.services.join('\n')}
                        onChange={(e) =>
                          handleUpdateBranch(
                            index,
                            'services',
                            e.target.value.split('\n').filter((s) => s.trim() !== '')
                          )
                        }
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* Empanelled Schemes */}
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        Cashless Schemes (Comma separated, e.g. ECHS, RGHS, ESIC, CAPF, MAA Yojana)
                      </label>
                      <input
                        type="text"
                        value={branch.schemes.join(', ')}
                        onChange={(e) =>
                          handleUpdateBranch(
                            index,
                            'schemes',
                            e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                          )
                        }
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* Is Main Branch toggle */}
                    <div className="md:col-span-2 flex items-center gap-3 pt-2">
                      <input
                        type="checkbox"
                        id={`main-branch-${index}`}
                        checked={!!branch.isMainBranch}
                        onChange={(e) => handleUpdateBranch(index, 'isMainBranch', e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded bg-slate-900 border-slate-700 focus:ring-blue-500"
                      />
                      <label htmlFor={`main-branch-${index}`} className="text-sm font-semibold text-slate-300">
                        Mark as Hospital Main Branch / Headquarter (HQ)
                      </label>
                    </div>

                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

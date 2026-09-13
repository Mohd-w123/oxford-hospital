'use client';

import React, { useEffect, useState } from 'react';
import {
  Sparkles,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  AlertCircle,
  ArrowUp,
  ArrowDown,
  Edit,
  ExternalLink,
  Eye,
  Image as ImageIcon
} from 'lucide-react';
import { HeroSlide, SiteContent } from '@/lib/types';
import ImageUploader from '@/components/admin/ImageUploader';

export default function AdminSlider() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
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
        setSlides(data.heroSlides || []);
      })
      .catch(() => setError('Failed to load hero slider slides'))
      .finally(() => setLoading(false));
  }, []);

  const handleAddSlide = () => {
    const newSlide: HeroSlide = {
      id: `slide-${Date.now()}`,
      title: 'New Slider Headline',
      titleHindi: 'नया स्लाइड शीर्षक',
      subtitle: 'Write short description or key services for this banner here.',
      badge: 'Oxford Hospital Announcement',
      ctaText: 'Book Appointment',
      ctaLink: '/appointment',
      imageUrl: '/images/slider/slide-banner-oxford.jpg',
      isBannerOnly: true
    };
    const updated = [...slides, newSlide];
    setSlides(updated);
    setEditingIndex(updated.length - 1);
  };

  const handleUpdateSlide = (index: number, field: keyof HeroSlide, value: any) => {
    const updated = [...slides];
    updated[index] = { ...updated[index], [field]: value };
    setSlides(updated);
  };

  const handleDeleteSlide = (index: number) => {
    if (!confirm('Are you sure you want to delete this slide from the homepage slider?')) return;
    const updated = slides.filter((_, i) => i !== index);
    setSlides(updated);
    if (editingIndex === index) setEditingIndex(null);
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === slides.length - 1)) return;
    const target = direction === 'up' ? index - 1 : index + 1;
    const updated = [...slides];
    const temp = updated[index];
    updated[index] = updated[target];
    updated[target] = temp;
    setSlides(updated);
    if (editingIndex === index) setEditingIndex(target);
  };

  const handleSaveAll = async () => {
    if (!content) return;
    try {
      setSaving(true);
      setMessage('');
      setError('');

      const updatedContent: SiteContent = {
        ...content,
        heroSlides: slides
      };

      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedContent)
      });

      if (!res.ok) throw new Error('Failed to save slider settings');

      setContent(updatedContent);
      setMessage('Hero Slider slides saved successfully to MongoDB!');
      setTimeout(() => setMessage(''), 4000);
    } catch (e: any) {
      setError(e.message || 'Error saving slider');
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
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Homepage CMS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Hero Slider Management
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage, reorder, upload images, and edit texts for the 3 homepage slider banners.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleAddSlide}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold px-4 py-2.5 rounded-xl border border-slate-700 transition text-sm cursor-pointer"
          >
            <Plus className="w-4 h-4 text-sky-400" />
            <span>Add Slide</span>
          </button>

          <button
            onClick={handleSaveAll}
            disabled={saving}
            className="flex items-center gap-2 bg-gradient-to-r from-[#000066] to-blue-700 hover:from-blue-950 hover:to-blue-800 text-white font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-blue-900/30 transition text-sm disabled:opacity-50 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
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

      {/* Slide Cards List */}
      <div className="space-y-6">
        {slides.map((slide, index) => {
          const isEditing = editingIndex === index;

          return (
            <div
              key={slide.id || index}
              className={`rounded-2xl border ${
                isEditing ? 'border-blue-600/60 bg-slate-900/90' : 'border-slate-800 bg-slate-900/50'
              } overflow-hidden transition-all`}
            >
              {/* Card Summary Header */}
              <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-800/40">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-[#000066] text-sky-300 font-bold flex items-center justify-center text-sm border border-blue-800/60">
                    {index + 1}
                  </div>

                  <div className="w-20 h-12 rounded-lg bg-slate-950 overflow-hidden border border-slate-700/80 shrink-0">
                    <img
                      src={slide.imageUrl}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="font-bold text-white text-base line-clamp-1">
                      {slide.title}
                    </h3>
                    <p className="text-xs text-sky-400 font-medium line-clamp-1">
                      {slide.titleHindi || slide.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-auto">
                  <button
                    onClick={() => handleMove(index, 'up')}
                    disabled={index === 0}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 transition cursor-pointer"
                    title="Move Up"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleMove(index, 'down')}
                    disabled={index === slides.length - 1}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 transition cursor-pointer"
                    title="Move Down"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setEditingIndex(isEditing ? null : index)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      isEditing
                        ? 'bg-gradient-to-r from-[#000066] to-blue-700 text-white shadow-sm'
                        : 'bg-slate-800 hover:bg-slate-700 text-sky-300'
                    }`}
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>{isEditing ? 'Close' : 'Edit Slide'}</span>
                  </button>

                  <button
                    onClick={() => handleDeleteSlide(index)}
                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition cursor-pointer"
                    title="Delete Slide"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Edit Form Drawer */}
              {isEditing && (
                <div className="p-6 border-t border-slate-800 space-y-5 bg-slate-950/40">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    
                    {/* Title */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        Slide Title (English / Hindi Headline)
                      </label>
                      <input
                        type="text"
                        value={slide.title}
                        onChange={(e) => handleUpdateSlide(index, 'title', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* Hindi Subheading */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        Doctor / Specialty Subheading
                      </label>
                      <input
                        type="text"
                        value={slide.titleHindi || ''}
                        onChange={(e) => handleUpdateSlide(index, 'titleHindi', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* Badge */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        Badge Label (e.g. Oxford Hospital Jhunjhunu)
                      </label>
                      <input
                        type="text"
                        value={slide.badge || ''}
                        onChange={(e) => handleUpdateSlide(index, 'badge', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* CTA Link */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        Button Link URL
                      </label>
                      <input
                        type="text"
                        value={slide.ctaLink || '/appointment'}
                        onChange={(e) => handleUpdateSlide(index, 'ctaLink', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* Subtitle / Details */}
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        Slide Description / Services Text
                      </label>
                      <textarea
                        rows={2}
                        value={slide.subtitle}
                        onChange={(e) => handleUpdateSlide(index, 'subtitle', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* Image Uploader & URL */}
                    <div className="md:col-span-2 space-y-3">
                      <label className="block text-xs font-bold text-slate-300">
                        Slide Graphic / Banner Image
                      </label>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                        <div className="md:col-span-2">
                          <input
                            type="text"
                            value={slide.imageUrl}
                            onChange={(e) => handleUpdateSlide(index, 'imageUrl', e.target.value)}
                            placeholder="/images/slider/... or Cloudinary URL"
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 mb-3"
                          />
                          <ImageUploader
                            value={slide.imageUrl}
                            onChange={(url: string) => handleUpdateSlide(index, 'imageUrl', url)}
                            folder="oxford_slider"
                          />
                        </div>

                        <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-900 p-2 text-center">
                          <p className="text-[11px] text-slate-400 mb-1 font-semibold">Image Preview</p>
                          <img
                            src={slide.imageUrl}
                            alt="Slide Preview"
                            className="w-full h-28 object-contain rounded-lg bg-black/40"
                          />
                        </div>
                      </div>
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

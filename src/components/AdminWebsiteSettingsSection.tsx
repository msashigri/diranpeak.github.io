import React, { useState, useEffect } from 'react';
import { useAuth, DEFAULT_SITE_SETTINGS, SiteSettings } from '../context/AuthContext';
import {
  Globe, Sparkles, Check, RefreshCw, Image as ImageIcon,
  Mail, Phone, MapPin, Clock, FileText, Shield, ExternalLink,
  Search, Eye, MessageCircle, AlertCircle
} from 'lucide-react';

export const AdminWebsiteSettingsSection: React.FC = () => {
  const { siteSettings, updateSiteSettings, resetSiteSettings } = useAuth();

  const [formData, setFormData] = useState<SiteSettings>(siteSettings || DEFAULT_SITE_SETTINGS);
  const [successMsg, setSuccessMsg] = useState('');
  const [activeSubTab, setActiveSubTab] = useState<'branding' | 'seo' | 'contact' | 'hero' | 'footer'>('branding');

  // Sync formData with siteSettings if updated externally
  useEffect(() => {
    if (siteSettings) {
      setFormData(siteSettings);
    }
  }, [siteSettings]);

  const handleChange = (field: keyof SiteSettings, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSiteSettings(formData);
    setSuccessMsg('Website content and SEO settings updated successfully across the entire app!');
    setTimeout(() => setSuccessMsg(''), 5000);
  };

  const handleReset = async () => {
    if (window.confirm('Reset all website branding, logos, titles, and SEO meta tags to factory defaults?')) {
      await resetSiteSettings();
      setFormData(DEFAULT_SITE_SETTINGS);
      setSuccessMsg('Website settings restored to factory defaults.');
      setTimeout(() => setSuccessMsg(''), 4000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-2">
              <Globe className="w-3.5 h-3.5" />
              <span>Full Website Content Management System (CMS)</span>
            </div>
            <h2 className="text-2xl font-heading font-extrabold text-[#1a2b48]">
              Website Branding, Meta Tags &amp; Global Content
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              Control every aspect of your public presence: Company name, custom logo, browser favicon, SEO meta tags, homepage hero headlines, contact details, and copyright notices.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
              <span>Reset to Defaults</span>
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2.5 bg-[#5191fa] hover:bg-[#3875dc] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Save Website Content</span>
            </button>
          </div>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 pt-6">
          {[
            { id: 'branding', label: 'Identity & Logos', icon: ImageIcon },
            { id: 'seo', label: 'SEO & Meta Tags', icon: Search },
            { id: 'contact', label: 'Contact & Basecamp', icon: Phone },
            { id: 'hero', label: 'Homepage Hero Copy', icon: Sparkles },
            { id: 'footer', label: 'Footer & Legal', icon: FileText }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#1a2b48] text-white shadow-xs'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#5191fa]' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Success Banner */}
      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fade-in shadow-xs">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Main Form Body */}
      <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
        {/* ================= SUB-TAB 1: IDENTITY & LOGOS ================= */}
        {activeSubTab === 'branding' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-slate-100">
              <h3 className="text-base font-bold text-[#1a2b48]">Brand Identity &amp; Visual Assets</h3>
              <p className="text-xs text-slate-500 mt-0.5">Configure your brand name, tagline, custom logo, and browser favicon.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1.5">
                  Brand Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.siteName}
                  onChange={(e) => handleChange('siteName', e.target.value)}
                  placeholder="e.g. Diran Peak Adventure"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#5191fa] focus:bg-white"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Displayed on header, emails, and invoices.</span>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1.5">
                  Tagline / Slogan
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => handleChange('tagline', e.target.value)}
                  placeholder="e.g. Premier Pakistan Trekking & Karakoram Expeditions"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa] focus:bg-white"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Short motto shown under brand name in header and footer.</span>
              </div>
            </div>

            {/* Custom Logo URL */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-800 uppercase mb-0.5">
                    Custom Logo Image URL
                  </label>
                  <p className="text-xs text-slate-500">
                    Provide a transparent PNG or SVG image URL. Leave blank to use the handcrafted DPA Mountain Crest monogram.
                  </p>
                </div>

                {formData.logoUrl && (
                  <button
                    type="button"
                    onClick={() => handleChange('logoUrl', '')}
                    className="text-xs text-rose-600 hover:text-rose-700 font-semibold cursor-pointer"
                  >
                    Clear Custom Logo
                  </button>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-24 h-14 bg-white rounded-xl border border-slate-200 flex items-center justify-center p-2 shrink-0 shadow-xs">
                  {formData.logoUrl ? (
                    <img
                      src={formData.logoUrl}
                      alt="Logo Preview"
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/favicon.png';
                      }}
                    />
                  ) : (
                    <span className="text-[10px] font-bold text-slate-400 text-center">DPA Crest</span>
                  )}
                </div>

                <input
                  type="text"
                  value={formData.logoUrl}
                  onChange={(e) => handleChange('logoUrl', e.target.value)}
                  placeholder="https://your-domain.com/logo.png or /images/..."
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 font-mono focus:outline-none focus:border-[#5191fa]"
                />
              </div>
            </div>

            {/* Browser Favicon URL */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-800 uppercase mb-0.5">
                  Browser Tab Favicon URL
                </label>
                <p className="text-xs text-slate-500">
                  Controls the tiny 32x32 icon displayed in browser tabs and bookmark bars.
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center p-2 shrink-0 shadow-xs">
                  <img
                    src={formData.faviconUrl || '/favicon.png'}
                    alt="Favicon Preview"
                    className="w-6 h-6 object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/favicon.png';
                    }}
                  />
                </div>

                <input
                  type="text"
                  value={formData.faviconUrl}
                  onChange={(e) => handleChange('faviconUrl', e.target.value)}
                  placeholder="/favicon.png or https://..."
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 font-mono focus:outline-none focus:border-[#5191fa]"
                />
              </div>
            </div>
          </div>
        )}

        {/* ================= SUB-TAB 2: SEO & META TAGS ================= */}
        {activeSubTab === 'seo' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-slate-100">
              <h3 className="text-base font-bold text-[#1a2b48]">Search Engine Optimization (SEO) &amp; Meta Tags</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Optimize your ranking on Google and appearance on social platforms like Facebook, WhatsApp, and Twitter.
              </p>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1.5 flex items-center justify-between">
                <span>Page Title Tag (&lt;title&gt;) *</span>
                <span className="text-[10px] text-slate-400 font-normal">Recommended: 50-60 characters</span>
              </label>
              <input
                type="text"
                required
                value={formData.siteTitle}
                onChange={(e) => handleChange('siteTitle', e.target.value)}
                placeholder="Diran Peak Adventure - Pakistan Treks, Expeditions & Tours"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#5191fa] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1.5 flex items-center justify-between">
                <span>Meta Description (&lt;meta name="description"&gt;) *</span>
                <span className="text-[10px] text-slate-400 font-normal">Recommended: 120-160 characters</span>
              </label>
              <textarea
                rows={3}
                required
                value={formData.metaDescription}
                onChange={(e) => handleChange('metaDescription', e.target.value)}
                placeholder="Official website of Diran Peak Adventure. Premier mountaineering expeditions, K2 base camp treks, and cultural Silk Road tours in Pakistan with licensed Balti guides."
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa] focus:bg-white leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1.5">
                Meta Keywords (&lt;meta name="keywords"&gt;)
              </label>
              <input
                type="text"
                value={formData.metaKeywords}
                onChange={(e) => handleChange('metaKeywords', e.target.value)}
                placeholder="Pakistan trekking, K2 base camp, Karakoram expeditions, Diran Peak, Rakaposhi trek, Hunza tours"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa] focus:bg-white"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Comma-separated keywords for global indexing.</span>
            </div>

            {/* Google Search Live Preview Card */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Google Search Result Preview
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-xs max-w-xl">
                <div className="text-xs text-slate-500 font-mono flex items-center gap-1 mb-1">
                  <span>https://diranpeakadventure.com</span>
                  <span className="text-slate-300">›</span>
                  <span>tours</span>
                </div>
                <div className="text-base font-medium text-[#1a0dab] hover:underline cursor-pointer leading-snug">
                  {formData.siteTitle || formData.siteName}
                </div>
                <p className="text-xs text-[#4d5156] mt-1 line-clamp-2 leading-relaxed">
                  {formData.metaDescription || 'Premier high-altitude mountaineering and trekking expeditions in the Karakoram range.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ================= SUB-TAB 3: CONTACT & BASECAMP ================= */}
        {activeSubTab === 'contact' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-slate-100">
              <h3 className="text-base font-bold text-[#1a2b48]">Official Contact &amp; Basecamp Logistics</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Displayed in the footer, contact page, booking voucher PDFs, and WhatsApp quick-chat buttons.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#5191fa]" />
                  <span>Official Email *</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.contactEmail}
                  onChange={(e) => handleChange('contactEmail', e.target.value)}
                  placeholder="info@diranpeakadventure.com"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Operations Phone *</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.contactPhone}
                  onChange={(e) => handleChange('contactPhone', e.target.value)}
                  placeholder="+92 344 5678901"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1.5 flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp Number *</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.contactWhatsApp}
                  onChange={(e) => handleChange('contactWhatsApp', e.target.value)}
                  placeholder="+92 344 5678901"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa] focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  <span>Basecamp Headquarters Address</span>
                </label>
                <input
                  type="text"
                  value={formData.officeAddress}
                  onChange={(e) => handleChange('officeAddress', e.target.value)}
                  placeholder="Ali Abad, Main Karakoram Highway, Hunza Valley, Gilgit-Baltistan, Pakistan"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span>Business Working Hours</span>
                </label>
                <input
                  type="text"
                  value={formData.businessHours}
                  onChange={(e) => handleChange('businessHours', e.target.value)}
                  placeholder="Monday - Saturday: 8:00 AM - 8:00 PM PKT"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa] focus:bg-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* ================= SUB-TAB 4: HOMEPAGE HERO COPY ================= */}
        {activeSubTab === 'hero' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-slate-100">
              <h3 className="text-base font-bold text-[#1a2b48]">Homepage Hero Headline &amp; Taglines</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Customize the main banner headline, top badge pill, and subheading travelers see when opening the website.
              </p>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1.5">
                Hero Top Badge Pill
              </label>
              <input
                type="text"
                value={formData.heroBadge}
                onChange={(e) => handleChange('heroBadge', e.target.value)}
                placeholder="Diran Peak Adventure · Est. 2012"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1.5">
                Hero Main Headline (H1) *
              </label>
              <input
                type="text"
                required
                value={formData.heroHeading}
                onChange={(e) => handleChange('heroHeading', e.target.value)}
                placeholder="Discover the Crown of Karakoram & Himalayas"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-extrabold focus:outline-none focus:border-[#5191fa] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1.5">
                Hero Subheading Description
              </label>
              <textarea
                rows={2}
                value={formData.heroSubheading}
                onChange={(e) => handleChange('heroSubheading', e.target.value)}
                placeholder="Authentic high-altitude treks, legendary 8,000m expeditions, and Silk Road cultural journeys led by native Karakoram mountaineers."
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa] focus:bg-white leading-relaxed"
              />
            </div>
          </div>
        )}

        {/* ================= SUB-TAB 5: FOOTER & LEGAL ================= */}
        {activeSubTab === 'footer' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-slate-100">
              <h3 className="text-base font-bold text-[#1a2b48]">Footer Text &amp; Copyright Notice</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Configure legal licenses, registration notes, and the copyright statement displayed on every page.
              </p>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1.5">
                Footer Operator License &amp; Bio
              </label>
              <textarea
                rows={3}
                value={formData.footerText}
                onChange={(e) => handleChange('footerText', e.target.value)}
                placeholder="Licensed Government of Pakistan Tour Operator (DTS Lic #1842). Pioneer of authentic sustainable trekking and high-altitude logistics across the Karakoram, Western Himalayas, and Hindu Kush."
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa] focus:bg-white leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1.5">
                Copyright Line
              </label>
              <input
                type="text"
                value={formData.copyrightText}
                onChange={(e) => handleChange('copyrightText', e.target.value)}
                placeholder="© 2027 Diran Peak Adventure (Pvt) Ltd. All rights reserved."
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa] focus:bg-white"
              />
            </div>
          </div>
        )}

        {/* Form Bottom Actions */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Reset Section
          </button>

          <button
            type="submit"
            className="px-8 py-2.5 bg-[#5191fa] hover:bg-[#3875dc] text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>Save All Website Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};

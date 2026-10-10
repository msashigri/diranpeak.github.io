import React from 'react';
import { Mountain, ShieldCheck, HeartHandshake, Award, CheckCircle, Users } from 'lucide-react';

export const AboutPage: React.FC<{ onNavigate: (route: string, param?: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="bg-[#f7f8fa] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="text-xs text-slate-500 mb-4 flex items-center gap-1.5 font-medium">
          <button onClick={() => onNavigate('home')} className="hover:text-[#5191fa]">Home</button>
          <span>/</span>
          <span className="text-slate-800 font-semibold">About Us</span>
        </div>

        {/* Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden mb-12 bg-[#1a2b48] text-white p-8 sm:p-14 shadow-xl">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5191fa] mb-2 block">
              Indigenous Mountain Pioneers
            </span>
            <h1 className="font-heading text-3xl sm:text-5xl font-black text-white mb-4 leading-tight">
              About Diran Peak Adventure
            </h1>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
              Born in the heart of Gilgit-Baltistan beneath the majestic pyramid of Diran Peak and Rakaposhi, Diran Peak Adventure (DPA) is an indigenous tour operator created by native mountaineers whose ancestral lineage traces back centuries through the high valleys of the Karakoram.
            </p>
          </div>

          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none hidden md:block">
            <img
              src="/src/assets/images/hero_karakoram_k2_1790420138291.jpg"
              alt="K2 peak"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#1a2b48]">
              Our Heritage in the Karakoram &amp; Himalayas
            </h2>
            <p>
              Named after the magnificent 7,266m snow-pyramid <strong>Diran Peak</strong> dominating the Minapin Glacier, our team represents the finest high-altitude Balti and Hunza guides in Northern Pakistan.
            </p>
            <p>
              For decades, international expeditions hired Western agencies that subcontracted local Pakistani guides at minimal rates. Diran Peak Adventure (DPA) was founded to restore dignity to native mountaineering—providing direct native booking, fair compensation, high-end expedition gear, and complete transparency.
            </p>
            <p>
              Today, we are honored to have guided over 10,000 international trekkers and alpine climbers safely to K2 Base Camp, Concordia, Gondogoro La, and summits exceeding 8,000 meters.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img
              src="/src/assets/images/trek_baltoro_glacier_1790420152808.jpg"
              alt="Balti Guide"
              className="rounded-2xl shadow-md w-full h-56 object-cover"
            />
            <img
              src="/src/assets/images/expedition_climbing_k2_1790420166845.jpg"
              alt="K2 Expedition"
              className="rounded-2xl shadow-md w-full h-56 object-cover"
            />
          </div>
        </div>

        {/* Pillars of Excellence */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200 mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="font-heading text-2xl font-bold text-[#1a2b48]">
              Our Core Commitments
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Safety, ethical responsibility, and environmental stewardship in every step.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#5191fa] flex items-center justify-center mb-4">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-base text-[#1a2b48] mb-2">Ethical Porter Welfare</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                We strictly adhere to the International Porter Protection Group (IPPG) guidelines: maximum 20-25kg loads, fair living wages, quality mountain shelters, three hot meals daily, and emergency high-altitude medical coverage.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-base text-[#1a2b48] mb-2">Certified Safety Standards</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                All expeditions carry portable hyperbaric chambers, pulse oximeters, medical oxygen tanks, and Garmin inReach satellite communications. We maintain official 24/7 rescue agreements with Askari Aviation for military helicopter support.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-base text-[#1a2b48] mb-2">Government DTS License</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fully registered and accredited under License #1842 by the Department of Tourist Services (DTS), Ministry of Tourism, Government of Pakistan. All clients receive legal documentation and rapid official LOI visa support.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-10 bg-[#1a2b48] rounded-3xl text-white p-8">
          <h3 className="font-heading text-2xl font-bold mb-2">Ready to Stand Before K2?</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mb-6">
            Join one of our guaranteed Karakoram expeditions or let our indigenous team craft your customized private adventure.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onNavigate('tours', 'all')}
              className="px-6 py-3 bg-[#5191fa] hover:bg-[#3d7be3] text-white font-bold text-xs uppercase rounded-xl shadow-md transition-all cursor-pointer"
            >
              Explore All Expeditions &amp; Tours
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase rounded-xl transition-all cursor-pointer"
            >
              Contact Our Basecamp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

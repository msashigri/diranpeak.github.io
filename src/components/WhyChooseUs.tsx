import React from 'react';
import { ShieldCheck, HeartHandshake, Compass, Award, CheckCircle2, PhoneCall } from 'lucide-react';

export const WhyChooseUs: React.FC<{ onContactClick: () => void }> = ({ onContactClick }) => {
  const points = [
    {
      title: 'Indigenous High-Altitude Mountain Guides',
      desc: 'Our leaders and guides are native Balti climbers born in the shadow of K2. They carry decades of generational navigation wisdom across Baltoro, Biafo, and Gondogoro.'
    },
    {
      title: 'Strict Porter Welfare & Ethical Labor',
      desc: 'Porters are the backbone of Karakoram expeditions. We enforce strict load limits (max 20-25 kg), provide full mountaineering kits, hot nutrition, and comprehensive medical insurance.'
    },
    {
      title: 'Safety, Oxygen & Askari Helicopter Evac Protocol',
      desc: 'Every expedition carries satellite communicators (Garmin inReach), medical oxygen cylinders, gamow bags, and standing emergency helicopter evacuation bonds.'
    },
    {
      title: '100% Guaranteed Fixed Departures',
      desc: 'Once your booking is confirmed, your trek runs. We do not cancel fixed departures due to minimum numbers—your holiday is secure.'
    }
  ];

  return (
    <section className="py-20 bg-[#1a2b48] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Narrative */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#5191fa] mb-2">
              Why Chogori Adventure
            </div>
            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white mb-6 leading-tight">
              We Don&apos;t Just Guide Treks.<br />
              <span className="text-[#5191fa]">We Belong to These Mountains.</span>
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed mb-8">
              Founded in Skardu, Chogori Adventure was built by local mountaineers with a clear mission: to share the breathtaking majesty of Pakistan&apos;s Karakoram while providing the highest standard of safety, ethical porter welfare, and true Balti warmth.
            </p>

            <div className="space-y-4">
              {points.map((p, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#5191fa] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-white">{p.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed mt-0.5">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-700/60 flex flex-wrap items-center gap-4">
              <button
                onClick={onContactClick}
                className="px-6 py-3 bg-[#5191fa] hover:bg-[#3d7be3] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all cursor-pointer"
              >
                Speak With an Expedition Specialist
              </button>
              <div className="text-xs text-slate-400">
                Direct WhatsApp: <span className="text-white font-bold">+92 344 5925993</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Grid of Real Expeditions */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="/src/assets/images/trek_baltoro_glacier_1790420152808.jpg"
                  alt="Trekking on Baltoro glacier"
                  referrerPolicy="no-referrer"
                  className="rounded-2xl shadow-xl w-full h-56 object-cover"
                />
                <img
                  src="/src/assets/images/skardu_valley_landscape_1790420181912.jpg"
                  alt="Skardu landscape"
                  referrerPolicy="no-referrer"
                  className="rounded-2xl shadow-xl w-full h-44 object-cover"
                />
              </div>
              <div className="space-y-4 pt-6">
                <img
                  src="/src/assets/images/expedition_climbing_k2_1790420166845.jpg"
                  alt="High altitude mountaineer in Karakoram"
                  referrerPolicy="no-referrer"
                  className="rounded-2xl shadow-xl w-full h-44 object-cover"
                />
                <img
                  src="/src/assets/images/hero_karakoram_k2_1790420138291.jpg"
                  alt="K2 summit at golden hour"
                  referrerPolicy="no-referrer"
                  className="rounded-2xl shadow-xl w-full h-56 object-cover"
                />
              </div>
            </div>

            {/* Overlaid trust badge */}
            <div className="absolute -bottom-6 -left-6 bg-white text-[#1a2b48] p-4 rounded-2xl shadow-2xl border border-slate-100 hidden sm:flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                100%
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-slate-900">Indigenous Company</div>
                <div className="text-[11px] text-slate-500">Registered with Pakistan Tourism DTS</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

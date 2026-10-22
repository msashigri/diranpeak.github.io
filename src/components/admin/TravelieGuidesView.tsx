import React, { useState } from 'react';
import {
  Compass, Search, Plus, Phone, Mail, Award, Check,
  Edit3, Briefcase, Calendar, ShieldCheck, MapPin, MessageSquare
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface GuideRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  tag: string;
  avatar: string;
  workExperience: string;
  experienceLevel: string;
  jobType: string;
  jobStatus: string;
  skills: string[];
  experiences: { role: string; company: string; period: string; desc: string }[];
}

export const TravelieGuidesView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGuideId, setSelectedGuideId] = useState('guide-1');

  const guidesList: GuideRecord[] = [
    {
      id: 'guide-1',
      name: 'Liam Parker',
      email: 'liam.parker@example.com',
      phone: '+1 (555) 111-2222',
      tag: 'Karakoram Lead Guide',
      avatar: '/images/hero_karakoram_k2_1790420138291.jpg',
      workExperience: '10 years',
      experienceLevel: 'Senior UIAGM',
      jobType: 'Full Time',
      jobStatus: 'Active',
      skills: [
        'Fluent in English, Italian, and French',
        'Certified Wilderness First Responder (WFR)',
        'Technical High-Altitude Glacier Rescue & Crevasse Extrication',
        'Customer service and camp hospitality management',
        'Garmin inReach Satellite Emergency Navigation'
      ],
      experiences: [
        {
          role: 'Senior Mountain Guide',
          company: 'Diran Peak Expeditions',
          period: 'January 2018 - Present',
          desc: 'Leading and managing 8000m expeditions across Baltoro and Concordia, ensuring 100% client safety.'
        },
        {
          role: 'Trekking & Acclimatization Guide',
          company: 'Alpine Club of Pakistan',
          period: 'June 2014 - December 2017',
          desc: 'Conducted high-altitude guided traverses across Gondogoro La pass and Nanga Parbat basecamps.'
        }
      ]
    },
    {
      id: 'guide-2',
      name: 'Emma Johnson',
      email: 'emma.johnson@example.com',
      phone: '+1 (555) 222-3333',
      tag: 'Hunza Cultural Guide',
      avatar: '/images/skardu_valley_landscape_1790420181912.jpg',
      workExperience: '7 years',
      experienceLevel: 'Expert',
      jobType: 'Seasonal',
      jobStatus: 'Active',
      skills: [
        'Fluent in English, Urdu, and Wakhi',
        'Heritage and Silk Route historical storytelling',
        'Flora & fauna interpretation of Central Karakoram National Park'
      ],
      experiences: [
        {
          role: 'Lead Heritage Guide',
          company: 'Northern Pakistan Explorers',
          period: 'May 2019 - Present',
          desc: 'Curated 14-day Silk Road and Baltit Fort historical journeys for international groups.'
        }
      ]
    },
    {
      id: 'guide-3',
      name: 'Noah Brown',
      email: 'noah.brown@example.com',
      phone: '+1 (555) 333-4444',
      tag: 'Alpine Glaciology Guide',
      avatar: '/images/trek_baltoro_glacier_1790420152808.jpg',
      workExperience: '8 years',
      experienceLevel: 'Senior',
      jobType: 'Full Time',
      jobStatus: 'Active',
      skills: [
        'Glacier navigation & crevasse hazard mapping',
        'Spantik & Diran Peak route staging'
      ],
      experiences: [
        {
          role: 'Glacier Technical Guide',
          company: 'Karakoram Mountaineers',
          period: 'April 2017 - Present',
          desc: 'Supervised rope fixings and icefall crossings for summit teams.'
        }
      ]
    },
    {
      id: 'guide-4',
      name: 'Ava Davis',
      email: 'ava.davis@example.com',
      phone: '+1 (555) 444-5555',
      tag: 'Wilderness Medic Guide',
      avatar: '/images/hero_karakoram_k2_1790420138291.jpg',
      workExperience: '5 years',
      experienceLevel: 'Intermediate',
      jobType: 'Full Time',
      jobStatus: 'Active',
      skills: ['Emergency altitude triage & hyperbaric chamber ops', 'Group leadership'],
      experiences: [
        {
          role: 'Expedition Medic',
          company: 'Basecamp Operations PK',
          period: '2020 - Present',
          desc: 'Provided medical monitoring at 5000m staging camps.'
        }
      ]
    }
  ];

  const selectedGuide = guidesList.find(g => g.id === selectedGuideId) || guidesList[0];

  const filteredGuides = guidesList.filter(g => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return g.name.toLowerCase().includes(q) || g.tag.toLowerCase().includes(q) || g.email.toLowerCase().includes(q);
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Guides List (lg:col-span-7) */}
      <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-slate-200/80 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl font-heading font-extrabold text-[#1a2b48]">
            Guides Directory
          </h2>

          <div className="flex items-center gap-2.5">
            <div className="relative w-48 sm:w-56">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search name, email, etc"
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa]"
              />
            </div>

            <button
              type="button"
              onClick={() => alert('New guide onboarding form opened.')}
              className="px-3.5 py-2 bg-[#5191fa] hover:bg-[#3875dc] text-white text-xs font-bold rounded-xl flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add Guide</span>
            </button>
          </div>
        </div>

        {/* List of guide cards */}
        <div className="space-y-3">
          {filteredGuides.map((guide) => (
            <div
              key={guide.id}
              onClick={() => setSelectedGuideId(guide.id)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                selectedGuideId === guide.id
                  ? 'border-[#5191fa] bg-blue-50/40 shadow-xs'
                  : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0">
                  <img src={guide.avatar} alt={guide.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-xs text-[#1a2b48]">{guide.name}</h4>
                  <div className="text-[10px] text-slate-400">{guide.email}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{guide.phone}</div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-[#5191fa] border border-blue-100">
                  {guide.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Guide Detail Card (lg:col-span-5) matching image 3112804 */}
      <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-slate-200/80 space-y-6">
        {selectedGuide && (
          <>
            {/* Header profile banner */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-blue-100 to-indigo-100 p-6 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-white shadow-md mb-2">
                <img src={selectedGuide.avatar} alt={selectedGuide.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-heading font-extrabold text-lg text-[#1a2b48]">{selectedGuide.name}</h3>
              <p className="text-xs text-slate-500 font-medium">{selectedGuide.tag}</p>

              <div className="flex items-center gap-2 mt-3">
                <button
                  type="button"
                  onClick={() => alert(`Calling ${selectedGuide.phone}`)}
                  className="p-2 bg-white text-slate-700 hover:text-[#5191fa] rounded-xl shadow-xs transition-colors cursor-pointer"
                  title="Call"
                >
                  <Phone className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => alert(`Messaging ${selectedGuide.email}`)}
                  className="p-2 bg-[#5191fa] text-white hover:bg-[#3875dc] rounded-xl shadow-xs transition-colors cursor-pointer"
                  title="Message"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 4 Stats Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Work Experience</div>
                <div className="font-extrabold text-[#1a2b48] text-sm mt-0.5">{selectedGuide.workExperience}</div>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Experience Level</div>
                <div className="font-extrabold text-[#1a2b48] text-sm mt-0.5">{selectedGuide.experienceLevel}</div>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Job Type</div>
                <div className="font-extrabold text-[#1a2b48] text-sm mt-0.5">{selectedGuide.jobType}</div>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Job Status</div>
                <div className="font-extrabold text-emerald-600 text-sm mt-0.5">{selectedGuide.jobStatus}</div>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Skills</h4>
              <div className="space-y-1.5 text-xs text-slate-700">
                {selectedGuide.skills.map((skill, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#5191fa] shrink-0 mt-0.5" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Experiences */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Past Expeditions &amp; Roles</h4>
              <div className="space-y-3">
                {selectedGuide.experiences.map((exp, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                    <div className="font-bold text-slate-900">{exp.role}</div>
                    <div className="text-[11px] text-slate-400">{exp.company} · {exp.period}</div>
                    <p className="text-slate-600 mt-1 leading-relaxed text-[11px]">{exp.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => alert(`Edit profile for ${selectedGuide.name}`)}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Edit Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
};

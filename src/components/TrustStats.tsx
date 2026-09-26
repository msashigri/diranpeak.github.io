import React from 'react';
import { Mountain, Users, ShieldCheck, Award, HeartHandshake, Compass } from 'lucide-react';

export const TrustStats: React.FC = () => {
  const stats = [
    {
      icon: Award,
      title: 'Best Cost Guarantee',
      description: 'Transparent direct native pricing with no middlemen or hidden surcharges.'
    },
    {
      icon: Mountain,
      title: 'Senior High Guides',
      description: 'Generational Balti mountaineers with 20+ years of Karakoram navigation.'
    },
    {
      icon: Compass,
      title: 'Native Company',
      description: '100% locally owned in Skardu, reinvesting directly into indigenous communities.'
    },
    {
      icon: Users,
      title: '10,000+ Trekkers',
      description: 'Mountaineers and adventure seekers safely guided across Pakistan since 2012.'
    }
  ];

  return (
    <div className="bg-white border-b border-slate-200/80 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#5191fa] flex items-center justify-center shrink-0 border border-blue-100">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-slate-900 text-sm mb-1">{s.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{s.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

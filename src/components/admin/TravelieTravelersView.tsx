import React, { useState } from 'react';
import {
  Users, Search, Plus, KeyRound, CheckCircle, Shield,
  Edit3, Trash2, Phone, Mail, Award, Check, Filter
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export interface TravelerRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  jobField: string;
  packages: string;
  memberCategory: 'Gold' | 'Silver' | 'Bronze' | 'VIP';
  avatar?: string;
  verified?: boolean;
}

interface TravelieTravelersViewProps {
  onOpenAddUser: () => void;
  onOpenRoleMatrix: () => void;
  onResetPassword: (user: any) => void;
  onEditUser: (user: any) => void;
}

export const TravelieTravelersView: React.FC<TravelieTravelersViewProps> = ({
  onOpenAddUser,
  onOpenRoleMatrix,
  onResetPassword,
  onEditUser
}) => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [packageFilter, setPackageFilter] = useState<string>('ALL');

  // Realistic mock + existing data matching screenshot 3112804
  const [travelersList, setTravelersList] = useState<TravelerRecord[]>([
    {
      id: 'usr-1',
      name: 'Camellia Swan',
      email: 'camellia.swan@example.com',
      phone: '+1 (555) 123-4567',
      address: 'Bali, Indonesia',
      jobField: 'Marketing',
      packages: 'Venice Dreams, Parisian Romance',
      memberCategory: 'Gold'
    },
    {
      id: 'usr-2',
      name: 'Raphael Goodman',
      email: 'raphael.goodman@example.com',
      phone: '+1 (555) 234-5678',
      address: 'Jakarta, Indonesia',
      jobField: 'IT Software',
      packages: 'Safari Adventure, Tokyo Cultural Adventure',
      memberCategory: 'Silver'
    },
    {
      id: 'usr-3',
      name: 'Ludwig Contessa',
      email: 'ludwig.contessa@example.com',
      phone: '+1 (555) 345-6789',
      address: 'Bandung, Indonesia',
      jobField: 'Finance',
      packages: 'Alpine Escape',
      memberCategory: 'Gold'
    },
    {
      id: 'usr-4',
      name: 'Armina Raul Meyes',
      email: 'armina.meyes@example.com',
      phone: '+1 (555) 456-7890',
      address: 'Surabaya, Indonesia',
      jobField: 'Education',
      packages: 'Caribbean Cruise',
      memberCategory: 'Bronze'
    },
    {
      id: 'usr-5',
      name: 'James Dunn',
      email: 'james.dunn@example.com',
      phone: '+1 (555) 567-8901',
      address: 'Yogyakarta, Indonesia',
      jobField: 'Engineering',
      packages: 'Parisian Romance',
      memberCategory: 'Silver'
    },
    {
      id: 'usr-6',
      name: 'Hillary Grey',
      email: 'hillary.grey@example.com',
      phone: '+1 (555) 678-9012',
      address: 'Melbourne, Australia',
      jobField: 'Environmental Science',
      packages: 'Tokyo Cultural Adventure',
      memberCategory: 'Bronze'
    },
    {
      id: 'usr-7',
      name: 'Lucas O\'Connor',
      email: 'lucas.oconnor@example.com',
      phone: '+1 (555) 901-2345',
      address: 'Munich, Germany',
      jobField: 'Management',
      packages: 'Greek Island Hopping',
      memberCategory: 'Silver'
    },
    {
      id: 'usr-8',
      name: 'Layla Linch',
      email: 'layla.linch@example.com',
      phone: '+1 (555) 012-3456',
      address: 'Cape Town, South Africa',
      jobField: 'Marketing',
      packages: 'Bali Beach Escape',
      memberCategory: 'Gold'
    }
  ]);

  const filteredTravelers = travelersList.filter((t) => {
    if (categoryFilter !== 'ALL' && t.memberCategory !== categoryFilter) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      t.name.toLowerCase().includes(q) ||
      t.email.toLowerCase().includes(q) ||
      t.address.toLowerCase().includes(q) ||
      t.packages.toLowerCase().includes(q)
    );
  });

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-slate-200/80 space-y-6">
      {/* Header with Search and Filters matching image 3112804 */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-heading font-extrabold text-[#1a2b48]">
            Travelers &amp; Customer Accounts
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Registered expedition travelers, member categories, and past tour bookings.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Package Filter */}
          <select
            value={packageFilter}
            onChange={(e) => setPackageFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 cursor-pointer focus:outline-none"
          >
            <option value="ALL">All Packages</option>
            <option value="K2">K2 Base Camp</option>
            <option value="Diran">Diran Peak</option>
            <option value="Hunza">Hunza Cultural</option>
          </select>

          {/* Member Category */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 cursor-pointer focus:outline-none"
          >
            <option value="ALL">All Categories</option>
            <option value="Gold">Gold</option>
            <option value="Silver">Silver</option>
            <option value="Bronze">Bronze</option>
          </select>

          {/* Search */}
          <div className="relative w-48 sm:w-60">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search name, address, job..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa]"
            />
          </div>

          {/* Add Traveler */}
          <button
            type="button"
            onClick={onOpenAddUser}
            className="px-4 py-2 bg-[#5191fa] hover:bg-[#3875dc] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add Traveler</span>
          </button>
        </div>
      </div>

      {/* Table matching image 3112804 */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <th className="pb-3.5 font-semibold">Name</th>
              <th className="pb-3.5 font-semibold">Phone Number</th>
              <th className="pb-3.5 font-semibold">Address / Country</th>
              <th className="pb-3.5 font-semibold">Job Field</th>
              <th className="pb-3.5 font-semibold">Packages</th>
              <th className="pb-3.5 font-semibold text-right">Member Category</th>
              <th className="pb-3.5 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredTravelers.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50/70 transition-colors">
                {/* Name + Avatar */}
                <td className="py-4 font-bold text-[#1a2b48]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-200 to-slate-300 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                      {t.name[0]}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 leading-tight">{t.name}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{t.email}</div>
                    </div>
                  </div>
                </td>

                {/* Phone */}
                <td className="py-4 text-slate-600 font-medium whitespace-nowrap">
                  {t.phone}
                </td>

                {/* Address */}
                <td className="py-4 text-slate-700">
                  {t.address}
                </td>

                {/* Job Field */}
                <td className="py-4 text-slate-600">
                  {t.jobField}
                </td>

                {/* Packages */}
                <td className="py-4 text-slate-800 font-medium max-w-xs truncate">
                  {t.packages}
                </td>

                {/* Member Category Pill matching image */}
                <td className="py-4 text-right">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold ${
                      t.memberCategory === 'Gold' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                      t.memberCategory === 'Silver' ? 'bg-slate-100 text-slate-700 border border-slate-200' :
                      'bg-orange-100 text-orange-800 border border-orange-200'
                    }`}
                  >
                    {t.memberCategory}
                  </span>
                </td>

                {/* Actions */}
                <td className="py-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      type="button"
                      onClick={() => onResetPassword(t)}
                      className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                      title="Reset Password"
                    >
                      <KeyRound className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onEditUser(t)}
                      className="p-1.5 text-slate-400 hover:text-[#5191fa] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                      title="Edit Profile"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

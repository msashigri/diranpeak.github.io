import React from 'react';
import { PLATFORM_ROLES, RoleConfig } from '../types/roles';
import { X, Shield, Check, Lock, ShieldCheck } from 'lucide-react';

interface AdminRoleMatrixModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminRoleMatrixModal: React.FC<AdminRoleMatrixModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col border border-slate-100">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#1a2b48] text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-white">
                Platform Roles &amp; Permissions Matrix
              </h3>
              <p className="text-xs text-slate-300">
                Official Role-Based Access Control (RBAC) architecture for Diran Peak Adventure.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Roles List */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PLATFORM_ROLES.map((role: RoleConfig) => (
              <div
                key={role.id}
                className={`p-4 rounded-2xl border ${role.borderColor} ${role.badgeBg} flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/80 shadow-2xs ${role.badgeText}`}>
                      {role.category}
                    </span>
                    {role.canAccessAdminPanel ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded-full border border-emerald-300/60">
                        <ShieldCheck className="w-3 h-3" /> Admin Panel Access
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-600 bg-slate-200/80 px-2 py-0.5 rounded-full">
                        <Lock className="w-3 h-3" /> Client Portal Only
                      </span>
                    )}
                  </div>

                  <h4 className="font-heading font-bold text-base text-slate-900 mb-1">
                    {role.label} <span className="text-xs font-mono text-slate-500 font-normal">({role.id})</span>
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed mb-3">
                    {role.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-300/50">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Assigned Capabilities:
                  </div>
                  <ul className="space-y-1">
                    {role.permissions.map((perm, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 text-xs text-slate-800 font-medium">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{perm}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#1a2b48] hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Close Matrix
          </button>
        </div>
      </div>
    </div>
  );
};

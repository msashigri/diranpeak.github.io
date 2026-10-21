import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { PLATFORM_ROLES, UserRole, getRoleConfig } from '../types/roles';
import {
  X, User, Mail, Lock, Phone, Globe, Shield, Check,
  Sparkles, CheckCircle2, Copy, AlertCircle, ShieldCheck
} from 'lucide-react';

interface AdminAddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserCreated?: (newUser: any) => void;
}

export const AdminAddUserModal: React.FC<AdminAddUserModalProps> = ({
  isOpen,
  onClose,
  onUserCreated
}) => {
  const { adminCreateUser } = useAuth();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('DiranPeak2027!');
  const [phone, setPhone] = useState('+92 345 ');
  const [country, setCountry] = useState('Pakistan');
  const [selectedRole, setSelectedRole] = useState<UserRole>('traveler');
  const [isVerified, setIsVerified] = useState(true);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<any | null>(null);
  const [copiedPass, setCopiedPass] = useState(false);

  if (!isOpen) return null;

  const currentRoleConfig = getRoleConfig(selectedRole);

  const handleGeneratePassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%';
    let res = 'DPA-';
    for (let i = 0; i < 8; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(res);
  };

  const handleCopyPassword = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopiedPass(true);
    setTimeout(() => setCopiedPass(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!firstName.trim()) {
      setError('Please provide user first name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid user email address.');
      return;
    }
    if (!password.trim() || password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await adminCreateUser({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        password: password.trim(),
        phone: phone.trim(),
        country: country.trim(),
        role: selectedRole,
        isVerified
      });

      if (res.success && res.user) {
        setSuccessData({
          ...res.user,
          plainPassword: password
        });
        if (onUserCreated) {
          onUserCreated(res.user);
        }
      } else {
        setError(res.error || 'Failed to create user account.');
      }
    } catch (err: any) {
      setError(err?.message || 'Error creating user in Firestore.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseAndReset = () => {
    setSuccessData(null);
    setError(null);
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('DiranPeak2027!');
    setSelectedRole('traveler');
    setIsVerified(true);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-hidden shadow-2xl flex flex-col border border-slate-100">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#1a2b48] text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#5191fa]/20 text-[#5191fa] border border-[#5191fa]/30 flex items-center justify-center font-bold">
              <User className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-white">
                Add User Manually &amp; Assign Role
              </h3>
              <p className="text-xs text-slate-300">
                Provision a verified user account with assigned role and access permissions.
              </p>
            </div>
          </div>
          <button
            onClick={handleCloseAndReset}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          {successData ? (
            <div className="text-center py-6 animate-in fade-in">
              <div className="w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-heading font-bold text-xl text-slate-900 mb-1">
                User Account Provisioned!
              </h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto mb-5">
                The account for <strong>{successData.firstName} {successData.lastName}</strong> was successfully created and assigned the <strong>{getRoleConfig(successData.role).label}</strong> role.
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 max-w-md mx-auto text-left text-xs mb-6 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Email:</span>
                  <span className="font-semibold text-slate-800">{successData.email}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Password:</span>
                  <span className="font-mono font-bold text-[#1a2b48] bg-slate-200 px-2 py-0.5 rounded">
                    {successData.plainPassword}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Role:</span>
                  <span className="font-bold text-[#5191fa]">
                    {getRoleConfig(successData.role).label} ({getRoleConfig(successData.role).category})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Status:</span>
                  <span className="font-bold text-emerald-600 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Verified Account
                  </span>
                </div>
              </div>

              <div className="flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(`Diran Peak Adventure Account Credentials:\nEmail: ${successData.email}\nTemporary Password: ${successData.plainPassword}\nLogin Portal: https://diranpeakadventure.com`);
                    setCopiedPass(true);
                    setTimeout(() => setCopiedPass(false), 2000);
                  }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedPass ? 'Credentials Copied!' : 'Copy Credentials'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleCloseAndReset}
                  className="px-5 py-2 bg-[#5191fa] hover:bg-[#3875dc] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {/* Name fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="e.g. Karim"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="e.g. Balti"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa] focus:bg-white"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Email Address *</label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="user@example.com"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa] focus:bg-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Phone / WhatsApp</label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+92 345 1234567"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa] focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Password & Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold text-slate-700 uppercase">Initial Password *</label>
                    <button
                      type="button"
                      onClick={handleGeneratePassword}
                      className="text-[10px] text-[#5191fa] hover:underline font-bold"
                    >
                      Generate New
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 focus:outline-none focus:border-[#5191fa] focus:bg-white"
                    />
                    <button
                      type="button"
                      onClick={handleCopyPassword}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                      title="Copy Password"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Country / Region</label>
                  <div className="relative">
                    <Globe className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="e.g. Pakistan, United States, Germany"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa] focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* System Role Selection */}
              <div className="pt-2 border-t border-slate-200">
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-[#5191fa]" />
                    <span>Assign Platform Role *</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-normal">
                    Category: <strong className="text-slate-700">{currentRoleConfig.category}</strong>
                  </span>
                </label>

                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-[#5191fa] focus:bg-white cursor-pointer"
                >
                  {PLATFORM_ROLES.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.label} ({r.category}) — {r.shortTitle}
                    </option>
                  ))}
                </select>

                {/* Role Description & Permissions Preview Box */}
                <div className={`mt-2.5 p-3.5 rounded-xl border ${currentRoleConfig.borderColor} ${currentRoleConfig.badgeBg} text-xs`}>
                  <div className="font-bold text-slate-900 mb-1 flex items-center justify-between">
                    <span className={currentRoleConfig.badgeText}>{currentRoleConfig.label}</span>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-white/70 text-slate-700">
                      {currentRoleConfig.permissions.length} Permissions Granted
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-700 mb-2 leading-relaxed">
                    {currentRoleConfig.description}
                  </p>
                  <div className="pt-2 border-t border-slate-300/50">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Granted System Capabilities:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {currentRoleConfig.permissions.map((perm, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] bg-white font-medium text-slate-800 shadow-xs border border-slate-200/60"
                        >
                          <Check className="w-2.5 h-2.5 text-emerald-600" />
                          <span>{perm}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Verification Toggle */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Mark as Verified Account</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Grants verified badge and expedites permit processing or vendor dispatch.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isVerified}
                    onChange={(e) => setIsVerified(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600" />
                </label>
              </div>

              {/* Form Actions */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={handleCloseAndReset}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 text-xs font-bold text-white bg-[#5191fa] hover:bg-[#3875dc] rounded-xl transition-all cursor-pointer shadow-md disabled:opacity-50 flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{submitting ? 'Creating User...' : 'Provision User Account'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

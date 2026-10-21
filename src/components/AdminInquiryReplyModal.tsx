import React, { useState } from 'react';
import { ContactInquiry } from '../context/AuthContext';
import {
  X, Mail, Send, Phone, MessageSquare, Copy, Check,
  Sparkles, CheckCircle2, AlertCircle
} from 'lucide-react';

interface AdminInquiryReplyModalProps {
  inquiry: ContactInquiry | null;
  isOpen: boolean;
  onClose: () => void;
  onSendReply: (inquiryId: string, replyText: string, updatedStatus: ContactInquiry['status']) => Promise<void>;
}

export const AdminInquiryReplyModal: React.FC<AdminInquiryReplyModalProps> = ({
  inquiry,
  isOpen,
  onClose,
  onSendReply
}) => {
  if (!isOpen || !inquiry) return null;

  const [subject, setSubject] = useState(() => {
    return `Re: ${inquiry.subject || 'Your Diran Peak Adventure Expedition Inquiry'}`;
  });

  const [replyBody, setReplyBody] = useState(() => {
    const greeting = inquiry.name ? `Dear ${inquiry.name},` : 'Dear Explorer,';
    let specificContext = '';
    if (inquiry.type === 'vehicle') {
      specificContext = `Thank you for your charter inquiry regarding our ${inquiry.specifics?.vehicle || '4x4 transport fleet'}.\n\nWe have checked vehicle availability for your requested route (${inquiry.specifics?.route || 'Karakoram Highway / Skardu'}). Our licensed mountain driver and equipped 4x4 with fuel provisions are ready for dispatch.\n\nEstimated daily tariff and itinerary coordination details are attached below.`;
    } else if (inquiry.type === 'hotel') {
      specificContext = `Thank you for your room reservation inquiry at ${inquiry.specifics?.hotel || 'our partner hotel'}.\n\nWe have coordinated with the hotel management for dates ${inquiry.specifics?.checkIn || 'TBD'} to ${inquiry.specifics?.checkOut || 'TBD'} (${inquiry.specifics?.roomType || 'Deluxe Room'}, ${inquiry.specifics?.guests || '2'} guests). Rooms are confirmed with breakfast and power generator backup.`;
    } else if (inquiry.type === 'guide_porter') {
      specificContext = `Thank you for submitting your application as ${inquiry.specifics?.roleApplied || 'Alpine Staff'} for our Gilgit-Baltistan expeditions.\n\nOur expedition directors in Skardu have reviewed your mountain experience (${inquiry.specifics?.experience || 'High altitude'}) and certifications. We would like to schedule an operational briefing regarding upcoming Karakoram trekking groups.`;
    } else if (inquiry.type === 'b2b_partner') {
      specificContext = `Thank you for your partnership inquiry with Diran Peak Adventure.\n\nAs a government DTS licensed tour operator (#1842) based in Skardu, we are delighted to explore B2B collaboration with your team. We provide complete visa Letters of Invitation (LOI), climbing permits, and ground handling across Pakistan.`;
    } else {
      specificContext = `Thank you for contacting Diran Peak Adventure regarding your mountain expedition inquiry.\n\nOur Baltistan basecamp team has reviewed your questions. We are pleased to provide the requested details and route recommendations.`;
    }

    return `${greeting}\n\n${specificContext}\n\nPlease let us know if you have any questions or require modifications.\n\nWarm regards,\nExpedition Operations Desk\nDiran Peak Adventure\nSkardu, Gilgit-Baltistan, Pakistan\nWhatsApp: +92 345 6412992\nEmail: noreply@diranpeakadverture.com`;
  });

  const [updateStatus, setUpdateStatus] = useState<ContactInquiry['status']>('Replied');
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSendAndSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyBody.trim()) return;

    setSending(true);
    try {
      await onSendReply(inquiry.id, replyBody.trim(), updateStatus);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1500);
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  const handleLaunchEmail = () => {
    const mailto = `mailto:${encodeURIComponent(inquiry.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(replyBody)}`;
    window.location.href = mailto;
  };

  const cleanPhone = (inquiry.phone || '').replace(/[^0-9]/g, '');
  const whatsAppUrl = cleanPhone
    ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(replyBody)}`
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-hidden shadow-2xl flex flex-col border border-slate-100">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#1a2b48] text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-white">
                Compose Official Reply
              </h3>
              <p className="text-xs text-slate-300">
                To: <strong>{inquiry.name}</strong> ({inquiry.email})
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

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {success ? (
            <div className="py-8 text-center animate-in fade-in">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
              <h4 className="font-heading font-bold text-lg text-slate-900">Reply Recorded Successfully!</h4>
              <p className="text-xs text-slate-500">Inquiry status has been updated to "{updateStatus}".</p>
            </div>
          ) : (
            <form onSubmit={handleSendAndSave} className="space-y-4">
              {/* Inquiry preview snippet */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700">
                <div className="font-bold text-slate-900 mb-1 flex items-center justify-between">
                  <span>Original Submission:</span>
                  <span className="font-mono text-[10px] text-slate-400">ID: {inquiry.id}</span>
                </div>
                <div className="line-clamp-2 text-slate-600 italic">
                  "{inquiry.message}"
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Email Subject
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#5191fa] focus:bg-white"
                />
              </div>

              {/* Message Body */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1 flex items-center justify-between">
                  <span>Reply Message</span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(replyBody);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="text-[10px] text-[#5191fa] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copied ? 'Copied!' : 'Copy Template'}</span>
                  </button>
                </label>
                <textarea
                  rows={8}
                  required
                  value={replyBody}
                  onChange={(e) => setReplyBody(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 leading-relaxed font-sans focus:outline-none focus:border-[#5191fa] focus:bg-white"
                />
              </div>

              {/* Status Update Dropdown */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <div className="text-xs font-bold text-slate-800">Update Inquiry Status To:</div>
                  <div className="text-[10px] text-slate-500">Record response in inquiry activity thread</div>
                </div>
                <select
                  value={updateStatus}
                  onChange={(e) => setUpdateStatus(e.target.value as ContactInquiry['status'])}
                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-800 cursor-pointer"
                >
                  <option value="Replied">Replied</option>
                  <option value="In Review">In Review</option>
                  <option value="Approved">Approved / Accepted</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              {/* Quick Actions & Submission */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleLaunchEmail}
                    className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-xl transition-colors cursor-pointer border border-blue-200 flex items-center gap-1.5"
                    title="Open default email client"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Open in Email Client</span>
                  </button>

                  {whatsAppUrl && (
                    <a
                      href={whatsAppUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] text-xs font-bold rounded-xl transition-colors inline-flex items-center gap-1.5 border border-[#25D366]/30"
                      title="Send response via WhatsApp"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Send on WhatsApp</span>
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-3.5 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={sending}
                    className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all cursor-pointer shadow-md disabled:opacity-50 flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{sending ? 'Saving Reply...' : 'Record & Complete Reply'}</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

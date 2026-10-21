import React, { useState } from 'react';
import { ContactInquiry, useAuth } from '../context/AuthContext';
import { AdminInquiryReplyModal } from './AdminInquiryReplyModal';
import {
  Search, Mail, Phone, Calendar, Trash2, CheckCircle2,
  Clock, Check, X, AlertCircle, MessageSquare, Send,
  Car, Building2, Award, Handshake, Mountain, FileDown,
  UserCheck, ShieldAlert, ArrowRight, CornerDownRight, Plus
} from 'lucide-react';

export type InquirySectionType = 'contact' | 'vehicle' | 'hotel' | 'guide_porter' | 'b2b_partner';

interface AdminInquirySectionProps {
  type: InquirySectionType;
  title: string;
  subtitle: string;
  inquiries: ContactInquiry[];
  onExportCsv?: () => void;
}

export const AdminInquirySection: React.FC<AdminInquirySectionProps> = ({
  type,
  title,
  subtitle,
  inquiries,
  onExportCsv
}) => {
  const { updateInquiryStatus, addInquiryComment, deleteInquiry, user } = useAuth();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedInquiryForReply, setSelectedInquiryForReply] = useState<ContactInquiry | null>(null);
  const [commentInputs, setCommentInputs] = useState<{ [id: string]: string }>({});
  const [savingCommentId, setSavingCommentId] = useState<string | null>(null);

  // Icon for category
  const renderIcon = () => {
    switch (type) {
      case 'vehicle':
        return <Car className="w-5 h-5 text-orange-500" />;
      case 'hotel':
        return <Building2 className="w-5 h-5 text-emerald-500" />;
      case 'guide_porter':
        return <Award className="w-5 h-5 text-indigo-500" />;
      case 'b2b_partner':
        return <Handshake className="w-5 h-5 text-purple-500" />;
      default:
        return <MessageSquare className="w-5 h-5 text-blue-500" />;
    }
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'New':
      case 'Pending':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'In Review':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'Replied':
      case 'Contacted':
        return 'bg-purple-100 text-purple-900 border-purple-300';
      case 'Approved':
      case 'Confirmed':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'Declined':
        return 'bg-rose-100 text-rose-900 border-rose-300';
      case 'Closed':
        return 'bg-slate-100 text-slate-800 border-slate-300';
      default:
        return 'bg-amber-100 text-amber-900 border-amber-300';
    }
  };

  const filteredInquiries = inquiries.filter((inq) => {
    if (statusFilter !== 'ALL') {
      const st = String(inq.status);
      if (statusFilter === 'New' && st !== 'New' && st !== 'Pending') return false;
      if (statusFilter === 'In Review' && st !== 'In Review') return false;
      if (statusFilter === 'Replied' && st !== 'Replied' && st !== 'Contacted') return false;
      if (statusFilter === 'Approved' && st !== 'Approved' && st !== 'Confirmed') return false;
      if (statusFilter === 'Closed' && st !== 'Closed' && st !== 'Declined') return false;
    }
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      const specificsStr = inq.specifics ? JSON.stringify(inq.specifics).toLowerCase() : '';
      const text = `${inq.name} ${inq.email} ${inq.phone || ''} ${inq.subject || ''} ${inq.message || ''} ${specificsStr}`.toLowerCase();
      return text.includes(q);
    }
    return true;
  });

  const handleAddComment = async (inquiryId: string) => {
    const text = (commentInputs[inquiryId] || '').trim();
    if (!text) return;

    setSavingCommentId(inquiryId);
    try {
      const author = user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Admin Operations' : 'Expedition Desk';
      await addInquiryComment(inquiryId, text, author, false);
      setCommentInputs(prev => ({ ...prev, [inquiryId]: '' }));
    } catch (err) {
      console.error(err);
    } finally {
      setSavingCommentId(null);
    }
  };

  const handleSendReply = async (inquiryId: string, replyText: string, updatedStatus: ContactInquiry['status']) => {
    const author = user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Expedition Director' : 'Expedition Director';
    await addInquiryComment(inquiryId, replyText, author, true);
    await updateInquiryStatus(inquiryId, updatedStatus);
  };

  const handleDelete = async (inquiryId: string) => {
    if (window.confirm('Are you sure you want to delete this submission? This cannot be undone.')) {
      await deleteInquiry(inquiryId);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 mb-8">
      {/* Header and Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-heading font-bold text-[#1a2b48] flex items-center gap-2.5">
            {renderIcon()}
            <span>{title}</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold font-mono">
              {inquiries.length}
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {subtitle}
          </p>
        </div>

        {/* Search and Export */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, route, details..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa] focus:bg-white"
            />
          </div>

          {onExportCsv && (
            <button
              type="button"
              onClick={onExportCsv}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
              title="Export records to CSV"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-6 pb-4 border-b border-slate-100">
        <span className="text-[11px] font-bold text-slate-400 uppercase mr-1">Status:</span>
        {[
          { id: 'ALL', label: `All (${inquiries.length})` },
          { id: 'New', label: `New / Pending (${inquiries.filter(i => i.status === 'New' || (i.status as any) === 'Pending').length})` },
          { id: 'In Review', label: `In Review (${inquiries.filter(i => i.status === 'In Review').length})` },
          { id: 'Replied', label: `Replied (${inquiries.filter(i => i.status === 'Replied' || i.status === 'Contacted').length})` },
          { id: 'Approved', label: `Approved (${inquiries.filter(i => i.status === 'Approved' || (i.status as any) === 'Confirmed').length})` },
          { id: 'Closed', label: `Closed (${inquiries.filter(i => i.status === 'Closed' || (i.status as any) === 'Declined').length})` }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setStatusFilter(tab.id)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
              statusFilter === tab.id
                ? 'bg-[#1a2b48] text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Inquiries List */}
      {filteredInquiries.length === 0 ? (
        <div className="py-12 text-center text-slate-500 text-xs">
          No records found matching this status filter or search query.
        </div>
      ) : (
        <div className="space-y-5">
          {filteredInquiries.map((inq) => {
            const cleanPhone = (inq.phone || '').replace(/[^0-9]/g, '');
            const hasComments = inq.comments && inq.comments.length > 0;

            return (
              <div
                key={inq.id}
                className="bg-white rounded-2xl p-5 border border-slate-200/90 hover:border-slate-300 shadow-xs transition-all"
              >
                {/* Header row: Submitter, Status, Date */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="font-heading font-bold text-base text-[#1a2b48]">
                        {inq.name}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${getStatusBadge(
                          inq.status
                        )}`}
                      >
                        {inq.status || 'New'}
                      </span>
                      {inq.isGuest && (
                        <span className="text-[10px] font-bold text-amber-800 bg-amber-100/90 px-2 py-0.5 rounded-full border border-amber-300/60">
                          Guest Submission
                        </span>
                      )}
                      <span className="text-xs text-slate-400">· {inq.date || inq.createdAt?.split('T')[0]}</span>
                    </div>

                    {/* Contact details */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                      <a
                        href={`mailto:${inq.email}`}
                        className="flex items-center gap-1 text-[#5191fa] hover:underline font-medium"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>{inq.email}</span>
                      </a>
                      {inq.phone && (
                        <>
                          <span>·</span>
                          <a
                            href={`https://wa.me/${cleanPhone}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1 text-emerald-600 hover:underline font-semibold"
                            title="Direct WhatsApp chat"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>{inq.phone} (WhatsApp)</span>
                          </a>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Status Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase text-slate-400">Status:</span>
                    <select
                      value={inq.status || 'New'}
                      onChange={(e) => updateInquiryStatus(inq.id, e.target.value as any)}
                      className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 cursor-pointer focus:outline-none focus:border-[#5191fa]"
                    >
                      <option value="New">New</option>
                      <option value="In Review">In Review</option>
                      <option value="Replied">Replied</option>
                      <option value="Approved">Approved</option>
                      <option value="Declined">Declined</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                </div>

                {/* Specifics Box based on Type */}
                <div className="bg-slate-50/90 rounded-xl p-4 border border-slate-200/80 mb-3 text-xs">
                  {type === 'vehicle' && (
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 pb-2">
                        <span className="font-bold text-[#1a2b48] flex items-center gap-1.5">
                          <Car className="w-4 h-4 text-orange-500" />
                          <span>Vehicle: {inq.specifics?.vehicle || inq.subject}</span>
                        </span>
                        {inq.specifics?.passengers && (
                          <span className="text-slate-500">
                            Party: <strong>{inq.specifics.passengers} Passengers</strong>
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                        <div>
                          <strong>Route Requested:</strong> {inq.specifics?.route || 'Not specified'}
                        </div>
                        {inq.specifics?.startDate && (
                          <div>
                            <strong>Travel Dates:</strong> {inq.specifics.startDate}
                          </div>
                        )}
                      </div>
                      {inq.specifics?.notes && (
                        <div className="text-slate-600 italic pt-1">
                          <strong>Passenger Notes:</strong> "{inq.specifics.notes}"
                        </div>
                      )}
                    </div>
                  )}

                  {type === 'hotel' && (
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 pb-2">
                        <span className="font-bold text-[#1a2b48] flex items-center gap-1.5">
                          <Building2 className="w-4 h-4 text-emerald-500" />
                          <span>Property: {inq.specifics?.hotel || inq.subject}</span>
                        </span>
                        <span className="text-slate-500">
                          Room: <strong>{inq.specifics?.roomType || 'Standard Room'}</strong> · Guests: <strong>{inq.specifics?.guests || '2'}</strong>
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                        <div>
                          <strong>Check-In:</strong> {inq.specifics?.checkIn || 'TBD'}
                        </div>
                        <div>
                          <strong>Check-Out:</strong> {inq.specifics?.checkOut || 'TBD'}
                        </div>
                      </div>
                      {inq.specifics?.notes && (
                        <div className="text-slate-600 italic pt-1">
                          <strong>Special Requests:</strong> "{inq.specifics.notes}"
                        </div>
                      )}
                    </div>
                  )}

                  {type === 'guide_porter' && (
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 pb-2">
                        <span className="font-bold text-[#1a2b48] flex items-center gap-1.5">
                          <Award className="w-4 h-4 text-indigo-500" />
                          <span>Specialty: {inq.specifics?.roleApplied || 'Alpine Mountain Staff'}</span>
                        </span>
                        <span className="text-slate-500">
                          Region: <strong>{inq.specifics?.region || 'Gilgit-Baltistan'}</strong>
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-700">
                        <div>
                          <strong>Experience:</strong> {inq.specifics?.experience || 'High altitude'}
                        </div>
                        {inq.specifics?.summits && (
                          <div>
                            <strong>Notable Summits:</strong> {inq.specifics.summits}
                          </div>
                        )}
                        {inq.specifics?.certifications && (
                          <div>
                            <strong>Licenses:</strong> {inq.specifics.certifications}
                          </div>
                        )}
                      </div>
                      {inq.specifics?.notes && (
                        <div className="text-slate-600 italic pt-1">
                          <strong>Bio &amp; Skills:</strong> "{inq.specifics.notes}"
                        </div>
                      )}
                    </div>
                  )}

                  {type === 'b2b_partner' && (
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 pb-2">
                        <span className="font-bold text-[#1a2b48] flex items-center gap-1.5">
                          <Handshake className="w-4 h-4 text-purple-500" />
                          <span>Agency / Organization: {(inq as any).companyName || inq.specifics?.companyName || inq.subject}</span>
                        </span>
                        <span className="text-slate-500">
                          Category: <strong>{(inq as any).category || inq.specifics?.category || 'B2B Partner'}</strong>
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                        <div>
                          <strong>Operating Location:</strong> {(inq as any).location || inq.specifics?.location || 'International'}
                        </div>
                        <div>
                          <strong>Primary Contact:</strong> {(inq as any).contactName || inq.name}
                        </div>
                      </div>
                      {((inq as any).details || inq.specifics?.details || inq.message) && (
                        <div className="text-slate-600 italic pt-1">
                          <strong>Collaboration Scope:</strong> "{(inq as any).details || inq.specifics?.details || inq.message}"
                        </div>
                      )}
                    </div>
                  )}

                  {type === 'contact' && (
                    <div className="space-y-1.5">
                      <div className="font-bold text-slate-800">
                        Subject: {inq.subject || 'Expedition & Trekking Inquiry'}
                      </div>
                      {inq.tourTitle && (
                        <div className="text-[#5191fa] font-bold text-[11px]">
                          Tour Reference: {inq.tourTitle}
                        </div>
                      )}
                      <p className="text-slate-600 whitespace-pre-wrap leading-relaxed mt-1">
                        {inq.message}
                      </p>
                    </div>
                  )}
                </div>

                {/* Comment & Reply Thread */}
                {hasComments && (
                  <div className="mb-3 space-y-2 pt-2 border-t border-slate-100">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Communication &amp; Admin Notes History:
                    </div>
                    {inq.comments!.map((comment) => (
                      <div
                        key={comment.id}
                        className={`p-3 rounded-xl text-xs flex items-start gap-2.5 ${
                          comment.isReply
                            ? 'bg-blue-50/80 border border-blue-200/80 text-blue-900'
                            : 'bg-amber-50/80 border border-amber-200/80 text-amber-950'
                        }`}
                      >
                        <CornerDownRight className="w-3.5 h-3.5 shrink-0 mt-0.5 text-slate-400" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold">
                              {comment.author} {comment.isReply && '(Official Reply)'}
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono">
                              {new Date(comment.date).toLocaleString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                          <p className="whitespace-pre-wrap leading-relaxed">
                            {comment.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Internal Comment Input Box */}
                <div className="mb-3 flex items-center gap-2 pt-2 border-t border-slate-100">
                  <input
                    type="text"
                    value={commentInputs[inq.id] || ''}
                    onChange={(e) => setCommentInputs(prev => ({ ...prev, [inq.id]: e.target.value }))}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddComment(inq.id);
                      }
                    }}
                    placeholder="Add internal admin note (e.g. Quoted $140/day, assigned guide)..."
                    className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa] focus:bg-white"
                  />
                  <button
                    type="button"
                    disabled={savingCommentId === inq.id || !commentInputs[inq.id]?.trim()}
                    onClick={() => handleAddComment(inq.id)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer shrink-0"
                  >
                    Save Note
                  </button>
                </div>

                {/* Footer Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedInquiryForReply(inq)}
                      className="px-3 py-1.5 bg-[#5191fa] hover:bg-[#3875dc] text-white font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Reply / Compose Message</span>
                    </button>

                    {cleanPhone && (
                      <a
                        href={`https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(
                          inq.name
                        )},%20thank%20you%20for%20contacting%20Diran%20Peak%20Adventure.`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-bold rounded-xl transition-colors inline-flex items-center gap-1.5"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Chat on WhatsApp</span>
                      </a>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDelete(inq.id)}
                    className="text-xs text-rose-500 hover:text-rose-700 flex items-center gap-1 font-semibold cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Reply Modal */}
      {selectedInquiryForReply && (
        <AdminInquiryReplyModal
          inquiry={selectedInquiryForReply}
          isOpen={Boolean(selectedInquiryForReply)}
          onClose={() => setSelectedInquiryForReply(null)}
          onSendReply={handleSendReply}
        />
      )}
    </div>
  );
};

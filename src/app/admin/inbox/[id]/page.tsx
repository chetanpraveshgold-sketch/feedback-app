"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FeedbackRecord } from "@/lib/services/feedbackService";

export default function FeedbackDetailsPage() {
  const params = useParams();
  const rawId = (params?.id as string) || "";
  const id = decodeURIComponent(rawId);

  const [record, setRecord] = useState<FeedbackRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDetail() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/admin/feedback?type=detail&id=${encodeURIComponent(id)}`);
        const data = await res.json();
        setLoading(false);

        if (res.ok && data.status === "success") {
          setRecord(data.data);
        } else {
          setError(data.error || "Feedback record not found.");
        }
      } catch {
        setLoading(false);
        setError("Network error fetching feedback details.");
      }
    }
    if (id) fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="py-20 text-center text-xs text-gray-500">
        <svg className="animate-spin h-6 w-6 text-[#C8A568] mx-auto mb-2" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        Loading feedback record details...
      </div>
    );
  }

  if (error || !record) {
    return (
      <div className="space-y-4 my-8">
        <Link href="/admin/inbox" className="text-xs text-[#AE8448] font-bold hover:underline">
          &larr; Back to Inbox
        </Link>
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center text-xs text-red-700">
          {error || "Feedback record could not be found."}
        </div>
      </div>
    );
  }

  const isLow = record.rating <= 6;
  const isMid = record.rating >= 7 && record.rating <= 8;
  const categoryLabel = isLow ? "Score 1–6 (Low)" : isMid ? "Score 7–8 (Mid)" : "Score 9–10 (High)";
  const categoryBadgeClass = isLow
    ? "bg-red-100 text-red-900 border-red-200"
    : isMid
    ? "bg-amber-100 text-amber-900 border-amber-200"
    : "bg-emerald-100 text-emerald-900 border-emerald-200";

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
      {/* Top Breadcrumb */}
      <div>
        <Link
          href="/admin/inbox"
          className="inline-flex items-center text-xs font-bold text-[#AE8448] hover:text-[#421111] transition-colors"
        >
          &larr; Back to Feedback Inbox
        </Link>
      </div>

      {/* Main Details Card */}
      <div className="bg-white border border-[#E6DED3] rounded-2xl shadow-sm overflow-hidden">
        {/* Card Header Band */}
        <div className="bg-[#421111] px-6 py-5 text-white border-b border-[#AE8448]/30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#C8A568]">
              Feedback Reference ID
            </span>
            <h1 className="text-xl font-mono font-bold text-[#E7D2A5]">{record.id}</h1>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-[10px] uppercase text-gray-300">Submitted Date & Time</span>
            <p className="text-xs font-medium text-white">{record.created_at}</p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Key Attributes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-[#FAF9F7] border border-[#E6DED3]/60 rounded-xl p-5">
            
            {/* Recommendation Rating */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                Recommendation Score
              </span>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-extrabold text-gray-900">{record.rating} / 10</span>
                <span className={`px-2.5 py-0.5 border rounded-full text-xs font-bold ${categoryBadgeClass}`}>
                  {categoryLabel}
                </span>
              </div>
            </div>

            {/* Mobile Number */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                Customer Mobile
              </span>
              <p className="text-base font-bold text-gray-900">
                {record.mobile_number ? (
                  record.mobile_number
                ) : (
                  <span className="text-gray-400 font-normal italic">Anonymous (Not Provided)</span>
                )}
              </p>
            </div>

            {/* Callback Requested */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                Contact Requested
              </span>
              <p className="text-base font-bold">
                {record.contact_requested ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 bg-red-100 text-red-800 rounded-md border border-red-200 text-xs font-extrabold">
                    ⚠️ YES (Customer Requested Contact)
                  </span>
                ) : (
                  <span className="text-gray-600 text-sm font-medium">NO</span>
                )}
              </p>
            </div>

            {/* Language */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                Submission Language
              </span>
              <p className="text-sm font-semibold text-gray-800 uppercase">
                {record.language === "en" ? "English (en)" : record.language === "hi" ? "Hindi (hi)" : "Marathi (mr)"}
              </p>
            </div>

            {/* Rating Label */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                Rating Label
              </span>
              <p className="text-sm font-semibold text-gray-800">
                {record.rating_label || "—"}
              </p>
            </div>
          </div>

          {/* Selected Reasons Checklist */}
          <div className="space-y-2 border-t border-[#E6DED3]/60 pt-5">
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              Selected Reasons & Concerns
            </h3>
            {record.selected_reasons.length === 0 ? (
              <p className="text-xs text-gray-400 italic">No specific options selected.</p>
            ) : (
              <div className="flex flex-wrap gap-2 pt-1">
                {record.selected_reasons.map((reason) => (
                  <span
                    key={reason}
                    className="px-3 py-1.5 bg-[#FFF8E8] border border-[#AE8448]/30 text-[#421111] font-semibold text-xs rounded-lg"
                  >
                    • {reason}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Custom Other Reason */}
          {record.other_reason && (
            <div className="space-y-2 border-t border-[#E6DED3]/60 pt-5">
              <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                Other Reason Details
              </h3>
              <div className="p-3.5 bg-[#FAF9F7] border border-[#E6DED3] rounded-xl text-xs text-gray-800 font-medium">
                {record.other_reason}
              </div>
            </div>
          )}

          {/* Customer Experience Comment */}
          {record.experience_comment && (
            <div className="space-y-2 border-t border-[#E6DED3]/60 pt-5">
              <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                Customer Experience Comment
              </h3>
              <div className="p-4 bg-[#FAF9F7] border border-[#E6DED3] rounded-xl text-xs text-gray-800 italic leading-relaxed">
                &ldquo;{record.experience_comment}&rdquo;
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

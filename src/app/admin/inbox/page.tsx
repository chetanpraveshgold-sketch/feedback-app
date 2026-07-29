"use client";

import React, { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { FeedbackRecord } from "@/lib/services/feedbackService";

export default function AdminInboxPage() {
  const [items, setItems] = useState<FeedbackRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters state
  const [search, setSearch] = useState("");
  const [scoreCategory, setScoreCategory] = useState("all");
  const [contactRequested, setContactRequested] = useState("all");
  const [language, setLanguage] = useState("all");

  const [, startTransition] = useTransition();

  const fetchInbox = async () => {
    setLoading(true);
    setError("");
    try {
      const query = new URLSearchParams({
        type: "inbox",
        search,
        scoreCategory,
        contactRequested,
        language,
      }).toString();

      const res = await fetch(`/api/admin/feedback?${query}`);
      const data = await res.json();
      setLoading(false);

      if (res.ok && data.status === "success") {
        setItems(data.data);
      } else {
        setError(data.error || "Failed to fetch inbox records.");
      }
    } catch {
      setLoading(false);
      setError("Network error fetching feedback inbox.");
    }
  };

  useEffect(() => {
    fetchInbox();
  // eslint-disable-next-deps
  }, [scoreCategory, contactRequested, language]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(() => {
      fetchInbox();
    });
  };

  const resetFilters = () => {
    setSearch("");
    setScoreCategory("all");
    setContactRequested("all");
    setLanguage("all");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[#E6DED3] pb-4">
        <div>
          <h1 className="text-xl font-serif font-bold text-gray-900">Feedback Inbox</h1>
          <p className="text-xs text-gray-500">Detailed list of customer feedback responses</p>
        </div>
        <span className="text-xs font-semibold px-3 py-1 bg-[#421111] text-[#E7D2A5] rounded-lg self-start sm:self-auto">
          Total Responses: {items.length}
        </span>
      </div>

      {/* Filter Controls Box */}
      <div className="bg-white border border-[#E6DED3] rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
        <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Mobile / ID Search */}
          <div className="lg:col-span-1">
            <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">Search</label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search mobile or ID..."
              className="w-full h-9 px-3 border border-[#D9CFC1] rounded-lg text-xs bg-[#FAF9F7] focus:outline-none focus:border-[#C8A568]"
            />
          </div>

          {/* Score Category Filter */}
          <div>
            <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">Score Category</label>
            <select
              value={scoreCategory}
              onChange={(e) => setScoreCategory(e.target.value)}
              className="w-full h-9 px-2.5 border border-[#D9CFC1] rounded-lg text-xs bg-[#FAF9F7] focus:outline-none focus:border-[#C8A568] font-medium"
            >
              <option value="all">All Scores (1–10)</option>
              <option value="1-6">🔴 Score 1–6 (Low)</option>
              <option value="7-8">🟡 Score 7–8 (Mid)</option>
              <option value="9-10">🟢 Score 9–10 (High)</option>
            </select>
          </div>

          {/* Contact Requested Filter */}
          <div>
            <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">Contact Requested</label>
            <select
              value={contactRequested}
              onChange={(e) => setContactRequested(e.target.value)}
              className="w-full h-9 px-2.5 border border-[#D9CFC1] rounded-lg text-xs bg-[#FAF9F7] focus:outline-none focus:border-[#C8A568] font-medium"
            >
              <option value="all">All Responses</option>
              <option value="yes">YES (Requested Callback)</option>
              <option value="no">NO</option>
            </select>
          </div>

          {/* Language Filter */}
          <div>
            <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full h-9 px-2.5 border border-[#D9CFC1] rounded-lg text-xs bg-[#FAF9F7] focus:outline-none focus:border-[#C8A568] font-medium"
            >
              <option value="all">All Languages</option>
              <option value="en">English (en)</option>
              <option value="hi">Hindi (hi)</option>
              <option value="mr">Marathi (mr)</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex items-end space-x-2">
            <button
              type="submit"
              className="flex-1 h-9 bg-[#421111] hover:bg-[#300B0B] text-white text-xs font-bold rounded-lg transition-all"
            >
              Apply
            </button>
            <button
              type="button"
              onClick={resetFilters}
              className="h-9 px-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg transition-all"
            >
              Reset
            </button>
          </div>
        </form>
      </div>

      {/* Main Inbox Data Table */}
      <div className="bg-white border border-[#E6DED3] rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-xs text-gray-500">
            <svg className="animate-spin h-6 w-6 text-[#C8A568] mx-auto mb-2" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Loading feedback records...
          </div>
        ) : error ? (
          <div className="py-12 text-center text-xs text-red-600">{error}</div>
        ) : items.length === 0 ? (
          <div className="py-16 text-center text-xs text-gray-500 space-y-1">
            <p className="font-bold text-gray-700 text-sm">No feedback records found</p>
            <p>Try adjusting your search criteria or filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-[#FAF9F7] border-b border-[#E6DED3] text-gray-700 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Date & Time</th>
                  <th className="py-3 px-4">Feedback ID</th>
                  <th className="py-3 px-4">Mobile</th>
                  <th className="py-3 px-4">Score</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Selected Reasons</th>
                  <th className="py-3 px-4">Callback?</th>
                  <th className="py-3 px-4">Lang</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6DED3]/60">
                {items.map((item) => {
                  const isLow = item.rating <= 6;
                  const isMid = item.rating >= 7 && item.rating <= 8;
                  const categoryLabel = isLow ? "Score 1–6" : isMid ? "Score 7–8" : "Score 9–10";
                  const categoryClass = isLow
                    ? "bg-red-100 text-red-800"
                    : isMid
                    ? "bg-amber-100 text-amber-900"
                    : "bg-emerald-100 text-emerald-900";

                  return (
                    <tr key={item.id} className="hover:bg-[#FAF9F6] transition-colors">
                      <td className="py-3.5 px-4 text-gray-600 whitespace-nowrap">{item.created_at}</td>
                      <td className="py-3.5 px-4 font-mono font-bold text-gray-900 whitespace-nowrap">{item.id}</td>
                      <td className="py-3.5 px-4 font-medium text-gray-800 whitespace-nowrap">
                        {item.mobile_number ? (
                          item.mobile_number
                        ) : (
                          <span className="text-gray-400 italic font-normal">Anonymous</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="font-bold text-gray-900">{item.rating} / 10</span>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold ${categoryClass}`}>
                          {categoryLabel}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-gray-700 max-w-xs truncate">
                        {item.selected_reasons.join(", ") || (item.other_reason ? item.other_reason : "—")}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {item.contact_requested ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-extrabold bg-red-50 text-red-700 border border-red-200">
                            YES
                          </span>
                        ) : (
                          <span className="text-gray-400 font-medium">NO</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 uppercase text-gray-500 font-bold text-[11px] whitespace-nowrap">
                        {item.language}
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <Link
                          href={`/admin/inbox/${encodeURIComponent(item.id)}`}
                          className="px-3 py-1.5 bg-[#421111] text-white hover:text-[#E7D2A5] rounded-lg text-xs font-bold transition-all hover:bg-[#300B0B]"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

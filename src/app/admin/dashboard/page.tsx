"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { OverviewMetrics } from "@/lib/services/feedbackService";

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState<OverviewMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOverview = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/feedback?type=overview");
      const data = await res.json();
      setLoading(false);

      if (res.ok && data.status === "success") {
        setMetrics(data.data);
      } else {
        setError(data.error || "Failed to load dashboard metrics.");
      }
    } catch {
      setLoading(false);
      setError("Network error fetching metrics.");
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-3">
        <svg className="animate-spin h-8 w-8 text-[#C8A568]" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <p className="text-xs text-gray-500 font-medium">Loading executive analytics...</p>
      </div>
    );
  }

  if (error || !metrics) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center space-y-3 my-8">
        <p className="text-sm font-semibold text-red-800">{error || "Unable to load dashboard data."}</p>
        <button
          type="button"
          onClick={fetchOverview}
          className="px-4 py-2 bg-[#421111] text-white text-xs font-bold rounded-lg hover:bg-[#300B0B]"
        >
          Retry Loading
        </button>
      </div>
    );
  }

  const hasData = metrics.totalFeedback > 0;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[#E6DED3] pb-4">
        <div>
          <h1 className="text-xl font-serif font-bold text-gray-900">Executive Overview</h1>
          <p className="text-xs text-gray-500">Real-time feedback metrics & sentiment analytics</p>
        </div>
        <button
          type="button"
          onClick={fetchOverview}
          className="self-start sm:self-auto px-3 py-1.5 bg-white border border-[#E6DED3] hover:bg-[#FAF9F7] text-gray-700 text-xs font-semibold rounded-lg flex items-center space-x-1.5 transition-all"
        >
          <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Refresh Data</span>
        </button>
      </div>

      {!hasData ? (
        <div className="bg-white border border-[#E6DED3] rounded-2xl p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#FFF8E8] text-[#C8A568] mx-auto flex items-center justify-center font-bold text-xl">
            ?
          </div>
          <h3 className="text-base font-bold text-gray-800">No Feedback Responses Yet</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Feedback responses submitted by customers will automatically appear here in real-time.
          </p>
        </div>
      ) : (
        <>
          {/* Top 4 KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Total Feedback */}
            <div className="bg-white border border-[#E6DED3] rounded-2xl p-4 sm:p-5 shadow-sm space-y-1">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Feedback</span>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900">{metrics.totalFeedback}</div>
              <p className="text-[11px] text-gray-500">All submissions to date</p>
            </div>

            {/* Card 2: Received Today */}
            <div className="bg-white border border-[#E6DED3] rounded-2xl p-4 sm:p-5 shadow-sm space-y-1">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Received Today</span>
              <div className="text-2xl sm:text-3xl font-bold text-[#421111]">{metrics.receivedTodayCount}</div>
              <p className="text-[11px] text-gray-500">Submitted today (IST)</p>
            </div>

            {/* Card 3: Avg Score */}
            <div className="bg-white border border-[#E6DED3] rounded-2xl p-4 sm:p-5 shadow-sm space-y-1">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Avg Rec. Score</span>
              <div className="text-2xl sm:text-3xl font-bold text-[#C8A568]">
                {metrics.avgScore} <span className="text-xs text-gray-400 font-normal">/ 10</span>
              </div>
              <p className="text-[11px] text-gray-500">Overall average rating</p>
            </div>

            {/* Card 4: Contact Requests */}
            <div className="bg-white border border-[#E6DED3] rounded-2xl p-4 sm:p-5 shadow-sm space-y-1">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Contact Requests</span>
              <div className="text-2xl sm:text-3xl font-bold text-[#B64F45]">{metrics.contactRequestCount}</div>
              <p className="text-[11px] text-gray-500">{metrics.contactRequestPercentage} of total responses</p>
            </div>
          </div>

          {/* Recommendation Score Breakdown Section */}
          <div className="bg-white border border-[#E6DED3] rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-[#E6DED3]/60 pb-2">
              Recommendation Score Breakdown
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Score 1-6 (Low) */}
              <div className="bg-red-50/60 border border-red-200/80 rounded-xl p-4 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-red-900">
                  <span>🔴 Score 1–6 (Low)</span>
                  <span>{Math.round((metrics.lowScoreCount / metrics.totalFeedback) * 100)}%</span>
                </div>
                <div className="text-2xl font-extrabold text-red-950">{metrics.lowScoreCount}</div>
                <p className="text-[11px] text-red-700">Requires attention & follow-up</p>
              </div>

              {/* Score 7-8 (Mid) */}
              <div className="bg-amber-50/60 border border-amber-200/80 rounded-xl p-4 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-amber-900">
                  <span>🟡 Score 7–8 (Mid)</span>
                  <span>{Math.round((metrics.midScoreCount / metrics.totalFeedback) * 100)}%</span>
                </div>
                <div className="text-2xl font-extrabold text-amber-950">{metrics.midScoreCount}</div>
                <p className="text-[11px] text-amber-700">Passive recommendation</p>
              </div>

              {/* Score 9-10 (High) */}
              <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-xl p-4 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-900">
                  <span>🟢 Score 9–10 (High)</span>
                  <span>{Math.round((metrics.highScoreCount / metrics.totalFeedback) * 100)}%</span>
                </div>
                <div className="text-2xl font-extrabold text-emerald-950">{metrics.highScoreCount}</div>
                <p className="text-[11px] text-emerald-700">High recommendation</p>
              </div>
            </div>
          </div>

          {/* Grid Section: Last 7-Day Trend & Top Concerns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Last 7-Day Trend Bar List */}
            <div className="bg-white border border-[#E6DED3] rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                📈 Last 7-Day Trend
              </h3>
              <div className="space-y-3">
                {metrics.last7DaysTrend.map((day) => (
                  <div key={day.date} className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-gray-700 font-medium">
                      <span>{day.date}</span>
                      <span className="font-bold text-gray-900">{day.total} responses</span>
                    </div>
                    {/* Visual Segmented Progress Bar */}
                    <div className="h-3.5 w-full bg-gray-100 rounded-full overflow-hidden flex">
                      {day.total > 0 ? (
                        <>
                          <div
                            style={{ width: `${(day.lowCount / day.total) * 100}%` }}
                            className="bg-[#C62828] h-full"
                            title={`Score 1-6: ${day.lowCount}`}
                          />
                          <div
                            style={{ width: `${(day.midCount / day.total) * 100}%` }}
                            className="bg-[#FFA000] h-full"
                            title={`Score 7-8: ${day.midCount}`}
                          />
                          <div
                            style={{ width: `${(day.highCount / day.total) * 100}%` }}
                            className="bg-[#388E3C] h-full"
                            title={`Score 9-10: ${day.highCount}`}
                          />
                        </>
                      ) : (
                        <div className="w-full h-full bg-gray-150" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center items-center space-x-4 pt-2 text-[11px] text-gray-600">
                <span className="flex items-center space-x-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C62828]" />
                  <span>Score 1–6</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFA000]" />
                  <span>Score 7–8</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#388E3C]" />
                  <span>Score 9–10</span>
                </span>
              </div>
            </div>

            {/* Top Selected Concerns */}
            <div className="bg-white border border-[#E6DED3] rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                ⚠️ Top Selected Concerns & Reasons
              </h3>
              {metrics.topConcerns.length === 0 ? (
                <p className="text-xs text-gray-400 py-6 text-center">No concern data available.</p>
              ) : (
                <div className="space-y-3">
                  {metrics.topConcerns.map((item, idx) => (
                    <div key={item.reason} className="space-y-1">
                      <div className="flex items-center justify-between text-xs text-gray-800 font-semibold">
                        <span>
                          {idx + 1}. {item.reason}
                        </span>
                        <span className="text-gray-500 font-medium">
                          {item.count} ({item.percentage}%)
                        </span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                          style={{ width: `${Math.min(item.percentage, 100)}%` }}
                          className="h-full bg-[#421111] rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Latest Low-Score Feedback Alerts (Score 1-6) */}
          <div className="bg-white border border-[#E6DED3] rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#E6DED3]/60 pb-3">
              <h2 className="text-xs font-bold text-red-800 uppercase tracking-wider flex items-center space-x-1.5">
                <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>Recent Low-Rating Alerts (Score 1–6)</span>
              </h2>
              <Link href="/admin/inbox?scoreCategory=1-6" className="text-xs text-[#AE8448] font-bold hover:underline">
                View All in Inbox &rarr;
              </Link>
            </div>

            {metrics.latestLowScoreFeedback.length === 0 ? (
              <p className="text-xs text-gray-500 py-4 text-center">No low-rating feedback recorded recently 🎉</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF9F7] border-b border-[#E6DED3] text-gray-600 font-bold uppercase">
                    <tr>
                      <th className="py-2.5 px-3">Date</th>
                      <th className="py-2.5 px-3">ID</th>
                      <th className="py-2.5 px-3">Score</th>
                      <th className="py-2.5 px-3">Mobile</th>
                      <th className="py-2.5 px-3">Selected Reasons</th>
                      <th className="py-2.5 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {metrics.latestLowScoreFeedback.map((item) => (
                      <tr key={item.id} className="hover:bg-red-50/30 transition-colors">
                        <td className="py-3 px-3 text-gray-600">{item.created_at}</td>
                        <td className="py-3 px-3 font-mono font-bold text-gray-900">{item.id}</td>
                        <td className="py-3 px-3">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800">
                            🔴 {item.rating} / 10
                          </span>
                        </td>
                        <td className="py-3 px-3 text-gray-800 font-medium">
                          {item.mobile_number ? item.mobile_number : <span className="text-gray-400 italic">Anonymous</span>}
                        </td>
                        <td className="py-3 px-3 text-gray-700 max-w-xs truncate">
                          {item.selected_reasons.join(", ") || "—"}
                        </td>
                        <td className="py-3 px-3 text-right">
                          <Link
                            href={`/admin/inbox/${encodeURIComponent(item.id)}`}
                            className="px-2.5 py-1 bg-[#421111] text-white rounded text-[11px] font-bold hover:bg-[#300B0B]"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

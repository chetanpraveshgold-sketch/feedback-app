"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const isLoginPage = pathname === "/admin/login";

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.replace("/admin/login");
      router.refresh();
    } catch (e) {
      console.error("Logout error:", e);
    }
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#171717] font-sans flex flex-col">
      {/* Top Header */}
      <header className="bg-[#421111] text-white border-b border-[#AE8448]/30 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Left Logo & Brand */}
          <div className="flex items-center space-x-6">
            <Link href="/admin/dashboard" className="flex items-center space-x-3 focus:outline-none">
              <Image
                src="/PGLOGO.png"
                alt="Pravesh Gold"
                width={40}
                height={40}
                className="w-8 h-auto object-contain"
                priority
              />
              <span className="font-serif text-lg tracking-wide text-[#E7D2A5] hidden sm:inline-block">
                PG Survey CRM
              </span>
            </Link>

            {/* Navigation Tabs */}
            <nav className="flex space-x-1 sm:space-x-2 pl-2 border-l border-[#AE8448]/20">
              <Link
                href="/admin/dashboard"
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  pathname === "/admin/dashboard"
                    ? "bg-[#C8A568] text-[#421111] font-bold shadow-sm"
                    : "text-[#E7D2A5]/80 hover:text-white hover:bg-white/10"
                }`}
              >
                Overview
              </Link>
              <Link
                href="/admin/inbox"
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  pathname.startsWith("/admin/inbox")
                    ? "bg-[#C8A568] text-[#421111] font-bold shadow-sm"
                    : "text-[#E7D2A5]/80 hover:text-white hover:bg-white/10"
                }`}
              >
                Feedback Inbox
              </Link>
            </nav>
          </div>

          {/* Right Profile & Logout */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex flex-col text-right">
              <span className="text-xs font-semibold text-[#E7D2A5]">CRM Admin</span>
              <span className="text-[10px] text-gray-300 opacity-80">Version 1.0</span>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white/10 hover:bg-red-950/40 text-red-200 border border-red-300/30 transition-all flex items-center space-x-1.5 focus:outline-none"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Page Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#E6DED3] py-4 text-center text-xs text-gray-500">
        Pravesh Gold Survey Portal &copy; 2026 — Integration-Prepared for Vera CRM
      </footer>
    </div>
  );
}

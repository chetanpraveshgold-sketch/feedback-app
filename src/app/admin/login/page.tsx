"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok && data.status === "success") {
        router.replace("/admin/dashboard");
        router.refresh();
      } else {
        setError(data.error || "Invalid login credentials");
      }
    } catch {
      setLoading(false);
      setError("A network error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md bg-white border border-[#E6DED3] rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#421111] px-6 py-8 text-center border-b border-[#AE8448]/30">
          <Image
            src="/PGLOGO.png"
            alt="Pravesh Gold"
            width={90}
            height={90}
            className="w-20 h-auto mx-auto object-contain mb-3"
            priority
          />
          <h1 className="font-serif text-xl font-normal text-[#E7D2A5] tracking-wide">
            PG Survey Portal
          </h1>
          <p className="text-xs text-gray-300 mt-1">Management & Executive Analytics</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="p-6 sm:p-8 space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-semibold px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Username / Email
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin@praveshgold.com"
              className="w-full h-11 px-4 border border-[#D9CFC1] rounded-xl text-sm bg-[#FAF9F7] focus:outline-none focus:border-[#C8A568] text-gray-900 font-medium transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full h-11 px-4 border border-[#D9CFC1] rounded-xl text-sm bg-[#FAF9F7] focus:outline-none focus:border-[#C8A568] text-gray-900 font-medium transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-[#421111] hover:bg-[#300B0B] text-white hover:text-[#E7D2A5] border border-[#AE8448]/30 rounded-xl text-sm font-semibold uppercase tracking-wider transition-all duration-200 focus:outline-none flex items-center justify-center space-x-2 disabled:opacity-70 shadow-md active:scale-[0.99]"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-[#C8A568]" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Authenticating...</span>
              </>
            ) : (
              <span>Sign In to Dashboard</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

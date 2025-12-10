"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

interface AdminHeaderProps {
  subtitle?: string;
}

export default function AdminHeader({
  subtitle = "Admin Dashboard",
}: AdminHeaderProps) {
  const { data: session } = useSession();

  return (
    <div
      className="mx-auto px-4 sm:px-6 py-6 sticky top-0 z-50 border-b border-white/10"
      style={{
        background:
          "linear-gradient(135deg, #1e40af 0%, #3b82f6 40%, #06b6d4 100%)",
      }}
    >
      <div className="flex flex-col md:flex-row items-center justify-between container mx-auto gap-4 md:gap-0">
        {/* Left Section */}
        <div className="text-center md:text-left">
          <Link
            href="/admin"
            className="text-3xl md:text-4xl font-semibold text-white mb-2 inline-flex items-center gap-2"
            style={{
              textShadow:
                "0 4px 24px rgba(12,74,110,0.7), 0 2px 8px rgba(0,0,0,0.6), 0 1px 1px rgba(0,0,0,0.3)",
            }}
          >
            FPPCD
            <span className="text-xs font-bold px-2 py-1 bg-white text-blue-600 rounded  text-shadow-none">
              ADMIN
            </span>
          </Link>
          <p className="text-cyan-100 text-base sm:text-lg font-light">
            {subtitle}
          </p>
        </div>

        {/* Right Section */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
          <nav className="flex items-center gap-4">
            <Link
              href="/admin"
              className="text-cyan-100 hover:text-white transition-colors duration-200 font-medium"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/users"
              className="text-cyan-100 hover:text-white transition-colors duration-200 font-medium"
            >
              Users
            </Link>
            <Link
              href="/admin/reports"
              className="text-cyan-100 hover:text-white transition-colors duration-200 font-medium"
            >
              Reports
            </Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <span className="text-cyan-100">
              Welcome,{" "}
              <span className="text-white font-semibold">
                {session?.user?.name || "Admin"}
              </span>
            </span>
            <button
              onClick={() => {
                signOut();
              }}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all duration-200 backdrop-blur-sm border border-cyan-300/30"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

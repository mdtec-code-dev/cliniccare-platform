'use client';

import Link from 'next/link';
import { LayoutDashboard } from 'lucide-react';

export default function DashboardNotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 min-h-[60vh] text-center space-y-8 animate-in zoom-in-95 duration-500">
      {/* Visual Indicator */}
      <div className="relative">
        <h1 className="text-[100px] font-black text-slate-100 leading-none select-none">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="bg-white px-4 py-1 text-blue-700 font-bold rounded-lg shadow-sm border border-blue-100">
            Section Not Found
          </span>
        </div>
      </div>

      <div className="max-w-md space-y-3">
        <h2 className="text-2xl font-bold text-slate-800">
          Uups! Section not found
        </h2>
        <p className="text-slate-500 text-sm">
          You are currently <strong>inside the Clinic Dashboard</strong>, but
          this specific section doesn&apos;t exist in our active filing system.
        </p>
      </div>

      <div className="flex justify-center pt-4">
        <Link
          href="/dashboard"
          className="flex items-center justify-center gap-2 px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-2xl font-semibold transition-all shadow-lg active:scale-95 text-sm"
        >
          <LayoutDashboard size={18} />
          Go to Home
        </Link>
      </div>
    </div>
  );
}

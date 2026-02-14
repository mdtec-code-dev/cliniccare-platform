'use client';

import Link from 'next/link';
import { Home } from 'lucide-react';

export default function LoginNotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8 animate-in slide-in-from-bottom-4 duration-500">
        <div className="space-y-4">
          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] select-none">
            Authentication Portal
          </p>
          {/* Large 404 Text */}
          <div className="relative">
            <h1 className="text-[120px] font-black text-slate-200 leading-none select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-white px-4 py-1 text-blue-600 font-bold rounded-lg shadow-sm border border-blue-50">
                Invalid Auth Route
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-800">
            Access Control Wing
          </h2>
          <p className="text-slate-500">
            You are at the <strong>Login Area</strong>, but this specific
            authentication route is not available or has been restricted.
          </p>
        </div>

        <div className="flex justify-center pt-4">
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-semibold transition-all shadow-lg active:scale-95 w-full sm:w-auto"
          >
            <Home size={18} />
            Back to Login Screen
          </Link>
        </div>
      </div>
    </div>
  );
}

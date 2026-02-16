'use client';

import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8 animate-in fade-in duration-700">
        <div className="space-y-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] select-none">
            Clinic Entrance
          </p>
          {/* Large 404 Text */}
          <div className="relative">
            <h1 className="text-[120px] font-black text-slate-200 leading-none select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-white px-4 py-1 text-blue-600 font-bold rounded-lg shadow-sm border border-blue-50">
                Page Not Found
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-800">
            Oops! Lost in the Clinic?
          </h2>
          <p className="text-slate-500">
            You are <strong>outside the clinical system</strong>. The page you
            are looking for doesn&apos;t exist or is currently unavailable.
          </p>
        </div>

        <div className="flex justify-center pt-4">
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-semibold transition-all shadow-lg active:scale-95 w-full sm:w-auto"
          >
            <Home size={18} />
            Return to Entrance
          </Link>
        </div>
      </div>
    </div>
  );
}

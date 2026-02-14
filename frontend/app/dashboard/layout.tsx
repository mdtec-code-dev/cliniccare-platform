'use client';

import { ReactNode } from 'react';
import Header from '@/components/dashboard/layouts/header';
import MobileNav from '@/components/dashboard/layouts/mobile-nav';
import Footer from '@/components/dashboard/layouts/footer';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header - Prepared for both Mobile and Desktop */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 pb-24 lg:pb-8 flex flex-col">
        <div className="flex-1">{children}</div>
        <Footer />
      </main>

      {/* Mobile Navigation - Fixed Bottom */}
      <MobileNav />
    </div>
  );
}

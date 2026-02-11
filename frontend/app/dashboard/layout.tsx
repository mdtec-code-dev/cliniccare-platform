'use client';

import { ReactNode } from 'react';
import {
  Home,
  Calendar,
  Users,
  BriefcaseMedical,
  Search,
  Bell,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: ReactNode;
}

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: Home },
  { label: 'Appointments', href: '#', icon: Calendar },
  { label: 'Patients', href: '#', icon: Users },
  { label: 'Medical Records', href: '#', icon: BriefcaseMedical },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      {/* Header - Prepared for both Mobile and Desktop */}
      <header className="bg-white border-b border-zinc-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg">
              <Link href="/">
                <Image src="/logo.svg" alt="Logo" width={32} height={32} />
              </Link>
            </div>
            <span className="text-lg lg:text-2xl font-semibold tracking-tight text-zinc-900">
              CLINICARE
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_ITEMS.map(item => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-zinc-900',
                    isActive ? 'text-blue-600 font-semibold' : 'text-zinc-500'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Desktop Search */}
            <div className="hidden md:flex items-center relative group">
              <label htmlFor="desktop-search" className="sr-only">
                Search patients
              </label>
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-blue-500 transition-colors"
                size={18}
                aria-hidden="true"
              />
              <input
                id="desktop-search"
                type="text"
                placeholder="Search patients..."
                className="pl-10 pr-4 py-2 bg-zinc-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all w-48 lg:w-64"
              />
            </div>

            <button
              className="p-2 text-zinc-500 hover:bg-zinc-100 rounded-full transition-colors md:hidden"
              aria-label="Toggle search"
            >
              <Search size={24} />
            </button>
            <button
              className="p-2 text-zinc-500 hover:bg-zinc-100 rounded-full transition-colors relative"
              aria-label="View notifications"
            >
              <Bell size={24} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-6 w-6 rounded-full bg-zinc-200 overflow-hidden ring-2 ring-transparent hover:ring-blue-500 transition-all cursor-pointer">
              <Image
                src="/avatars/avatar-mobile.png"
                alt="Profile"
                width={24}
                height={24}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 pb-24 lg:pb-8">
        {children}
      </main>

      {/* Mobile Navigation - Fixed Bottom */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-200 px-6 py-3 flex items-center justify-between z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.03)]"
        aria-label="Mobile navigation"
      >
        {NAV_ITEMS.map(item => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-1 transition-colors',
                isActive ? 'text-blue-600' : 'text-zinc-400'
              )}
              aria-label={item.label}
            >
              <Icon size={24} />
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Bell, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAV_ITEMS } from '@/constants/navigation';
import { useAuthStore } from '@/store/use-auth-store';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg">
            <Link href="/">
              <Image src="/logo.svg" alt="Logo" width={32} height={32} />
            </Link>
          </div>
          <span className="text-lg lg:text-2xl font-semibold tracking-tight text-slate-800">
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
                  'text-sm font-medium transition-colors hover:text-slate-800',
                  isActive ? 'text-blue-600 font-semibold' : 'text-slate-500'
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
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
              size={18}
              aria-hidden="true"
            />
            <input
              id="desktop-search"
              type="text"
              placeholder="Search patients..."
              className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all w-48 lg:w-64"
            />
          </div>

          <button
            className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative"
            aria-label="View notifications"
          >
            <Bell size={24} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-3 pl-2 sm:pl-4 border-l border-slate-100 h-8 cursor-pointer hover:opacity-80 transition-opacity">
                {/** Datos de usuario authenticado */}
                <div className="h-9 w-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold overflow-hidden shadow-sm">
                  {user?.username?.[0]?.toUpperCase() || 'D'}
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 mt-2 rounded-2xl border-slate-100 shadow-2xl p-2 animate-in fade-in zoom-in-95 duration-200"
            >
              {/** Datos de usuario authenticado  */}
              <DropdownMenuSeparator className="bg-slate-100" />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-500 focus:bg-red-50 focus:text-red-600 cursor-pointer rounded-xl py-2.5 px-3 gap-2 mt-1 font-semibold transition-colors"
              >
                <LogOut size={16} />
                <span>Cerrar sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

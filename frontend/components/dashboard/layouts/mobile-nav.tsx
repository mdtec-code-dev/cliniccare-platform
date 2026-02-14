'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { NAV_ITEMS } from '@/constants/navigation';

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3 flex items-center justify-between z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.03)]"
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
              isActive ? 'text-blue-600' : 'text-slate-600'
            )}
            aria-label={item.label}
          >
            <Icon size={24} />
          </Link>
        );
      })}
    </nav>
  );
}

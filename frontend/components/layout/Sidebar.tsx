'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { sidebarItems } from './sidebar.items';
import { useMe } from '@/modules/auth/hooks';
import { filterSidebarItems } from '@/modules/auth/utils/filter-menu';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSidebarStore } from '@/store/sidebar.store';

export default function Sidebar({ isCollapsed }: { isCollapsed: boolean }) {
  const pathname = usePathname();
  const { isCollapsed: isSidebarCollapsed, toggleCollapse } = useSidebarStore();
  const { data: user } = useMe();

  const filteredItems = filterSidebarItems(user ?? null, sidebarItems);

  return (
    <aside
      className={cn(
        'fixed left-0 top-8 bottom-0 z-30',
        'bg-background/80 backdrop-blur-xl border-r border-border',
        'transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex h-full flex-col">
        {/* HEADER */}
        <div
          className={cn(
            'flex items-center border-b border-border px-4 py-4',
            isCollapsed ? 'justify-center' : 'gap-3'
          )}
        >
          <Link href="/dashboard" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Logo"
              width={32}
              height={32}
              className="rounded"
            />

            {!isCollapsed && (
              <span className="text-lg font-semibold tracking-tight">
                CliniCare
              </span>
            )}
          </Link>
        </div>

        {/* USER */}
        {!isCollapsed && (
          <div className="px-4 py-3 border-b border-border">
            <p className="text-xs text-muted-foreground">
              Sesión iniciada como
            </p>
            <p className="text-sm font-medium truncate">{user?.username}</p>
          </div>
        )}

        {/* NAV */}
        <nav className="flex-1 overflow-y-auto px-2 py-4">
          <ul className="space-y-1">
            {filteredItems.map(item => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
                      'hover:bg-accent/60',
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground'
                    )}
                    title={isCollapsed ? item.label : undefined}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-primary" />
                    )}

                    <Icon className="h-5 w-5 flex-shrink-0" />

                    {!isCollapsed && (
                      <span className="truncate">{item.label}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* FOOTER */}
        <div className="border-t border-border p-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={isSidebarCollapsed ? toggleCollapse : toggleCollapse}
            className="w-full justify-center gap-2"
          >
            {isSidebarCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <>
                <ChevronLeft className="h-4 w-4" />
                <span className="text-sm">Colapsar</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </aside>
  );
}

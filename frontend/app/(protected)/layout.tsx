'use client';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMe } from '@/modules/auth/hooks';
import Sidebar from '@/components/layout/Sidebar';

import { useIsDesktop } from '@/hooks/use-desktop';
import { useSidebarStore } from '@/store/sidebar.store';
import { motion } from 'framer-motion';
import { MobileSidebar } from '@/components/layout/MobileSidebar';
import { Navbar } from '@/components/layout/Navbar';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const isDesktop = useIsDesktop();
  const router = useRouter();
  const { data: user, isLoading, isError } = useMe();

  const { isCollapsed } = useSidebarStore();

  useEffect(() => {
    if (!isLoading && (isError || !user)) {
      router.replace('/login');
    }
    setMounted(true);
  }, [isLoading, isError, user, router]);

  if (isLoading) return null;
  if (isError || !user) return null;

  if (!mounted) return null;

  const sidebarWidth = isCollapsed ? 80 : 260;

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar isCollapsed={isCollapsed} />
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar />
      {/* Content */}

      <motion.div
        initial={false}
        animate={{ marginLeft: isDesktop ? sidebarWidth : 0 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="min-h-screen flex flex-col"
      >
        <Navbar />
        <main className="flex-1 px-4 py-6 md:px-6 lg:px-8">{children}</main>
      </motion.div>
    </div>
  );
}

'use client';

import {
  Calendar,
  FileText,
  Users,
  Wallet,
  UserPlus,
  CloudOff,
  RefreshCw,
} from 'lucide-react';
import { SummaryCard } from '@/components/dashboard/summary-card';
import { APPOINTMENT_STATUS_VARIANTS } from '@/types/appointment';
import { AppointmentList } from '@/components/dashboard/appointment-list';
import { TableSkeleton } from '@/components/common/table-skeleton';
import { useAppointments } from '@/hooks/use-appointments';
import { useAuth } from '@/hooks/use-auth';

export default function DashboardPage() {
  const { user } = useAuth();
  const { appointments, stats, isLoading, error, refetch } = useAppointments();

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-xl lg:text-[32px] font-bold font-poppins text-slate-800">
            Good Morning, {user?.username} - {user?.role}
          </h1>
          <p className="text-slate-500 mt-1 text-sm lg:text-xl">
            Here&apos;s what&apos;s happening at your clinic today
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-2 py-2 md:px-4 md:py-3 bg-white border border-slate-200 rounded-xl text-sm lg:text-base font-semibold text-slate-800 hover:bg-slate-50 transition-colors shadow-sm">
            <UserPlus size={18} />
            <span>Register Patient</span>
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-2 py-2 md:px-4 md:py-3 bg-blue-600 rounded-xl text-sm lg:text-base font-semibold text-white hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20">
            <Calendar size={18} />
            <span>New Appointment</span>
          </button>
        </div>
      </div>

      {error ? (
        /* Friendly Connection Error State */
        <div className="p-16 bg-white rounded-[32px] border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center space-y-6">
          <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center text-red-500">
            <CloudOff size={40} />
          </div>
          <div className="max-w-md space-y-2">
            <h3 className="text-2xl font-bold text-slate-800">
              Connection Issue
            </h3>
            <p className="text-slate-500">
              We&apos;re having trouble connecting to the system. This might be
              a temporary network issue. Please try again or contact support if
              the problem persists.
            </p>
            <div className="mt-4 p-2 bg-slate-50 rounded-lg border border-slate-100 inline-block">
              <span className="text-[10px] text-slate-400 font-mono uppercase tracking-widest block mb-1">
                Error Reference
              </span>
              <code className="text-xs text-red-500 font-mono">
                {error.message}
              </code>
            </div>
          </div>
          <button
            onClick={() => refetch()}
            className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-semibold hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200"
          >
            <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
            Try to Reconnect
          </button>
        </div>
      ) : (
        <>
          {/* Summary Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <SummaryCard
              title="Appointment Today"
              value={stats.appointmentsToday}
              icon={Calendar}
              iconClassName="text-red-500 bg-red-50"
              isLoading={isLoading}
            />
            <SummaryCard
              title="Pending Reports"
              value={stats.pendingReports}
              icon={FileText}
              iconClassName="text-amber-500 bg-amber-50"
              isLoading={isLoading}
            />
            <SummaryCard
              title="Active Patients"
              value={stats.activePatients}
              icon={Users}
              iconClassName="text-blue-500 bg-blue-50"
              isLoading={isLoading}
            />
            <SummaryCard
              title="Monthly Revenue"
              value={`$${stats.monthlyRevenue.toFixed(2)}`}
              icon={Wallet}
              iconClassName="text-emerald-500 bg-emerald-50"
              isLoading={isLoading}
            />
          </div>

          {/* Appointments Table Section */}
          {isLoading ? (
            <TableSkeleton />
          ) : appointments.length === 0 ? (
            <div className="p-12 bg-white rounded-3xl border border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
              <h3 className="text-lg font-bold text-slate-800">
                There&apos;s nothing here yet
              </h3>
              <p className="text-slate-500 text-sm mt-2">
                Create patients and appointments to see them here.
              </p>
            </div>
          ) : (
            <AppointmentList
              appointments={appointments}
              statusVariants={APPOINTMENT_STATUS_VARIANTS}
            />
          )}
        </>
      )}
    </div>
  );
}

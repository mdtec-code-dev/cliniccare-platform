import { Skeleton } from '@/components/ui/skeleton';
import { TableSkeleton } from '@/components/common/table-skeleton';

export default function DashboardLoading() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* ... previous code ... */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-10 w-64 lg:w-96" />
          <Skeleton className="h-5 w-48 lg:w-72" />
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-12 w-32 md:w-36 rounded-xl" />
          <Skeleton className="h-12 w-32 md:w-36 rounded-xl" />
        </div>
      </div>

      {/* Summary Grid Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[1, 2, 3, 4].map(i => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center gap-2"
          >
            <Skeleton className="w-12 h-12 rounded-xl" />
            <Skeleton className="w-24 h-4" />
            <Skeleton className="w-16 h-8" />
          </div>
        ))}
      </div>

      {/* Appointments Section Skeleton */}
      <TableSkeleton />
    </div>
  );
}

import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconClassName?: string;
}

export function SummaryCard({
  title,
  value,
  icon: Icon,
  iconClassName,
}: SummaryCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 flex flex-col items-center justify-center text-center gap-2 transition-all hover:shadow-md">
      <div className={cn('p-3 rounded-xl bg-zinc-50', iconClassName)}>
        <Icon size={24} />
      </div>
      <p className="text-xs lg:text-sm font-medium text-zinc-500">{title}</p>
      <h3 className="text-xl lg:text-2xl font-bold text-zinc-900">{value}</h3>
    </div>
  );
}

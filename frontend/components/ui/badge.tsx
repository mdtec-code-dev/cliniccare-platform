import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type BadgeVariant = 'blue' | 'emerald' | 'amber' | 'red' | 'zinc';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  blue: 'bg-blue-50 text-blue-600',
  emerald: 'bg-emerald-50 text-emerald-600',
  amber: 'bg-amber-50 text-amber-600',
  red: 'bg-red-50 text-red-600',
  zinc: 'bg-zinc-100 text-zinc-600',
};

export function Badge({ children, variant = 'zinc', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-1 lg:px-3 lg:py-1 rounded-full text-[10px] lg:text-[11px] font-bold transition-colors',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

import {
  Home,
  Calendar,
  Users,
  BriefcaseMedical,
  LucideIcon,
} from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: Home },
  {
    label: 'Appointments',
    href: '#',
    icon: Calendar,
  },
  {
    label: 'Patients',
    href: '#',
    icon: Users,
  },
  {
    label: 'Medical Records',
    href: '#',
    icon: BriefcaseMedical,
  },
];

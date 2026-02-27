import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Shield,
  PawPrint
} from "lucide-react";

import { PERMISSIONS } from "@/modules/auth/utils/permissions";

export type SidebarItem = {
  label: string;
  href: string;
  icon: any;
  permission?: string;
};

export const sidebarItems: SidebarItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Pacientes",
    href: "/patients",
    icon: PawPrint,
    permission: PERMISSIONS.PATIENTS_READ,
  },
  {
    label: "propietarios",
    href: "/owners",
    icon: Users,
    permission: PERMISSIONS.PATIENTS_READ,
  },
  {
    label: "Citas",
    href: "/appointments",
    icon: Calendar,
    permission: PERMISSIONS.APPOINTMENTS_READ,
  },
  {
    label: "Historias Clínicas",
    href: "/medical-records",
    icon: FileText,
    permission: PERMISSIONS.MEDICAL_RECORDS_READ,
  },
  {
    label: "Usuarios",
    href: "/users",
    icon: Shield,
    permission: PERMISSIONS.USERS_READ,
  },
];

'use client';

import { Search, Calendar, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import type { AppointmentStatus } from '../types/appointment.types';
import { APPOINTMENT_STATUS_LABELS } from '../types/appointment.types';

interface AppointmentFiltersProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;

  selectedDoctor: string | 'all';
  onDoctorChange: (doctor: string | 'all') => void;

  selectedStatus: AppointmentStatus | 'all';
  onStatusChange: (status: AppointmentStatus | 'all') => void;

  searchPatient: string;
  onSearchChange: (search: string) => void;

  doctors: {
    id: string;
    full_name: string;
  }[];
}

export function AppointmentFilters({
  selectedDate,
  onDateChange,
  selectedDoctor,
  onDoctorChange,
  selectedStatus,
  onStatusChange,
  searchPatient,
  onSearchChange,
  doctors,
}: AppointmentFiltersProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-primary" />
        <h2 className="font-semibold text-foreground">Filtros</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Fecha */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Fecha</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input
              type="date"
              value={selectedDate.toISOString().split('T')[0]}
              onChange={e => onDateChange(new Date(e.target.value))}
              className="w-full pl-10 pr-3 py-2 bg-background border border-border rounded-md text-sm"
            />
          </div>
        </div>

        {/* Doctor */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Doctor</label>
          <Select
            value={selectedDoctor}
            onValueChange={value => onDoctorChange(value as string | 'all')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar doctor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>

              {doctors.length > 0 &&
                doctors.map(doctor => (
                  <SelectItem key={doctor.id} value={doctor.id}>
                    {doctor.full_name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        {/* Estado */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Estado</label>
          <Select
            value={selectedStatus}
            onValueChange={value =>
              onStatusChange(value as AppointmentStatus | 'all')
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar estado" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>

              {Object.entries(APPOINTMENT_STATUS_LABELS).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Paciente */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Paciente</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              placeholder="Buscar paciente..."
              value={searchPatient}
              onChange={e => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

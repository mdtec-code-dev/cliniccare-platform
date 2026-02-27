'use client';

import { useState, useMemo } from 'react';
import { AppointmentHeader } from '../components/AppointmentHeader';
import { AppointmentFilters } from '../components/AppointmentFilters';
import { WeeklyCalendar } from '../components/WeeklyCalendar';
import { AppointmentsList } from '../components/AppointmentList';
import { NewAppointmentModal } from '../components/NewAppointmentModal';
import { useUsers } from '@/modules/users/hooks/use-users';
import type { AppointmentStatus } from '../types/appointment.types';

export default function AppointmentPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDoctor, setSelectedDoctor] = useState<string | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<
    AppointmentStatus | 'all'
  >('all');
  const [searchPatient, setSearchPatient] = useState('');

  const { data: users = [], isLoading } = useUsers();

  // 🔥 Filtrar solo DOCTOR
  const doctors = useMemo(() => {
    return users
      .filter(user => user.role === 'DOCTOR')
      .map(user => ({
        id: String(user.id), // Select necesita string
        full_name: user.username, // adaptamos nombre
      }));
  }, [users]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Cargando doctores...
      </div>
    );
  }

  console.log('doctors:', doctors);

  return (
    <div className="min-h-screen bg-background">
      <AppointmentHeader onNewAppointment={() => setIsModalOpen(true)} />

      <div className="container mx-auto px-4 py-8">
        <AppointmentFilters
          doctors={doctors}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          selectedDoctor={selectedDoctor}
          onDoctorChange={setSelectedDoctor}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          searchPatient={searchPatient}
          onSearchChange={setSearchPatient}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-1">
            <WeeklyCalendar
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
            />
          </div>

          <div className="lg:col-span-2">
            <AppointmentsList
              selectedDate={selectedDate}
              selectedDoctor={selectedDoctor}
              selectedStatus={selectedStatus}
              searchPatient={searchPatient}
            />
          </div>
        </div>
      </div>

      <NewAppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

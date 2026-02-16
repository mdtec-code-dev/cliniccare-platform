import Image from 'next/image';
import { Eye, Edit } from 'lucide-react';
import { AppointmentSummary, AppointmentStatus } from '@/types/appointment';
import { Badge, type BadgeVariant } from '@/components/common/badge';

interface AppointmentListProps {
  appointments: AppointmentSummary[];
  statusVariants: Record<AppointmentStatus, BadgeVariant>;
}

export function AppointmentList({
  appointments,
  statusVariants,
}: AppointmentListProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg lg:text-2xl font-bold font-poppins text-slate-800">
          Upcoming Appointments
        </h2>
        <button className="text-sm lg:hidden font-semibold text-blue-600 hover:text-blue-700">
          View All
        </button>
      </div>

      {/* Mobile List View */}
      <div className="lg:hidden space-y-3">
        {appointments.map(apt => (
          <div
            key={apt.id}
            className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm"
          >
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-400 w-12">
                {apt.time.split(' ')[0]}
              </span>
              <div className="h-10 w-10 rounded-lg bg-slate-100 overflow-hidden">
                <Image
                  src="/pets/pet-1-mobile.png"
                  alt="Patient"
                  width={40}
                  height={40}
                />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">
                  {apt.patient.name}
                </h4>
                <p className="text-xs text-slate-500">{apt.reason}</p>
              </div>
            </div>
            <Badge variant={statusVariants[apt.status]}>{apt.status}</Badge>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-hidden bg-white rounded-2xl border border-slate-100 shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50 text-slate-400 text-xs font-semibold uppercase tracking-wider">
              <th className="px-6 py-4">Patient</th>
              <th className="px-6 py-4">Species & Breed</th>
              <th className="px-6 py-4">Time</th>
              <th className="px-6 py-4">Reason</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {appointments.map(apt => (
              <tr
                key={apt.id}
                className="group hover:bg-slate-50/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-slate-100 overflow-hidden">
                      <Image
                        src="/pets/pet-1-desktop.png"
                        alt="Patient"
                        width={36}
                        height={36}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        {apt.patient.name}
                      </p>
                      <p className="font-mono text-xs text-slate-400 uppercase">
                        {apt.patient.idNum}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-bold text-slate-800">
                    {apt.patient.species}
                  </p>
                  <p className="text-xs text-slate-400">{apt.patient.breed}</p>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-slate-500">
                  {apt.time}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-slate-500">
                  {apt.reason}
                </td>
                <td className="px-6 py-4">
                  <Badge variant={statusVariants[apt.status]}>
                    {apt.status}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors"
                      aria-label="View appointment details"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors"
                      aria-label="Edit appointment"
                    >
                      <Edit size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-500 font-medium">
            Showing 1 to 5 of 20 results
          </p>
          <div className="flex gap-2">
            <button
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-500 hover:bg-slate-50 transition-colors disabled:opacity-50"
              disabled
            >
              Previous
            </button>
            <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 hover:bg-slate-50 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

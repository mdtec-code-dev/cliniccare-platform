import {
  Calendar,
  FileText,
  Users,
  Wallet,
  UserPlus,
  Eye,
  Edit,
} from 'lucide-react';
import { SummaryCard } from '@/components/dashboard/summary-card';
import { Badge, type BadgeVariant } from '@/components/ui/badge';
import Image from 'next/image';

const MOCK_APPOINTMENTS = [
  {
    id: 1,
    time: '09:00 AM',
    patient: 'Jasper',
    idNum: '#CAT-1102',
    reason: 'Annual checkout',
    species: 'Cat',
    breed: 'Bengal',
    status: 'Completed',
  },
  {
    id: 2,
    time: '09:30 AM',
    patient: 'Jasper',
    idNum: '#CAT-1102',
    reason: 'Dental cleaning',
    species: 'Cat',
    breed: 'Bengal',
    status: 'Scheduled',
  },
  {
    id: 3,
    time: '10:00 AM',
    patient: 'Jasper',
    idNum: '#CAT-1102',
    reason: 'Consultation',
    species: 'Cat',
    breed: 'Bengal',
    status: 'No Show',
  },
  {
    id: 4,
    time: '10:30 AM',
    patient: 'Jasper',
    idNum: '#CAT-1102',
    reason: 'General checkout',
    species: 'Cat',
    breed: 'Bengal',
    status: 'Scheduled',
  },
  {
    id: 5,
    time: '11:00 AM',
    patient: 'Jasper',
    idNum: '#CAT-1102',
    reason: 'Initial checkout',
    species: 'Cat',
    breed: 'Bengal',
    status: 'Cancelled',
  },
];

const STATUS_VARIANTS: Record<string, BadgeVariant> = {
  Completed: 'blue',
  Scheduled: 'emerald',
  'No Show': 'amber',
  Cancelled: 'red',
};

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-xl lg:text-[32px] font-bold font-poppins text-zinc-900">
            Good Morning, Dr. Allison
          </h1>
          <p className="text-zinc-500 mt-1 text-sm lg:text-xl">
            Here&apos;s what&apos;s happening at your clinic today
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-2 py-2 md:px-4 md:py-3 bg-white border border-zinc-200 rounded-xl text-sm lg:text-base font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors shadow-sm">
            <UserPlus size={18} />
            <span>Register Patient</span>
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-2 py-2 md:px-4 md:py-3 bg-blue-600 rounded-xl text-sm lg:text-base font-semibold text-white hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20">
            <Calendar size={18} />
            <span>New Appointment</span>
          </button>
        </div>
      </div>

      {/* Summary Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <SummaryCard
          title="Appointment Today"
          value="24"
          icon={Calendar}
          iconClassName="text-red-500 bg-red-50"
        />
        <SummaryCard
          title="Pending Reports"
          value="16"
          icon={FileText}
          iconClassName="text-amber-500 bg-amber-50"
        />
        <SummaryCard
          title="Active Patients"
          value="234"
          icon={Users}
          iconClassName="text-blue-500 bg-blue-50"
        />
        <SummaryCard
          title="Monthly Revenue"
          value="$153.60"
          icon={Wallet}
          iconClassName="text-emerald-500 bg-emerald-50"
        />
      </div>

      {/* Upcoming Appointments Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg lg:text-2xl font-bold font-poppins text-zinc-900">
            Upcoming Appointments
          </h2>
          <button className="text-sm lg:hidden font-semibold text-blue-600 hover:text-blue-700">
            View All
          </button>
        </div>

        {/* Mobile List View */}
        <div className="lg:hidden space-y-3">
          {MOCK_APPOINTMENTS.map(apt => (
            <div
              key={apt.id}
              className="bg-white p-4 rounded-2xl border border-zinc-100 flex items-center justify-between shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-zinc-400 w-12">
                  {apt.time.split(' ')[0]}
                </span>
                <div className="h-10 w-10 rounded-lg bg-zinc-100 overflow-hidden">
                  <Image
                    src="/pets/pet-1-mobile.png"
                    alt="Patient"
                    width={40}
                    height={40}
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-900">
                    {apt.patient}
                  </h4>
                  <p className="text-xs text-zinc-500">{apt.reason}</p>
                </div>
              </div>
              <Badge variant={STATUS_VARIANTS[apt.status]}>{apt.status}</Badge>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-hidden bg-white rounded-2xl border border-zinc-100 shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-zinc-50/50 text-zinc-400 text-xs font-semibold uppercase tracking-wider">
                <th className="px-6 py-4">Patient</th>
                <th className="px-6 py-4">Species & Breed</th>
                <th className="px-6 py-4">Time</th>
                <th className="px-6 py-4">Reason</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {MOCK_APPOINTMENTS.map(apt => (
                <tr
                  key={apt.id}
                  className="group hover:bg-zinc-50/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-zinc-100 overflow-hidden">
                        <Image
                          src="/pets/pet-1-desktop.png"
                          alt="Patient"
                          width={36}
                          height={36}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-zinc-900">
                          {apt.patient}
                        </p>
                        <p className="font-mono text-xs text-zinc-400 uppercase">
                          {apt.idNum}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-zinc-900">
                      {apt.species}
                    </p>
                    <p className="text-xs text-zinc-400">{apt.breed}</p>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-zinc-500">
                    {apt.time}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-zinc-500">
                    {apt.reason}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={STATUS_VARIANTS[apt.status]}>
                      {apt.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-1.5 text-zinc-400 hover:text-blue-600 transition-colors"
                        aria-label="View appointment details"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        className="p-1.5 text-zinc-400 hover:text-blue-600 transition-colors"
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
          <div className="px-6 py-4 bg-zinc-50/50 border-t border-zinc-100 flex items-center justify-between">
            <p className="text-xs text-zinc-500 font-medium">
              Showing 1 to 5 of 20 results
            </p>
            <div className="flex gap-2">
              <button
                className="px-3 py-1.5 bg-white border border-zinc-200 rounded-lg text-xs font-semibold text-zinc-500 hover:bg-zinc-50 transition-colors disabled:opacity-50"
                disabled
              >
                Previous
              </button>
              <button className="px-3 py-1.5 bg-white border border-zinc-200 rounded-lg text-xs font-semibold text-zinc-900 hover:bg-zinc-50 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Desktop Only Information */}
      <footer className="hidden lg:flex pt-8 pb-4 items-center justify-between text-[11px] text-zinc-400 font-medium border-t border-zinc-100">
        <p>@2026 CLINICARE Medical SaaS. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-zinc-600">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-zinc-600">
            Terms of Service
          </a>
          <a href="#" className="hover:text-zinc-600">
            Help Center
          </a>
        </div>
      </footer>
    </div>
  );
}

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AppointmentHeaderProps {
  onNewAppointment: () => void;
}

export function AppointmentHeader({
  onNewAppointment,
}: AppointmentHeaderProps) {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Gestión de Citas
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Administra las citas veterinarias de tu clínica
          </p>
        </div>
        <Button
          onClick={onNewAppointment}
          size="lg"
          className="gap-2 bg-primary hover:bg-primary/90"
        >
          <Plus className="w-5 h-5" />
          Nueva Cita
        </Button>
      </div>
    </header>
  );
}

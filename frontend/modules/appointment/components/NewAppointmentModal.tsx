'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

interface NewAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const patients = [
  { id: 'max', name: 'Max' },
  { id: 'luna', name: 'Luna' },
  { id: 'rocky', name: 'Rocky' },
  { id: 'bella', name: 'Bella' },
  { id: 'charlie', name: 'Charlie' },
];

const owners = [
  { id: 'juan', name: 'Juan Pérez' },
  { id: 'maria', name: 'María López' },
  { id: 'carlos', name: 'Carlos Rodríguez' },
  { id: 'ana', name: 'Ana García' },
  { id: 'roberto', name: 'Roberto Martín' },
];

const doctors = [
  { id: 'garcia', name: 'Dr. García' },
  { id: 'martinez', name: 'Dra. Martínez' },
  { id: 'lopez', name: 'Dr. López' },
];

const appointmentTypes = [
  { id: 'consulta', label: 'Consulta' },
  { id: 'revision', label: 'Revisión' },
  { id: 'vacuna', label: 'Vacuna' },
  { id: 'cirugia', label: 'Cirugía' },
];

const statuses = [
  { id: 'programada', label: 'Programada' },
  { id: 'confirmada', label: 'Confirmada' },
  { id: 'cancelada', label: 'Cancelada' },
  { id: 'completada', label: 'Completada' },
  { id: 'no_show', label: 'No Show' },
];

export function NewAppointmentModal({
  isOpen,
  onClose,
}: NewAppointmentModalProps) {
  const [patient, setPatient] = useState('');
  const [owner, setOwner] = useState('');
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('programada');
  const [reminder, setReminder] = useState(true);
  const [active, setActive] = useState(true);
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    // Mock save - no actual backend logic
    console.log('Cita guardada:', {
      patient,
      owner,
      doctor,
      date,
      time,
      type,
      status,
      reminder,
      active,
      notes,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            Nueva Cita
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Completa los detalles de la cita veterinaria
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Section 1: Información Principal */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                1
              </span>
              Información Principal
            </h3>

            <div className="space-y-4 pl-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="patient"
                    className="text-foreground font-medium"
                  >
                    Paciente
                  </Label>
                  <Select value={patient} onValueChange={setPatient}>
                    <SelectTrigger
                      id="patient"
                      className="bg-background border-border"
                    >
                      <SelectValue placeholder="Seleccionar paciente" />
                    </SelectTrigger>
                    <SelectContent>
                      {patients.map(p => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="owner"
                    className="text-foreground font-medium"
                  >
                    Propietario
                  </Label>
                  <Select value={owner} onValueChange={setOwner}>
                    <SelectTrigger
                      id="owner"
                      className="bg-background border-border"
                    >
                      <SelectValue placeholder="Seleccionar propietario" />
                    </SelectTrigger>
                    <SelectContent>
                      {owners.map(o => (
                        <SelectItem key={o.id} value={o.id}>
                          {o.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="doctor" className="text-foreground font-medium">
                  Doctor
                </Label>
                <Select value={doctor} onValueChange={setDoctor}>
                  <SelectTrigger
                    id="doctor"
                    className="bg-background border-border"
                  >
                    <SelectValue placeholder="Seleccionar doctor (opcional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Sin asignar</SelectItem>
                    {doctors.map(d => (
                      <SelectItem key={d.id} value={d.id}>
                        {d.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator className="bg-border" />

          {/* Section 2: Fecha y Hora */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                2
              </span>
              Fecha y Hora
            </h3>

            <div className="space-y-4 pl-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="date" className="text-foreground font-medium">
                    Fecha
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="bg-background border-border"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="time" className="text-foreground font-medium">
                    Hora
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={time}
                    onChange={e => setTime(e.target.value)}
                    className="bg-background border-border"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="type" className="text-foreground font-medium">
                  Tipo de Cita
                </Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger
                    id="type"
                    className="bg-background border-border"
                  >
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {appointmentTypes.map(t => (
                      <SelectItem key={t.id} value={t.id}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator className="bg-border" />

          {/* Section 3: Estado y Configuración */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                3
              </span>
              Estado y Configuración
            </h3>

            <div className="space-y-4 pl-8">
              <div className="flex flex-col gap-2">
                <Label htmlFor="status" className="text-foreground font-medium">
                  Estado
                </Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger
                    id="status"
                    className="bg-background border-border"
                  >
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map(s => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border">
                  <Label
                    htmlFor="reminder"
                    className="text-foreground font-medium"
                  >
                    Recordatorio
                  </Label>
                  <Switch
                    id="reminder"
                    checked={reminder}
                    onCheckedChange={setReminder}
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border">
                  <Label
                    htmlFor="active"
                    className="text-foreground font-medium"
                  >
                    Activa
                  </Label>
                  <Switch
                    id="active"
                    checked={active}
                    onCheckedChange={setActive}
                  />
                </div>
              </div>
            </div>
          </div>

          <Separator className="bg-border" />

          {/* Section 4: Notas */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                4
              </span>
              Notas
            </h3>

            <div className="pl-8">
              <Textarea
                placeholder="Agregar notas adicionales sobre la cita..."
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="bg-background border-border text-foreground placeholder:text-muted-foreground min-h-24"
              />
            </div>
          </div>
        </div>

        {/* Footer with Action Buttons */}
        <div className="flex gap-3 justify-end pt-4 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-border hover:bg-muted"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Guardar Cita
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

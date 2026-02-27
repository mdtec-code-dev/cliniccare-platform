'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

import { useSpecies, useOwners } from '@/modules/patients/hooks';
import { useCreatePatient } from '@/modules/patients/hooks';
import { Gender } from '../types';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PatientRegistrationForm({ open, onOpenChange }: Props) {
  const { data: speciesList = [] } = useSpecies() as {
    data: Array<{ id: string; name: string }>;
  };
  const { data: owners = [] } = useOwners() as {
    data: Array<{ id: string; name: string; phone: string }>;
  };
  const { mutateAsync, isPending } = useCreatePatient();

  const [form, setForm] = useState({
    name: '',
    species_id: '',
    breed: '',
    birth_date: '',
    gender: 'macho' as Gender,
    owner_id: '',
    microchip: '',
    weight: '',
    allergies: '',
    chronic_conditions: '',
    notes: '',
  });

  function update(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await mutateAsync({
        name: form.name,
        species_id: form.species_id,
        breed: form.breed,
        birth_date: form.birth_date,
        gender: form.gender as Gender,
        owner_id: form.owner_id,
        microchip: form.microchip,
        weight: form.weight ? Number(form.weight) : undefined,
        allergies: form.allergies
          ? form.allergies.split(',').map(a => a.trim())
          : [],
        chronic_conditions: form.chronic_conditions
          ? form.chronic_conditions.split(',').map(c => c.trim())
          : [],
        notes: form.notes,
      });

      toast.success('Paciente registrado correctamente');
      onOpenChange(false);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.detail || 'Error registrando paciente'
      );
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle>Registrar Nuevo Paciente</DialogTitle>
          <DialogDescription>
            Complete la información del paciente
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Paciente */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Información del Paciente</h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Nombre *</Label>
                <Input
                  value={form.name}
                  onChange={e => update('name', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Especie *</Label>
                <Select
                  value={form.species_id}
                  onValueChange={value => update('species_id', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar especie" />
                  </SelectTrigger>
                  <SelectContent>
                    {speciesList.map(s => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Raza</Label>
                <Input
                  value={form.breed}
                  onChange={e => update('breed', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Fecha de nacimiento</Label>
                <Input
                  type="date"
                  value={form.birth_date}
                  onChange={e => update('birth_date', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Sexo *</Label>
                <Select
                  value={form.gender}
                  onValueChange={value => update('gender', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="macho">Macho</SelectItem>
                    <SelectItem value="hembra">Hembra</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Peso (kg)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={form.weight}
                  onChange={e => update('weight', e.target.value)}
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label>Microchip</Label>
                <Input
                  value={form.microchip}
                  onChange={e => update('microchip', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Owner */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Propietario</h3>

            <div className="space-y-2">
              <Label>Seleccionar propietario *</Label>
              <Select
                value={form.owner_id}
                onValueChange={value => update('owner_id', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar propietario" />
                </SelectTrigger>
                <SelectContent>
                  {owners.map(owner => (
                    <SelectItem key={owner.id} value={owner.id}>
                      {owner.name} - {owner.phone}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Médica */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Información Médica</h3>

            <Input
              placeholder="Alergias (separadas por coma)"
              value={form.allergies}
              onChange={e => update('allergies', e.target.value)}
            />

            <Input
              placeholder="Condiciones crónicas (separadas por coma)"
              value={form.chronic_conditions}
              onChange={e => update('chronic_conditions', e.target.value)}
            />

            <Textarea
              placeholder="Notas adicionales"
              value={form.notes}
              onChange={e => update('notes', e.target.value)}
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>

            <Button type="submit" disabled={isPending}>
              {isPending ? 'Guardando...' : 'Registrar Paciente'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

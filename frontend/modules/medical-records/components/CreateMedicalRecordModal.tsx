'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCreateMedicalRecord } from '../hooks/useCreateMedicalRecord';
import type {
  CreateMedicalRecordPayload,
  MedicalRecord,
} from '../types/medical-record.types';
import { usePatients } from '@/modules/patients/hooks/patients/use-patients';
import type { MedicalRecordType } from '../types/medical-record.types';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const medicalRecordTypeOptions: MedicalRecordType[] = [
  'consulta',
  'vacuna',
  'cirugia',
  'desparasitacion',
];

export function CreateMedicalRecordModal({ open, onOpenChange }: Props) {
  const { mutateAsync, isPending } = useCreateMedicalRecord();
  const { data: patients = [], isLoading } = usePatients();

  const initialForm: CreateMedicalRecordPayload = {
    patient_id: '',
    appointment_id: null,
    date: new Date().toISOString().split('T')[0],
    type: 'consulta',
    diagnosis: '',
    treatment: '',
    medications: [],
    observations: '',
    follow_up_date: null,
  };

  const [form, setForm] = useState<CreateMedicalRecordPayload>(initialForm);
  const [newMedication, setNewMedication] = useState('');

  const handleSubmit = async () => {
    if (!form.patient_id) {
      alert('Debes seleccionar un paciente');
      return;
    }

    try {
      await mutateAsync(form);

      setForm(initialForm);
      setNewMedication('');
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      alert('Error al crear la historia clínica');
    }
  };

  const handleAddMedication = () => {
    if (!newMedication.trim()) return;

    setForm(prev => ({
      ...prev,
      medications: [...prev.medications, newMedication.trim()],
    }));

    setNewMedication('');
  };

  const handleRemoveMedication = (index: number) => {
    setForm(prev => ({
      ...prev,
      medications: prev.medications.filter((_, i) => i !== index),
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nueva Historia Clínica</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Paciente */}
          <div>
            <label className="text-sm font-medium">Paciente</label>

            <select
              className="w-full border rounded-md p-2 mt-1 bg-background"
              value={form.patient_id}
              onChange={e =>
                setForm(prev => ({
                  ...prev,
                  patient_id: e.target.value,
                }))
              }
              disabled={isLoading}
            >
              <option value="">Seleccionar paciente</option>
              {patients.map(patient => (
                <option key={patient.id} value={patient.id}>
                  {patient.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tipo */}
          <div>
            <label className="text-sm font-medium">Tipo de Registro</label>

            <select
              className="w-full border rounded-md p-2 mt-1 bg-background"
              value={form.type}
              onChange={e =>
                setForm(prev => ({
                  ...prev,
                  type: e.target.value as MedicalRecordType,
                }))
              }
            >
              {medicalRecordTypeOptions.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Fecha */}
          <div>
            <label className="text-sm font-medium">Fecha</label>

            <Input
              type="date"
              value={form.date}
              onChange={e => setForm({ ...form, date: e.target.value })}
            />
          </div>

          {/* Diagnóstico */}
          <Input
            placeholder="Diagnóstico"
            value={form.diagnosis ?? ''}
            onChange={e => setForm({ ...form, diagnosis: e.target.value })}
          />

          {/* Tratamiento */}
          <Textarea
            placeholder="Tratamiento"
            value={form.treatment ?? ''}
            onChange={e => setForm({ ...form, treatment: e.target.value })}
          />

          {/* Medicamentos */}
          <div>
            <label className="text-sm font-medium">Medicamentos</label>

            <div className="flex gap-2 mt-1">
              <Input
                placeholder="Nombre medicamento"
                value={newMedication}
                onChange={e => setNewMedication(e.target.value)}
              />

              <Button type="button" onClick={handleAddMedication}>
                Agregar
              </Button>
            </div>

            {form.medications.length > 0 && (
              <div className="mt-2 space-y-1">
                {form.medications.map((med, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-secondary p-2 rounded"
                  >
                    <span className="text-sm">{med}</span>

                    <button
                      type="button"
                      className="text-red-500 text-xs"
                      onClick={() => handleRemoveMedication(index)}
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Observaciones */}
          <Textarea
            placeholder="Observaciones"
            value={form.observations ?? ''}
            onChange={e =>
              setForm({
                ...form,
                observations: e.target.value,
              })
            }
          />

          {/* Próximo control */}
          <div>
            <label className="text-sm font-medium">
              Próximo Control (opcional)
            </label>

            <Input
              type="date"
              value={form.follow_up_date ?? ''}
              onChange={e =>
                setForm({
                  ...form,
                  follow_up_date: e.target.value || null,
                })
              }
            />
          </div>

          {/* Botón Guardar */}
          <Button
            onClick={handleSubmit}
            disabled={isPending}
            className="w-full"
          >
            {isPending ? 'Guardando...' : 'Guardar'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

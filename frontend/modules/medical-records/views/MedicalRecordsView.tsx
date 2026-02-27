'use client';

import { useState } from 'react';
import { useMedicalRecords } from '../hooks/useMedicalRecords';
import { MedicalRecordsList } from '../components/HistoriesList';
import type { MedicalRecord } from '../types/medical-record.types';
import { MedicalRecordDetail } from '../components/HistoryDetail';
import { Button } from '@/components/ui/button';
import { CreateMedicalRecordModal } from '../components/CreateMedicalRecordModal';

export default function MedicalRecordsView() {
  const { data: medical = [], isLoading } = useMedicalRecords();

  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(
    null
  );

  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold"></h1>

          <Button onClick={() => setShowRegistrationForm(true)}>
            Nueva Historia Clinica
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Panel de Listado */}
          <div className="lg:col-span-1">
            <MedicalRecordsList
              records={medical}
              selectedId={selectedRecord?.id}
              onSelect={setSelectedRecord}
            />
          </div>

          {/* Panel de Detalle (cuando haya seleccionado) */}
          <div className="lg:col-span-2">
            {selectedRecord ? (
              <MedicalRecordDetail record={selectedRecord} />
            ) : (
              <div className="bg-card border border-border rounded-lg p-12 text-center">
                <p className="text-muted-foreground text-lg">
                  Selecciona una historia clínica para ver los detalles
                </p>
              </div>
            )}
          </div>
        </div>

        <CreateMedicalRecordModal
          open={showRegistrationForm}
          onOpenChange={setShowRegistrationForm}
        />
      </main>
    </div>
  );
}

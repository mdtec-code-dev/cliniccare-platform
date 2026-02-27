'use client';

import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowLeft,
  Calendar,
  FileText,
  Phone,
  Activity,
  AlertTriangle,
} from 'lucide-react';

import { usePatient } from '../hooks';
import { useMedicalRecordsByPatient } from '@/modules/medical-records/hooks/useMedicalRecordsByPatient';

export default function PatientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const patientId = params.id as string;

  const {
    data: patient,
    isLoading: loadingPatient,
    isError,
  } = usePatient(patientId);

  const { data: medicalRecords = [] } = useMedicalRecordsByPatient(patientId);

  if (loadingPatient) {
    return <div className="p-8">Cargando paciente...</div>;
  }

  if (isError || !patient) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">Paciente no encontrado</h1>
        <Button onClick={() => router.push('/')} className="mt-4">
          Volver
        </Button>
      </div>
    );
  }

  const age = calculateAge(patient.birth_date);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold">Ficha del Paciente</h1>
              <p className="text-sm text-muted-foreground">{patient.name}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Sidebar */}
          <div className="space-y-4">
            {/* Patient Card */}
            <Card>
              <CardContent className="p-6">
                <div className="mb-4 flex h-32 items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10">
                  {patient.photo ? (
                    <img
                      src={patient.photo}
                      alt={patient.name}
                      className="h-full w-full rounded-lg object-cover"
                    />
                  ) : (
                    <div className="text-4xl text-muted-foreground">
                      {patient.species.name === 'Perro'
                        ? '🐕'
                        : patient.species.name === 'Gato'
                          ? '🐈'
                          : '🐾'}
                    </div>
                  )}
                </div>

                <div className="mb-4 text-center">
                  <h2 className="text-2xl font-bold text-card-foreground">
                    {patient.name}
                  </h2>
                  <p className="text-muted-foreground">
                    {patient.breed} • {age}
                  </p>
                </div>

                <div className="space-y-3 border-t pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Sexo:</span>
                    <span className="font-medium text-card-foreground">
                      {patient.gender === 'macho' ? 'Macho' : 'Hembra'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Peso:</span>
                    <span className="font-medium text-card-foreground">
                      {patient.weight} kg
                    </span>
                  </div>
                  {patient.microchip && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Microchip:</span>
                      <span className="font-mono text-xs font-medium text-card-foreground">
                        {patient.microchip}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Registro:</span>
                    <span className="font-medium text-card-foreground">
                      {formatDate(patient.created_at)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Owner Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Información del Propietario
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-medium">{patient.owner.name}</p>

                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4" />
                  {patient.owner.phone}
                </div>

                {patient.owner.email && (
                  <div className="text-sm text-muted-foreground">
                    {patient.owner.email}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Alerts */}
            {((patient.allergies && patient.allergies.length > 0) ||
              (patient.chronic_conditions &&
                patient.chronic_conditions.length > 0)) && (
              <Card className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base text-amber-900 dark:text-amber-400">
                    <AlertTriangle className="h-4 w-4" />
                    Alertas Médicas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {patient.allergies && patient.allergies.length > 0 && (
                    <div>
                      <p className="mb-1 text-xs font-semibold text-amber-900 dark:text-amber-400">
                        Alergias:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {patient.allergies.map((allergy, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="border-amber-300 bg-amber-100 text-amber-900 dark:border-amber-700 dark:bg-amber-900/40 dark:text-amber-400"
                          >
                            {allergy}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {patient.chronic_conditions &&
                    patient.chronic_conditions.length > 0 && (
                      <div>
                        <p className="mb-1 text-xs font-semibold text-amber-900 dark:text-amber-400">
                          Condiciones Crónicas:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {patient.chronic_conditions.map(
                            (condition, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="border-amber-300 bg-amber-100 text-amber-900 dark:border-amber-700 dark:bg-amber-900/40 dark:text-amber-400"
                              >
                                {condition}
                              </Badge>
                            )
                          )}
                        </div>
                      </div>
                    )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="history">
              <TabsList>
                <TabsTrigger value="history">
                  <FileText className="h-4 w-4 mr-1" />
                  Historial Médico
                </TabsTrigger>
                <TabsTrigger value="appointments">
                  <Calendar className="h-4 w-4 mr-1" />
                  Citas
                </TabsTrigger>
              </TabsList>

              {/* Medical Records */}
              <TabsContent value="history" className="mt-4 space-y-4">
                {medicalRecords.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <FileText className="mb-4 h-12 w-12 text-muted-foreground" />
                      <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                        Sin historial médico
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        No hay registros médicos para este paciente
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  medicalRecords.map(record => (
                    <Card key={record.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-base">
                              {record.diagnosis}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(record.date)} • Dr.{' '}
                              {record.doctor.username}
                            </p>
                          </div>
                          <Badge className="bg-blue-500">{record.type}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <p className="mb-1 text-xs font-semibold text-muted-foreground">
                            Tratamiento:
                          </p>
                          <p className="text-sm text-card-foreground">
                            {record.treatment}
                          </p>
                        </div>
                        {record.medications &&
                          record.medications.length > 0 && (
                            <div>
                              <p className="mb-1 text-xs font-semibold text-muted-foreground">
                                Medicamentos:
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {record.medications.map((med, index) => (
                                  <Badge key={index} variant="secondary">
                                    {med}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        {record.observations && (
                          <div>
                            <p className="mb-1 text-xs font-semibold text-muted-foreground">
                              Observaciones:
                            </p>
                            <p className="text-sm text-card-foreground">
                              {record.observations}
                            </p>
                          </div>
                        )}
                        {record.follow_up_date && (
                          <div className="mt-3 rounded-lg bg-rose-400/20 p-3">
                            <p className="text-xs text-secondary-foreground">
                              Próximo seguimiento:{' '}
                              {formatDate(record.follow_up_date)}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              {/* Appointments */}
              {/* <TabsContent value="appointments" className="mt-4 space-y-4">
                {appointments.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      Sin citas registradas
                    </CardContent>
                  </Card>
                ) : (
                  appointments.map((apt) => (
                    <Card key={apt.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-semibold">
                              {formatDate(apt.start_time)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {apt.status}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent> */}
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}

function calculateAge(birth_date?: string | null): string {
  if (!birth_date) return 'Sin fecha';

  const birth = new Date(birth_date);
  const today = new Date();

  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  if (years > 0) {
    return `${years} ${years === 1 ? 'año' : 'años'}`;
  }

  return `${months} ${months === 1 ? 'mes' : 'meses'}`;
}

function formatDate(dateString?: string | null): string {
  if (!dateString) return 'Sin fecha';

  const date = new Date(dateString);

  if (isNaN(date.getTime())) return 'Fecha inválida';

  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

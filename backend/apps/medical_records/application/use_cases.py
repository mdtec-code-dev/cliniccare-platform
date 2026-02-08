from typing import Optional

from apps.medical_records.domain.repositories import MedicalRecordRepository
from apps.medical_records.domain.entities import MedicalRecordRules

from apps.patients.infrastructure.models import Pet
from apps.appointments.infrastructure.models import Appointment


class CreateMedicalRecordUseCase:

    def __init__(self, repository: MedicalRecordRepository):
        self.repository = repository

    def execute(
        self,
        patient_id: int,
        doctor_id: int,
        appointment_id: Optional[int] = None,
        diagnosis: Optional[str] = None,
        treatment: Optional[str] = None,
        observations: Optional[str] = None,
    ):
        MedicalRecordRules.validate_patient(patient_id)
        MedicalRecordRules.validate_doctor(doctor_id)

        # Validar que el paciente exista
        patient_exists = Pet.objects.filter(id=patient_id, is_active=True).exists()
        if not patient_exists:
            raise ValueError("El paciente no existe o está inactivo")

        # Validar appointment si se envía
        if appointment_id:
            appointment = Appointment.objects.filter(id=appointment_id).first()
            if not appointment:
                raise ValueError("El appointment_id no existe")

            if appointment.patient_id != patient_id:
                raise ValueError("El appointment no pertenece al paciente enviado")

        record = self.repository.create(
            patient_id=patient_id,
            doctor_id=doctor_id,
            appointment_id=appointment_id,
            diagnosis=diagnosis,
            treatment=treatment,
            observations=observations,
        )

        return record


class ListMedicalRecordsByPatientUseCase:

    def __init__(self, repository: MedicalRecordRepository):
        self.repository = repository

    def execute(self, patient_id: int):
        MedicalRecordRules.validate_patient(patient_id)

        patient_exists = Pet.objects.filter(id=patient_id, is_active=True).exists()
        if not patient_exists:
            raise ValueError("El paciente no existe o está inactivo")

        return self.repository.list_by_patient(patient_id)

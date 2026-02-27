from typing import Optional
from uuid import UUID
from datetime import date

from apps.medical_records.domain.repositories import MedicalRecordRepository
from apps.medical_records.domain.entities import MedicalRecordRules

from apps.patients.infrastructure.models import Patient
from apps.appointments.infrastructure.models import Appointment




class ListAllMedicalRecordsUseCase:
    def __init__(self, repository):
        self.repository = repository

    def execute(self):
        return self.repository.get_all()


class CreateMedicalRecordUseCase:

    def __init__(self, repository: MedicalRecordRepository):
        self.repository = repository

    def execute(
        self,
        patient_id: UUID,
        doctor_id: UUID,
        appointment_id: Optional[UUID] = None,
        record_date: Optional[date] = None,
        record_type: str = "consulta",
        diagnosis: Optional[str] = None,
        treatment: Optional[str] = None,
        medications: Optional[list] = None,
        observations: Optional[str] = None,
        follow_up_date: Optional[date] = None,
    ):
        MedicalRecordRules.validate_patient(patient_id)
        MedicalRecordRules.validate_doctor(doctor_id)
        MedicalRecordRules.validate_record_type(record_type)

        patient_exists = Patient.objects.filter(id=patient_id, is_active=True).exists()
        if not patient_exists:
            raise ValueError("El paciente no existe o está inactivo")

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
            record_date=record_date,
            record_type=record_type,
            diagnosis=diagnosis,
            treatment=treatment,
            medications=medications,
            observations=observations,
            follow_up_date=follow_up_date,
        )

        return record


class ListMedicalRecordsByPatientUseCase:

    def __init__(self, repository: MedicalRecordRepository):
        self.repository = repository

    def execute(self, patient_id: UUID):
        MedicalRecordRules.validate_patient(patient_id)

        patient_exists = Patient.objects.filter(id=patient_id, is_active=True).exists()
        if not patient_exists:
            raise ValueError("El paciente no existe o está inactivo")

        return self.repository.list_by_patient(patient_id)


class ListMedicalRecordsByAppointmentUseCase:

    def __init__(self, repository: MedicalRecordRepository):
        self.repository = repository

    def execute(self, appointment_id: UUID):
        if not appointment_id:
            raise ValueError("appointment_id es obligatorio")

        appointment_exists = Appointment.objects.filter(id=appointment_id).exists()
        if not appointment_exists:
            raise ValueError("El appointment no existe")

        return self.repository.list_by_appointment(appointment_id)


class GetMedicalRecordByIdUseCase:

    def __init__(self, repository: MedicalRecordRepository):
        self.repository = repository

    def execute(self, record_id: UUID):
        if not record_id:
            raise ValueError("record_id es obligatorio")

        record = self.repository.get_active_by_id(record_id)
        if not record:
            raise ValueError("El registro médico no existe o está inactivo")

        return record


class DeactivateMedicalRecordUseCase:

    def __init__(self, repository: MedicalRecordRepository):
        self.repository = repository

    def execute(self, record_id: UUID):
        if not record_id:
            raise ValueError("record_id es obligatorio")

        success = self.repository.soft_delete(record_id)
        if not success:
            raise ValueError("El registro médico no existe o ya está desactivado")

        return True

from datetime import date, time
from typing import Optional
from uuid import UUID

from apps.appointments.domain.entities import (
    AppointmentStatus,
    AppointmentRules,
    AppointmentType,
)
from apps.appointments.domain.repositories import AppointmentRepository

from apps.patients.infrastructure.models import Patient


class CreateAppointmentUseCase:

    def __init__(self, repository: AppointmentRepository):
        self.repository = repository

    def execute(
        self,
        patient_id: UUID,
        created_by_id: UUID,
        appointment_date: date,
        appointment_time: time,
        appointment_type: str,
        doctor_id: Optional[UUID] = None,
        notes: Optional[str] = None,
        reminder: bool = True,
    ):
        AppointmentRules.validate_datetime(appointment_date, appointment_time)
        AppointmentRules.validate_type(appointment_type)

        # Validar que el paciente exista y esté activo
        patient = Patient.objects.filter(id=patient_id, is_active=True).select_related("owner").first()
        if not patient:
            raise ValueError("El paciente no existe o está inactivo")

        owner_id = patient.owner_id

        # Si doctor está asignado, validamos conflicto por slot
        if doctor_id:
            conflict = self.repository.exists_conflict(
                doctor_id=doctor_id,
                appointment_date=appointment_date,
                appointment_time=appointment_time,
            )

            if conflict:
                raise ValueError("El doctor ya tiene una cita asignada en esa fecha y hora")

        appointment = self.repository.create(
            patient_id=patient_id,
            owner_id=owner_id,
            doctor_id=doctor_id,
            created_by_id=created_by_id,
            appointment_date=appointment_date,
            appointment_time=appointment_time,
            appointment_type=appointment_type,
            status=AppointmentStatus.SCHEDULED,
            notes=notes,
            reminder=reminder,
        )

        return appointment


class AssignDoctorUseCase:

    def __init__(self, repository: AppointmentRepository):
        self.repository = repository

    def execute(self, appointment_id: UUID, doctor_id: UUID):
        appointment = self.repository.get_by_id(appointment_id)

        if not appointment or not appointment.is_active:
            raise ValueError("Appointment no encontrado o está inactivo")

        AppointmentRules.validate_datetime(appointment.date, appointment.time)

        conflict = self.repository.exists_conflict(
            doctor_id=doctor_id,
            appointment_date=appointment.date,
            appointment_time=appointment.time,
            exclude_appointment_id=appointment.id,
        )

        if conflict:
            raise ValueError("El doctor ya tiene una cita asignada en esa fecha y hora")

        appointment = self.repository.assign_doctor(appointment, doctor_id)

        return appointment


class ChangeAppointmentStatusUseCase:

    def __init__(self, repository: AppointmentRepository):
        self.repository = repository

    def execute(self, appointment_id: UUID, new_status: str):
        appointment = self.repository.get_by_id(appointment_id)

        if not appointment or not appointment.is_active:
            raise ValueError("Appointment no encontrado o está inactivo")

        AppointmentRules.validate_status(new_status)

        if not AppointmentRules.can_change_status(appointment.status, new_status):
            raise ValueError(f"No se puede cambiar estado de {appointment.status} a {new_status}")

        appointment = self.repository.update_status(appointment, new_status)

        return appointment

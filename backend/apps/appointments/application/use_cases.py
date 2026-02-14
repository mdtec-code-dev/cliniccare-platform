from datetime import datetime
from typing import Optional

from apps.appointments.domain.entities import AppointmentStatus, AppointmentRules
from apps.appointments.domain.repositories import AppointmentRepository


class CreateAppointmentUseCase:

    def __init__(self, repository: AppointmentRepository):
        self.repository = repository

    def execute(
        self,
        patient_id: int,
        created_by_id: int,
        start_time: datetime,
        end_time: datetime,
        doctor_id: Optional[int] = None,
        reason: Optional[str] = None,
        notes: Optional[str] = None,
    ):
        AppointmentRules.validate_time_range(start_time, end_time)

        # Si doctor está asignado, validamos solapamiento
        if doctor_id:
            overlap = self.repository.exists_overlap(
                doctor_id=doctor_id,
                start_time=start_time,
                end_time=end_time,
            )

            if overlap:
                raise ValueError("El doctor ya tiene un turno asignado en ese rango de tiempo")

        appointment = self.repository.create(
            patient_id=patient_id,
            doctor_id=doctor_id,
            created_by_id=created_by_id,
            start_time=start_time,
            end_time=end_time,
            status=AppointmentStatus.SCHEDULED,
            reason=reason,
            notes=notes,
        )

        return appointment


class AssignDoctorUseCase:

    def __init__(self, repository: AppointmentRepository):
        self.repository = repository

    def execute(self, appointment_id: int, doctor_id: int):
        appointment = self.repository.get_by_id(appointment_id)

        if not appointment:
            raise ValueError("Appointment no encontrado")

        AppointmentRules.validate_time_range(appointment.start_time, appointment.end_time)

        overlap = self.repository.exists_overlap(
            doctor_id=doctor_id,
            start_time=appointment.start_time,
            end_time=appointment.end_time,
            exclude_appointment_id=appointment.id,
        )

        if overlap:
            raise ValueError("El doctor ya tiene un turno asignado en ese rango de tiempo")

        appointment = self.repository.assign_doctor(appointment, doctor_id)

        return appointment


class ChangeAppointmentStatusUseCase:

    def __init__(self, repository: AppointmentRepository):
        self.repository = repository

    def execute(self, appointment_id: int, new_status: str):
        appointment = self.repository.get_by_id(appointment_id)

        if not appointment:
            raise ValueError("Appointment no encontrado")

        if new_status not in AppointmentStatus.CHOICES:
            raise ValueError("Estado inválido")

        if not AppointmentRules.can_change_status(appointment.status, new_status):
            raise ValueError(f"No se puede cambiar estado de {appointment.status} a {new_status}")

        appointment = self.repository.update_status(appointment, new_status)

        return appointment

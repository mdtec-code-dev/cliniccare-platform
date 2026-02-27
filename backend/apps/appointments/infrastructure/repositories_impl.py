from datetime import date, time
from typing import Optional
from uuid import UUID

from apps.appointments.domain.repositories import AppointmentRepository
from apps.appointments.infrastructure.models import Appointment


class DjangoAppointmentRepository(AppointmentRepository):

    def create(
        self,
        patient_id: UUID,
        owner_id: UUID,
        doctor_id: Optional[UUID],
        created_by_id: UUID,
        appointment_date: date,
        appointment_time: time,
        appointment_type: str,
        status: str = "programada",
        notes: Optional[str] = None,
        reminder: bool = True,
    ) -> Appointment:

        return Appointment.objects.create(
            patient_id=patient_id,
            owner_id=owner_id,
            doctor_id=doctor_id,
            created_by_id=created_by_id,
            date=appointment_date,
            time=appointment_time,
            type=appointment_type,
            status=status,
            notes=notes,
            reminder=reminder,
        )

    def get_by_id(self, appointment_id: UUID) -> Optional[Appointment]:
        return Appointment.objects.filter(id=appointment_id).first()

    def exists_conflict(
        self,
        doctor_id: UUID,
        appointment_date: date,
        appointment_time: time,
        exclude_appointment_id: Optional[UUID] = None,
    ) -> bool:

        qs = Appointment.objects.filter(
            doctor_id=doctor_id,
            date=appointment_date,
            time=appointment_time,
            is_active=True,
        )

        if exclude_appointment_id:
            qs = qs.exclude(id=exclude_appointment_id)

        # No validamos conflicto con canceladas
        qs = qs.exclude(status=Appointment.Status.CANCELLED)

        return qs.exists()

    def assign_doctor(self, appointment: Appointment, doctor_id: UUID) -> Appointment:
        appointment.doctor_id = doctor_id
        appointment.save(update_fields=["doctor_id", "updated_at"])
        return appointment

    def update_status(self, appointment: Appointment, new_status: str) -> Appointment:
        appointment.status = new_status
        appointment.save(update_fields=["status", "updated_at"])
        return appointment

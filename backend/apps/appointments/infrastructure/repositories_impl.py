from datetime import datetime
from typing import Optional

from apps.appointments.domain.repositories import AppointmentRepository
from apps.appointments.infrastructure.models import Appointment


class DjangoAppointmentRepository(AppointmentRepository):

    def create(
        self,
        patient_id: int,
        doctor_id: Optional[int],
        created_by_id: int,
        start_time: datetime,
        end_time: datetime,
        status: str,
        reason: Optional[str] = None,
        notes: Optional[str] = None,
    ) -> Appointment:
        return Appointment.objects.create(
            patient_id=patient_id,
            doctor_id=doctor_id,
            created_by_id=created_by_id,
            start_time=start_time,
            end_time=end_time,
            status=status,
            reason=reason,
            notes=notes,
        )

    def get_by_id(self, appointment_id: int) -> Optional[Appointment]:
        return Appointment.objects.filter(id=appointment_id).first()

    def exists_overlap(
        self,
        doctor_id: int,
        start_time: datetime,
        end_time: datetime,
        exclude_appointment_id: Optional[int] = None,
    ) -> bool:
        qs = Appointment.objects.filter(
            doctor_id=doctor_id,
            start_time__lt=end_time,
            end_time__gt=start_time,
        )

        if exclude_appointment_id:
            qs = qs.exclude(id=exclude_appointment_id)

        # no validamos solapamiento con cancelados
        qs = qs.exclude(status=Appointment.STATUS_CANCELLED)

        return qs.exists()

    def assign_doctor(self, appointment: Appointment, doctor_id: int) -> Appointment:
        appointment.doctor_id = doctor_id
        appointment.save(update_fields=["doctor_id", "updated_at"])
        return appointment

    def update_status(self, appointment: Appointment, new_status: str) -> Appointment:
        appointment.status = new_status
        appointment.save(update_fields=["status", "updated_at"])
        return appointment

from abc import ABC, abstractmethod
from datetime import date, time
from typing import Optional
from uuid import UUID

from apps.appointments.infrastructure.models import Appointment


class AppointmentRepository(ABC):

    @abstractmethod
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
        raise NotImplementedError

    @abstractmethod
    def get_by_id(self, appointment_id: UUID) -> Optional[Appointment]:
        raise NotImplementedError

    @abstractmethod
    def exists_conflict(
        self,
        doctor_id: UUID,
        appointment_date: date,
        appointment_time: time,
        exclude_appointment_id: Optional[UUID] = None,
    ) -> bool:
        raise NotImplementedError

    @abstractmethod
    def assign_doctor(self, appointment: Appointment, doctor_id: UUID) -> Appointment:
        raise NotImplementedError

    @abstractmethod
    def update_status(self, appointment: Appointment, new_status: str) -> Appointment:
        raise NotImplementedError

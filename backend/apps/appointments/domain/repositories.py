from abc import ABC, abstractmethod
from datetime import datetime
from typing import Optional

from apps.appointments.infrastructure.models import Appointment


class AppointmentRepository(ABC):

    @abstractmethod
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
        raise NotImplementedError

    @abstractmethod
    def get_by_id(self, appointment_id: int) -> Optional[Appointment]:
        raise NotImplementedError

    @abstractmethod
    def exists_overlap(
        self,
        doctor_id: int,
        start_time: datetime,
        end_time: datetime,
        exclude_appointment_id: Optional[int] = None,
    ) -> bool:
        raise NotImplementedError

    @abstractmethod
    def assign_doctor(self, appointment: Appointment, doctor_id: int) -> Appointment:
        raise NotImplementedError

    @abstractmethod
    def update_status(self, appointment: Appointment, new_status: str) -> Appointment:
        raise NotImplementedError

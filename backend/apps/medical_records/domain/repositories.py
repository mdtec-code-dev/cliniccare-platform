from abc import ABC, abstractmethod
from typing import Optional, List
from uuid import UUID

from apps.medical_records.infrastructure.models import MedicalRecord


class MedicalRecordRepository(ABC):

    @abstractmethod
    def create(
        self,
        patient_id: UUID,
        doctor_id: UUID,
        appointment_id: Optional[UUID] = None,
        record_date=None,
        record_type: str = "consulta",
        diagnosis: Optional[str] = None,
        treatment: Optional[str] = None,
        medications: Optional[list] = None,
        observations: Optional[str] = None,
        follow_up_date=None,
    ) -> MedicalRecord:
        raise NotImplementedError

    @abstractmethod
    def get_by_id(self, record_id: UUID) -> Optional[MedicalRecord]:
        raise NotImplementedError

    @abstractmethod
    def get_active_by_id(self, record_id: UUID) -> Optional[MedicalRecord]:
        raise NotImplementedError

    @abstractmethod
    def list_by_patient(self, patient_id: UUID) -> List[MedicalRecord]:
        raise NotImplementedError

    @abstractmethod
    def list_by_appointment(self, appointment_id: UUID) -> List[MedicalRecord]:
        raise NotImplementedError

    @abstractmethod
    def soft_delete(self, record_id: UUID) -> bool:
        raise NotImplementedError

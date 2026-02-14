from abc import ABC, abstractmethod
from typing import Optional, List

from apps.medical_records.infrastructure.models import MedicalRecord


class MedicalRecordRepository(ABC):

    @abstractmethod
    def create(
        self,
        patient_id: int,
        doctor_id: int,
        appointment_id: Optional[int] = None,
        diagnosis: Optional[str] = None,
        treatment: Optional[str] = None,
        observations: Optional[str] = None,
    ) -> MedicalRecord:
        raise NotImplementedError

    @abstractmethod
    def get_by_id(self, record_id: int) -> Optional[MedicalRecord]:
        raise NotImplementedError

    @abstractmethod
    def list_by_patient(self, patient_id: int) -> List[MedicalRecord]:
        raise NotImplementedError

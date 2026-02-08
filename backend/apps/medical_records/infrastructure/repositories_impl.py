from typing import Optional, List

from apps.medical_records.domain.repositories import MedicalRecordRepository
from apps.medical_records.infrastructure.models import MedicalRecord


class DjangoMedicalRecordRepository(MedicalRecordRepository):

    def create(
        self,
        patient_id: int,
        doctor_id: int,
        appointment_id: Optional[int] = None,
        diagnosis: Optional[str] = None,
        treatment: Optional[str] = None,
        observations: Optional[str] = None,
    ) -> MedicalRecord:
        return MedicalRecord.objects.create(
            patient_id=patient_id,
            doctor_id=doctor_id,
            appointment_id=appointment_id,
            diagnosis=diagnosis,
            treatment=treatment,
            observations=observations,
        )

    def get_by_id(self, record_id: int) -> Optional[MedicalRecord]:
        return MedicalRecord.objects.filter(id=record_id).first()

    def list_by_patient(self, patient_id: int) -> List[MedicalRecord]:
        return MedicalRecord.objects.filter(patient_id=patient_id).order_by("-created_at")

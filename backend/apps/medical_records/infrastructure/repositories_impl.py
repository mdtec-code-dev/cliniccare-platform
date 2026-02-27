from typing import Optional, List
from uuid import UUID
from datetime import date

from apps.medical_records.domain.repositories import MedicalRecordRepository
from apps.medical_records.infrastructure.models import MedicalRecord


class DjangoMedicalRecordRepository(MedicalRecordRepository):

    def create(
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
    ) -> MedicalRecord:

        return MedicalRecord.objects.create(
            patient_id=patient_id,
            doctor_id=doctor_id,
            appointment_id=appointment_id,
            date=record_date,
            type=record_type,
            diagnosis=diagnosis,
            treatment=treatment,
            medications=medications or [],
            observations=observations,
            follow_up_date=follow_up_date,
        )


    def get_all(self):
        return MedicalRecord.objects.filter(is_active=True).order_by("-created_at")    

    def get_by_id(self, record_id: UUID) -> Optional[MedicalRecord]:
        return MedicalRecord.objects.filter(id=record_id).first()

    def get_active_by_id(self, record_id: UUID) -> Optional[MedicalRecord]:
        return MedicalRecord.objects.filter(id=record_id, is_active=True).first()

    def list_by_patient(self, patient_id: UUID) -> List[MedicalRecord]:
        return (
            MedicalRecord.objects.filter(patient_id=patient_id, is_active=True)
            .select_related("patient", "doctor", "appointment")
            .order_by("-created_at")
        )

    def list_by_appointment(self, appointment_id: UUID) -> List[MedicalRecord]:
        return (
            MedicalRecord.objects.filter(appointment_id=appointment_id, is_active=True)
            .select_related("patient", "doctor", "appointment")
            .order_by("-created_at")
        )

    def soft_delete(self, record_id: UUID) -> bool:
        updated = MedicalRecord.objects.filter(id=record_id, is_active=True).update(is_active=False)
        return updated > 0

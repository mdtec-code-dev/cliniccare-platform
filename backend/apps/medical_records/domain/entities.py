from dataclasses import dataclass
from datetime import datetime, date
from typing import Optional, List
from uuid import UUID


@dataclass
class MedicalRecordEntity:
    patient_id: UUID
    doctor_id: UUID
    appointment_id: Optional[UUID] = None

    record_date: Optional[date] = None
    record_type: str = "consulta"

    diagnosis: Optional[str] = None
    treatment: Optional[str] = None
    medications: Optional[List[str]] = None
    observations: Optional[str] = None

    follow_up_date: Optional[date] = None

    created_at: Optional[datetime] = None


class MedicalRecordRules:

    @staticmethod
    def validate_patient(patient_id: UUID):
        if not patient_id:
            raise ValueError("patient_id es obligatorio")

    @staticmethod
    def validate_doctor(doctor_id: UUID):
        if not doctor_id:
            raise ValueError("doctor_id es obligatorio")

    @staticmethod
    def validate_record_type(record_type: str):
        allowed = ["consulta", "vacuna", "cirugia", "desparasitacion"]
        if record_type not in allowed:
            raise ValueError(f"record_type inválido. Permitidos: {allowed}")

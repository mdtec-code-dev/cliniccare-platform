from dataclasses import dataclass
from datetime import datetime
from typing import Optional


@dataclass
class MedicalRecordEntity:
    patient_id: int
    doctor_id: int
    appointment_id: Optional[int] = None

    diagnosis: Optional[str] = None
    treatment: Optional[str] = None
    observations: Optional[str] = None

    created_at: Optional[datetime] = None


class MedicalRecordRules:

    @staticmethod
    def validate_patient(patient_id: int):
        if not patient_id:
            raise ValueError("patient_id es obligatorio")

    @staticmethod
    def validate_doctor(doctor_id: int):
        if not doctor_id:
            raise ValueError("doctor_id es obligatorio")

from dataclasses import dataclass
from datetime import datetime


class AppointmentStatus:
    SCHEDULED = "SCHEDULED"
    CONFIRMED = "CONFIRMED"
    CANCELLED = "CANCELLED"
    COMPLETED = "COMPLETED"
    NO_SHOW = "NO_SHOW"

    CHOICES = [
        SCHEDULED,
        CONFIRMED,
        CANCELLED,
        COMPLETED,
        NO_SHOW,
]


class AppointmentRules:
    """
    Reglas de negocio relacionadas con turnos médicos.
    """

    @staticmethod
    def validate_time_range(start_time: datetime, end_time: datetime):
        if end_time <= start_time:
            raise ValueError("end_time debe ser mayor que start_time")
        

    @staticmethod
    def can_change_status(current_status: str, new_status: str) -> bool:
        """
        Control básico de transiciones de estado.
        """

        allowed_transitions = {
            AppointmentStatus.SCHEDULED: [
                AppointmentStatus.CONFIRMED,
                AppointmentStatus.CANCELLED,
            ],
            AppointmentStatus.CONFIRMED: [
                AppointmentStatus.COMPLETED,
                AppointmentStatus.CANCELLED,
                AppointmentStatus.NO_SHOW,
            ],
            AppointmentStatus.COMPLETED: [],
            AppointmentStatus.CANCELLED: [],
            AppointmentStatus.NO_SHOW: [],
        }

        return new_status in allowed_transitions.get(current_status, [])    
    



@dataclass
class AppointmentEntity:
    patient_id: int
    doctor_id: int | None
    created_by_id: int
    start_time: datetime
    end_time: datetime
    status: str
    reason: str | None = None
    notes: str | None = None
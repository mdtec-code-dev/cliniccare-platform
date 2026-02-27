from dataclasses import dataclass
from datetime import date, time
from typing import Optional
from uuid import UUID


class AppointmentStatus:
    SCHEDULED = "programada"
    CONFIRMED = "confirmada"
    CANCELLED = "cancelada"
    COMPLETED = "completada"
    NO_SHOW = "no_show"

    CHOICES = [
        SCHEDULED,
        CONFIRMED,
        CANCELLED,
        COMPLETED,
        NO_SHOW,
    ]


class AppointmentType:
    CONSULTATION = "consulta"
    CHECKUP = "revision"
    VACCINE = "vacuna"
    SURGERY = "cirugia"

    CHOICES = [
        CONSULTATION,
        CHECKUP,
        VACCINE,
        SURGERY,
    ]


class AppointmentRules:
    """
    Reglas de negocio relacionadas con citas.
    """

    @staticmethod
    def validate_datetime(appointment_date: date, appointment_time: time):
        if not appointment_date:
            raise ValueError("date es obligatorio")

        if not appointment_time:
            raise ValueError("time es obligatorio")

    @staticmethod
    def validate_status(status: str):
        if status not in AppointmentStatus.CHOICES:
            raise ValueError(f"status inválido. Permitidos: {AppointmentStatus.CHOICES}")

    @staticmethod
    def validate_type(appointment_type: str):
        if appointment_type not in AppointmentType.CHOICES:
            raise ValueError(f"type inválido. Permitidos: {AppointmentType.CHOICES}")

    @staticmethod
    def can_change_status(current_status: str, new_status: str) -> bool:
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
    patient_id: UUID
    owner_id: UUID
    doctor_id: Optional[UUID]
    created_by_id: UUID

    date: date
    time: time

    type: str
    status: str = AppointmentStatus.SCHEDULED

    notes: Optional[str] = None
    reminder: bool = True

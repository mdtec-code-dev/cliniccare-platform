import uuid
from django.db import models
from django.conf import settings


class Appointment(models.Model):

    class AppointmentType(models.TextChoices):
        CONSULTATION = "consulta", "Consulta"
        CHECKUP = "revision", "Revisión"
        VACCINE = "vacuna", "Vacuna"
        SURGERY = "cirugia", "Cirugía"

    class Status(models.TextChoices):
        SCHEDULED = "programada", "Programada"
        CONFIRMED = "confirmada", "Confirmada"
        CANCELLED = "cancelada", "Cancelada"
        COMPLETED = "completada", "Completada"
        NO_SHOW = "no_show", "No Show"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    patient = models.ForeignKey(
        "patients.Patient",
        on_delete=models.CASCADE,
        related_name="appointments"
    )

    # opcional pero recomendado para optimizar consultas por owner
    owner = models.ForeignKey(
        "patients.Owner",
        on_delete=models.CASCADE,
        related_name="appointments"
    )

    doctor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="doctor_appointments"
    )

    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="created_appointments"
    )

    date = models.DateField()
    time = models.TimeField()

    type = models.CharField(
        max_length=30,
        choices=AppointmentType.choices,
        default=AppointmentType.CONSULTATION
    )

    status = models.CharField(
        max_length=30,
        choices=Status.choices,
        default=Status.SCHEDULED
    )

    notes = models.TextField(null=True, blank=True)

    reminder = models.BooleanField(default=True)

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "appointments_appointment"
        indexes = [
            models.Index(fields=["doctor", "date", "time"]),
            models.Index(fields=["patient", "date"]),
            models.Index(fields=["owner", "date"]),
        ]
        unique_together = ("doctor", "date", "time")

    def __str__(self):
        return f"Appointment #{self.id} - {self.patient.name} ({self.date} {self.time})"

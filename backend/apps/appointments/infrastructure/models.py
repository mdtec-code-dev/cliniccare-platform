from django.db import models
from django.conf import settings


class Appointment(models.Model):
    STATUS_SCHEDULED = "SCHEDULED"
    STATUS_CONFIRMED = "CONFIRMED"
    STATUS_CANCELLED = "CANCELLED"
    STATUS_COMPLETED = "COMPLETED"
    STATUS_NO_SHOW = "NO_SHOW"

    STATUS_CHOICES = [
        (STATUS_SCHEDULED, "Scheduled"),
        (STATUS_CONFIRMED, "Confirmed"),
        (STATUS_CANCELLED, "Cancelled"),
        (STATUS_COMPLETED, "Completed"),
        (STATUS_NO_SHOW, "No Show"),
    ]

    patient = models.ForeignKey(
        "patients.Pet",
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

    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

    status = models.CharField(
        max_length=30,
        choices=STATUS_CHOICES,
        default=STATUS_SCHEDULED
    )

    reason = models.TextField(null=True, blank=True)
    notes = models.TextField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "appointments_appointment"
        indexes = [
            models.Index(fields=["doctor", "start_time", "end_time"]),
            models.Index(fields=["patient", "start_time"]),
        ]

    def __str__(self):
        return f"Appointment #{self.id} - {self.patient.name}"

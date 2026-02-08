from django.db import models
from django.conf import settings


class MedicalRecord(models.Model):
    patient = models.ForeignKey(
        "patients.Pet",
        on_delete=models.CASCADE,
        related_name="medical_records"
    )

    appointment = models.ForeignKey(
        "appointments.Appointment",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="medical_records"
    )

    doctor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="medical_records"
    )

    diagnosis = models.TextField(null=True, blank=True)
    treatment = models.TextField(null=True, blank=True)
    observations = models.TextField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "medical_records_record"
        indexes = [
            models.Index(fields=["patient", "created_at"]),
            models.Index(fields=["doctor", "created_at"]),
        ]

    def __str__(self):
        return f"MedicalRecord #{self.id} - Patient {self.patient_id}"

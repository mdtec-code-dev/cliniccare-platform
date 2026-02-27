from django.db import models
from django.conf import settings


class MedicalRecord(models.Model):

    class RecordType(models.TextChoices):
        CONSULTATION = "consulta", "Consulta"
        VACCINE = "vacuna", "Vacuna"
        SURGERY = "cirugia", "Cirugía"
        DEWORMING = "desparasitacion", "Desparasitación"

    patient = models.ForeignKey(
        "patients.Patient",
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

    # 🔥 nuevos campos sugeridos
    date = models.DateField(null=True, blank=True)  # fecha del registro (consulta/vacuna/etc)
    type = models.CharField(
        max_length=30,
        choices=RecordType.choices,
        default=RecordType.CONSULTATION
    )

    diagnosis = models.TextField(null=True, blank=True)
    treatment = models.TextField(null=True, blank=True)

    medications = models.JSONField(default=list, blank=True)  # lista de medicamentos
    follow_up_date = models.DateField(null=True, blank=True)

    # equivalente a notes/observations
    observations = models.TextField(null=True, blank=True)

    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "medical_records_record"
        indexes = [
            models.Index(fields=["patient", "created_at"]),
            models.Index(fields=["doctor", "created_at"]),
            models.Index(fields=["date"]),
            models.Index(fields=["type"]),
        ]

    def __str__(self):
        return f"MedicalRecord #{self.id} - Patient {self.patient_id}"

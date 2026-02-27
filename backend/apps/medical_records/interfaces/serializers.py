from rest_framework import serializers
from apps.medical_records.infrastructure.models import MedicalRecord
from apps.accounts.interfaces.serializers import DoctorSimpleSerializer
from apps.appointments.interfaces.serializers import AppointmentSimpleSerializer
from apps.patients.interfaces.serializers import PatientSimpleSerializer


class MedicalRecordSerializer(serializers.ModelSerializer):
    patient = PatientSimpleSerializer(read_only=True)
    appointment = AppointmentSimpleSerializer(read_only=True)
    doctor = DoctorSimpleSerializer(read_only=True)
    

    follow_up_date = serializers.DateField(allow_null=True, required=False)

    class Meta:
        model = MedicalRecord
        fields = [
            "id",

            # relaciones en forma frontend-friendly
            "patient",
            "appointment",
            "doctor",

            # nuevos campos
            "date",
            "type",
            "diagnosis",
            "treatment",
            "medications",
            "observations",
            "follow_up_date",

            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "doctor_id", "created_at", "updated_at"]



class MedicalRecordCreateSerializer(serializers.Serializer):
    patient_id = serializers.UUIDField()
    appointment_id = serializers.UUIDField(required=False, allow_null=True)

    date = serializers.DateField(required=False, allow_null=True)
    type = serializers.ChoiceField(
        choices=["consulta", "vacuna", "cirugia", "desparasitacion"],
        required=False,
        default="consulta"
    )

    diagnosis = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    treatment = serializers.CharField(required=False, allow_blank=True, allow_null=True)

    medications = serializers.ListField(
        child=serializers.CharField(),
        required=False
    )

    observations = serializers.CharField(required=False, allow_blank=True, allow_null=True)

    follow_up_date = serializers.DateField(required=False, allow_null=True)

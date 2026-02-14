from rest_framework import serializers
from apps.medical_records.infrastructure.models import MedicalRecord


class MedicalRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalRecord
        fields = [
            "id",
            "patient",
            "appointment",
            "doctor",
            "diagnosis",
            "treatment",
            "observations",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "doctor", "created_at", "updated_at"]


class MedicalRecordCreateSerializer(serializers.Serializer):
    patient_id = serializers.IntegerField()
    appointment_id = serializers.IntegerField(required=False, allow_null=True)

    diagnosis = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    treatment = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    observations = serializers.CharField(required=False, allow_blank=True, allow_null=True)

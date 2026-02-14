from rest_framework import serializers
from apps.appointments.infrastructure.models import Appointment


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = [
            "id",
            "patient",
            "doctor",
            "created_by",
            "start_time",
            "end_time",
            "status",
            "reason",
            "notes",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_by", "status", "created_at", "updated_at"]


class AppointmentCreateSerializer(serializers.Serializer):
    patient_id = serializers.IntegerField()
    doctor_id = serializers.IntegerField(required=False, allow_null=True)

    start_time = serializers.DateTimeField()
    end_time = serializers.DateTimeField()

    reason = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    notes = serializers.CharField(required=False, allow_blank=True, allow_null=True)


class AssignDoctorSerializer(serializers.Serializer):
    doctor_id = serializers.IntegerField()


class ChangeStatusSerializer(serializers.Serializer):
    status = serializers.CharField(max_length=30)

from rest_framework import serializers
from apps.appointments.infrastructure.models import Appointment
from apps.accounts.interfaces.serializers import DoctorSimpleSerializer
from apps.patients.interfaces.serializers import PatientSimpleSerializer
from apps.patients.interfaces.serializers import OwnerSimpleSerializer


class AppointmentSerializer(serializers.ModelSerializer):
   
    patient = PatientSimpleSerializer(read_only=True)

    species = serializers.CharField(source="patient.species.slug", read_only=True)

    owner = OwnerSimpleSerializer(read_only=True)
   

    doctor = DoctorSimpleSerializer(read_only=True)
    created_by_id = serializers.UUIDField(source="created_by.id", read_only=True)

    class Meta:
        model = Appointment
        fields = [
            "id",

            "patient",
            
            "species",

           
            "owner",

            "doctor",
            "created_by_id",

            "date",
            "time",
            "type",
            "status",
            "notes",
            "reminder",

            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "created_by_id",
            "status",
            "created_at",
            "updated_at",
        ]



class AppointmentSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = [
            "id",
            "date",
            "time",
            "status"
        ]


class AppointmentCreateSerializer(serializers.Serializer):
    patient_id = serializers.UUIDField()
    doctor_id = serializers.UUIDField(required=False, allow_null=True)

    date = serializers.DateField()
    time = serializers.TimeField()

    type = serializers.ChoiceField(
        choices=["consulta", "revision", "vacuna", "cirugia"],
        default="consulta"
    )

    notes = serializers.CharField(required=False, allow_blank=True, allow_null=True)

    reminder = serializers.BooleanField(required=False, default=True)


class AssignDoctorSerializer(serializers.Serializer):
    doctor_id = serializers.UUIDField()


class ChangeStatusSerializer(serializers.Serializer):
    status = serializers.ChoiceField(
        choices=["programada", "confirmada", "cancelada", "completada", "no_show"]
    )

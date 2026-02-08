from rest_framework import serializers
from apps.patients.infrastructure.models import Pet


class PetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pet
        fields = [
            "id",
            "owner_name",
            "owner_phone",
            "owner_email",
            "name",
            "species",
            "breed",
            "gender",
            "birth_date",
            "weight",
            "notes",
            "is_active",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

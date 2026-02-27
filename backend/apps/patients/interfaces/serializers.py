from rest_framework import serializers
from apps.patients.infrastructure.models import Owner, Species, Patient


class OwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Owner
        fields = [
            "id",
            "name",
            "email",
            "phone",
            "address",
            "created_at",
        ]


class SpeciesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Species
        fields = [
            "id",
            "name",
            "slug",
            "is_active",
            "created_at",
        ]


class PatientSerializer(serializers.ModelSerializer):
    owner = OwnerSerializer(read_only=True)
    species = SpeciesSerializer(read_only=True)

    # Para crear/actualizar usando IDs
    owner_id = serializers.UUIDField(write_only=True)
    species_id = serializers.UUIDField(write_only=True)

    class Meta:
        model = Patient
        fields = [
            "id",
            "name",
            "breed",
            "birth_date",
            "gender",
            "microchip",
            "weight",
            "allergies",
            "chronic_conditions",
            "notes",
            "registration_date",
            "last_visit",
            "created_at",

            # relaciones completas
            "owner",
            "species",

            # ids para escritura
            "owner_id",
            "species_id",
        ]

    def create(self, validated_data):
        owner_id = validated_data.pop("owner_id")
        species_id = validated_data.pop("species_id")

        owner = Owner.objects.get(id=owner_id)
        species = Species.objects.get(id=species_id)

        validated_data["owner"] = owner
        validated_data["species"] = species

        return super().create(validated_data)

    def update(self, instance, validated_data):
        owner_id = validated_data.pop("owner_id", None)
        species_id = validated_data.pop("species_id", None)

        if owner_id:
            instance.owner = Owner.objects.get(id=owner_id)

        if species_id:
            instance.species = Species.objects.get(id=species_id)

        return super().update(instance, validated_data)




class PatientSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = [
            "id",
            "name",
            "birth_date",
        ]

class OwnerSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Owner
        fields = [
            "id",
            "name",
           
        ]
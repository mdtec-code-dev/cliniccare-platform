from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

from apps.patients.infrastructure.models import Pet
from apps.patients.interfaces.serializers import PetSerializer
from apps.patients.interfaces.permissions import PatientsPermission


class PatientsListCreateView(APIView):
    permission_classes = [PatientsPermission]

    def get(self, request):
        patients = Pet.objects.filter(is_active=True).order_by("-created_at")
        serializer = PetSerializer(patients, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


    def post(self, request):
        serializer = PetSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)    
    


class PatientsDetailView(APIView):
    permission_classes = [PatientsPermission]

    def get(self, request, pk):
        patient = get_object_or_404(Pet, pk=pk, is_active=True)
        serializer = PetSerializer(patient)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        patient = get_object_or_404(Pet, pk=pk, is_active=True)
        serializer = PetSerializer(patient, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, pk):
        patient = get_object_or_404(Pet, pk=pk, is_active=True)
        serializer = PetSerializer(patient, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        patient = get_object_or_404(Pet, pk=pk, is_active=True)

        # Soft delete recomendado
        patient.is_active = False
        patient.save(update_fields=["is_active"])

        return Response({"message": "Paciente desactivado"}, status=status.HTTP_200_OK)
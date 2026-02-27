from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

from apps.patients.infrastructure.models import Species
from apps.patients.interfaces.serializers import SpeciesSerializer
from apps.patients.interfaces.species_permissions import SpeciesPermission


class SpeciesListCreateView(APIView):
    permission_classes = [SpeciesPermission]

    def get(self, request):
        species = Species.objects.filter(is_active=True).order_by("name")
        serializer = SpeciesSerializer(species, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = SpeciesSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class SpeciesDetailView(APIView):
    permission_classes = [SpeciesPermission]

    def get(self, request, pk):
        specie = get_object_or_404(Species, pk=pk, is_active=True)
        serializer = SpeciesSerializer(specie)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        specie = get_object_or_404(Species, pk=pk, is_active=True)
        serializer = SpeciesSerializer(specie, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, pk):
        specie = get_object_or_404(Species, pk=pk, is_active=True)
        serializer = SpeciesSerializer(specie, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        specie = get_object_or_404(Species, pk=pk, is_active=True)

        # Soft delete recomendado
        specie.is_active = False
        specie.save(update_fields=["is_active"])

        return Response({"message": "Especie desactivada"}, status=status.HTTP_200_OK)

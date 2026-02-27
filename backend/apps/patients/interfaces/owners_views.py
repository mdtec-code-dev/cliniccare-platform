from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

from apps.patients.infrastructure.models import Owner
from apps.patients.interfaces.serializers import OwnerSerializer
from apps.patients.interfaces.owners_permissions import OwnersPermission


class OwnersListCreateView(APIView):
    permission_classes = [OwnersPermission]

    def get(self, request):
        owners = Owner.objects.all().order_by("-created_at")
        serializer = OwnerSerializer(owners, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = OwnerSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class OwnersDetailView(APIView):
    permission_classes = [OwnersPermission]

    def get(self, request, pk):
        owner = get_object_or_404(Owner, pk=pk)
        serializer = OwnerSerializer(owner)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        owner = get_object_or_404(Owner, pk=pk)
        serializer = OwnerSerializer(owner, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, pk):
        owner = get_object_or_404(Owner, pk=pk)
        serializer = OwnerSerializer(owner, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        owner = get_object_or_404(Owner, pk=pk)
        owner.delete()
        return Response({"message": "Owner eliminado"}, status=status.HTTP_200_OK)

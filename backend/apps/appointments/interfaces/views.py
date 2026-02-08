from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

from apps.appointments.infrastructure.models import Appointment
from apps.appointments.infrastructure.repositories_impl import DjangoAppointmentRepository
from apps.appointments.application.use_cases import (
    CreateAppointmentUseCase,
    AssignDoctorUseCase,
    ChangeAppointmentStatusUseCase,
)
from apps.appointments.interfaces.serializers import (
    AppointmentSerializer,
    AppointmentCreateSerializer,
    AssignDoctorSerializer,
    ChangeStatusSerializer,
)
from apps.appointments.interfaces.permissions import AppointmentsPermission



class AppointmentListCreateView(APIView):
    permission_classes = [AppointmentsPermission]


    def get(self, request):
        appointments = Appointment.objects.all().order_by("-start_time")
        serializer = AppointmentSerializer(appointments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

    def post(self, request):
        serializer = AppointmentCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        repo = DjangoAppointmentRepository()
        use_case = CreateAppointmentUseCase(repo)

        try:
            appointment = use_case.execute(
                patient_id=data["patient_id"],
                doctor_id=data.get("doctor_id"),
                created_by_id=request.user.id,
                start_time=data["start_time"],
                end_time=data["end_time"],
                reason=data.get("reason"),
                notes=data.get("notes"),
            )
        except ValueError as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        

        return Response(
            AppointmentSerializer(appointment).data,
            status=status.HTTP_201_CREATED
        )
    

class AppointmentDetailView(APIView):
    permission_classes = [AppointmentsPermission]


    def get(self, request, pk):
        appointment = get_object_or_404(Appointment, pk=pk)
        return Response(AppointmentSerializer(appointment).data, status=status.HTTP_200_OK)


class AssignDoctorView(APIView):
    permission_classes = [AppointmentsPermission]


    def patch(self, request, pk):
        serializer = AssignDoctorSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        doctor_id = serializer.validated_data["doctor_id"]

        repo = DjangoAppointmentRepository()
        use_case = AssignDoctorUseCase(repo)

        try:
            appointment = use_case.execute(appointment_id=pk, doctor_id=doctor_id)

        except ValueError as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response(AppointmentSerializer(appointment).data, status=status.HTTP_200_OK)    
    

class ChangeAppointmentStatusView(APIView):
    permission_classes = [AppointmentsPermission]

    def patch(self, request, pk):
        serializer = ChangeStatusSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        new_status = serializer.validated_data["status"]

        repo = DjangoAppointmentRepository()
        use_case = ChangeAppointmentStatusUseCase(repo)

        try:
            appointment = use_case.execute(appointment_id=pk, new_status=new_status)
        except ValueError as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response(AppointmentSerializer(appointment).data, status=status.HTTP_200_OK)
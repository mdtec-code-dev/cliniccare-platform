from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from apps.medical_records.infrastructure.repositories_impl import DjangoMedicalRecordRepository
from apps.medical_records.application.use_cases import (
    CreateMedicalRecordUseCase,
    ListMedicalRecordsByPatientUseCase,
    ListMedicalRecordsByAppointmentUseCase,
    GetMedicalRecordByIdUseCase,
    DeactivateMedicalRecordUseCase,
    ListAllMedicalRecordsUseCase
)
from apps.medical_records.interfaces.serializers import (
    MedicalRecordSerializer,
    MedicalRecordCreateSerializer,
)
from apps.medical_records.interfaces.permissions import MedicalRecordsPermission




class MedicalRecordListView(APIView):
    permission_classes = [MedicalRecordsPermission]

    def get(self, request):
        repo = DjangoMedicalRecordRepository()
        use_case = ListAllMedicalRecordsUseCase(repo)

        try:
            records = use_case.execute()
        except ValueError as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response(
            MedicalRecordSerializer(records, many=True).data,
            status=status.HTTP_200_OK
        )

class MedicalRecordCreateView(APIView):
    permission_classes = [MedicalRecordsPermission]

    def post(self, request):
        serializer = MedicalRecordCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        repo = DjangoMedicalRecordRepository()
        use_case = CreateMedicalRecordUseCase(repo)

        try:
            record = use_case.execute(
                patient_id=data["patient_id"],
                doctor_id=request.user.id,
                appointment_id=data.get("appointment_id"),

                record_date=data.get("date"),
                record_type=data.get("type", "consulta"),

                diagnosis=data.get("diagnosis"),
                treatment=data.get("treatment"),
                medications=data.get("medications"),
                observations=data.get("observations"),
                follow_up_date=data.get("follow_up_date"),
            )
        except ValueError as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response(MedicalRecordSerializer(record).data, status=status.HTTP_201_CREATED)


class MedicalRecordListByPatientView(APIView):
    permission_classes = [MedicalRecordsPermission]

    def get(self, request, patient_id):
        repo = DjangoMedicalRecordRepository()
        use_case = ListMedicalRecordsByPatientUseCase(repo)

        try:
            records = use_case.execute(patient_id=patient_id)
        except ValueError as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response(
            MedicalRecordSerializer(records, many=True).data,
            status=status.HTTP_200_OK
        )


class MedicalRecordListByAppointmentView(APIView):
    permission_classes = [MedicalRecordsPermission]

    def get(self, request, appointment_id):
        repo = DjangoMedicalRecordRepository()
        use_case = ListMedicalRecordsByAppointmentUseCase(repo)

        try:
            records = use_case.execute(appointment_id=appointment_id)
        except ValueError as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response(
            MedicalRecordSerializer(records, many=True).data,
            status=status.HTTP_200_OK
        )


class MedicalRecordDetailView(APIView):
    permission_classes = [MedicalRecordsPermission]

    def get(self, request, pk):
        repo = DjangoMedicalRecordRepository()
        use_case = GetMedicalRecordByIdUseCase(repo)

        try:
            record = use_case.execute(record_id=pk)
        except ValueError as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response(MedicalRecordSerializer(record).data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        repo = DjangoMedicalRecordRepository()
        use_case = DeactivateMedicalRecordUseCase(repo)

        try:
            use_case.execute(record_id=pk)
        except ValueError as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"message": "Registro médico desactivado"}, status=status.HTTP_200_OK)

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from apps.medical_records.infrastructure.repositories_impl import DjangoMedicalRecordRepository
from apps.medical_records.application.use_cases import (
    CreateMedicalRecordUseCase,
    ListMedicalRecordsByPatientUseCase,
)
from apps.medical_records.interfaces.serializers import (
    MedicalRecordSerializer,
    MedicalRecordCreateSerializer,
)
from apps.medical_records.interfaces.permissions import MedicalRecordsPermission


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
                diagnosis=data.get("diagnosis"),
                treatment=data.get("treatment"),
                observations=data.get("observations"),
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
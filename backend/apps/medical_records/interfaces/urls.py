from django.urls import path
from apps.medical_records.interfaces.views import (
    MedicalRecordCreateView,
    MedicalRecordListByPatientView,
)

urlpatterns = [
    path("", MedicalRecordCreateView.as_view(), name="medical-record-create"),
    path("patient/<int:patient_id>/", MedicalRecordListByPatientView.as_view(), name="medical-records-by-patient"),
]

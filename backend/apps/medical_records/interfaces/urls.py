from django.urls import path

from apps.medical_records.interfaces.views import (
    MedicalRecordCreateView,
    MedicalRecordListByPatientView,
    MedicalRecordListByAppointmentView,
    MedicalRecordDetailView,
    MedicalRecordListView
)

urlpatterns = [


    # listar
    path("medical-records/list/", MedicalRecordListView.as_view()),


    # Crear registro médico
    path(
        "medical-records/",
        MedicalRecordCreateView.as_view(),
        name="medical-record-create"
    ),

    # Listar registros médicos por paciente
    path(
        "medical-records/patient/<uuid:patient_id>/",
        MedicalRecordListByPatientView.as_view(),
        name="medical-records-by-patient"
    ),

    # Listar registros médicos por cita
    path(
        "medical-records/appointment/<uuid:appointment_id>/",
        MedicalRecordListByAppointmentView.as_view(),
        name="medical-records-by-appointment"
    ),

    # Detalle + eliminar (soft delete)
    path(
        "medical-records/<uuid:pk>/",
        MedicalRecordDetailView.as_view(),
        name="medical-record-detail"
    ),
]

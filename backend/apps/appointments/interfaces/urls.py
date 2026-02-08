from django.urls import path
from apps.appointments.interfaces.views import (
    AppointmentListCreateView,
    AppointmentDetailView,
    AssignDoctorView,
    ChangeAppointmentStatusView,
)

urlpatterns = [
    path("", AppointmentListCreateView.as_view(), name="appointments-list-create"),
    path("<int:pk>/", AppointmentDetailView.as_view(), name="appointments-detail"),
    path("<int:pk>/assign-doctor/", AssignDoctorView.as_view(), name="appointments-assign-doctor"),
    path("<int:pk>/change-status/", ChangeAppointmentStatusView.as_view(), name="appointments-change-status"),
]

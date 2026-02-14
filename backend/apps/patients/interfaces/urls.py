from django.urls import path
from apps.patients.interfaces.views import PatientsListCreateView, PatientsDetailView

urlpatterns = [
    path("", PatientsListCreateView.as_view(), name="patients-list-create"),
    path("<int:pk>/", PatientsDetailView.as_view(), name="patients-detail"),
]

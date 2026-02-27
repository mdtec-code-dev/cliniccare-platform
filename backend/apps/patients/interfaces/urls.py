from django.urls import path

from apps.patients.interfaces.patients_views import PatientsListCreateView, PatientsDetailView
from apps.patients.interfaces.owners_views import OwnersListCreateView, OwnersDetailView
from apps.patients.interfaces.species_views import SpeciesListCreateView, SpeciesDetailView


urlpatterns = [
    # Patients
    path("patients/", PatientsListCreateView.as_view(), name="patients-list-create"),
    path("patients/<uuid:pk>/", PatientsDetailView.as_view(), name="patients-detail"),

    # Owners
    path("owners/", OwnersListCreateView.as_view(), name="owners-list-create"),
    path("owners/<uuid:pk>/", OwnersDetailView.as_view(), name="owners-detail"),

    # Species
    path("species/", SpeciesListCreateView.as_view(), name="species-list-create"),
    path("species/<uuid:pk>/", SpeciesDetailView.as_view(), name="species-detail"),
]

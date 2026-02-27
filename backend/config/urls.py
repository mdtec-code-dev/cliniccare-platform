from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [

    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),

    path("admin/", admin.site.urls),
    path("api/auth/", include("apps.accounts.interfaces.urls")),
    path("api/", include("apps.patients.interfaces.urls")),
    path("api/appointments/", include("apps.appointments.interfaces.urls")),
    path("api/", include("apps.medical_records.interfaces.urls")),
]

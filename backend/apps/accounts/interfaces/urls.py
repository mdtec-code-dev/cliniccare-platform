from django.urls import path
from apps.accounts.interfaces.views import (
    AssignRoleView,
    ListRolesView,
    MyRolesView,
    RegisterView,
    LoginView,
    RefreshView,
    LogoutView,
    MeView
)

urlpatterns = [
    path("register/", RegisterView.as_view()),
    path("login/", LoginView.as_view()),
    path("refresh/", RefreshView.as_view()),
    path("logout/", LogoutView.as_view()),
    path("me/", MeView.as_view()),
    path("assign-role/", AssignRoleView.as_view()),
    path("me/roles/", MyRolesView.as_view()),
    path("roles/", ListRolesView.as_view()),
]

from django.urls import path
from apps.accounts.interfaces.views import (
    AssignRoleView,
    GetUserView,
    ListRolesView,
    MyRolesView,
    RegisterView,
    LoginView,
    RefreshView,
    LogoutView,
    MeView,
    UserListView,
    ChangeMyPasswordView,
    UpdateUserStatusView
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
    path("users/", UserListView.as_view()),
    path("users/<int:user_id>/", GetUserView.as_view()),
    path("change-password/", ChangeMyPasswordView.as_view(), name="change-password"),
    path("users/<int:user_id>/status/", UpdateUserStatusView.as_view(), name="user-status"),
]

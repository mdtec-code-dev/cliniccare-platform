from rest_framework.permissions import BasePermission
from apps.accounts.infrastructure.models import UserRole
from apps.accounts.domain.entities import Roles


class IsAdminRole(BasePermission):

    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False

        return UserRole.objects.filter(
            user=request.user,
            role__name=Roles.ADMIN.value
        ).exists()


class HasPermission(BasePermission):
    """
    Permiso genérico basado en tu tabla Permission.code
    La view debe definir: required_permission = "read.users"
    """

    def has_permission(self, request, view):
        required = getattr(view, "required_permission", None)

        if not request.user or not request.user.is_authenticated:
            return False

        if not required:
            return False

        user_roles = (
            UserRole.objects
            .filter(user=request.user)
            .select_related("role")
            .prefetch_related("role__role_permissions__permission")
        )

        for user_role in user_roles:
            for rp in user_role.role.role_permissions.all():
                if rp.permission.code == required:
                    return True

        return False
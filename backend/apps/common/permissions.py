from rest_framework.permissions import BasePermission
from apps.accounts.infrastructure.models import UserRole, RolePermission


class HasScopedPermission(BasePermission):
    permission_map = {}

    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False

        required_permission = self.permission_map.get(request.method.upper())
        if not required_permission:
            return False

        roles = UserRole.objects.filter(user=request.user).values_list("role_id", flat=True)

        return RolePermission.objects.filter(
            role_id__in=roles,
            permission__code=required_permission
        ).exists()

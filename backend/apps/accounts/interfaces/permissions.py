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

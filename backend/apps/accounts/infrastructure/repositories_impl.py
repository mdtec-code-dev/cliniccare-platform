from django.contrib.auth import get_user_model
from apps.accounts.domain.repositories import AuthRepository, PermissionRepository
from apps.accounts.infrastructure.models import UserRole, RolePermission

User = get_user_model()


class DjangoAuthRepository(AuthRepository):
    
    def get_user_by_username(self, username: str):
        try:
            return User.objects.get(username=username)
        except User.DoesNotExist:
            return None


    def create_user(self, username: str, email: str, password: str):
        user = User(username=username, email=email)  
        user.set_password(password)
        user.save()
        return user  



class DjangoPermissionRepository(PermissionRepository):


    def user_has_permission(self, user_id: int, permission_code: str) -> bool:
        roles = UserRole.objects.filter(user_id=user_id).values_list('role_id', flat=True)

        return RolePermission.objects.filter(
            role_id__in=roles,
            permission_code=permission_code
        ).exists()
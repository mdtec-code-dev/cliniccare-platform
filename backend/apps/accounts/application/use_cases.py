from django.contrib.auth import authenticate
from apps.accounts.infrastructure.jwt_service import JwtService

from django.contrib.auth import get_user_model
from apps.accounts.infrastructure.models import Role, UserRole

User = get_user_model()

class LoginUseCase:

    def execute(self, username: str, password: str):
        user = authenticate(username=username, password=password)

        if not user:
            return None


        tokens = JwtService.create_tokens_for_user(user)

        return {
            "user": user,
            "tokens": tokens
        }

        

class RegisterUseCase:

   def __init__(self, auth_repository):
    self.auth_repository = auth_repository

   def execute(self, username: str, email: str, password: str):
    user = self.auth_repository.create_user(username, email, password)
    return user
   


class AssignRoleUseCase:

    def execute(self, user_id, role_name):
        user = User.objects.filter(id=user_id).first()
        if not user:
            return None, "USER_NOT_FOUND"

        role = Role.objects.filter(name=role_name).first()
        if not role:
            return None, "ROLE_NOT_FOUND"

        user_role = UserRole.objects.filter(user=user).first()

        if user_role:
            user_role.role = role
            user_role.save(update_fields=["role"])
        else:
            UserRole.objects.create(user=user, role=role)

        return {
            "message": "Rol actualizado correctamente",
            "user_id": str(user.id),
            "role": role.name,
        }, None
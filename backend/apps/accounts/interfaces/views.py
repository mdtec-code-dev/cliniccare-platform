from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status

from django.db import IntegrityError
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError

from apps.common.cookies import set_auth_cookies, clear_auth_cookies

from apps.accounts.infrastructure.models import UserRole, Role
from apps.accounts.interfaces.serializers import (
    RegisterSerializer,
    LoginSerializer,
    AssignRoleSerializer,
    ChangePasswordSerializer,
    UpdateUserStatusSerializer
)
from apps.accounts.application.use_cases import (
    LoginUseCase,
    RegisterUseCase,
    AssignRoleUseCase,
)
from apps.accounts.infrastructure.repositories_impl import DjangoAuthRepository
from apps.accounts.interfaces.permissions import HasPermission


User = get_user_model()


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data

        repo = DjangoAuthRepository()
        use_case = RegisterUseCase(repo)

        try:
            user = use_case.execute(
                username=data["username"],
                email=data.get("email", ""),
                password=data["password"],
            )
        except IntegrityError:
            return Response({"detail": "Usuario o email ya existe"}, status=400)

        return Response(
            {"message": "Usuario creado", "user_id": user.id},
            status=status.HTTP_201_CREATED,
        )


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data

        use_case = LoginUseCase()
        result = use_case.execute(data["username"], data["password"])

        if not result:
            return Response(
                {"detail": "Credenciales inválidas"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        response = Response({"message": "Login exitoso"}, status=status.HTTP_200_OK)

        set_auth_cookies(
            response,
            access_token=result["tokens"]["access"],
            refresh_token=result["tokens"]["refresh"],
        )

        return response


class RefreshView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        refresh_token = request.COOKIES.get("refresh_token")

        if not refresh_token:
            return Response(
                {"detail": "No autenticado"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        try:
            refresh = RefreshToken(refresh_token)
            new_access = str(refresh.access_token)
        except TokenError:
            return Response(
                {"detail": "Token inválido"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        response = Response(
            {"message": "Token actualizado"},
            status=status.HTTP_200_OK,
        )

        set_auth_cookies(
            response,
            access_token=new_access,
            refresh_token=refresh_token,
        )

        return response


class LogoutView(APIView):
    def post(self, request):
        response = Response(
            {"message": "Logout exitoso"},
            status=status.HTTP_200_OK,
        )
        clear_auth_cookies(response)
        return response


class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        user_roles = (
            UserRole.objects.filter(user=user)
            .select_related("role")
            .prefetch_related("role__role_permissions__permission")
        )

        roles = []
        permissions_set = set()

        for user_role in user_roles:
            roles.append(user_role.role.name)

            for rp in user_role.role.role_permissions.all():
                permissions_set.add(rp.permission.code)

        return Response(
            {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "role": roles,
                "permissions": list(permissions_set),
            }
        )





class MyRolesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        roles = UserRole.objects.filter(user=request.user).values_list(
            "role__name", flat=True
        )

        return Response(
            {
                "user_id": request.user.id,
                "username": request.user.username,
                "roles": list(roles),
            }
        )


class ChangeMyPasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = request.user
        current_password = serializer.validated_data["current_password"]
        new_password = serializer.validated_data["new_password"]

        if not user.check_password(current_password):
            return Response(
                {"detail": "La contraseña actual es incorrecta"},
                status=status.HTTP_400_BAD_REQUEST
            )

        user.set_password(new_password)
        user.save(update_fields=["password"])

        return Response(
            {"message": "Contraseña actualizada correctamente"},
            status=status.HTTP_200_OK
        )

class ListRolesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        roles = Role.objects.all().values("id", "name")

        return Response({"roles": list(roles)})


# ============================================================
# USERS (ADMIN SECTION)
# ============================================================

class UserListView(APIView):
    permission_classes = [IsAuthenticated, HasPermission]
    required_permission = "read.users"

    def get(self, request):
        users = User.objects.all().values("id", "username", "email", "is_active")

        user_roles = (
            UserRole.objects.select_related("role")
            .all()
            .values("user_id", "role__name")
        )

        role_map = {str(ur["user_id"]): ur["role__name"] for ur in user_roles}

        result = []
        for user in users:
            user_id = str(user["id"])
            result.append({
                **user,
                "role": role_map.get(user_id),
            })

        return Response({"users": result}, status=status.HTTP_200_OK)


class GetUserView(APIView):
    permission_classes = [IsAuthenticated, HasPermission]
    required_permission = "read.users"

    def get(self, request, user_id: int):
        user = User.objects.filter(id=user_id).values(
            "id", "username", "email", "is_active"
        ).first()

        if not user:
            return Response(
                {"detail": "Usuario no encontrado"},
                status=status.HTTP_404_NOT_FOUND,
            )

        return Response(user, status=status.HTTP_200_OK)



class AssignRoleView(APIView):
    permission_classes = [IsAuthenticated, HasPermission]
    required_permission = "update.roles"

    def post(self, request):
        serializer = AssignRoleSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data

        use_case = AssignRoleUseCase()
        result, error = use_case.execute(
            user_id=data["user_id"],
            role_name=data["role"],
        )

        if error == "USER_NOT_FOUND":
            return Response(
                {"detail": "Usuario no encontrado"},
                status=status.HTTP_404_NOT_FOUND,
            )

        if error == "ROLE_NOT_FOUND":
            return Response(
                {"detail": "Rol no encontrado"},
                status=status.HTTP_404_NOT_FOUND,
            )

        return Response(result, status=status.HTTP_200_OK)
    

class UpdateUserStatusView(APIView):
    permission_classes = [IsAuthenticated, HasPermission]
    required_permission = "update.users"

    def patch(self, request, user_id):
        serializer = UpdateUserStatusSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = get_object_or_404(User, id=user_id)

        if user.id == request.user.id:
            return Response(
                {"detail": "No puedes desactivar tu propio usuario"},
                status=status.HTTP_400_BAD_REQUEST
            )

        user.is_active = serializer.validated_data["is_active"]
        user.save(update_fields=["is_active"])

        return Response(
            {
                "message": "Estado actualizado correctamente",
                "user_id": str(user.id),
                "is_active": user.is_active,
            },
            status=status.HTTP_200_OK
        )
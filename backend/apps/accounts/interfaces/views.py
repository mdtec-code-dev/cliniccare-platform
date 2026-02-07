from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from django.db import IntegrityError

from apps.accounts.interfaces.serializers import RegisterSerializer, LoginSerializer
from apps.accounts.application.use_cases import LoginUseCase, RegisterUseCase
from apps.accounts.infrastructure.repositories_impl import DjangoAuthRepository
from apps.common.cookies import set_auth_cookies, clear_auth_cookies


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
                 username=data['username'],
                 email=data.get('email', ''),
                 password=data['password']
           )
        except IntegrityError:
             return Response({"detail": "Usuario o email ya existe"}, status=400)   

        print(user)
        
        return Response(
            {"message": "Usuario creado", "user_id": user.id},
            status=status.HTTP_201_CREATED
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
            return Response({"detail": "Credenciales inválidas"}, status=status.HTTP_401_UNAUTHORIZED)
        

        response = Response(
            {"message": "Login exitoso"},
            status=status.HTTP_200_OK
        )

        set_auth_cookies(
                response,
                access_token=result["tokens"]["access"],
                refresh_token=result["tokens"]["refresh"]
        )

        return response
        


class RefreshView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        refresh_token = request.COOKIES.get("refresh_token")

        if not refresh_token:
            return Response({"detail": "No se proporcionó el token de actualización"}, status=status.HTTP_400_BAD_REQUEST)
        

        try:
            refresh = RefreshToken(refresh_token)
            new_access = str(refresh.access_token)

        except TokenError:
            return Response({"detail": "Token de actualización inválido"}, status=status.HTTP_401_UNAUTHORIZED)

        response = Response({"message": "Token actualizado"}, status=status.HTTP_200_OK)    

        response.set_cookie(
            key="access_token",
            value=new_access,
            httponly=True,
            secure=False,
            samesite="Lax",
            max_age=60 * 15
        )

        return response
    

class LogoutView(APIView):

    def post(self, request):
        response = Response({"message": "Logout exitoso"}, status=status.HTTP_200_OK)
        clear_auth_cookies(response)
        return response
    

class MeView(APIView):

    def get(self, request):
        user = request.user
        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email
        })
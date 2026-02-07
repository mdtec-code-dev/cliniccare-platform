from django.contrib.auth import authenticate
from apps.accounts.infrastructure.jwt_service import JwtService



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
from django.core.management.base import BaseCommand
from apps.accounts.infrastructure.models import User, Role, UserRole


class Command(BaseCommand):
    help = "Asigna un rol a un usuario"

    def add_arguments(self, parser):
        parser.add_argument("--username", type=str, required=True)
        parser.add_argument("--role", type=str, required=True)

    def handle(self, *args, **kwargs):
        username = kwargs["username"]
        role_name = kwargs["role"]

        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            self.stdout.write(self.style.ERROR("Usuario no encontrado"))
            return

        try:
            role = Role.objects.get(name=role_name)
        except Role.DoesNotExist:
            self.stdout.write(self.style.ERROR("Rol no encontrado"))
            return

        UserRole.objects.get_or_create(user=user, role=role)

        self.stdout.write(self.style.SUCCESS(f"Rol {role_name} asignado a {username}"))

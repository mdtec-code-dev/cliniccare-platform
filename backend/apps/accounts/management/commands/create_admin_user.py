from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

from apps.accounts.infrastructure.models import Role, UserRole
from apps.accounts.domain.entities import Roles


User = get_user_model()


class Command(BaseCommand):
    help = "Crea un usuario ADMIN inicial y le asigna el rol ADMIN"

    def add_arguments(self, parser):
        parser.add_argument("--username", type=str, required=True)
        parser.add_argument("--password", type=str, required=True)
        parser.add_argument("--email", type=str, default="")

    def handle(self, *args, **kwargs):
        username = kwargs["username"]
        password = kwargs["password"]
        email = kwargs["email"]

        user, created = User.objects.get_or_create(
            username=username,
            defaults={"email": email}
        )

        if created:
            user.set_password(password)
            user.is_staff = True
            user.is_superuser = True
            user.save()
            self.stdout.write(self.style.SUCCESS(f"Usuario {username} creado"))
        else:
            self.stdout.write(self.style.WARNING(f"Usuario {username} ya existe"))

        role, _ = Role.objects.get_or_create(name=Roles.ADMIN)
        UserRole.objects.get_or_create(user=user, role=role)

        self.stdout.write(self.style.SUCCESS(f"Rol ADMIN asignado a {username}"))

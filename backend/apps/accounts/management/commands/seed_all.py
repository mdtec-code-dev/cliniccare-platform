from django.core.management.base import BaseCommand
from django.core.management import call_command


class Command(BaseCommand):
    help = "Inicializa todo el sistema: roles/permisos + admin user"

    def add_arguments(self, parser):
        parser.add_argument("--username", type=str, default="admin")
        parser.add_argument("--password", type=str, default="admin123")
        parser.add_argument("--email", type=str, default="admin@gmail.com")

    def handle(self, *args, **kwargs):
        username = kwargs["username"]
        password = kwargs["password"]
        email = kwargs["email"]

        self.stdout.write(self.style.WARNING("Ejecutando seed_roles..."))
        call_command("seed_roles")

        self.stdout.write(self.style.WARNING("Creando admin user..."))
        call_command(
            "create_admin_user",
            username=username,
            password=password,
            email=email
        )

        self.stdout.write(self.style.SUCCESS("Seed completo ejecutado correctamente"))

from django.core.management.base import BaseCommand
from apps.accounts.infrastructure.models import Role, Permission, RolePermission
from apps.accounts.domain.entities import Roles, PermissionCodes


class Command(BaseCommand):
    help = "Crea roles y permisos iniciales para el sistema"

    def handle(self, *args, **kwargs):

        # Crear roles
        admin_role, _ = Role.objects.get_or_create(name=Roles.ADMIN)
        doctor_role, _ = Role.objects.get_or_create(name=Roles.DOCTOR)
        receptionist_role, _ = Role.objects.get_or_create(name=Roles.RECEPTIONIST)

        role_permissions_map = {
            Roles.ADMIN: [
                PermissionCodes.READ_PATIENTS,
                PermissionCodes.CREATE_PATIENTS,
                PermissionCodes.UPDATE_PATIENTS,
                PermissionCodes.DELETE_PATIENTS,

                PermissionCodes.READ_APPOINTMENTS,
                PermissionCodes.CREATE_APPOINTMENTS,
                PermissionCodes.UPDATE_APPOINTMENTS,
                PermissionCodes.DELETE_APPOINTMENTS,

                PermissionCodes.READ_MEDICAL_RECORDS,
                PermissionCodes.CREATE_MEDICAL_RECORDS,
                PermissionCodes.UPDATE_MEDICAL_RECORDS,
                PermissionCodes.DELETE_MEDICAL_RECORDS,

                PermissionCodes.READ_USERS,
                PermissionCodes.CREATE_USERS,
                PermissionCodes.UPDATE_USERS,
                PermissionCodes.DELETE_USERS,
            ],

            Roles.DOCTOR: [
                PermissionCodes.READ_PATIENTS,
                PermissionCodes.UPDATE_PATIENTS,

                PermissionCodes.READ_APPOINTMENTS,
                PermissionCodes.UPDATE_APPOINTMENTS,

                PermissionCodes.READ_MEDICAL_RECORDS,
                PermissionCodes.CREATE_MEDICAL_RECORDS,
                PermissionCodes.UPDATE_MEDICAL_RECORDS,
            ],

            Roles.RECEPTIONIST: [
                PermissionCodes.READ_PATIENTS,
                PermissionCodes.CREATE_PATIENTS,
                PermissionCodes.UPDATE_PATIENTS,

                PermissionCodes.READ_APPOINTMENTS,
                PermissionCodes.CREATE_APPOINTMENTS,
                PermissionCodes.UPDATE_APPOINTMENTS,
            ],
        }

        roles_map = {
            Roles.ADMIN: admin_role,
            Roles.DOCTOR: doctor_role,
            Roles.RECEPTIONIST: receptionist_role,
        }

        for role_name, permission_codes in role_permissions_map.items():
            role = roles_map[role_name]

            for code in permission_codes:
                perm, _ = Permission.objects.get_or_create(code=code)
                RolePermission.objects.get_or_create(role=role, permission=perm)

        self.stdout.write(self.style.SUCCESS("Roles y permisos creados correctamente"))

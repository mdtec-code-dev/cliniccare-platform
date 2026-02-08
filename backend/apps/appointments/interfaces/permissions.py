from apps.common.permissions import HasScopedPermission


class AppointmentsPermission(HasScopedPermission):
    permission_map = {
        "GET": "read.appointments",
        "POST": "create.appointments",
        "PUT": "update.appointments",
        "PATCH": "update.appointments",
        "DELETE": "delete.appointments",
    }

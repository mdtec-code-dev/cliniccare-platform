from apps.common.permissions import HasScopedPermission


class PatientsPermission(HasScopedPermission):
    permission_map = {
        "GET": "read.patients",
        "POST": "create.patients",
        "PUT": "update.patients",
        "PATCH": "update.patients",
        "DELETE": "delete.patients",
    }

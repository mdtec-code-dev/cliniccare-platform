from apps.common.permissions import HasScopedPermission


class SpeciesPermission(HasScopedPermission):
    permission_map = {
        "GET": "read.species",
        "POST": "create.species",
        "PUT": "update.species",
        "PATCH": "update.species",
        "DELETE": "delete.species",
    }

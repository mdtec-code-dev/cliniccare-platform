from apps.common.permissions import HasScopedPermission


class OwnersPermission(HasScopedPermission):
    permission_map = {
        "GET": "read.owners",
        "POST": "create.owners",
        "PUT": "update.owners",
        "PATCH": "update.owners",
        "DELETE": "delete.owners",
    }

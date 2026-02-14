from apps.common.permissions import HasScopedPermission


class MedicalRecordsPermission(HasScopedPermission):
    permission_map = {
        "GET": "read.medical_records",
        "POST": "create.medical_records",
        "PUT": "update.medical_records",
        "PATCH": "update.medical_records",
        "DELETE": "delete.medical_records",
    }

from rest_framework.permissions import BasePermission


class IsAdmin(BasePermission):
    """
    Allows access only to admin users.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.role == 'admin')


class IsDoctor(BasePermission):
    """
    Allows access only to doctor users.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.role == 'doctor')


class IsPatient(BasePermission):
    """
    Allows access only to patient users.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.role == 'patient')


class IsAdminOrReadOnly(BasePermission):
    """
    Allows write access only to admin users.
    """
    def has_permission(self, request, view):
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return True
        return bool(request.user and request.user.role == 'admin')

from abc import ABC, abstractmethod


class AuthRepository(ABC):

    @abstractmethod
    def get_user_by_username(self, username: str):
        pass

    @abstractmethod
    def create_user(self, username: str, email: str, password: str):
        pass


class PermissionRepository(ABC):

    @abstractmethod
    def user_has_permission(self, user_id: int, permission_code: str) -> bool:
        pass

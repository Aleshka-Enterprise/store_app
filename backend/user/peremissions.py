from rest_framework.permissions import BasePermission


class IsAuthorOrAdmin(BasePermission):

    def has_permission(self, request, view):
        if request.user:
            return request.user.id == view.kwargs.get('pk') or request.user.is_staff
        return False

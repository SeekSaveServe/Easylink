from rest_framework import viewsets, permissions

from app.models import Users
from app.serializers import UserSerializer


# Customised permissions
class UserPermissions(permissions.IsAuthenticated):
    def has_permission(self, request, view):
        if not super(UserPermissions, self).has_permission(request, view):
            return False
        if request.method in ['DELETE', 'POST']:
            return False
        return True


class UserViewSet(viewsets.ModelViewSet):
    # Test : http://127.0.0.1:8000/api/user/?format=json&username=123
    def get_queryset(self):
        username = self.request.query_params.get('username')
        queryset = Users.objects.filter(username=username).values()
        # print(queryset)
        # print(username)
        return queryset
    serializer_class = UserSerializer
    permission_classes=  [UserPermissions]
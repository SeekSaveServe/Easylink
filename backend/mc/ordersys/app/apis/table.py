from rest_framework import viewsets, permissions

from app.models import Table
from app.serializers import TableSerializer


# Customised permissions
class TablePermissions(permissions.IsAuthenticated):
    def has_permission(self, request, view):
        if not super(TablePermissions, self).has_permission(request, view):
            return False
        if request.method in ['DELETE']:
            return False
        return True


class TableViewSet(viewsets.ModelViewSet):
    queryset = Table.objects.all()
    serializer_class = TableSerializer
    permission_classes=  [TablePermissions]
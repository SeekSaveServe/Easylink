from rest_framework import viewsets, permissions

from app.models import Users, UserCommunities, UserCommunities, UserSkills
from app.serializers import UserSerializer

"""
Logic behind UserViewSet:
1. Filter by tags (userCommunities, UserInterests, UserSkills)
2. Filter the data from 1. using the username the user has searched
3. Return BOTH user data and projects data. Frontend caches these data and decides
what to do with them
"""
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
        searchInput = self.request.query_params.get('searchInput')
        communities = self.request.query_params.get('communities').split('|')
        skills = self.request.query_params.get('skills').split('|')
        interests = self.request.query_params.get('interests').split('|')

        queryset = Users.objects.filter(username=username).values()
        # print(queryset)
        # print(username)
        return queryset
    serializer_class = UserSerializer
    # permission_classes=  [UserPermissions]
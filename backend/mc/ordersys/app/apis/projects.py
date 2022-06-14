from rest_framework import viewsets, permissions

from app.models import Projects
from app.serializers import ProjectSerializer

"""
Logic behind UserViewSet:
1. Filter by tags (userCommunities, UserInterests, UserSkills)
2. Filter the data from 1. using the username the user has searched
3. Return BOTH user data and projects data. Frontend caches these data and decides
what to do with them
"""
# Customised permissions
class ProjectPermissions(permissions.IsAuthenticated):
    def has_permission(self, request, view):
        if not super(ProjectPermissions, self).has_permission(request, view):
            return False
        if request.method in ['DELETE', 'POST']:
            return False
        return True


class ProjectViewSet(viewsets.ModelViewSet):
    # Test : http://127.0.0.1:8000/api/project/?format=json&username=123&communities='USP','NUS'&skills='Acting'&interests='Sports'
    def get_queryset(self):
        searchInput = self.request.query_params.get('searchInput')
        # Needs to be in the format "'tag','tag'... "
        communities = self.request.query_params.get('communities')
        skills = self.request.query_params.get('skills')
        interests = self.request.query_params.get('interests')
        raw_query = f"""SELECT
        projects.username,
        projects.pid,
        projects.avatar_url,
        projects.title,
        projects.bio,
        string_agg(distinct user_interests.name, ',') as interests,
        string_agg(distinct user_skills.name, ',') as skills,
        string_agg(distinct user_communities.name, ',') as communities,
        count(projects.pid = projects.pid) as count
        from projects
        inner join user_communities on projects.pid = user_communities.pid
        inner join user_skills on projects.pid = user_skills.pid
        inner join user_interests on projects.pid = user_interests.pid
        where user_communities.name in ({communities}) 
        or user_skills.name in ({skills})
        or user_interests.name in ({interests})
        group by projects.pid
        order by count desc"""

        queryset = Projects.objects.raw(raw_query)
        # print(queryset)
        # print(username)
        return queryset
    serializer_class = ProjectSerializer
    # permission_classes=  [UserPermissions]
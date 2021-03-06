from rest_framework import viewsets, permissions
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

from app.models import Projects
from app.serializers import ProjectSerializer
from app.apis.RecommendationSys import *

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
    # Test : http://127.0.0.1:8000/api/project/?format=json&searchInput=1&communities='USP','NUS'&skills='Acting'&interests='Sports'
    def get_queryset(self):
        searchInput = self.request.query_params.get('searchInput')
        # Needs to be in the format "'tag','tag'... "
        communities = self.request.query_params.get('communities')
        skills = self.request.query_params.get('skills')
        interests = self.request.query_params.get('interests')
        raw_query = f"""SELECT
            projects.avatar_url,
            projects.bio,
            projects.created_at,
            projects.email,
            projects.email_visibility,
            projects.end_date,
            projects.parent_id,
            projects.pid,
            projects.profile_visibility,
            projects.start_date,
            projects.telegram,
            projects.telegram_visibility,
            projects.title,
            projects.uid,
            projects.updated_at,
            string_agg(distinct user_interests.name, ',') as user_interests,
            string_agg(distinct user_communities.name, ',') as user_communities,
            string_agg(distinct user_skills.name, ',') as user_skills,
        count(projects.pid = projects.pid) as count
        from projects
        inner join user_communities on projects.pid = user_communities.pid
        inner join user_skills on projects.pid = user_skills.pid
        inner join user_interests on projects.pid = user_interests.pid
        where projects.username ~* '{searchInput}'
        and (user_communities.name in ({communities}) 
        and user_skills.name in ({skills})
        and user_interests.name in ({interests}))
        group by projects.pid
        order by count desc"""
        # print(raw_query)
        queryset = Projects.objects.raw(raw_query)
        # print(queryset)
        # print(username)
        return queryset
    serializer_class = ProjectSerializer
    # permission_classes=  [UserPermissions]

"""For recommendation, leave searchInput empty"""
class ProjectViewSetRecommendation(viewsets.ModelViewSet):
    # Test : http://127.0.0.1:8000/api/project/?format=json&searchInput=1&communities='USP','NUS'&skills='Acting'&interests='Sports'
    def get_queryset(self):
        searchInput = self.request.query_params.get('searchInput')
        # Needs to be in the format "'tag','tag'... "
        communities = self.request.query_params.get('communities')
        skills = self.request.query_params.get('skills')
        interests = self.request.query_params.get('interests')
        raw_query = f"""SELECT
            projects.avatar_url,
            projects.bio,
            projects.created_at,
            projects.email,
            projects.email_visibility,
            projects.end_date,
            projects.parent_id,
            projects.pid,
            projects.profile_visibility,
            projects.start_date,
            projects.telegram,
            projects.telegram_visibility,
            projects.title,
            projects.uid,
            projects.updated_at,
            string_agg(distinct user_interests.name, ',') as user_interests,
            string_agg(distinct user_communities.name, ',') as user_communities,
            string_agg(distinct user_skills.name, ',') as user_skills,
        count(projects.pid = projects.pid) as count
        from projects
        inner join user_communities on projects.pid = user_communities.pid
        inner join user_skills on projects.pid = user_skills.pid
        inner join user_interests on projects.pid = user_interests.pid
        where projects.username ~* '{searchInput}'
        or (user_communities.name in ({communities}) 
        or user_skills.name in ({skills})
        or user_interests.name in ({interests}))
        group by projects.pid
        order by count desc"""
        # print(raw_query)
        queryset = Projects.objects.raw(raw_query)
        # print(queryset)
        # print(username)
        return queryset
    serializer_class = ProjectSerializer
    # permission_classes=  [UserPermissions]

def Train_Project_Models(request):
    # Test : http://127.0.0.1:8000/trainProject/
    train_project_model()
    return HttpResponse("Trained project model!")

def Get_Cosine_Project(request):
    # Test : http://127.0.0.1:8000/recommendCosineProject?tags='Other Communities','GUI','USP'
    tags = list(map(lambda x: x[1:-1], request.GET.get('tags','').split(",")))
    return JsonResponse(calculate_similarity_project(tags))
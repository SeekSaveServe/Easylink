from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse

from app.models import Users, UserCommunities, UserCommunities, UserSkills
from app.serializers import UserSerializer, UserIDTagsSerializer
from app.apis.RecommendationSys import *
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
    # Test : http://127.0.0.1:8000/api/user/?format=json&searchInput=123&communities='USP','NUS'&skills='Acting'&interests='Sports'
    def get_queryset(self):
        searchInput = self.request.query_params.get('searchInput')
        # Needs to be in the format "'tag','tag'... "
        # Expected null input for tags is ''
        communities = self.request.query_params.get('communities')
        skills = self.request.query_params.get('skills')
        interests = self.request.query_params.get('interests')
        raw_query = f"""SELECT
            users.avatar_url,
            users.bio,
            users.created_at,
            users.email,
            users.email_visibility,
            users.id,
            users.profile_visibility,
            users.telegram,
            users.telegram_visibility,
            users.title,
            users.updated_at,
            string_agg(distinct user_communities.name, ',') as user_communities,
            string_agg(distinct user_interests.name, ',') as user_interests,
            string_agg(distinct user_skills.name, ',') as user_skills,
            count(users.id = users.id) as count
        from users
        inner join user_skills on users.id = user_skills.uid
        inner join user_communities on users.id = user_communities.uid
        inner join user_interests on users.id = user_interests.uid
        where users.username ~* '{searchInput}'
        and (user_communities.name in ({communities}) 
        and user_skills.name in ({skills})
        and user_interests.name in ({interests}))
        group by users.id
        order by count desc"""
        # print(raw_query)
        queryset = Users.objects.raw(raw_query)
        # print(queryset)
        # print(username)
        return queryset
    serializer_class = UserSerializer
    # permission_classes=  [UserPermissions]

"""For recommendation, leave searchInput empty"""
class UserViewSetRecommendation(viewsets.ModelViewSet):
    # Test : http://127.0.0.1:8000/api/userRecommendation/?format=json&searchInput=123&communities='USP','NUS'&skills='Acting'&interests='Sports'
    def get_queryset(self):
        searchInput = self.request.query_params.get('searchInput')
        # Needs to be in the format "'tag','tag'... "
        # Expected null input for tags is ''
        communities = self.request.query_params.get('communities')
        skills = self.request.query_params.get('skills')
        interests = self.request.query_params.get('interests')
        raw_query = f"""SELECT
            users.avatar_url,
            users.bio,
            users.created_at,
            users.email,
            users.email_visibility,
            users.id,
            users.profile_visibility,
            users.telegram,
            users.telegram_visibility,
            users.title,
            users.updated_at,
            string_agg(distinct user_communities.name, ',') as user_communities,
            string_agg(distinct user_interests.name, ',') as user_interests,
            string_agg(distinct user_skills.name, ',') as user_skills,
            count(users.id = users.id) as count
        from users
        inner join user_skills on users.id = user_skills.uid
        inner join user_communities on users.id = user_communities.uid
        inner join user_interests on users.id = user_interests.uid
        where users.username ~* '{searchInput}'
        or (user_communities.name in ({communities}) 
        or user_skills.name in ({skills})
        or user_interests.name in ({interests}))
        group by users.id
        order by count desc"""
        # print(raw_query)
        queryset = Users.objects.raw(raw_query)
        # print(queryset)
        # print(username)
        train_user_model()
        return queryset
    serializer_class = UserSerializer
    # permission_classes=  [UserPermissions]

def Train_User_Models(request):
    # Test : http://127.0.0.1:8000/trainUser/
    train_user_model()
    return HttpResponse("Trained user model!")

def Get_Cosine_User(request):
    # Test : http://127.0.0.1:8000/recommendCosineUser?tags='Other Communities','GUI','USP'
    tags = list(map(lambda x: x[1:-1], request.GET.get('tags','').split(",")))
    return JsonResponse(calculate_similarity_user(tags))
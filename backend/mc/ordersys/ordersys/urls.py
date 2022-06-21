"""ordersys URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# ordersys/urls.py
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from app.apis import CourseViewSet
from app.apis import TableViewSet
from app.apis import UserViewSet
from app.apis import ProjectViewSet
from app.apis import UserViewSetRecommendation
from app.apis import ProjectViewSetRecommendation

router = routers.DefaultRouter()
router.register(r'course', CourseViewSet)
router.register(r'table', TableViewSet)
router.register(r'user', UserViewSet, basename='Users')
router.register(r'project', ProjectViewSet, basename='Projects')
router.register(r'projectRecommendation', ProjectViewSet, basename='Projects')
router.register(r'userRecommendation', UserViewSet, basename='Users')

urlpatterns = [
path('api/', include(router.urls)),
path('', include('app.urls')),
path('admin/', admin.site.urls),
path('dj-rest-auth/', include('dj_rest_auth.urls')),
]

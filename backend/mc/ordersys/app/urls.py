# app/urls.py
from django.urls import path
from . import views
from app.apis import Train_User_Models, Train_Project_Models, Get_Cosine_User, Get_Cosine_Project

urlpatterns = [
# `name` arg is optional, but helpful for `reverse()` function
path('', views.index, name='index'),
path('trainUser', Train_User_Models),
path('trainProject', Train_Project_Models),
path('recommendCosineUser', Get_Cosine_User),
path('recommendCosineProject', Get_Cosine_Project)
]
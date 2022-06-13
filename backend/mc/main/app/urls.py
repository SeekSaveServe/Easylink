# app/urls.py
from django.urls import path
from . import views
urlpatterns = [
# `name` arg is optional, but helpful for `reverse()` function
path('', views.index, name='index'),
]
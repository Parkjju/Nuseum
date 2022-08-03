from rest_framework.routers import DefaultRouter
from django.urls import path
from . import views

urlpatterns = [
  path('', views.PostView.as_view()),
]
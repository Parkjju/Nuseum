from rest_framework.routers import DefaultRouter
from django.urls import path
from . import views

urlpatterns = [
  path('', views.NutrientView.as_view()),
]
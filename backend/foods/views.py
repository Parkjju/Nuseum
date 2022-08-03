from django.shortcuts import render
from .models import Food
from .serializers import FoodSerializer
from rest_framework.viewsets import ModelViewSet

class FoodViewSet(ModelViewSet):
  queryset = Food.objects.all()
  serializer_class = FoodSerializer
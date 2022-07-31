from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import serializers
from .models import User

# for test
class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = '__all__'

class UserViewSet(viewsets.ModelViewSet):
  queryset = User.objects.all()
  serializer_class = UserSerializer
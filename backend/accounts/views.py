from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework import viewsets
from rest_framework import serializers
from rest_framework.permissions import IsAuthenticated
from dj_rest_auth.views import UserDetailsView
from .serializers import CustomDetailSerializer
from .models import User

class CustomDetailView(UserDetailsView):

  serializer_class = CustomDetailSerializer
  permission_classes = (IsAuthenticated,)


# for test
# class UserSerializer(serializers.ModelSerializer):
#   class Meta:
#     model = User
#     fields = '__all__'
#
# class UserViewSet(viewsets.ModelViewSet):
#   queryset = User.objects.all()
#   serializer_class = UserSerializer
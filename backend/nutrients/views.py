from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Nutrient
from .serializers import NutrientSerializer

# Create your views here.
class NutrientView(APIView):
  def get(self, request):
    try:
      room = Nutrient.objects.filter(username=request.user)
      serializer = NutrientSerializer(room, many=True).data
      return Response(serializer)
    except Nutrient.DoesNotExist:
      return Response(status=status.HTTP_404_NOT_FOUND)
  # def get_my_nutrient(self, request):
  #   try:
  #     nutrient = Nutrient.objects.filter()
  #     return nutrient
  #   except Nutrient.DoesNotExist:
  #     return None

  # def get(self, request, pk):
  #   nutrient = self.get_my_nutrient(pk=pk)
  #   if nutrient is not None:
  #     serializer = NutrientSerializer(nutrient).data
  #     return Response(serializer)
  #   else:
  #     return Response(status=status.HTTP_404_NOT_FOUND)
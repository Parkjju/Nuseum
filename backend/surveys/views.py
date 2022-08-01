from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from .models import Survey
from .serializers import SurveySerializer
from .calculates import *

# TEST
# class SurveyViewSet(viewsets.ModelViewSet):
#     queryset = Survey.objects.all()
#     serializer_class = SurveySerializer

class SurveyView(APIView):

    def post(self, request):

        serializer = SurveySerializer(data=request.data)
        if serializer.is_valid():
            survey = serializer.save(author=request.user)
            survey_serializer = SurveySerializer(survey).data
            # print(survey_serializer)
            balance = calculate_balance(survey_serializer)
            temperance = calculate_temperance(survey_serializer)
            execution = calculate_execution(survey_serializer)
            nutrition_index = calculate_nutrition_index(balance, temperance, execution)
            print(balance, temperance, execution, nutrition_index)

            survey = serializer.save(balance=balance, temperance=temperance, execution=execution, nutrition_index=nutrition_index)
            survey_serializer = SurveySerializer(survey).data

            return Response(data=survey_serializer, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



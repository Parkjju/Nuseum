from .models import Survey
from rest_framework import serializers
from accounts.serializers import CustomDetailSerializer

class SurveySerializer(serializers.ModelSerializer):
  
  class Meta:
    model = Survey
    fields = '__all__'

  def create(self, validated_data):
    # request = self.context.get('request')
    # print(validated_data)
    survey = Survey.objects.create(**validated_data)
    return survey
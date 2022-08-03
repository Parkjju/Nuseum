from rest_framework import serializers
from .models import Nutrient

class NutrientSerializer(serializers.ModelSerializer):

  class Meta:
    model = Nutrient
    fields = '__all__'

  def create(self, validated_data):
    request = self.context.get('request')
    nutrient = Nutrient.objects.create(**validated_data, user=request.user)
    return nutrient
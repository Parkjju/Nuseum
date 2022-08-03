from wsgiref import validate
from rest_framework import serializers
from .models import Post
from foods.models import Food, Category
from foods.serializers import FoodSerializer
from nutrients.serializers import NutrientSerializer
from nutrients.models import Nutrient
from .calculates import calculate
from datetime import date



class PostSerializer(serializers.ModelSerializer):

  def get_or_create_foods(self, foods):
      food_ids = []
      for food in foods:
          food_instance, created = Food.objects.get_or_create(pk=food.get('id'), defaults=food)
          food_ids.append(food_instance.pk)
      return food_ids
  
  class Meta:
    model = Post
    # fields = '__all__'
    exclude = ('author',)

  def create(self, validated_data):

    b_amount = list(map(float, validated_data['b_amount'][1:-1].split(',')))
    l_amount = list(map(float, validated_data['l_amount'][1:-1].split(',')))
    d_amount = list(map(float, validated_data['d_amount'][1:-1].split(',')))
    s_amount = list(map(float, validated_data['s_amount'][1:-1].split(',')))

    result = [0] * 13
    c_result = Category.objects.none() # 빈 쿼리셋 생성

    breakfast = validated_data.pop('breakfast', [])
    result, c_result = calculate(breakfast, b_amount, result, c_result)

    lunch = validated_data.pop('lunch', [])
    result, c_result = calculate(lunch, l_amount, result, c_result)

    dinner = validated_data.pop('dinner', [])
    result, c_result = calculate(dinner, d_amount, result, c_result)

    snack = validated_data.pop('snack', [])
    result, c_result = calculate(snack, s_amount, result, c_result)
    print(result, c_result)
 
    nutrient = Nutrient.objects.create( # 하루 영양정보 생성
      username=validated_data['author'], 
      energy = result[0],
      carbohydrate = result[1],
      protein = result[2],
      fat = result[3],
      dietary_fiber = result[4],
      magnesium = result[5],
      vitamin_c = result[6],
      vitamin_d = result[7],
      vitamin_b6 = result[8],
      vitamin_b12 = result[9],
      folic_acid = result[10],
      tryptophan = result[11],
      dha_epa = result[12],
      created_at = date.today()
    )
    # 오늘 먹은 음식들의 카테고리 기록
    categories_id = []
    for elem in c_result:
      categories_id.append(elem[0])
    nutrient.category.set(categories_id)

    post = Post.objects.create(**validated_data)
    post.breakfast.set(breakfast)
    post.lunch.set(lunch)
    post.dinner.set(dinner)
    post.snack.set(snack)
    return post
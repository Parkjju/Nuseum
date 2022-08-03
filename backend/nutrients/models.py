from django.db import models
from accounts.models import User
from foods.models import Category

class Nutrient(models.Model):
  username = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)

  energy = models.FloatField(default=0.0)
  carbohydrate = models.FloatField(default=0.0)
  protein = models.FloatField(default=0.0)
  fat = models.FloatField(default=0.0)

  dietary_fiber = models.FloatField(default=0.0)
  magnesium = models.FloatField(default=0.0)
  vitamin_c = models.FloatField(default=0.0)
  vitamin_d = models.FloatField(default=0.0)
  vitamin_b6 = models.FloatField(default=0.0)
  vitamin_b12 = models.FloatField(default=0.0)
  folic_acid = models.FloatField(default=0.0)
  tryptophan = models.FloatField(default=0.0)
  dha_epa = models.FloatField(default=0.0)

  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  category = models.ManyToManyField(Category, blank=True) # 추후 추가

  def __str__(self):
    return f'[{self.username}\'s nutrient :: {self.created_at}]'
    
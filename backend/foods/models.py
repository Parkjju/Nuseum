from django.db import models

class Category(models.Model):
  name = models.CharField(max_length=30)
  slug = models.SlugField(max_length=200, unique=True, allow_unicode=True)

  def __str__(self):
    return self.name

  class Meta:
    verbose_name_plural = 'Categories'

class Food(models.Model):
  name = models.CharField(max_length=80)

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

  amount = models.IntegerField(default=0)
  is_beverage = models.BooleanField(default=False)
  category = models.ManyToManyField(Category, blank=True)

  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return f'[{self.pk}]{self.name} :: {self.category.all()} '
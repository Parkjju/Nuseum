from django.db import models
from accounts.models import User
from foods.models import Food

class Post(models.Model):
  title = models.CharField(max_length=30)
  author = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
  breakfast = models.ManyToManyField(Food, blank=True, related_name='breakfast_food')
  lunch = models.ManyToManyField(Food, blank=True, related_name='lunch_food')
  dinner = models.ManyToManyField(Food, blank=True, related_name='dinner_food')
  snack = models.ManyToManyField(Food, blank=True, related_name='snack_food')
  b_amount = models.CharField(max_length=100, blank=True, null=True)
  l_amount = models.CharField(max_length=100, blank=True, null=True)
  d_amount = models.CharField(max_length=100, blank=True, null=True)
  s_amount = models.CharField(max_length=100, blank=True, null=True)
  remark = models.TextField()
  pic1 = models.ImageField(upload_to='post/images/%Y/%m/%d', blank=True)
  pic2 = models.ImageField(upload_to='post/images/%Y/%m/%d', blank=True)
  pic3 = models.ImageField(upload_to='post/images/%Y/%m/%d', blank=True)
  
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return f'[{self.pk}]{self.title} :: {self.author}'
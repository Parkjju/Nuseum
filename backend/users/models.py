from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):

    email = models.EmailField(null=True, blank=True)
    d_nutrient = models.IntegerField(default=0)
    m_nutrient = models.IntegerField(default=0)
    y_nutrient = models.IntegerField(default=0)

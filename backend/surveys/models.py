from django.db import models
from accounts.models import User

class Survey(models.Model):
  ANSWER_CHOICES = (
    (1, '1'),
    (2, '2'),
    (3, '3'),
    (4, '4'),
    (5, '5'),
  )
  GENDER_CHOICES = (
    ('M', '남성'),
    ('F', '여성'),
  )

  author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
  
  q1 = models.IntegerField(choices=ANSWER_CHOICES, default=False)
  q2 = models.IntegerField(choices=ANSWER_CHOICES, default=False)
  q3 = models.IntegerField(choices=ANSWER_CHOICES, default=False)
  q4 = models.IntegerField(choices=ANSWER_CHOICES, default=False)
  q5 = models.IntegerField(choices=ANSWER_CHOICES, default=False)
  q6 = models.IntegerField(choices=ANSWER_CHOICES, default=False)
  q7 = models.IntegerField(choices=ANSWER_CHOICES, default=False)
  q8 = models.IntegerField(choices=ANSWER_CHOICES, default=False)
  q9 = models.IntegerField(choices=ANSWER_CHOICES, default=False)
  q10 = models.IntegerField(choices=ANSWER_CHOICES, default=False)
  q11 = models.IntegerField(choices=ANSWER_CHOICES, default=False)
  q12 = models.IntegerField(choices=ANSWER_CHOICES, default=False)
  q13 = models.IntegerField(choices=ANSWER_CHOICES, default=False)
  q14 = models.IntegerField(choices=ANSWER_CHOICES, default=False)
  q15 = models.IntegerField(choices=ANSWER_CHOICES, default=False)

  gender = models.CharField(max_length=1, choices=GENDER_CHOICES, default=' ')
  age = models.PositiveSmallIntegerField(default=0)
  height = models.PositiveSmallIntegerField(default=0)
  weight = models.PositiveSmallIntegerField(default=0)

  balance = models.FloatField(default=0.0)
  temperance = models.FloatField(default=0.0)
  execution = models.FloatField(default=0.0)
  nutrition_index = models.FloatField(default=0.0)

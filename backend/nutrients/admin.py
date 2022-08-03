from django.contrib import admin
from .models import Nutrient

class NutrientAdmin(admin.ModelAdmin):
  readonly_fields = ('created_at', 'updated_at')

admin.site.register(Nutrient, NutrientAdmin)

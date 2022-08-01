from django.urls import path, include
from .import views
# API TEST(using ViewSet)
# from rest_framework import routers
# from .views import SurveyViewSet

# router = routers.DefaultRouter()
# router.register('', SurveyViewSet)

# urlpatterns = router.urls

urlpatterns = [
  path('', views.SurveyView.as_view()),
]
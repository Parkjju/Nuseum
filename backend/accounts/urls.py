from django.urls import path, include
from .views import *
# API TEST(using ViewSet)
# from rest_framework import routers
# from accounts.views import UserViewSet

# router = routers.DefaultRouter()
# router.register('user', UserViewSet)

# urlpatterns = router.urls

urlpatterns = [
  path('', include('dj_rest_auth.urls')), # rest_auth의 다양한 url 사용
  path('me/', CustomDetailView.as_view()),
  path('registration/', include('dj_rest_auth.registration.urls')),
]
import jwt
from django.conf import settings # secret key 사용
from rest_framework import authentication
from rest_framework import exceptions
from users.models import User

class JWTAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
      # 띄어쓰기(" ")로 구분 안 되어져 있는 경우 예외처리 필요
      try:
        token = request.META.get("HTTP_AUTHORIZATION")
        # Custom Authentication은 실패했을 때 반드시 None을 리턴해야 함(Doc 참고)
        if token is None:
          return None
        xjwt, jwt_token = token.split(" ") # X-JWT는 토큰 앞에 관습적으로 붙이는 것임
        # 전달받은 token을 decode
        decoded = jwt.decode(jwt_token, settings.SECRET_KEY, algorithms=["HS256"])
        pk = decoded.get("pk")
        # print(pk) # 29
        user = User.objects.get(pk=pk)
        return (user, None) # Doc 참고
      except ValueError: # ValueError가 있다는 것은 token이 제대로 보내지지 않았다는 의미임!
        return None
      except jwt.exceptions.DecodeError: # 잘못된 token을 가지고 decode할 경우 에러 발생(처리)
        raise exceptions.AuthenticationFailed(detail="JWT Format Invalid") # 브라우저에 해당 문구 내려보냄!
      except User.DoesNotExist:
        return None
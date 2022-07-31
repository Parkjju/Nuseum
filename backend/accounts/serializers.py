from rest_framework import serializers
from django.conf import settings
from django.contrib.auth import get_user_model
from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import UserDetailsSerializer
from allauth.account.adapter import get_adapter
from django.utils.translation import gettext_lazy as _

UserModel = get_user_model()

class CustomRegisterSerializer(RegisterSerializer):

  def validate_username(self, username):
        codes = ['AA111111', 'AB111112', 'AC111113'] # 30명 코드
        username = get_adapter().clean_username(username)
        if username not in codes:
          raise serializers.ValidationError(_("올바른 코드를 입력하세요!"))
        return username


class CustomDetailSerializer(UserDetailsSerializer):

    class Meta:
        extra_fields = []
        if hasattr(UserModel, 'USERNAME_FIELD'):
            extra_fields.append(UserModel.USERNAME_FIELD)
        # if hasattr(UserModel, 'EMAIL_FIELD'):
        #     extra_fields.append(UserModel.EMAIL_FIELD)
        if hasattr(UserModel, 'first_name'):
            extra_fields.append('first_name')
        if hasattr(UserModel, 'last_name'):
            extra_fields.append('last_name')
        if hasattr(UserModel, 'd_nutrient'):
            extra_fields.append('d_nutrient')
        if hasattr(UserModel, 'm_nutrient'):
            extra_fields.append('m_nutrient')
        if hasattr(UserModel, 'y_nutrient'):
            extra_fields.append('y_nutrient')
        model = UserModel
        fields = ('pk', *extra_fields)
        read_only_fields = ('email',)
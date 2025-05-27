# api/serializers.py
from rest_framework import serializers
from .models import HausZuVerkaufen
from django.contrib.auth import get_user_model


class HausZuVerkaufenSerializer(serializers.ModelSerializer):
    class Meta:
        model = HausZuVerkaufen
        fields = '__all__'


User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    is_staff = serializers.BooleanField(default=True)
    is_superuser = serializers.BooleanField(default=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])  # très important !
        user.save()
        return user
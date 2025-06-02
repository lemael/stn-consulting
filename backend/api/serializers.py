# api/serializers.py
from rest_framework import serializers
from .models import HausZuVerkaufen, HausBild
from django.contrib.auth import get_user_model

class HausBildSerializer(serializers.ModelSerializer):
    class Meta:
        model = HausBild
        fields = ['id', 'image']


class HausZuVerkaufenSerializer(serializers.ModelSerializer):
    bilder = HausBildSerializer(many=True, read_only=True)

    # Champ en écriture pour gérer les uploads d’images
    images = serializers.ListField(
        child=serializers.ImageField(),
        write_only=True,
        required=False
    )

    class Meta:
        model = HausZuVerkaufen
        fields = [
            'id',
            'title',
            'description',
            'price',
            'address',
            'surface',
            'rooms',
            'bilder',   # pour les GET
            'images'    # pour les POST
        ]

    def create(self, validated_data):
        # Extraire les images du payload
        images = validated_data.pop('images', [])

        # Créer la maison
        haus = HausZuVerkaufen.objects.create(**validated_data)

        # Associer chaque image à la maison
        for image in images:
            HausBild.objects.create(haus=haus, image=image)

        return haus


User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
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
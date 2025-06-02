from django.db import models
from django.contrib.auth.models import AbstractUser


class HausZuVerkaufen(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=12, decimal_places=2)
    address = models.CharField(max_length=255)
    surface = models.FloatField()
    rooms = models.IntegerField()

    def __str__(self):
        return self.title


class HausBild(models.Model):
    haus = models.ForeignKey(
        HausZuVerkaufen,
        on_delete=models.CASCADE,
        related_name='bilder'
    )
    image = models.ImageField(upload_to="haus_bilder/")

    def __str__(self):
        return f"Bild für {self.haus.title}"

    

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)  # Ensure email is unique
    username = models.CharField(max_length=150, unique=True)  # Ensure username is unique
    password = models.CharField(max_length=128)  # Password field, typically hashed
    is_admin = models.BooleanField(default=False) # Custom field to distinguish admin users
    class Meta:
        verbose_name = 'Custom User'
    def __str__(self):
        return self.username
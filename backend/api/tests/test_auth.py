import pytest
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient

User = get_user_model()

@pytest.fixture
def api_client():
    return APIClient()

@pytest.mark.django_db
def test_register_user(api_client):
    url = "http://127.0.0.1:8000/api/register/"
    data = {
        "username": "testuser",
        "email": "test@example.com",
        "password": "strongpass123"
    }

    response = api_client.post(url, data)
    assert response.status_code == 201
    assert response.data["message"] == "User created successfully"
    assert User.objects.filter(email="test@example.com").exists()

@pytest.mark.django_db
def test_login_user(api_client):
    # Préparer un utilisateur
    user = User.objects.create_user(username="testuser", email="test@example.com", password="strongpass123")

    url = "http://127.0.0.1:8000/api/login/"
    data = {
        "username": "testuser",  # ou email si tu as surchargé le modèle
        "password": "strongpass123"
    }

    response = api_client.post(url, data)
    assert response.status_code == 200
    assert "access" in response.data
    assert "refresh" in response.data

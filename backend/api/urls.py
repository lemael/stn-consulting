from rest_framework.routers import DefaultRouter  # Import correct
from django.urls import path, include            # Import correct
from .views import HausZuVerkaufenViewSet, LoginView, RegisterView
from rest_framework_simplejwt.views import TokenRefreshView  # Import correct

router = DefaultRouter()
router.register(r'hauser', HausZuVerkaufenViewSet)  # Exemple pour un ViewSet
urlpatterns = router.urls


urlpatterns += [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
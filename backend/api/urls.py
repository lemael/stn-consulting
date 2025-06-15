from rest_framework.routers import DefaultRouter  # Import correct
from django.urls import path, include            # Import correct
from .views import HausZuVerkaufenViewSet, LoginView, RegisterView, ListAdminsView, KontaktanfrageListCreateView  # Import correct
 # Import correct

router = DefaultRouter()
router.register(r'hauser', HausZuVerkaufenViewSet)  # Exemple pour un ViewSet  # Assurez-vous d'avoir un ViewSet pour Kontaktanfrage
urlpatterns = router.urls


urlpatterns += [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
     path("admins/", ListAdminsView.as_view(), name="admin-list"),
    path("kontaktanfragen/", KontaktanfrageListCreateView.as_view(), name="kontaktanfrage-list-create"),
    
]
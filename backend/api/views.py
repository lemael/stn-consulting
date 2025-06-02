
from rest_framework.viewsets import ModelViewSet

from .models import HausZuVerkaufen
from .serializers import HausZuVerkaufenSerializer

from rest_framework.response import Response

from rest_framework import status

from rest_framework.views import APIView


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status



from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model

class HausZuVerkaufenViewSet(ModelViewSet):
    queryset = HausZuVerkaufen.objects.all()
    serializer_class = HausZuVerkaufenSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        print("🧨 Suppression de :", instance)

        try:
            self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            print("❌ Erreur lors de la suppression :", e)
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class RegisterView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Admin user created"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
   

# Login view (tu peux aussi utiliser TokenObtainPairView directement)
class LoginView(TokenObtainPairView):
    serializer_class = TokenObtainPairSerializer

User = get_user_model()
class ListAdminsView(APIView):
    permission_classes = [AllowAny]  # ou [AllowAny] si public

    def get(self, request):
        users = User.objects.all()
        serializer = RegisterSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

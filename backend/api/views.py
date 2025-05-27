
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

class HausZuVerkaufenViewSet(ModelViewSet):
    queryset = HausZuVerkaufen.objects.all()
    serializer_class = HausZuVerkaufenSerializer

class RegisterView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Admin user created"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
   

# Login view (tu peux aussi utiliser TokenObtainPairView directement)
class LoginView(TokenObtainPairView):
    serializer_class = TokenObtainPairSerializer

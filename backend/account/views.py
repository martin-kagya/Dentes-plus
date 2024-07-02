# from django.shortcuts import render
from rest_framework import generics,permissions
from .models import Account
from .serializers import AccountSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response 
from rest_framework import status
# Create your views here.

class RegisterView(generics.GenericAPIView):
    # queryset = Account.objects.all()
    # serializer_class = AccountSerializer
    # permission_classes = [permissions.AllowAny,]
    # def post(self, request):
    #     email = request.data.get('email')
    #     password = request.data.get('password')
    #     username = request.data.get('username')
    #     user = Account.objects.get(username=username)
    #     if user:
    #         if user.check_password(password):
    #             token = RefreshToken.for_user(user)
    #             return Response({
    #                 "user": AccountSerializer(user).data,
    #                 "refresh": str(token),
    #                 "access": str(token.access_token)
    #             }, status=status.HTTP_200_OK)
    #     return Response({"message": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
    
    serializer_class = AccountSerializer
    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = RefreshToken.for_user(user)
        return Response({
            "user": AccountSerializer(user, context=self.get_serializer_context()).data,
            "refresh": str(token),
            "access": str(token.access_token)
        })
    
class LoginView(generics.GenericAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = [permissions.AllowAny,]
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        username = request.data.get('username')
        user = Account.objects.get(username=username)
        if user:
            if user.check_password(password):
                token = RefreshToken.for_user(user)
                return Response({
                    "user": AccountSerializer(user).data,
                    "refresh": str(token),
                    "access": str(token.access_token)
                }, status=status.HTTP_200_OK)
        return Response({"message": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

class ObtainTokenView(generics.GenericAPIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        username = request.data.get('username')
        user = Account.objects.get(username=username)
        if user:
            print(user.check_password(password))
            if user.check_password(password):
                token = RefreshToken.for_user(user)
                return Response({
                    "user": AccountSerializer(user).data,
                    "refresh": str(token),
                    "access": str(token.access_token)
                }, status=status.HTTP_200_OK)
        return Response({"message": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated,]
    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Successful logout"}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"message": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)
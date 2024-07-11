# from django.shortcuts import render
from rest_framework import generics,permissions
from .models import Account
from .serializers import AccountSerializer, LoginSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny 
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
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

        user.refresh_token = str(token)
        user.access_token = str(token.access_token)
        user.save()

        return Response({
            "user": AccountSerializer(user, context=self.get_serializer_context()).data,
            "refresh": str(token),
            "access": str(token.access_token)
        }, status=status.HTTP_201_CREATED)
    
class LoginView(generics.GenericAPIView):
    # queryset = Account.objects.all()
    serializer_class = LoginSerializer
    permission_classes = [permissions.AllowAny,]
    def post(self, request):
        # email = request.data.get('email')
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        print(f"validated data: {serializer.validated_data}")
        user = serializer.validated_data['user']
        print(f"user object: {user}")
        token = RefreshToken.for_user(user)
        # password = request.data.get('password')
        # username = request.data.get('username')
        # user = Account.objects.get(username=username)
        user.refresh_token = str(token)
        user.access_token = str(token.access_token)
        user.save()
        # if user:
        #     if user.check_password(password):
        #         token = RefreshToken.for_user(user)
        #         return Response({
        #             "user": AccountSerializer(user).data,
        #             "refresh": str(token),
        #             "access": str(token.access_token)
        #         }, status=status.HTTP_200_OK)
        # return Response({"message": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

        return Response({
            "user": AccountSerializer(user, context=self.get_serializer_context()).data,
            "refresh": str(token),
            "access": str(token.access_token)
        }, status=status.HTTP_200_OK)

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
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            user = request.user
            print(f"token: {refresh_token}")
            print(f"stored token: {user.refresh_token}")
            print(f"user: {user}")
            print(f"access token: {user.access_token}")
            if user.refresh_token != refresh_token:
                return Response({"message": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)
            token = RefreshToken(refresh_token)
            token.blacklist()

            user.refresh_token = None
            user.access_token = None
            user.save()
            return Response({"message": "Successful logout"}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"message": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)
        

class registration_view(APIView):
    # authentication_classes = []
    # permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        serializer = AccountSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            account = serializer.save()
            data['response'] = "successfully registered a new user"
            data['email'] = account.email
            data['username'] = account.username
            token = Token.objects.get(user=account).key
            data['token'] = token
        else:
            data = serializer.errors
        return Response(data)
    
class logout_view(APIView):
    # permission_classes = [IsAuthenticated]

    def post(self,request):
        try:
            token_key = request.data.get('token')
            token = Token.objects.get(key=token_key)
            print(f"token: {token.user}")
            print(f"user: {request.user}")
            if token.user != request.user:
                return Response({"message": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)
            token.delete()
            Account.objects.filter(email=request.user).update(is_active=False)
            return Response({"message": "Successfully logged out"}, status=status.HTTP_200_OK)
        except Token.DoesNotExist:
            return Response({"message": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)
            

class CustomAuthToken(ObtainAuthToken):
    # def post(self, request):
    #     serializer = self.serializer_class(data=request.data,context={'request': request})
    #     serializer.is_valid(raise_exception=True)
    #     user = serializer.validated_data['user']
    #     token, created = Token.objects.get_or_create(user=user)
    #     return Response({
    #         'token': token.key,
    #         'user_id': user.pk,
    #         'email': user.email
    #     })
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer
    def post(self, request, *args, **kwargs):
        try:
            serializer = self.serializer_class(data=request.data, context={'request': request})
            serializer.is_valid(raise_exception=True)
            
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            
            user = authenticate(username=username, password=password)
            
            if not user:
                return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
            
            if not user.is_active:
                return Response({"error": "User account is disabled"}, status=status.HTTP_401_UNAUTHORIZED)
            
            user.is_active = True
            user.save()
            token, created = Token.objects.get_or_create(user=user)
            
            return Response({
                'token': token.key,
                'user_id': user.pk,
                'email': user.email
            })
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
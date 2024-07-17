# from django.shortcuts import render
from rest_framework import generics,permissions
# from .models import Account
from .serializers import AccountSerializer, LoginSerializer, UserRegisterSerializer, UserLoginSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny 
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import ValidationError
from django.contrib.auth.forms import AuthenticationForm
from .forms import LoginForm
# Create your views here.

class registration_view(APIView):
    # authentication_classes = []
    # permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        serializer = AccountSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            account = serializer.save()
            # data['response'] = "successfully registered a new user"
            data['email'] = account.email
            data['username'] = account.username
            token = Token.objects.get(user=account).key
            data['token'] = token
            serializer = AccountSerializer(data)
            data = {
                "user": serializer.data,
                "token": token,
            }
            return Response(data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
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
            print(f"user: {user}")
            
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
        
from django.contrib.auth.models import User
class UserView(APIView):
    # authentication_classes = [TokenAuthentication]
    # permission_classes = [AllowAny]
    # def post(self,request):
    #     try:
    #         form = LoginForm(request, data=request.data)
    #         print(f"form: {form.errors}")
    #         username = request.data.get('username')
    #         password = make_password(request.data.get('password'))
    #         print(f"Received username: {username}, password: {password}")

    #         user = authenticate(username=username, password=password)
    #         print(f"user: {user}")
    #         token, create = Token.objects.get_or_create(user=user)
    #         print(f"token: {token}")
    #         if user:
    #             return Response({'token': token.key}, status=status.HTTP_200_OK)
    #         else:
    #             return Response({"message": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
    #     except Account.DoesNotExist:
    #         return Response({"message": "User does not exist"}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request): 
        print(request.data)
        User.objects.create_user(username='newuser', email='newuser@gmail.com', password='easypassword123')
        username = request.data.get('username')
        password = request.data.get('password')
        form = LoginForm(request, data=request.data)
        print(form.is_valid())
        # print(user)
        # user = authenticate(request, username='testuser@example.com',  password='testpassword123')

        return Response()
    
class TestLogin(generics.RetrieveAPIView): 
    serializer_class = AccountSerializer
    queryset = Account.objects.all() 




class login(APIView):
    def post(self,request):
        data = request.data
        print(f"data: {data}")
        authenticate_user = authenticate(username=data['username'], password=data['password'])
        print(f"authenticate_user: {authenticate_user}")
        if authenticate_user is not None:
            user = Account.objects.get(username=data['username'])
            serializer = AccountSerializer(user)
            data = {
                "user": serializer.data
            }
            token , created_token = Token.objects.get_or_create(user=user)
            if token:
                data['token'] = token.key
            elif created_token:
                data['token'] = created_token.key
            return Response(data, status=status.HTTP_200_OK)
        return Response({"message": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
    


class UserLogin(APIView):
    def post(self, request, *args, **kargs):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            response = {
                "username": {
                    "detail": "User Doesnot exist!"
                }
            }
            if Account.objects.filter(username=request.data['username']).exists():
                user = Account.objects.get(username=request.data['username'])
                token, created = Token.objects.get_or_create(user=user)
                response = {
                    'success': True,
                    'username': user.username,
                    'email': user.email,
                    'token': token.key
                }
                return Response(response, status=status.HTTP_200_OK)
            return Response(response, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserRegister(APIView):
    def post(self, request, *args, **kargs):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            response = {
                'success': True,
                'user': serializer.data,
                'token': Token.objects.get(user=Account.objects.get(username=serializer.data['username'])).key
            }
            return Response(response, status=status.HTTP_200_OK)
        raise ValidationError(
            serializer.errors, code=status.HTTP_406_NOT_ACCEPTABLE)
    
class UserLogout(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        token = Token.objects.get(user=request.user)
        token.delete()
        return Response({"message": "Successfully logged out"}, status=status.HTTP_200_OK)
from rest_framework.generics import RetrieveAPIView
class Test(RetrieveAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    lookup_field = 'email'
    # def get(self, request):
    #     print(request.user)
    #     return Response({"message": "Hello World"}, status=status.HTTP_200_OK)


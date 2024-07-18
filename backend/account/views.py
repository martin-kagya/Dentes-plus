from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework.response import Response
from .serializers import UserSerializer
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, logout
from rest_framework.decorators import authentication_classes,permission_classes,api_view
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated

# Create your views here.

class signup(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            user = User.objects.get(username=request.data['username'])

            token = Token.objects.get(user=user)

            serializer = UserSerializer(user)
            
            data = {
                "user": serializer.data,
                "token": token.key
            }
            return Response(data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class login(APIView):
    def post(self, request):
        data = request.data
        authenticated_user = authenticate(username=data['username'],password=data['password'])
        if authenticated_user is not None:
            user = User.objects.get(username=data['username'])
            serializer = UserSerializer(user)
            response_data = {
                'user': serializer.data
            }
            token, created_token = Token.objects.get_or_create(user=user)
            if token:
                response_data['token'] = token.key
            elif created_token:
                response_data['token'] = created_token.key
            return Response(response_data)
        return Response({"message": "not found"}, status=status.HTTP_404_NOT_FOUND)

class logout(APIView):
    @authentication_classes([TokenAuthentication,SessionAuthentication])
    @permission_classes([IsAuthenticated])
    def get(self, request):
        request.user.auth_token.delete()
        # logout(request)
        return Response({"message": "logout was successful"}, status=status.HTTP_200_OK )

# class test(APIView):
#     @authentication_classes([SessionAuthentication,TokenAuthentication])
#     @permission_classes([IsAuthenticated])
#     def get(self, request):

#         return Response({"message": "signup page"})


@api_view(["GET"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def logout(request):

    request.user.auth_token.delete()

    return Response({"message": "logout was successful"})
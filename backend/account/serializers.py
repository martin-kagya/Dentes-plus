from .models import Account
from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.exceptions import ValidationError

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['username', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = Account.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=make_password(validated_data['password'])
        )
        # user.set_password=validated_data['password']
        return user
    
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(style = {'input_type': 'password'}, trim_whitespace=False)

    def validate(self,data):
        # username = data.get('username')
        # password = data.get('password')
        # if username and password:
        #     user = Account.objects.get(username=username)
        #     if user:
        #         if user.check_password(password):
        #             return user
        # raise serializers.ValidationError("Invalid credentials")


        username = data.get('username')
        password = data.get('password')
        if username and password:
            user = Account.objects.get(username=username)
            if not user:
                raise serializers.ValidationError("Invalid credentials")
        else:
            raise serializers.ValidationError("Must include 'username' and 'password'")
        data['user'] = user
        return data
    

class UserLoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField(read_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Account
        fields = ['username', 'password']

class UserRegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField(read_only=True)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Account
        fields = ['username', 'password', 'email']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate_username(self,username):
        if Account.objects.filter(username=username).exists():
            detail = {
                "detail": "Username already exists!"
            }
            raise ValidationError(detail=detail)
        return username
    
    def validate(self,instance):
        if Account.objects.filter(email=instance['email']).exists():
            detail = {
                "detail": "Email already exists!"
            }
            raise ValidationError(detail=detail)
        return instance
    
    def create(self, validated_data):
        password = validated_data['password']
        user = Account.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        Token.objects.create(user=user)
        return user
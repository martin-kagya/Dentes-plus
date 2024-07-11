from .models import Account
from rest_framework import serializers
from django.contrib.auth.hashers import make_password

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['username', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = Account.objects.create(
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
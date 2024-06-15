from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class DentistSerializer(serializers.ModelSerializer):
    class Meta:
        model=Dentist
        fields ='__all__'

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model=Patient
        fields ='__all__'

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Appointment
        fields ='__all__'

class ShopInventorySerializer(serializers.ModelSerializer):
    class Meta:
        model=ShopInventory
        fields ='__all__'

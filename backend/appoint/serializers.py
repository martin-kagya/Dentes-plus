from rest_framework import serializers
from .models import Appointment
from datetime import datetime

class AcceptedAppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = 'email', 'name'
class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        # fields = 'name', 'phone', 'email', 'date', 'reason', 'accepted_appointment'
        fields = '__all__'


    def to_internal_value(self, data):
        if 'date' in data:
            try:
                data['date'] = datetime.strptime(data['date'], '%d-%m-%Y').date()
            except ValueError:
                raise serializers.ValidationError({
                        'date': "Invalid date format. Please use DD-MM-YYYY"
                    })
        return super().to_internal_value(data)
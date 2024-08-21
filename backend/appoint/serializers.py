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
        fields = '__all__'

    def to_internal_value(self, data):
        if 'date' in data:
            date_formats = ['%d-%m-%Y', '%Y-%m-%d']
            for date_format in date_formats:
                try:
                    data['date'] = datetime.strptime(data['date'], date_format).date()
                    break
                except ValueError:
                    continue
            else:
                raise serializers.ValidationError({
                    'date': "Invalid date format. Please use DD-MM-YYYY or YYYY-MM-DD"
                })
        return super().to_internal_value(data)

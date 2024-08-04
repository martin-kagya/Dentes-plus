from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.mail import send_mail, EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from .models import Appointment
from .serializers import AppointmentSerializer,AcceptedAppointmentSerializer

# Create your views here.

class AppointmentView(APIView):
    def post(self,request):
        data = request.data
        serializer = AppointmentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            email(serializer.data['email'],serializer.data['name'])
            return Response(serializer.data,status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        
class AcceptedAppointmentView(APIView):
    def post(self,request):
        serializer = AcceptedAppointmentSerializer(data=request.data)
        if serializer.is_valid():
            appointment = Appointment.objects.get(email=serializer.data['email'])
            appointment.accepted_appointment = True
            appointment.save()
            confirmation_email(serializer.data['email'],serializer.data['name'])
            return Response({
                'message':'Appointment accepted and confirmation email sent.', 
                'data':serializer.data},
                status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        
def confirmation_email(email,name):
    subject = 'Appointment Confirmation'
    appointment = Appointment.objects.filter(email=email).first()
    if appointment:
        welcome_message = f"{name}, your appointment has been booked for {appointment.date} at {appointment.time}"
    else:
        welcome_message = f"Dear {name},\n\nWe could not find any appointment associated with this email.\n\nPlease contact support."
    variable = {
        'welcome_message': welcome_message,
    }
    html_message = render_to_string('email.html', context=variable)
    plain_message = strip_tags(html_message)
    message = EmailMultiAlternatives(
        subject,
        body=plain_message,
        from_email=None,
        to=[email]
    )
    message.attach_alternative(html_message,"text/html")
    message.send()

def email(email,name):
    subject = 'Welcome to Dentes Plus'
    if Appointment.objects.filter(email=email).exists():
        welcome_message = f"Welcome back {name}"
    else:
        welcome_message = f"Thank you {name} for booking an appointment with us"

    variable = {
        # 'name' : 'Dentist App',
        'welcome_message': welcome_message,
    }

    html_message = render_to_string('email.html', context=variable)
    plain_message = strip_tags(html_message)
    message = EmailMultiAlternatives(
        subject,
        body=plain_message,
        from_email=None,
        to=[email]
    )
    message.attach_alternative(html_message,"text/html")
    message.send()
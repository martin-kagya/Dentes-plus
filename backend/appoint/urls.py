from django.urls import path
from .views import AppointmentView,AcceptedAppointmentView
urlpatterns = [
    path('book/', AppointmentView.as_view(), name='appointment'),
    path('accept/', AcceptedAppointmentView.as_view(), name='accepted_appointment')
]

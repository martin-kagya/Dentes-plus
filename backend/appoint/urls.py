from django.urls import path
from .views import AppointmentView
urlpatterns = [
    path('book/', AppointmentView.as_view(), name='appointment'),
]

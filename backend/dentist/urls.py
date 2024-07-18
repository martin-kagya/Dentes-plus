
from django.urls import path
from .views import *


# dentist api endpoints
urlpatterns = [
    path('review/', DentistList.as_view(), name='dentist_list'),
    path('review/<int:pk>/', DentistDetail.as_view(), name='dentist_detail'),
]
